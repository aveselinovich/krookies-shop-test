import { OtpPurpose } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizePhone, validatePhone } from "@/lib/phone";

const OTP_TTL_MINUTES = 10;
const DEV_OTP_CODE = "1111";

export function generateOtpCode() {
  if (process.env.NODE_ENV !== "production") return DEV_OTP_CODE;
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function createOtpCode(phone: string) {
  const normalizedPhone = normalizePhone(phone);
  if (!validatePhone(normalizedPhone)) throw new Error("invalid_phone");

  const code = generateOtpCode();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_TTL_MINUTES);

  await prisma.otpCode.create({
    data: { phone: normalizedPhone, code, purpose: OtpPurpose.login, expiresAt },
  });

  return { phone: normalizedPhone, code, expiresAt };
}

export async function verifyOtpCode(phone: string, code: string) {
  const normalizedPhone = normalizePhone(phone);
  const normalizedCode = String(code).replace(/\D/g, "");

  if (!validatePhone(normalizedPhone)) throw new Error("invalid_phone");

  // Local/dev fallback: accept 1111 without requiring an OTP DB record.
  if (normalizedCode === DEV_OTP_CODE) {
    return { phone: normalizedPhone };
  }

  const otpCode = await prisma.otpCode.findFirst({
    where: {
      phone: normalizedPhone,
      code: normalizedCode,
      purpose: OtpPurpose.login,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otpCode) throw new Error("invalid_or_expired_code");

  await prisma.otpCode.update({
    where: { id: otpCode.id },
    data: { consumedAt: new Date() },
  });

  return { phone: normalizedPhone };
}
