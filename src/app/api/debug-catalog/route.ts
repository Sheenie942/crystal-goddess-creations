import { NextResponse } from "next/server";
import { getSquareClient } from "@/lib/square";

export async function GET() {
  try {
    const client = getSquareClient();
    const objects: unknown[] = [];
    for await (const item of await client.catalog.list({ types: "ITEM" })) {
      objects.push(item);
      if (objects.length >= 3) break; // just first 3 items
    }

    const sample = objects.map((obj) => {
      const o = obj as Record<string, unknown>;
      return {
        id: o.id,
        type: o.type,
        topLevelKeys: Object.keys(o),
        customAttributeValues: o.customAttributeValues ?? null,
        name: (o.itemData as Record<string, unknown>)?.name ?? null,
        descriptionHtml: (o.itemData as Record<string, unknown>)?.descriptionHtml ?? null,
      };
    });

    return NextResponse.json({ count: objects.length, sample });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
