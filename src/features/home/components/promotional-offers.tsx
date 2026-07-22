"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { banners } from "@/data/content";

export function PromotionalOffers() {
  const promo = banners[1];

  return (
    <section className="py-8">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-charcoal">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <p className="text-sm uppercase tracking-[0.2em] text-accent">
                  Limited Time
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium text-cream md:text-4xl">
                  {promo.title}
                </h2>
                <p className="mt-3 text-cream/70">{promo.subtitle}</p>
                <Button variant="accent" size="lg" className="mt-6 w-fit" asChild>
                  <Link href={promo.link}>{promo.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
