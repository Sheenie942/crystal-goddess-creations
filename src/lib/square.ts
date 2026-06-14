import { SquareClient, SquareEnvironment } from "square";

// Lazy singleton — only instantiated on first API request, not at build time
let _client: SquareClient | null = null;

export function getSquareClient(): SquareClient {
  if (_client) return _client;
  const token = process.env.SQUARE_ACCESS_TOKEN ?? process.env.SQUARE_TOKEN;
  if (!token) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set.");
  }
  _client = new SquareClient({
    token,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
  return _client;
}

/** @deprecated Use getSquareClient() instead */
export const squareClient = new Proxy({} as SquareClient, {
  get(_target, prop) {
    return (getSquareClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/** Convert Square money amount (bigint cents) to a JS number */
export function toNumber(amount: bigint | null | undefined): number {
  return amount ? Number(amount) : 0;
}

/** Format cents as a currency string, e.g. 9500 → "A$95.00" */
export function formatPrice(cents: number, currency = "AUD"): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
