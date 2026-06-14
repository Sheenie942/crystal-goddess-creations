"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/square";
import { getEmbedUrl, isDirectVideo } from "@/lib/product-videos";
import type { Product } from "@/types";

export default function ProductPageClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product ?? null);
        if (data.product?.variants?.[0]) {
          setSelectedVariantId(data.product.variants[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl bg-purple-950/60" />
          <div className="space-y-4">
            <div className="h-8 bg-purple-900/40 rounded w-3/4" />
            <div className="h-6 bg-purple-900/30 rounded w-1/4" />
            <div className="h-32 bg-purple-900/20 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) notFound();

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem({
      productId: product!.id,
      variantId: selectedVariant.id,
      name: product!.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      currency: selectedVariant.currency,
      quantity: 1,
      imageUrl: product!.images[0]?.url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const images = product.images;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-purple-400/70 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-purple-300 transition">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-purple-300 transition">Shop</Link>
        <span>/</span>
        <span className="text-purple-200 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-purple-950/40 border border-purple-900/30">
            {images.length > 0 ? (
              <Image
                src={images[imageIndex].url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={64} className="text-purple-800" />
              </div>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setImageIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    i === imageIndex
                      ? "border-purple-500"
                      : "border-purple-900/40 hover:border-purple-600"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} image ${i + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product video (if mapped in src/lib/product-videos.ts) */}
          {(() => {
            const embedUrl = getEmbedUrl(product.id);
            if (!embedUrl) return null;
            return (
              <div className="mt-4 rounded-2xl overflow-hidden border border-purple-900/30">
                {isDirectVideo(embedUrl) ? (
                  <video
                    src={embedUrl}
                    controls
                    playsInline
                    className="w-full aspect-video bg-black"
                  />
                ) : (
                  <iframe
                    src={embedUrl}
                    title={`${product.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                )}
              </div>
            );
          })()}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <h1 className="font-serif text-3xl font-bold text-purple-100 leading-snug">
            {product.name}
          </h1>

          {selectedVariant && (
            <p className="text-2xl text-pink-400 font-semibold">
              {formatPrice(selectedVariant.price, selectedVariant.currency)}
            </p>
          )}

          <hr className="divider-glow" />

          {/* Variant selector */}
          {product.variants.length > 1 && (
            <div>
              <p className="text-sm text-purple-300 mb-2 font-medium">Option</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm border transition ${
                      selectedVariantId === v.id
                        ? "bg-purple-700 border-purple-500 text-white"
                        : "border-purple-800/50 text-purple-300 hover:border-purple-600 hover:text-white"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-purple-300/80 text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition shadow-lg ${
              added
                ? "bg-green-700 text-white"
                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-purple-900/30"
            }`}
          >
            <ShoppingBag size={18} />
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          <Link
            href="/checkout"
            className="text-center py-3 rounded-xl border border-purple-600/50 hover:border-purple-400 text-purple-200 hover:text-white text-sm font-semibold transition"
          >
            Buy Now
          </Link>

          <p className="text-xs text-purple-400/60 text-center">
            Secure checkout powered by Square
          </p>
        </div>
      </div>
    </div>
  );
}
