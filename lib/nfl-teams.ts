// NFL Team Logo Mapping - All 32 Teams organized by Conference

export interface NFLTeam {
  name: string
  logo: string
  conference: "NFC" | "AFC"
  division: "East" | "West" | "North" | "South"
}

export const NFL_TEAMS: NFLTeam[] = [
  // NFC East
  {
    name: "Dallas Cowboys",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "East",
  },
  {
    name: "Philadelphia Eagles",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "East",
  },
  {
    name: "New York Giants",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "East",
  },
  {
    name: "Washington Commanders",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "East",
  },

  // NFC West
  {
    name: "San Francisco 49ers",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "West",
  },
  {
    name: "Seattle Seahawks",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "West",
  },
  {
    name: "Los Angeles Rams",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "West",
  },
  {
    name: "Arizona Cardinals",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Arizona%20Cardinals-UWxVs3fK8idXT6pxUVobpBAGWnPWjb.webp",
    conference: "NFC",
    division: "West",
  },

  // NFC North
  {
    name: "Detroit Lions",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "North",
  },
  {
    name: "Green Bay Packers",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "North",
  },
  {
    name: "Minnesota Vikings",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "North",
  },
  {
    name: "Chicago Bears",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "North",
  },

  // NFC South
  {
    name: "Tampa Bay Buccaneers",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "South",
  },
  {
    name: "Atlanta Falcons",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Atlanta-Falcons-VTadqz547s41wGDTTv5J69CGInRkLs.webp",
    conference: "NFC",
    division: "South",
  },
  {
    name: "Carolina Panthers",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carolina%20Panthers-DD5yFgvrRJ2UewdZ6XvyNAqBq4Zky1.webp",
    conference: "NFC",
    division: "South",
  },
  {
    name: "New Orleans Saints",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "NFC",
    division: "South",
  },

  // AFC East
  {
    name: "Buffalo Bills",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "East",
  },
  {
    name: "Miami Dolphins",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "East",
  },
  {
    name: "New York Jets",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "East",
  },
  {
    name: "New England Patriots",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "East",
  },

  // AFC West
  {
    name: "Kansas City Chiefs",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "West",
  },
  {
    name: "Los Angeles Chargers",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "West",
  },
  {
    name: "Denver Broncos",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "West",
  },
  {
    name: "Las Vegas Raiders",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "West",
  },

  // AFC North
  {
    name: "Baltimore Ravens",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "North",
  },
  {
    name: "Pittsburgh Steelers",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "North",
  },
  {
    name: "Cincinnati Bengals",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "North",
  },
  {
    name: "Cleveland Browns",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "North",
  },

  // AFC South
  {
    name: "Houston Texans",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "South",
  },
  {
    name: "Indianapolis Colts",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "South",
  },
  {
    name: "Jacksonville Jaguars",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "South",
  },
  {
    name: "Tennessee Titans",
    logo: "/placeholder.svg?height=80&width=80",
    conference: "AFC",
    division: "South",
  },
]

export const NFC_TEAMS = NFL_TEAMS.filter((team) => team.conference === "NFC")
export const AFC_TEAMS = NFL_TEAMS.filter((team) => team.conference === "AFC")

export function getNFLTeamByName(name: string): NFLTeam | null {
  const normalizedName = name.toLowerCase().trim()
  return NFL_TEAMS.find((team) => team.name.toLowerCase() === normalizedName) || null
}

export function isNFLMenuItem(title: string): boolean {
  const normalized = title.toLowerCase()
  return normalized.includes("nfl") || normalized.includes("football")
}
