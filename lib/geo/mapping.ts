// State code to product tags mapping
export const STATE_TO_TAGS: Record<string, string[]> = {
  // Northeast
  NY: ["New York", "Yankees", "Mets", "Giants", "Jets", "Bills"],
  PA: ["Pennsylvania", "Eagles", "Steelers", "Phillies", "Pirates"],
  MA: ["Massachusetts", "Patriots", "Red Sox", "Celtics", "Bruins"],
  NJ: ["New Jersey", "Devils", "Nets"],
  CT: ["Connecticut"],
  RI: ["Rhode Island"],
  VT: ["Vermont"],
  NH: ["New Hampshire"],
  ME: ["Maine"],

  // Southeast
  FL: ["Florida", "Dolphins", "Buccaneers", "Jaguars", "Marlins", "Rays"],
  GA: ["Georgia", "Falcons", "Braves"],
  NC: ["North Carolina", "Panthers"],
  SC: ["South Carolina"],
  VA: ["Virginia", "Commanders"],
  WV: ["West Virginia"],
  TN: ["Tennessee", "Titans"],
  KY: ["Kentucky"],
  AL: ["Alabama"],
  MS: ["Mississippi"],
  LA: ["Louisiana", "Saints"],

  // Midwest
  OH: ["Ohio", "Browns", "Bengals", "Guardians", "Reds"],
  MI: ["Michigan", "Lions", "Tigers"],
  IN: ["Indiana", "Colts"],
  IL: ["Illinois", "Bears", "Cubs", "White Sox"],
  WI: ["Wisconsin", "Packers", "Brewers"],
  MN: ["Minnesota", "Vikings", "Twins"],
  IA: ["Iowa"],
  MO: ["Missouri", "Chiefs", "Cardinals", "Royals"],
  ND: ["North Dakota"],
  SD: ["South Dakota"],
  NE: ["Nebraska"],
  KS: ["Kansas"],

  // Southwest
  TX: ["Texas", "Cowboys", "Texans", "Rangers", "Astros"],
  OK: ["Oklahoma"],
  AR: ["Arkansas"],
  AZ: ["Arizona", "Cardinals", "Diamondbacks"],
  NM: ["New Mexico"],

  // West
  CA: ["California", "Rams", "Chargers", "49ers", "Raiders", "Dodgers", "Giants", "Padres"],
  NV: ["Nevada", "Raiders", "Golden Knights"],
  OR: ["Oregon"],
  WA: ["Washington", "Seahawks", "Mariners"],
  ID: ["Idaho"],
  MT: ["Montana"],
  WY: ["Wyoming"],
  UT: ["Utah"],
  CO: ["Colorado", "Broncos", "Rockies"],

  // Alaska & Hawaii
  AK: ["Alaska"],
  HI: ["Hawaii"],
}

export function getTagsForState(stateCode: string): string[] {
  return STATE_TO_TAGS[stateCode] || []
}

export function buildGeoQuery(stateCode: string): string {
  const tags = getTagsForState(stateCode)
  if (tags.length === 0) return ""

  // Build Shopify query string: tag:Texas OR tag:Cowboys OR tag:Rangers
  return tags.map((tag) => `tag:"${tag}"`).join(" OR ")
}
