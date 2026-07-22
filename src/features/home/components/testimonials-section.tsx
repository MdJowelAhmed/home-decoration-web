"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { testimonials } from "@/data/content";

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Reviews"
            title="What Our Customers Say"
          />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <blockquote className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex gap-1" aria-label={`${testimonial.rating} stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
