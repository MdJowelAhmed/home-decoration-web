"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CategoryCard } from "@/components/shared/category-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle="Browse"
            title="Shop by Category"
            description="Explore our curated collections designed for every room in your home."
          />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((category) => (
            <StaggerItem key={category.id}>
              <CategoryCard
                name={category.name}
                slug={category.slug}
                image={category.image}
                productCount={category.productCount}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
