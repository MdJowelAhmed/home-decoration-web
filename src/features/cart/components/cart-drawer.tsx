"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setCartOpen,
  removeFromCart,
  updateQuantity,
} from "@/lib/store/slices/cart-slice";
import { formatPrice } from "@/lib/utils/format";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.variant?.price ?? item.product.price) * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("luxehaven-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => dispatch(setCartOpen(false))}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <h2 className="font-serif text-lg font-medium">
                Cart ({items.length})
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(setCartOpen(false))}
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={() => dispatch(setCartOpen(false))}
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={() => dispatch(setCartOpen(false))}
                            className="font-medium text-sm hover:text-accent transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatPrice(item.variant?.price ?? item.product.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  })
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-secondary"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-secondary"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="self-start p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border p-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Button className="w-full" size="lg" asChild>
                      <Link
                        href="/checkout"
                        onClick={() => dispatch(setCartOpen(false))}
                      >
                        Checkout
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => dispatch(setCartOpen(false))}
                      asChild
                    >
                      <Link href="/cart">View Cart</Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
