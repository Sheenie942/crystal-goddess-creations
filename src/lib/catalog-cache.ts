import { getSquareClient } from "@/lib/square";

const SQUARE_BASE = "https://connect.squareup.com/v2";

async function squareFetch(path: string) {
  const token = process.env.SQUARE_ACCESS_TOKEN ?? process.env.SQUARE_TOKEN;
  const res = await fetch(`${SQUARE_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return res.json() as Promise<{ objects?: Array<Record<string, unknown>>; cursor?: string }>;
}

/** Fetch all ITEM objects via REST API (includes custom_attribute_values) */
async function collectItemsRest(): Promise<Array<Record<string, unknown>>> {
  const objects: Array<Record<string, unknown>> = [];
  let cursor: string | undefined;
  do {
    const url = `/catalog/list?types=ITEM&limit=100${cursor ? `&cursor=${cursor}` : ""}`;
    const page = await squareFetch(url);
    for (const obj of page.objects ?? []) objects.push(obj);
    cursor = page.cursor;
  } while (cursor);
  return objects;
}

async function collectCatalog(types: string) {
  const client = getSquareClient();
  const objects: unknown[] = [];
  for await (const item of await client.catalog.list({ types })) {
    objects.push(item);
  }
  return objects as Array<Record<string, unknown>>;
}

// In-memory cache for Square catalog data (5-minute TTL)
let catalogCache: {
  objects: Array<Record<string, unknown>>;
  imageMap: Map<string, string>;
  categoryNameMap: Map<string, string>;
  expiresAt: number;
} | null = null;

export async function getCatalogData() {
  if (catalogCache && Date.now() < catalogCache.expiresAt) {
    return catalogCache;
  }
  const [objects, imageObjects, catObjects] = await Promise.all([
    collectItemsRest(),
    collectCatalog("IMAGE"),
    collectCatalog("CATEGORY"),
  ]);
  const imageMap = new Map<string, string>();
  for (const img of imageObjects as Array<{ id?: string; imageData?: { url?: string } }>) {
    if (img.id && img.imageData?.url) imageMap.set(img.id, img.imageData.url);
  }
  const categoryNameMap = new Map<string, string>();
  for (const cat of catObjects as Array<{ id?: string; categoryData?: { name?: string } }>) {
    if (cat.id && cat.categoryData?.name) categoryNameMap.set(cat.id, cat.categoryData.name);
  }
  catalogCache = { objects, imageMap, categoryNameMap, expiresAt: Date.now() + 5 * 60 * 1000 };
  return catalogCache;
}
