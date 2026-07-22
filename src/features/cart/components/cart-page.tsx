"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  removeFromCart,
  updateQuantity,
  setCouponCode,
} from "@/lib/store/slices/cart-slice";
import { formatPrice } from "@/lib/utils/format";
import { toast } from "sonner";

export function CartPage() {
  const dispatch = useAppDispatch();
  const { items, couponCode } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.variant?.price ?? item.product.price) * item.quantity,
    0
  );
  const discount = couponCode === "LUXE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    localStorage.setItem("luxehaven-cart", JSON.stringify(items));
  }, [items]);

  const applyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = (form.get("coupon") as string).toUpperCase();
    if (code === "LUXE10") {
      dispatch(setCouponCode(code));
      toast.success("Coupon applied! 10% off");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Cart" }]} className="mb-8 justify-center" />
        <h1 className="font-serif text-3xl font-medium">Your Cart is Empty</h1>
        <p className="mt-3 text-muted-foreground">
          Discover our curated collection of premium home decor.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Cart" }]} className="mb-8" />
      <h1 className="font-serif text-3xl font-medium md:text-4xl">
        Shopping Cart ({items.length})
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <Link
                href={`/products/${item.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-medium hover:text-accent transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground">
                      {[item.variant.color, item.variant.size]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {formatPrice(
                        (item.variant?.price ?? item.product.price) * item.quantity
                      )}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-medium">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount (LUXE10)</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <form onSubmit={applyCoupon} className="mt-6 flex gap-2">
            <Input
              name="coupon"
              placeholder="Coupon code"
              defaultValue={couponCode ?? ""}
              aria-label="Coupon code"
            />
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </form>

          <Button size="lg" className="mt-6 w-full" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
