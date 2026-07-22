"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPrice, calculateDiscount } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cart-slice";
import { toggleWishlist } from "@/lib/store/slices/wishlist-slice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i.productId === product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: `${product.id}-default`,
        productId: product.id,
        quantity: 1,
        product,
      })
    );
    toast.success("Added to cart");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id: `wish-${product.id}`,
        productId: product.id,
        product,
        addedAt: new Date().toISOString(),
      })
    );
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.article
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative", className)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary",
            "transition-shadow duration-500",
            isHovered && "shadow-2xl shadow-black/20"
          )}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>

          {/* Slide-up overlay on hover */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex gap-2"
            >
              <Button
                size="sm"
                variant="accent"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={handleToggleWishlist}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "h-3.5 w-3.5",
                    isWishlisted && "fill-red-400 text-red-400"
                  )}
                />
              </Button>
            </motion.div>
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
            {product.isNew && <Badge variant="accent">New</Badge>}
            {discount > 0 && <Badge variant="default">-{discount}%</Badge>}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </p>
          <h3
            className={cn(
              "font-medium leading-snug transition-colors duration-300",
              isHovered ? "text-accent" : "text-foreground"
            )}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1"
              aria-label={`Rating: ${product.rating} out of 5`}
            >
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-sm">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
