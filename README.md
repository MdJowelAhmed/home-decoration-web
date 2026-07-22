# LuxeHaven — Premium Home Decor E-commerce

A modern, production-ready home decor e-commerce platform built with Next.js App Router, TypeScript, Tailwind CSS, Redux Toolkit, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** Redux Toolkit + RTK Query
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Notifications:** Sonner

## Features

- Premium homepage with hero, categories, product showcases, testimonials, FAQ
- Product listing with advanced filtering, sorting, grid/list views, pagination
- Product detail with image gallery, variants, reviews, similar products
- Persistent shopping cart with coupon support (try `LUXE10`)
- Wishlist and recently viewed products
- Multi-step checkout flow
- Customer account with order history
- Admin dashboard with analytics
- SEO: sitemap, robots.txt, JSON-LD structured data, Open Graph
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Login

- **Customer:** any email / password (8+ chars)
- **Admin:** email containing `admin` / password (8+ chars)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── ui/              # Reusable UI primitives
│   ├── layout/          # Navbar, Footer
│   ├── shared/          # ProductCard, Container, etc.
│   ├── providers/       # Redux store provider
│   └── seo/             # JSON-LD components
├── features/            # Feature-based modules
│   ├── home/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── auth/
│   ├── account/
│   ├── admin/
│   └── search/
├── lib/
│   ├── api/             # RTK Query API slices
│   ├── store/           # Redux slices
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilities
│   ├── validations/     # Zod schemas
│   └── constants/       # Site config
├── data/                # Mock data
└── types/               # TypeScript types
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## License

Private — All rights reserved.
