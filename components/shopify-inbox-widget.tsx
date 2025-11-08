"use client"

import { useEffect } from "react"

/**
 * Shopify Inbox Widget Component
 * This component loads the Shopify Inbox chat widget on your site.
 * Make sure the Shopify Inbox app is installed and configured in your Shopify admin.
 */
export function ShopifyInboxWidget() {
  useEffect(() => {
    // Load Shopify Inbox script
    const script = document.createElement("script")
    script.src = "/apps/shopify-chat"
    script.async = true
    script.defer = true

    // Add script to document
    document.body.appendChild(script)

    // Check for pending customer info from Flaggy
    const pendingCustomer = sessionStorage.getItem("pendingChatCustomer")
    if (pendingCustomer) {
      try {
        const customerData = JSON.parse(pendingCustomer)

        // Wait for Shopify Inbox to load, then pre-fill customer info
        script.onload = () => {
          // Shopify Inbox exposes window.ShopifyChat when loaded
          const checkShopifyChat = setInterval(() => {
            if (typeof window !== "undefined" && (window as any).ShopifyChat) {
              const ShopifyChat = (window as any).ShopifyChat

              // Pre-fill customer information
              if (ShopifyChat.setCustomer) {
                ShopifyChat.setCustomer({
                  name: customerData.name,
                  email: customerData.email,
                })
              }

              // Pre-fill initial message
              if (ShopifyChat.setMessage && customerData.initialMessage) {
                ShopifyChat.setMessage(
                  `${customerData.initialMessage}\n\n---\nPrevious conversation:\n${customerData.chatHistory}`,
                )
              }

              // Open the chat widget
              if (ShopifyChat.open) {
                ShopifyChat.open()
              }

              // Clear the pending customer data
              sessionStorage.removeItem("pendingChatCustomer")
              clearInterval(checkShopifyChat)
            }
          }, 100)

          // Stop checking after 10 seconds
          setTimeout(() => clearInterval(checkShopifyChat), 10000)
        }
      } catch (error) {
        console.error("[v0] Error loading pending customer data:", error)
      }
    }

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // The Shopify Inbox widget renders itself via the script
  return null
}
