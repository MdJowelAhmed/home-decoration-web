"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { banners } from "@/data/content";

export function SeasonalBanner() {
  const banner = banners[0];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <div className="max-w-md text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                  {banner.subtitle}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
                  {banner.title}
                </h2>
                <motion.div whileHover={{ x: 4 }} className="mt-6 inline-block">
                  <Link
                    href={banner.link}
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
                  >
                    {banner.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
