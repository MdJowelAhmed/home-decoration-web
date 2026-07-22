"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchProductsQuery } from "@/lib/api/products-api";
import { formatPrice } from "@/lib/utils/format";

interface SearchPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchPanel({ open, onOpenChange }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const { data: results = [] } = useSearchProductsQuery(query, {
    skip: query.length < 2,
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-50 bg-background shadow-xl"
          >
            <div className="mx-auto max-w-3xl px-4 py-6">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for furniture, lighting, decor..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 text-lg shadow-none focus-visible:ring-0"
                  autoFocus
                  aria-label="Search products"
                />
                <button
                  onClick={() => onOpenChange(false)}
                  className="rounded-full p-2 hover:bg-secondary"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {query.length >= 2 && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => onOpenChange(false)}
                            className="flex items-center gap-4 py-3 hover:bg-secondary/50 rounded-lg px-2 transition-colors"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                  )}
                  {results.length > 0 && (
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={() => onOpenChange(false)}
                      className="mt-4 block text-center text-sm font-medium text-accent hover:underline"
                    >
                      View all results →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
