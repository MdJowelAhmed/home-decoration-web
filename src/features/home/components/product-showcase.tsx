"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCard } from "@/components/shared/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import {
  useGetBestSellersQuery,
  useGetNewArrivalsQuery,
  useGetTrendingProductsQuery,
  useGetFeaturedProductsQuery,
} from "@/lib/api/products-api";
import { Skeleton } from "@/components/ui/skeleton";

type ShowcaseType = "best-sellers" | "new-arrivals" | "trending" | "featured";

const queryHooks = {
  "best-sellers": useGetBestSellersQuery,
  "new-arrivals": useGetNewArrivalsQuery,
  trending: useGetTrendingProductsQuery,
  featured: useGetFeaturedProductsQuery,
} as const;

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  description?: string;
  type: ShowcaseType;
  viewAllHref: string;
}

export function ProductShowcase({
  title,
  subtitle,
  description,
  type,
  viewAllHref,
}: ProductShowcaseProps) {
  const { data: products, isLoading } = queryHooks[type]();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            subtitle={subtitle}
            title={title}
            description={description}
          />
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {products?.map((product, index) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} priority={index < 2} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn className="mt-10 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
