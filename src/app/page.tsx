import { Awards } from "@/components/home/Awards";
import { Clients } from "@/components/home/Clients";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { Introduction } from "@/components/home/Introduction";
import { Portfolio } from "@/components/home/Portfolio";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { Technology } from "@/components/home/Technology";
import { WhySpecial } from "@/components/home/WhySpecial";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      "@id": "https://codezela.com/#place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 12, Parkland Building, 33, Park St",
        addressLocality: "Colombo",
        addressRegion: "Western",
        postalCode: "00200",
        addressCountry: "LK",
      },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://codezela.com/#organization",
      name: "Codezela Technologies",
      legalName: "Codezela Technologies (Pvt) Ltd",
      url: "https://codezela.com/",
      foundingDate: "2020",
      duns: "561798728",
      email: "info@codezela.com",
      telephone: "+94114858899",
      description:
        "Codezela Technologies, our creative agency in Sri Lanka elevates your business with expert web development, mobile app solutions, digital marketing and more to help businesses grow online.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 12, Parkland Building, 33, Park St",
        addressLocality: "Colombo",
        addressRegion: "Western",
        postalCode: "00200",
        addressCountry: "LK",
      },
      location: { "@id": "https://codezela.com/#place" },
      logo: {
        "@type": "ImageObject",
        "@id": "https://codezela.com/#logo",
        url: "https://codezela.com/seo/og-codezela.png",
        contentUrl: "https://codezela.com/seo/og-codezela.png",
        width: 2000,
        height: 2000,
        caption: "Codezela Technologies",
      },
      image: { "@id": "https://codezela.com/#logo" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+94114858899",
          contactType: "customer support",
          email: "info@codezela.com",
          areaServed: "Worldwide",
          availableLanguage: "English",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/codezela-technologies/",
        "https://www.facebook.com/CodezelaTechnologies",
        "https://www.instagram.com/codezela.t/",
        "https://www.tiktok.com/@codezela_t",
        "https://twitter.com/CodezelaT",
        "https://www.threads.net/@codezela.t",
        "https://www.youtube.com/@codezelatechnologies",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://codezela.com/#website",
      url: "https://codezela.com/",
      name: "Codezela Technologies",
      publisher: { "@id": "https://codezela.com/#organization" },
      inLanguage: "en-GB",
    },
    {
      "@type": "WebPage",
      "@id": "https://codezela.com/#webpage",
      url: "https://codezela.com/",
      name: "Codezela Technologies - No.1 Web Development And Marketing Agency",
      datePublished: "2024-02-01T00:00:00+00:00",
      dateModified: "2026-08-08T00:00:00+00:00",
      isPartOf: { "@id": "https://codezela.com/#website" },
      about: { "@id": "https://codezela.com/#organization" },
      primaryImageOfPage: { "@id": "https://codezela.com/#logo" },
      inLanguage: "en-GB",
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Stats />
        <Introduction />
        <Services />
        <WhySpecial />
        <Industries />
        <Technology />
        <Portfolio />
        <Clients />
        <Awards />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
