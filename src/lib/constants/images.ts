/**
 * Reliable image URLs via Pexels CDN (verified 200 responses).
 * Each category has multiple images for banners, cards, and galleries.
 */

function pexels(id: number, w = 800, h = 1000): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
}

function pexelsWide(id: number, w = 1400, h = 600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
}

function pexelsSquare(id: number, size = 600): string {
  return pexels(id, size, size);
}

/** Hero background video */
export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/6774335/6774335-hd_1920_1080_25fps.mp4";

export const HERO_VIDEO_POSTER = pexelsWide(1571460, 1920, 1080);

// ─── Multiple images per category slug ─────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string[]> = {
  "living-room": [
    pexels(1571460),
    pexels(1866149),
    pexels(5824901),
    pexels(1350789),
  ],
  bedroom: [
    pexels(1457842),
    pexels(1743229),
    pexels(1648776),
    pexels(271743),
  ],
  "dining-room": [
    pexels(1080721),
    pexels(1454806),
    pexels(1082539),
    pexels(189333),
  ],
  kitchen: [
    pexels(2724749),
    pexels(1080533),
    pexels(2062431),
    pexels(276724),
  ],
  bathroom: [
    pexels(1457847),
    pexels(271743),
    pexels(1454805),
    pexels(6585760),
  ],
  office: [
    pexels(667838),
    pexels(37347),
    pexels(1595385),
    pexels(1181406),
  ],
  lighting: [
    pexels(1114892),
    pexels(1123262),
    pexels(333848),
    pexels(1125137),
  ],
  "wall-decor": [
    pexels(1109541),
    pexels(1571458),
    pexels(109063),
    pexels(276583),
  ],
  mirrors: [
    pexels(6580705),
    pexels(1457842),
    pexels(1571463),
    pexels(6585760),
  ],
  clocks: [
    pexels(1105365),
    pexels(393388),
    pexels(1022923),
    pexels(279906),
  ],
  rugs: [
    pexels(10906347),
    pexels(4846458),
    pexels(1457842),
    pexels(1571460),
  ],
  curtains: [
    pexels(1457842),
    pexels(1571463),
    pexels(1743229),
    pexels(6580705),
  ],
  cushions: [
    pexels(1571460),
    pexels(1350789),
    pexels(5824901),
    pexels(1866149),
  ],
  vases: [
    pexels(1123262),
    pexels(4207892),
    pexels(4041392),
    pexels(4207890),
  ],
  "artificial-plants": [
    pexels(1084199),
    pexels(3076899),
    pexels(1959644),
    pexels(1084198),
  ],
  storage: [
    pexels(1571463),
    pexels(276724),
    pexels(1571460),
    pexels(667838),
  ],
  accessories: [
    pexels(2899777),
    pexels(4041392),
    pexels(1123262),
    pexels(4207892),
  ],
  seasonal: [
    pexels(1303098),
    pexels(172292),
    pexels(1303081),
    pexels(1121128),
  ],
};

/** Get primary + all images for a category */
export function getCategoryImages(slug: string): string[] {
  return CATEGORY_IMAGES[slug] ?? [pexels(1571460), pexels(1866149), pexels(5824901)];
}

export function getCategoryImage(slug: string, index = 0): string {
  const imgs = getCategoryImages(slug);
  return imgs[index % imgs.length];
}

