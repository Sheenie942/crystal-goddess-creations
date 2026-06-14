import { getSquareClient } from "@/lib/square";

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
    collectCatalog("ITEM"),
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
