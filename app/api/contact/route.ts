import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/resend";

// Simple rate limiting using in-memory map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, serviceInterested, message, honeypot } = body;

    // Honeypot check — if filled, silently reject
    if (honeypot) {
      // Return success to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Store lead in database (graceful fallback if DB is not configured)
    let leadId = null;
    try {
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          serviceInterested: serviceInterested || null,
          message,
          honeypot: null,
        },
      });
      leadId = lead.id;
    } catch (dbError) {
      console.warn("⚠️ Database not configured or unreachable — lead not saved to DB:", dbError);
    }

    // Send notification email
    await sendContactNotification({
      name,
      email,
      phone,
      service: serviceInterested,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: leadId,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
