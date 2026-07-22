import type { Product } from "@/types";
import { getProductImages } from "@/lib/constants/images";

function seedFromId(id: string): number {
  const num = parseInt(id.replace(/\D/g, ""), 10);
  return Number.isFinite(num) ? num : 1;
}

const createProduct = (
  overrides: Partial<Product> & Pick<Product, "id" | "slug" | "name" | "price" | "categoryId" | "categorySlug">
): Product => {
  const { images: overrideImages, ...rest } = overrides;
  const seed = seedFromId(rest.id);
  const images = overrideImages ?? getProductImages(rest.slug, rest.categorySlug);
  return {
    description:
      "Crafted with exceptional attention to detail, this piece embodies timeless elegance and modern sophistication. Made from premium materials sourced from sustainable suppliers.",
    shortDescription: "Premium handcrafted piece for the discerning home.",
    brand: "LuxeHaven",
    rating: 4.3 + ((seed * 17) % 70) / 100,
    reviewCount: ((seed * 23) % 180) + 15,
    tags: ["premium", "handcrafted"],
    materials: ["Solid Oak", "Linen"],
    colors: [
      { name: "Natural", hex: "#D4C4A8" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    sizes: ["Small", "Medium", "Large"],
    variants: [],
    specifications: {
      Dimensions: '24" W x 18" D x 32" H',
      Weight: "12 lbs",
      Material: "Solid Oak, Linen Upholstery",
      Origin: "Handcrafted in Italy",
      Warranty: "2 Year Limited",
    },
    careInstructions: "Dust regularly with a soft, dry cloth. Avoid direct sunlight.",
    shippingInfo: "Free standard shipping on orders over $150.",
    returnPolicy: "30-day hassle-free returns.",
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    isTrending: false,
    room: ["living-room"],
    style: ["modern"],
    inStock: true,
    sku: `LH-${String(seed).padStart(4, "0")}`,
    createdAt: `2025-${String((seed % 12) + 1).padStart(2, "0")}-${String((seed % 28) + 1).padStart(2, "0")}T00:00:00.000Z`,
    images,
    ...rest,
  };
};

export const products: Product[] = [
  createProduct({ id: "prod-1", slug: "artisan-linen-sofa", name: "Artisan Linen Sofa", price: 2499, compareAtPrice: 2999, categoryId: "cat-1", categorySlug: "living-room", isFeatured: true, isBestSeller: true, room: ["living-room"], style: ["modern", "scandinavian"] }),
  createProduct({ id: "prod-2", slug: "brass-pendant-chandelier", name: "Brass Pendant Chandelier", price: 899, categoryId: "cat-7", categorySlug: "lighting", isFeatured: true, isTrending: true, room: ["dining-room", "living-room"], style: ["modern", "industrial"], materials: ["Brass", "Glass"] }),
  createProduct({ id: "prod-3", slug: "abstract-canvas-art", name: "Abstract Canvas Art — Horizon", price: 349, compareAtPrice: 449, categoryId: "cat-8", categorySlug: "wall-decor", isNew: true, isFeatured: true, room: ["living-room", "bedroom", "office"], style: ["modern", "minimalist"] }),
  createProduct({ id: "prod-4", slug: "moroccan-wool-rug", name: "Moroccan Wool Area Rug", price: 1299, categoryId: "cat-11", categorySlug: "rugs", isBestSeller: true, room: ["living-room", "bedroom"], style: ["bohemian", "coastal"], sizes: ["5x7", "8x10", "9x12"] }),
  createProduct({ id: "prod-5", slug: "ceramic-vase-collection", name: "Ceramic Vase Collection — Set of 3", price: 189, categoryId: "cat-14", categorySlug: "vases", isNew: true, isTrending: true, room: ["living-room", "bedroom"], style: ["minimalist", "scandinavian"] }),
  createProduct({ id: "prod-6", slug: "velvet-throw-cushions", name: "Velvet Throw Cushions — Pair", price: 129, categoryId: "cat-13", categorySlug: "cushions", isBestSeller: true, room: ["living-room", "bedroom"], style: ["modern", "bohemian"] }),
  createProduct({ id: "prod-7", slug: "arched-floor-mirror", name: "Arched Floor Mirror", price: 599, compareAtPrice: 749, categoryId: "cat-9", categorySlug: "mirrors", isFeatured: true, room: ["bedroom", "bathroom"], style: ["modern", "minimalist"] }),
  createProduct({ id: "prod-8", slug: "olive-tree-planter", name: "Artificial Olive Tree in Planter", price: 279, categoryId: "cat-15", categorySlug: "artificial-plants", isTrending: true, room: ["living-room", "office"], style: ["modern", "coastal"] }),
  createProduct({ id: "prod-9", slug: "linen-sheer-curtains", name: "Linen Sheer Curtains", price: 219, categoryId: "cat-12", categorySlug: "curtains", room: ["bedroom", "living-room"], style: ["scandinavian", "coastal"] }),
  createProduct({ id: "prod-10", slug: "walnut-wall-clock", name: "Walnut Wall Clock", price: 159, categoryId: "cat-10", categorySlug: "clocks", isNew: true, room: ["living-room", "office"], style: ["scandinavian", "minimalist"], materials: ["Walnut Wood"] }),
  createProduct({ id: "prod-11", slug: "marble-side-table", name: "Marble & Brass Side Table", price: 449, categoryId: "cat-1", categorySlug: "living-room", isBestSeller: true, room: ["living-room", "bedroom"], style: ["modern"], materials: ["Marble", "Brass"] }),
  createProduct({ id: "prod-12", slug: "scented-candle-set", name: "Artisan Scented Candle Set", price: 89, categoryId: "cat-17", categorySlug: "accessories", isTrending: true, room: ["living-room", "bedroom"], style: ["minimalist", "bohemian"] }),
  createProduct({ id: "prod-13", slug: "woven-storage-basket", name: "Handwoven Storage Basket", price: 79, categoryId: "cat-16", categorySlug: "storage", room: ["living-room", "bedroom"], style: ["bohemian", "coastal"] }),
  createProduct({ id: "prod-14", slug: "dining-chair-set", name: "Upholstered Dining Chair — Set of 2", price: 798, compareAtPrice: 998, categoryId: "cat-3", categorySlug: "dining-room", isFeatured: true, room: ["dining-room"], style: ["modern", "scandinavian"] }),
  createProduct({ id: "prod-15", slug: "platform-bed-frame", name: "Oak Platform Bed Frame", price: 1899, categoryId: "cat-2", categorySlug: "bedroom", isBestSeller: true, room: ["bedroom"], style: ["modern", "minimalist"], materials: ["Solid Oak"], sizes: ["Queen", "King"] }),
  createProduct({ id: "prod-16", slug: "desk-lamp-brass", name: "Adjustable Brass Desk Lamp", price: 249, categoryId: "cat-7", categorySlug: "lighting", isNew: true, room: ["office", "bedroom"], style: ["industrial", "modern"] }),
  createProduct({ id: "prod-17", slug: "teak-bookshelf", name: "Teak Open Bookshelf", price: 679, categoryId: "cat-16", categorySlug: "storage", isFeatured: true, room: ["living-room", "office"], style: ["scandinavian", "modern"], materials: ["Teak Wood"] }),
  createProduct({ id: "prod-18", slug: "round-coffee-table", name: "Round Walnut Coffee Table", price: 549, compareAtPrice: 649, categoryId: "cat-1", categorySlug: "living-room", isBestSeller: true, room: ["living-room"], style: ["modern", "minimalist"], materials: ["Walnut"] }),
  createProduct({ id: "prod-19", slug: "cashmere-throw-blanket", name: "Cashmere Throw Blanket", price: 199, categoryId: "cat-13", categorySlug: "cushions", isNew: true, isTrending: true, room: ["bedroom", "living-room"], style: ["scandinavian", "coastal"], materials: ["Cashmere"] }),
  createProduct({ id: "prod-20", slug: "glass-pendant-light", name: "Smoked Glass Pendant Light", price: 329, categoryId: "cat-7", categorySlug: "lighting", room: ["kitchen", "dining-room"], style: ["modern", "industrial"], materials: ["Glass", "Steel"] }),
  createProduct({ id: "prod-21", slug: "floating-wall-shelf", name: "Floating Wall Shelf — Set of 2", price: 119, categoryId: "cat-16", categorySlug: "storage", isTrending: true, room: ["living-room", "bedroom", "office"], style: ["minimalist", "scandinavian"] }),
  createProduct({ id: "prod-22", slug: "arc-floor-lamp", name: "Arc Floor Lamp — Matte Black", price: 389, categoryId: "cat-7", categorySlug: "lighting", isFeatured: true, room: ["living-room", "bedroom"], style: ["modern", "industrial"] }),
  createProduct({ id: "prod-23", slug: "leather-bar-stool", name: "Leather Bar Stool", price: 349, categoryId: "cat-3", categorySlug: "dining-room", room: ["kitchen", "dining-room"], style: ["industrial", "modern"], materials: ["Leather", "Steel"] }),
  createProduct({ id: "prod-24", slug: "rattan-accent-chair", name: "Rattan Accent Chair", price: 459, compareAtPrice: 559, categoryId: "cat-1", categorySlug: "living-room", isNew: true, isBestSeller: true, room: ["living-room", "bedroom"], style: ["bohemian", "coastal"], materials: ["Rattan"] }),
  createProduct({ id: "prod-25", slug: "linen-table-runner", name: "Linen Table Runner", price: 69, categoryId: "cat-17", categorySlug: "accessories", room: ["dining-room", "kitchen"], style: ["scandinavian", "minimalist"], materials: ["Linen"] }),
  createProduct({ id: "prod-26", slug: "gallery-picture-frame", name: "Gallery Picture Frame — Set of 3", price: 99, categoryId: "cat-8", categorySlug: "wall-decor", isTrending: true, room: ["living-room", "bedroom", "office"], style: ["modern", "minimalist"] }),
  createProduct({ id: "prod-27", slug: "reed-diffuser-set", name: "Luxury Reed Diffuser Set", price: 59, categoryId: "cat-17", categorySlug: "accessories", isNew: true, room: ["bathroom", "bedroom", "living-room"], style: ["minimalist"] }),
  createProduct({ id: "prod-28", slug: "marble-serving-tray", name: "Marble Serving Tray", price: 89, categoryId: "cat-17", categorySlug: "accessories", room: ["living-room", "kitchen"], style: ["modern", "minimalist"], materials: ["Marble"] }),
  createProduct({ id: "prod-29", slug: "jute-area-rug", name: "Natural Jute Area Rug", price: 349, categoryId: "cat-11", categorySlug: "rugs", isFeatured: true, room: ["living-room", "bedroom"], style: ["bohemian", "coastal"], sizes: ["5x7", "8x10"], materials: ["Jute"] }),
  createProduct({ id: "prod-30", slug: "upholstered-headboard", name: "Tufted Upholstered Headboard", price: 799, compareAtPrice: 999, categoryId: "cat-2", categorySlug: "bedroom", isBestSeller: true, room: ["bedroom"], style: ["modern", "scandinavian"], sizes: ["Queen", "King"] }),
  createProduct({ id: "prod-31", slug: "ceramic-table-lamp", name: "Ceramic Table Lamp — Ivory", price: 179, categoryId: "cat-7", categorySlug: "lighting", isNew: true, room: ["bedroom", "living-room"], style: ["scandinavian", "coastal"] }),
  createProduct({ id: "prod-32", slug: "macrame-wall-hanging", name: "Handmade Macramé Wall Hanging", price: 149, categoryId: "cat-8", categorySlug: "wall-decor", isTrending: true, room: ["bedroom", "living-room"], style: ["bohemian"] }),
  createProduct({ id: "prod-33", slug: "bamboo-bath-caddy", name: "Bamboo Bath Caddy Tray", price: 49, categoryId: "cat-5", categorySlug: "bathroom", room: ["bathroom"], style: ["minimalist", "scandinavian"], materials: ["Bamboo"] }),
  createProduct({ id: "prod-34", slug: "velvet-dining-bench", name: "Velvet Dining Bench", price: 649, categoryId: "cat-3", categorySlug: "dining-room", isFeatured: true, room: ["dining-room"], style: ["modern", "bohemian"], materials: ["Velvet", "Oak"] }),
  createProduct({ id: "prod-35", slug: "monstera-artificial-plant", name: "Monstera Artificial Plant — Large", price: 199, categoryId: "cat-15", categorySlug: "artificial-plants", isBestSeller: true, room: ["living-room", "office"], style: ["modern", "bohemian"] }),
  createProduct({ id: "prod-36", slug: "brass-coat-hooks", name: "Brass Coat Hooks — Set of 4", price: 79, categoryId: "cat-17", categorySlug: "accessories", room: ["living-room", "bedroom"], style: ["modern", "industrial"], materials: ["Brass"] }),
  createProduct({ id: "prod-37", slug: "marble-kitchen-canister", name: "Marble Kitchen Canister Set", price: 89, categoryId: "cat-4", categorySlug: "kitchen", isFeatured: true, room: ["kitchen"], style: ["modern", "minimalist"], materials: ["Marble"] }),
  createProduct({ id: "prod-38", slug: "copper-cookware-rack", name: "Wall-Mounted Copper Cookware Rack", price: 159, categoryId: "cat-4", categorySlug: "kitchen", isBestSeller: true, room: ["kitchen"], style: ["industrial", "modern"], materials: ["Copper", "Steel"] }),
  createProduct({ id: "prod-39", slug: "linen-kitchen-towels", name: "Linen Kitchen Towels — Set of 4", price: 49, categoryId: "cat-4", categorySlug: "kitchen", isNew: true, room: ["kitchen"], style: ["scandinavian", "coastal"], materials: ["Linen"] }),
  createProduct({ id: "prod-40", slug: "ergonomic-desk-chair", name: "Ergonomic Desk Chair — Walnut", price: 549, categoryId: "cat-6", categorySlug: "office", isFeatured: true, room: ["office"], style: ["modern", "scandinavian"], materials: ["Walnut", "Fabric"] }),
  createProduct({ id: "prod-41", slug: "adjustable-standing-desk", name: "Adjustable Standing Desk", price: 799, compareAtPrice: 949, categoryId: "cat-6", categorySlug: "office", isBestSeller: true, room: ["office"], style: ["modern", "minimalist"], materials: ["Oak", "Steel"] }),
  createProduct({ id: "prod-42", slug: "desk-organizer-set", name: "Bamboo Desk Organizer Set", price: 69, categoryId: "cat-6", categorySlug: "office", isTrending: true, room: ["office"], style: ["minimalist", "scandinavian"], materials: ["Bamboo"] }),
  createProduct({ id: "prod-43", slug: "holiday-wreath-garland", name: "Holiday Wreath & Garland Set", price: 129, categoryId: "cat-18", categorySlug: "seasonal", isFeatured: true, isNew: true, room: ["living-room", "dining-room"], style: ["coastal", "scandinavian"] }),
  createProduct({ id: "prod-44", slug: "autumn-throw-pillow-set", name: "Autumn Throw Pillow Set", price: 99, categoryId: "cat-18", categorySlug: "seasonal", isTrending: true, room: ["living-room", "bedroom"], style: ["bohemian", "coastal"] }),
  createProduct({ id: "prod-45", slug: "festive-table-centerpiece", name: "Festive Table Centerpiece", price: 79, categoryId: "cat-18", categorySlug: "seasonal", room: ["dining-room", "kitchen"], style: ["modern", "minimalist"] }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.isTrending);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}

export const brands = [...new Set(products.map((p) => p.brand))];
export const allMaterials = [...new Set(products.flatMap((p) => p.materials))];
export const allColors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))];
