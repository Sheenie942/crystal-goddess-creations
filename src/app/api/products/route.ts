import { NextResponse } from "next/server";
import { toNumber } from "@/lib/square";
import { getCatalogData } from "@/lib/catalog-cache";
import type { Product, ProductImage, ProductVariant } from "@/types";

// Maps Square category names → site category slugs
const SQUARE_CATEGORY_MAP: Record<string, string> = {
  // Jewellery
  "Jewellery":            "jewellery",
  "Necklaces & Pendants": "jewellery",
  "Bracelets":            "jewellery",
  "Earrings":             "jewellery",
  "Rings":                "jewellery",
  "Goddess Clips":        "jewellery",
  // Crystals
  "Hearts":               "crystals",
  "Points/Towers":        "crystals",
  "Towers & Pyramids":    "crystals",
  "Pyramids":             "crystals",
  "Spheres & Free forms": "crystals",
  "Fossils":              "crystals",
  "Large tumbles":        "crystals",
  "Carvings":             "crystals",
  "Bowls":                "crystals",
  "Stands":               "crystals",
  // Top-level categories
  "Selenite Lamps":       "selenite-lamps",
  "Magnets":              "magnets",
  "Mugs":                 "mugs",
  "Goddess Boxes":        "custom-pieces",
  "Other":                "crystals",
};

// Maps Square category names → site subcategory slugs (within a parent category)
const SQUARE_SUBCATEGORY_MAP: Record<string, string> = {
  "Necklaces & Pendants": "necklaces-pendants",
  "Bracelets":            "bracelets",
  "Earrings":             "earrings",
  "Rings":                "rings",
  "Goddess Clips":        "goddess-clips",
  "Hearts":               "hearts",
  "Points/Towers":        "towers-pyramids",
  "Towers & Pyramids":    "towers-pyramids",
  "Pyramids":             "towers-pyramids",
  "Spheres & Free forms": "spheres-free-forms",
  "Fossils":              "fossils",
  "Carvings":             "carvings",
  "Bowls":                "clusters-geodes",
};

// GET /api/products?category=jewellery&featured=true&limit=8
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get("category");
    const featuredOnly = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") ?? "100", 10);

    // Fetch all catalog data (cached for 5 minutes)
    const { objects, imageMap, categoryNameMap } = await getCatalogData();

    const products: Product[] = [];

    for (const obj of objects as Array<{ id?: string; itemData?: Record<string, unknown> }>) {
      if (!obj.itemData) continue;

      const item = obj.itemData as {
        name?: string;
        description?: string;
        descriptionHtml?: string;
        labelColor?: string;
        categoryId?: string;
        imageIds?: string[];
        variations?: Array<{ id?: string; itemVariationData?: { name?: string; priceMoney?: { amount?: bigint; currency?: string } } }>;
      };

      // Determine category slug from Square category name via mapping
      const squareCategoryId = (item.categories as Array<{ id?: string }> | undefined)?.[0]?.id;
      const squareCategoryName = squareCategoryId
        ? categoryNameMap.get(squareCategoryId) ?? ""
        : "";
      const categorySlug = SQUARE_CATEGORY_MAP[squareCategoryName] ?? "";

      // Apply category filter if provided
      if (categoryFilter && categorySlug !== categoryFilter) continue;

      // Build images array
      const images: ProductImage[] = (item.imageIds ?? []).map((id: string) => ({
        id,
        url: imageMap.get(id) ?? "",
      })).filter((img: ProductImage) => img.url);

      // Build variants
      const variants: ProductVariant[] = (item.variations ?? []).map((v) => ({
        id: v.id ?? "",
        name: v.itemVariationData?.name ?? "Regular",
        price: toNumber(v.itemVariationData?.priceMoney?.amount),
        currency: v.itemVariationData?.priceMoney?.currency ?? "AUD",
        inventoryCount: undefined,
      }));

      if (variants.length === 0) continue;

      const product: Product = {
        id: obj.id ?? "",
        name: item.name ?? "Unnamed product",
        description: item.description ?? "",
        categorySlug,
        subcategorySlug: SQUARE_SUBCATEGORY_MAP[squareCategoryName] ?? undefined,
        images,
        variants,
        isFeatured: (item.descriptionHtml ?? "").toLowerCase().includes("featured"),
        isNewArrival: (item.descriptionHtml ?? "").toLowerCase().includes("new arrival"),
        tags: item.labelColor ? [item.labelColor] : [],
      };

      if (featuredOnly && !product.isFeatured) continue;

      products.push(product);
      if (products.length >= limit) break;
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Square catalog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
