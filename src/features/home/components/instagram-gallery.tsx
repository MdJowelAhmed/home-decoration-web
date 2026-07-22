"use client";

import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { galleryImages } from "@/data/content";

export function InstagramGallery() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="@luxehaven"
            title="Follow Our Journey"
            description="Get inspired by real homes styled with LuxeHaven pieces."
          />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {galleryImages.map((image, index) => (
            <StaggerItem key={index}>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`LuxeHaven gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
