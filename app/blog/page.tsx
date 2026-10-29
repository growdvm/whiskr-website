import type { Metadata } from "next";
import Link from "next/link";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";
import { Footer } from "@/components/layout/Footer";
import { WhiskrLogo } from "@/components/ui/WhiskrLogo";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — whiskr.ai",
  description:
    "Ideas, guides, and product updates from the whiskr.ai team on AI-assisted veterinary documentation.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-landing-bg flex flex-col">
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

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-legal-heading mb-4 tracking-tight">
              Blog
            </h1>
            <p className="text-auth-text-muted text-base">
              Guides, product updates, and field notes from the whiskr.ai team.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-auth-text-muted">No posts yet — check back soon.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col h-full rounded-xl border border-black/[0.08] bg-white overflow-hidden transition-shadow hover:shadow-md hover:border-black/[0.12]"
                  >
                    {p.frontmatter.ogImage && (
                      <img
                        src={p.frontmatter.ogImage}
                        alt=""
                        className="w-full aspect-[1.91/1] object-cover border-b border-black/[0.06]"
                      />
                    )}
                    <div className="flex flex-col flex-1 p-4">
                      <h2 className="text-lg font-bold text-legal-heading group-hover:text-whiskr-green transition-colors mb-2 line-clamp-3">
                        {p.frontmatter.title}
                      </h2>
                      <p className="text-auth-text-muted text-xs mb-2">
                        {new Date(p.frontmatter.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {p.frontmatter.author ? ` · ${p.frontmatter.author}` : ""}
                      </p>
                      <p className="text-sm text-[#475569] line-clamp-3 mt-auto">
                        {p.frontmatter.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
