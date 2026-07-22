import type { Metadata } from "next";
import { CartPage } from "@/features/cart/components/cart-page";

export const metadata: Metadata = {
  title: "Shopping Cart",
  robots: { index: false },
};

export default function Page() {
  return <CartPage />;
}
