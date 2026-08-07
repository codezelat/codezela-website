import { access, mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const routeAssets = {
  services: [
    "https://codezela.com/wp-content/uploads/2024/08/circle-svg.svg",
    "https://codezela.com/wp-content/uploads/2024/08/device-desktop-code.png.webp",
    "https://codezela.com/wp-content/uploads/2024/09/app-development-1.svg",
    "https://codezela.com/wp-content/uploads/2024/09/artificial-intelligence_900961-1.svg",
    "https://codezela.com/wp-content/uploads/2024/09/building.svg",
    "https://codezela.com/wp-content/uploads/2024/09/coding.svg",
    "https://codezela.com/wp-content/uploads/2024/09/digital-content.svg",
    "https://codezela.com/wp-content/uploads/2024/09/shopping-bag.svg",
    "https://codezela.com/wp-content/uploads/2024/09/web-site_1073508.svg",
  ],
  portfolio: [
    "https://codezela.com/wp-content/uploads/2024/09/SITC-Campus-min-768x448.png.webp",
    "https://codezela.com/wp-content/uploads/2024/09/Saumika-Senanayake-min-768x450.png.webp",
    "https://codezela.com/wp-content/uploads/2024/09/Smart-Network-Earning-min-768x446.png.webp",
    "https://codezela.com/wp-content/uploads/2024/09/Tharusha-San-min-768x446.png.webp",
    "https://codezela.com/wp-content/uploads/2024/09/donatesl-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/nirmalab-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/plp-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/sita-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/tshorts-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/viduvin-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/09/xparagen-mockup-1024x682.png-768x512.webp",
    "https://codezela.com/wp-content/uploads/2024/12/CeylonEcoSpices-e1733333457314-768x443.png.webp",
    "https://codezela.com/wp-content/uploads/2024/12/National-Youth-Film-2-768x456.png.webp",
    "https://codezela.com/wp-content/uploads/2024/12/Pixel-Design-Portfolio-e1733867459982-768x445.png",
    "https://codezela.com/wp-content/uploads/2024/12/evergreen-e1733334384902-768x448.png.webp",
    "https://codezela.com/wp-content/uploads/2024/11/portfolio-hero-right-bg.png.webp",
  ],
  industries: [
    "https://codezela.com/wp-content/uploads/2024/08/bank_1669617.svg",
    "https://codezela.com/wp-content/uploads/2024/08/online-store.svg",
    "https://codezela.com/wp-content/uploads/2024/09/health-insurance.svg",
    "https://codezela.com/wp-content/uploads/2024/09/house.svg",
    "https://codezela.com/wp-content/uploads/2024/09/online-education.svg",
    "https://codezela.com/wp-content/uploads/2024/08/Group-202.png.webp",
  ],
  about: [
    "https://codezela.com/wp-content/uploads/2024/08/Rectangle-76-768x649.png.webp",
    "https://codezela.com/wp-content/uploads/2024/08/image-3-1-1024x638.png.webp",
    "https://codezela.com/wp-content/uploads/2024/11/CEO-cropped-768x753.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/CFO.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/COO-cropped-768x738.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/boralla-2.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/dubai-768x576.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/handshake-close-up-executives-768x512.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/kandy-1024x684.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/meeting-1-768x459.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/meeting-2-768x534.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/nelum-1024x566.jpg.webp",
    "https://codezela.com/wp-content/uploads/2024/11/about-hero-bg-1024x1024.png.webp",
  ],
  contact: [
    "https://codezela.com/wp-content/uploads/2024/11/contact-page-hero-rightside-bg.png.webp",
  ],
};

const imageRoot = join(process.cwd(), "public", "images");

async function download(route, url) {
  const routeDir = join(imageRoot, route);
  const target = join(routeDir, basename(new URL(url).pathname));
  await mkdir(routeDir, { recursive: true });

  try {
    await access(target);
    process.stdout.write(`Kept ${route}/${basename(target)}\n`);
    return;
  } catch {
    // Continue with the public source download.
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  process.stdout.write(`Downloaded ${route}/${basename(target)}\n`);
}

for (const [route, assets] of Object.entries(routeAssets)) {
  for (let index = 0; index < assets.length; index += 6) {
    await Promise.all(assets.slice(index, index + 6).map((url) => download(route, url)));
  }
}
