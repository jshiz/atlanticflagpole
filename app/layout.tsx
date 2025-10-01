import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveChatButton } from "@/components/live-chat-button"
import { CartProvider } from "@/components/cart/cart-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable}`}>
        <CartProvider>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
          <LiveChatButton />
        </CartProvider>
      </body>
    </html>
  )
}
