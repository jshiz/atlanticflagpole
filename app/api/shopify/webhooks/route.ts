import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { revalidatePath, revalidateTag } from "next/cache"

const SECRET = process.env.SHOPIFY_APP_API_SECRET_KEY || ""

function verify(raw: string, sig: string | null) {
  if (!sig || !SECRET) return false
  try {
    const digest = crypto.createHmac("sha256", SECRET).update(raw, "utf8").digest("base64")
    return crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(sig, "utf8"))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get("x-shopify-hmac-sha256")
  const topic = req.headers.get("x-shopify-topic")

  if (!verify(raw, sig)) {
    console.log("[v0] Webhook verification failed")
    return new NextResponse("Invalid", { status: 401 })
  }

  const payload = JSON.parse(raw || "{}")

  try {
    console.log(`[v0] Webhook received: ${topic}`)
    switch (topic) {
      case "products/create":
      case "products/update":
        if (payload?.handle) {
          revalidatePath(`/products/${payload.handle}`)
          console.log(`[v0] Revalidated product: ${payload.handle}`)
        }
        revalidateTag("products")
        revalidateTag(`product-${payload?.handle}`)
        break
      case "products/delete":
        revalidateTag("products")
        console.log("[v0] Revalidated products after delete")
        break
      case "collections/create":
      case "collections/update":
      case "collections/delete":
        if (payload?.handle) {
          revalidatePath(`/collections/${payload.handle}`)
          console.log(`[v0] Revalidated collection: ${payload.handle}`)
        }
        revalidateTag("collections")
        revalidateTag(`collection-${payload?.handle}`)
        break
      default:
        console.log(`[v0] Unhandled webhook topic: ${topic}`)
        break
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[v0] Webhook error:", e)
    return new NextResponse("Error", { status: 500 })
  }
}
