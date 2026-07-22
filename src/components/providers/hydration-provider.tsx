"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart } from "@/lib/store/slices/cart-slice";
import { hydrateWishlist } from "@/lib/store/slices/wishlist-slice";
import { hydrateRecentlyViewed } from "@/lib/store/slices/recently-viewed-slice";
import type { CartItem, WishlistItem, Product } from "@/types";

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const cart = localStorage.getItem("luxehaven-cart");
      if (cart) dispatch(hydrateCart(JSON.parse(cart) as CartItem[]));

      const wishlist = localStorage.getItem("luxehaven-wishlist");
      if (wishlist)
        dispatch(hydrateWishlist(JSON.parse(wishlist) as WishlistItem[]));

      const recent = localStorage.getItem("luxehaven-recent");
      if (recent)
        dispatch(hydrateRecentlyViewed(JSON.parse(recent) as Product[]));
    } catch {
      // Silently fail on corrupted localStorage
    }
  }, [dispatch]);

  return <>{children}</>;
}
