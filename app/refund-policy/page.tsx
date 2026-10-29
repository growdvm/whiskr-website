import type { Metadata } from "next";
import RefundPolicyContent from "@/components/legal/RefundPolicyContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Learn about Whiskr.ai's refund policy and how to request a refund for your veterinary AI scribe subscription.",
  alternates: { canonical: `${SITE_URL}/refund-policy` },
};

export default function Page() {
  return <RefundPolicyContent />;
}
