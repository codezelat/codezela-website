export type CardItem = {
  title: string;
  description: string;
  icon: string;
  href?: string;
};

export const navItems = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Industries", "/industries"],
  ["About", "/about"],
] as const;

export const services: CardItem[] = [
  { title: "Web Application Development", description: "Crafting visually appealing websites with seamless functionality and user-centric design.", icon: "/images/device-desktop-code.png" },
  { title: "Mobile Application Development (iOS, Android)", description: "Creating sleek and functional iOS applications tailored to meet your business goals.", icon: "/images/app-development-1.svg" },
  { title: "Custom Software Development", description: "Designing tailored software solutions that meet the specific needs of your business.", icon: "/images/coding.svg" },
  { title: "Artificial Intelligence, Machine Learning, and NLP Solutions Development", description: "Implementing AI solutions that automate tasks and improve decision-making through data-driven insights.", icon: "/images/artificial-intelligence_900961-1.svg" },
  { title: "UI/UX Design and Product Development", description: "Focusing on user-centric design to create interfaces that are intuitive and engaging.", icon: "/images/web-site_1073508.svg" },
  { title: "E-commerce Solutions", description: "Building custom e-commerce websites designed to convert visitors into customers.", icon: "/images/shopping-bag.svg" },
  { title: "Content Management Systems (CMS) Development", description: "Building responsive and customisable WordPress websites that empower businesses to manage content easily.", icon: "/images/digital-content.svg" },
  { title: "Enterprise Software and Cloud-based Solutions", description: "Designing cloud-based software that supports large-scale enterprise operations.", icon: "/images/building.svg" },
  { title: "Software Maintenance and Support", description: "Providing continuous support to ensure your software runs smoothly at all times.", icon: "/images/gear_17893648.svg" },
  { title: "Quality Assurance and Testing", description: "Ensuring the highest standards of software quality through rigorous testing processes.", icon: "/images/reliability_16912752-1.svg" },
];

const industry = (title: string, slug: string, description: string, icon: string): CardItem => ({
  title,
  description,
  href: `/industry/${slug}`,
  icon: `/images/${icon}.svg`,
});

