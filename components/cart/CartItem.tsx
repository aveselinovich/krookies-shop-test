"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { CartItem as CartItemType } from "@/types/cart";
import { formatPrice } from "@/lib/money";

type CartItemProps = {
  item: CartItemType;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [inputValue, setInputValue] = useState(String(item.quantity));

  useEffect(() => {
    setInputValue(String(item.quantity));
  }, [item.quantity]);

  function changeQuantity(quantity: number) {
    onQuantityChange(item.productId, quantity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");
    setInputValue(value);

    if (!value) return;

    changeQuantity(Number(value));
  }

  function handleInputBlur() {
    const value = Number(inputValue);

    if (!inputValue || !value || value <= 0) {
      onRemove(item.productId);
      return;
    }

    changeQuantity(value);
  }

  return (
    <div className="rounded-[34px] bg-[#FFFFFF] p-4 shadow-[0_24px_60px_rgba(84,52,44,0.08)] ring-1 ring-[#EFDCCB] md:rounded-3xl md:p-5 md:shadow-lg md:ring-black/5">
      <div className="md:hidden">
        <div className="grid grid-cols-[132px_minmax(0,1fr)] items-start gap-4">
          <Link
            href={`/product/${item.slug}`}
            className="rounded-[30px] border border-[#F0DEC8] bg-[#FFF9F4] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]"
          >
            <div className="flex h-full min-h-[188px] flex-col rounded-[26px] border border-[#F2E4D5] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF6EE_100%)] p-3">
              <span className="text-center text-[11px] font-black tracking-[0.18em] text-[#54342C]">
                KROOKIES
              </span>
              <div className="relative mt-2 flex-1 overflow-hidden rounded-[22px]">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain p-1"
                    sizes="132px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[#54342C]">
                    Нет фото
                  </div>
                )}
              </div>
              <div className="mt-3 rounded-[20px] bg-[#54342C] px-3 py-2 text-center text-sm font-black leading-5 text-white">
                {item.title}
              </div>
            </div>
          </Link>

          <div className="min-w-0 pt-3">
            <Link href={`/product/${item.slug}`}>
              <h2 className="text-[27px] font-black leading-[1.05] text-[#54342C]">
                {item.title}
              </h2>
            </Link>
            <p className="mt-4 text-[14px] leading-6 text-[#54342C] opacity-80">
              Печенье KROOKIES с фирменной начинкой
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] bg-[linear-gradient(180deg,rgba(255,244,248,0.85)_0%,rgba(255,249,251,0.95)_100%)] px-4 py-4 text-center ring-1 ring-[#F7DCE5]">
          <p className="text-[28px] font-black leading-none text-[#54342C]">
            {formatPrice(item.price * item.quantity)}
          </p>
          <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F3C9D4]" />
          <p className="mt-3 text-[15px] text-[#54342C]">
            Цена за штуку {formatPrice(item.price)}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex flex-1 items-center overflow-hidden rounded-full border border-[#E6CFB6] bg-white">
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity - 1)}
              className="flex h-12 w-[30%] min-w-[58px] items-center justify-center text-[24px] font-medium text-[#54342C]"
              aria-label="Уменьшить количество"
            >
              −
            </button>

            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="h-12 w-full border-x border-[#E6CFB6] bg-white px-2 text-center text-[24px] font-black text-[#54342C] outline-none"
              aria-label="Количество товара"
            />

            <button
              type="button"
              onClick={() => changeQuantity(item.quantity + 1)}
              className="flex h-12 w-[30%] min-w-[58px] items-center justify-center text-[24px] font-medium text-[#54342C]"
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF1F6] text-[26px] font-medium leading-none text-[#54342C]"
            aria-label="Удалить товар"
          >
            ×
          </button>
        </div>
      </div>

      <div className="relative hidden md:block">
        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4F8] text-2xl font-semibold leading-none text-[#54342C] transition hover:bg-[#E6AECB] md:bottom-auto md:top-5"
          aria-label="Удалить товар"
        >
          ×
        </button>

        <div className="grid gap-5 pr-12 sm:grid-cols-[96px_1fr] sm:items-start md:grid-cols-[112px_1fr_180px_160px] md:items-center md:pr-14">
          <Link
            href={`/product/${item.slug}`}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[22px] bg-[#FFF4F8] sm:h-28 sm:w-24 md:w-28"
          >
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-[#54342C]">
                Нет фото
              </div>
            )}
          </Link>

          <div className="min-w-0">
            <Link href={`/product/${item.slug}`}>
              <h2 className="text-xl font-bold text-[#54342C] transition hover:opacity-80">
                {item.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm leading-6 text-[#54342C]">
              Печенье KROOKIES с фирменной начинкой.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#FFF4F8] px-4 py-4 text-center md:self-center">
            <p className="text-xl font-black text-[#54342C] sm:text-2xl">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="mt-2 text-sm text-[#54342C]">Цена за штуку {formatPrice(item.price)}</p>
          </div>

          <div className="pb-10 sm:col-span-2 md:col-span-1 md:pb-0 md:pr-0 md:text-right">
            <div className="inline-flex items-center rounded-full border border-[#E0C7AE] bg-white">
              <button
                type="button"
                onClick={() => changeQuantity(item.quantity - 1)}
                className="flex h-10 w-11 items-center justify-center text-lg font-bold text-[#54342C]"
                aria-label="Уменьшить количество"
              >
                −
              </button>

              <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="h-10 w-12 border-x border-[#E0C7AE] bg-white px-2 text-center text-sm font-semibold text-[#54342C] outline-none"
                aria-label="Количество товара"
              />

              <button
                type="button"
                onClick={() => changeQuantity(item.quantity + 1)}
                className="flex h-10 w-11 items-center justify-center text-lg font-bold text-[#54342C]"
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
