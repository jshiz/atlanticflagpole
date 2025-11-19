"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SpinWheel } from "./spin-wheel"
import { X, ChevronRight, HelpCircle, Trophy } from 'lucide-react'
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
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
    funFact:
      "According to the U.S. Flag Code, the flag can be displayed 24 hours a day if properly illuminated during darkness!",
  },
  {
    id: 2,
    question: "What is the recommended height for a residential flagpole?",
    options: ["10-15 feet", "20-25 feet", "30-35 feet", "40-45 feet"],
    correctAnswer: 1,
    funFact: "A 20-25 foot flagpole is perfect for most homes and can handle flags up to 4x6 feet!",
  },
  {
    id: 3,
    question: "How many stars are on the current American flag?",
    options: ["48 stars", "49 stars", "50 stars", "51 stars"],
    correctAnswer: 2,
    funFact: "The 50-star flag was designed by 17-year-old Robert G. Heft as a school project in 1958!",
  },
  {
    id: 4,
    question: "What material is best for outdoor flagpoles in coastal areas?",
    options: ["Wood", "Steel", "Aluminum", "Fiberglass"],
    correctAnswer: 2,
    funFact: "Anodized aluminum is corrosion-resistant and perfect for salty coastal environments!",
  },
  {
    id: 5,
    question: "What does it mean to fly a flag at half-staff?",
    options: ["The flag is damaged", "A sign of mourning or respect", "Bad weather warning", "Military exercise"],
    correctAnswer: 1,
    funFact:
      "When flying at half-staff, the flag should be raised to the peak first, then lowered to the half-staff position!",
  },
]

interface QuizDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: "right" | "bottom"
}

export function QuizDrawer({ isOpen, onClose, side = "right" }: QuizDrawerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showWheel, setShowWheel] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false))

  // Reset quiz when drawer opens if it was finished
  useEffect(() => {
    if (isOpen && showWheel) {
      // Optional: keep state or reset. Let's keep state unless explicitly reset by user action usually, 
      // but for a drawer feel, maybe nice to see where you left off.
    }
  }, [isOpen, showWheel])

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
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
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowWheel(false)
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false))
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side={side} 
        className={cn(
          "p-0 flex flex-col z-[90] bg-[#F4F1E8] shadow-2xl transition-all duration-500 ease-in-out",
          side === "right" 
            ? "w-full sm:max-w-md h-full border-l-4 border-[#C8A55C] rounded-l-3xl" 
            : "w-full h-[85vh] mb-[56px] border-t-4 border-[#C8A55C] rounded-t-3xl"
        )}
      >
        {/* Header */}
        <div className="bg-[#0B1C2C] text-white p-4 relative shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#C8A55C]/20 rounded-lg">
                <HelpCircle className="w-5 h-5 text-[#C8A55C]" />
              </div>
              <SheetTitle className="text-white font-serif text-xl">Flagpole Quiz</SheetTitle>
            </div>
            <SheetClose className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </SheetClose>
          </div>
          
          {!showWheel && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span className="text-[#C8A55C] font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> Score: {score}
                </span>
              </div>
              <Progress value={progress} className="h-1.5 bg-white/10 [&>div]:bg-[#C8A55C]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {showWheel ? (
            <div className="h-full flex flex-col">
              <SpinWheel score={score} totalQuestions={quizQuestions.length} onClose={onClose} />
              <div className="p-6 text-center">
                <Button 
                  onClick={resetQuiz}
                  variant="outline" 
                  className="border-[#0B1C2C] text-[#0B1C2C] hover:bg-[#0B1C2C] hover:text-white"
                >
                  Play Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Question Image */}
              <div className="relative w-full aspect-[16/9] md:aspect-video rounded-xl overflow-hidden border-2 border-[#C8A55C]/30 shadow-md bg-gradient-to-br from-[#0B1C2C] via-[#1a2d3f] to-[#0B1C2C]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <HelpCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto text-[#C8A55C] opacity-90" />
                    <p className="text-white/80 text-xs md:text-sm font-medium">Question {currentQuestion + 1}</p>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20 border-4 border-[#C8A55C] rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 border-4 border-[#C8A55C] rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-4 border-[#C8A55C] rounded-full"></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base md:text-lg font-serif font-bold text-[#0B1C2C] leading-tight">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
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
                      className={cn(
                        "w-full text-left p-3 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group",
                        showCorrect
                          ? "border-green-600 bg-green-50"
                          : showIncorrect
                            ? "border-red-500 bg-red-50"
                            : isSelected
                              ? "border-[#C8A55C] bg-[#C8A55C]/10"
                              : "border-gray-200 bg-white hover:border-[#C8A55C]/50 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className={cn(
                          "font-medium text-sm",
                          showCorrect ? "text-green-800" : showIncorrect ? "text-red-800" : "text-gray-700"
                        )}>
                          {option}
                        </span>
                        {showCorrect && <span className="text-green-600 font-bold text-xs bg-white/80 px-2 py-0.5 rounded-full">✓</span>}
                        {showIncorrect && <span className="text-red-500 font-bold text-xs bg-white/80 px-2 py-0.5 rounded-full">✗</span>}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Fun Fact / Next Button */}
              <div className="min-h-[80px]">
                {showResult ? (
                  <div className="bg-[#0B1C2C]/5 border-l-4 border-[#0B1C2C] p-3 rounded-r-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-[10px] font-bold text-[#C8A55C] uppercase tracking-wider mb-1">Did you know?</p>
                    <p className="text-xs text-[#0B1C2C] leading-relaxed">{question.funFact}</p>
                  </div>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className={cn(
                      "w-full py-5 text-sm font-bold shadow-lg transition-all duration-300",
                      selectedAnswer !== null
                        ? "bg-[#C8A55C] hover:bg-[#B69446] text-[#0B1C2C] translate-y-0 opacity-100"
                        : "bg-gray-200 text-gray-400 translate-y-2 opacity-0 pointer-events-none"
                    )}
                  >
                    {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
