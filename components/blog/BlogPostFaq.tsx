"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { BlogFaqItem } from "@/lib/blog-faqs";

type BlogPostFaqProps = {
  faqs: BlogFaqItem[];
};

export function BlogPostFaq({ faqs }: BlogPostFaqProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-black/[0.08]" aria-labelledby="blog-faq-heading">
      <h2 id="blog-faq-heading" className="text-2xl md:text-3xl font-extrabold text-legal-heading mb-6">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${i}`}
            className="rounded-xl border border-black/[0.08] overflow-hidden bg-white px-1"
          >
            <AccordionTrigger className="px-4 py-4 hover:no-underline text-left [&>svg]:text-whiskr-green">
              <span className="font-semibold text-legal-heading text-[15px] md:text-base pr-3">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-[15px] text-[#475569] m-0 leading-relaxed">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
