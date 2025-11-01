"use client"

import { useEffect, useState } from "react"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TicketPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    console.log("[v0] TicketPopup - initializing")

    const hasClaimedTicket = localStorage.getItem("vip-ticket-claimed")
    if (hasClaimedTicket) {
      console.log("[v0] TicketPopup - already claimed")
      return
    }

    const timer = setTimeout(() => {
      console.log("[v0] TicketPopup - showing button")
      setShowButton(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleTicketClick = () => {
    console.log("[v0] TicketPopup - ticket clicked")
    localStorage.setItem("vip-ticket-claimed", "true")
    setIsOpen(true)
    triggerConfetti()
  }

  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      createConfetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      )
      createConfetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)
  }

  const createConfetti = (options: any) => {
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: any[] = []
    const colors = ["#C8A55C", "#0B1C2C", "#DC2626", "#FFFFFF", "#F0D98C"]

    for (let i = 0; i < options.particleCount; i++) {
      particles.push({
        x: canvas.width * options.origin.x,
        y: canvas.height * options.origin.y,
        vx: (Math.random() - 0.5) * options.startVelocity,
        vy: Math.random() * -options.startVelocity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: options.ticks,
      })
    }

    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.5
        particle.rotation += particle.rotationSpeed
        particle.life--

        if (particle.life <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        ctx.restore()
      })

      if (particles.length > 0 && frame < options.ticks) {
        requestAnimationFrame(animate)
      } else {
        document.body.removeChild(canvas)
      }
    }

    animate()
  }

  const handleClose = () => {
    console.log("[v0] TicketPopup - closed")
    setIsOpen(false)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WELCOME5")
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  const handleSignUp = () => {
    window.location.href = "/account/signup?discount=WELCOME5"
  }

  return (
    <>
      {showButton && !isOpen && (
        <button
          onClick={() => {
            console.log("[v0] TicketPopup - expanding")
            setIsExpanded(!isExpanded)
          }}
          className={`fixed bottom-6 z-50 w-32 h-auto transition-all duration-500 ease-out hover:scale-110 animate-sway cursor-pointer shadow-2xl ${
            isExpanded ? "left-6" : "left-6"
          }`}
          aria-label="Open VIP ticket offer"
        >
          <img src="/vip-patriots-ticket.svg" alt="VIP Patriots Ticket" className="w-full h-auto" />
        </button>
      )}

      {isExpanded && showButton && !isOpen && (
        <button
          onClick={handleTicketClick}
          className="fixed bottom-6 left-6 z-50 w-32 h-auto transition-all duration-500 ease-out hover:scale-110 animate-sway cursor-pointer shadow-2xl"
          aria-label="Open VIP ticket offer"
        >
          <img src="/vip-patriots-ticket.svg" alt="VIP Patriots Ticket" className="w-full h-auto" />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-300">
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="p-8 text-center">
                <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-4">Congratulations!</h2>
                <p className="text-lg text-[#0B1C2C]/70 mb-6">
                  You've unlocked an exclusive <span className="font-bold text-[#C8A55C]">$5 OFF</span> your first
                  order!
                </p>

                <div className="mb-6 flex justify-center">
                  <img src="/vip-patriots-ticket.svg" alt="VIP Patriots Ticket" className="w-full max-w-lg h-auto" />
                </div>

                <div className="bg-gradient-to-r from-[#C8A55C]/10 to-[#0B1C2C]/10 rounded-lg p-6 mb-6 border-2 border-dashed border-[#C8A55C]">
                  <p className="text-sm text-[#0B1C2C]/70 mb-2">Your Sign-Up Bonus Code:</p>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-2xl font-bold text-[#0B1C2C] tracking-wider">WELCOME5</code>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      aria-label="Copy code"
                    >
                      {isCopied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-[#C8A55C]" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#0B1C2C]/50 mt-2">
                    {isCopied ? "Code copied! Use at checkout." : "Click to copy code"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleSignUp}
                    size="lg"
                    className="bg-[#C8A55C] hover:bg-[#a88947] text-white font-bold text-lg px-8"
                  >
                    Sign Up & Save $5
                  </Button>
                  <Button
                    onClick={() => {
                      handleCopyCode()
                      window.location.href = "/products"
                    }}
                    size="lg"
                    variant="outline"
                    className="font-semibold bg-transparent border-2 border-[#0B1C2C]"
                  >
                    Shop Now
                  </Button>
                </div>

                <p className="text-sm text-[#0B1C2C]/50 mt-6">Limited time offer. Code valid for new customers only.</p>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .animate-sway {
          animation: sway 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
