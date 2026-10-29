export type BlogFaqItem = {
  question: string;
  answer: string;
};

const CHARTING_POST_FAQS: BlogFaqItem[] = [
  {
    question: "What is a SOAP note for a vet?",
    answer:
      "A SOAP note is the standard format for veterinary medical records. S = Subjective (history and owner report), O = Objective (exam findings, vitals, test results), A = Assessment (diagnosis and differentials), P = Plan (treatment, diagnostics, follow-up). Most PIMS and EHR systems expect notes in this structure.",
  },
  {
    question: "What are the 4 components of a SOAP note?",
    answer:
      "Subjective (chief complaint, history, signalment), Objective (physical exam, vitals, lab and diagnostic findings), Assessment (primary diagnosis, differentials, clinical reasoning), and Plan (medications, procedures, client instructions, recheck timing).",
  },
  {
    question: "What is a good example of a SOAP note?",
    answer:
      "A strong SOAP note is complete, specific, and timely. For a wellness visit, Subjective captures appetite and owner concerns; Objective documents vitals and exam findings; Assessment states the working diagnosis; Plan lists vaccines, diagnostics, and follow-up. The best notes are written during or immediately after the consult — not reconstructed from memory hours later.",
  },
  {
    question: "How do I do a SOAP note?",
    answer:
      "Capture findings as you go: history, then exam, then assessment, then plan. Many vets use PIMS templates for normal findings and expand only on abnormalities. A veterinary AI scribe like whiskr.ai can record the consult and generate a structured SOAP draft for you to review and edit in under a minute.",
  },
  {
    question: "How to write vet notes faster?",
    answer:
      "Record the consult instead of typing during the exam, use normal-finding templates for routine exams, document abnormalities efficiently, finish notes before the next patient, and use a vet-specific AI scribe to turn conversation into structured SOAP notes.",
  },
  {
    question: "What are common SOAP note mistakes?",
    answer:
      "Delayed documentation, missing objective findings, vague assessments without clear diagnosis or differentials, incomplete plans (doses, frequency, follow-up), and copy-paste errors with the wrong patient, date, or species.",
  },
  {
    question: "Can ChatGPT write SOAP notes?",
    answer:
      "ChatGPT can draft text from a prompt, but it is not built for live veterinary workflow: no exam recording, no breed-specific vitals, no PIMS sync, no speaker diarization, and no guarantee of vet terminology accuracy. A veterinary-trained AI scribe like whiskr.ai's Atlas AI is designed for SOAP structure, clinical language, and review-before-finalize workflows — with records never used for AI training.",
  },
  {
    question: "What are the 5 C's of documentation?",
    answer:
      "Commonly cited in medical documentation: Clear, Concise, Complete, Correct, and Chronological (wording varies by source). In practice, write so another vet could continue care, include relevant negatives, timestamp entries, and avoid ambiguous shorthand.",
  },
  {
    question: "When to use SOAP vs CHART?",
    answer:
      "SOAP is the default for most veterinary medical records. CHART (Complaint, History, Assessment, Rx/Treatment) is an alternative some clinicians prefer for simpler visits. Most PIMS and regulatory expectations align with SOAP; use whatever your practice standardizes on consistently.",
  },
];

const SOAP_GUIDE_FAQS: BlogFaqItem[] = [
  {
    question: "What does SOAP stand for in veterinary medicine?",
    answer:
      "SOAP stands for Subjective, Objective, Assessment, and Plan. Subjective is owner history and reported signs; Objective is exam findings and test results; Assessment is your diagnosis and differentials; Plan is treatment, diagnostics, and follow-up.",
  },
  {
    question: "What is a SOAP note for a vet?",
    answer:
      "A SOAP note is the standard format for veterinary medical records. It organizes each patient visit into four sections so records are consistent, complete, and easy for your team to follow across shifts and rechecks.",
  },
  {
    question: "What are the 4 components of a SOAP note?",
    answer:
      "Subjective (chief complaint, history, signalment), Objective (physical exam, vitals, lab and diagnostic findings), Assessment (primary diagnosis, differentials, clinical reasoning), and Plan (medications, procedures, client instructions, recheck timing).",
  },
  {
    question: "Is SOAP required for veterinary medical records?",
    answer:
      "Requirements vary by jurisdiction and practice policy, but SOAP is the de facto standard in most companion animal PIMS and EHR systems. Consistent SOAP formatting supports continuity of care, referrals, and medicolegal documentation regardless of whether it is explicitly mandated.",
  },
  {
    question: "What is a good example of a veterinary SOAP note?",
    answer:
      "A strong SOAP note is complete, specific, and timely. For a wellness visit, Subjective captures appetite and owner concerns; Objective documents vitals and exam findings; Assessment states the working diagnosis; Plan lists vaccines, diagnostics, and follow-up. The best notes are written during or immediately after the consult.",
  },
  {
    question: "How long should a vet SOAP note be?",
    answer:
      "Length depends on case complexity. A routine wellness note may be a few paragraphs; an emergency or multi-problem case may be longer. Focus on completeness over word count — every section should answer what a colleague needs to continue care.",
  },
  {
    question: "Can veterinary technicians write SOAP notes?",
    answer:
      "Technicians and nurses often contribute Subjective triage notes and Objective vitals under DVM supervision. Assessment and Plan are typically authored or verified by the licensed veterinarian. Scope varies by state, province, and hospital policy.",
  },
  {
    question: "What are common SOAP note mistakes?",
    answer:
      "Delayed documentation, mixing Subjective and Objective content, vague assessments without clear diagnosis or differentials, incomplete plans (doses, frequency, follow-up), and copy-paste errors with the wrong patient, date, or species.",
  },
  {
    question: "How to write vet SOAP notes faster?",
    answer:
      "Record the consult instead of typing during the exam, use normal-finding templates for routine visits, finish notes before the next patient, and use a vet-specific AI scribe to turn conversation into structured SOAP drafts you review and finalize.",
  },
  {
    question: "Can ChatGPT write veterinary SOAP notes?",
    answer:
      "ChatGPT can draft text from a prompt, but it is not built for live veterinary workflow: no exam recording, no breed-specific vitals, no PIMS sync, no speaker diarization, and no guarantee of vet terminology accuracy. A veterinary-trained AI scribe like whiskr.ai's Atlas AI is designed for SOAP structure and review-before-finalize workflows.",
  },
  {
    question: "When to use SOAP vs CHART?",
    answer:
      "SOAP is the default for most veterinary medical records. CHART (Complaint, History, Assessment, Rx/Treatment) is an alternative some clinicians prefer for simpler visits. Most PIMS and regulatory expectations align with SOAP; use whatever your practice standardizes on consistently.",
  },
  {
    question: "What is the difference between a SOAP note and a progress note?",
    answer:
      "A SOAP note documents a specific visit or encounter in S/O/A/P format. A progress note is a broader term for any update on a patient's status — it may follow SOAP structure or a shorter narrative format depending on your PIMS and the type of visit (e.g., recheck, hospitalization update).",
  },
];

