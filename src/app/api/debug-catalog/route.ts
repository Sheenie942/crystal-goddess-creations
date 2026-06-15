import { NextResponse } from "next/server";
import { getSquareClient } from "@/lib/square";

export async function GET() {
  try {
    const client = getSquareClient();

    // Find the wolf item
    let wolfObj: Record<string, unknown> | null = null;
    for await (const item of await client.catalog.list({ types: "ITEM" })) {
      const o = item as unknown as Record<string, unknown>;
      const name = ((o.itemData as Record<string, unknown>)?.name as string) ?? "";
      if (name.toLowerCase().includes("wolf")) {
        wolfObj = o;
        break;
      }
    }

    if (!wolfObj) {
      return NextResponse.json({ error: "Wolf item not found in catalog" });
    }

    const itemData = wolfObj.itemData as Record<string, unknown>;

    // Helper to make BigInt-safe plain objects
    const safe = (v: unknown): unknown => JSON.parse(JSON.stringify(v, (_k, val) =>
      typeof val === "bigint" ? val.toString() : val
    ));

    return NextResponse.json({
      id: wolfObj.id,
      name: itemData.name,
      // Candidate fields for "featured" flag:
      sortName: safe(itemData.sortName ?? null),
      kitchenName: safe(itemData.kitchenName ?? null),
      labelColor: safe(itemData.labelColor ?? null),
      reportingCategory: safe(itemData.reportingCategory ?? null),
      ecomSeoData: safe(itemData.ecomSeoData ?? null),
      description: safe(itemData.description ?? null),
      descriptionHtml: safe(itemData.descriptionHtml ?? null),
      // All itemData keys for reference:
      itemDataKeys: Object.keys(itemData),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
