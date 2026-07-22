"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/lib/api/products-api";
import { brands, allMaterials, allColors } from "@/data/products";
import { cn } from "@/lib/utils/cn";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

export function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);

  const filters = useMemo(
    () => ({
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      room: searchParams.get("room") || undefined,
      style: searchParams.get("style") || undefined,
      sort: searchParams.get("sort") || "featured",
      featured: searchParams.get("featured") === "true" ? true : undefined,
      brands: searchParams.get("brands")?.split(",").filter(Boolean),
      materials: searchParams.get("materials")?.split(",").filter(Boolean),
      colors: searchParams.get("colors")?.split(",").filter(Boolean),
      inStock: searchParams.get("inStock") === "true" ? true : undefined,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 3000 ? priceRange[1] : undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: 12,
    }),
    [searchParams, priceRange]
  );

  const selectedBrands = filters.brands ?? [];
  const selectedMaterials = filters.materials ?? [];
  const selectedColors = filters.colors ?? [];

  const { data, isLoading } = useGetProductsQuery(filters);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      router.push(`/products?${params.toString()}`);
    },
    [searchParams, router]
  );

  const toggleListParam = useCallback(
    (key: "brands" | "materials" | "colors", value: string) => {
      const current =
        key === "brands"
          ? selectedBrands
          : key === "materials"
            ? selectedMaterials
            : selectedColors;
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      updateParam(key, next.join(","));
    },
    [selectedBrands, selectedMaterials, selectedColors, updateParam]
  );

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Products" }]} className="mb-6" />

      <SectionHeader
        title="All Products"
        description="Browse our complete collection of premium home decor."
        align="left"
        className="mb-8"
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside
          className={cn(
            "lg:w-64 lg:shrink-0",
            filtersOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="sticky top-24 space-y-6 rounded-xl border border-border bg-card p-5">
            <h3 className="font-medium">Filters</h3>

            <div>
              <Label className="mb-3 block text-sm">Price Range</Label>
              <Slider
                min={0}
                max={3000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                aria-label="Price range"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>

            <div>
              <Label className="mb-3 block text-sm">Brand</Label>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleListParam("brands", brand)}
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block text-sm">Material</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {allMaterials.map((material) => (
                  <div key={material} className="flex items-center gap-2">
                    <Checkbox
                      id={`mat-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={() => toggleListParam("materials", material)}
                    />
                    <label htmlFor={`mat-${material}`} className="text-sm">
                      {material}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block text-sm">Color</Label>
              <div className="space-y-2">
                {allColors.map((color) => (
                  <div key={color} className="flex items-center gap-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => toggleListParam("colors", color)}
                    />
                    <label htmlFor={`color-${color}`} className="text-sm">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock === true}
                onCheckedChange={(checked) =>
                  updateParam("inStock", checked === true ? "true" : "")
                }
              />
              <label htmlFor="in-stock" className="text-sm">
                In Stock Only
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <p className="text-sm text-muted-foreground">
                {data?.total ?? 0} products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={filters.sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="hidden sm:flex border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4 md:gap-6",
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {data?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: data.totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={data.page === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateParam("page", String(i + 1))}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
