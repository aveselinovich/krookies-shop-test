"use client";

import { CheckoutDelivery } from "@/types/order";

type DeliveryFieldsProps = { delivery: CheckoutDelivery; onChange: (field: keyof CheckoutDelivery, value: string) => void };
export function DeliveryFields({ delivery, onChange }: DeliveryFieldsProps) {
  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-black text-[#54342C]">Адрес доставки</h2>
      <p className="mt-2 text-sm leading-6 text-[#54342C]">Доставляем по Москве и Московской области. Менеджер проверит адрес перед подтверждением заказа</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Город *</span><input value={delivery.city} onChange={(event) => onChange("city", event.target.value)} placeholder="Москва" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Улица *</span><input value={delivery.street} onChange={(event) => onChange("street", event.target.value)} placeholder="Улица" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Дом *</span><input value={delivery.house} onChange={(event) => onChange("house", event.target.value)} placeholder="Дом" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Квартира / офис</span><input value={delivery.apartment || ""} onChange={(event) => onChange("apartment", event.target.value)} placeholder="Квартира" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Подъезд</span><input value={delivery.entrance || ""} onChange={(event) => onChange("entrance", event.target.value)} placeholder="Подъезд" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Этаж</span><input value={delivery.floor || ""} onChange={(event) => onChange("floor", event.target.value)} placeholder="Этаж" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Домофон</span><input value={delivery.intercom || ""} onChange={(event) => onChange("intercom", event.target.value)} placeholder="Домофон" className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
      </div>
    </div>
  );
}
