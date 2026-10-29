import type { Metadata } from "next";
import MoneyBackContent from "@/components/legal/MoneyBackContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Money-Back Guarantee",
  description:
    "Whiskr.ai's 30-day money-back guarantee. If you're not satisfied within 30 days, we'll issue a full refund — no questions asked.",
  alternates: { canonical: `${SITE_URL}/money-back-guarantee` },
};

export default function Page() {
  return <MoneyBackContent />;
}
