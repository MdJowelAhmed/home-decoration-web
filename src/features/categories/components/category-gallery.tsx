"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CategoryGalleryProps {
  images: string[];
  categoryName: string;
}

export function CategoryGallery({ images, categoryName }: CategoryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length <= 1) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Explore {categoryName} Styles
      </p>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300",
              activeIndex === index
                ? "border-accent scale-105 shadow-md"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
            aria-label={`View ${categoryName} style ${index + 1}`}
          >
            <Image
              src={src}
              alt={`${categoryName} style ${index + 1}`}
              fill
              className="object-cover"
              sizes="112px"
            />
          </button>
        ))}
      </div>

      {/* Large preview */}
      <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${categoryName} inspiration ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
