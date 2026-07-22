"use client";

import { AccountLayout } from "@/features/account/components/account-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils/format";
import type { Order } from "@/types";

const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "LH-2025-00142",
    userId: "user-demo",
    items: [
      {
        id: "oi-1",
        productId: "prod-1",
        productName: "Artisan Linen Sofa",
        productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80",
        quantity: 1,
        price: 2499,
      },
    ],
    subtotal: 2499,
    shipping: 0,
    discount: 0,
    tax: 199.92,
    total: 2698.92,
    status: "delivered",
    shippingAddress: {
      id: "addr-1",
      label: "Home",
      firstName: "Demo",
      lastName: "User",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      phone: "+1234567890",
      isDefault: true,
    },
    paymentMethod: "card",
    trackingNumber: "1Z999AA10123456784",
    createdAt: "2025-11-20T10:00:00Z",
    updatedAt: "2025-11-25T14:00:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "LH-2025-00156",
    userId: "user-demo",
    items: [
      {
        id: "oi-2",
        productId: "prod-5",
        productName: "Ceramic Vase Collection",
        productImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b13?w=100&q=80",
        quantity: 2,
        price: 189,
      },
    ],
    subtotal: 378,
    shipping: 9.99,
    discount: 37.8,
    tax: 27.22,
    total: 377.41,
    status: "shipped",
    shippingAddress: {
      id: "addr-1",
      label: "Home",
      firstName: "Demo",
      lastName: "User",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      phone: "+1234567890",
      isDefault: true,
    },
    paymentMethod: "card",
    trackingNumber: "1Z999AA10987654321",
    couponCode: "LUXE10",
    createdAt: "2025-12-10T08:00:00Z",
    updatedAt: "2025-12-12T10:00:00Z",
  },
];

const statusColors: Record<string, string> = {
  pending: "secondary",
  confirmed: "secondary",
  processing: "accent",
  shipped: "accent",
  delivered: "default",
  cancelled: "outline",
  refunded: "outline",
};

export function OrdersPage() {
  return (
    <AccountLayout activePath="/account/orders">
      <h1 className="font-serif text-3xl font-medium">Order History</h1>
      <p className="mt-2 text-muted-foreground">Track and manage your orders.</p>

      <div className="mt-8 space-y-4">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge variant={statusColors[order.status] as "default" | "secondary" | "accent" | "outline"}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <span className="font-medium">Total: {formatPrice(order.total)}</span>
              {order.trackingNumber && (
                <Button variant="outline" size="sm">
                  Track: {order.trackingNumber}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
