"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks/redux";

export function WishlistPage() {
  const items = useAppSelector((state) => state.wishlist.items);

  useEffect(() => {
    localStorage.setItem("luxehaven-wishlist", JSON.stringify(items));
  }, [items]);

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Wishlist" }]} className="mb-8 justify-center" />
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-serif text-3xl font-medium">Your Wishlist is Empty</h1>
        <p className="mt-3 text-muted-foreground">
          Save items you love for later.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/products">
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Wishlist" }]} className="mb-8" />
      <h1 className="font-serif text-3xl font-medium md:text-4xl">
        My Wishlist ({items.length})
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </Container>
  );
}
