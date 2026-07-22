import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

interface RecentlyViewedState {
  products: Product[];
}

const MAX_RECENT = 8;

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: { products: [] } as RecentlyViewedState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<Product>) => {
      state.products = [
        action.payload,
        ...state.products.filter((p) => p.id !== action.payload.id),
      ].slice(0, MAX_RECENT);
    },
    hydrateRecentlyViewed: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addRecentlyViewed, hydrateRecentlyViewed } =
  recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
