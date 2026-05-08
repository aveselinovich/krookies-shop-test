export const SESSION_COOKIE_NAME = "krookies_session";

export type SessionPayload = {
  userId: string;
  role: "customer" | "admin";
};

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  if (typeof atob === "function") {
    return decodeURIComponent(
      Array.from(atob(padded))
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
  }
  return Buffer.from(value, "base64url").toString("utf8");
}

export function decodeSessionTokenWithoutVerification(token: string): SessionPayload | null {
  const [encodedPayload] = token.split(".");
  if (!encodedPayload) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    if (!payload.userId || !payload.role) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}
