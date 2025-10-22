import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart/cart-context"
import { JudgeMePlatformScript } from "@/components/judgeme/judgeme-platform-script"
import { StickyCartBar } from "@/components/cart/sticky-cart-bar"
import { GeoProvider } from "@/lib/geo/context"
import { LocationBanner } from "@/components/geo/location-banner"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner"
import { TicketPopupDynamic } from "@/components/ticket-popup-dynamic"

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"),
  title: {
    default: "Atlantic Flagpole - Premium American-Made Flagpoles",
    template: "%s | Atlantic Flagpole",
  },
  description: "The last flagpole you will ever need. Handcrafted in the USA with a lifetime guarantee.",
  keywords: [
    "flagpole",
    "American made",
    "lifetime warranty",
    "premium flagpole",
    "USA flagpole",
    "residential flagpole",
    "commercial flagpole",
  ],
  authors: [{ name: "Atlantic Flagpole" }],
  creator: "Atlantic Flagpole",
  publisher: "Atlantic Flagpole",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app",
    siteName: "Atlantic Flagpole",
    title: "Atlantic Flagpole - Premium American-Made Flagpoles",
    description: "The last flagpole you will ever need. Handcrafted in the USA with a lifetime guarantee.",
    images: [
      {
        url: "/images/hero-flagpole.jpg",
        width: 1200,
        height: 630,
        alt: "Atlantic Flagpole",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Flagpole - Premium American-Made Flagpoles",
    description: "The last flagpole you will ever need. Handcrafted in the USA with a lifetime guarantee.",
    images: ["/images/hero-flagpole.jpg"],
    site: "@atlanticflagpole",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="min-h-screen">{children}</main>
            <Footer />
            <StickyCartBar />
            <LocationBanner />
            <CookieConsentBanner />
            <TicketPopupDynamic />
          </GeoProvider>
        </CartProvider>
        <JudgeMePlatformScript />
        <Toaster />
      </body>
    </html>
  )
}
