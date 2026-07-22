"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Heart, Bell, CreditCard, LogOut } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { logout } from "@/lib/store/slices/auth-slice";
import { cn } from "@/lib/utils/cn";

const accountLinks = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/payment", label: "Payment Methods", icon: CreditCard },
];

interface AccountLayoutProps {
  children: React.ReactNode;
  activePath?: string;
}

export function AccountLayout({ children, activePath }: AccountLayoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-serif text-3xl">Please Sign In</h1>
        <p className="mt-3 text-muted-foreground">
          Access your account to manage orders and preferences.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </Container>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Account" }]} className="mb-8" />
      <div className="grid gap-8 lg:grid-cols-4">
        <aside>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </CardHeader>
            <CardContent className="space-y-1">
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary",
                    activePath === link.href && "bg-secondary font-medium"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </CardContent>
          </Card>
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </Container>
  );
}
