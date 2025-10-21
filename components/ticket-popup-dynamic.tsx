"use client"

import dynamic from "next/dynamic"

export const TicketPopupDynamic = dynamic(
  () => import("@/components/home/ticket-popup").then((mod) => ({ default: mod.TicketPopup })),
  { ssr: false },
)
