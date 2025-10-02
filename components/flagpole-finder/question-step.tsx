"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserPreferences } from "./flagpole-finder"
import { Home, Flag, Ruler, DollarSign, Wrench } from "lucide-react"

type QuestionStepProps = {
  step: number
  preferences: UserPreferences
  onAnswer: (key: keyof UserPreferences, value: string) => void
}

const questions = [
  {
    key: "usage" as keyof UserPreferences,
    title: "Where will you use your flagpole?",
    icon: Home,
    options: [
      { value: "residential", label: "Residential", description: "Home, yard, or personal property" },
      { value: "commercial", label: "Commercial", description: "Business, office, or storefront" },
      { value: "government", label: "Government", description: "Municipal, school, or public building" },
      { value: "memorial", label: "Memorial", description: "Cemetery, monument, or tribute" },
    ],
  },
  {
    key: "flagSize" as keyof UserPreferences,
    title: "What size flag do you plan to fly?",
    icon: Flag,
    options: [
      { value: "small", label: "Small (2' x 3' to 3' x 5')", description: "Perfect for residential use" },
      { value: "medium", label: "Medium (4' x 6' to 5' x 8')", description: "Standard commercial size" },
      { value: "large", label: "Large (6' x 10' or larger)", description: "For tall poles and visibility" },
      { value: "unsure", label: "Not Sure", description: "We'll help you decide" },
    ],
  },
  {
    key: "height" as keyof UserPreferences,
    title: "What height flagpole are you looking for?",
    icon: Ruler,
    options: [
      { value: "short", label: "15-20 feet", description: "Residential standard" },
      { value: "medium", label: "20-30 feet", description: "Taller residential or small commercial" },
      { value: "tall", label: "30-50 feet", description: "Commercial or institutional" },
      { value: "very-tall", label: "50+ feet", description: "Large commercial or government" },
    ],
  },
  {
    key: "budget" as keyof UserPreferences,
    title: "What's your budget range?",
    icon: DollarSign,
    options: [
      { value: "economy", label: "Under $500", description: "Budget-friendly options" },
      { value: "standard", label: "$500 - $1,500", description: "Quality mid-range poles" },
      { value: "premium", label: "$1,500 - $3,000", description: "Premium commercial grade" },
      { value: "luxury", label: "$3,000+", description: "Top-tier professional systems" },
    ],
  },
  {
    key: "installation" as keyof UserPreferences,
    title: "How do you plan to install it?",
    icon: Wrench,
    options: [
      { value: "diy", label: "DIY Installation", description: "I'll install it myself" },
      { value: "professional", label: "Professional Installation", description: "I need installation service" },
      { value: "ground-sleeve", label: "Ground Sleeve", description: "Removable pole system" },
      { value: "wall-mount", label: "Wall Mount", description: "Attach to building or structure" },
    ],
  },
]

export function QuestionStep({ step, preferences, onAnswer }: QuestionStepProps) {
  const question = questions[step]
  const Icon = question.icon

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-2 border-afp-navy/10 bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-afp-navy">
            <Icon className="h-6 w-6 text-afp-gold" />
          </div>
          <h2 className="text-2xl font-bold text-afp-navy md:text-3xl">{question.title}</h2>
        </div>

        <div className="grid gap-4">
          {question.options.map((option) => (
            <Button
              key={option.value}
              onClick={() => onAnswer(question.key, option.value)}
              variant="outline"
              className="h-auto justify-start border-2 border-afp-navy/20 p-6 text-left transition-all hover:border-afp-gold hover:bg-afp-gold/5"
            >
              <div className="flex-1">
                <div className="mb-1 text-lg font-semibold text-afp-navy">{option.label}</div>
                <div className="text-sm text-afp-charcoal/70">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
