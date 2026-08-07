export type DetailMetric = {
  value: string;
  label: string;
};

type MetricPair = readonly [DetailMetric, DetailMetric];

const portfolioMetrics: Record<string, MetricPair> = {
  "evergreen-lighting": [
    { value: "SEO", label: "Performance-ready product catalogue" },
    { value: "1:1", label: "Product-specific enquiry paths" },
  ],
  "ceylon-eco": [
    { value: "B2B", label: "Streamlined bulk-order journey" },
    { value: "UX", label: "Responsive spice catalogue" },
  ],
  "smart-network-earning": [
    { value: "2-in-1", label: "Applications and credit purchases" },
    { value: "CMS", label: "Custom applicant dashboard" },
  ],
  "saumika-senanayake": [
    { value: "LMS", label: "Courses, recordings and live learning" },
    { value: "UX", label: "Responsive student access" },
  ],
  "photolamp-ecommerce": [
    { value: "1:1", label: "Customer-designed lamp products" },
    { value: "D2C", label: "Custom Shopify commerce journey" },
  ],
  "smarit-academy": [
    { value: "LMS", label: "Secure digital course delivery" },
    { value: "Auto", label: "Certificate generation on completion" },
  ],
  "tharusha-san": [
    { value: "CMS", label: "Self-managed creative portfolio" },
    { value: "SEO", label: "Search-ready brand presence" },
  ],
  "tech-shorts": [
    { value: "CMS", label: "Managed publishing workflow" },
    { value: "SEO", label: "Search-friendly article platform" },
  ],
  "viduvin-holdings": [
    { value: "360°", label: "Connected corporate brand presence" },
    { value: "SEO", label: "Search-ready professional website" },
  ],
  "sitc-campus": [
    { value: "CMS", label: "Course and diploma management" },
    { value: "SEO", label: "Local-search-ready campus platform" },
  ],
  "xpara-gen": [
    { value: "Web3", label: "NFT agency portfolio experience" },
    { value: "CMS", label: "Custom project management" },
  ],
  "pixel-design-portfolio": [
    { value: "2-in-1", label: "Notion and Super integration" },
    { value: "Lean", label: "Low-cost managed portfolio" },
  ],
  "donate-srilanka": [
    { value: "2-chain", label: "Lightning and mainnet donations" },
    { value: "Global", label: "International donor reach" },
  ],
  "nirmalab-me": [
    { value: "2-in-1", label: "Notion and Popsy integration" },
    { value: "Lean", label: "Low-cost managed portfolio" },
  ],
  "national-youth-film-festival-website": [
    { value: "Multi", label: "Multi-level film submission flow" },
    { value: "SEO", label: "Search-optimised festival presence" },
  ],
  "rumikmart-ecommerce": [
    { value: "B2C", label: "Multi-vendor commerce platform" },
    { value: "360°", label: "Products, vendors, coupons and payments" },
  ],
  "osthar-lk": [
    { value: "Hybrid", label: "Digital courses and physical DVDs" },
    { value: "LMS", label: "Managed e-learning platform" },
  ],
  "industrial-glove": [
    { value: "B2B", label: "Product quotation journey" },
    { value: "SEO", label: "Local-search-ready manufacturer website" },
  ],
};

