<!--
## Sync Impact Report
- **Version change**: N/A → 1.0.0 (initial creation)
- **Modified principles**: None (first version)
- **Added sections**:
  - Core Principles (5 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
- **Removed sections**: None
- **Templates requiring updates**:
  - `.momorph/templates/plan-template.md` — ✅ Compatible (no changes needed; constitution checks align)
  - `.momorph/templates/spec-template.md` — ✅ Compatible (responsive breakpoints and security sections present)
  - `.momorph/templates/tasks-template.md` — ✅ Compatible (TDD flow and phase structure align)
- **Follow-up TODOs**: None
-->

# SSA 2025 EX Constitution

## Core Principles

### I. Clean Code & Clear Organization

All source code MUST be clean, concise, and consistently structured. Every file MUST have a single clear responsibility. Naming MUST be descriptive and self-documenting — avoid abbreviations unless they are universally understood (e.g., `id`, `url`, `api`).

- File and folder names MUST use kebab-case (e.g., `login-form.tsx`, `use-auth.ts`).
- Components MUST use PascalCase for exports (e.g., `LoginForm`, `HeroSection`).
- Hooks MUST be prefixed with `use` (e.g., `useAuth`, `useLanguage`).
- Each module/feature MUST be self-contained within its own directory.
- Shared utilities MUST live in a dedicated `lib/` or `utils/` directory — never duplicated across features.
- Imports MUST use the `@/*` path alias defined in `tsconfig.json`. Relative imports crossing feature boundaries are prohibited.
- Dead code, commented-out blocks, and unused imports MUST be removed before committing.
- Maximum file length guideline: 300 lines. Files exceeding this SHOULD be split into smaller focused units.

### II. Next.js Best Practices (App Router)

This project uses Next.js 16 with the App Router. All routing, data fetching, and rendering decisions MUST follow App Router conventions.

- Default to React Server Components (RSC). Only add `"use client"` when the component requires browser APIs, event handlers, or React hooks (`useState`, `useEffect`, etc.).
- Data fetching MUST use Server Components with `async/await` or Next.js `fetch` with appropriate caching/revalidation strategies. Client-side data fetching MUST use a dedicated hook pattern (e.g., SWR or custom hooks wrapping Supabase client).
- Route segments MUST use the `app/` directory structure with `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` where applicable.
- Dynamic routes MUST use `[param]` syntax. Catch-all routes MUST use `[...param]`.
- Metadata MUST be exported from `page.tsx` or `layout.tsx` using the `metadata` export or `generateMetadata` function for SEO.
- Images MUST use the `next/image` component for automatic optimization.
- Environment variables accessed on the client MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets MUST never be exposed to the client bundle.

### III. Responsive Design (Mobile-First)

The application MUST be fully responsive and provide a consistent user experience across mobile, tablet, and desktop screen sizes.

- MUST follow a mobile-first approach: base styles target mobile, then use `sm:`, `md:`, `lg:`, `xl:` Tailwind breakpoints to progressively enhance for larger screens.
- Breakpoint definitions (Tailwind v4 defaults):
  - Mobile: < 640px (base)
  - Tablet: >= 640px (`sm:`) and >= 768px (`md:`)
  - Desktop: >= 1024px (`lg:`) and >= 1280px (`xl:`)
- Touch targets MUST be at least 44x44px on mobile.
- Text MUST remain readable without horizontal scrolling at any viewport width.
- Layout MUST NOT use fixed pixel widths for containers. Use relative units (`%`, `rem`, `vw`) or Tailwind's responsive utility classes.
- All interactive components (dropdowns, modals, navigation) MUST be tested and functional at every breakpoint.

### IV. Secure Coding Practices (OWASP)

All code MUST adhere to OWASP Top 10 security standards and secure coding best practices.

- **Input Validation**: All user input MUST be validated on the server side. Client-side validation is for UX only and MUST NOT be relied upon for security.
- **Authentication**: Authentication MUST be handled via Supabase Auth with Google OAuth. Session tokens MUST be stored in HTTP-only cookies — never in `localStorage` or `sessionStorage`.
- **Authorization**: Every API route and server action MUST verify the user's authentication status and permissions before processing. Unauthorized access MUST return 401/403 responses.
- **XSS Prevention**: Never use `dangerouslySetInnerHTML` unless the content has been sanitized with a dedicated library. All dynamic content rendered in JSX is auto-escaped by React — do not bypass this.
- **CSRF Protection**: Server actions and API routes MUST validate origin headers. Use Next.js built-in CSRF protections where available.
- **SQL Injection**: All database queries MUST use Supabase client SDK with parameterized queries. Raw SQL strings with interpolated user input are prohibited.
- **Secrets Management**: API keys, database URLs, and service credentials MUST be stored in environment variables. `.env` files MUST be listed in `.gitignore`. Never commit secrets.
- **Dependency Security**: Dependencies MUST be audited regularly (`npm audit`). Known vulnerable packages MUST be updated or replaced.
- **Error Handling**: Error responses MUST NOT expose stack traces, internal paths, or database details to the client. Use generic error messages for production.

### V. Test-Driven Development (TDD)

Development MUST follow a Test-Driven Development flow. Tests are written before implementation code.

- **Red-Green-Refactor cycle**: Write a failing test → implement the minimum code to pass → refactor while keeping tests green.
- Unit tests MUST cover all utility functions, hooks, and service methods.
- Integration tests MUST cover critical user flows (login, navigation, form submissions).
- Components with business logic MUST have corresponding test files co-located in the same directory or in a `__tests__/` subfolder.
- Test files MUST follow the naming pattern: `[name].test.ts` or `[name].test.tsx`.
- Tests MUST NOT depend on external services. Mock Supabase and external APIs in unit tests.
- CI pipeline MUST run all tests before allowing merge to `main`.

## Technology Stack & Constraints

### Runtime & Framework

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js (App Router) | 16.x | React Server Components by default |
| UI Library | React | 19.x | Concurrent features enabled |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 4.x | Utility-first, mobile-first responsive |
| Backend/Edge | Cloudflare Workers | Latest | Edge functions for API routes and middleware |
| Database | Supabase (PostgreSQL) | Latest | Auth, DB, Storage, Realtime |
| Auth | Supabase Auth | Latest | Google OAuth provider |

### Folder Structure

```
app/                          # Next.js App Router pages
├── (auth)/                   # Auth route group (login, callback)
│   ├── login/
│   │   └── page.tsx
│   └── callback/
│       └── route.ts
├── (main)/                   # Authenticated route group
│   ├── layout.tsx            # Shared layout with header/footer
│   └── [feature]/
│       └── page.tsx
├── layout.tsx                # Root layout
├── page.tsx                  # Landing/redirect
├── globals.css
├── not-found.tsx
└── error.tsx

components/                   # Shared UI components
├── ui/                       # Primitive components (Button, Input, Modal)
└── [feature]/                # Feature-specific components

lib/                          # Shared utilities and configurations
├── supabase/
│   ├── client.ts             # Browser Supabase client
│   ├── server.ts             # Server Supabase client
│   └── middleware.ts         # Auth middleware helper
├── utils.ts                  # General utilities
└── constants.ts              # App-wide constants

hooks/                        # Custom React hooks
├── use-auth.ts
└── use-[feature].ts

types/                        # TypeScript type definitions
├── database.ts               # Supabase generated types
└── [feature].ts

public/                       # Static assets
├── images/
└── icons/
```

### Coding Conventions

- **Formatting**: Tailwind CSS class ordering follows the Tailwind Prettier plugin convention. No manual sorting.
- **Component pattern**: Prefer function declarations (`function ComponentName()`) over arrow function expressions for top-level components.
- **Props**: Define props inline for simple cases (`{ title, onClick }: { title: string; onClick: () => void }`). Extract to a named `type` or `interface` when props exceed 3 fields or are reused.
- **State management**: Use React Server Components for server state. Use React `useState`/`useReducer` for local client state. No global state library unless complexity demands it — justify in a plan document first.
- **Error boundaries**: Every route segment MUST have an `error.tsx` fallback.
- **Loading states**: Use `loading.tsx` for route-level suspense. Use `Suspense` boundaries for component-level loading.

### Cloudflare Workers Integration

- Edge-compatible code only: no Node.js-specific APIs (`fs`, `path`, `child_process`) in Workers-targeted code.
- Use the Cloudflare Workers runtime for middleware, API routes that benefit from edge execution, and scheduled tasks.
- Environment variables in Workers MUST be managed via `wrangler.toml` or Cloudflare dashboard — never hardcoded.

### Supabase Integration

- Use `@supabase/ssr` for server-side Supabase client creation in Next.js.
- Database types MUST be generated from Supabase schema using `supabase gen types typescript` and stored in `types/database.ts`.
- Row Level Security (RLS) MUST be enabled on all tables. Application logic MUST NOT bypass RLS.
- Realtime subscriptions (if used) MUST be cleaned up in component unmount (`useEffect` cleanup).

## Development Workflow

### Branch Strategy

- `main` — production-ready, protected
- `feature/*` — feature branches from `main`
- `fix/*` — bug fix branches from `main`

### Commit Convention

Follow Conventional Commits format:

```
<type>(<scope>): <description>

Types: feat, fix, refactor, style, test, docs, chore, perf
Scope: feature name or component area
```

### Code Review Requirements

- All changes MUST be submitted via Pull Request.
- PRs MUST pass linting (`eslint`), type checking (`tsc --noEmit`), and all tests before review.
- PRs MUST include a clear description of changes and link to related design specs or tasks.
- Reviewer MUST verify constitution compliance (clean code, responsive, secure, tested).

### Quality Gates

| Gate | Tool | Requirement |
|------|------|-------------|
| Linting | ESLint 9 + next config | Zero errors |
| Type checking | TypeScript strict | Zero errors |
| Tests | Vitest / Jest | All pass |
| Security | npm audit | No high/critical vulnerabilities |
| Build | next build | Successful |

## Governance

This constitution is the single source of truth for all development decisions in the SSA 2025 EX project. It supersedes conflicting guidance in any other document.

- **Amendments**: Any change to this constitution MUST be documented with a version bump, rationale, and reviewed by the team lead before merging.
- **Versioning**: Follows semantic versioning — MAJOR for principle removals/redefinitions, MINOR for new sections/expansions, PATCH for clarifications/typos.
- **Compliance**: All Pull Requests and code reviews MUST verify adherence to this constitution. Non-compliance MUST be flagged and resolved before merge.
- **Exceptions**: If a principle cannot be followed for a justified technical reason, the exception MUST be documented in the relevant plan document with rationale and the alternative approach rejected.
- **Runtime guidance**: Use `.momorph/guidelines/` for supplementary guidelines that do not override this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-04-16 | **Last Amended**: 2026-04-16
