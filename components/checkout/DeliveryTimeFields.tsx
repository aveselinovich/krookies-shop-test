"use client";

import { CheckoutDelivery } from "@/types/order";

type DeliveryTimeFieldsProps = { delivery: CheckoutDelivery; onChange: (field: keyof CheckoutDelivery, value: string) => void };
const DELIVERY_SLOTS = ["12:00–15:00", "15:00–18:00", "18:00–21:00"];

export function DeliveryTimeFields({ delivery, onChange }: DeliveryTimeFieldsProps) {
  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-black text-[#54342C]">Желаемое время доставки</h2>
      <p className="mt-2 text-sm leading-6 text-[#54342C]">Это желаемое время. Менеджер подтвердит его после проверки заказа</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Дата доставки</span><input type="date" value={delivery.desiredDate || ""} onChange={(event) => onChange("desiredDate", event.target.value)} className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Интервал</span><select value={delivery.desiredSlot || ""} onChange={(event) => onChange("desiredSlot", event.target.value)} className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]"><option value="">Выберите интервал</option>{DELIVERY_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select></label>
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#54342C]">Комментарий</span><textarea value={delivery.comment || ""} onChange={(event) => onChange("comment", event.target.value)} placeholder="Например: позвонить за 10 минут, не звонить в домофон..." rows={4} className="w-full resize-none rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none transition focus:border-[#54342C]" /></label>
      </div>
    </div>
  );
}
