import { prisma } from "@/lib/prisma";

export async function getAccountOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      paymentStatus: true,
      deliveryStatus: true,
      total: true,
      createdAt: true,
      items: { select: { quantity: true } },
    },
  });
}

export async function getAccountOrderById(userId: string, orderId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: { orderBy: { createdAt: "asc" } }, payment: true },
  });
}
