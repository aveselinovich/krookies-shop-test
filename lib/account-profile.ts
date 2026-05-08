import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizePhone, validatePhone } from "@/lib/phone";
import { validateEmail } from "@/lib/email";

type UpdateAccountProfileInput = {
  name?: string;
  phone?: string;
  email?: string | null;
};

export async function updateAccountProfile(
  userId: string,
  input: UpdateAccountProfileInput
) {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!currentUser) {
    throw new Error("user_not_found");
  }

  const hasName = Object.prototype.hasOwnProperty.call(input, "name");
  const hasPhone = Object.prototype.hasOwnProperty.call(input, "phone");
  const hasEmail = Object.prototype.hasOwnProperty.call(input, "email");

  const name = hasName ? input.name?.trim() || null : currentUser.name;
  const email = hasEmail ? input.email?.trim().toLowerCase() || null : currentUser.email;

  if (currentUser.role !== "admin" && !name?.trim()) {
    throw new Error("name_required");
  }

  if (hasPhone) {
    const phone = normalizePhone(input.phone || "");

    if (!validatePhone(phone)) {
      throw new Error("invalid_phone");
    }
  }

  if (email && !validateEmail(email)) {
    throw new Error("invalid_email");
  }

  if (email && currentUser.role === "admin") {
    const emailOwner = await prisma.user.findFirst({
      where: {
        email,
        role: "admin",
        NOT: { id: currentUser.id },
      },
      select: { id: true },
      orderBy: { createdAt: "asc" },
    });

    if (emailOwner) {
      throw new Error("email_already_used");
    }
  }

  const data: Prisma.UserUpdateInput = {};

  if (hasName) {
    data.name = name;
  }

  if (hasPhone) {
    data.phone = normalizePhone(input.phone || "");
  }

  if (hasEmail) {
    data.email = email;
  }

  return prisma.user.update({
    where: { id: userId },
    data,
  });
}
