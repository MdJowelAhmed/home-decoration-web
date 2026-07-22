"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { styles } from "@/data/categories";

export function ShopByStyle() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Aesthetic"
            title="Shop by Style"
            description="Define your space with our curated style collections."
          />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {styles.map((style) => (
            <StaggerItem key={style.slug}>
              <Link
                href={`/products?style=${style.slug}`}
                className="group block text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="150px"
                  />
                </div>
                <p className="mt-3 text-sm font-medium group-hover:text-accent transition-colors">
                  {style.name}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
