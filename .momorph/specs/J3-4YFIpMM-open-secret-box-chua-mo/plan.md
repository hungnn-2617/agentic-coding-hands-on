# Implementation Plan: Open Secret Box (Unopened State)

**Frame**: `J3-4YFIpMM-open-secret-box-chua-mo`
**Date**: 2026-04-22
**Spec**: `specs/J3-4YFIpMM-open-secret-box-chua-mo/spec.md`

---

## Summary

Build a modal component for the Secret Box gamification feature. Users can open mystery boxes to receive random badge rewards. The modal displays the unopened box count, a clickable gift box image with glow effects, and transitions to a badge reveal state upon opening. Server-side badge randomization ensures fair probability distribution.

**Key Technical Approach:**
- Reuse existing modal patterns from `sunner-search-modal.tsx`
- Pure CSS animations (no framer-motion) for box glow, shake, and reveal
- Supabase API route for secure server-side badge randomization
- Integration with existing i18n system via `useLanguage()` hook

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 16 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, Supabase SSR
**Database**: Supabase (PostgreSQL)
**Testing**: Vitest (unit), Playwright (e2e)
**State Management**: React useState/useReducer (local component state)
**API Style**: REST (Next.js API Routes)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

### I. Clean Code & Clear Organization
- [x] File names use kebab-case (`secret-box-modal.tsx`, `use-secret-box.ts`)
- [x] Components use PascalCase (`SecretBoxModal`, `GiftBox`, `CountDisplay`)
- [x] Hooks prefixed with `use` (`useSecretBox`)
- [x] Feature self-contained in `components/secret-box/`
- [x] Shared utilities in `lib/services/` — not duplicated
- [x] Imports use `@/*` path alias
- [x] File length <300 lines (modal may need splitting if exceeded)

### II. Next.js Best Practices (App Router)
- [x] Client components marked with `"use client"` only where needed
- [x] Server-side data fetching via API routes (not in component)
- [x] API routes in `app/api/secret-boxes/` structure
- [x] Images use `next/image` component
- [x] No client-exposed server secrets

### III. Responsive Design (Mobile-First)
- [x] Mobile-first approach: base styles target mobile
- [x] Uses Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- [x] Touch targets ≥44×44px (gift box: 557px, close: 44px click area)
- [x] No fixed pixel widths that cause overflow
- [x] Modal tested at all breakpoints

### IV. Secure Coding Practices (OWASP)
- [x] Server-side validation for box opening
- [x] Auth check in all API routes (`supabase.auth.getUser()`)
- [x] Authorization via RLS policies
- [x] No `dangerouslySetInnerHTML`
- [x] Badge randomization server-side (prevent manipulation)
- [x] Error responses hide implementation details
- [x] Rate limiting to prevent abuse

### V. Test-Driven Development (TDD)
- [x] Unit tests for hooks (`use-secret-box.test.ts`)
- [x] Unit tests for service (`secret-box-service.test.ts`)
- [x] Component tests (`*.test.tsx`)
- [x] Tests mock Supabase, don't hit real DB
- [x] Test files co-located in `__tests__/` folders

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | N/A | N/A |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based (`components/secret-box/`)
  - `SecretBoxModal.tsx` — Main modal container
  - `GiftBox.tsx` — Interactive gift box with animations
  - `CountDisplay.tsx` — Unopened count display
  - `Divider.tsx` — Reuse or create simple divider component

- **Styling Strategy**: Tailwind utilities with CSS variables from design-style.md
  - Custom animations in `app/globals.css`
  - Use existing theme colors: `--color-saa-bg-page`, `--color-saa-text-gold`

- **Data Fetching**:
  - Initial count: Fetch on modal open via API route
  - Box opening: POST request with optimistic UI update (revert on error)

- **State Management**: Local `useState` + `useReducer` pattern
  ```typescript
  type ModalState = {
    isOpen: boolean;
    isLoading: boolean;      // Initial count fetch
    isOpening: boolean;      // Box opening in progress
    unopenedCount: number;
    error: string | null;
    revealedBadge: Badge | null;
  };
  ```

