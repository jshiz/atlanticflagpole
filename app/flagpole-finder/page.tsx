import { FlagpoleFinder } from "@/components/flagpole-finder/flagpole-finder"

export const metadata = {
  title: "Flagpole Finder - Find Your Perfect Flagpole | Atlantic Flagpoles",
  description: "Answer a few simple questions and we'll recommend the perfect flagpole for your needs.",
}

export default function FlagpoleFinderPage() {
  return (
    <main className="min-h-screen bg-afp-ivory">
      <FlagpoleFinder />
    </main>
  )
}
