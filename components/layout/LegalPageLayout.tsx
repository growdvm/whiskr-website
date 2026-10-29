import { Footer } from "./Footer";
import { WhiskrLogo } from "@/components/ui/WhiskrLogo";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  coverImage?: string;
  coverImageAlt?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  coverImage,
  coverImageAlt,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-landing-bg flex flex-col">
      {/* Header - matches homepage */}
      <header className="sticky top-0 z-50 bg-landing-bg/95 backdrop-blur-[20px] border-b border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <WhiskrLogo />
          
          <div className="flex items-center gap-4">
            <a 
              href="https://app.whiskr.ai/login"
              className="text-[15px] font-medium text-landing-text hover:text-whiskr-green transition-colors hidden sm:block"
            >
              Log in
            </a>
            <a 
              href={TRIAL_CTA_URL}
              className="px-7 py-3 rounded-full border-none cursor-pointer text-whiskr-dark font-semibold text-sm transition-all hover:-translate-y-0.5 bg-gradient-whiskr shadow-[0_4px_15px_rgba(28,232,129,0.3)] no-underline"
            >
              {TRIAL_CTA_LABEL}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[768px] mx-auto px-6">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-legal-heading mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-auth-text-muted text-base">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {coverImage && (
            <div className="mb-10">
              <img
                src={coverImage}
                alt={coverImageAlt ?? title}
                width={1200}
                height={630}
                className="w-full rounded-2xl border border-black/[0.06] shadow-sm aspect-[1.91/1] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Content */}
          <div className="legal-content">
            {children}
          </div>
        </div>
      </main>

      {/* Footer - same as homepage */}
      <Footer />
    </div>
  );
}