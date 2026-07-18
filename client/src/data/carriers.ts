export interface Carrier {
  name: string;
  lob: string[];
  markets: string[];
  ams: string;
}

export const carriers: Carrier[] = [
  { name: "Accredited (FLPM)", lob: ["Trucking"], markets: ["Commercial"], ams: "Manual" },
  { name: "Aegis", lob: ["HO3-Home", "DP3-Landlord"], markets: ["Personal"], ams: "Download" },
  { name: "Aegis Financial - Life & Annuities", lob: ["Life", "Annuities"], markets: ["Personal"], ams: "—" },
  { name: "AIG", lob: ["HO3-Home", "Personal Umbrella", "Valuable Articles"], markets: ["Personal"], ams: "Manual" },
  { name: "All Risk", lob: ["Brokers", "E&S Personal Lines"], markets: ["Brokers"], ams: "Manual" },
  { name: "Amelia Underwriters", lob: ["Vacant Property", "Builders Risk"], markets: ["Personal"], ams: "Manual" },
  { name: "American Integrity", lob: ["HO3-Home", "HO6-Condo"], markets: ["Personal"], ams: "Download" },
  { name: "American Modern", lob: ["Manufactured Homes", "Collector Cars", "Boat", "RVs"], markets: ["Personal"], ams: "Download" },
  { name: "AmTrust", lob: ["Workers Comp", "BOP", "General Liability"], markets: ["Commercial"], ams: "Download" },
  { name: "AmWins", lob: ["Brokers", "Commercial Property", "Commercial Umbrella"], markets: ["Brokers"], ams: "Manual" },
  { name: "Apogee", lob: ["Commercial Umbrella"], markets: ["Commercial"], ams: "Manual" },
  { name: "ASI", lob: ["HO3", "HO4", "HO6", "Flood"], markets: ["Personal"], ams: "Download" },
  { name: "Benchmark Insurance Company (FLPM)", lob: ["Trucking"], markets: ["Commercial"], ams: "Manual" },
  { name: "Berkshire Hathaway Guard", lob: ["Workers Comp", "BOP", "Commercial Auto", "Commercial Umbrella"], markets: ["Commercial"], ams: "Download, Manual" },
  { name: "Better Agency", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "BHHC", lob: ["Trucking", "Workers Comp"], markets: ["Commercial"], ams: "Manual" },
  { name: "Branch", lob: ["HO3-Home", "Auto"], markets: ["Personal"], ams: "Download" },
  { name: "Bristol West", lob: ["Auto"], markets: ["Personal"], ams: "Download" },
  { name: "Canal (FLPM)", lob: ["Trucking"], markets: ["Commercial"], ams: "Manual" },
  { name: "Capital Premium Finance", lob: ["Finance Companies"], markets: ["Commercial"], ams: "—" },
  { name: "Chubb", lob: ["HO3-Home", "Valuable Articles", "Personal Umbrella"], markets: ["Personal", "Commercial"], ams: "Manual" },
  { name: "Coalition", lob: ["Cyber Liability"], markets: ["Commercial"], ams: "Manual" },
  { name: "Continental Western Group", lob: ["Commercial Property", "GL", "Commercial Auto"], markets: ["Commercial"], ams: "Download" },
  { name: "Corvus", lob: ["Cyber Liability"], markets: ["Commercial"], ams: "Manual" },
  { name: "Cover Whale", lob: ["Trucking", "Commercial Auto"], markets: ["Commercial"], ams: "Manual" },
  { name: "CRC Group", lob: ["Brokers", "Commercial Umbrella", "Liquor"], markets: ["Brokers"], ams: "Manual" },
  { name: "Dynamic Specialty", lob: ["Trucking"], markets: ["Commercial"], ams: "Manual" },
  { name: "Erie Insurance - Commercial", lob: ["BOP", "GL", "Commercial Auto", "Workers Comp"], markets: ["Commercial"], ams: "Download" },
  { name: "Erie Insurance - Personal Lines", lob: ["HO3-Home", "Auto", "Personal Umbrella", "Boat"], markets: ["Personal"], ams: "Download" },
  { name: "Foremost", lob: ["Manufactured Homes", "Motorcycle", "RVs", "Vacant Property"], markets: ["Personal"], ams: "Download" },
  { name: "Foremost Flood", lob: ["Flood"], markets: ["Personal"], ams: "Manual" },
  { name: "Gateway Underwriters", lob: ["Trucking", "Brokers"], markets: ["Brokers", "Commercial"], ams: "Manual" },
  { name: "Hippo", lob: ["HO3-Home"], markets: ["Personal"], ams: "Download" },
  { name: "Hiscox", lob: ["GL", "BOP", "E&O", "Cyber Liability"], markets: ["Commercial"], ams: "Manual" },
  { name: "Imperial Premium Finance (IPFS)", lob: ["Finance Companies"], markets: ["Commercial"], ams: "—" },
  { name: "IVANS", lob: ["Non Insurance Services"], markets: [], ams: "Download" },
  { name: "Jewelers Mutual", lob: ["Valuable Articles"], markets: ["Personal"], ams: "Manual" },
  { name: "Kemper Auto (Infinity)", lob: ["Auto"], markets: ["Personal"], ams: "Download" },
  { name: "Lemonade", lob: ["HO4-Renters", "HO3-Home"], markets: ["Personal"], ams: "Manual" },
  { name: "Liberty Mutual", lob: ["Auto", "HO3-Home", "BOP"], markets: ["Personal", "Commercial"], ams: "Download" },
  { name: "LOOM", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "Loss Runs", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "Markel", lob: ["GL", "Inland Marine", "Boat", "Motorcycle"], markets: ["Commercial", "Personal"], ams: "Manual" },
  { name: "National General", lob: ["Auto", "HO3-Home", "RVs"], markets: ["Personal"], ams: "Download" },
  { name: "Nationwide", lob: ["Auto", "HO3-Home", "BOP", "Commercial Auto", "Farm"], markets: ["Personal", "Commercial"], ams: "Download" },
  { name: "Northland (CRC)", lob: ["Trucking", "Commercial Auto"], markets: ["Commercial"], ams: "Manual" },
  { name: "Nowcerts", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "Openly", lob: ["HO3-Home"], markets: ["Personal"], ams: "Download" },
  { name: "Personal Umbrella", lob: ["Personal Umbrella", "E&S Personal Lines"], markets: ["Personal"], ams: "Manual" },
  { name: "Pie", lob: ["Workers Comp"], markets: ["Commercial"], ams: "Manual" },
  { name: "Plymouth Rock", lob: ["Auto", "HO3-Home"], markets: ["Personal"], ams: "Download" },
  { name: "Progressive", lob: ["Auto", "Commercial Auto", "Trucking", "Motorcycle", "Boat"], markets: ["Personal", "Commercial"], ams: "Download" },
  { name: "Risk Lookup", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "Risk Placement Services (RPS)", lob: ["Brokers", "Commercial Property", "Liquor"], markets: ["Brokers"], ams: "Manual" },
  { name: "RLI", lob: ["Personal Umbrella", "Home Business"], markets: ["Personal"], ams: "Manual" },
  { name: "Safeco", lob: ["Auto", "HO3", "HO4", "HO6", "Boat", "Personal Umbrella"], markets: ["Personal"], ams: "Download" },
  { name: "Scottish American", lob: ["DP3-Landlord", "Vacant Property"], markets: ["Personal"], ams: "Manual" },
  { name: "Simply Easier Payments", lob: ["Non Insurance Services", "Finance Companies"], markets: [], ams: "—" },
  { name: "Southern Oak", lob: ["HO3-Home"], markets: ["Personal"], ams: "Manual" },
  { name: "State Auto", lob: ["Auto", "HO3-Home", "BOP", "Commercial Auto"], markets: ["Personal", "Commercial"], ams: "Download" },
  { name: "Steadily Insurance", lob: ["DP3-Landlord", "Vacation Rentals"], markets: ["Personal"], ams: "Manual" },
  { name: "Ten Four", lob: ["Trucking"], markets: ["Commercial"], ams: "Manual" },
  { name: "Texas Insurance Company (Applied Underwriters)", lob: ["Workers Comp"], markets: ["Commercial"], ams: "Manual" },
  { name: "The Hartford", lob: ["BOP", "Workers Comp", "GL", "Commercial Auto"], markets: ["Commercial"], ams: "Download" },
  { name: "Total CSR", lob: ["Non Insurance Services"], markets: [], ams: "—" },
  { name: "Travelers", lob: ["Auto", "HO3-Home", "BOP", "Commercial Property", "Commercial Umbrella", "Workers Comp"], markets: ["Personal", "Commercial"], ams: "Download" },
  { name: "US Assure", lob: ["Builders Risk"], markets: ["Commercial"], ams: "Manual" },
  { name: "USG Insurance Services", lob: ["Brokers", "Commercial Property"], markets: ["Brokers"], ams: "Manual" },
  { name: "USLI", lob: ["GL", "DP3-Landlord", "Liquor", "Miscellaneous Services"], markets: ["Commercial"], ams: "Manual" },
  { name: "Vacant Express", lob: ["Vacant Property", "Builders Risk"], markets: ["Personal"], ams: "Manual" },
  { name: "Vault", lob: ["HO3-Home", "Valuable Articles", "Collector Cars"], markets: ["Personal"], ams: "Manual" },
  { name: "Worldwide Facilities / RIC General Agency", lob: ["Brokers", "Trucking"], markets: ["Brokers"], ams: "Manual" },
  { name: "Zapier", lob: ["Non Insurance Services"], markets: [], ams: "—" },
];

// Derived filter options
export const allMarkets = ["Personal", "Commercial", "Brokers"];
export const allAmsOptions = ["Download", "Manual", "Download, Manual", "—"];

export function getAllLobs(): string[] {
  const set = new Set<string>();
  carriers.forEach(c => c.lob.forEach(l => set.add(l)));
  return Array.from(set).sort();
}
