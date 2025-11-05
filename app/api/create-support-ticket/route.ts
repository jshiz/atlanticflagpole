import { type NextRequest, NextResponse } from "next/server"
import { sendSupportTicketEmail } from "@/lib/email/support-ticket"

export async function POST(request: NextRequest) {
  try {
    const { customerName, customerEmail, issueSummary, chatHistory } = await request.json()

    if (!customerName || !customerEmail || !issueSummary) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields. Please provide name, email, and issue summary.",
        },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format. Please provide a valid email address.",
        },
        { status: 400 },
      )
    }

    const ticketId = `AFP-${Date.now().toString().slice(-5)}`

    const emailSent = await sendSupportTicketEmail({
      ticketId,
      customerName,
      customerEmail,
      issueSummary,
      chatHistory: chatHistory || "No chat history available",
    })

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send support ticket email. Please try again.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Support ticket created successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating support ticket:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
