"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react"
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer"
import type { Menu } from "@/lib/menus"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { isNFLMenuItem, isChristmasTreeMenuItem, NFC_TEAMS, AFC_TEAMS } from "@/lib/nfl-teams"

interface NavigationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  menuData: Menu | null
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
}

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
)

const TumblrIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function NavigationDrawer({
  open,
  onOpenChange,
  menuData,
  nflFlagProducts,
  christmasTreeProducts,
}: NavigationDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  if (!menuData || !menuData.items) return null

  const menuItems = menuData.items

  const handleLinkClick = () => {
    onOpenChange(false)
    setExpandedSection(null)
  }

  const toggleSection = (itemId: string) => {
    setExpandedSection(expandedSection === itemId ? null : itemId)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full w-[85vw] sm:w-[400px] max-w-[400px] z-[300]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
            <Image src="/images/favicon.png" alt="Atlantic Flagpole" width={32} height={32} className="w-8 h-8" />
            <div>
              <span className="text-sm font-serif font-bold text-[#0B1C2C] block leading-none">ATLANTIC</span>
              <span className="text-[10px] font-serif font-medium text-[#C8A55C] tracking-widest block leading-none">
                FLAGPOLE
              </span>
            </div>
          </Link>
          <DrawerClose asChild>
            <button className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const hasSubmenu = item.items && item.items.length > 0
              const isExpanded = expandedSection === item.id
              const isNFL = isNFLMenuItem(item.title)
              const isChristmas = isChristmasTreeMenuItem(item.title)

              return (
                <div key={item.id} className="border-b border-gray-100 last:border-0">
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleSection(item.id)}
                        className="w-full flex items-center justify-between py-3 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold text-sm"
                      >
                        <span className={isChristmas ? "flex items-center gap-2" : ""}>
                          {isChristmas && <span>🎄</span>}
                          {item.title}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pb-3 space-y-2 animate-in slide-in-from-left duration-200">
                          {/* NFL Teams Grid */}
                          {isNFL && (
                            <div className="space-y-3">
                              {nflFlagProducts.length > 0 && (
                                <div className="mb-3">
                                  <h4 className="text-xs font-bold text-[#0B1C2C] mb-2 px-2">Featured NFL Flags</h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {nflFlagProducts.slice(0, 6).map((product) => (
                                      <Link
                                        key={product.id}
                                        href={`/products/${product.handle}`}
                                        onClick={handleLinkClick}
                                        className="group"
                                      >
                                        <div className="aspect-square relative mb-1 overflow-hidden rounded bg-gray-100 shadow-sm">
                                          {product.images[0] && (
                                            <Image
                                              src={product.images[0].url || "/placeholder.svg"}
                                              alt={product.images[0].altText || product.title}
                                              fill
                                              className="object-cover group-hover:scale-105 transition-transform"
                                              sizes="30vw"
                                            />
                                          )}
                                        </div>
                                        <p className="text-[9px] font-medium line-clamp-1 text-[#0B1C2C]">
                                          {product.title}
                                        </p>
                                        <p className="text-[10px] font-bold text-[#C8A55C]">
                                          ${product.priceRange.minVariantPrice.amount}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1C2C] mb-2 px-2">NFC Teams</h4>
                                <div className="grid grid-cols-4 gap-1">
                                  {NFC_TEAMS.map((team) => (
                                    <Link
                                      key={team.name}
                                      href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                                      onClick={handleLinkClick}
                                      className="aspect-square relative group"
                                    >
                                      <Image
                                        src={team.logo || "/placeholder.svg"}
                                        alt={team.name}
                                        fill
                                        className="object-cover rounded"
                                        sizes="20vw"
                                      />
                                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 rounded">
                                        <span className="text-white text-[8px] font-semibold text-center leading-tight">
                                          {team.name}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1C2C] mb-2 px-2">AFC Teams</h4>
                                <div className="grid grid-cols-4 gap-1">
                                  {AFC_TEAMS.map((team) => (
                                    <Link
                                      key={team.name}
                                      href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                                      onClick={handleLinkClick}
                                      className="aspect-square relative group"
                                    >
                                      <Image
                                        src={team.logo || "/placeholder.svg"}
                                        alt={team.name}
                                        fill
                                        className="object-cover rounded"
                                        sizes="20vw"
                                      />
                                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 rounded">
                                        <span className="text-white text-[8px] font-semibold text-center leading-tight">
                                          {team.name}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Christmas Trees */}
                          {isChristmas && christmasTreeProducts.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold text-green-700 mb-2 px-2">Featured Christmas Trees</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {christmasTreeProducts.slice(0, 6).map((product) => (
                                  <Link
                                    key={product.id}
                                    href={`/products/${product.handle}`}
                                    onClick={handleLinkClick}
                                    className="group"
                                  >
                                    <div className="aspect-square relative mb-1 overflow-hidden rounded bg-gradient-to-br from-green-50 to-red-50 shadow-sm">
                                      {product.featuredImage && (
                                        <Image
                                          src={product.featuredImage.url || "/placeholder.svg"}
                                          alt={product.featuredImage.altText || product.title}
                                          fill
                                          className="object-cover group-hover:scale-105 transition-transform"
                                          sizes="30vw"
                                        />
                                      )}
                                    </div>
                                    <p className="text-[9px] font-medium line-clamp-1 text-green-900">
                                      {product.title}
                                    </p>
                                    <p className="text-[10px] font-bold text-green-700">
                                      ${product.priceRange.minVariantPrice.amount}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Regular Submenu Items */}
                          {!isNFL && !isChristmas && item.items && (
                            <div className="space-y-1 pl-4">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.id}
                                  href={subItem.url}
                                  onClick={handleLinkClick}
                                  className="block py-2 text-sm text-gray-700 hover:text-[#C8A55C] transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.url}
                      onClick={handleLinkClick}
                      className="block py-3 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold text-sm"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="p-4 space-y-2 border-t border-gray-200">
            <Link
              href="/flagpole-finder"
              onClick={handleLinkClick}
              className="block w-full bg-[#C8A55C] hover:bg-[#a88947] px-4 py-3 rounded-lg text-white font-semibold text-center transition-colors text-sm"
            >
              Flagpole Finder
            </Link>
            <button
              onClick={handleLinkClick}
              className="w-full bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-4 py-3 rounded-lg text-white font-semibold transition-colors text-sm"
            >
              Flagpole Quiz
            </button>
          </div>
        </div>

        {/* Social Links Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs font-semibold text-[#0B1C2C] mb-3">Follow Us</p>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://pinterest.com/atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="Pinterest"
            >
              <PinterestIcon className="w-5 h-5" />
            </a>
            <a
              href="https://tumblr.com/atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="Tumblr"
            >
              <TumblrIcon className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/atlanticflagpole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
