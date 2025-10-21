import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(null)
  }

  return NextResponse.json({
    customerId: session.customerId,
    email: session.email,
    firstName: session.firstName,
    lastName: session.lastName,
  })
}