const AI_SOAP_POST_FAQS: BlogFaqItem[] = [
  {
    question: "What are AI SOAP notes for veterinarians?",
    answer:
      "AI SOAP notes are structured Subjective–Objective–Assessment–Plan records automatically generated from a veterinary consult. An ambient AI scribe records the exam, transcribes it, and drafts a SOAP note for the DVM to review and finalize — typically in 1–3 minutes instead of 10–18 minutes of manual typing.",
  },
  {
    question: "Are AI-generated vet SOAP notes accurate?",
    answer:
      "Modern veterinary-trained models achieve high accuracy on clinical terminology — Atlas AI reaches 98% on veterinary terms. Accuracy improves when you speak findings clearly during the exam. Final sign-off by the licensed veterinarian ensures 100% clinical accountability.",
  },
  {
    question: "Can AI SOAP notes replace the veterinarian?",
    answer:
      "No. AI SOAP tools are documentation assistants, not diagnostic systems. They draft records from your conversation; you review, edit, and approve every note. Clinical responsibility for Assessment and Plan always remains with the DVM.",
  },
  {
    question: "How are AI SOAP notes different from dictation?",
    answer:
      "Dictation requires you to narrate the full note or edit a raw transcript. AI SOAP tools listen passively during the consult, automatically structure content into S/O/A/P sections, and produce a draft ready for quick review — without dictation syntax or manual formatting.",
  },
  {
    question: "AI SOAP notes vs ChatGPT for vets?",
    answer:
      "ChatGPT drafts text from prompts but lacks live exam capture, breed-aware vitals, speaker diarization, and PIMS sync. A veterinary AI scribe like whiskr.ai is built for SOAP structure, vet terminology, and review-before-finalize workflows during real consults.",
  },
  {
    question: "How long does it take to review an AI SOAP note?",
    answer:
      "Most veterinarians spend 60–90 seconds reviewing and editing a draft per section. Even at 2–3 minutes total per patient, net savings remain 8+ minutes compared to writing from scratch.",
  },
  {
    question: "Which PIMS work with AI SOAP tools?",
    answer:
      "whiskr.ai offers one-click sync with EzyVet, NectarVet, and IDEXX Neo, with additional integrations in development. Without direct integration, completed notes can be copied into any PIMS.",
  },
  {
    question: "Do AI vet scribes work for emergency visits?",
    answer:
      "Yes. AI SOAP notes are especially valuable under time pressure — the scribe captures findings as you speak during triage and exam, producing a structured draft for review before the next case.",
  },
  {
    question: "Is patient data used to train the AI?",
    answer:
      "With whiskr.ai, records are never used for AI training. Always confirm data handling policies with any vendor — opt-out of training should be the default for clinical tools handling medical records.",
  },
  {
    question: "What are the pros and cons of AI SOAP notes?",
    answer:
      "Pros: saves 8+ minutes per visit, consistent SOAP structure, more complete records, less after-hours charting. Cons: learning curve (1–2 weeks), mandatory review, PIMS integration varies, not a diagnostic tool — Assessment and Plan require DVM judgment.",
  },
  {
    question: "Can any veterinarian use AI SOAP notes?",
    answer:
      "Yes — general practice, emergency, specialty, relief, and mobile vets can all use AI SOAP tools. The licensed veterinarian must review and finalize every record regardless of setting.",
  },
  {
    question: "How do I get started with AI SOAP notes?",
    answer:
      "Choose a veterinary-specific AI scribe, run a 14-day trial on your real caseload, review every draft before finalizing, and compare time saved and note completeness to your current workflow. whiskr.ai offers a free trial with no credit card required.",
  },
];

const BLOG_FAQS: Record<string, BlogFaqItem[]> = {
  "how-much-time-vets-waste-on-charting": CHARTING_POST_FAQS,
  "veterinary-soap-notes-guide": SOAP_GUIDE_FAQS,
  "veterinary-ai-soap-notes": AI_SOAP_POST_FAQS,
};

export function getBlogFaqs(slug: string): BlogFaqItem[] {
  return BLOG_FAQS[slug] ?? [];
}

export function buildFaqPageJsonLd(faqs: BlogFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
