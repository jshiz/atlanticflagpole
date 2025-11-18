import { FlagpoleQuizClient } from "@/components/quiz/flagpole-quiz-client"

export const metadata = {
  title: "Flagpole & Flag Quiz - Test Your Knowledge | Atlantic Flagpoles",
  description: "Test your knowledge about flagpoles, flags, and proper display etiquette. Complete our quiz for exclusive rewards!",
}

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-afp-ivory">
      <FlagpoleQuizClient />
    </main>
  )
}
