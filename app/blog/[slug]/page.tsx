import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { BlogPostFaq } from "@/components/blog/BlogPostFaq";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { buildFaqPageJsonLd, getBlogFaqs } from "@/lib/blog-faqs";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { title, description, ogImage } = post.frontmatter;
  const imageUrl = ogImage ? `${SITE_URL}${ogImage}` : undefined;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const faqs = getBlogFaqs(slug);
  const faqJsonLd = faqs.length > 0 ? buildFaqPageJsonLd(faqs) : null;

  return (
    <LegalPageLayout
      title={post.frontmatter.title}
      lastUpdated={new Date(post.frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      coverImage={post.frontmatter.ogImage}
      coverImageAlt={post.frontmatter.title}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
          h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
          h4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
          hr: () => null,
          a: ({ href = "", children, ...props }) => {
            const isInternal = href.startsWith("/") || href.startsWith("#");
            if (isInternal) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
      <BlogPostFaq faqs={faqs} />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </LegalPageLayout>
  );
}
