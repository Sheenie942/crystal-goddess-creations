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

    return NextResponse.json({
      id: wolfObj.id,
      name: itemData.name,
      // Candidate fields for "featured" flag:
      sortName: itemData.sortName ?? null,
      kitchenName: itemData.kitchenName ?? null,
      labelColor: itemData.labelColor ?? null,
      reportingCategory: itemData.reportingCategory ?? null,
      ecomSeoData: itemData.ecomSeoData ?? null,
      description: itemData.description ?? null,
      descriptionHtml: itemData.descriptionHtml ?? null,
      // All itemData keys for reference:
      itemDataKeys: Object.keys(itemData),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
