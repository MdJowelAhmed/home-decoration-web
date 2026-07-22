import Link from "next/link";
import { Share2, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/constants/site";
import { categories } from "@/data/categories";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products?sort=newest" },
    { label: "Best Sellers", href: "/products?sort=rating" },
    { label: "Sale", href: "/products?sale=true" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Sustainability", href: "/sustainability" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/account/orders" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-cream">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-medium">
              LuxeHaven
            </Link>
            <p className="mt-4 max-w-sm text-sm text-cream/70 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-cream/70">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.email}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:bg-cream/10 transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:bg-cream/10 transition-colors"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-cream/10" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium">Join Our Newsletter</h3>
            <p className="mt-1 text-sm text-cream/70">
              Be the first to discover new collections and exclusive offers.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" action="/api/newsletter" method="POST">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="border-cream/20 bg-cream/5 text-cream placeholder:text-cream/50"
              aria-label="Email address"
            />
            <Button type="submit" variant="accent">
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="my-10 bg-cream/10" />

        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="rounded-full border border-cream/20 px-3 py-1 text-xs text-cream/70 hover:bg-cream/10 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} LuxeHaven. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
