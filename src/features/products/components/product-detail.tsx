"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  ZoomIn,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/fade-in";
import { useGetProductQuery } from "@/lib/api/products-api";
import { useGetProductReviewsQuery } from "@/lib/api/reviews-api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cart-slice";
import { toggleWishlist } from "@/lib/store/slices/wishlist-slice";
import { addRecentlyViewed } from "@/lib/store/slices/recently-viewed-slice";
import { getSimilarProducts } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { toast } from "sonner";
import type { ProductVariant } from "@/types";

interface ProductDetailProps {
  slug: string;
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const { data: product, isLoading } = useGetProductQuery(slug);
  const { data: reviews = [] } = useGetProductReviewsQuery(
    product?.id ?? "",
    { skip: !product }
  );
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const recentlyViewed = useAppSelector((state) => state.recentlyViewed.products);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product));
      if (product.variants.length > 0) {
        const defaultVariant = product.variants[0];
        setSelectedVariant(defaultVariant);
        setSelectedColor(defaultVariant.color ?? null);
        setSelectedSize(defaultVariant.size ?? null);
      }
    }
  }, [product, dispatch]);

  const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
  const comparePrice = selectedVariant?.compareAtPrice ?? product?.compareAtPrice;
  const currentStock = selectedVariant?.stock ?? (product?.inStock ? 99 : 0);
  const displayImages = selectedVariant?.images.length
    ? selectedVariant.images
    : product?.images ?? [];
  const discount = calculateDiscount(currentPrice, comparePrice);
  const isWishlisted = product
    ? wishlistItems.some((i) => i.productId === product.id)
    : false;

  const similarProducts = useMemo(
    () => (product ? getSimilarProducts(product) : []),
    [product]
  );

  const handleVariantChange = (color?: string, size?: string) => {
    if (!product) return;
    const variant = product.variants.find(
      (v) =>
        (!color || v.color === color) && (!size || v.size === size)
    );
    if (variant) {
      setSelectedVariant(variant);
      setSelectedImage(0);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: `${product.id}-${selectedVariant?.id ?? "default"}`,
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
        product,
        variant: selectedVariant ?? undefined,
      })
    );
    toast.success("Added to cart");
  };

  if (isLoading || !product) {
    return (
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          image: product.images,
          sku: selectedVariant?.sku ?? product.sku,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            price: currentPrice,
            priceCurrency: "USD",
            availability: currentStock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `${SITE_CONFIG.url}/products/${product.slug}`,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }}
      />

      <Container className="py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.categorySlug.replace("-", " "), href: `/categories/${product.categorySlug}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square overflow-hidden rounded-2xl bg-secondary cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={displayImages[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" />
              </div>
            </motion.div>
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                      selectedImage === index
                        ? "border-accent"
                        : "border-transparent"
                    )}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-2">
              {product.isNew && <Badge variant="accent">New</Badge>}
              {discount > 0 && <Badge>-{discount}% Off</Badge>}
            </div>

            <p className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-medium md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-medium">
                {formatPrice(currentPrice)}
              </span>
              {comparePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium">
                  Color: {selectedColor}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        handleVariantChange(color.name, selectedSize ?? undefined);
                      }}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-all",
                        selectedColor === color.name
                          ? "border-charcoal scale-110"
                          : "border-border"
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedSize(size);
                        handleVariantChange(selectedColor ?? undefined, size);
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="flex-1 min-w-[200px]"
                onClick={handleAddToCart}
                disabled={currentStock === 0}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button size="lg" variant="accent" className="flex-1 min-w-[200px]" asChild>
                <Link href="/checkout">Buy Now</Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => {
                  dispatch(
                    toggleWishlist({
                      id: `wish-${product.id}`,
                      productId: product.id,
                      product,
                      addedAt: new Date().toISOString(),
                    })
                  );
                  toast.success(
                    isWishlisted ? "Removed from wishlist" : "Added to wishlist"
                  );
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-destructive text-destructive"
                  )}
                />
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-accent shrink-0" />
                <span>Free shipping over $150</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-accent shrink-0" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-accent shrink-0" />
                <span>2-year warranty</span>
              </div>
            </div>

            <Separator className="my-8" />

            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{product.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">{key}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>{product.careInstructions}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p>{product.shippingInfo}</p>
                  <p className="mt-2">{product.returnPolicy}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-20">
            <SectionHeader title="Customer Reviews" align="left" className="mb-8" />
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <h4 className="mt-2 font-medium">{review.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {review.userName} · {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similarProducts.length > 0 && (
          <section className="mt-20">
            <SectionHeader title="You May Also Like" align="left" className="mb-8" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {recentlyViewed.filter((p) => p.id !== product.id).length > 0 && (
          <section className="mt-20">
            <SectionHeader title="Recently Viewed" align="left" className="mb-8" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
