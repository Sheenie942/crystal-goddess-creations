import { NextResponse } from "next/server";

const SQUARE_BASE = "https://connect.squareup.com/v2";

async function squareFetch(path: string) {
  const token = process.env.SQUARE_ACCESS_TOKEN ?? process.env.SQUARE_TOKEN;
  const res = await fetch(`${SQUARE_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return res.json();
}

export async function GET() {
  try {
    // 1. List custom attribute definitions
    const definitions = await squareFetch("/catalog/custom-attribute-definitions?limit=100");

    // 2. Get a page of catalog items with custom attribute values included
    const catalogWithAttrs = await squareFetch(
      "/catalog/list?types=ITEM&include_custom_attribute_values=true&limit=10"
    );

    // Find wolf #2
    const wolfItem = (catalogWithAttrs.objects ?? []).find((o: { item_data?: { name?: string } }) =>
      o.item_data?.name?.toLowerCase().includes("wolf #2") ||
      o.item_data?.name?.toLowerCase().includes("wolf#2")
    );

    return NextResponse.json({
      definitions,
      wolfFound: !!wolfItem,
      wolfId: wolfItem?.id ?? null,
      wolfCustomAttrs: wolfItem?.custom_attribute_values ?? null,
      wolfItemDataKeys: wolfItem ? Object.keys(wolfItem.item_data ?? {}) : [],
      sampleItemKeys: catalogWithAttrs.objects?.[0] ? Object.keys(catalogWithAttrs.objects[0]) : [],
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