export const industries: CardItem[] = [
  industry("Finance and Banking", "finance-and-banking", "Offering secure mobile banking apps, blockchain solutions, and AI-driven financial analytics to drive growth and ensure financial security.", "bank_1669617"),
  industry("E-commerce and Retail", "ecommerce-and-retail", "Providing end-to-end e-commerce solutions, personalized shopping experiences, and inventory management systems to optimize retail operations and boost sales.", "online-store"),
  industry("Healthcare and Medical", "healthcare-and-medical", "Transform your healthcare services with cutting-edge software solutions that enhance patient care, streamline operations, and maintain regulatory compliance.", "health-insurance"),
  industry("Education and E-learning", "education-and-elearning", "Drive engagement in the education sector with our innovative e-learning platforms, mobile learning apps, and virtual classrooms.", "online-education"),
  industry("Real Estate and Property Management", "real-estate-and-property-management", "Modernise your real estate business with technology solutions that streamline property management, enhance customer experiences, and simplify transactions.", "house"),
  industry("Manufacturing and Industrial", "manufacturing-and-industrial", "Enhance your manufacturing processes with advanced technology solutions tailored to optimise productivity and reduce costs.", "industrial"),
  industry("Travel and Hospitality", "travel-and-hospitality", "Provide seamless customer experiences in the travel and hospitality industry with Codezela Technologies’ cutting-edge solutions.", "bell-boy"),
  industry("Logistics and Supply Chain", "logistics-and-supply-chain", "Stay ahead in the logistics industry with Codezela Technologies’ tailored solutions for end-to-end supply chain management.", "chain"),
  industry("Insurance and Legal", "insurance-and-legal", "Streamline your insurance and legal services with technology solutions that automate paperwork, manage client relationships, and improve compliance.", "principle"),
  industry("Automotive and Transportation", "automotive-and-transportation", "Fuel growth in the automotive and transportation industries with smart technology solutions from Codezela Technologies.", "car-repair"),
  industry("Telecommunications", "telecommunications", "Elevate your telecommunications business with Codezela Technologies’ advanced digital solutions.", "radio"),
  industry("Media and Entertainment", "media-and-entertainment", "Create, distribute, and monetise content more effectively with Codezela Technologies’ digital solutions for the media and entertainment industry.", "watch-movie"),
  industry("Energy and Utilities", "energy-and-utilities", "Optimise your energy and utilities operations with smart technology solutions that improve efficiency and sustainability.", "electrical"),
  industry("Non-profit and Government", "non-profit-and-government", "Maximise impact and efficiency in the non-profit and government sectors with Codezela Technologies’ digital solutions.", "hammer"),
  industry("Agriculture and Farming", "agriculture-and-farming", "Revolutionise farming and agriculture with smart technology solutions that optimise productivity, enhance resource management, and reduce costs.", "tractor"),
  industry("Food and Beverage", "food-and-beverage", "Streamline operations in the food and beverage industry with Codezela Technologies’ advanced solutions.", "burger"),
  industry("Technology and Software Development", "technology-and-software-development", "Lead the tech revolution with Codezela Technologies’ custom software development and tech solutions.", "progamming"),
  industry("Construction and Engineering", "construction-and-engineering", "Optimise construction and engineering projects with Codezela Technologies’ project management solutions, building information modelling (BIM) software, and resource management tools.", "worker"),
  industry("Human Resources and Staffing", "human-resources-and-staffing", "Improve your HR and staffing processes with Codezela Technologies’ advanced human resources software solutions.", "desk"),
  industry("Fashion and Apparel", "fashion-and-apparel", "Boost your fashion and apparel brand with Codezela Technologies’ digital solutions, including custom e-commerce platforms, inventory management systems, and personalised shopping experiences.", "brand"),
  industry("Sports and Fitness", "sports-and-fitness", "Elevate your sports and fitness business with Codezela Technologies’ custom apps, membership management platforms, and online booking systems.", "fitness"),
  industry("Pharmaceuticals and Biotechnology", "pharmaceuticals-and-biotechnology", "Advance your pharmaceutical and biotechnology operations with Codezela Technologies’ cutting-edge solutions.", "laboratory"),
  industry("Professional Services (Consulting, Legal, Accounting)", "professional-services-consulting-legal-accounting", "Enhance your professional services firm with Codezela Technologies’ digital solutions designed to streamline operations and improve client satisfaction.", "money"),
  industry("Aerospace and Defence", "aerospace-and-defence", "Optimise your aerospace and defence operations with Codezela Technologies’ high-tech solutions.", "shield"),
  industry("Consumer Electronics", "consumer-electronics", "Develop and launch cutting-edge consumer electronics products with Codezela Technologies’ end-to-end technology services.", "friendly"),
  industry("Retail and Wholesale Distribution", "retail-and-wholesale-distribution", "Optimise your retail and wholesale distribution processes with Codezela Technologies’ custom solutions.", "moving"),
  industry("Luxury Goods and Jewellery", "luxury-goods-and-jewellery", "Enhance your luxury goods and jewellery business with Codezela Technologies’ e-commerce platforms, customer relationship management tools, and personalised marketing strategies.", "shopping-bag-1"),
  industry("Startups and Entrepreneurs", "startups-and-entrepreneurs", "Launch and grow your startup with Codezela Technologies’ custom software solutions, digital platforms, and marketing strategies.", "international"),
  industry("Gaming and Esports", "gaming-and-esports", "Take your gaming or esports business to the next level with Codezela Technologies’ game development, platform creation, and player management tools.", "game"),
  industry("Arts and Creative Industries", "arts-and-creative-industries", "Empower your creative business with Codezela Technologies’ digital solutions tailored for artists, designers, and creators.", "painting"),
  industry("Transportation and Logistics", "transportation-and-logistics", "Enhance your transportation and logistics operations with Codezela Technologies’ digital platforms for fleet management, real-time tracking, and route optimisation.", "delivery-truck"),
  industry("Environmental and Sustainability", "environmental-and-sustainability", "Promote environmental sustainability with Codezela Technologies’ smart solutions for energy management, waste reduction, and carbon footprint tracking.", "environmental"),
  industry("Financial Technology (Fintech)", "financial-technology-fintech", "Empower your fintech business with Codezela Technologies’ innovative software solutions for mobile payments, digital banking, and blockchain integration.", "investment"),
  industry("Health and Wellness", "health-and-wellness", "Improve your health and wellness business with Codezela Technologies’ digital solutions, including online booking systems, client management platforms, and virtual wellness consultations.", "healthcare"),
  industry("Event Planning and Management", "event-planning-and-management", "Take your event planning business to the next level with Codezela Technologies’ event management platforms, ticketing systems, and attendee engagement tools.", "event-planner"),
  industry("Advertising and Marketing", "advertising-and-marketing", "Maximise the impact of your advertising and marketing campaigns with Codezela Technologies’ digital solutions.", "analysis"),
  industry("Architecture and Design", "architecture-and-design", "Revolutionise your architecture and design projects with Codezela Technologies’ 3D modelling software, project management tools, and visualisation platforms.", "architect"),
  industry("Telehealth and Telemedicine", "telehealth-and-telemedicine", "Expand your healthcare services with Codezela Technologies’ telehealth and telemedicine platforms.", "telehealth"),
  industry("Printing and Publishing", "printing-and-publishing", "Take your publishing business to the next level with Codezela Technologies’ custom content management systems, digital publishing platforms, and e-commerce solutions for print-on-demand services.", "document"),
  industry("Petroleum and Natural Resources", "petroleum-and-natural-resources", "Optimise your petroleum and natural resources operations with Codezela Technologies’ advanced digital solutions for asset management, real-time monitoring, and data analytics.", "bio"),
];

