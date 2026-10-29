"use client";

import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section className={cn("py-8 md:py-12", className)} style={{ background: "linear-gradient(180deg,#101235,#1a1d3a)" }}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center mb-6">
            <p className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#24ffc9] uppercase tracking-wider mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl font-extrabold text-white mb-3">
              {title}
            </h2>
            <p className="text-lg text-[#cbd5e1]">{description}</p>
          </div>

          <div className="w-full md:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-0">
                {testimonials.map((testimonial, i) => (
                  <CarouselItem key={`mobile-${i}`} className="pl-0 pr-4 basis-[88%]">
                    <TestimonialCard
                      author={testimonial.author}
                      text={testimonial.text}
                      href={testimonial.href}
                      className="w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="relative hidden md:block w-full overflow-hidden marquee-mask">
            <div
              className="flex gap-6 animate-marquee"
              style={
                {
                  "--duration": "60s",
                  "--gap": "1.5rem",
                } as React.CSSProperties
              }
            >
              {[...Array(2)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${setIndex}-${i}`}
                    author={testimonial.author}
                    text={testimonial.text}
                    href={testimonial.href}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
