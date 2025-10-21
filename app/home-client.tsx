"use client"

import dynamic from "next/dynamic"

const TicketPopup = dynamic(
  () => import("@/components/home/ticket-popup").then((mod) => ({ default: mod.TicketPopup })),
  {
    ssr: false,
  },
)

export function HomeClientComponents() {
  return <TicketPopup />
}
