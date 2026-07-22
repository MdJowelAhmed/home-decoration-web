"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { rooms } from "@/data/categories";

export function ShopByRoom() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Inspiration"
            title="Shop by Room"
            description="Find the perfect pieces for every space in your home."
          />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {rooms.map((room) => (
            <StaggerItem key={room.slug}>
              <Link
                href={`/products?room=${room.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex items-end p-5">
                  <h3 className="font-serif text-xl font-medium text-white md:text-2xl">
                    {room.name}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
