export const sectionDescription =
  "Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in healthcare, finance, e-commerce, education, and beyond.";

export const processSteps = [
  {
    title: "Inception Meeting",
    description:
      "Begin with a collaborative session where we dive deep into your vision, goals, and challenges.",
  },
  {
    title: "Strategize for Success",
    description:
      "Craft a tailored strategy that aligns with your objectives. We analyze market trends, competitors",
  },
  {
    title: "Bringing Ideas to Life",
    description:
      "Our talented team transforms concepts into reality. From elegant designs to functional",
  },
  {
    title: "Refining Perfection",
    description:
      "Embrace a collaborative review process. Regular checkpoints allow for feedback incorporation,",
  },
] as const;

export const coreValues = [
  {
    title: "1. Respect",
    description:
      "Valuing diverse perspectives and fostering a culture of integrity, trust, and inclusivity.",
  },
  {
    title: "2. Passion",
    description:
      "Driven by enthusiasm and dedication to deliver exceptional results in everything we do.",
  },
  {
    title: "3. Leadership",
    description:
      "Inspiring growth and setting industry standards through expertise, vision, and accountability.",
  },
  {
    title: "4. Innovation",
    description:
      "Embracing creativity and forward-thinking to develop solutions that redefine possibilities.",
  },
] as const;

export const leaders = [
  {
    name: "Sayuru Amarasinghe",
    title: "CEO",
    image: "/images/about/CEO-cropped-768x753.jpg.webp",
    width: 768,
    height: 753,
  },
  {
    name: "Cader Rahmathulla",
    title: "COO",
    image: "/images/about/COO-cropped-768x738.jpg.webp",
    width: 768,
    height: 738,
  },
  {
    name: "Isuru Perera",
    title: "CFO",
    image: "/images/about/CFO.jpg.webp",
    width: 738,
    height: 795,
  },
] as const;

export const locations = [
  {
    id: "uk",
    selectorLabel: "United Kingdom",
    branch: "Headquarters",
    city: "United Kingdom",
    description:
      "As the core of our global operations, our UK headquarters drives strategic innovation and leadership. It serves as a hub for crafting tailored solutions that empower businesses worldwide.",
    address: ["71-75 Shelton Street", "Covent Garden", "London", "United Kingdom", "WC2H 9JQ"],
    image: "/images/about/image-3-1-1024x638.png.webp",
    imageAlt: "Central London skyline and the Palace of Westminster",
    width: 1024,
    height: 638,
    country: "United Kingdom",
  },
  {
    id: "uae",
    selectorLabel: "United Arab Emirates",
    branch: "GCC Branch",
    city: "United Arab Emirates",
    description:
      "Situated in the UAE, our GCC branch bridges technology with the dynamic Middle Eastern market. This location enables us to cater to the region’s unique digital transformation needs.",
    address: ["Office 704, Level 7", "Al Majaz 2", "Faya Business Park Tower", "Sharjah", "UAE"],
    image: "/images/about/dubai-768x576.jpg.webp",
    imageAlt: "Dubai skyline in the United Arab Emirates",
    width: 768,
    height: 576,
    country: "United Arab Emirates",
  },
  {
    id: "head-office",
    selectorLabel: "Sri Lanka - Head Office",
    branch: "Head Office",
    city: "Colombo, Sri Lanka",
    description:
      "Located in the heart of Colombo, our Sri Lankan head office acts as a creative powerhouse for delivering cutting-edge solutions. It’s where expertise and innovation converge to meet global client demands.",
    address: ["Level 12", "Parkland Building", "33, Park St", "Colombo 00200"],
    image: "/images/about/nelum-1024x566.jpg.webp",
    imageAlt: "Aerial view of Colombo, Sri Lanka and the Lotus Tower",
    width: 1024,
    height: 566,
    country: "Sri Lanka",
  },
  {
    id: "borella",
    selectorLabel: "Sri Lanka - Borella",
    branch: "Regional Branch",
    city: "Borella, Sri Lanka",
    description:
      "Strategically positioned in Colombo 8, this regional branch strengthens our ability to collaborate with local clients. It ensures seamless support and services across industries.",
    address: ["345/35", "RIT Alles Mawatha", "Colombo 00800"],
    image: "/images/about/boralla-2.jpg.webp",
    imageAlt: "Codezela regional branch in Borella, Sri Lanka",
    width: 800,
    height: 450,
    country: "Sri Lanka",
  },
  {
    id: "gampola",
    selectorLabel: "Sri Lanka - Gampola",
    branch: "Regional Branch",
    city: "Gampola, Sri Lanka",
    description:
      "Our Gampola branch extends our presence to Sri Lanka’s central region, fostering accessibility and personalised client engagement. It plays a key role in serving regional businesses effectively.",
    address: ["SITC Building, 285", "Hospital Rd", "Gampola 20500"],
    image: "/images/about/kandy-1024x684.jpg.webp",
    imageAlt: "Central Sri Lankan landscape near the Gampola branch",
    width: 1024,
    height: 684,
    country: "Sri Lanka",
  },
] as const;

export type LocationId = (typeof locations)[number]["id"];
