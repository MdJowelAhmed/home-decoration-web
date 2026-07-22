import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { SITE_CONFIG } from "@/lib/constants/site";
import { IMAGES } from "@/lib/constants/images";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about LuxeHaven's mission to bring premium home decor to modern living.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center">
        <Image
          src={IMAGES.brandStory}
          alt="LuxeHaven showroom"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative z-10 py-20">
          <h1 className="font-serif text-4xl font-medium text-white md:text-6xl">
            Our Story
          </h1>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Crafted with Purpose"
            description="Founded on the belief that every home deserves pieces of exceptional quality."
            align="left"
          />
          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p>
              {SITE_CONFIG.name} was born from a simple idea: that the objects we
              surround ourselves with should inspire, comfort, and endure. We partner
              with artisans and designers worldwide to curate a collection that
              balances timeless craftsmanship with contemporary design.
            </p>
            <p>
              Every piece in our collection is selected for its quality, sustainability,
              and ability to transform a space. From handwoven rugs to artisan lighting,
              we believe in investing in pieces that tell a story.
            </p>
            <p>
              Our commitment extends beyond products. We work exclusively with
              manufacturers who prioritize ethical labor practices and environmentally
              responsible sourcing. When you shop with {SITE_CONFIG.name}, you&apos;re
              supporting a community of makers who share our values.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
