import crypto from "crypto";

type CreateYookassaPaymentInput = {
  orderId: string;
  orderNumber: number;
  amount: number;
  description: string;
};

type YookassaPaymentResponse = {
  id: string;
  status: string;
  amount: { value: string; currency: string };
  confirmation?: { type: string; confirmation_url?: string };
};

export type YookassaWebhookEvent =
  | "payment.succeeded"
  | "payment.canceled"
  | "payment.waiting_for_capture"
  | "refund.succeeded";

export type YookassaWebhookBody = {
  type: "notification";
  event: YookassaWebhookEvent;
  object: {
    id: string;
    status: string;
    paid?: boolean;
    amount?: { value: string; currency: string };
    metadata?: { orderId?: string; orderNumber?: string };
  };
};

function getYookassaAuthHeader() {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  if (!shopId || !secretKey) throw new Error("yookassa_credentials_missing");
  return `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`;
}

function formatAmountFromKopecks(kopecks: number) {
  return (kopecks / 100).toFixed(2);
}

export function createIdempotenceKey(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function yookassaAmountToKopecks(value: string) {
  return Math.round(Number(value) * 100);
}

export async function createYookassaPayment({ orderId, orderNumber, amount, description }: CreateYookassaPaymentInput) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) throw new Error("site_url_missing");

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: getYookassaAuthHeader(),
      "Content-Type": "application/json",
      "Idempotence-Key": createIdempotenceKey(`krookies-order-${orderId}`),
    },
    body: JSON.stringify({
      amount: { value: formatAmountFromKopecks(amount), currency: "RUB" },
      capture: true,
      confirmation: { type: "redirect", return_url: `${siteUrl}/payment/success?order=${orderNumber}` },
      description,
      metadata: { orderId, orderNumber: String(orderNumber) },
    }),
  });

  const data = (await response.json()) as YookassaPaymentResponse;
  if (!response.ok) {
    console.error("YooKassa create payment error:", data);
    throw new Error("yookassa_payment_create_failed");
  }
  if (!data.confirmation?.confirmation_url) throw new Error("yookassa_confirmation_url_missing");

  return {
    providerPaymentId: data.id,
    status: data.status,
    paymentUrl: data.confirmation.confirmation_url,
    rawResponse: data,
  };
}
