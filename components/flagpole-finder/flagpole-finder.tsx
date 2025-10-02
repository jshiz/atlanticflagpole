"use client"

import { useState } from "react"
import { QuestionStep } from "./question-step"
import { ResultsStep } from "./results-step"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export type UserPreferences = {
  usage: string
  flagSize: string
  height: string
  budget: string
  installation: string
}

const INITIAL_PREFERENCES: UserPreferences = {
  usage: "",
  flagSize: "",
  height: "",
  budget: "",
  installation: "",
}

export function FlagpoleFinder() {
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES)
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleAnswer = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))

    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (showResults) {
      setShowResults(false)
    } else if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(0)
    setPreferences(INITIAL_PREFERENCES)
    setShowResults(false)
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={handleBack} className="mb-6 text-afp-navy hover:text-afp-gold">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Questions
        </Button>
        <ResultsStep preferences={preferences} onReset={handleReset} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-afp-navy md:text-5xl">Find Your Perfect Flagpole</h1>
          <p className="text-lg text-afp-charcoal">
            Answer a few simple questions and we'll recommend the ideal flagpole for your needs.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-afp-charcoal">
            <span>
              Question {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Back Button */}
        {step > 0 && (
          <Button variant="ghost" onClick={handleBack} className="mb-6 text-afp-navy hover:text-afp-gold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Question
          </Button>
        )}

        {/* Question Steps */}
        <QuestionStep step={step} preferences={preferences} onAnswer={handleAnswer} />
      </div>
    </div>
  )
}
