import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { GoogleConsentManager } from "@/components/shared/GoogleConsent";
import { RouteScrollTop } from "@/components/shared/RouteScrollTop";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const title = "Codezela Technologies - No.1 Web Development And Marketing Agency";
const description =
  "Codezela Technologies, our creative agency in Sri Lanka elevates your business with expert web development, mobile app solutions, digital marketing and more to help businesses grow online.";

export const metadata: Metadata = {
  metadataBase: new URL("https://codezela.com"),
  title,
  description,
  applicationName: "Codezela Technologies",
  authors: [{ name: "Codezela Technologies", url: "https://codezela.com/" }],
  creator: "Codezela Technologies",
  publisher: "Codezela Technologies",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Codezela Technologies",
    title,
    description,
    images: [
      {
        url: "/seo/og-codezela.png",
        width: 2000,
        height: 2000,
        alt: "Codezela Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CodezelaT",
    creator: "@CodezelaT",
    title,
    description,
    images: ["/seo/og-codezela.png"],
  },
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#710bc0",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} ${roboto.variable} ${inter.variable}`}>
        <Script id="codezela-google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
window.gtag('set', 'ads_data_redaction', true);`}
        </Script>
        <RouteScrollTop />
        {children}
        <GoogleConsentManager />
      </body>
    </html>
  );
}
