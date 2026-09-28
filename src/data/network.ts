export type NetworkEntry = {
  name: string;
  href: string;
  description: string;
  image: string;
  imageSource: string;
  background: string;
  label?: string;
};

// Descriptions and source artwork checked against each official site on 2026-09-28.
// Relationships are deliberately distinguished: products, specialist companies,
// our education initiative and education partners are not equivalent legal entities.
export const networkCompanies: readonly NetworkEntry[] = [
  {
    name: "BYOW",
    href: "https://byow.lk/",
    description:
      "Website design and development for businesses ready to build their online presence.",
    image: "byow",
    imageSource: "https://byow.lk/images/byow-logo.svg",
    background: "#f5f5f5",
  },
  {
    name: "Ddigital",
    href: "https://ddigital.lk/",
    description:
      "Branding, graphic design and digital media that bring a business’s identity to life.",
    image: "ddigital",
    imageSource: "https://ddigital.lk/apple-icon.png",
    background: "#f3f1ff",
  },
  {
    name: "RANDS",
    href: "https://rands.lk/",
    description:
      "Rizz & Slay: content production, social campaigns and creative storytelling for brands.",
    image: "rands",
    imageSource: "https://rands.lk/images/logo.png",
    background: "#eef7fa",
  },
  {
    name: "SWOT",
    href: "https://swot.lk/",
    description:
      "Digital strategy and performance marketing, connecting business goals with measurable campaigns.",
    image: "swot",
    imageSource: "https://swot.lk/brand/swot-mark.svg",
    background: "#eff4ff",
  },
  {
    name: "Vault Zero",
    href: "https://vat0.lk/",
    description:
      "Cybersecurity and Zero Trust architecture for stronger digital infrastructure.",
    image: "vat0",
    // Official header is live type, not the site's social-preview image.
    imageSource: "https://vat0.lk/",
    background: "#020503",
  },
  {
    name: "Plan A",
    href: "https://plana.lk/",
    description:
      "Event planning and production for corporate occasions, celebrations and memorable experiences.",
    image: "plana",
    imageSource: "https://plana.lk/images/plan-a/plan-a-icon.webp",
    background: "#000000",
  },
];

export const networkProducts: readonly NetworkEntry[] = [
  {
    name: "kAIro AI",
    href: "https://kairo.lk/",
    description:
      "An AI image studio for generating, editing and refining creative visuals.",
    image: "kairo",
    imageSource: "https://kairo.lk/images/logo1.png",
    background: "#f6f0ff",
    label: "AI image creation",
  },
  {
    name: "ScopeSeal",
    href: "https://scopeseal.codezela.com/",
    description:
      "Review briefs and proposals for missing details, unclear requirements and scope-creep risks.",
    image: "scopeseal",
    imageSource: "https://scopeseal.codezela.com/images/home/mascot-hero.png",
    background: "#edf6ff",
    label: "Project scope clarity",
  },
  {
    name: "PageGoblin",
    href: "https://pagegoblin.org/",
    description:
      "A website critique tool that spots unclear copy, weak proof and hard-to-find calls to action.",
    image: "pagegoblin",
    imageSource: "https://pagegoblin.org/images/home/goblin-curious.png",
    background: "#f1f6e9",
    label: "Website feedback",
  },
  {
    name: "DriveDock",
    href: "https://drivedock.app/",
    description:
      "A macOS app for uploading files and folders to Google Drive, with resumable transfers and folder preservation.",
    image: "drivedock",
    imageSource: "https://drivedock.app/icon.svg",
    background: "#edf5ff",
    label: "macOS productivity",
  },
  {
    name: "Cite Worthy",
    href: "https://cw.codezela.com/",
    description:
      "Source-conscious content planning and SEO guidance, from website context to drafts ready for review.",
    image: "cite-worthy",
    imageSource: "https://cw.codezela.com/images/brand/quill-flying.webp",
    background: "#fff5e9",
    label: "Content guidance · Private preview",
  },
];

export const networkPublications: readonly NetworkEntry[] = [
  {
    name: "Sparks by Codezela",
    href: "https://sparks.codezela.com/",
    description:
      "Our publication exploring technology, web development and digital marketing, with practical perspectives for businesses and updates from Codezela.",
    image: "sparks-wordmark",
    // Generated wordmark paired with the unchanged Codezela dragon in the UI.
    // URL records brand context, not an official source for the new wordmark.
    imageSource: "https://sparks.codezela.com/",
    background: "#f6efff",
    label: "Our publication",
  },
];

export const networkEducation: readonly NetworkEntry[] = [
  {
    name: "Codezela Career Accelerator",
    href: "https://cca.it.com/",
    description:
      "Practical technology learning and career development through Codezela.",
    image: "cca",
    imageSource: "https://cca.it.com/images/cca/cca-logo-768x768.png",
    background: "#ffffff",
    label: "Our education initiative",
  },
  {
    name: "SITC Campus",
    href: "https://sitc.lk/",
    description:
      "Our education partner for higher education and professional learning in Sri Lanka.",
    image: "sitc",
    imageSource:
      "https://sitc.lk/wp-content/uploads/2023/10/sitc-logo-768x235.png",
    background: "#ffffff",
    label: "Education partner",
  },
  {
    name: "ISBS Campus",
    href: "https://isbs.lk/",
    description:
      "Practical diploma courses and skills development. ISBS operates under SITC Campus.",
    image: "isbs",
    imageSource: "https://isbs.lk/images/isbs-logo-horizontal.jpg",
    background: "#ffffff",
    label: "Education network",
  },
];
