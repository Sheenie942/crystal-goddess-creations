import Link from "next/link";
import { ShoppingBag } from "lucide-react";

// Server component — fetches featured products at request time
async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?featured=true&limit=8`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold gradient-text mb-1">
              Featured Pieces
            </h2>
            <p className="text-purple-300/70 text-sm">
              Handpicked favourites and new arrivals
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm text-purple-400 hover:text-purple-200 transition flex items-center gap-1"
          >
            Shop All →
          </Link>
        </div>

        {products.length === 0 ? (
          // Placeholder cards shown before Square API is configured
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1a0f2e]/60 rounded-2xl overflow-hidden border border-purple-900/30 animate-pulse"
              >
                <div className="aspect-square bg-purple-950/60" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-purple-900/50 rounded w-3/4" />
                  <div className="h-3 bg-purple-900/30 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(
              (product: {
                id: string;
                name: string;
                variants: { price: number; currency: string }[];
                images: { url: string }[];
              }) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group block bg-[#1a0f2e]/60 rounded-2xl overflow-hidden border border-purple-900/30 card-glow"
                >
                  <div className="relative aspect-square overflow-hidden bg-purple-950/40">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={40} className="text-purple-800" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-purple-100 line-clamp-2">
                      {product.name}
                    </p>
                    {product.variants[0] && (
                      <p className="mt-1 text-pink-400 font-semibold text-sm">
                        {new Intl.NumberFormat("en-AU", {
                          style: "currency",
                          currency: product.variants[0].currency,
                        }).format(product.variants[0].price / 100)}
                      </p>
                    )}
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
