import type { Metadata } from "next";
import { HeroSection } from "@/features/home/components/hero-section";
import { SeasonalBanner } from "@/features/home/components/seasonal-banner";
import { FeaturedCategories } from "@/features/home/components/featured-categories";
import { ProductShowcase } from "@/features/home/components/product-showcase";
import { ShopByRoom } from "@/features/home/components/shop-by-room";
import { ShopByStyle } from "@/features/home/components/shop-by-style";
import { RoomInspirations } from "@/features/home/components/room-inspirations";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { PromotionalOffers } from "@/features/home/components/promotional-offers";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { BrandStory } from "@/features/home/components/brand-story";
import { InstagramGallery } from "@/features/home/components/instagram-gallery";
import { FaqSection } from "@/features/home/components/faq-section";
import { NewsletterSection } from "@/features/home/components/newsletter-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Premium Home Decor & Furniture",
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
          description: SITE_CONFIG.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_CONFIG.url}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <HeroSection />
      <FeaturedCategories />
      <ProductShowcase
        title="Best Sellers"
        subtitle="Popular"
        description="Our most loved pieces, chosen by customers like you."
        type="best-sellers"
        viewAllHref="/products?sort=rating"
      />
      <SeasonalBanner />
      <ProductShowcase
        title="New Arrivals"
        subtitle="Just In"
        description="Fresh finds to inspire your next room refresh."
        type="new-arrivals"
        viewAllHref="/products?sort=newest"
      />
      <ProductShowcase
        title="Trending Now"
        subtitle="Hot"
        description="What's capturing attention in home decor right now."
        type="trending"
        viewAllHref="/products"
      />
      <ShopByRoom />
      <RoomInspirations />
      <ShopByStyle />
      <FeaturedCollections />
      <PromotionalOffers />
      <TestimonialsSection />
      <BrandStory />
      <InstagramGallery />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
