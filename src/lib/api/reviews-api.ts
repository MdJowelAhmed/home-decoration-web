import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Review } from "@/types";
import { reviews } from "@/data/content";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getProductReviews: builder.query<Review[], string>({
      queryFn: (productId) => ({
        data: reviews.filter((r) => r.productId === productId),
      }),
      providesTags: (_result, _error, productId) => [
        { type: "Review", id: productId },
      ],
    }),
  }),
});

export const { useGetProductReviewsQuery } = reviewsApi;
