import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
  className?: string;
}

export function CategoryCard({
  name,
  slug,
  image,
  productCount,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className={cn(
        "group relative block aspect-[4/5] overflow-hidden rounded-xl",
        className
      )}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="font-serif text-xl font-medium md:text-2xl">{name}</h3>
        {productCount !== undefined && (
          <p className="mt-1 text-sm text-white/80">{productCount} products</p>
        )}
      </div>
    </Link>
  );
}
