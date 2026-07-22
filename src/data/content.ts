import type { Review, Testimonial, Banner, Collection } from "@/types";
import { IMAGES, avatar, getCategoryImage } from "@/lib/constants/images";

export const reviews: Review[] = [
  { id: "rev-1", productId: "prod-1", userId: "user-1", userName: "Sarah Mitchell", userAvatar: avatar(774909), rating: 5, title: "Absolutely stunning quality", comment: "The craftsmanship is exceptional. This sofa transformed our living room into a magazine-worthy space.", createdAt: "2025-11-15T10:00:00Z", verified: true },
  { id: "rev-2", productId: "prod-1", userId: "user-2", userName: "James Chen", rating: 4, title: "Beautiful but delivery took time", comment: "The sofa itself is gorgeous and incredibly comfortable. White-glove service was excellent.", createdAt: "2025-10-28T14:30:00Z", verified: true },
  { id: "rev-3", productId: "prod-2", userId: "user-3", userName: "Emily Rodriguez", userAvatar: avatar(774909), rating: 5, title: "Statement piece", comment: "This chandelier is the centerpiece of our dining room. The warm brass finish is even more beautiful in person.", createdAt: "2025-12-01T09:15:00Z", verified: true },
  { id: "rev-4", productId: "prod-4", userId: "user-4", userName: "Michael Thompson", rating: 5, title: "Luxurious feel underfoot", comment: "The quality of this rug is outstanding. Soft, durable, and the pattern adds so much warmth.", createdAt: "2025-11-20T16:45:00Z", verified: true },
  { id: "rev-5", productId: "prod-7", userId: "user-5", userName: "Lisa Park", rating: 5, title: "Perfect mirror", comment: "The arched design is stunning. Makes our bedroom feel twice as big.", createdAt: "2025-12-05T11:00:00Z", verified: true },
  { id: "rev-6", productId: "prod-15", userId: "user-6", userName: "David Kim", rating: 4, title: "Solid bed frame", comment: "Very sturdy and beautiful oak finish. Assembly was straightforward.", createdAt: "2025-11-08T08:30:00Z", verified: true },
  { id: "rev-7", productId: "prod-18", userId: "user-7", userName: "Anna Williams", rating: 5, title: "Coffee table dreams", comment: "Exactly what I was looking for. The walnut grain is gorgeous.", createdAt: "2025-12-12T15:20:00Z", verified: true },
  { id: "rev-8", productId: "prod-24", userId: "user-8", userName: "Tom Harris", rating: 5, title: "Coastal vibes", comment: "This rattan chair is the perfect accent piece. Lightweight but feels premium.", createdAt: "2025-12-18T09:45:00Z", verified: true },
];

export const testimonials: Testimonial[] = [
  { id: "test-1", name: "Alexandra Wright", role: "Interior Designer", avatar: avatar(774909), rating: 5, comment: "LuxeHaven has become my go-to recommendation for clients seeking premium, curated home pieces." },
  { id: "test-2", name: "David Park", role: "Homeowner", avatar: avatar(614810), rating: 5, comment: "From browsing to delivery, the entire experience felt premium. Every piece has elevated our home." },
  { id: "test-3", name: "Rachel Kim", role: "Lifestyle Blogger", avatar: avatar(733872), rating: 5, comment: "The attention to detail in both products and packaging is remarkable." },
  { id: "test-4", name: "Marcus Johnson", role: "Architect", avatar: avatar(237900), rating: 5, comment: "I specify LuxeHaven pieces in my residential projects regularly." },
  { id: "test-5", name: "Sophie Laurent", role: "Home Stylist", avatar: avatar(1239291), rating: 5, comment: "The seasonal collections are always on-trend yet timeless." },
];

export const banners: Banner[] = [
  { id: "banner-1", title: "Winter Collection 2025", subtitle: "Cozy textures and warm tones for the season", image: IMAGES.banner1, link: "/products?collection=seasonal", cta: "Explore Collection", isActive: true },
  { id: "banner-2", title: "Free Shipping Over $150", subtitle: "On all orders within the continental US", image: IMAGES.banner2, link: "/products", cta: "Shop Now", isActive: true },
];

export const collections: Collection[] = [
  { id: "col-1", slug: "modern-minimalist", name: "Modern Minimalist", description: "Clean lines and understated elegance", image: IMAGES.collection1, productCount: 24 },
  { id: "col-2", slug: "warm-earth-tones", name: "Warm Earth Tones", description: "Natural materials and organic textures", image: IMAGES.collection2, productCount: 18 },
  { id: "col-3", slug: "artisan-crafted", name: "Artisan Crafted", description: "Handmade pieces with soul", image: IMAGES.collection3, productCount: 32 },
  { id: "col-4", slug: "coastal-retreat", name: "Coastal Retreat", description: "Breezy, relaxed elegance", image: IMAGES.coastal, productCount: 16 },
  { id: "col-5", slug: "urban-industrial", name: "Urban Industrial", description: "Raw materials meet refined design", image: IMAGES.industrial, productCount: 14 },
];

export const faqs = [
  { question: "What is your return policy?", answer: "We offer a 30-day hassle-free return policy on all items." },
  { question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days." },
  { question: "Do you offer international shipping?", answer: "Yes, we ship to over 40 countries worldwide." },
  { question: "Are your products sustainably sourced?", answer: "We partner with artisans who prioritize eco-friendly materials." },
  { question: "Can I track my order?", answer: "You'll receive tracking information once your order ships." },
  { question: "Do you offer design consultation?", answer: "Yes! Complimentary design consultation is available." },
  { question: "What payment methods do you accept?", answer: "All major credit cards, PayPal, Apple Pay, and Google Pay." },
  { question: "Do you offer gift wrapping?", answer: "Premium gift wrapping is available at checkout for $9.99." },
];

export const galleryImages = IMAGES.gallery;

export const roomInspirations = [
  { id: "insp-1", title: "Serene Bedroom Retreat", image: IMAGES.inspiration1, room: "bedroom", products: ["prod-15", "prod-7", "prod-9"] },
  { id: "insp-2", title: "Modern Living Space", image: IMAGES.inspiration2, room: "living-room", products: ["prod-1", "prod-4", "prod-11"] },
  { id: "insp-3", title: "Elegant Dining Room", image: IMAGES.inspiration3, room: "dining-room", products: ["prod-2", "prod-14", "prod-5"] },
  { id: "insp-4", title: "Cozy Reading Nook", image: getCategoryImage("bedroom", 1), room: "living-room", products: ["prod-19", "prod-22", "prod-6"] },
  { id: "insp-5", title: "Minimalist Home Office", image: getCategoryImage("office"), room: "office", products: ["prod-16", "prod-17", "prod-8"] },
  { id: "insp-6", title: "Bohemian Lounge", image: getCategoryImage("living-room", 2), room: "living-room", products: ["prod-24", "prod-32", "prod-4"] },
];
