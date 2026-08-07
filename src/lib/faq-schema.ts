import type { FaqItem } from "@/data/faqs";

export function buildFaqPageSchema(url: string, faqs: readonly FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url: `${url}#faq`,
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
