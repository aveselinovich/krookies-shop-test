import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizePhone } from "@/lib/phone";
import { findOrCreateUserByPhone } from "@/lib/auth";

type AdminCredentialsStore = {
  version: 1;
  admins: Record<
    string,
    {
      passwordHash: string;
      updatedAt: string;
    }
  >;
};

const STORE_PATH = path.join(process.cwd(), "data", "admin-credentials.json");
const PRIMARY_ADMIN_PHONE = normalizePhone(process.env.ADMIN_PHONE || "+79959178862");
const PRIMARY_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "mackacrvena@gmail.com").trim().toLowerCase();
const PRIMARY_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "krookiesadmin";

function validatePassword(password: string) {
  if (password.trim().length < 8) {
    throw new Error("password_too_short");
  }
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return false;
  const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(computedHash, "hex"));
}

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });

  try {
    await fs.access(STORE_PATH);
  } catch {
    const initial: AdminCredentialsStore = {
      version: 1,
      admins: {},
    };
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as AdminCredentialsStore;
}

async function writeStore(store: AdminCredentialsStore) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

async function setPasswordHash(userId: string, password: string) {
  validatePassword(password);
  const store = await readStore();
  store.admins[userId] = {
    passwordHash: hashPassword(password),
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
}

export async function assignAdminPassword(userId: string, password: string) {
  await setPasswordHash(userId, password);
}

export async function removeAdminPassword(userId: string) {
  const store = await readStore();
  if (store.admins[userId]) {
    delete store.admins[userId];
    await writeStore(store);
  }
}

async function ensurePrimaryAdminCredential(user: {
  id: string;
  phone: string;
  role: UserRole;
}) {
  if (user.role !== UserRole.admin) return;
  if (normalizePhone(user.phone) !== PRIMARY_ADMIN_PHONE) return;

  const store = await readStore();
  const currentCredential = store.admins[user.id];

  if (currentCredential && (!process.env.ADMIN_PASSWORD || verifyPassword(PRIMARY_ADMIN_PASSWORD, currentCredential.passwordHash))) {
    return;
  }

  store.admins[user.id] = {
    passwordHash: hashPassword(PRIMARY_ADMIN_PASSWORD),
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
}

async function findAdminForStaffLogin(normalizedEmail: string) {
  if (normalizedEmail === PRIMARY_ADMIN_EMAIL) {
    const { user } = await findOrCreateUserByPhone(PRIMARY_ADMIN_PHONE);
    if (user.role === UserRole.admin) {
      return user;
    }
  }

  return prisma.user.findFirst({
    where: {
      email: normalizedEmail,
      role: UserRole.admin,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function authenticateAdminByEmail(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) throw new Error("email_required");
  if (!password) throw new Error("password_required");

  const user = await findAdminForStaffLogin(normalizedEmail);

  if (!user || user.role !== UserRole.admin) {
    throw new Error("invalid_staff_credentials");
  }

  await ensurePrimaryAdminCredential(user);

  const store = await readStore();
  const credentials = store.admins[user.id];

  if (!credentials || !verifyPassword(password, credentials.passwordHash)) {
    throw new Error("invalid_staff_credentials");
  }

  return user;
}

export async function changeAdminPassword(userId: string, currentPassword: string, nextPassword: string) {
  if (!currentPassword) throw new Error("password_required");
  validatePassword(nextPassword);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== UserRole.admin) {
    throw new Error("forbidden");
  }

  await ensurePrimaryAdminCredential(user);

  const store = await readStore();
  const credentials = store.admins[userId];

  if (!credentials || !verifyPassword(currentPassword, credentials.passwordHash)) {
    throw new Error("invalid_current_password");
  }

  store.admins[userId] = {
    passwordHash: hashPassword(nextPassword),
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
}
