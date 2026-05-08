"use client";

type ContactFieldsProps = { name: string; phone: string; email: string; onChange: (field: "name" | "phone" | "email", value: string) => void };
export function ContactFields({ name, phone, email, onChange }: ContactFieldsProps) {
  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-black text-[#54342C]">Контакты</h2>
      <div className="mt-5 grid gap-4">
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Имя *</span><input value={name} onChange={(event) => onChange("name", event.target.value)} placeholder="Например, Анна" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Телефон *</span><input value={phone} onChange={(event) => onChange("phone", event.target.value)} placeholder="+7 999 000-00-00" inputMode="tel" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Email</span><input value={email} onChange={(event) => onChange("email", event.target.value)} placeholder="Для чека, если нужен" inputMode="email" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /><span className="mt-2 block text-xs text-[#54342C]">Необязательно. Можно оставить пустым</span></label>
      </div>
    </div>
  );
}
