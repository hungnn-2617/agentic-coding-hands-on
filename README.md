# SSA 2025 - Sun* Kudo System

A modern web application for sending and receiving Kudos, built with Next.js and deployed on Cloudflare Workers.

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tiptap](https://tiptap.dev/)** - Rich text editor

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend as a Service (PostgreSQL, Auth, Storage)

### Deployment & Infrastructure
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Edge runtime deployment
- **[OpenNext](https://opennext.js.org/)** - Next.js adapter for Cloudflare
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare CLI tool

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - React testing utilities
- **[ESLint](https://eslint.org/)** - Code linting

## Getting Started

### Prerequisites
- Node.js 20+
- Yarn 1.x

### Installation

```bash
# Install dependencies
yarn install

# Copy environment variables
cp .env.local.example .env.local
# Then edit .env.local with your Supabase credentials
```

### Development

```bash
# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run
```

### Linting

```bash
yarn lint
```

## Deployment

This project is deployed on **Cloudflare Workers** using OpenNext adapter.

### Deploy Commands

| Command | Description |
|---------|-------------|
| `yarn build:cloudflare` | Build for Cloudflare Workers |
| `yarn preview:cloudflare` | Local preview before deployment |
| `yarn deploy:cloudflare` | Deploy to Cloudflare Workers |

### Quick Deploy

```bash
# Build and deploy in one step
yarn build:cloudflare && yarn deploy:cloudflare
```

### Environment Variables

Configure environment variables in **Cloudflare Dashboard**:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to: Workers & Pages → `ssa-2025-ex` → Settings → Variables
3. Add the following variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

For local development, use `.dev.vars` file.

### Production URL

https://ssa-2025-ex.nguyen-ngoc-hung-b.workers.dev

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login)
│   ├── (main)/            # Main app routes
│   ├── api/               # API routes
│   └── auth/              # Auth callback
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
│   ├── i18n/             # Internationalization
│   ├── services/         # Business logic
│   ├── supabase/         # Supabase clients
│   └── utils/            # Helper functions
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production (Node.js) |
| `yarn start` | Start production server (Node.js) |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests in watch mode |
| `yarn test:run` | Run tests once |
| `yarn build:cloudflare` | Build for Cloudflare Workers |
| `yarn preview:cloudflare` | Preview Cloudflare build locally |
| `yarn deploy:cloudflare` | Deploy to Cloudflare Workers |
