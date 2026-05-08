import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = { title: "Оформление заказа — KROOKIES", description: "Отправьте заказ на подтверждение." };

export default function CheckoutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9FB]">
      <SiteHeader />
      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-[#54342C] sm:text-4xl md:text-6xl">Оформление заказа</h1>
          <p className="mt-5 text-base leading-7 text-[#54342C] sm:text-lg sm:leading-8">
            Заполните данные, а менеджер проверит возможность доставки и отправит ссылку на оплату печенья
          </p>
        </div>
        <CheckoutForm />
      </section>
      <SiteFooter />
    </main>
  );
}
