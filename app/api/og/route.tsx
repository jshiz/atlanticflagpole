import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Atlantic Flagpole"
    const description = searchParams.get("description") || "Premium American-Made Flagpoles"
    const price = searchParams.get("price")

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B365D",
          backgroundImage: "linear-gradient(135deg, #1B365D 0%, #2A4A7C 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            maxWidth: "1000px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#F5F3EF",
              textAlign: "center",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#C8A55C",
              textAlign: "center",
              marginBottom: price ? "20px" : "0",
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
          {price && (
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#F5F3EF",
                backgroundColor: "#C8A55C",
                padding: "20px 40px",
                borderRadius: "12px",
              }}
            >
              ${price}
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#C8A55C",
              letterSpacing: "2px",
            }}
          >
            ATLANTIC FLAGPOLE
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("[v0] OG image generation error:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
