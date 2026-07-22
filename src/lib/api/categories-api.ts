import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "@/types";
import { categories } from "@/data/categories";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: () => ({ data: categories }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query<Category, string>({
      queryFn: (slug) => {
        const category = categories.find((c) => c.slug === slug);
        if (!category) return { error: { status: 404, data: "Not found" } };
        return { data: category };
      },
      providesTags: (_result, _error, slug) => [{ type: "Category", id: slug }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoriesApi;
