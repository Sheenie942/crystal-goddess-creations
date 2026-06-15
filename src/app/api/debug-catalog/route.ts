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
    // Paginate through ALL items to find wolf #2
    let wolfId: string | null = null;
    let cursor: string | undefined;

    outer: do {
      const url = `/catalog/list?types=ITEM&limit=100${cursor ? `&cursor=${cursor}` : ""}`;
      const page = await squareFetch(url) as { objects?: Array<{ id: string; item_data?: { name?: string } }>; cursor?: string };
      for (const obj of page.objects ?? []) {
        const name = obj.item_data?.name?.toLowerCase() ?? "";
        if (name.includes("wolf #2") || name.includes("wolf#2")) {
          wolfId = obj.id;
          break outer;
        }
      }
      cursor = page.cursor;
    } while (cursor);

    if (!wolfId) {
      return NextResponse.json({ error: "Wolf #2 not found in catalog" });
    }

    // Fetch the item directly with custom attribute values
    const itemDirect = await squareFetch(
      `/catalog/object/${wolfId}?include_related_objects=false&include_category_path_to_root=false`
    );

    // Fetch custom attributes separately
    const customAttrs = await squareFetch(`/catalog/object/${wolfId}/custom-attributes`);

    // Also list definitions
    const definitions = await squareFetch("/catalog/custom-attribute-definitions?limit=100");

    return NextResponse.json({
      wolfId,
      itemTopLevelKeys: Object.keys(itemDirect.object ?? {}),
      itemCustomAttributeValues: (itemDirect.object as Record<string, unknown>)?.custom_attribute_values ?? null,
      customAttrs,
      definitions,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
