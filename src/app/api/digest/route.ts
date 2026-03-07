import { NextRequest, NextResponse } from "next/server";
import { generateAIDigest } from "@/lib/aiDigest";
import { generateFallbackDigest } from "@/lib/fallbackDigest";
import { Incident } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const incidents = (body?.incidents ?? []) as Incident[];

    if (!Array.isArray(incidents) || incidents.length === 0) {
      const fallback = generateFallbackDigest([]);
      return NextResponse.json(fallback);
    }

    if (!process.env.OPENAI_API_KEY) {
      const fallback = generateFallbackDigest(incidents);
      return NextResponse.json(fallback);
    }

    try {
      const digest = await generateAIDigest(incidents);
      return NextResponse.json(digest);
    } catch (aiError) {
      console.error("AI digest failed, using fallback:", aiError);
      const fallback = generateFallbackDigest(incidents);
      return NextResponse.json(fallback);
    }
  } catch (error) {
    console.error("Digest request failed:", error);
    return NextResponse.json(
      { error: "Failed to generate digest." },
      { status: 500 }
    );
  }
}