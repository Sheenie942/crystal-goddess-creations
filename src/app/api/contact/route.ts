import { NextResponse } from "next/server";
import type { CustomPieceRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body: CustomPieceRequest = await request.json();
    const { name, email, description, budget } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // In production, send an email here using Nodemailer, Resend, SendGrid, etc.
    // For now, log the request and return success.
    console.log("Custom piece request received:", { name, email, description, budget });

    // TODO: Replace with real email sending, e.g.:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Custom Piece Request from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\n${description}`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
