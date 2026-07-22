"use client";

import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";

const stats = [
  { label: "Total Revenue", value: "$48,392", change: "+12.5%", icon: DollarSign },
  { label: "Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
  { label: "Customers", value: "1,284", change: "+15.3%", icon: Users },
  { label: "Products", value: String(products.length), change: "+3", icon: Package },
];

export function AdminDashboard() {
  return (
    <Container className="py-8 md:py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your store performance
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "LH-00158", customer: "Sarah M.", total: "$899", status: "Processing" },
                { id: "LH-00157", customer: "James C.", total: "$2,499", status: "Shipped" },
                { id: "LH-00156", customer: "Emily R.", total: "$377", status: "Delivered" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products
                .filter((p) => p.isBestSeller)
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{product.name}</span>
                    </div>
                    <span className="font-medium">${product.price}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Manage Products",
              "Manage Categories",
              "View Orders",
              "Manage Coupons",
              "Review Moderation",
              "Banner Management",
              "Customer Management",
              "Sales Reports",
            ].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-border p-4 text-left text-sm font-medium hover:bg-secondary transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
