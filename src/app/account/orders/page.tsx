import type { Metadata } from "next";
import { OrdersPage } from "@/features/account/components/orders-page";

export const metadata: Metadata = {
  title: "Order History",
  robots: { index: false },
};

export default function Page() {
  return <OrdersPage />;
}
