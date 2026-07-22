"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { IMAGES } from "@/lib/constants/images";

export function BrandStory() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.brandStory}
                alt="Artisan crafting furniture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Our Story
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl lg:text-5xl">
              Crafted with Purpose, Designed for Life
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded on the belief that every home deserves pieces of exceptional
              quality, LuxeHaven partners with artisans and designers worldwide to
              bring you furniture and decor that tell a story.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From sustainably sourced materials to ethical manufacturing practices,
              we are committed to creating beautiful spaces while respecting our planet.
            </p>
            <Button variant="outline" size="lg" className="mt-8" asChild>
              <Link href="/about">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
