export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 11 && digits.startsWith("8")) return `+7${digits.slice(1)}`;
  if (digits.length === 11 && digits.startsWith("7")) return `+${digits}`;
  if (digits.length === 10) return `+7${digits}`;
  return phone.startsWith("+") ? `+${digits}` : phone;
}

export function formatPhoneInput(phone: string) {
  let digits = phone.replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  const local = digits.slice(1);
  const code = local.slice(0, 3);
  const part1 = local.slice(3, 6);
  const part2 = local.slice(6, 8);
  const part3 = local.slice(8, 10);

  let formatted = "+7";

  if (code) formatted += ` ${code}`;
  if (part1) formatted += ` ${part1}`;
  if (part2) formatted += `-${part2}`;
  if (part3) formatted += `-${part3}`;

  return formatted;
}

export function validatePhone(phone: string) {
  return /^\+7\d{10}$/.test(normalizePhone(phone));
}
