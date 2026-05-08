"use client";

import {
  DeliveryStatus,
  Order,
  OrderItem,
  OrderStatus,
  Payment,
} from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/money";
import {
  DeliveryStatusBadge,
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/StatusBadges";

type FullOrder = Order & { items: OrderItem[]; payment: Payment | null };

type CopyButtonProps = {
  text: string;
  label?: string;
};

const ORDER_STATUSES: OrderStatus[] = [
  "pending_confirmation",
  "pending_payment",
  "accepted",
  "baking",
  "ready",
  "delivered",
  "cancelled",
];

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_confirmation: "Ожидает подтверждения",
  pending_payment: "Ожидает оплаты",
  accepted: "Принят",
  baking: "Выпекается",
  ready: "Готов",
  delivered: "Доставлен",
  cancelled: "Отменен",
};

function CopyButton({ text, label = "Скопировать" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full bg-[#FFF4F8] px-4 py-2 text-xs font-semibold text-[#54342C] transition hover:bg-[#E6AECB]"
    >
      {copied ? "Скопировано" : label}
    </button>
  );
}

function fdt(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function fd(date: Date | null) {
  return date
    ? new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date)
    : "—";
}

function address(order: Order) {
  return [
    order.deliveryCity,
    order.deliveryStreet,
    `дом ${order.deliveryHouse}`,
    order.deliveryApartment ? `кв./офис ${order.deliveryApartment}` : null,
    order.deliveryEntrance ? `подъезд ${order.deliveryEntrance}` : null,
    order.deliveryFloor ? `этаж ${order.deliveryFloor}` : null,
    order.deliveryIntercom ? `домофон ${order.deliveryIntercom}` : null,
  ]
    .filter(Boolean)
    .join(", ");
}

function orderItemsText(order: FullOrder) {
  return order.items.map((item) => `${item.productName} × ${item.quantity}`).join("\n");
}

export function AdminOrderHeader({ order }: { order: Order }) {
  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5 md:p-8">
      <div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#54342C]">
            Заказ #{order.orderNumber}
          </h1>
          <p className="mt-3 text-[#54342C]">Создан: {fdt(order.createdAt)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="md:text-right">
          <p className="text-sm text-[#54342C]">Сумма печенья</p>
          <p className="mt-1 text-3xl font-bold text-[#54342C]">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminCustomerBlock({ order }: { order: Order }) {
  const whatsappHref = `https://wa.me/${order.customerPhone.replace(/\D/g, "")}`;
  const text = `Клиент: ${order.customerName}\nТелефон: ${order.customerPhone}\nEmail: ${order.customerEmail || "—"}`;

  return (
    <div className="relative rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 pr-24">
        <h2 className="text-2xl font-black text-[#54342C]">Клиент</h2>
      </div>
      <div className="absolute right-6 top-6">
        <CopyButton text={text} />
      </div>

      <div className="mt-5 space-y-4 text-[#54342C]">
        <div>
          <p className="text-sm text-[#54342C]">Имя</p>
          <p className="font-semibold text-[#54342C]">{order.customerName}</p>
        </div>
        <div>
          <p className="text-sm text-[#54342C]">Телефон</p>
          <p className="font-semibold text-[#54342C]">{order.customerPhone}</p>
        </div>
        <div>
          <p className="text-sm text-[#54342C]">Email</p>
          <p className="font-semibold text-[#54342C]">{order.customerEmail || "—"}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex justify-center rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#54342C]">
          Написать в WhatsApp
        </a>
        <a href={`tel:${order.customerPhone}`} className="inline-flex justify-center rounded-full bg-[#FFF4F8] px-5 py-3 text-sm font-semibold text-[#54342C] hover:bg-[#E6AECB]">
          Позвонить
        </a>
      </div>
    </div>
  );
}

export function AdminDeliveryBlock({ order }: { order: Order }) {
  const text = `Адрес: ${address(order)}\nЖелаемая дата: ${fd(order.deliveryDesiredDate)}\nИнтервал: ${order.deliveryDesiredSlot || "—"}\nКомментарий: ${order.deliveryComment || "—"}`;

  return (
    <div className="relative rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <div className="pr-24">
        <div>
          <h2 className="text-2xl font-black text-[#54342C]">Доставка</h2>
          <div className="mt-3"><DeliveryStatusBadge status={order.deliveryStatus} /></div>
        </div>
      </div>
      <div className="absolute right-6 top-6">
        <CopyButton text={text} />
      </div>

      <div className="mt-5 space-y-4 text-[#54342C]">
        <div>
          <p className="text-sm text-[#54342C]">Адрес</p>
          <p className="font-semibold leading-7 text-[#54342C]">{address(order)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[#54342C]">Желаемая дата</p>
            <p className="font-semibold text-[#54342C]">{fd(order.deliveryDesiredDate)}</p>
          </div>
          <div>
            <p className="text-sm text-[#54342C]">Интервал</p>
            <p className="font-semibold text-[#54342C]">{order.deliveryDesiredSlot || "—"}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-[#54342C]">Комментарий</p>
          <p className="font-semibold leading-7 text-[#54342C]">{order.deliveryComment || "—"}</p>
        </div>
      </div>
    </div>
  );
}

export function AdminOrderItems({ order }: { order: FullOrder }) {
  const text = `Состав заказа:\n${orderItemsText(order)}\n\nИтого: ${formatPrice(order.total)}`;

  return (
    <div className="relative rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 pr-24">
        <h2 className="text-2xl font-black text-[#54342C]">Состав заказа</h2>
      </div>
      <div className="absolute right-6 top-6">
        <CopyButton text={text} />
      </div>

      <div className="mt-5 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 border-b border-[#E6AECB] pb-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="font-semibold text-[#54342C]">{item.productName}</p>
              <p className="mt-1 text-sm text-[#54342C]">
                {item.quantity} × {formatPrice(item.productPrice)}
              </p>
            </div>
            <p className="font-semibold text-[#54342C] sm:text-right">{formatPrice(item.total)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-[#E6AECB] pt-5">
        <div className="flex justify-between text-[#54342C]">
          <span>Печенье</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="mt-4 flex justify-between gap-4 text-lg font-bold text-[#54342C] sm:text-xl">
          <span>Итого</span>
          <span className="text-right">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

export function AdminPaymentBlock({ order }: { order: FullOrder }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const text = `Оплата печенья\nСумма: ${formatPrice(order.total)}\nСтатус оплаты: ${order.paymentStatus}\nСсылка: ${order.payment?.paymentUrl || "—"}`;

  async function createPaymentLink() {
    setIsLoading(true);
    setMessage(null);
    try {
      const r = await fetch(`/api/admin/orders/${order.id}/payment-link`, { method: "POST" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      if (j.paymentUrl) await navigator.clipboard.writeText(j.paymentUrl);
      setMessage(j.alreadyExists ? "Ссылка уже была создана. Мы скопировали ее" : "Ссылка на оплату создана и скопирована");
      router.refresh();
    } catch {
      setMessage("Не получилось сформировать ссылку на оплату");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyPaymentLink() {
    if (order.payment?.paymentUrl) {
      await navigator.clipboard.writeText(order.payment.paymentUrl);
      setMessage("Ссылка скопирована");
    }
  }

  async function markSent() {
    setIsLoading(true);
    try {
      const r = await fetch(`/api/admin/orders/${order.id}/payment-link-sent`, { method: "PATCH" });
      if (!r.ok) throw new Error();
      setMessage("Отметили, что ссылка отправлена");
      router.refresh();
    } catch {
      setMessage("Не получилось отметить отправку");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <div className="pr-24">
        <div>
          <h2 className="text-2xl font-black text-[#54342C]">Оплата печенья</h2>
          <div className="mt-3"><PaymentStatusBadge status={order.paymentStatus} /></div>
        </div>
      </div>
      <div className="absolute right-6 top-6">
        <CopyButton text={text} />
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-2xl font-black text-[#54342C]">{formatPrice(order.total)}</p>
        {order.status === "pending_confirmation" ? (
          <div className="rounded-[24px] bg-[#FFF4F8] p-5">
            <p className="font-semibold text-[#54342C]">Заказ ожидает проверки</p>
            <button type="button" onClick={createPaymentLink} disabled={isLoading} className="mt-4 rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {isLoading ? "Формируем..." : "Сформировать ссылку на оплату"}
            </button>
          </div>
        ) : null}
        {order.status === "pending_payment" ? (
          <div className="rounded-[24px] bg-[#FFF4F8] p-5">
            <p className="font-semibold text-[#54342C]">Ссылка на оплату сформирована</p>
            {order.payment?.paymentUrl ? <p className="mt-2 break-all text-sm text-[#54342C]">{order.payment.paymentUrl}</p> : null}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={copyPaymentLink} className="rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white">Скопировать</button>
              <button type="button" onClick={markSent} disabled={isLoading} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#54342C] disabled:opacity-50">Отметить отправленной</button>
            </div>
            {order.paymentLinkSent ? <p className="mt-3 text-sm font-semibold text-[#54342C]">Ссылка уже отправлена</p> : null}
          </div>
        ) : null}
        {order.paymentStatus === "paid" ? <div className="rounded-[24px] bg-[#FFF4F8] p-5 font-semibold text-[#54342C]">Печенье оплачено</div> : null}
        {message ? <p className="text-sm font-semibold text-[#54342C]">{message}</p> : null}
      </div>
    </div>
  );
}

export function AdminManagerComment({ order }: { order: Order }) {
  const router = useRouter();
  const [managerComment, setManagerComment] = useState(order.managerComment || "");
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    const r = await fetch(`/api/admin/orders/${order.id}/comment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ managerComment }),
    });
    setMessage(r.ok ? "Комментарий сохранен" : "Не получилось сохранить");
    router.refresh();
  }

  return (
    <div className="relative rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 pr-24">
        <h2 className="text-2xl font-black text-[#54342C]">Комментарий менеджера</h2>
      </div>
      <div className="absolute right-6 top-6">
        <CopyButton text={managerComment || "—"} />
      </div>
      <textarea value={managerComment} onChange={(e) => setManagerComment(e.target.value)} rows={5} className="mt-5 w-full resize-none rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none" />
      <button type="button" onClick={save} className="mt-4 rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white">
        Сохранить комментарий
      </button>
      {message ? <p className="mt-3 text-sm font-semibold text-[#54342C]">{message}</p> : null}
    </div>
  );
}

export function AdminCopyButtons({ order }: { order: FullOrder }) {
  const text = `Заказ #${order.orderNumber}\nКлиент: ${order.customerName}\nТелефон: ${order.customerPhone}\nАдрес: ${address(order)}\n\n${orderItemsText(order)}\n\nСумма: ${formatPrice(order.total)}`;
  const deliveryText = `Получатель: ${order.customerName}\nТелефон: ${order.customerPhone}\nАдрес: ${address(order)}\nКомментарий: заказ KROOKIES #${order.orderNumber}.`;

  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-black text-[#54342C]">Быстрые действия</h2>
      <div className="mt-5 flex flex-col gap-3">
        <CopyButton text={text} label="Скопировать данные заказа" />
        <CopyButton text={deliveryText} label="Данные для Яндекс Доставки" />
      </div>
    </div>
  );
}

export function AdminStatusActions({ order }: { order: Order }) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function saveStatus() {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("status_update_failed");

      setMessage("Статус сохранен");
      router.refresh();
    } catch {
      setMessage("Не получилось изменить статус");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-black text-[#54342C]">Статус</h2>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-[#54342C]">Текущий статус заказа</span>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as OrderStatus)}
          className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none focus:border-[#54342C]"
        >
          {ORDER_STATUSES.map((item) => (
            <option key={item} value={item}>
              {ORDER_STATUS_LABELS[item]}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={saveStatus}
        disabled={isSaving}
        className="mt-4 w-full rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isSaving ? "Сохраняем..." : "Сохранить статус"}
      </button>

      {message ? <p className="mt-4 text-sm font-semibold text-[#54342C]">{message}</p> : null}
    </div>
  );
}
