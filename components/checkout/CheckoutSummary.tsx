"use client";

import { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/money";

type CheckoutSummaryProps = { items: CartItem[]; subtotal: number };
export function CheckoutSummary({ items, subtotal }: CheckoutSummaryProps) {
  return (
    <aside className="rounded-3xl bg-[#FFFFFF] p-5 shadow-lg ring-1 ring-black/5 sm:p-6 lg:self-start">
      <h2 className="text-2xl font-black text-[#54342C]">Ваш заказ</h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-start justify-between gap-4 border-b border-[#E6AECB] pb-4 last:border-b-0">
            <div className="min-w-0">
              <p className="font-semibold text-[#54342C]">{item.title}</p>
              <p className="mt-1 text-sm text-[#54342C]">{item.quantity} × {formatPrice(item.price)}</p>
            </div>
            <p className="shrink-0 font-semibold text-[#54342C]">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4 text-[#54342C]">
        <div className="flex justify-between gap-4">
          <span>Печенье</span>
          <span className="font-semibold text-[#54342C]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Доставка</span>
          <span className="text-right">оплачивается отдельно</span>
        </div>
      </div>
      <div className="mt-6 border-t border-[#E6AECB] pt-6">
        <div className="flex justify-between gap-4 text-base font-bold text-[#54342C] sm:text-lg">
          <span>К оплате после подтверждения</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </aside>
  );
}
