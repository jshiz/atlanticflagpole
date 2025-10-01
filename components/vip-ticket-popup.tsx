"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export function VipTicketPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isPopping, setIsPopping] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isDismissed) return

    const handleScroll = () => {
      const sections = document.querySelectorAll("main > section")
      if (sections.length < 2) return

      const secondSection = sections[1]
      const rect = secondSection.getBoundingClientRect()

      if (rect.top < window.innerHeight * 0.6) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const confettiBurst = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)

    const colors = ["#c8a55c", "#ffd369", "#fff", "#b08d57", "#e4c27a", "#0a3161", "#b31942"]

    const pieces = Array.from({ length: 200 }).map(() => ({
      x: W / 2,
      y: H / 2,
      r: 6 + Math.random() * 10,
      c: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 5,
      a: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.3,
      gravity: 0.3 + Math.random() * 0.2,
    }))

    let frames = 0
    const tick = () => {
      frames++
      ctx.clearRect(0, 0, W, H)
      pieces.forEach((p) => {
        p.vy += p.gravity
        p.x += p.vx
        p.y += p.vy
        p.a += p.va

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.a)
        ctx.fillStyle = p.c
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
        ctx.restore()
      })
      if (frames < 250) requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, W, H)
    }
    tick()
  }

  const handleTicketClick = () => {
    setIsPopping(true)
    confettiBurst()

    setTimeout(() => {
      setIsModalOpen(true)
      setIsVisible(false)
    }, 600)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText("VIP-PATRIOT")
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  const handleAddToCart = () => {
    alert("Ticket added to cart / discount applied.")
    setIsModalOpen(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <>
      <div
        className={`fixed left-4 bottom-4 z-[9999] w-[220px] aspect-[3.6/2] cursor-pointer ${
          isPopping ? "animate-popOut" : "animate-sway"
        }`}
        style={{
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))",
          transformOrigin: "50% 100%",
        }}
        onClick={handleTicketClick}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/vip-patriots-ticket.svg"
            alt="VIP Patriot's Ticket"
            fill
            className="object-contain pointer-events-none"
          />
        </div>

        <button
          onClick={handleDismiss}
          className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Dismiss ticket"
        >
          ×
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000]">
          <div className="absolute inset-0 bg-black/45" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-[min(680px,92vw)] mx-auto mt-[6vh] bg-gradient-to-b from-[#ecd9a0] via-[#c8a55c] to-[#9a7a3c] rounded-[18px] p-7 shadow-2xl text-[#2b2416] overflow-hidden">
            <div
              className="absolute inset-[-2px] rounded-[20px] pointer-events-none"
              style={{
                boxShadow: "0 0 40px 12px rgba(255, 215, 120, 0.55) inset",
              }}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full border-2 border-black/15 bg-white/85 flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-wide mb-2">Congratulations!</h2>
              <p className="opacity-80 mb-4">
                Your <strong>VIP Patriot&apos;s Ticket</strong> is unlocked.
              </p>

              <div className="flex justify-center my-5">
                <div className="relative w-[min(520px,80%)] aspect-[3.6/2]">
                  <Image
                    src="/images/vip-patriots-ticket.svg"
                    alt="VIP Patriot's Ticket"
                    fill
                    className="object-contain"
                    style={{
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
                    }}
                  />
                </div>
              </div>

              <div className="bg-white/18 border border-black/12 rounded-[14px] p-4 text-center">
                <h3 className="text-xl font-extrabold mb-2">Golden Bonus Certificate</h3>
                <p className="mb-3">
                  Enjoy a <strong>free bonus prize</strong> with your flagpole purchase.
                </p>

                <div className="flex flex-wrap gap-2.5 justify-center mb-3">
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 rounded-[10px] font-bold shadow-lg bg-[#c8a55c] text-[#1d1406] border border-[#7c5f2e] hover:bg-[#b08d57] transition-colors"
                  >
                    Add Ticket to Cart
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className={`px-4 py-2.5 rounded-[10px] font-bold shadow-lg transition-colors ${
                      isCopied ? "bg-green-100 text-green-800" : "bg-white text-[#2b2416] hover:bg-gray-50"
                    }`}
                  >
                    {isCopied ? "Copied: VIP-PATRIOT" : "Copy Code"}
                  </button>
                  <a
                    href="/"
                    className="px-4 py-2.5 rounded-[10px] font-bold shadow-lg bg-white text-[#2b2416] hover:bg-gray-50 transition-colors no-underline"
                  >
                    Keep Shopping
                  </a>
                </div>

                <small className="text-sm opacity-75">Applied at checkout. Limited time.</small>
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
        </div>
      )}

      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-3deg) translateY(0);
          }
          50% {
            transform: rotate(3deg) translateY(-2px);
          }
        }

        @keyframes popOut {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1.5) rotate(8deg);
            opacity: 0;
          }
        }

        .animate-sway {
          animation: sway 5s ease-in-out infinite;
        }

        .animate-popOut {
          animation: popOut 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  )
}
