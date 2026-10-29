import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IntercomMessenger } from "@/components/IntercomMessenger";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted (latin, variable weight) so builds never depend on fetching from Google Fonts.
const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght.woff2",
  weight: "700 800",
  variable: "--font-dm-sans",
  display: "swap",
});

const SOCIAL_IMAGE = `${SITE_URL}/assets/whiskr-og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "whiskr.ai - Chart faster. Care more.",
    template: "%s | whiskr.ai",
  },
  description:
    "Whiskr.ai converts veterinary consultations into accurate SOAP notes instantly. Save 2-3 hours daily on documentation. Built for vets. Try risk free today.",
  authors: [{ name: "Whiskr Inc" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "whiskr.ai - Chart faster. Care more.",
    description:
      "whiskr.ai converts veterinary consultations into accurate SOAP notes instantly. Save 2-3 hours daily on documentation. Built for vets. Try risk free today.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "whiskr.ai" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whiskrai",
    title: "whiskr.ai - Chart faster. Care more.",
    description:
      "whiskr.ai converts veterinary consultations into accurate SOAP notes instantly. Save 2-3 hours daily on documentation. Built for vets. Try risk free today.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "whiskr.ai" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });`}
        </Script>
        <Providers>{children}</Providers>
        <IntercomMessenger />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
