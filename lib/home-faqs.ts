export type HomeFaqItem = { q: string; a: string };

/** Homepage FAQ — shared between the visible accordion and FAQPage JSON-LD. */
export const HOME_FAQS: HomeFaqItem[] = [
  {
    q: "Can I edit records after they're generated?",
    a: "Yes. Every record goes through a full-featured editor before finalization. You can edit any section, add notes, regenerate specific sections with additional context, or modify the content to match your clinical judgment.",
  },
  {
    q: '"I don\'t trust AI to write my medical records."',
    a: "Atlas generates a draft — you always review and approve before finalizing. Think of it as a highly competent scribe, not an autopilot. You maintain full clinical oversight and can edit any section. Most vets find they only need minor tweaks after the first few consults as Atlas learns their style.",
  },
  {
    q: "Is Atlas AI safe for clinical use? How accurate is it?",
    a: "Atlas achieves 98% accuracy on veterinary terminology and is trained specifically on veterinary medical language. However, whiskr.ai is a documentation assistant, not a diagnostic tool. You retain full clinical responsibility for all medical decisions. Atlas provides suggestions for your review. It never makes autonomous clinical decisions.",
  },
  {
    q: "Which EHR/PIMS systems does whiskr.ai integrate with?",
    a: "We currently offer one-click integration with EzyVet, NectarVet and IDEXX Neo. Cornerstone, AVImark, eVetPractice, and Shepherd integrations are in development. Enterprise customers can request custom integrations. Even without direct integration, you can easily copy completed notes into any EHR system.",
  },
  {
    q: "What languages does Atlas support?",
    a: "Atlas supports English, Spanish, Korean, Cantonese, Mandarin, Hindi, Portuguese, and more with the ability to handle bilingual conversations seamlessly. You can switch languages mid-sentence and Atlas will understand. Notes can be generated in your preferred language.",
  },
  {
    q: "Will it replace my clinical judgment?",
    a: "Never. whiskr.ai is designed to support your thinking, not replace it. Atlas suggests differentials, recommends diagnostics, and flags gaps, but you always make the final call. Think of it as a second set of eyes, not a replacement for your expertise.",
  },
];

export function buildHomeFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
