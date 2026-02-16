# JECI Group - Digital Platform

## Overview

The JECI Group is a professional consulting and financial services platform (jecigroup.com) built for a Washington, DC-based firm offering tax preparation, accounting, bookkeeping, business formation, credit repair (700 Credit Club), digital marketing, and Bitcoin ecosystem advisory services. The site follows a "3 Pillar" business model — Foundation (Credit & Entity Formation), Engine (Accounting & Operations), and Growth (Digital Marketing & Innovation) — funneling clients toward a premium $3,000/month "Founders' Operations Suite" retainer. The platform includes service booking with payment integration, newsletter management, contact forms, an admin dashboard, financial tools/calculators, a blog ("The Hub"), and a chat widget.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter (lightweight client-side router) — NOT react-router-dom
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin), with shadcn/ui components (New York style variant)
- **UI Components**: Radix UI primitives wrapped by shadcn/ui, located in `client/src/components/ui/`
- **Animations**: Framer Motion for page transitions and element animations
- **State Management**: TanStack React Query for server state; local React state for UI
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Fonts**: Inter (sans-serif body) and Playfair Display (serif headings) — loaded via Google Fonts
- **Design Theme**: Corporate navy blue primary (`hsl(222 47% 11%)`), gold accent (`hsl(45 93% 47%)`), sharp corners, professional aesthetic

### Backend
- **Runtime**: Node.js with Express v5
- **Language**: TypeScript, compiled with tsx for development and esbuild for production
- **API Pattern**: RESTful JSON API with all endpoints under `/api/`
- **Key Endpoints**: `/api/bookings`, `/api/contacts`, `/api/newsletter`, `/api/credit-club`, `/api/admin/dashboard`
- **Validation**: Zod schemas (shared between client and server via `drizzle-zod`) with `zod-validation-error` for readable error messages
- **Build Process**: Custom `script/build.ts` that runs Vite for client and esbuild for server, outputting to `dist/`

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` — shared between frontend and backend
- **Tables**: `users`, `bookings`, `contacts`, `newsletter_subscribers`, `credit_club_signups`
- **IDs**: UUID primary keys generated via `gen_random_uuid()`
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync (migrations output to `./migrations/`)

### Project Structure
```
client/              → React frontend
  src/
    components/      → Reusable UI components (Navbar, Footer, ChatWidget, etc.)
    components/ui/   → shadcn/ui primitives
    pages/           → Route-level page components
    pages/services/  → Service pillar pages and landing pages
    pages/booking/   → Booking flow
    pages/newsletter/→ Newsletter archive and issues
    pages/admin/     → Admin dashboard
    pages/tools/     → Financial calculators (retirement, P&L, wealth diversification)
    data/            → Static data (service categories, pricing)
    hooks/           → Custom React hooks
    lib/             → Utilities (queryClient, cn helper)
  public/            → Static assets
  index.html         → HTML entry point
server/              → Express backend
  index.ts           → Server entry, middleware setup
  routes.ts          → API route definitions
  storage.ts         → Database access layer (DatabaseStorage class implementing IStorage interface)
  db.ts              → Drizzle + pg pool setup
  static.ts          → Production static file serving
  vite.ts            → Dev-mode Vite middleware integration
shared/              → Code shared between client and server
  schema.ts          → Drizzle table definitions and Zod insert schemas
attached_assets/     → Reference documents and design specs (not served to users)
```

### Key Design Patterns
- **Storage Interface**: `IStorage` interface in `server/storage.ts` abstracts all database operations, with `DatabaseStorage` as the concrete implementation — makes it easy to swap storage backends
- **Shared Schema**: Drizzle schemas in `shared/schema.ts` generate both database table definitions and Zod validation schemas used on both client and server
- **SPA with Server Fallback**: In production, Express serves the built Vite output and falls back to `index.html` for all unmatched routes (SPA pattern). In development, Vite middleware handles HMR
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL**: Required — connection string via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with connection pooling

### Payment Processing
- **Stripe**: Referenced in build allowlist and service booking flows. Links to Stripe checkout/payment pages for service deposits and retainer billing

### Third-Party Services
- **Substack**: Newsletter subscription links point to `adrianjordanio.substack.com`
- **Google Fonts**: Inter and Playfair Display font families loaded via CDN

### Key NPM Packages
- `express` v5 — HTTP server
- `drizzle-orm` + `drizzle-kit` — ORM and migration tooling
- `@tanstack/react-query` — async data fetching
- `framer-motion` — animations
- `wouter` — client-side routing
- `zod` — schema validation
- `connect-pg-simple` — PostgreSQL session store (available but sessions may not be fully implemented yet)
- `nodemailer` — email sending capability (in build allowlist)
- `multer` — file upload handling (in build allowlist)
- `stripe` — payment processing (in build allowlist)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — development tools (conditionally loaded)
- Custom `vite-plugin-meta-images` — updates OpenGraph meta tags with Replit deployment URLs