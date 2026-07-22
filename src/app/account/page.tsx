import type { Metadata } from "next";
import { AccountDashboard } from "@/features/account/components/account-dashboard";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false },
};

export default function Page() {
  return <AccountDashboard />;
}
