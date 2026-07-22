import type { Category } from "@/types";
import { getCategoryImages, ROOM_IMAGES, STYLE_IMAGES } from "@/lib/constants/images";
import { products } from "@/data/products";

const categoryMeta = [
  { id: "cat-1", slug: "living-room", name: "Living Room", description: "Sophisticated furniture and accents for your main living space" },
  { id: "cat-2", slug: "bedroom", name: "Bedroom", description: "Create a serene retreat with our bedroom collection" },
  { id: "cat-3", slug: "dining-room", name: "Dining Room", description: "Elegant dining furniture and tableware" },
  { id: "cat-4", slug: "kitchen", name: "Kitchen", description: "Functional and beautiful kitchen accessories" },
  { id: "cat-5", slug: "bathroom", name: "Bathroom", description: "Spa-inspired bathroom decor and accessories" },
  { id: "cat-6", slug: "office", name: "Office", description: "Productive and stylish workspace essentials" },
  { id: "cat-7", slug: "lighting", name: "Lighting", description: "Statement lighting to illuminate your home" },
  { id: "cat-8", slug: "wall-decor", name: "Wall Decor", description: "Art, mirrors, and wall accents" },
  { id: "cat-9", slug: "mirrors", name: "Mirrors", description: "Decorative mirrors for every room" },
  { id: "cat-10", slug: "clocks", name: "Clocks", description: "Timeless timepieces for modern homes" },
  { id: "cat-11", slug: "rugs", name: "Rugs", description: "Luxurious rugs to anchor your space" },
  { id: "cat-12", slug: "curtains", name: "Curtains", description: "Elegant window treatments" },
  { id: "cat-13", slug: "cushions", name: "Cushions", description: "Plush cushions and throw pillows" },
  { id: "cat-14", slug: "vases", name: "Vases", description: "Artisan vases and vessels" },
  { id: "cat-15", slug: "artificial-plants", name: "Artificial Plants", description: "Lifelike greenery without the maintenance" },
  { id: "cat-16", slug: "storage", name: "Storage & Organization", description: "Stylish storage solutions" },
  { id: "cat-17", slug: "accessories", name: "Decorative Accessories", description: "Finishing touches for every corner" },
  { id: "cat-18", slug: "seasonal", name: "Seasonal Collections", description: "Limited edition seasonal decor" },
];

function countProductsForCategory(slug: string): number {
  return products.filter((p) => p.categorySlug === slug).length;
}

export const categories: Category[] = categoryMeta.map((cat) => {
  const images = getCategoryImages(cat.slug);
  return {
    ...cat,
    productCount: countProductsForCategory(cat.slug),
    image: images[0],
    images,
  };
});

export const rooms = [
  { slug: "living-room", name: "Living Room", image: ROOM_IMAGES["living-room"] },
  { slug: "bedroom", name: "Bedroom", image: ROOM_IMAGES.bedroom },
  { slug: "dining-room", name: "Dining Room", image: ROOM_IMAGES["dining-room"] },
  { slug: "kitchen", name: "Kitchen", image: ROOM_IMAGES.kitchen },
  { slug: "bathroom", name: "Bathroom", image: ROOM_IMAGES.bathroom },
  { slug: "office", name: "Office", image: ROOM_IMAGES.office },
];

export const styles = [
  { slug: "modern", name: "Modern", image: STYLE_IMAGES.modern },
  { slug: "scandinavian", name: "Scandinavian", image: STYLE_IMAGES.scandinavian },
  { slug: "minimalist", name: "Minimalist", image: STYLE_IMAGES.minimalist },
  { slug: "bohemian", name: "Bohemian", image: STYLE_IMAGES.bohemian },
  { slug: "industrial", name: "Industrial", image: STYLE_IMAGES.industrial },
  { slug: "coastal", name: "Coastal", image: STYLE_IMAGES.coastal },
];
