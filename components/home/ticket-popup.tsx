"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TicketPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleTicketClick = () => {
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
    setIsOpen(false)
  }

  const handleClaim = () => {
    window.location.href = "/products"
  }

  return (
    <>
      {showButton && !isOpen && (
        <button
          onClick={handleTicketClick}
          className="fixed bottom-6 left-6 z-50 w-32 h-auto transition-transform hover:scale-110 animate-sway cursor-pointer shadow-2xl"
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
                <p className="text-lg text-[#0B1C2C]/70 mb-6">You've been selected for an exclusive VIP offer!</p>

                <div className="mb-6 flex justify-center">
                  <img src="/vip-patriots-ticket.svg" alt="VIP Patriots Ticket" className="w-full max-w-lg h-auto" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleClaim}
                    size="lg"
                    className="bg-[#C8A55C] hover:bg-[#a88947] text-white font-bold text-lg px-8"
                  >
                    Claim Your Prize
                  </Button>
                  <Button onClick={handleClose} size="lg" variant="outline" className="font-semibold bg-transparent">
                    Maybe Later
                  </Button>
                </div>

                <p className="text-sm text-[#0B1C2C]/50 mt-6">Limited time offer. While supplies last.</p>
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
