"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { collections } from "@/data/content";

export function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Curated"
            title="Featured Collections"
          />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <StaggerItem key={collection.id}>
              <Link
                href={`/products?collection=${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-xl font-medium group-hover:text-accent transition-colors">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {collection.description} · {collection.productCount} items
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
