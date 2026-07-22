"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setCartOpen } from "@/lib/store/slices/cart-slice";
import { categories } from "@/data/categories";
import { SearchPanel } from "@/features/search/components/search-panel";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

const navLinks = [
  { href: "/products", label: "Shop All" },
  { href: "/products?sort=newest", label: "New Arrivals" },
  { href: "/products?featured=true", label: "Collections" },
  { href: "/about", label: "Our Story" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="hidden border-b border-border bg-charcoal text-cream lg:block">
          <Container className="flex h-9 items-center justify-between text-xs">
            <p>Free shipping on orders over $150</p>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-accent transition-colors">
                FAQ
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20" aria-label="Main navigation">
            <div className="flex items-center gap-4 lg:gap-8">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Link href="/" className="font-serif text-2xl font-medium tracking-tight lg:text-3xl">
                LuxeHaven
              </Link>

              <div className="hidden items-center gap-1 lg:flex">
                <div
                  className="relative"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-accent transition-colors">
                    Categories
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {categoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-50 w-[600px] rounded-xl border border-border bg-background p-6 shadow-xl"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {categories.slice(0, 12).map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/categories/${cat.slug}`}
                              className="rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/products"
                          className="mt-4 block text-sm font-medium text-accent hover:underline"
                        >
                          View All Categories →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                      pathname === link.href && "text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/account" aria-label="Account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/wishlist" aria-label={`Wishlist (${wishlistItems.length} items)`}>
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-charcoal">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => dispatch(setCartOpen(true))}
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-charcoal">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-background shadow-xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="font-serif text-xl font-medium">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchPanel open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />
    </>
  );
}
