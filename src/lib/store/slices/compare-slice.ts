import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

interface CompareState {
  products: Product[];
}

const MAX_COMPARE = 4;

const compareSlice = createSlice({
  name: "compare",
  initialState: { products: [] } as CompareState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Product>) => {
      if (
        state.products.length < MAX_COMPARE &&
        !state.products.some((p) => p.id === action.payload.id)
      ) {
        state.products.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    clearCompare: (state) => {
      state.products = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
