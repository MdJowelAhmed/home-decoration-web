import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import { products, getProductBySlug } from "@/data/products";

function filterProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.materials?.length) {
    result = result.filter((p) =>
      filters.materials!.some((m) => p.materials.includes(m))
    );
  }

  if (filters.colors?.length) {
    result = result.filter((p) =>
      filters.colors!.some((c) => p.colors.some((pc) => pc.name === c))
    );
  }

  if (filters.brands?.length) {
    result = result.filter((p) => filters.brands!.includes(p.brand));
  }

  if (filters.rating) {
    result = result.filter((p) => p.rating >= filters.rating!);
  }

  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (filters.featured) {
    result = result.filter((p) => p.isFeatured);
  }

  if (filters.room) {
    result = result.filter((p) => p.room.includes(filters.room!));
  }

  if (filters.style) {
    result = result.filter((p) => p.style.includes(filters.style!));
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return result;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, ProductFilters>({
      queryFn: (filters) => {
        const filtered = filterProducts(filters);
        const page = filters.page || 1;
        const limit = filters.limit || 12;
        const start = (page - 1) * limit;
        const data = filtered.slice(start, start + limit);

        return {
          data: {
            data,
            total: filtered.length,
            page,
            limit,
            totalPages: Math.ceil(filtered.length / limit),
          },
        };
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, string>({
      queryFn: (slug) => {
        const product = getProductBySlug(slug);
        if (!product) return { error: { status: 404, data: "Not found" } };
        return { data: product };
      },
      providesTags: (_result, _error, slug) => [{ type: "Product", id: slug }],
    }),
    getFeaturedProducts: builder.query<Product[], void>({
      queryFn: () => ({
        data: products.filter((p) => p.isFeatured).slice(0, 8),
      }),
    }),
    getBestSellers: builder.query<Product[], void>({
      queryFn: () => ({
        data: products.filter((p) => p.isBestSeller).slice(0, 8),
      }),
    }),
    getNewArrivals: builder.query<Product[], void>({
      queryFn: () => ({
        data: products.filter((p) => p.isNew).slice(0, 8),
      }),
    }),
    getTrendingProducts: builder.query<Product[], void>({
      queryFn: () => ({
        data: products.filter((p) => p.isTrending).slice(0, 8),
      }),
    }),
    searchProducts: builder.query<Product[], string>({
      queryFn: (query) => ({
        data: filterProducts({ search: query }).slice(0, 10),
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
  useGetBestSellersQuery,
  useGetNewArrivalsQuery,
  useGetTrendingProductsQuery,
  useSearchProductsQuery,
} = productsApi;
