export interface StateCapitalData {
  stateCode: string
  state: string
  capital: string
  stateNickname: string
  countyName: string
  climate: {
    type: string
    challenges: string[]
    phoenixBenefits: string[]
  }
}

export const STATE_CAPITALS: Record<string, StateCapitalData> = {
  AL: {
    stateCode: "AL",
    state: "Alabama",
    capital: "Montgomery",
    stateNickname: "The Yellowhammer State",
    countyName: "Montgomery County",
    climate: {
      type: "Humid subtropical with hot summers and mild winters",
      challenges: ["High humidity", "Severe thunderstorms", "Occasional tornadoes"],
      phoenixBenefits: [
        "100 MPH wind rating handles severe storms",
        "Rust-proof aluminum resists humidity damage",
        "Rope-free design prevents moisture-related issues",
      ],
    },
  },
  AK: {
    stateCode: "AK",
    state: "Alaska",
    capital: "Juneau",
    stateNickname: "The Last Frontier",
    countyName: "City and Borough of Juneau",
    climate: {
      type: "Oceanic climate with cool summers and mild winters",
      challenges: ["High winds", "Heavy precipitation", "Coastal storms"],
      phoenixBenefits: [
        "100 MPH wind guarantee for coastal storms",
        "Corrosion-proof finish resists salt air",
        "No ropes to freeze or snap in cold weather",
      ],
    },
  },
  AZ: {
    stateCode: "AZ",
    state: "Arizona",
    capital: "Phoenix",
    stateNickname: "The Grand Canyon State",
    countyName: "Maricopa County",
    climate: {
      type: "Hot desert climate with intense sun and minimal rainfall",
      challenges: ["Extreme heat", "Intense UV rays", "Dust storms"],
      phoenixBenefits: [
        "Anodized aluminum won't fade or chalk under intense sun",
        "Rust-proof and corrosion-proof in dry desert conditions",
        "No ropes to deteriorate from UV exposure",
      ],
    },
  },
  AR: {
    stateCode: "AR",
    state: "Arkansas",
    capital: "Little Rock",
    stateNickname: "The Natural State",
    countyName: "Pulaski County",
    climate: {
      type: "Humid subtropical with hot summers and mild winters",
      challenges: ["Severe thunderstorms", "Tornadoes", "High humidity"],
      phoenixBenefits: [
        "100 MPH wind rating for tornado-prone areas",
        "Rust-proof construction resists humidity",
        "Rope-free design eliminates storm damage to ropes",
      ],
    },
  },
  CA: {
    stateCode: "CA",
    state: "California",
    capital: "Sacramento",
    stateNickname: "The Golden State",
    countyName: "Sacramento County",
    climate: {
      type: "Mediterranean climate with hot, dry summers",
      challenges: ["Intense summer heat", "Strong valley winds", "Occasional wildfires"],
      phoenixBenefits: [
        "Heat-resistant anodized finish won't warp or fade",
        "100 MPH wind rating handles valley winds",
        "Fire-resistant aluminum construction",
      ],
    },
  },
  CO: {
    stateCode: "CO",
    state: "Colorado",
    capital: "Denver",
    stateNickname: "The Centennial State",
    countyName: "City and County of Denver",
    climate: {
      type: "Semi-arid climate with high altitude and intense sun",
      challenges: ["High winds", "Intense UV at altitude", "Rapid weather changes"],
      phoenixBenefits: [
        "100 MPH wind guarantee for mountain winds",
        "UV-resistant finish won't fade at high altitude",
        "Aerospace-grade aluminum handles temperature swings",
      ],
    },
  },
  CT: {
    stateCode: "CT",
    state: "Connecticut",
    capital: "Hartford",
    stateNickname: "The Constitution State",
    countyName: "Hartford County",
    climate: {
      type: "Humid continental with four distinct seasons",
      challenges: ["Nor'easters", "Winter ice storms", "Coastal winds"],
      phoenixBenefits: [
        "No ropes to freeze, snap, or clang in winter",
        "100 MPH wind rating handles nor'easters",
        "Rust-proof construction resists ice and snow",
      ],
    },
  },
  DE: {
    stateCode: "DE",
    state: "Delaware",
    capital: "Dover",
    stateNickname: "The First State",
    countyName: "Kent County",
    climate: {
      type: "Humid subtropical with moderate coastal influence",
      challenges: ["Coastal storms", "High humidity", "Nor'easters"],
      phoenixBenefits: [
        "Corrosion-proof finish resists coastal salt air",
        "100 MPH wind rating for coastal storms",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  FL: {
    stateCode: "FL",
    state: "Florida",
    capital: "Tallahassee",
    stateNickname: "The Sunshine State",
    countyName: "Leon County",
    climate: {
      type: "Humid subtropical with hot, humid summers",
      challenges: ["Hurricanes", "Extreme humidity", "Intense sun"],
      phoenixBenefits: [
        "100 MPH wind guarantee for hurricane protection",
        "Rust-proof aluminum resists extreme humidity",
        "UV-resistant finish won't fade in intense sun",
      ],
    },
  },
  GA: {
    stateCode: "GA",
    state: "Georgia",
    capital: "Atlanta",
    stateNickname: "The Peach State",
    countyName: "Fulton County",
    climate: {
      type: "Humid subtropical with hot summers",
      challenges: ["High humidity", "Severe thunderstorms", "Occasional tornadoes"],
      phoenixBenefits: [
        "Rust-proof construction handles high humidity",
        "100 MPH wind rating for severe storms",
        "Rope-free design prevents moisture-related issues",
      ],
    },
  },
  HI: {
    stateCode: "HI",
    state: "Hawaii",
    capital: "Honolulu",
    stateNickname: "The Aloha State",
    countyName: "Honolulu County",
    climate: {
      type: "Tropical climate with trade winds",
      challenges: ["Salt air", "High humidity", "Strong trade winds"],
      phoenixBenefits: [
        "Corrosion-proof finish resists salt air damage",
        "100 MPH wind rating for tropical storms",
        "Rust-proof aluminum perfect for island climate",
      ],
    },
  },
  ID: {
    stateCode: "ID",
    state: "Idaho",
    capital: "Boise",
    stateNickname: "The Gem State",
    countyName: "Ada County",
    climate: {
      type: "Semi-arid climate with four seasons",
      challenges: ["High winds", "Temperature extremes", "Dry conditions"],
      phoenixBenefits: [
        "100 MPH wind guarantee for mountain winds",
        "Handles extreme temperature swings",
        "No ropes to deteriorate in dry climate",
      ],
    },
  },
  IL: {
    stateCode: "IL",
    state: "Illinois",
    capital: "Springfield",
    stateNickname: "Land of Lincoln",
    countyName: "Sangamon County",
    climate: {
      type: "Humid continental with hot summers and cold winters",
      challenges: ["Severe thunderstorms", "Winter ice", "High winds"],
      phoenixBenefits: [
        "No ropes to freeze or snap in harsh winters",
        "100 MPH wind rating for prairie storms",
        "Rust-proof construction resists ice and snow",
      ],
    },
  },
  IN: {
    stateCode: "IN",
    state: "Indiana",
    capital: "Indianapolis",
    stateNickname: "The Hoosier State",
    countyName: "Marion County",
    climate: {
      type: "Humid continental with four distinct seasons",
      challenges: ["Severe thunderstorms", "Winter weather", "High winds"],
      phoenixBenefits: [
        "100 MPH wind rating for Midwest storms",
        "No ropes to freeze in winter",
        "Rust-proof construction handles all seasons",
      ],
    },
  },
  IA: {
    stateCode: "IA",
    state: "Iowa",
    capital: "Des Moines",
    stateNickname: "The Hawkeye State",
    countyName: "Polk County",
    climate: {
      type: "Humid continental with hot summers and cold winters",
      challenges: ["Severe thunderstorms", "Tornadoes", "Winter ice"],
      phoenixBenefits: [
        "100 MPH wind guarantee for tornado season",
        "No ropes to freeze or clang in winter",
        "Rust-proof construction handles harsh weather",
      ],
    },
  },
  KS: {
    stateCode: "KS",
    state: "Kansas",
    capital: "Topeka",
    stateNickname: "The Sunflower State",
    countyName: "Shawnee County",
    climate: {
      type: "Humid continental with severe weather",
      challenges: ["Tornadoes", "High winds", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind rating for tornado alley",
        "Rope-free design eliminates storm damage",
        "Aerospace-grade aluminum handles extreme conditions",
      ],
    },
  },
  KY: {
    stateCode: "KY",
    state: "Kentucky",
    capital: "Frankfort",
    stateNickname: "The Bluegrass State",
    countyName: "Franklin County",
    climate: {
      type: "Humid subtropical with four seasons",
      challenges: ["High humidity", "Severe thunderstorms", "Winter ice"],
      phoenixBenefits: [
        "Rust-proof construction resists humidity",
        "100 MPH wind rating for severe storms",
        "No ropes to freeze in winter weather",
      ],
    },
  },
  LA: {
    stateCode: "LA",
    state: "Louisiana",
    capital: "Baton Rouge",
    stateNickname: "The Pelican State",
    countyName: "East Baton Rouge Parish",
    climate: {
      type: "Humid subtropical with hot, humid summers",
      challenges: ["Hurricanes", "Extreme humidity", "Heavy rainfall"],
      phoenixBenefits: [
        "100 MPH wind guarantee for hurricane protection",
        "Rust-proof aluminum resists extreme humidity",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  ME: {
    stateCode: "ME",
    state: "Maine",
    capital: "Augusta",
    stateNickname: "The Pine Tree State",
    countyName: "Kennebec County",
    climate: {
      type: "Humid continental with harsh winters",
      challenges: ["Nor'easters", "Heavy snow", "Coastal winds"],
      phoenixBenefits: [
        "No ropes to freeze, snap, or clang in harsh winters",
        "100 MPH wind rating for nor'easters",
        "Corrosion-proof finish resists coastal salt air",
      ],
    },
  },
  MD: {
    stateCode: "MD",
    state: "Maryland",
    capital: "Annapolis",
    stateNickname: "The Old Line State",
    countyName: "Anne Arundel County",
    climate: {
      type: "Humid subtropical with coastal influence",
      challenges: ["Coastal storms", "High humidity", "Nor'easters"],
      phoenixBenefits: [
        "Corrosion-proof finish resists Chesapeake Bay salt air",
        "100 MPH wind rating for coastal storms",
        "Rust-proof construction handles humidity",
      ],
    },
  },
  MA: {
    stateCode: "MA",
    state: "Massachusetts",
    capital: "Boston",
    stateNickname: "The Bay State",
    countyName: "Suffolk County",
    climate: {
      type: "Humid continental with coastal influence",
      challenges: ["Nor'easters", "Winter ice storms", "Coastal winds"],
      phoenixBenefits: [
        "No ropes to freeze or snap in harsh winters",
        "100 MPH wind rating for nor'easters",
        "Corrosion-proof finish resists coastal salt air",
      ],
    },
  },
  MI: {
    stateCode: "MI",
    state: "Michigan",
    capital: "Lansing",
    stateNickname: "The Great Lakes State",
    countyName: "Ingham County",
    climate: {
      type: "Humid continental with lake effect weather",
      challenges: ["Heavy snow", "High winds", "Lake effect storms"],
      phoenixBenefits: [
        "No ropes to freeze in harsh winters",
        "100 MPH wind rating for lake effect winds",
        "Rust-proof construction resists snow and ice",
      ],
    },
  },
  MN: {
    stateCode: "MN",
    state: "Minnesota",
    capital: "Saint Paul",
    stateNickname: "The North Star State",
    countyName: "Ramsey County",
    climate: {
      type: "Humid continental with extreme cold winters",
      challenges: ["Extreme cold", "Heavy snow", "High winds"],
      phoenixBenefits: [
        "No ropes to freeze or snap in extreme cold",
        "100 MPH wind rating for winter storms",
        "Aerospace-grade aluminum handles temperature extremes",
      ],
    },
  },
  MS: {
    stateCode: "MS",
    state: "Mississippi",
    capital: "Jackson",
    stateNickname: "The Magnolia State",
    countyName: "Hinds County",
    climate: {
      type: "Humid subtropical with hot, humid summers",
      challenges: ["Hurricanes", "High humidity", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind guarantee for hurricane protection",
        "Rust-proof aluminum resists extreme humidity",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  MO: {
    stateCode: "MO",
    state: "Missouri",
    capital: "Jefferson City",
    stateNickname: "The Show-Me State",
    countyName: "Cole County",
    climate: {
      type: "Humid continental with variable weather",
      challenges: ["Tornadoes", "Severe thunderstorms", "Winter ice"],
      phoenixBenefits: [
        "100 MPH wind rating for tornado season",
        "No ropes to freeze in winter",
        "Rope-free design eliminates storm damage",
      ],
    },
  },
  MT: {
    stateCode: "MT",
    state: "Montana",
    capital: "Helena",
    stateNickname: "The Treasure State",
    countyName: "Lewis and Clark County",
    climate: {
      type: "Semi-arid with extreme temperature swings",
      challenges: ["High winds", "Extreme cold", "Rapid weather changes"],
      phoenixBenefits: [
        "100 MPH wind guarantee for mountain winds",
        "Handles extreme temperature swings",
        "No ropes to freeze in harsh winters",
      ],
    },
  },
  NE: {
    stateCode: "NE",
    state: "Nebraska",
    capital: "Lincoln",
    stateNickname: "The Cornhusker State",
    countyName: "Lancaster County",
    climate: {
      type: "Humid continental with severe weather",
      challenges: ["Tornadoes", "High winds", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind rating for tornado alley",
        "Rope-free design eliminates storm damage",
        "Rust-proof construction handles all conditions",
      ],
    },
  },
  NV: {
    stateCode: "NV",
    state: "Nevada",
    capital: "Carson City",
    stateNickname: "The Silver State",
    countyName: "Carson City (Independent City)",
    climate: {
      type: "Semi-arid with hot, dry summers",
      challenges: ["Extreme heat", "Intense sun", "High winds"],
      phoenixBenefits: [
        "Anodized aluminum won't fade in intense desert sun",
        "100 MPH wind rating for mountain winds",
        "No ropes to deteriorate from UV exposure",
      ],
    },
  },
  NH: {
    stateCode: "NH",
    state: "New Hampshire",
    capital: "Concord",
    stateNickname: "The Granite State",
    countyName: "Merrimack County",
    climate: {
      type: "Humid continental with harsh winters",
      challenges: ["Nor'easters", "Heavy snow", "Mountain winds"],
      phoenixBenefits: [
        "No ropes to freeze or snap in harsh winters",
        "100 MPH wind rating for mountain winds",
        "Rust-proof construction resists snow and ice",
      ],
    },
  },
  NJ: {
    stateCode: "NJ",
    state: "New Jersey",
    capital: "Trenton",
    stateNickname: "The Garden State",
    countyName: "Mercer County",
    climate: {
      type: "Humid subtropical with coastal influence",
      challenges: ["Nor'easters", "Coastal storms", "High humidity"],
      phoenixBenefits: [
        "100 MPH wind rating for coastal storms",
        "Corrosion-proof finish resists salt air",
        "No ropes to freeze in winter",
      ],
    },
  },
  NM: {
    stateCode: "NM",
    state: "New Mexico",
    capital: "Santa Fe",
    stateNickname: "Land of Enchantment",
    countyName: "Santa Fe County",
    climate: {
      type: "Semi-arid with high altitude",
      challenges: ["Intense sun at altitude", "High winds", "Dry conditions"],
      phoenixBenefits: [
        "UV-resistant finish won't fade at high altitude",
        "100 MPH wind rating for mountain winds",
        "No ropes to deteriorate in dry climate",
      ],
    },
  },
  NY: {
    stateCode: "NY",
    state: "New York",
    capital: "Albany",
    stateNickname: "The Empire State",
    countyName: "Albany County",
    climate: {
      type: "Humid continental with harsh winters",
      challenges: ["Nor'easters", "Heavy snow", "Lake effect weather"],
      phoenixBenefits: [
        "No ropes to freeze, snap, or clang in harsh winters",
        "100 MPH wind rating for nor'easters",
        "Rust-proof construction resists snow and ice",
      ],
    },
  },
  NC: {
    stateCode: "NC",
    state: "North Carolina",
    capital: "Raleigh",
    stateNickname: "The Tar Heel State",
    countyName: "Wake County",
    climate: {
      type: "Humid subtropical with moderate seasons",
      challenges: ["Hurricanes", "High humidity", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind guarantee for hurricane protection",
        "Rust-proof aluminum resists humidity",
        "Rope-free design prevents storm damage",
      ],
    },
  },
  ND: {
    stateCode: "ND",
    state: "North Dakota",
    capital: "Bismarck",
    stateNickname: "The Peace Garden State",
    countyName: "Burleigh County",
    climate: {
      type: "Continental with extreme cold winters",
      challenges: ["Extreme cold", "High winds", "Blizzards"],
      phoenixBenefits: [
        "No ropes to freeze or snap in extreme cold",
        "100 MPH wind rating for prairie winds",
        "Aerospace-grade aluminum handles temperature extremes",
      ],
    },
  },
  OH: {
    stateCode: "OH",
    state: "Ohio",
    capital: "Columbus",
    stateNickname: "The Buckeye State",
    countyName: "Franklin County",
    climate: {
      type: "Humid continental with four seasons",
      challenges: ["Severe thunderstorms", "Winter ice", "High winds"],
      phoenixBenefits: [
        "100 MPH wind rating for Midwest storms",
        "No ropes to freeze in winter",
        "Rust-proof construction handles all seasons",
      ],
    },
  },
  OK: {
    stateCode: "OK",
    state: "Oklahoma",
    capital: "Oklahoma City",
    stateNickname: "The Sooner State",
    countyName: "Oklahoma County",
    climate: {
      type: "Humid subtropical with severe weather",
      challenges: ["Tornadoes", "High winds", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind guarantee for tornado alley",
        "Rope-free design eliminates storm damage",
        "Aerospace-grade aluminum handles extreme conditions",
      ],
    },
  },
  OR: {
    stateCode: "OR",
    state: "Oregon",
    capital: "Salem",
    stateNickname: "The Beaver State",
    countyName: "Marion County",
    climate: {
      type: "Oceanic climate with mild, wet winters",
      challenges: ["Heavy rainfall", "Coastal winds", "High humidity"],
      phoenixBenefits: [
        "Rust-proof aluminum resists constant moisture",
        "100 MPH wind rating for coastal storms",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  PA: {
    stateCode: "PA",
    state: "Pennsylvania",
    capital: "Harrisburg",
    stateNickname: "The Keystone State",
    countyName: "Dauphin County",
    climate: {
      type: "Humid continental with four seasons",
      challenges: ["Winter ice storms", "High winds", "Variable weather"],
      phoenixBenefits: [
        "No ropes to freeze or snap in winter",
        "100 MPH wind rating for storms",
        "Rust-proof construction handles all seasons",
      ],
    },
  },
  RI: {
    stateCode: "RI",
    state: "Rhode Island",
    capital: "Providence",
    stateNickname: "The Ocean State",
    countyName: "Providence County",
    climate: {
      type: "Humid continental with coastal influence",
      challenges: ["Nor'easters", "Coastal storms", "Winter weather"],
      phoenixBenefits: [
        "Corrosion-proof finish resists coastal salt air",
        "100 MPH wind rating for nor'easters",
        "No ropes to freeze in winter",
      ],
    },
  },
  SC: {
    stateCode: "SC",
    state: "South Carolina",
    capital: "Columbia",
    stateNickname: "The Palmetto State",
    countyName: "Richland County",
    climate: {
      type: "Humid subtropical with hot summers",
      challenges: ["Hurricanes", "High humidity", "Severe thunderstorms"],
      phoenixBenefits: [
        "100 MPH wind guarantee for hurricane protection",
        "Rust-proof aluminum resists extreme humidity",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  SD: {
    stateCode: "SD",
    state: "South Dakota",
    capital: "Pierre",
    stateNickname: "The Mount Rushmore State",
    countyName: "Hughes County",
    climate: {
      type: "Continental with extreme temperature swings",
      challenges: ["High winds", "Extreme cold", "Blizzards"],
      phoenixBenefits: [
        "100 MPH wind rating for prairie winds",
        "No ropes to freeze in extreme cold",
        "Handles extreme temperature swings",
      ],
    },
  },
  TN: {
    stateCode: "TN",
    state: "Tennessee",
    capital: "Nashville",
    stateNickname: "The Volunteer State",
    countyName: "Davidson County",
    climate: {
      type: "Humid subtropical with four seasons",
      challenges: ["Severe thunderstorms", "Tornadoes", "High humidity"],
      phoenixBenefits: [
        "100 MPH wind rating for severe storms",
        "Rust-proof construction resists humidity",
        "Rope-free design eliminates storm damage",
      ],
    },
  },
  TX: {
    stateCode: "TX",
    state: "Texas",
    capital: "Austin",
    stateNickname: "The Lone Star State",
    countyName: "Travis County",
    climate: {
      type: "Humid subtropical with hot summers",
      challenges: ["Extreme heat", "Severe thunderstorms", "High winds"],
      phoenixBenefits: [
        "Heat-resistant anodized finish won't warp or fade",
        "100 MPH wind rating for Texas storms",
        "Rust-proof construction handles all conditions",
      ],
    },
  },
  UT: {
    stateCode: "UT",
    state: "Utah",
    capital: "Salt Lake City",
    stateNickname: "The Beehive State",
    countyName: "Salt Lake County",
    climate: {
      type: "Semi-arid with four seasons",
      challenges: ["High winds", "Intense sun", "Temperature extremes"],
      phoenixBenefits: [
        "100 MPH wind rating for mountain winds",
        "UV-resistant finish won't fade at altitude",
        "Handles extreme temperature swings",
      ],
    },
  },
  VT: {
    stateCode: "VT",
    state: "Vermont",
    capital: "Montpelier",
    stateNickname: "The Green Mountain State",
    countyName: "Washington County",
    climate: {
      type: "Humid continental with harsh winters",
      challenges: ["Heavy snow", "Extreme cold", "Mountain winds"],
      phoenixBenefits: [
        "No ropes to freeze or snap in harsh winters",
        "100 MPH wind rating for mountain winds",
        "Rust-proof construction resists snow and ice",
      ],
    },
  },
  VA: {
    stateCode: "VA",
    state: "Virginia",
    capital: "Richmond",
    stateNickname: "The Old Dominion",
    countyName: "Independent City",
    climate: {
      type: "Humid subtropical with four seasons",
      challenges: ["Coastal storms", "High humidity", "Variable weather"],
      phoenixBenefits: [
        "100 MPH wind rating for coastal storms",
        "Rust-proof construction resists humidity",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  WA: {
    stateCode: "WA",
    state: "Washington",
    capital: "Olympia",
    stateNickname: "The Evergreen State",
    countyName: "Thurston County",
    climate: {
      type: "Oceanic climate with mild, wet winters",
      challenges: ["Heavy rainfall", "Coastal winds", "High humidity"],
      phoenixBenefits: [
        "Rust-proof aluminum resists constant moisture",
        "100 MPH wind rating for Pacific storms",
        "Rope-free design prevents moisture damage",
      ],
    },
  },
  WV: {
    stateCode: "WV",
    state: "West Virginia",
    capital: "Charleston",
    stateNickname: "The Mountain State",
    countyName: "Kanawha County",
    climate: {
      type: "Humid subtropical with mountain influence",
      challenges: ["Mountain winds", "Heavy snow", "Variable weather"],
      phoenixBenefits: [
        "100 MPH wind rating for mountain winds",
        "No ropes to freeze in winter",
        "Rust-proof construction handles all conditions",
      ],
    },
  },
  WI: {
    stateCode: "WI",
    state: "Wisconsin",
    capital: "Madison",
    stateNickname: "The Badger State",
    countyName: "Dane County",
    climate: {
      type: "Humid continental with harsh winters",
      challenges: ["Extreme cold", "Heavy snow", "Lake effect weather"],
      phoenixBenefits: [
        "No ropes to freeze or snap in extreme cold",
        "100 MPH wind rating for winter storms",
        "Rust-proof construction resists snow and ice",
      ],
    },
  },
  WY: {
    stateCode: "WY",
    state: "Wyoming",
    capital: "Cheyenne",
    stateNickname: "The Equality State",
    countyName: "Laramie County",
    climate: {
      type: "Semi-arid with high winds",
      challenges: ["Extreme winds", "Rapid weather changes", "Harsh winters"],
      phoenixBenefits: [
        "100 MPH wind guarantee for Wyoming winds",
        "Handles extreme temperature swings",
        "No ropes to freeze in harsh winters",
      ],
    },
  },
}

export const stateCapitals = Object.keys(STATE_CAPITALS).reduce(
  (acc, key) => {
    const data = STATE_CAPITALS[key]
    acc[key] = {
      name: data.state,
      capital: data.capital,
      nickname: data.stateNickname,
      county: data.countyName,
      climate: data.climate,
    }
    return acc
  },
  {} as Record<
    string,
    {
      name: string
      capital: string
      nickname: string
      county: string
      climate: {
        type: string
        challenges: string[]
        phoenixBenefits: string[]
      }
    }
  >,
)

// Also export the original for backward compatibility

export function getStateCapitalData(stateCode: string): StateCapitalData | null {
  return STATE_CAPITALS[stateCode.toUpperCase()] || null
}

export function getAllStateCapitals(): StateCapitalData[] {
  return Object.values(STATE_CAPITALS)
}
