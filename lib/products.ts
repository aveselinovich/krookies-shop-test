import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedProducts() {
  noStore();

  return prisma.product.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      price: true,
      oldPrice: true,
      weight: true,
      imageUrl: true,
      badge: true,
      isAvailable: true,
      sortOrder: true,
    },
  });
}

export async function getProductBySlug(slug: string) {
  noStore();

  return prisma.product.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      description: true,
      price: true,
      oldPrice: true,
      weight: true,
      composition: true,
      allergens: true,
      imageUrl: true,
      images: true,
      badge: true,
      isAvailable: true,
      sortOrder: true,
    },
  });
}
