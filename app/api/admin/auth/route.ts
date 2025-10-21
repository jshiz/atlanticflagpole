import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = "123" // TODO: Move to environment variable in production

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Set HTTP-only cookie for authentication
      const cookieStore = await cookies()
      cookieStore.set("admin_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin_auth")

    return NextResponse.json({ authenticated: authCookie?.value === "authenticated" })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_auth")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