const industryMetrics: Record<string, MetricPair> = {
  "petroleum-and-natural-resources": [
    { value: "24/7", label: "Real-time asset monitoring" },
    { value: "360°", label: "Resource lifecycle visibility" },
  ],
  "printing-and-publishing": [
    { value: "3-in-1", label: "Content, publishing and commerce" },
    { value: "POD", label: "Print-on-demand delivery" },
  ],
  "telehealth-and-telemedicine": [
    { value: "24/7", label: "Accessible remote-care journeys" },
    { value: "3-in-1", label: "Video, portals and scheduling" },
  ],
  "architecture-and-design": [
    { value: "3D", label: "Immersive design visualisation" },
    { value: "BIM", label: "Coordinated project workflows" },
  ],
  "advertising-and-marketing": [
    { value: "360°", label: "Connected campaign management" },
    { value: "Live", label: "Multi-channel performance insights" },
  ],
  "event-planning-and-management": [
    { value: "360°", label: "End-to-end event operations" },
    { value: "Live", label: "Attendee analytics and engagement" },
  ],
  "health-and-wellness": [
    { value: "24/7", label: "Digital booking and client access" },
    { value: "360°", label: "Connected wellness journeys" },
  ],
  "financial-technology-fintech": [
    { value: "AI", label: "Credit and financial intelligence" },
    { value: "P2P", label: "Modern lending experiences" },
  ],
  "environmental-and-sustainability": [
    { value: "IoT", label: "Environmental monitoring systems" },
    { value: "360°", label: "Energy, waste and carbon visibility" },
  ],
  "transportation-and-logistics": [
    { value: "Live", label: "Fleet and shipment tracking" },
    { value: "360°", label: "Warehouse-to-customer coordination" },
  ],
  "arts-and-creative-industries": [
    { value: "Global", label: "Worldwide creative reach" },
    { value: "3-in-1", label: "Showcase, collaborate and monetise" },
  ],
  "gaming-and-esports": [
    { value: "Live", label: "Real-time gaming experiences" },
    { value: "360°", label: "Players, teams and tournaments" },
  ],
  "startups-and-entrepreneurs": [
    { value: "MVP", label: "Investor-ready product foundations" },
    { value: "0→1", label: "Idea-to-launch delivery" },
  ],
  "luxury-goods-and-jewellery": [
    { value: "1:1", label: "Personalised luxury journeys" },
    { value: "360°", label: "Commerce and client relationships" },
  ],
  "retail-and-wholesale-distribution": [
    { value: "Live", label: "Real-time inventory visibility" },
    { value: "2-in-1", label: "Retail and wholesale operations" },
  ],
  "consumer-electronics": [
    { value: "IoT", label: "Connected product experiences" },
    { value: "360°", label: "Full product lifecycle delivery" },
  ],
  "aerospace-and-defence": [
    { value: "AI", label: "Predictive maintenance intelligence" },
    { value: "24/7", label: "Mission-critical operations support" },
  ],
  "professional-services-consulting-legal-accounting": [
    { value: "360°", label: "Connected client operations" },
    { value: "Auto", label: "Documents, billing and workflows" },
  ],
  "pharmaceuticals-and-biotechnology": [
    { value: "R&D", label: "Clinical and laboratory workflows" },
    { value: "360°", label: "Compliance and data visibility" },
  ],
  "sports-and-fitness": [
    { value: "24/7", label: "Booking and membership access" },
    { value: "360°", label: "Fitness business management" },
  ],
  "fashion-and-apparel": [
    { value: "D2C", label: "Direct fashion commerce" },
    { value: "1:1", label: "Personalised shopping experiences" },
  ],
  "human-resources-and-staffing": [
    { value: "360°", label: "Complete workforce visibility" },
    { value: "Auto", label: "Recruitment, payroll and onboarding" },
  ],
  "construction-and-engineering": [
    { value: "BIM", label: "Coordinated project delivery" },
    { value: "360°", label: "Planning-to-execution visibility" },
  ],
  "technology-and-software-development": [
    { value: "SaaS", label: "Scalable software products" },
    { value: "AI", label: "Intelligent digital experiences" },
  ],
  "food-and-beverage": [
    { value: "24/7", label: "Ordering and reservation access" },
    { value: "360°", label: "Restaurant operations visibility" },
  ],
  "agriculture-and-farming": [
    { value: "IoT", label: "Connected farm management" },
    { value: "AI", label: "Data-led crop decisions" },
  ],
  "non-profit-and-government": [
    { value: "360°", label: "Mission and service delivery" },
    { value: "Secure", label: "Donor and citizen engagement" },
  ],
  "energy-and-utilities": [
    { value: "IoT", label: "Connected resource management" },
    { value: "Live", label: "Real-time energy visibility" },
  ],
  "media-and-entertainment": [
    { value: "OTT", label: "Modern streaming experiences" },
    { value: "360°", label: "Create, distribute and monetise" },
  ],
  telecommunications: [
    { value: "24/7", label: "Always-connected service journeys" },
    { value: "Live", label: "Network and support visibility" },
  ],
  "automotive-and-transportation": [
    { value: "Live", label: "Real-time vehicle tracking" },
    { value: "AI", label: "Predictive fleet maintenance" },
  ],
  "insurance-and-legal": [
    { value: "Auto", label: "Paperwork and client workflows" },
    { value: "Secure", label: "Compliance-ready operations" },
  ],
  "logistics-and-supply-chain": [
    { value: "Live", label: "Real-time supply-chain tracking" },
    { value: "360°", label: "Warehouse, fleet and shipment view" },
  ],
  "travel-and-hospitality": [
    { value: "24/7", label: "Booking and guest access" },
    { value: "360°", label: "Complete hospitality journey" },
  ],
  "manufacturing-and-industrial": [
    { value: "Auto", label: "Connected production workflows" },
    { value: "Live", label: "Operational performance visibility" },
  ],
  "real-estate-and-property-management": [
    { value: "360°", label: "Complete property journeys" },
    { value: "3D", label: "Immersive virtual tours" },
  ],
  "education-and-elearning": [
    { value: "LMS", label: "Scalable learning management" },
    { value: "24/7", label: "Flexible digital course access" },
  ],
  "healthcare-and-medical": [
    { value: "AI", label: "Data-led patient insights" },
    { value: "Secure", label: "Compliant clinical workflows" },
  ],
  "ecommerce-and-retail": [
    { value: "Omni", label: "Connected commerce channels" },
    { value: "1:1", label: "Personalised shopping journeys" },
  ],
  "finance-and-banking": [
    { value: "AI", label: "Fraud and financial intelligence" },
    { value: "Secure", label: "Protected digital banking" },
  ],
};

const fallbackMetrics: MetricPair = [
  { value: "UX", label: "Responsive digital experience" },
  { value: "SEO", label: "Search-ready delivery foundation" },
];

export function getPortfolioMetrics(slug: string): MetricPair {
  return portfolioMetrics[slug] ?? fallbackMetrics;
}

export function getIndustryMetrics(slug: string): MetricPair {
  return industryMetrics[slug] ?? fallbackMetrics;
}

export const detailMetricCoverage = {
  portfolio: Object.keys(portfolioMetrics),
  industries: Object.keys(industryMetrics),
};
