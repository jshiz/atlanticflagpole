"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SpinWheel } from "./spin-wheel"
import { X, ChevronRight } from "lucide-react"
import Image from "next/image"

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
    image: "/quiz/flag-night.jpg",
    imageQuery: "American flag illuminated at night with spotlight",
    funFact:
      "According to the U.S. Flag Code, the flag can be displayed 24 hours a day if properly illuminated during darkness!",
  },
  {
    id: 2,
    question: "What is the recommended height for a residential flagpole?",
    options: ["10-15 feet", "20-25 feet", "30-35 feet", "40-45 feet"],
    correctAnswer: 1,
    image: "/quiz/flagpole-height.jpg",
    imageQuery: "residential house with 20 foot flagpole in front yard",
    funFact: "A 20-25 foot flagpole is perfect for most homes and can handle flags up to 4x6 feet!",
  },
  {
    id: 3,
    question: "How many stars are on the current American flag?",
    options: ["48 stars", "49 stars", "50 stars", "51 stars"],
    correctAnswer: 2,
    image: "/quiz/flag-stars.jpg",
    imageQuery: "close up of American flag stars field blue canton",
    funFact: "The 50-star flag was designed by 17-year-old Robert G. Heft as a school project in 1958!",
  },
  {
    id: 4,
    question: "What material is best for outdoor flagpoles in coastal areas?",
    options: ["Wood", "Steel", "Aluminum", "Fiberglass"],
    correctAnswer: 2,
    image: "/quiz/coastal-flagpole.jpg",
    imageQuery: "aluminum flagpole near ocean beach coastal area",
    funFact: "Anodized aluminum is corrosion-resistant and perfect for salty coastal environments!",
  },
  {
    id: 5,
    question: "What does it mean to fly a flag at half-staff?",
    options: ["The flag is damaged", "A sign of mourning or respect", "Bad weather warning", "Military exercise"],
    correctAnswer: 1,
    image: "/quiz/half-staff.jpg",
    imageQuery: "American flag at half staff on flagpole memorial",
    funFact:
      "When flying at half-staff, the flag should be raised to the peak first, then lowered to the half-staff position!",
  },
  {
    id: 6,
    question: "What wind speed should a quality residential flagpole withstand?",
    options: ["50 MPH", "75 MPH", "100 MPH", "125 MPH"],
    correctAnswer: 2,
    image: "/quiz/wind-flag.jpg",
    imageQuery: "American flag waving strongly in high wind",
    funFact: "Premium flagpoles like the Phoenix can withstand winds up to 100 MPH with proper installation!",
  },
  {
    id: 7,
    question: "How many stripes are on the American flag?",
    options: ["11 stripes", "13 stripes", "15 stripes", "17 stripes"],
    correctAnswer: 1,
    image: "/quiz/flag-stripes.jpg",
    imageQuery: "American flag stripes red and white close up",
    funFact: "The 13 stripes represent the original 13 colonies that declared independence from Great Britain!",
  },
  {
    id: 8,
    question: "What is a telescoping flagpole?",
    options: [
      "A pole that rotates",
      "A pole with sections that slide into each other",
      "A pole with a telescope on top",
      "A pole that bends in wind",
    ],
    correctAnswer: 1,
    image: "/quiz/telescoping-pole.jpg",
    imageQuery: "telescoping flagpole extended showing sections",
    funFact: "Telescoping flagpoles are easier to install, maintain, and can be lowered without removing the flag!",
  },
  {
    id: 9,
    question: "When was the current 50-star flag design officially adopted?",
    options: ["July 4, 1959", "July 4, 1960", "July 4, 1961", "July 4, 1962"],
    correctAnswer: 1,
    image: "/quiz/flag-history.jpg",
    imageQuery: "vintage American flag 50 stars historical",
    funFact: "The 50-star flag became official on July 4, 1960, after Hawaii became a state!",
  },
  {
    id: 10,
    question: "What is the proper way to retire a worn American flag?",
    options: [
      "Throw it in the trash",
      "Burn it in a dignified ceremony",
      "Bury it in the ground",
      "Donate it to a museum",
    ],
    correctAnswer: 1,
    image: "/quiz/flag-retirement.jpg",
    imageQuery: "respectful flag retirement ceremony",
    funFact: "Many VFW posts, American Legion halls, and Boy Scout troops hold dignified flag retirement ceremonies!",
  },
]

interface FlagpoleQuizModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FlagpoleQuizModal({ open, onOpenChange }: FlagpoleQuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showWheel, setShowWheel] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false))

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
    }, 2500)
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

  if (showWheel) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden border-4 border-[#c8a55c] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_0_1px_rgba(200,165,92,0.2)] rounded-xl">
          <SpinWheel score={score} totalQuestions={quizQuestions.length} onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 border-4 border-[#c8a55c] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_0_1px_rgba(200,165,92,0.2)] rounded-xl">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0b1c2c] via-[#1a3a52] to-[#0b1c2c] text-white p-3 md:p-4 relative border-b-2 border-[#c8a55c]">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pr-7">
              <h2 className="text-lg md:text-xl font-serif font-bold mb-0.5">Flagpole & Flag Quiz</h2>
              <p className="text-white/80 text-xs">Test your knowledge for exclusive rewards!</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>
                    Question {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                  <span className="font-semibold">Score: {score}</span>
                </div>
                <Progress value={progress} className="h-1 bg-white/20" />
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-4 md:p-5 bg-gradient-to-b from-white to-gray-50">
            <div className="space-y-3">
              {/* Question Image */}
              <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden border-2 border-[#c8a55c] shadow-lg">
                <Image
                  src={question.image || "/placeholder.svg"}
                  alt={question.question}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Question */}
              <h3 className="text-base md:text-lg font-serif font-bold text-[#0b1c2c]">{question.question}</h3>

              {/* Answer Options */}
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
                      className={`w-full text-left p-2.5 rounded-lg border-2 transition-all shadow-md ${
                        showCorrect
                          ? "border-green-600 bg-green-50 shadow-green-200"
                          : showIncorrect
                            ? "border-red-600 bg-red-50 shadow-red-200"
                            : isSelected
                              ? "border-[#c8a55c] bg-[#c8a55c]/10 shadow-[#c8a55c]/30"
                              : "border-gray-300 hover:border-[#c8a55c]/70 hover:shadow-lg"
                      } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{option}</span>
                        {showCorrect && <span className="text-green-600 font-bold text-xs">✓ Correct!</span>}
                        {showIncorrect && <span className="text-red-600 font-bold text-xs">✗ Incorrect</span>}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Fun Fact */}
              {showResult && (
                <div className="bg-gradient-to-r from-[#c8a55c]/10 to-[#c8a55c]/5 border-l-4 border-[#c8a55c] p-2.5 rounded-r-lg animate-fade-in shadow-md">
                  <p className="text-xs font-semibold text-[#0b1c2c] mb-0.5">Did you know?</p>
                  <p className="text-xs text-gray-700">{question.funFact}</p>
                </div>
              )}

              {!showResult && (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-[#c8a55c] to-[#a88947] hover:from-[#a88947] hover:to-[#8a6d39] text-white font-semibold py-3 text-sm shadow-lg hover:shadow-xl transition-all border-b-4 border-[#8a6d39]"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ChevronRight className="ml-1.5 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
