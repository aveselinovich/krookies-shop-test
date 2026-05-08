export type ProductBadge = "hit" | "new" | "limited";

export type ProductListItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  oldPrice: number | null;
  weight: string | null;
  imageUrl: string | null;
  badge: ProductBadge | null;
  isAvailable: boolean;
  sortOrder: number;
};

export type ProductDetails = ProductListItem & {
  description: string | null;
  composition: string | null;
  allergens: string | null;
  images: string[];
};
