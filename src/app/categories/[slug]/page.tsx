import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/shared/product-card";
import { CategoryGallery } from "@/features/categories/components/category-gallery";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/products" },
          { label: category.name },
        ]}
        className="mb-8"
      />

      {/* Hero with primary image */}
      <div className="relative mb-6 aspect-[21/9] overflow-hidden rounded-2xl">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center p-8 md:p-12">
          <div className="text-white">
            <h1 className="font-serif text-4xl font-medium md:text-5xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-lg text-white/80">{category.description}</p>
            <p className="mt-2 text-sm text-white/60">
              {category.productCount} products · {category.images.length} curated looks
            </p>
          </div>
        </div>
      </div>

      {/* Multiple category images gallery */}
      <CategoryGallery images={category.images} categoryName={category.name} />

      {categoryProducts.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted-foreground">
          No products in this category yet. Check back soon!
        </p>
      )}
    </Container>
  );
}