export const technologyLogos = [
  ["Next.js", "next-js-icon-2048x1234-85gmuivx-768x463.png"],
  ["Node.js", "nodejs-1-logo-png-transparent-768x471.png"],
  ["Tailwind CSS", "tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8-768x469.png"],
  ["Vercel", "Vercel_logo_black.svg-768x176.png"],
  ["Google Cloud", "google-cloud-logo-1-768x481.png"],
  ["AWS", "AWS-Logo-PNG-Pic.png"],
  ["WordPress", "wordpress-logo-wordpress-icon-transparent-free-png-768x768.webp"],
  ["LiteSpeed Cache", "pngegg-768x768.png"],
  ["LiteSpeed", "litespeed-logo-square-768x768.png"],
  ["ChatGPT", "chatgpt-logo-768x768.png"],
  ["Midjourney", "midjourney-color-icon.webp"],
  ["Shopify", "Shopify-Logo-768x432.png"],
  ["Rank Math", "rankmath-logo-e1730669719991-768x167.png"],
  ["Webflow", "Webflow_logo_2023.svg-768x129.png"],
  ["Framer", "Framer-Logo-768x247.png"],
  ["Wix", "wix-logo-768x305.png"],
] as const;

export const portfolioItems = [
  { href: "/portfolio/evergreen-lighting", image: "/images/evergreen-e1733334384902-768x448.png", type: "Web Development", title: "Evergreen Lighting Malaysia Website", description: "Evergreen Lighting Malaysia needed a responsive website to showcase their wide range of lighting products, including indoor, outdoor, stage, and customized lights, with a user-friendly inquiry system for customers.", category: "Industrial" },
  { href: "/portfolio/ceylon-eco", image: "/images/CeylonEcoSpices-e1733333457314-768x443.png", type: "Web Development", title: "Ceylon Eco Spices Website", description: "The website showcases a wide range of premium spices, featuring a detailed product catalog, a secure bulk-ordering system, and a responsive design for a seamless browsing experience across devices", category: "E-commerce" },
  { href: "/portfolio/smart-network-earning", image: "/images/Smart-Network-Earning-min-768x446.png", type: "Web Development", title: "Smart Network Earning Solutions Website", description: "Users can seamlessly apply for jobs and purchase application credits through a clean, responsive platform. A customized dashboard offers efficient management of applications and applicants, enhancing the overall experience.", category: "Job Listing" },
  { href: "/portfolio/saumika-senanayake", image: "/images/Saumika-Senanayake-min-768x450.png", type: "Web Development", title: "Saumika Senanayake Learning Management System", description: "Focused on enhancing the learning experience, the platform offers easy student registration, secure video access, and a dashboard to manage courses, lessons, and media—all designed with simplicity and responsiveness in mind.", category: "Education" },
] as const;

export const clients = [
  ["Evergreen Lighting", "evergreen-lighting-logo-e1730677852286-768x232.png"],
  ["Me Ceylon", "me-ceylon-logo-final-e1730678009886-768x346.png"],
  ["Ceylon Eco Spices", "ceylon-eco-spices-logo-768x768.png"],
  ["Food Kingdom", "Food-Kingdom-Logo-Black-768x421.png"],
  ["Client logo", "photo_2021-11-23_18-40-47-300x92-1.png"],
  ["NYFFSL", "nyffsl-1-768x346.png"],
  ["NYFFSL", "nyffsl-2-768x346.png"],
  ["NYFFSL", "nyffsl-3-768x346.png"],
  ["Ashen Sri Lanka", "ashen-sri-lanka-768x147.png"],
  ["Osthar", "osthar-logo-300x79-1.png"],
  ["SMIT", "smit-logo1-300x124-1.png"],
  ["IGL", "igl-logo-1.png"],
] as const;

export const awards = [
  ["Branding award for Codezela Technologies", "branding-award-codezela-150x150.png"],
  ["Web development award for Codezela Technologies", "web-development-award-codezela-150x150.png"],
  ["SEO award for Codezela Technologies", "seo-award-codezela-150x150.png"],
] as const;
