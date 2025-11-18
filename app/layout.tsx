import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Cinzel } from 'next/font/google'
import "./globals.css"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeaderSkeleton } from "@/components/header-skeleton"
import { LazyFooter } from "@/components/ui/lazy-footer"
import { FlaggyChatWidget } from "@/components/flaggy-chat/flaggy-chat-widget"
import { CartProvider } from "@/components/cart/cart-context"
import { JudgeMePlatformScript } from "@/components/judgeme/judgeme-platform-script"
import { PhoenixHomeTrialBar } from "@/components/phoenix-home-trial-bar"
import { GeoProvider } from "@/lib/geo/context"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner"
import { FloatingActionMenu } from "@/components/floating-action-menu/floating-action-menu"
import { StickyFooterUnified } from "@/components/layout/sticky-footer-unified"

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"),
  title: {
    default: "Atlantic Flag & Pole - Premium American-Made Flagpoles",
    template: "%s | Atlantic Flag & Pole",
  },
  description:
    "The last flagpole you'll ever need. Handcrafted in the USA with a lifetime warranty. Premium telescoping flagpoles built to withstand 100+ MPH winds. Made by veterans, for patriots.",
  keywords: [
    "flagpole",
    "American flagpole",
    "telescoping flagpole",
    "USA made flagpole",
    "residential flagpole",
    "commercial flagpole",
    "lifetime warranty flagpole",
    "Atlantic Flag & Pole",
  ],
  authors: [{ name: "Atlantic Flag & Pole" }],
  creator: "Atlantic Flag & Pole",
  publisher: "Atlantic Flag & Pole",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com",
    siteName: "Atlantic Flag & Pole",
    title: "Atlantic Flag & Pole - Premium American-Made Flagpoles",
    description:
      "The last flagpole you'll ever need. Handcrafted in the USA with a lifetime warranty. Premium telescoping flagpoles built to withstand 100+ MPH winds.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Atlantic Flag & Pole - Premium American-Made Flagpoles",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Flag & Pole - Premium American-Made Flagpoles",
    description:
      "The last flagpole you'll ever need. Handcrafted in the USA with a lifetime warranty. Premium telescoping flagpoles built to withstand 100+ MPH winds.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"}/og-image.png`],
    creator: "@atlanticflagpole",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} overflow-x-hidden w-full`}>
        <CartProvider>
          <GeoProvider>
            <PhoenixHomeTrialBar />
            <Suspense fallback={<HeaderSkeleton />}>
              <Header />
            </Suspense>
            <main className="w-full overflow-x-hidden relative">
              {children}
            </main>
            <LazyFooter />
            {/* Replaced individual components with Unified Footer */}
            <StickyFooterUnified />
          </GeoProvider>
        </CartProvider>
        <JudgeMePlatformScript />
        <Toaster />
      </body>
    </html>
  )
}
