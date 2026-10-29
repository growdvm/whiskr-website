"use client";

import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";
  const initials = author.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-white/10 p-7 backdrop-blur-sm lift-on-hover",
        "w-[320px] shrink-0",
        className
      )}
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-3">
        {author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.avatar}
            alt={author.name}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full bg-white/10 object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-sm font-bold text-[#101235]"
            style={{ background: "linear-gradient(135deg,#1ce881,#24ffc9)" }}
            aria-hidden
          >
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-white m-0 text-[15px] flex items-center gap-1.5">
            <span className="truncate">{author.name}</span>
            <BadgeCheck className="w-4 h-4 text-[#1ce881] shrink-0" aria-label="Verified vet" />
          </p>
          <p className="text-[#94a3b8] m-0 text-sm truncate">{author.handle}</p>
        </div>
      </div>

      <p className="text-[#e2e8f0] italic text-base leading-[1.7]">"{text}"</p>
    </Card>
  );
}
