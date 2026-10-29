import type { Metadata } from "next";
import PrivacyContent from "@/components/legal/PrivacyContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Whiskr.ai's privacy policy to understand how we collect, use and protect your data as a veterinary AI scribe platform.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function Page() {
  return <PrivacyContent />;
}
