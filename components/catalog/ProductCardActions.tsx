"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { MAX_CART_ITEM_QUANTITY, addOneCartItem, getCartItem, subscribeCart, updateCartItemQuantity } from "@/lib/cart";
import { CartItem } from "@/types/cart";

const PINK = "#E6AECB";
const BROWN = "#54342C";

type ProductCardActionsProps = { product: Omit<CartItem, "quantity"> };

export function ProductCardActions({ product }: ProductCardActionsProps) {
  const [quantity, setQuantity] = useState(0);
  const [inputValue, setInputValue] = useState("0");

  useEffect(() => {
    const sync = () => {
      const cartItem = getCartItem(product.productId);
      const next = cartItem?.quantity || 0;
      setQuantity(next);
      setInputValue(String(next));
    };
    sync();
    return subscribeCart(sync);
  }, [product.productId]);

  function changeQuantity(next: number) {
    updateCartItemQuantity(product.productId, Math.min(MAX_CART_ITEM_QUANTITY, next));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");
    const limitedValue = value ? String(Math.min(MAX_CART_ITEM_QUANTITY, Number(value))) : "";
    setInputValue(limitedValue);
    if (limitedValue) changeQuantity(Number(limitedValue));
  }

  function handleInputBlur() {
    const value = Number(inputValue);
    if (!inputValue || !value || value <= 0) {
      changeQuantity(0);
      return;
    }
    changeQuantity(Math.min(MAX_CART_ITEM_QUANTITY, value));
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addOneCartItem(product)}
        className="w-full rounded-2xl px-5 py-3 font-semibold shadow-lg transition hover:opacity-90"
        style={{ backgroundColor: BROWN, color: "white" }}
      >
        Добавить в корзину
      </button>
    );
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-2xl shadow ring-1 ring-black/5" style={{ backgroundColor: PINK, color: BROWN }}>
      <button type="button" onClick={() => changeQuantity(quantity - 1)} className="h-12 w-14 text-xl font-black">−</button>
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="h-12 w-16 bg-white/50 px-2 text-center font-black outline-none"
        aria-label="Количество товара"
      />
      <button type="button" onClick={() => changeQuantity(quantity + 1)} disabled={quantity >= MAX_CART_ITEM_QUANTITY} className="h-12 w-14 text-xl font-black disabled:opacity-40">+</button>
    </div>
  );
}
