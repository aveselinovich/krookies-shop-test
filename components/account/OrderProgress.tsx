import { OrderStatus } from "@prisma/client";

const STEPS: OrderStatus[] = [
  "pending_confirmation",
  "pending_payment",
  "accepted",
  "baking",
  "ready",
  "delivered",
];

const LABELS: Record<OrderStatus, string> = {
  pending_confirmation: "Ожидает подтверждения",
  pending_payment: "Ожидает оплаты",
  accepted: "Принят",
  baking: "Выпекается",
  ready: "Готов",
  delivered: "Доставлен",
  cancelled: "Отменен",
};

export function getClientOrderStatusLabel(status: OrderStatus) {
  return LABELS[status];
}

export function OrderProgress({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="inline-flex rounded-full bg-[#FFF4F8] px-4 py-2 text-sm font-semibold text-[#54342C]">
        Отменен
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="flex flex-wrap gap-2">
      {STEPS.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isPassed = index < currentIndex;

        return (
          <div
            key={step}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              isCurrent
                ? "bg-[#54342C] text-white"
                : isPassed
                ? "bg-[#E6AECB] text-[#54342C]"
                : "bg-[#FFF4F8] text-[#54342C]"
            }`}
          >
            {LABELS[step]}
          </div>
        );
      })}
    </div>
  );
}
