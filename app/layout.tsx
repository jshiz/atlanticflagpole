import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cinzel } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { LiveChatButton } from "@/components/live-chat-button"
import { CartProvider } from "@/components/cart/cart-context"
import { Toaster } from "@/components/ui/toaster"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Atlantic Flagpoles - Premium American-Made Flagpoles",
  description: "The last flagpole you will ever need. Handcrafted in the USA with a lifetime guarantee.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${cinzel.variable}`}>
        <CartProvider>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <LiveChatButton />
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
