const PINK = "#E6AECB";
const BROWN = "#54342C";

export function SiteFooter() {
  return (
    <footer className="mt-auto py-10" style={{ backgroundColor: BROWN, color: "#FDECF3" }}>
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
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
  );
}
