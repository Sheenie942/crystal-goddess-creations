import { NextResponse } from "next/server";
import { getSquareClient } from "@/lib/square";

export async function GET() {
  try {
    const client = getSquareClient();

    // Find the wolf item
    let wolfId: string | null = null;
    let wolfObj: Record<string, unknown> | null = null;
    for await (const item of await client.catalog.list({ types: "ITEM" })) {
      const o = item as Record<string, unknown>;
      const name = ((o.itemData as Record<string, unknown>)?.name as string) ?? "";
      if (name.toLowerCase().includes("wolf")) {
        wolfId = o.id as string;
        wolfObj = o;
        break;
      }
    }

    if (!wolfId || !wolfObj) {
      return NextResponse.json({ error: "Wolf item not found in catalog" });
    }

    // Fetch the item individually (sometimes returns more data)
    const retrieved = await client.catalog.object.get({ objectId: wolfId, includeRelatedObjects: false });

    // Fetch custom attributes for this item
    let customAttrs: unknown[] = [];
    try {
      for await (const attr of await (client.catalog as unknown as {
        customAttributeValues: { list: (args: { resourceType: string; resourceId: string }) => AsyncIterable<unknown>
        }
      }).customAttributeValues.list({ resourceType: "ITEM", resourceId: wolfId })) {
        customAttrs.push(attr);
      }
    } catch (e) {
      customAttrs = [{ listError: String(e) }];
    }

    return NextResponse.json({
      wolfId,
      listTopLevelKeys: Object.keys(wolfObj),
      listCustomAttributeValues: wolfObj.customAttributeValues ?? null,
      retrievedTopLevelKeys: Object.keys(retrieved.object ?? {}),
      retrievedCustomAttributeValues: (retrieved.object as Record<string, unknown> | undefined)?.customAttributeValues ?? null,
      customAttrsFromApi: customAttrs,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
