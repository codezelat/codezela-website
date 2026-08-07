import { access, mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const uploadBase = "https://codezela.com/wp-content/uploads";

const assets = [
  "/2024/02/Frame-12.png",
  "/2024/11/Group-326-1024x245.png",
  "/2024/11/Group-326-768x184.png",
  "/2024/08/Group-202-768x768.png",
  "/2024/08/Group-323.png.webp",
  "/2024/08/Untitled-1.png.webp",
  "/2024/08/Group-328.png.webp",
  "/2024/11/meeting-2-768x534.jpg.webp",
  "/2024/11/meeting-1-768x459.jpg.webp",
  "/2024/08/device-desktop-code.png",
  "/2024/09/app-development-1.svg",
  "/2024/09/coding.svg",
  "/2024/09/artificial-intelligence_900961-1.svg",
  "/2024/09/web-site_1073508.svg",
  "/2024/09/shopping-bag.svg",
  "/2024/09/digital-content.svg",
  "/2024/09/building.svg",
  "/2024/09/gear_17893648.svg",
  "/2024/09/reliability_16912752-1.svg",
  ...[
    "bank_1669617", "online-store", "health-insurance", "online-education", "house", "industrial", "bell-boy", "chain", "principle", "car-repair", "radio", "watch-movie", "electrical", "hammer", "tractor", "burger", "progamming", "worker", "desk", "brand", "fitness", "laboratory", "money", "shield", "friendly", "moving", "shopping-bag-1", "international", "game", "painting", "delivery-truck", "environmental", "investment", "healthcare", "event-planner", "analysis", "architect", "telehealth", "document", "bio",
  ].map((name) => `/2024/${name === "bank_1669617" || name === "online-store" ? "08" : "09"}/${name}.svg`),
  "/2024/11/next-js-icon-2048x1234-85gmuivx-768x463.png",
  "/2024/11/nodejs-1-logo-png-transparent-768x471.png",
  "/2024/11/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8-768x469.png",
  "/2024/11/Vercel_logo_black.svg-768x176.png",
  "/2024/11/google-cloud-logo-1-768x481.png",
  "/2024/11/AWS-Logo-PNG-Pic.png",
  "/2024/11/wordpress-logo-wordpress-icon-transparent-free-png-768x768.webp",
  "/2024/11/pngegg-768x768.png",
  "/2024/11/litespeed-logo-square-768x768.png",
  "/2024/11/chatgpt-logo-768x768.png",
  "/2024/11/midjourney-color-icon.webp",
  "/2024/11/Shopify-Logo-768x432.png",
  "/2024/11/rankmath-logo-e1730669719991-768x167.png",
  "/2024/11/Webflow_logo_2023.svg-768x129.png",
  "/2024/11/Framer-Logo-768x247.png",
  "/2024/11/wix-logo-768x305.png",
  "/2024/12/evergreen-e1733334384902-768x448.png",
  "/2024/12/CeylonEcoSpices-e1733333457314-768x443.png",
  "/2024/09/Smart-Network-Earning-min-768x446.png",
  "/2024/09/Saumika-Senanayake-min-768x450.png",
  "/2024/11/evergreen-lighting-logo-e1730677852286-768x232.png",
  "/2024/11/me-ceylon-logo-final-e1730678009886-768x346.png",
  "/2024/11/ceylon-eco-spices-logo-768x768.png",
  "/2024/11/Food-Kingdom-Logo-Black-768x421.png",
  "/2024/08/photo_2021-11-23_18-40-47-300x92-1.png",
  "/2024/08/nyffsl-1-768x346.png",
  "/2024/08/nyffsl-2-768x346.png",
  "/2024/08/nyffsl-3-768x346.png",
  "/2024/11/ashen-sri-lanka-768x147.png",
  "/2024/08/osthar-logo-300x79-1.png",
  "/2024/08/smit-logo1-300x124-1.png",
  "/2024/08/igl-logo-1.png",
  "/2025/01/branding-award-codezela-150x150.png",
  "/2025/01/web-development-award-codezela-150x150.png",
  "/2025/01/seo-award-codezela-150x150.png",
  "/2024/08/TB-trusted-on-transparent-dark-bg.svg",
  "/2024/08/image-1.png.webp",
  "/2024/08/image-2.png.webp",
  "/2024/08/Untitled-150x150.png",
  "/2024/08/image-5-1-768x204.png.webp",
  "/2024/08/Group-321-1.png.webp",
];

const seoAssets = [
  ["/2024/12/Frame-4.png", "og-codezela.png"],
  ["/2024/11/cropped-Frame-15-1-32x32.png", "favicon-32.png"],
  ["/2024/11/cropped-Frame-15-1-192x192.png", "icon-192.png"],
  ["/2024/11/cropped-Frame-15-1-180x180.png", "apple-touch-icon.png"],
];

const imageDir = join(process.cwd(), "public", "images");
const seoDir = join(process.cwd(), "public", "seo");
await mkdir(imageDir, { recursive: true });
await mkdir(seoDir, { recursive: true });

async function download(source, target) {
  try {
    await access(target);
    process.stdout.write(`Kept ${basename(target)}\n`);
    return;
  } catch {
    // The asset is not local yet.
  }
  const response = await fetch(`${uploadBase}${source}`);
  if (!response.ok) throw new Error(`${response.status} ${source}`);
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  process.stdout.write(`Downloaded ${basename(target)}\n`);
}

for (let index = 0; index < assets.length; index += 6) {
  await Promise.all(
    assets.slice(index, index + 6).map((source) => download(source, join(imageDir, basename(source)))),
  );
}
await Promise.all(seoAssets.map(([source, filename]) => download(source, join(seoDir, filename))));
