"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { roomInspirations } from "@/data/content";

export function RoomInspirations() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Lookbook"
            title="Room Inspirations"
            description="Get inspired by beautifully curated room settings."
          />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {roomInspirations.map((inspiration) => (
            <StaggerItem key={inspiration.id}>
              <Link
                href={`/products?room=${inspiration.room}`}
                className="group block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={inspiration.image}
                    alt={inspiration.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-medium text-white">
                      {inspiration.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-accent transition-colors">
                      Shop the Look
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
