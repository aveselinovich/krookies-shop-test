import Link from "next/link";
import { formatPrice } from "@/lib/money";
import { OrderStatusBadge } from "@/components/admin/StatusBadges";

type AdminOrderListItem = {
  id: string;
  orderNumber: number;
  customerName: string;
  customerPhone: string;
  status: any;
  paymentStatus: any;
  deliveryStatus: any;
  total: number;
  paymentLinkSent: boolean;
  deliveryDesiredDate: Date | null;
  deliveryDesiredSlot: string | null;
  createdAt: Date;
  items: { quantity: number }[];
};

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDesiredDateTime(date: Date | null, slot: string | null) {
  if (!date && !slot) return "—";
  const formattedDate = date
    ? new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    : "Дата не указана";

  return slot ? `${formattedDate}, ${slot}` : formattedDate;
}

export function OrdersTable({ orders }: { orders: AdminOrderListItem[] }) {
  if (!orders.length) {
    return (
      <div className="rounded-3xl bg-[#FFFFFF] p-8 text-center text-[#54342C]">
        Заказов пока нет
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#FFFFFF] shadow-lg ring-1 ring-black/5">
      <div className="grid gap-4 p-4 lg:hidden">
        {orders.map((order) => {
          const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <article key={order.id} className="rounded-2xl bg-[#FFF9FB] p-4 ring-1 ring-[#E6AECB]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-black text-[#54342C]">Заказ #{order.orderNumber}</p>
                  <p className="mt-1 text-sm text-[#54342C]">{formatDateTime(order.createdAt)}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 grid gap-3 text-sm text-[#54342C] sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Клиент</p>
                  <p className="mt-1 font-semibold text-[#54342C]">{order.customerName}</p>
                  <p className="mt-1">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Состав</p>
                  <p className="mt-1 font-semibold text-[#54342C]">{itemsCount} шт.</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Сумма</p>
                  <p className="mt-1 font-semibold text-[#54342C]">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Желаемое время</p>
                  <p className="mt-1">{formatDesiredDateTime(order.deliveryDesiredDate, order.deliveryDesiredSlot)}</p>
                </div>
              </div>

              <Link
                href={`/admin/orders/${order.id}`}
                className="mt-4 inline-flex w-full justify-center rounded-full bg-[#54342C] px-4 py-3 text-sm font-semibold text-white"
              >
                Открыть
              </Link>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E6AECB] text-center text-sm text-[#54342C]">
              <th className="px-5 py-4">Номер</th>
              <th className="px-5 py-4">Дата создания</th>
              <th className="px-5 py-4">Клиент</th>
              <th className="px-5 py-4">Телефон</th>
              <th className="px-5 py-4">Сумма</th>
              <th className="px-5 py-4">Статус</th>
              <th className="px-5 py-4">Желаемые дата и время</th>
              <th className="px-5 py-4">Действие</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <tr key={order.id} className="border-b border-[#E6AECB] text-center last:border-b-0">
                  <td className="px-5 py-4 font-semibold text-[#54342C]">#{order.orderNumber}</td>
                  <td className="px-5 py-4 text-sm text-[#54342C]">{formatDateTime(order.createdAt)}</td>
                  <td className="px-5 py-4 text-left">
                    <p className="font-semibold text-[#54342C]">{order.customerName}</p>
                    <p className="mt-1 text-sm text-[#54342C]">{itemsCount} шт.</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#54342C]">{order.customerPhone}</td>
                  <td className="px-5 py-4 font-semibold text-[#54342C]">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-5 py-4 text-sm text-[#54342C]">
                    {formatDesiredDateTime(order.deliveryDesiredDate, order.deliveryDesiredSlot)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex rounded-full bg-[#54342C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#54342C]"
                    >
                      Открыть
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
