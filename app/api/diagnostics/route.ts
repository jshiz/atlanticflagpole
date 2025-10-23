import { NextResponse } from "next/server"
import { runDiagnostics } from "@/lib/diagnostics"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const report = await runDiagnostics()
    return NextResponse.json(report)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to run diagnostics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
