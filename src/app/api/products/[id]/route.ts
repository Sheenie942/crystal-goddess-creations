import { NextResponse } from "next/server";
import { toNumber } from "@/lib/square";
import { getCatalogData } from "@/lib/catalog-cache";
import type { Product, ProductImage, ProductVariant } from "@/types";

// GET /api/products/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use shared catalog cache — no extra Square API call
    const { objects, imageMap } = await getCatalogData();

    const obj = objects.find((o) => o.id === id) as { id?: string; itemData?: Record<string, unknown> } | undefined;
    if (!obj?.itemData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const item = obj.itemData as {
      name?: string;
      description?: string;
      imageIds?: string[];
      variations?: Array<{ id?: string; itemVariationData?: { name?: string; priceMoney?: { amount?: bigint; currency?: string } } }>;
    };

    const images: ProductImage[] = (item.imageIds ?? []).map((imgId: string) => ({
      id: imgId,
      url: imageMap.get(imgId) ?? "",
      caption: "",
    })).filter((img: ProductImage) => img.url);

    const variants: ProductVariant[] = (item.variations ?? []).map((v) => ({
      id: v.id ?? "",
      name: v.itemVariationData?.name ?? "Regular",
      price: toNumber(v.itemVariationData?.priceMoney?.amount),
      currency: v.itemVariationData?.priceMoney?.currency ?? "AUD",
    }));

    const product: Product = {
      id: obj.id ?? "",
      name: item.name ?? "Unnamed product",
      description: item.description ?? "",
      categorySlug: "",
      images,
      variants,
    };

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Square product fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
