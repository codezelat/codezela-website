type IndustryVisual = {
  src: string;
  alt: string;
  sourceUrl: string;
};

const unsplashSearch = (query: string) => `https://unsplash.com/s/photos/${query}`;

export const industryVisuals: Record<string, IndustryVisual> = {
  "finance-and-banking": {
    src: "/images/industries/finance-and-banking.webp",
    alt: "Financial market data displayed on a digital screen",
    sourceUrl: unsplashSearch("banking-finance-technology"),
  },
  "ecommerce-and-retail": {
    src: "/images/industries/ecommerce-and-retail.webp",
    alt: "Shopping trolley surrounded by packaged retail orders",
    sourceUrl: unsplashSearch("ecommerce-retail-shopping"),
  },
  "healthcare-and-medical": {
    src: "/images/industries/healthcare-and-medical.webp",
    alt: "Medical team collaborating in a hospital operating room",
    sourceUrl: unsplashSearch("medical-healthcare-team"),
  },
  "education-and-elearning": {
    src: "/images/industries/education-and-elearning.webp",
    alt: "Learner using a laptop for an online class",
    sourceUrl: unsplashSearch("online-learning-education-classroom"),
  },
  "real-estate-and-property-management": {
    src: "/images/industries/real-estate-and-property-management.webp",
    alt: "Contemporary residential property with a landscaped exterior",
    sourceUrl: unsplashSearch("modern-property-real-estate"),
  },
  "manufacturing-and-industrial": {
    src: "/images/industries/manufacturing-and-industrial.webp",
    alt: "Automated machinery operating on a modern production line",
    sourceUrl: unsplashSearch("modern-manufacturing-factory"),
  },
  "travel-and-hospitality": {
    src: "/images/industries/travel-and-hospitality.webp",
    alt: "Resort pool and guest area in a tropical destination",
    sourceUrl: unsplashSearch("luxury-hotel-travel"),
  },
  "logistics-and-supply-chain": {
    src: "/images/industries/logistics-and-supply-chain.webp",
    alt: "High-bay warehouse aisles used for supply-chain operations",
    sourceUrl: unsplashSearch("logistics-warehouse-supply-chain"),
  },
  "insurance-and-legal": {
    src: "/images/industries/insurance-and-legal.webp",
    alt: "Professional office interior for legal and insurance consultations",
    sourceUrl: unsplashSearch("law-office"),
  },
  "automotive-and-transportation": {
    src: "/images/industries/automotive-and-transportation.webp",
    alt: "Performance vehicle presented in a modern automotive showroom",
    sourceUrl: unsplashSearch("automotive-industry"),
  },
  telecommunications: {
    src: "/images/industries/telecommunications.webp",
    alt: "Telecommunications towers forming a connected network",
    sourceUrl: unsplashSearch("telecommunication-tower"),
  },
  "media-and-entertainment": {
    src: "/images/industries/media-and-entertainment.webp",
    alt: "Film clapperboard prepared for a media production",
    sourceUrl: unsplashSearch("film-production"),
  },
  "energy-and-utilities": {
    src: "/images/industries/energy-and-utilities.webp",
    alt: "Large solar energy installation supplying renewable power",
    sourceUrl: unsplashSearch("renewable-energy"),
  },
  "non-profit-and-government": {
    src: "/images/industries/non-profit-and-government.webp",
    alt: "Community volunteers working together on a public initiative",
    sourceUrl: unsplashSearch("community-volunteering"),
  },
  "agriculture-and-farming": {
    src: "/images/industries/agriculture-and-farming.webp",
    alt: "Cultivated agricultural fields arranged in long crop rows",
    sourceUrl: unsplashSearch("farming-agriculture"),
  },
  "food-and-beverage": {
    src: "/images/industries/food-and-beverage.webp",
    alt: "Modern restaurant prepared for food and beverage service",
    sourceUrl: unsplashSearch("restaurant-kitchen"),
  },
  "technology-and-software-development": {
    src: "/images/industries/technology-and-software-development.webp",
    alt: "Software development team collaborating around laptops",
    sourceUrl: unsplashSearch("software-developer-team"),
  },
  "construction-and-engineering": {
    src: "/images/industries/construction-and-engineering.webp",
    alt: "Engineering team reviewing work on a large construction site",
    sourceUrl: unsplashSearch("construction-engineering"),
  },
  "human-resources-and-staffing": {
    src: "/images/industries/human-resources-and-staffing.webp",
    alt: "Recruiter and candidate meeting across an office table",
    sourceUrl: unsplashSearch("job-interview"),
  },
  "fashion-and-apparel": {
    src: "/images/industries/fashion-and-apparel.webp",
    alt: "Fashion sketches displayed in an apparel design studio",
    sourceUrl: unsplashSearch("fashion-studio"),
  },
  "sports-and-fitness": {
    src: "/images/industries/sports-and-fitness.webp",
    alt: "Professional fitness equipment inside a modern gym",
    sourceUrl: unsplashSearch("gym-fitness"),
  },
  "pharmaceuticals-and-biotechnology": {
    src: "/images/industries/pharmaceuticals-and-biotechnology.webp",
    alt: "Laboratory researcher examining a sample through a microscope",
    sourceUrl: unsplashSearch("biotechnology-laboratory"),
  },
  "professional-services-consulting-legal-accounting": {
    src: "/images/industries/professional-services-consulting-legal-accounting.webp",
    alt: "Contemporary business district representing professional services",
    sourceUrl: unsplashSearch("business-consulting"),
  },
  "aerospace-and-defence": {
    src: "/images/industries/aerospace-and-defence.webp",
    alt: "Precision-engineered aircraft turbine viewed from the front",
    sourceUrl: unsplashSearch("aerospace-engineering"),
  },
  "consumer-electronics": {
    src: "/images/industries/consumer-electronics.webp",
    alt: "Detailed electronic circuit board and components",
    sourceUrl: unsplashSearch("electronic-devices"),
  },
  "retail-and-wholesale-distribution": {
    src: "/images/industries/retail-and-wholesale-distribution.webp",
    alt: "Organised distribution centre with stocked warehouse racks",
    sourceUrl: unsplashSearch("warehouse-distribution"),
  },
  "luxury-goods-and-jewellery": {
    src: "/images/industries/luxury-goods-and-jewellery.webp",
    alt: "Gold jewellery arranged for a luxury retail presentation",
    sourceUrl: unsplashSearch("jewellery-craftsmanship"),
  },
  "startups-and-entrepreneurs": {
    src: "/images/industries/startups-and-entrepreneurs.webp",
    alt: "Startup founders discussing ideas in a collaborative workspace",
    sourceUrl: unsplashSearch("startup-founders"),
  },
  "gaming-and-esports": {
    src: "/images/industries/gaming-and-esports.webp",
    alt: "Esports competitor playing on a professional gaming stage",
    sourceUrl: unsplashSearch("esports-tournament"),
  },
  "arts-and-creative-industries": {
    src: "/images/industries/arts-and-creative-industries.webp",
    alt: "Paintbrushes and artist materials in a creative studio",
    sourceUrl: unsplashSearch("artist-studio"),
  },
  "transportation-and-logistics": {
    src: "/images/industries/transportation-and-logistics.webp",
    alt: "Freight truck travelling on an open logistics route",
    sourceUrl: unsplashSearch("truck-logistics"),
  },
  "environmental-and-sustainability": {
    src: "/images/industries/environmental-and-sustainability.webp",
    alt: "Hands holding young plants in a forest setting",
    sourceUrl: unsplashSearch("environment-sustainability"),
  },
  "financial-technology-fintech": {
    src: "/images/industries/financial-technology-fintech.webp",
    alt: "Customer completing a contactless digital payment",
    sourceUrl: unsplashSearch("digital-payment-fintech"),
  },
  "health-and-wellness": {
    src: "/images/industries/health-and-wellness.webp",
    alt: "Yoga practice at sunset representing health and wellness",
    sourceUrl: unsplashSearch("wellness-yoga"),
  },
  "event-planning-and-management": {
    src: "/images/industries/event-planning-and-management.webp",
    alt: "Audience attending a professionally staged conference",
    sourceUrl: unsplashSearch("conference-event"),
  },
  "advertising-and-marketing": {
    src: "/images/industries/advertising-and-marketing.webp",
    alt: "Large-format digital advertising displays in a city centre",
    sourceUrl: unsplashSearch("advertising-campaign"),
  },
  "architecture-and-design": {
    src: "/images/industries/architecture-and-design.webp",
    alt: "Architecture team working in a design studio",
    sourceUrl: unsplashSearch("architecture-studio"),
  },
  "telehealth-and-telemedicine": {
    src: "/images/industries/telehealth-and-telemedicine.webp",
    alt: "Clinician using a laptop for a remote healthcare consultation",
    sourceUrl: unsplashSearch("telemedicine"),
  },
  "printing-and-publishing": {
    src: "/images/industries/printing-and-publishing.webp",
    alt: "Industrial printing press producing published materials",
    sourceUrl: unsplashSearch("printing-press"),
  },
  "petroleum-and-natural-resources": {
    src: "/images/industries/petroleum-and-natural-resources.webp",
    alt: "Petroleum processing facility in an industrial landscape",
    sourceUrl: unsplashSearch("oil-gas-industry"),
  },
};