### Backend Approach

- **API Design**: RESTful endpoints in `app/api/secret-boxes/`
  - `GET /api/secret-boxes/count` — Returns user's unopened box count
  - `POST /api/secret-boxes/open` — Opens a box, returns random badge
  - `GET /api/badges` — List all available badges (for cache/preload, optional)

- **Data Access**: Supabase client via `lib/supabase/server.ts`
  - RLS policies for user-scoped access
  - Server-side badge probability calculation

- **Validation**:
  - Auth check via `supabase.auth.getUser()`
  - Box ownership validation before opening
  - Rate limiting (1 open per 500ms debounce)

### Integration Points

- **Existing Services**:
  - `lib/supabase/server.ts` — Database client
  - `lib/i18n/` — Translation system
  - `sonner` — Toast notifications

- **Shared Components**:
  - Modal overlay pattern from `sunner-search-modal.tsx`
  - Button styling from `CTAButtons`
  - Icon component for close button (existing icon set)

- **API Contracts**:
  ```typescript
  // GET /api/secret-boxes/count
  interface CountResponse {
    unopened_count: number;
  }
  interface CountErrorResponse {
    error: string;
    code: 'UNAUTHORIZED' | 'SERVER_ERROR';
  }

  // POST /api/secret-boxes/open
  interface OpenRequest { } // empty, uses session
  interface OpenResponse {
    success: true;
    badge: { id: string; name: string; image_url: string; };
    remaining_count: number;
  }
  interface OpenErrorResponse {
    success: false;
    error: string;
    code: 'UNAUTHORIZED' | 'NO_BOXES' | 'RATE_LIMITED' | 'SERVER_ERROR';
  }

  // GET /api/badges (optional - for preloading badge images)
  interface BadgesResponse {
    badges: Array<{ id: string; name: string; image_url: string; }>;
  }
  ```

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/J3-4YFIpMM-open-secret-box-chua-mo/
├── spec.md              # Feature specification ✓
├── design-style.md      # Design tokens ✓
├── plan.md              # This file ✓
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Reference screenshot ✓
```

### Source Code (affected areas)

```text
# Frontend Components
components/
├── secret-box/
│   ├── secret-box-modal.tsx      # Main modal component (client)
│   ├── gift-box.tsx              # Interactive gift box (client)
│   ├── count-display.tsx         # Unopened count display (client)
│   ├── modal-header.tsx          # Title + Close button row (client)
│   ├── instruction-text.tsx      # Conditional instruction (client)
│   └── __tests__/
│       ├── secret-box-modal.test.tsx
│       ├── gift-box.test.tsx
│       ├── count-display.test.tsx
│       └── modal-header.test.tsx
├── ui/
│   └── divider.tsx               # Reusable divider (if not exists)
└── icons/
    └── close-icon.tsx            # Close button icon (may exist)

# Hooks
hooks/
├── use-secret-box.ts             # Modal state management hook
└── __tests__/
    └── use-secret-box.test.ts    # Unit tests for hook

# API Routes
app/
└── api/
    └── secret-boxes/
        ├── count/
        │   └── route.ts          # GET: Fetch unopened count
        ├── open/
        │   └── route.ts          # POST: Open a box
        └── badges/
            └── route.ts          # GET: List all badges (optional)

# Services
lib/
└── services/
    ├── secret-box-service.ts     # Business logic (randomization, validation)
    └── __tests__/
        └── secret-box-service.test.ts  # Unit tests for service

# Types
types/
└── secret-box.ts                 # TypeScript interfaces

# i18n
lib/
└── i18n/
    └── locales/
        ├── vi.ts                 # Add Vietnamese keys
        └── en.ts                 # Add English keys

# Assets
public/
└── images/
    └── secret-box/
        ├── gift-box.svg          # Gift box image (from Figma)
        ├── glow-effect.png       # Glow overlay (from Figma)
        └── close-icon.svg        # Close button (from Figma)

