"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";
import { CheckoutDelivery } from "@/types/order";
import { clearCart, getCartItems, getCartState } from "@/lib/cart";
import { validatePhone } from "@/lib/phone";
import { Button } from "@/components/ui/Button";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { ContactFields } from "@/components/checkout/ContactFields";
import { DeliveryFields } from "@/components/checkout/DeliveryFields";
import { DeliveryTimeFields } from "@/components/checkout/DeliveryTimeFields";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CheckoutNotice } from "@/components/checkout/CheckoutNotice";

type ContactState = { name: string; phone: string; email: string };
const INITIAL_CONTACT: ContactState = { name: "", phone: "", email: "" };
const INITIAL_DELIVERY: CheckoutDelivery = { city: "Москва", street: "", house: "", apartment: "", entrance: "", floor: "", intercom: "", desiredDate: "", desiredSlot: "", comment: "" };
type SessionUser = { id: string; name: string | null; phone: string; email: string | null; role: "customer" | "admin" };

function getCheckoutErrorMessage(error: string) {
  switch (error) {
    case "invalid_email":
      return "Проверьте адрес почты";
    case "invalid_phone":
      return "Проверьте номер телефона";
    case "cart_is_empty":
      return "Корзина пустая";
    default:
      return "Не получилось отправить заказ. Попробуйте еще раз";
  }
}

export function CheckoutForm() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [contact, setContact] = useState<ContactState>(INITIAL_CONTACT);
  const [delivery, setDelivery] = useState<CheckoutDelivery>(INITIAL_DELIVERY);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setItems(getCartItems());

    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) return;
        const result = await response.json();
        const user = result.user as SessionUser | null;
        if (!isMounted || !user) return;

        setContact((current) => ({
          name: current.name || user.name || "",
          phone: current.phone || user.phone || "",
          email: current.email || user.email || "",
        }));
      } catch {
        return;
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);
  const cartState = getCartState(items);
  function updateContact(field: keyof ContactState, value: string) { setContact((current) => ({ ...current, [field]: value })); }
  function updateDelivery(field: keyof CheckoutDelivery, value: string) { setDelivery((current) => ({ ...current, [field]: value })); }
  function validateForm() { if (!items.length) return "Корзина пустая"; if (!contact.name.trim()) return "Укажите имя"; if (!contact.phone.trim()) return "Укажите телефон"; if (!validatePhone(contact.phone)) return "Проверьте номер телефона"; if (!delivery.city.trim()) return "Укажите город"; if (!delivery.street.trim()) return "Укажите улицу"; if (!delivery.house.trim()) return "Укажите дом"; return null; }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const validationError = validateForm(); if (validationError) { setError(validationError); return; }
    setError(null); setIsSubmitting(true);
    try {
      const payload = { customer: { name: contact.name.trim(), phone: contact.phone.trim(), email: contact.email.trim() || undefined }, delivery: { city: delivery.city.trim(), street: delivery.street.trim(), house: delivery.house.trim(), apartment: delivery.apartment?.trim() || undefined, entrance: delivery.entrance?.trim() || undefined, floor: delivery.floor?.trim() || undefined, intercom: delivery.intercom?.trim() || undefined, desiredDate: delivery.desiredDate || undefined, desiredSlot: delivery.desiredSlot || undefined, comment: delivery.comment?.trim() || undefined }, items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })) };
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || "order_create_failed");
      window.localStorage.setItem("krookies_last_order", JSON.stringify({ orderId: result.orderId, orderNumber: result.orderNumber, total: result.total, status: result.status }));
      clearCart(); router.push("/order-created");
    } catch (e) { console.error(e); setError(getCheckoutErrorMessage(e instanceof Error ? e.message : "order_create_failed")); } finally { setIsSubmitting(false); }
  }
  if (!items.length) return <CartEmpty />;
  return <form onSubmit={handleSubmit}><div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start"><div className="space-y-5"><ContactFields name={contact.name} phone={contact.phone} email={contact.email} onChange={updateContact} /><DeliveryFields delivery={delivery} onChange={updateDelivery} /><DeliveryTimeFields delivery={delivery} onChange={updateDelivery} /><CheckoutNotice />{error ? <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div> : null}<Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "Отправляем заказ..." : "Отправить заказ на подтверждение"}</Button></div><CheckoutSummary items={items} subtotal={cartState.subtotal} /></div></form>;
}
