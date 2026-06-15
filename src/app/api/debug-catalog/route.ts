import { NextResponse } from "next/server";
import { getSquareClient } from "@/lib/square";

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
    const client = getSquareClient();

    // Find the wolf item ID
    let wolfId: string | null = null;
    for await (const item of await client.catalog.list({ types: "ITEM" })) {
      const o = item as unknown as Record<string, unknown>;
      const name = ((o.itemData as Record<string, unknown>)?.name as string) ?? "";
      if (name.toLowerCase().includes("wolf #2") || name.toLowerCase().includes("wolf#2")) {
        wolfId = o.id as string;
        break;
      }
    }

    if (!wolfId) {
      return NextResponse.json({ error: "Wolf item not found in catalog" });
    }

    // 1. List all custom attribute definitions for ITEM
    const definitions = await squareFetch("/catalog/custom-attribute-definitions?limit=100");

    // 2. List all custom attributes on this specific item
    const itemCustomAttrs = await squareFetch(
      `/catalog/object/${wolfId}/custom-attributes`
    );

    return NextResponse.json({
      wolfId,
      definitions,
      itemCustomAttrs,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
