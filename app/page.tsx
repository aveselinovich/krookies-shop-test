import { ArrowRightIcon, MessageCircleIcon } from "@/components/ui/Icons";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getPublishedProducts } from "@/lib/products";

const PINK = "#E6AECB";
const BROWN = "#54342C";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const products = await getPublishedProducts();

  return (
    <div className="flex min-h-screen flex-col text-neutral-900" style={{ backgroundColor: "#FFF9FB" }}>
      <SiteHeader />

      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl" style={{ color: BROWN }}>
              American cookies с&nbsp;текучей начинкой
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 sm:text-xl sm:leading-8">
              Сладкая, счастливая жизнь — в каждом печенье. Свежие вкусы,
              плотная текстура, тающая сердцевина
            </p>
          </div>
        </div>
      </section>

      <section id="showcase" className="bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black sm:text-4xl" style={{ color: BROWN }}>
              Актуальная витрина
            </h2>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      <section id="story" className="py-16 sm:py-20" style={{ backgroundColor: PINK }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black sm:text-4xl" style={{ color: BROWN }}>
            Все началось с случайности
          </h2>
          <article className="prose prose-lg mt-6 max-w-none leading-relaxed" style={{ color: BROWN }}>
            <p className="text-xl font-semibold">
              Мы делимся кусочком нашей истории и создаем печенье, которое дарит положительные эмоции
            </p>
            <p>
              Нас не устраивали готовые решения: слишком сухо, жирно или приторно.
              Десятки рецептов, курсы, бессонные ночи — и вот оно, идеальное печенье
            </p>
            <blockquote className="border-l-4 pl-4 font-semibold italic" style={{ borderColor: BROWN }}>
              «Боже, это невероятно вкусно! Такого мы ещё не пробовали»
            </blockquote>
            <p className="font-medium"><i>С любовью, команда Krookies<br />Кусь 🍪</i></p>
          </article>
        </div>
      </section>

      <section id="contacts" className="py-16 sm:py-20" style={{ backgroundColor: "#FFF4F8" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl" style={{ color: BROWN }}>Связаться и заказать</h2>
            <p className="mt-2 opacity-80">Оформите заказ через витрину, а менеджер подтвердит детали и доставку</p>
            <div className="mt-6 space-y-3">
              <a href="https://wa.me/79932478862" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center font-semibold shadow-lg sm:w-fit" style={{ backgroundColor: BROWN, color: "white" }}>
                <MessageCircleIcon /> WhatsApp: +7 993-247-88-62
              </a>
              <a href="https://t.me/krookies_manager" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center font-semibold shadow-lg sm:w-fit" style={{ backgroundColor: PINK, color: BROWN }}>
                <MessageCircleIcon /> Telegram: @krookies_manager
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h3 className="text-xl font-black" style={{ color: BROWN }}>Как проходит заказ?</h3>
            <p className="mt-2 opacity-80">
              Вы отправляете заявку, менеджер проверяет возможность доставки и отправляет ссылку на оплату печенья
            </p>
            <a href="/cart" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold shadow sm:w-auto" style={{ backgroundColor: PINK, color: BROWN }}>
              Перейти в корзину <ArrowRightIcon size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-10" style={{ backgroundColor: BROWN, color: "#FDECF3" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-11 w-11 rounded-full" style={{ backgroundColor: PINK }}>
                <img src="/logo-cookie.png" alt="KROOKIES" className="h-9 w-auto translate-x-1 translate-y-1" />
              </div>
              <span className="text-lg font-black tracking-wide">KROOKIES</span>
            </div>
            <p className="mt-2 opacity-90">
              American cookies с текучей начинкой. Каждый день — повод для сладкой, счастливой жизни
            </p>
          </div>
          <div className="text-sm opacity-90 md:text-right">
            © 2026 Krookies — Все права защищены. <br />
            Оформление заказа через сайт
          </div>
        </div>
      </footer>
    </div>
  );
}
