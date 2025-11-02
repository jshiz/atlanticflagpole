export function getStateCodeFromRegion(region: string): string | null {
  if (!region || typeof region !== "string") {
    return null
  }

  const stateMap: Record<string, string> = {
    // Full state names
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  }

  // Try exact match first
  if (stateMap[region]) {
    return stateMap[region]
  }

  // Try case-insensitive match
  const lowerRegion = region.toLowerCase()
  for (const [state, code] of Object.entries(stateMap)) {
    if (state.toLowerCase() === lowerRegion) {
      return code
    }
  }

  // If it's already a state code, return it
  if (region.length === 2 && /^[A-Z]{2}$/.test(region)) {
    return region
  }

  return null
}
