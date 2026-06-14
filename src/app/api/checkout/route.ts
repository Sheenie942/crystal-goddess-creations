import { NextResponse } from "next/server";
import { squareClient } from "@/lib/square";

export interface CheckoutLineItem {
  name: string;
  variantId: string;
  quantity: number;
  price: number; // cents
  currency: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lineItems, sourceId } = body as {
      lineItems: CheckoutLineItem[];
      sourceId: string; // Square payment token from Web Payments SDK
    };

    if (!sourceId || !lineItems?.length) {
      return NextResponse.json(
        { error: "Missing sourceId or lineItems" },
        { status: 400 }
      );
    }

    // Calculate total in cents
    const totalAmount = lineItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!locationId) {
      return NextResponse.json(
        { error: "Square location not configured" },
        { status: 500 }
      );
    }

    const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const { result } = await squareClient.payments.createPayment({
      sourceId,
      idempotencyKey,
      locationId,
      amountMoney: {
        amount: BigInt(totalAmount),
        currency: lineItems[0]?.currency ?? "AUD",
      },
      note: "Crystal Goddess Creations order",
    });

    return NextResponse.json({ payment: result.payment });
  } catch (error) {
    console.error("Square payment error:", error);
    return NextResponse.json(
      { error: "Payment failed. Please try again." },
      { status: 500 }
    );
  }
}
