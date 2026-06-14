"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/square";
import clsx from "clsx";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#12091f] border-l border-purple-900/50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-purple-400" />
            <span className="font-serif text-lg font-bold text-purple-100">
              Your Cart{" "}
              {totalItems > 0 && (
                <span className="text-sm text-purple-400 font-normal">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded text-purple-300 hover:text-white hover:bg-purple-900/40 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-purple-800" />
              <p className="text-purple-300 text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 bg-purple-950/30 rounded-xl p-3"
              >
                {item.imageUrl && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-purple-100 truncate">
                    {item.name}
                  </p>
                  {item.variantName && item.variantName !== "Regular" && (
                    <p className="text-xs text-purple-400">{item.variantName}</p>
                  )}
                  <p className="text-sm text-pink-400 font-semibold mt-1">
                    {formatPrice(item.price, item.currency)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="w-6 h-6 flex items-center justify-center rounded bg-purple-900/50 hover:bg-purple-700/50 text-purple-200 transition"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm text-purple-200 w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="w-6 h-6 flex items-center justify-center rounded bg-purple-900/50 hover:bg-purple-700/50 text-purple-200 transition"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      aria-label="Remove item"
                      className="ml-auto w-6 h-6 flex items-center justify-center rounded hover:bg-red-900/40 text-purple-400 hover:text-red-400 transition"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-5 py-4 border-t border-purple-900/40 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-300">Subtotal</span>
              <span className="text-purple-100 font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-purple-400/70">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold transition shadow-lg shadow-purple-900/30"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={onClose}
              className="block w-full text-center py-2 text-sm text-purple-400 hover:text-purple-200 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
