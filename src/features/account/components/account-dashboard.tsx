"use client";

import { AccountLayout } from "@/features/account/components/account-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/hooks/redux";

export function AccountDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const orderCount = 3;
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  return (
    <AccountLayout activePath="/account">
      <h1 className="font-serif text-3xl font-medium">My Account</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {user?.firstName}! Manage your account and orders.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">{orderCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wishlist Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">{wishlistCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).getFullYear()
                : "2025"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
}
