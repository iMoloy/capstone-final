import { NextResponse } from "next/server";

// Simple health probe — used by Vercel and uptime monitors
export function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "briefcraft",
  });
}
