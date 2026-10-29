import type { Metadata } from "next";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import IndexClient from "@/components/home/IndexClient";
import { SITE_URL } from "@/lib/site";
import { buildHomeFaqPageJsonLd } from "@/lib/home-faqs";

export const metadata: Metadata = {
  title: "whiskr.ai — AI Vet Scribe for SOAP Notes",
  description:
    "whiskr.ai converts veterinary consultations into accurate SOAP notes instantly. Save 2-3 hours daily on documentation. Built for vets. Try risk free today.",
  alternates: { canonical: SITE_URL },
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "whiskr.ai",
  applicationCategory: "MedicalApplication",
  operatingSystem: "iOS, Android, Web",
  description:
    "AI veterinary scribe that turns consultations into structured SOAP notes with clinical suggestions, 17+ language support, and one-click PIMS sync.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "19.99",
    priceCurrency: "USD",
    description: "Launch pricing with a 14-day free trial",
  },
};

const faqJsonLd = buildHomeFaqPageJsonLd();

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <IndexClient heroHeadline={<HeroHeadline />} />
    </>
  );
}