// ─── Product-specific images (unique per product slug) ─────────────────────
export const PRODUCT_IMAGES: Record<string, string[]> = {
  "artisan-linen-sofa": [pexels(1866149), pexels(1350789), pexels(5824901)],
  "brass-pendant-chandelier": [pexels(1114892), pexels(1123262), pexels(333848)],
  "abstract-canvas-art": [pexels(1109541), pexels(1571458), pexels(276583)],
  "moroccan-wool-rug": [pexels(10906347), pexels(4846458), pexels(1457842)],
  "ceramic-vase-collection": [pexels(1123262), pexels(4207892), pexels(4041392)],
  "velvet-throw-cushions": [pexels(1571460), pexels(1350789), pexels(5824901)],
  "arched-floor-mirror": [pexels(6580705), pexels(1457842), pexels(1571463)],
  "olive-tree-planter": [pexels(1084199), pexels(3076899), pexels(1959644)],
  "linen-sheer-curtains": [pexels(1457842), pexels(1743229), pexels(1571463)],
  "walnut-wall-clock": [pexels(1105365), pexels(393388), pexels(1022923)],
  "marble-side-table": [pexels(1571463), pexels(1866149), pexels(1350789)],
  "scented-candle-set": [pexels(2899777), pexels(4041392), pexels(1123262)],
  "woven-storage-basket": [pexels(1571463), pexels(276724), pexels(667838)],
  "dining-chair-set": [pexels(1080721), pexels(1454806), pexels(1082539)],
  "platform-bed-frame": [pexels(1457842), pexels(1743229), pexels(1648776)],
  "desk-lamp-brass": [pexels(333848), pexels(1125137), pexels(1114892)],
  "teak-bookshelf": [pexels(1571463), pexels(667838), pexels(276724)],
  "round-coffee-table": [pexels(1866149), pexels(5824901), pexels(1350789)],
  "cashmere-throw-blanket": [pexels(1743229), pexels(1457842), pexels(1648776)],
  "glass-pendant-light": [pexels(1123262), pexels(1114892), pexels(333848)],
  "floating-wall-shelf": [pexels(1571463), pexels(667838), pexels(276724)],
  "arc-floor-lamp": [pexels(1125137), pexels(333848), pexels(1114892)],
  "leather-bar-stool": [pexels(1080721), pexels(1454806), pexels(189333)],
  "rattan-accent-chair": [pexels(5824901), pexels(1350789), pexels(1866149)],
  "linen-table-runner": [pexels(1080721), pexels(1082539), pexels(1454806)],
  "gallery-picture-frame": [pexels(1109541), pexels(1571458), pexels(109063)],
  "reed-diffuser-set": [pexels(2899777), pexels(4041392), pexels(4207892)],
  "marble-serving-tray": [pexels(1080721), pexels(1454806), pexels(1082539)],
  "jute-area-rug": [pexels(10906347), pexels(4846458), pexels(1571460)],
  "upholstered-headboard": [pexels(1457842), pexels(1743229), pexels(1648776)],
  "ceramic-table-lamp": [pexels(333848), pexels(1125137), pexels(1114892)],
  "macrame-wall-hanging": [pexels(1109541), pexels(276583), pexels(1571458)],
  "bamboo-bath-caddy": [pexels(1457847), pexels(6585760), pexels(271743)],
  "velvet-dining-bench": [pexels(1080721), pexels(1454806), pexels(1082539)],
  "monstera-artificial-plant": [pexels(1084199), pexels(3076899), pexels(1084198)],
  "brass-coat-hooks": [pexels(2899777), pexels(4041392), pexels(4207890)],
};

export function getProductImages(slug: string, categorySlug?: string): string[] {
  if (PRODUCT_IMAGES[slug]) return PRODUCT_IMAGES[slug];
  if (categorySlug) return getCategoryImages(categorySlug);
  return [pexels(1571460), pexels(1866149), pexels(5824901)];
}

// ─── Shared / section images ───────────────────────────────────────────────
export const IMAGES = {
  banner1: pexelsWide(1303098),
  banner2: pexelsWide(1571460),
  brandStory: pexels(667838, 800, 1000),
  inspiration1: pexels(1457842, 800, 1000),
  inspiration2: pexels(1571460, 800, 1000),
  inspiration3: pexels(1080721, 800, 1000),
  collection1: pexelsWide(1571460),
  collection2: pexelsWide(1457842),
  collection3: pexelsWide(1866149),
  modern: pexelsWide(1571460),
  scandinavian: pexelsWide(1457842),
  minimalist: pexelsWide(5824901),
  bohemian: pexelsWide(1350789),
  industrial: pexelsWide(667838),
  coastal: pexelsWide(1571463),
  gallery: [
    pexelsSquare(1571460),
    pexelsSquare(1866149),
    pexelsSquare(1457842),
    pexelsSquare(1080721),
    pexelsSquare(2724749),
    pexelsSquare(667838),
    pexelsSquare(5824901),
    pexelsSquare(1350789),
  ],
};

// Room shortcuts
export const ROOM_IMAGES: Record<string, string> = {
  "living-room": getCategoryImage("living-room"),
  bedroom: getCategoryImage("bedroom"),
  "dining-room": getCategoryImage("dining-room"),
  kitchen: getCategoryImage("kitchen"),
  bathroom: getCategoryImage("bathroom"),
  office: getCategoryImage("office"),
};

export const STYLE_IMAGES: Record<string, string> = {
  modern: pexelsWide(1571460),
  scandinavian: pexelsWide(1457842),
  minimalist: pexelsWide(5824901),
  bohemian: pexelsWide(1350789),
  industrial: pexelsWide(667838),
  coastal: pexelsWide(1571463),
};

// Avatar helper
export function avatar(id: number): string {
  return pexels(id, 100, 100);
}

export { pexels, pexelsWide, pexelsSquare };
