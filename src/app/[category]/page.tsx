import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES } from "@/types";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/products?category=${categorySlug}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { sub } = await searchParams;

  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const allProducts = await getCategoryProducts(category);

  // Filter by subcategory if ?sub= param is present
  const products = sub
    ? allProducts.filter((p) => p.subcategorySlug === sub)
    : allProducts;

  const activeSub = cat.subcategories?.find((s) => s.slug === sub);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-purple-400/70 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-purple-300 transition">Home</Link>
        <span>/</span>
        <span className="text-purple-200">{cat.name}</span>
        {activeSub && (
          <>
            <span>/</span>
            <span className="text-purple-200">{activeSub.name}</span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">
          {activeSub ? activeSub.name : cat.name}
        </h1>
        <p className="text-purple-300/70 max-w-xl mx-auto">{cat.description}</p>
      </div>
      <hr className="divider-glow mb-8" />

      {/* Subcategory filters */}
      {cat.subcategories && cat.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Link
            href={`/${category}`}
            className={`px-4 py-1.5 rounded-full text-sm transition border ${
              !sub
                ? "bg-purple-700 border-purple-600 text-white"
                : "border-purple-800/50 text-purple-300 hover:border-purple-600 hover:text-white"
            }`}
          >
            All
          </Link>
          {cat.subcategories.map((s) => (
            <Link
              key={s.slug}
              href={`/${category}?sub=${s.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm transition border ${
                sub === s.slug
                  ? "bg-purple-700 border-purple-600 text-white"
                  : "border-purple-800/50 text-purple-300 hover:border-purple-600 hover:text-white"
              }`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
