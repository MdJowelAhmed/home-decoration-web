export const SITE_CONFIG = {
  name: "LuxeHaven",
  tagline: "Curated Home Decor for Modern Living",
  description:
    "Discover premium furniture, lighting, wall art, and decorative accessories crafted to transform your space into a sanctuary of style.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://luxehaven.com",
  email: "hello@luxehaven.com",
  phone: "+1 (800) 555-0199",
  address: "245 Design District, New York, NY 10013",
  social: {
    instagram: "https://instagram.com/luxehaven",
    pinterest: "https://pinterest.com/luxehaven",
    facebook: "https://facebook.com/luxehaven",
  },
} as const;

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
] as const;

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
] as const;

export const SHIPPING_RATES = [
  { id: "standard", name: "Standard Shipping", price: 9.99, days: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 19.99, days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 34.99, days: "Next business day" },
] as const;
