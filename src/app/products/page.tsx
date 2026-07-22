import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/features/products/components/product-listing";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our complete collection of premium home decor, furniture, lighting, and accessories.",
  alternates: { canonical: "/products" },
};

function ProductsLoading() {
  return (
    <Container className="py-12">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
        ))}
      </div>
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductListing />
    </Suspense>
  );
}
