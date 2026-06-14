import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/square";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants[0];
  const price = firstVariant ? formatPrice(firstVariant.price, firstVariant.currency) : null;
  const image = product.images[0];
  const isLowStock = firstVariant?.inventoryCount !== undefined && firstVariant.inventoryCount <= 3;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-[#1a0f2e]/60 rounded-2xl overflow-hidden border border-purple-900/30 card-glow"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-purple-950/40">
        {image ? (
          <Image
            src={image.url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={40} className="text-purple-800" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-pink-500 text-white shadow">
              New
            </span>
          )}
          {product.isFeatured && !product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-600 text-white shadow">
              Featured
            </span>
          )}
          {isLowStock && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-600/90 text-white shadow">
              Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-purple-100 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        {price && (
          <p className="mt-1.5 text-pink-400 font-semibold text-sm">{price}</p>
        )}
        <div className="mt-2 flex items-center justify-end">
          <span className="flex items-center gap-1 text-xs text-purple-400 group-hover:text-purple-200 transition">
            <ShoppingBag size={12} />
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
