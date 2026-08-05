import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};
    if (featured === "true") where.featured = true;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}
