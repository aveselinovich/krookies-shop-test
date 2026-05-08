import { CartItem, CartState } from "@/types/cart";

export const CART_STORAGE_KEY = "krookies_cart";
export const CART_UPDATED_EVENT = "krookies-cart-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function emitCartUpdate() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartItems(): CartItem[] {
  if (!isBrowser()) return [];

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!rawCart) return [];

  try {
    const parsedCart = JSON.parse(rawCart) as CartItem[];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  emitCartUpdate();
}

export function subscribeCart(callback: () => void) {
  if (!isBrowser()) return () => {};

  const handler = () => callback();

  window.addEventListener(CART_UPDATED_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function clearCart() {
  saveCartItems([]);
}

export function getCartState(items: CartItem[]): CartState {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, totalQuantity, subtotal };
}

export function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartItem(productId: string) {
  return getCartItems().find((item) => item.productId === productId) || null;
}

export function addCartItem(newItem: CartItem) {
  const cart = getCartItems();
  const existingItem = cart.find((item) => item.productId === newItem.productId);
  const nextCart = existingItem
    ? cart.map((item) =>
        item.productId === newItem.productId
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      )
    : [...cart, newItem];

  saveCartItems(nextCart);
  return nextCart;
}

export function addOneCartItem(newItem: Omit<CartItem, "quantity">) {
  return addCartItem({ ...newItem, quantity: 1 });
}

export function updateCartItemQuantity(productId: string, quantity: number) {
  const normalizedQuantity = Math.floor(Number(quantity));

  if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
    return removeCartItem(productId);
  }

  const nextCart = getCartItems().map((item) =>
    item.productId === productId ? { ...item, quantity: normalizedQuantity } : item
  );

  saveCartItems(nextCart);
  return nextCart;
}

export function removeCartItem(productId: string) {
  const nextCart = getCartItems().filter((item) => item.productId !== productId);
  saveCartItems(nextCart);
  return nextCart;
}
