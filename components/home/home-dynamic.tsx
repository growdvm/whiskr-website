import dynamic from "next/dynamic";

const sectionFallback = (minHeight: string) =>
  function SectionFallback() {
    return <div aria-hidden className="w-full" style={{ minHeight }} />;
  };

export const HeroLiveDemo = dynamic(() => import("@/components/ui/HeroLiveDemo"), {
  ssr: false,
  loading: sectionFallback("320px"),
});

export const HowItWorksTabbed = dynamic(() => import("@/components/home/HowItWorksTabbed"), {
  loading: sectionFallback("480px"),
});

export const TestimonialsSection = dynamic(
  () =>
    import("@/components/ui/testimonials-with-marquee").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: sectionFallback("360px") },
);

export const ROICalculator = dynamic(() => import("@/components/ui/ROICalculator"), {
  loading: sectionFallback("400px"),
});

export const ComparisonTable = dynamic(
  () =>
    import("@/components/ui/ComparisonTable").then((m) => ({
      default: m.ComparisonTable,
    })),
  { loading: sectionFallback("400px") },
);

export const PricingSection = dynamic(() => import("@/components/ui/pricing-section-1"), {
  loading: sectionFallback("520px"),
});

export const ExitIntentPopover = dynamic(
  () =>
    import("@/components/ui/ExitIntentPopover").then((m) => ({
      default: m.ExitIntentPopover,
    })),
  { ssr: false },
);

export const ScatteredEyes = dynamic(
  () => import("@/components/ui/ScatteredEyes").then((m) => ({ default: m.ScatteredEyes })),
  { ssr: false },
);

export const GlowingEffect = dynamic(
  () => import("@/components/ui/glowing-effect").then((m) => ({ default: m.GlowingEffect })),
  { ssr: false },
);
