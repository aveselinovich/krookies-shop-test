export type CartItem = {
  productId: string;
  title: string;
  shortDescription?: string | null;
  slug: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
};