# Styles (append to existing)
app/
└── globals.css                   # Add keyframe animations
```

### Modified Files (existing files requiring changes)

| File | Change Description |
|------|-------------------|
| `app/globals.css` | Add 4 keyframe animations: `glow-pulse`, `box-shake`, `modal-enter`, `modal-exit`, `count-pop` |
| `lib/i18n/locales/vi.ts` | Add `secretBox` translation keys |
| `lib/i18n/locales/en.ts` | Add `secretBox` translation keys |
| `types/database.ts` | Regenerate after migration (Supabase types) |

---

## Implementation Strategy

### Phase 0: Asset Preparation

1. Download media assets from Figma:
   - `1466:7679` → Close icon SVG
   - `1466:7686` → Gift box SVG
   - `1466:7685` → Glow effect PNG
2. Save to `public/images/secret-box/`
3. Verify image quality and optimize if needed

### Phase 1: Foundation (Types, API, Animations)

**Goal**: Establish types, backend API, and CSS animations

1. **Types** (`types/secret-box.ts`)
   - `SecretBox`, `Badge`, `UserBadge` interfaces
   - API request/response types
   - Modal state type

2. **API Routes**
   - `app/api/secret-boxes/count/route.ts` — GET count
   - `app/api/secret-boxes/open/route.ts` — POST open (with server-side randomization)

3. **Service Layer** (`lib/services/secret-box-service.ts`)
   - `getUserUnopenedCount(userId: string)` — single query, <100ms
   - `openSecretBox(userId: string)` — returns badge based on probability
     - **Must complete in <2 seconds** (TR-001 compliance)
     - Uses database transaction for atomicity (TR-003):
       1. BEGIN transaction
       2. SELECT unopened box (with FOR UPDATE lock)
       3. UPDATE box set opened_at
       4. INSERT user_badge
       5. COMMIT
     - Rollback on any failure
   - Badge probability weights: Stay Gold (30), Flow to Horizon (25), Beyond the Boundary (10), Root Further (5), Touch of Light (20), Revival (10)
   - Weighted random selection algorithm:
     ```typescript
     function selectBadge(badges: Badge[]): Badge {
       const totalWeight = badges.reduce((sum, b) => sum + b.probability_weight, 0);
       let random = Math.random() * totalWeight;
       for (const badge of badges) {
         random -= badge.probability_weight;
         if (random <= 0) return badge;
       }
       return badges[badges.length - 1]; // fallback
     }
     ```

4. **CSS Animations** (append to `app/globals.css`)
   - `@keyframes glow-pulse` — continuous glow animation
   - `@keyframes box-shake` — loading state shake
   - `@keyframes modal-enter` / `modal-exit` — modal transitions
   - `@keyframes count-pop` — count update animation

5. **i18n Keys** (add to both `vi.ts` and `en.ts`)
   ```typescript
   // lib/i18n/locales/vi.ts
   secretBox: {
     title: 'KHÁM PHÁ SECRET BOX CỦA BẠN',
     instruction: 'Click vào box để mở',
     countLabel: 'Secretbox chưa mở',
     closeAria: 'Đóng',
     boxAria: 'Mở Secret Box',
     badgeRevealed: '{badgeName} đã được mở!',  // Screen reader announcement
     error: {
       network: 'Không thể mở hộp. Vui lòng thử lại.',
       noBoxes: 'Bạn không còn Secret Box nào.',
     },
   },

   // lib/i18n/locales/en.ts
   secretBox: {
     title: 'DISCOVER YOUR SECRET BOX',
     instruction: 'Click the box to open',
     countLabel: 'Unopened Secretbox',
     closeAria: 'Close',
     boxAria: 'Open Secret Box',
     badgeRevealed: '{badgeName} has been revealed!',
     error: {
       network: 'Unable to open box. Please try again.',
       noBoxes: 'You have no Secret Boxes remaining.',
     },
   },
   ```

### Phase 2: Core Components (US1 - Open a Secret Box)

**Goal**: Implement the primary interaction — clicking to open a box

1. **GiftBox Component** (`components/secret-box/gift-box.tsx`)
   ```typescript
   interface GiftBoxProps {
     isDisabled: boolean;
     isOpening: boolean;
     onClick: () => void;
   }
   ```
   - Display gift box image (`next/image`) with glow overlay
   - Handle click events (pass to parent, debounce in hook)
   - States (via Tailwind classes):
     - Default: `cursor-pointer`
     - Hover: `hover:scale-[1.02]`
     - Active: `active:scale-[0.98]`
     - Disabled: `opacity-60 grayscale-[30%] cursor-not-allowed`
     - Loading: `animate-[box-shake_0.5s_ease-in-out_infinite]`
   - Accessibility: `role="button"`, `aria-label={t('secretBox.boxAria')}`, `tabIndex={0}`
   - Keyboard: `onKeyDown` for Enter/Space

2. **CountDisplay Component** (`components/secret-box/count-display.tsx`)
   ```typescript
   interface CountDisplayProps {
     count: number;
     isAnimating?: boolean;
   }
   ```
   - Format logic: `count > 99 ? '99+' : count.toString().padStart(2, '0')`
   - Layout: flex row, label LEFT, number RIGHT (per design-style.md)
   - Animate on count change: `animate-[count-pop_0.2s_ease-out]`

3. **ModalHeader Component** (`components/secret-box/modal-header.tsx`)
   ```typescript
   interface ModalHeaderProps {
     onClose: () => void;
   }
   ```
   - Title text from i18n: `t('secretBox.title')`
   - Close button: 19×19px icon, `aria-label={t('secretBox.closeAria')}`
   - Position: relative container with absolute close button

4. **InstructionText Component** (`components/secret-box/instruction-text.tsx`)
   ```typescript
   interface InstructionTextProps {
     isVisible: boolean;
   }
   ```
   - Conditional render: `if (!isVisible) return null`
   - Text from i18n: `t('secretBox.instruction')`

5. **SecretBoxModal Component** (`components/secret-box/secret-box-modal.tsx`)
   ```typescript
   interface SecretBoxModalProps {
     isOpen: boolean;
     onClose: () => void;
   }
   ```
   - Structure: Backdrop → Modal Container → Header, Divider, Instruction, GiftBox, Divider, Count
   - Uses `useSecretBox` hook for all state/logic
   - Body scroll lock: `useEffect` to set `document.body.style.overflow`
   - Focus trap: `useFocusTrap` or manual implementation
   - Animation: `animate-[modal-enter_0.2s_ease-out]`

6. **useSecretBox Hook** (`hooks/use-secret-box.ts`)
   ```typescript
   interface UseSecretBoxReturn {
     state: ModalState;
     openBox: () => Promise<void>;
     fetchCount: () => Promise<void>;
     resetError: () => void;
   }
   ```
   - `useReducer` for state management
   - API calls via `fetch` to `/api/secret-boxes/*`
   - Debounce: `useRef` to track last open time, reject if <500ms
   - Toast: `toast.error(t('secretBox.error.network'))` on failure
   - Optimistic update: decrement count, rollback on error

### Phase 3: Display & Close (US2, US3)

**Goal**: Count display and modal dismissal

1. **Initial Load**
   - Fetch count when modal opens
   - Show skeleton/loading state during fetch
   - Handle fetch errors gracefully

2. **Close Modal Behavior**
   - X button click
   - Escape key press
   - Backdrop click
   - Return focus to trigger element
   - Body scroll restoration

3. **Count Update Animation**
   - Pop animation when count decreases
   - Smooth transition between states

### Phase 4: Edge Cases (US4 + Error Handling)

**Goal**: Handle zero boxes and error states

1. **Zero Boxes State**
   - Hide instruction text
   - Disable gift box (grayscale, cursor: not-allowed)
   - Show "no boxes" message if appropriate

2. **Error Handling**
   - Network failure: Toast error, re-enable click
   - Server error: Toast error, re-enable click
   - Optimistic update rollback on failure

3. **Rate Limiting**
   - Client-side debounce (500ms between opens)
   - Loading state during API call
   - Prevent double-submission

### Phase 5: Polish (Accessibility, Responsive, Animations)

**Goal**: Production-ready quality

1. **Accessibility** (per spec requirements)
   - Screen reader announcements: `"[Badge name] đã được mở!"` on success
   - Focus management: trap inside modal, restore on close
   - ARIA labels: `aria-label="Đóng"` on close, `aria-label="Mở Secret Box"` on box
   - Visible focus ring: `2px solid #FFEA9E` (per design-style.md)
   - `role="button"` on gift box, `role="dialog"` on modal
   - `aria-disabled="true"` when boxes = 0 or opening in progress

2. **Responsive Design** (mobile-first per constitution)
   - Base (mobile < 640px): `w-[95vw] max-w-[651px]`, title `text-[20px]`, box `max-w-[400px]`
   - `sm:` (≥640px): Same as mobile
   - `md:` (≥768px): `w-[651px]` fixed
   - `lg:` (≥1024px): As designed in Figma

3. **Animation Polish**
   - Smooth modal enter/exit (200ms ease-out)
   - Glow pulse: `animation: glow-pulse 2s ease-in-out infinite`
   - Box shake on loading: `animation: box-shake 0.5s ease-in-out`
   - Count pop: `animation: count-pop 0.2s ease-out` on decrement
   - Badge reveal: coordinate with "Open secret box - đã mở" screens

4. **Performance**
   - Lazy load modal via `dynamic()` with `ssr: false`
   - Use `next/image` for gift box and glow effect assets
   - Debounce gift box clicks (500ms via `useCallback` + `lodash.debounce` or custom)
   - Memoize child components with `React.memo` where appropriate

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Modal ↔ GiftBox ↔ CountDisplay
- [x] **External dependencies**: Supabase API calls
- [x] **Data layer**: Secret box count, badge awarding
- [x] **User workflows**: Open modal → Click box → Receive badge → Close

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Click box → API call → Count update → Toast |
| Service ↔ Service | Yes | Auth check → Box validation → Badge randomization |
| App ↔ External API | Yes | Supabase integration |
| App ↔ Data Layer | Yes | Count fetch, box opening, badge assignment |
| Cross-platform | Yes | Responsive modal at mobile/tablet/desktop |

### Test Environment

- **Environment type**: Local (Vitest for unit), Staging (Playwright for E2E)
- **Test data strategy**: Factory functions for mock data, seeded test user
- **Isolation approach**: Transaction rollback for DB tests, mock Supabase for unit tests

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock | Unit tests should not hit real DB |
| API routes | Mock (msw) | Integration tests mock network layer |
| i18n | Real | Simple strings, no external dependency |
| Toast | Mock (spy) | Verify toast calls without UI |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Modal opens and displays correct count
   - [ ] Click box → Loading state → Badge revealed → Count decremented
   - [ ] Close modal via X button / Escape / Backdrop
   - [ ] Open multiple boxes in sequence

2. **Error Handling**
   - [ ] Network failure during count fetch → Error toast
   - [ ] Network failure during box open → Error toast, count unchanged
   - [ ] 0 boxes → Disabled state, no click action

3. **Edge Cases**
   - [ ] Rapid double-click → Only one API call
   - [ ] 100+ boxes → Displays "99+"
   - [ ] Modal opened while already opening → No duplicate modals

### Tooling & Framework

- **Test framework**: Vitest (unit), Playwright (E2E)
- **Supporting tools**: MSW for API mocking, Testing Library for component tests
- **CI integration**: GitHub Actions runs tests on PR

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| GiftBox component | 90%+ | High |
| useSecretBox hook | 90%+ | High |
| API routes | 85%+ | High |
| Service functions | 90%+ | High |
| Modal integration | 80%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Badge probability manipulation | Low | High | Server-side randomization, RLS policies |
| Rapid consecutive opens (abuse) | Medium | Medium | Client debounce + server rate limit |
| Modal animation jank on mobile | Medium | Low | Test on real devices, use CSS transforms |
| Supabase connection issues | Low | High | Graceful error handling, retry logic |
| Missing badge images | Low | Medium | Fallback placeholder image |

### Estimated Complexity

- **Frontend**: Medium (animations, accessibility, state management)
- **Backend**: Low (simple CRUD with randomization)
- **Testing**: Medium (mocking Supabase, animation timing)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] `design-style.md` extracted from Figma
- [x] Codebase research completed
- [ ] Database tables created (secret_boxes, badges, user_badges)
- [ ] Badge images available (can use placeholders initially)

### External Dependencies

- Supabase project configured with auth
- Badge probability weights confirmed by product team
- Related screen designs (badge reveal state) for transition

### Database Schema (Predicted)

**Migration file**: `supabase/migrations/YYYYMMDDHHMMSS_create_secret_box_tables.sql`

```sql
-- Secret Boxes
CREATE TABLE secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  opened_at TIMESTAMPTZ DEFAULT NULL
);

-- Indexes
CREATE INDEX idx_secret_boxes_user_id ON secret_boxes(user_id);
CREATE INDEX idx_secret_boxes_unopened ON secret_boxes(user_id) WHERE opened_at IS NULL;

-- Badges
CREATE TABLE badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_vi TEXT NOT NULL,        -- Vietnamese name
  name_en TEXT NOT NULL,        -- English name
  image_url TEXT NOT NULL,
  probability_weight INTEGER NOT NULL DEFAULT 10 CHECK (probability_weight > 0)
);

-- User Badges (junction)
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT REFERENCES badges(id) NOT NULL,
  secret_box_id UUID REFERENCES secret_boxes(id) ON DELETE SET NULL,
  earned_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);

-- RLS Policies
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own boxes" ON secret_boxes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can open own boxes" ON secret_boxes
  FOR UPDATE USING (auth.uid() = user_id AND opened_at IS NULL);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view badges" ON badges
  FOR SELECT USING (true);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed badge data
INSERT INTO badges (id, name, name_vi, name_en, image_url, probability_weight) VALUES
  ('stay_gold', 'Stay Gold', 'Stay Gold', 'Stay Gold', '/images/badges/stay-gold.png', 30),
  ('flow_to_horizon', 'Flow to Horizon', 'Flow to Horizon', 'Flow to Horizon', '/images/badges/flow-to-horizon.png', 25),
  ('beyond_the_boundary', 'Beyond the Boundary', 'Beyond the Boundary', 'Beyond the Boundary', '/images/badges/beyond-the-boundary.png', 10),
  ('root_further', 'Root Further', 'Root Further', 'Root Further', '/images/badges/root-further.png', 5),
  ('touch_of_light', 'Touch of Light', 'Touch of Light', 'Touch of Light', '/images/badges/touch-of-light.png', 20),
  ('revival', 'Revival', 'Revival', 'Revival', '/images/badges/revival.png', 10);
```

### Rendering Approach (TR-004)

Per constitution, this modal is a **Client Component** (`"use client"`) because:
- Uses React hooks (`useState`, `useReducer`, `useEffect`)
- Handles user interactions (click, keyboard events)
- Requires browser APIs (focus management, body scroll lock)

**Loading Strategy**:
- Modal is lazy-loaded via `next/dynamic` with `ssr: false`
- Initial count fetched client-side on modal open (not SSR)
- Skeleton placeholder shown during count fetch

---

## Media Assets

Assets identified for download from Figma:

| Node ID | Type | Description | Target Path |
|---------|------|-------------|-------------|
| `1466:7679` | SVG | Close button icon | `public/images/secret-box/close-icon.svg` |
| `1466:7686` | SVG | Gift box image | `public/images/secret-box/gift-box.svg` |
| `1466:7685` | PNG | Glow effect overlay | `public/images/secret-box/glow-effect.png` |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Create** database tables and seed badge data
4. **Download** Figma assets to public folder
5. **Begin** implementation following TDD (test first, then implement)

---

## Notes

- Badge reveal transition will navigate to related screens (`K-LuEblC08`, etc.) — coordinate with those screen implementations
- Consider extracting Modal base component if patterns repeat across features
- Animation timing may need adjustment based on user feedback
- Montserrat font is already configured in project — no additional setup needed
- Reuse existing modal overlay pattern (`bg-[rgba(0,16,26,0.8)]`) for visual consistency
