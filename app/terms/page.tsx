import type { Metadata } from "next";
import TermsContent from "@/components/legal/TermsContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using Whiskr.ai, the AI-powered veterinary scribe and SOAP notes platform.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function Page() {
  return <TermsContent />;
}
