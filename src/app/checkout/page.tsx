"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/square";

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<{
        card: () => Promise<{
          attach: (selector: string) => Promise<void>;
          tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
        }>;
      }>;
    };
  }
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cardReady, setCardReady] = useState(false);

  async function initSquareCard() {
    if (!window.Square) return;
    try {
      const payments = await window.Square.payments(
        "sq0idp-InXv53jQpgOaqi3d2Ti36Q",
        "SQUARE_LOCATION" // replaced at runtime
      );
      const card = await payments.card();
      await card.attach("#sq-card-element");
      setCardReady(true);

      const form = document.getElementById("payment-form") as HTMLFormElement;
      form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        const result = await card.tokenize();
        if (result.status === "OK" && result.token) {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sourceId: result.token,
              lineItems: cart.items.map((item) => ({
                name: item.name,
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price,
                currency: item.currency,
              })),
            }),
          });
          const data = await res.json();
          if (res.ok) {
            clearCart();
            setStatus("success");
          } else {
            setErrorMsg(data.error ?? "Payment failed.");
            setStatus("error");
          }
        } else {
          const msg = result.errors?.map((e) => e.message).join(", ") ?? "Card error.";
          setErrorMsg(msg);
          setStatus("error");
        }
      });
    } catch (err) {
      console.error("Square init error", err);
    }
  }

  if (cart.items.length === 0 && status !== "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-purple-300 text-lg mb-6">Your cart is empty.</p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">✨</div>
        <h1 className="font-serif text-3xl font-bold gradient-text mb-3">
          Order Confirmed!
        </h1>
        <p className="text-purple-300 mb-8">
          Thank you for your order. You&apos;ll receive a confirmation email shortly.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        onLoad={initSquareCard}
      />
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order summary */}
        <div>
          <h2 className="font-serif text-2xl font-bold gradient-text mb-6">
            Order Summary
          </h2>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between text-sm text-purple-200 bg-purple-950/30 rounded-xl px-4 py-3"
              >
                <span className="truncate max-w-[60%]">
                  {item.name}
                  {item.variantName !== "Regular" && (
                    <span className="text-purple-400 ml-1">({item.variantName})</span>
                  )}
                  <span className="text-purple-400 ml-1">× {item.quantity}</span>
                </span>
                <span className="font-medium">
                  {formatPrice(item.price * item.quantity, item.currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-purple-100 font-semibold border-t border-purple-800/40 pt-4">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Payment form */}
        <div>
          <h2 className="font-serif text-2xl font-bold gradient-text mb-6">
            Payment
          </h2>
          <form id="payment-form" className="space-y-4">
            <div
              id="sq-card-element"
              className="min-h-[100px] bg-[#1a0f2e]/60 border border-purple-800/50 rounded-xl p-3"
            >
              {!cardReady && (
                <p className="text-purple-400 text-sm animate-pulse">
                  Loading payment form...
                </p>
              )}
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !cardReady}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition shadow-lg"
            >
              {status === "loading" ? "Processing..." : `Pay ${formatPrice(totalPrice)}`}
            </button>
            <p className="text-xs text-purple-400/60 text-center">
              Your payment is secured by Square.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
