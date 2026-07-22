import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import cartReducer from "./slices/cart-slice";
import wishlistReducer from "./slices/wishlist-slice";
import themeReducer from "./slices/theme-slice";
import recentlyViewedReducer from "./slices/recently-viewed-slice";
import compareReducer from "./slices/compare-slice";
import { productsApi } from "@/lib/api/products-api";
import { categoriesApi } from "@/lib/api/categories-api";
import { reviewsApi } from "@/lib/api/reviews-api";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      theme: themeReducer,
      recentlyViewed: recentlyViewedReducer,
      compare: compareReducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [reviewsApi.reducerPath]: reviewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productsApi.middleware,
        categoriesApi.middleware,
        reviewsApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
