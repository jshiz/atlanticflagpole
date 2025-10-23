import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key-change-in-production"
const secret = new TextEncoder().encode(SESSION_SECRET)

export interface SessionData {
  customerId: string
  email: string
  firstName?: string
  lastName?: string
  accessToken: string
  idToken: string
  refreshToken?: string
  expiresAt: number
}

export async function createSession(data: SessionData): Promise<void> {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)

  try {
    const cookieStore = await cookies()
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })
  } catch (error) {
    console.error("[v0] Failed to set session cookie:", error)
    throw error
  }
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return null
    }

    try {
      const { payload } = await jwtVerify(token, secret)
      return payload as unknown as SessionData
    } catch (error) {
      console.error("[v0] Session verification failed:", error)
      return null
    }
  } catch (error) {
    console.error("[v0] Failed to access session cookie:", error)
    return null
  }
}

export async function deleteSession(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("session")
  } catch (error) {
    console.error("[v0] Failed to delete session cookie:", error)
  }
}

export async function updateSession(data: Partial<SessionData>): Promise<void> {
  const session = await getSession()
  if (!session) {
    throw new Error("No session found")
  }

  await createSession({ ...session, ...data })
}
