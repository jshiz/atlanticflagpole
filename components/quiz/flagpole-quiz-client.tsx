"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SpinWheel } from "./spin-wheel"
import { ChevronRight, Home } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  image: string
  imageQuery: string
  funFact: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the proper way to display the American flag at night?",
    options: [
      "Take it down at sunset",
      "Leave it up without lighting",
      "Illuminate it with a light",
      "Fold it and store it",
    ],
    correctAnswer: 2,
    image: "/placeholder.svg?height=400&width=600",
    imageQuery: "American flag illuminated at night with spotlight",
    funFact:
      "According to the U.S. Flag Code, the flag can be displayed 24 hours a day if properly illuminated during darkness!",
  },
  {
    id: 2,
    question: "What is the recommended height for a residential flagpole?",
    options: ["10-15 feet", "20-25 feet", "30-35 feet", "40-45 feet"],
    correctAnswer: 1,
    image: "/placeholder.svg?height=400&width=600",
    imageQuery: "residential house with 20 foot flagpole in front yard",
    funFact: "A 20-25 foot flagpole is perfect for most homes and can handle flags up to 4x6 feet!",
  },
]

export function FlagpoleQuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showWheel, setShowWheel] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false))

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setShowWheel(true)
      }
    }, 2500)
  }

  if (showWheel) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SpinWheel score={score} totalQuestions={quizQuestions.length} onClose={() => window.location.href = "/"} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-afp-navy hover:text-afp-gold mb-4 inline-flex items-center gap-2 text-sm">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-serif font-bold text-afp-navy mb-4">Flagpole & Flag Quiz</h1>
        <p className="text-lg text-afp-charcoal">Test your knowledge for exclusive rewards!</p>
      </div>

      {/* Progress */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border-2 border-afp-gold/20">
        <div className="flex items-center justify-between text-sm text-afp-charcoal mb-3">
          <span className="font-semibold">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="font-bold text-afp-gold">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl border-2 border-afp-navy/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
          {/* Question Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-afp-gold shadow-lg">
            <Image
              src={question.image || "/placeholder.svg"}
              alt={question.question}
              fill
              className="object-cover"
            />
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-afp-navy text-balance">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showCorrect = showResult && isCorrect
              const showIncorrect = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all shadow-md ${
                    showCorrect
                      ? "border-green-600 bg-green-50 shadow-green-200"
                      : showIncorrect
                        ? "border-red-600 bg-red-50 shadow-red-200"
                        : isSelected
                          ? "border-afp-gold bg-afp-gold/10 shadow-afp-gold/30"
                          : "border-gray-300 hover:border-afp-gold/70 hover:shadow-lg"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-base">{option}</span>
                    {showCorrect && <span className="text-green-600 font-bold">✓ Correct!</span>}
                    {showIncorrect && <span className="text-red-600 font-bold">✗ Incorrect</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Fun Fact */}
          {showResult && (
            <div className="bg-gradient-to-r from-afp-gold/10 to-afp-gold/5 border-l-4 border-afp-gold p-4 rounded-r-lg animate-fade-in shadow-md">
              <p className="text-sm font-semibold text-afp-navy mb-1">Did you know?</p>
              <p className="text-sm text-gray-700">{question.funFact}</p>
            </div>
          )}

          {!showResult && (
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-afp-gold to-[#a88947] hover:from-[#a88947] hover:to-[#8a6d39] text-white font-semibold py-4 text-base shadow-lg hover:shadow-xl transition-all"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
