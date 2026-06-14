import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse all handcrafted jewellery, crystals, and sacred pieces.",
};

async function getAllProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">Shop All</h1>
        <p className="text-purple-300/70">
          {products.length > 0
            ? `${products.length} handcrafted pieces`
            : "All of our handcrafted pieces"}
        </p>
      </div>
      <hr className="divider-glow mb-10" />
      <ProductGrid
        products={products}
        emptyMessage="Products are loading — please check back soon or configure your Square API credentials."
      />
    </div>
  );
}
