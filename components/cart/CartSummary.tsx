import { formatPrice } from "@/lib/money";
import { ButtonLink } from "@/components/ui/Button";

type CartSummaryProps = { subtotal: number; totalQuantity: number };

export function CartSummary({ subtotal, totalQuantity }: CartSummaryProps) {
  return (
    <aside className="rounded-3xl bg-[#FFFFFF] p-5 shadow-lg ring-1 ring-black/5 sm:p-6 lg:self-start">
      <h2 className="text-2xl font-black text-[#54342C]">Ваш заказ</h2>
      <div className="mt-6 space-y-4 text-[#54342C]">
        <div className="flex justify-between gap-4"><span>Товары</span><span>{totalQuantity} шт.</span></div>
        <div className="flex justify-between gap-4"><span>Печенье</span><span className="font-semibold text-[#54342C]">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between gap-4"><span>Доставка</span><span className="text-right">отдельно</span></div>
      </div>
      <div className="mt-6 border-t border-[#E6AECB] pt-6">
        <div className="flex justify-between gap-4 text-base font-bold text-[#54342C] sm:text-lg"><span>К оплате после подтверждения</span><span>{formatPrice(subtotal)}</span></div>
        <p className="mt-3 text-sm leading-6 text-[#54342C]">Сейчас вы отправляете заказ на подтверждение. Менеджер пришлет ссылку на оплату печенья после проверки</p>
      </div>
      <div className="mt-6"><ButtonLink href="/checkout" className="w-full">Перейти к оформлению</ButtonLink></div>
    </aside>
  );
}
