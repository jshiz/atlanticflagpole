import { type NextRequest, NextResponse } from "next/server"
import { assembleBundle } from "@/lib/bundles/assembleBundle"
import { fetchBundleComponents } from "@/lib/shopify/queries/bundleComponents"
import { getProduct } from "@/lib/shopify"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const { productHandle, variantId } = await req.json()

    if (!productHandle) {
      return NextResponse.json({ error: "Product handle required" }, { status: 400 })
    }

    // Fetch parent bundle product
    const product = await getProduct(productHandle)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find variant
    const variant = variantId ? product.variants.find((v) => v.id === variantId) : product.variants[0]

    if (!variant) {
      return NextResponse.json({ error: "Variant not found" }, { status: 404 })
    }

    // Assemble bundle items
    const bundleItems = assembleBundle(product, variant)

    if (!bundleItems.length) {
      // Not a bundle product, return empty
      return NextResponse.json({
        parent: {
          id: product.id,
          variantId: variant.id,
          title: product.title,
          price: variant.price.amount,
          compareAtPrice: variant.compareAtPrice?.amount,
        },
        items: [],
        isBundle: false,
      })
    }

    // Fetch component product details
    const components = await fetchBundleComponents(bundleItems.map((i) => i.handle))

    // Merge
    const resolvedItems = bundleItems.map((item) => {
      const component = components.find((c: any) => c.handle === item.handle)
      return {
        ...item,
        id: component?.id,
        title: component?.title || item.handle.replace(/-/g, " "),
        image: component?.featuredImage?.url || "/placeholder.svg?height=100&width=100",
        price: 0, // Always $0 in bundle
      }
    })

    return NextResponse.json({
      parent: {
        id: product.id,
        variantId: variant.id,
        title: product.title,
        price: variant.price.amount,
        compareAtPrice: variant.compareAtPrice?.amount,
      },
      items: resolvedItems,
      isBundle: true,
    })
  } catch (error) {
    console.error("[v0] Bundle resolve error:", error)
    return NextResponse.json({ error: "Failed to resolve bundle" }, { status: 500 })
  }
}
