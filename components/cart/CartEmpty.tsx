import Link from "next/link";

export function CartEmpty() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF4F8] text-[#54342C]">
        <img
          src="/krookies-brand-seal-transparent.png"
          alt="KROOKIES"
          className="h-[58px] w-[58px] object-contain"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#54342C]">Корзина пустая</h1>

      <p className="mx-auto mt-4 max-w-md leading-7 text-[#54342C]">
        Добавьте любимые KROOKIES с витрины, чтобы оформить заказ
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#54342C]"
        >
          Открыть витрину
        </Link>
      </div>
    </div>
  );
}
