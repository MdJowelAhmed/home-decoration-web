"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/hooks/redux";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/auth";
import { formatPrice } from "@/lib/utils/format";
import { SHIPPING_RATES } from "@/lib/constants/site";
import { toast } from "sonner";

const steps = ["Shipping", "Payment", "Review"];

export function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, couponCode } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "card",
    },
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.variant?.price ?? item.product.price) * item.quantity,
    0
  );
  const discount = couponCode === "LUXE10" ? subtotal * 0.1 : 0;
  const shippingMethod = watch("shippingMethod");
  const shippingRate = SHIPPING_RATES.find((r) => r.id === shippingMethod);
  const shipping = subtotal >= 150 ? 0 : (shippingRate?.price ?? 9.99);
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const nextStep = async () => {
    const fields: (keyof CheckoutFormData)[] =
      currentStep === 0
        ? ["email", "firstName", "lastName", "street", "city", "state", "zipCode", "phone", "shippingMethod"]
        : currentStep === 1
          ? ["paymentMethod"]
          : [];

    const valid = fields.length === 0 || (await trigger(fields));
    if (valid) setCurrentStep((s) => Math.min(s + 1, 2));
  };

  const onSubmit = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    toast.success("Order placed successfully!");
    router.push("/account/orders");
  };

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Button className="mt-6" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Checkout" }]} className="mb-8" />
      <h1 className="font-serif text-3xl font-medium">Checkout</h1>

      <div className="mt-6 flex gap-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                index < currentStep
                  ? "bg-accent text-charcoal"
                  : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span className="hidden text-sm sm:inline">{step}</span>
            {index < steps.length - 1 && (
              <div className="hidden h-px w-8 bg-border sm:block" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-medium">Shipping Information</h2>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} />
                </div>
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" {...register("street")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city")} />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state")} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" {...register("zipCode")} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...register("phone")} />
                </div>
              </div>
              <div>
                <Label>Shipping Method</Label>
                <div className="mt-2 space-y-2">
                  {SHIPPING_RATES.map((rate) => (
                    <label
                      key={rate.id}
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value={rate.id}
                          {...register("shippingMethod")}
                          className="accent-accent"
                        />
                        <div>
                          <p className="text-sm font-medium">{rate.name}</p>
                          <p className="text-xs text-muted-foreground">{rate.days}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        {subtotal >= 150 && rate.id === "standard"
                          ? "Free"
                          : formatPrice(rate.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-medium">Payment Method</h2>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4">
                <input type="radio" value="card" {...register("paymentMethod")} className="accent-accent" />
                <span className="font-medium">Credit / Debit Card</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4">
                <input type="radio" value="paypal" {...register("paymentMethod")} className="accent-accent" />
                <span className="font-medium">PayPal</span>
              </label>
              <p className="text-xs text-muted-foreground">
                Your payment information is encrypted and secure.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-medium">Review Your Order</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please review your order details before placing.
              </p>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      {formatPrice(
                        (item.variant?.price ?? item.product.price) * item.quantity
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {currentStep < 2 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="accent" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Place Order — ${formatPrice(total)}`}
              </Button>
            )}
          </div>
        </div>

        <div className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-medium">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
