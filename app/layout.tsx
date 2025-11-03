import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeaderSkeleton } from "@/components/header-skeleton"
import { LazyFooter } from "@/components/ui/lazy-footer"
import { LiveChatButton } from "@/components/live-chat-button"
import { CartProvider } from "@/components/cart/cart-context"
import { JudgeMePlatformScript } from "@/components/judgeme/judgeme-platform-script"
import { PhoenixHomeTrialBar } from "@/components/phoenix-home-trial-bar"
import { GeoProvider } from "@/lib/geo/context"
import { LocationTab } from "@/components/geo/location-tab"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner"
import { CartSidebarButton } from "@/components/cart/cart-sidebar-button"
import { PageTransition } from "@/components/ui/page-transition"

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

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Atlantic Flagpole - Premium American-Made Flagpoles",
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
          <GeoProvider>
            <PageTransition>
              <PhoenixHomeTrialBar />
              <Suspense fallback={<HeaderSkeleton />}>
                <Header />
              </Suspense>
              <Suspense fallback={null}>{children}</Suspense>
              <LazyFooter />
              <LiveChatButton />
              <CartSidebarButton />
              <LocationTab />
              <CookieConsentBanner />
            </PageTransition>
          </GeoProvider>
        </CartProvider>
        <JudgeMePlatformScript />
        <Toaster />
      </body>
    </html>
  )
}
