# Implementation Plan: Floating Action Button (FAB)

**Frame**: `_hphd32jN2-floating-action-button` (collapsed) + `Sv7DFwBw1h-floating-action-button-2` (expanded)
**Date**: 2026-04-20
**Spec**: `specs/_hphd32jN2-floating-action-button/spec.md` + `specs/Sv7DFwBw1h-floating-action-button-2/spec.md`

---

## Summary

Implement a Floating Action Button (FAB) widget that appears on all authenticated pages. It has two visual states:

1. **Collapsed** (default): A pill-shaped button with Pen icon + "/" + SAA icon on a golden background, positioned fixed at bottom-right. Clicking expands it.
2. **Expanded**: Three vertically stacked buttons — "Thể lệ" (rules), "Viết KUDOS" (write), and a red close button. Each navigates to its target or collapses the menu.

This is a **pure client-side UI component** with no API dependencies. Both states are managed as a single React component using local state.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 16 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS v4
**Database**: N/A (no data persistence)
**Testing**: Vitest + React Testing Library
**State Management**: Local `useState` (no global state needed)
**API Style**: N/A (pure UI component)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, `@/*` imports)
- [x] Uses approved libraries and patterns (Tailwind CSS, Next.js hooks, existing icon system)
- [x] Adheres to folder structure guidelines (`components/ui/`, `hooks/`, `app/(main)/layout.tsx`)
- [x] Meets security requirements (no user input, no data exposure)
- [x] Follows testing standards (Vitest + RTL, co-located tests)

**Violations**: None. This feature uses only existing project patterns and dependencies.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Single `FloatingActionButton` component managing both collapsed/expanded states via `useState<boolean>`. No need for separate components per state — the toggle is simple and keeps related logic co-located.
- **Styling Strategy**: Tailwind utility classes using existing CSS variables (`--color-bg-button-primary`, `--shadow-golden-glow`, `--color-text-button`). Custom `@keyframes` in globals.css for expand/collapse stagger animation.
- **Data Fetching**: None. Pure presentational component.
- **Rendering**: `"use client"` directive required (uses `useState`, `useEffect`, `useRef`, event handlers, `usePathname`).

### Backend Approach

N/A — No backend changes required.

### Integration Points

- **Existing Services**: None.
- **Shared Components**:
  - `PenIcon` from `@/components/icons` — already exists (24x24, stroke-based)
  - `SaaSmallIcon` from `@/components/icons` — already exists (20x18, fill-based, SAA star) — used as the "Rules" icon
  - `CloseIcon` from `@/components/icons` — already exists (24x24)
  - `useClickOutside` from `@/hooks/use-click-outside` — reuse for dismiss-on-outside-click
- **API Contracts**: None.

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Single vs dual component | Single `FloatingActionButton` | Both states share position, z-index, and toggle logic — splitting would duplicate this |
| Animation approach | Tailwind utilities + CSS `@keyframes` | Project has no framer-motion; existing pattern uses Tailwind transitions |
| State management | Local `useState` + callback props | FAB owns expanded/collapsed state; modal open is delegated to parent via `onWriteKudo` callback |
| Write Kudo trigger | Callback prop `onWriteKudo` | `WriteKudoModal` is a modal (not a route) requiring `userId`. The `(main)` layout wraps children in a client component that renders both FAB and the modal, sharing state. |
| Thể lệ navigation | `router.push('/the-le')` | Route does **not exist yet**. Plan includes creating a placeholder page. The SCREENFLOW lists "The le (Rules)" as screen `b1Filzi9i6` — a dedicated page. |
| Route collapse detection | `usePathname()` in `useEffect` | Already used in `nav-links.tsx` for route detection |
| Icon reuse | All 3 icons already exist | `PenIcon`, `SaaSmallIcon`, `CloseIcon` — zero new icons needed |
| Placement | `app/(main)/layout.tsx` | Ensures FAB appears on all authenticated pages **and** hides on unauthenticated pages (Login, Countdown use different route groups) |
| Golden glow shadow | `--shadow-golden-glow` CSS variable | Already defined in globals.css — exact match to Figma spec |
| FAB hidden during modals | CSS `z-index` layering | FAB uses `z-50`; modals use `z-[60]` or higher with backdrop — FAB is naturally behind any open modal. No extra state needed. |

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/_hphd32jN2-floating-action-button/
├── spec.md              # Feature specification (collapsed state)
├── design-style.md      # Design tokens & visual specs (collapsed)
├── plan.md              # This file (unified plan for both states)
├── assets/
│   └── frame.png        # Figma screenshot

.momorph/specs/Sv7DFwBw1h-floating-action-button-2/
├── spec.md              # Feature specification (expanded state)
├── design-style.md      # Design tokens & visual specs (expanded)
├── assets/
│   └── frame.png        # Figma screenshot
```

### Source Code (affected areas)

```text
# New Files
components/
└── ui/
    ├── floating-action-button.tsx         # FAB component (collapsed + expanded states)
    ├── main-layout-client.tsx             # Client wrapper for (main) layout — renders FAB + WriteKudoModal
    └── __tests__/
        └── floating-action-button.test.tsx  # Unit tests

app/
└── (main)/
    └── the-le/
        └── page.tsx                       # Placeholder "Thể lệ" (rules) page

# Modified Files
app/
└── (main)/
    └── layout.tsx                         # Wrap children in MainLayoutClient, pass userId

app/
└── globals.css                            # Add FAB expand/collapse keyframes
```

### Dependencies

No new dependencies required. All needed packages are already installed:
- `next/navigation` (usePathname, useRouter)
- `react` (useState, useEffect, useRef, useCallback)
- Existing icons from `@/components/icons`
- Existing `useClickOutside` from `@/hooks`

---

## Implementation Strategy

### Phase 0: Asset Preparation

No external assets needed. All icons already exist in the project:
- `PenIcon` (`components/icons/pen-icon.tsx`) — Write Kudos action
- `SaaSmallIcon` (`components/icons/saa-small-icon.tsx`) — Rules/Thể lệ action
- `CloseIcon` (`components/icons/close-icon.tsx`) — Close/cancel action

Golden glow shadow already defined in `globals.css`:
```css
--shadow-golden-glow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #fae287;
```

### Phase 1: Foundation — Layout Integration & Collapsed State (US1 + US2 from Screen 1)

**Goal**: Render the pill-shaped FAB on all authenticated pages with correct Write Kudo modal integration.

**Files**:
- Create `components/ui/floating-action-button.tsx`
- Create `components/ui/main-layout-client.tsx`
- Modify `app/(main)/layout.tsx`

**Steps**:
1. **Create `MainLayoutClient` wrapper** (`components/ui/main-layout-client.tsx`):
   - `"use client"` component accepting `children` and `userId` props
   - Manages `isWriteKudoOpen` state
   - Renders `{children}` + `<FloatingActionButton onWriteKudo={() => setIsWriteKudoOpen(true)} />` + `<WriteKudoModal isOpen={isWriteKudoOpen} onClose={...} userId={userId} />`
   - This pattern lifts the Write Kudo modal to layout level so FAB can trigger it from any page

2. **Modify `app/(main)/layout.tsx`**:
   - Import `MainLayoutClient`
   - Extract `userId` from the Supabase user object (already fetched)
   - Wrap the `<main>` and FAB in `<MainLayoutClient userId={userId}>` between Header and Footer

3. **Create `FloatingActionButton` component** (`components/ui/floating-action-button.tsx`):
   - `"use client"` directive
   - Props: `onWriteKudo: () => void`
   - Internal state: `const [expanded, setExpanded] = useState(false)`
   - Collapsed state rendering:
     - Fixed position: `fixed bottom-[120px] right-[19px] z-50`
     - Pill shape: `w-[106px] h-16 rounded-full bg-[var(--color-bg-button-primary)]`
     - Shadow: `shadow-[var(--shadow-golden-glow)]`
     - Content: `<PenIcon className="w-6 h-6 text-[#00101A]" />` + `<span>/</span>` (Montserrat 700 24px) + `<SaaSmallIcon className="w-6 h-6 text-[#00101A]" />`
     - Hover: `hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.35),0_0_10px_0_#FAE287]`
     - Active: `active:scale-[0.97]`
     - Focus: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`
     - Click: `onClick={() => setExpanded(true)}`
   - Add `aria-label="Quick actions"`, `role="button"`, `tabIndex={0}`

4. **Handle unauthenticated pages (FR-002)**: Automatically covered — FAB lives in `(main)` route group layout which is only rendered for authenticated routes. Login and Countdown use different route groups.

**Acceptance**: FAB pill visible at bottom-right on all `(main)` routes. Not visible on Login/Countdown.

### Phase 2: Core Feature — Expanded State (US1, US2, US3 from Screen 2)

**Goal**: Expand the FAB into a 3-button action menu on click.

**Steps**:
1. **Implement expanded state** within `FloatingActionButton`:
   - Container: `w-[214px] flex flex-col items-end gap-5` (gap-5 = 20px)
   - "Thể lệ" button: `w-[149px] h-16 rounded bg-[var(--color-bg-button-primary)] p-4 flex items-center gap-2 cursor-pointer`
     - Hover: `hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:brightness-105`
     - Active: `active:scale-[0.98]`
     - Focus: `focus-visible:outline-2 focus-visible:outline-[#00101A] focus-visible:outline-offset-2`
     - Content: `<SaaSmallIcon />` + `<span>Thể lệ</span>` (Montserrat 700 24px)
   - "Viết KUDOS" button: `w-[214px] h-16 rounded bg-[var(--color-bg-button-primary)] p-4 flex items-center gap-2 cursor-pointer`
     - Same hover/active/focus styles as Thể lệ
     - Content: `<PenIcon />` + `<span>Viết KUDOS</span>`
   - Close button: `w-14 h-14 rounded-full bg-[#D4271D] flex items-center justify-center cursor-pointer`
     - Hover: `hover:bg-[#B8221A] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]`
     - Active: `active:scale-[0.95]` (note: 0.95 per design-style, not 0.98)
     - Focus: `focus-visible:outline-2 focus-visible:outline-[#D4271D] focus-visible:outline-offset-2`
     - Content: `<CloseIcon className="w-6 h-6 text-white" />`

2. **Navigation actions**:
   - "Thể lệ" → `router.push('/the-le')` then `setExpanded(false)`
   - "Viết KUDOS" → call `onWriteKudo()` prop (opens the `WriteKudoModal` managed by `MainLayoutClient`) then `setExpanded(false)`
   - Close → `setExpanded(false)`

3. **Dismiss behaviors**:
   - **Outside click**: Reuse `useClickOutside(containerRef, () => setExpanded(false))`
   - **Escape key**: `useEffect` adding `keydown` listener → `if (e.key === 'Escape') setExpanded(false)`
   - **Route change**: `useEffect` watching `usePathname()` → collapse when pathname changes
   - **Focus-out (FR-010)**: `onBlur` handler on the container with `relatedTarget` check — if focus moves outside the FAB container, collapse. Use `onFocusCapture`/`onBlurCapture` on the container `<div>` and check `containerRef.current.contains(e.relatedTarget)`.

4. **Keyboard accessibility (TR-003)**:
   - Set `role="menu"` on expanded container, `role="menuitem"` on each button
   - Auto-focus first button ("Thể lệ") when expanded
   - Tab through: Thể lệ → Viết KUDOS → Close → (collapse on Tab past Close, per FR-010)
   - Enter/Space activates each button

5. **Create placeholder Thể lệ page** (`app/(main)/the-le/page.tsx`):
   - Minimal server component: heading "Thể lệ" + "Coming soon" placeholder
   - Metadata export with title "Thể lệ - SAA 2025"
   - This page will be fully implemented when the Thể lệ spec (screen `b1Filzi9i6`) is planned

**Acceptance**: FAB expands to show 3 buttons. "Viết KUDOS" opens Write Kudo modal from any page. "Thể lệ" navigates to `/the-le`. Dismiss works via close button, outside-click, Escape, route-change, and focus-out.

### Phase 3: Animation & Polish

**Goal**: Smooth expand/collapse transitions matching design-style specs (300ms total).

**Steps**:
1. Add custom keyframes to `app/globals.css`:
   ```css
   @keyframes fab-slide-in {
     from { opacity: 0; transform: translateY(8px); }
     to { opacity: 1; transform: translateY(0); }
   }
   @keyframes fab-slide-out {
     from { opacity: 1; transform: translateY(0); }
     to { opacity: 0; transform: translateY(8px); }
   }
   ```

2. **Expand animation** (per design-style):
   - Container: `opacity 0→1, scale 0.95→1` over 250ms ease-out
   - "Thể lệ" button: `fab-slide-in 200ms ease-out` (delay: 0ms)
   - "Viết KUDOS" button: `fab-slide-in 200ms ease-out` (delay: 50ms)
   - Close button: `fab-slide-in 200ms ease-out` (delay: 100ms)
   - Total: ~300ms

3. **Collapse animation** (per design-style — reverse stagger):
   - Close button slides out first (delay: 0ms)
   - "Viết KUDOS" slides out (delay: 50ms)
   - "Thể lệ" slides out last (delay: 100ms)
   - Container: `scale 1→0.95, opacity 1→0` over 250ms
   - Total: ~250ms
   - Implementation: Use a `closing` state (`useState`) — set `closing=true`, wait 250ms via `setTimeout`, then set `expanded=false` + `closing=false`

4. **Hover transitions**: `transition-all duration-150 ease-in-out` on all interactive elements

5. **Press feedback** (per design-style):
   - Collapsed pill: `active:scale-[0.97]`
   - Action buttons (Thể lệ, Viết KUDOS): `active:scale-[0.98]`
   - Close button: `active:scale-[0.95]` (different per design-style)

**Acceptance**: Expand animation 300ms, collapse animation 250ms. Staggered button appearance. Hover and press states responsive.

### Phase 4: Responsive & Edge Cases

**Goal**: Ensure FAB works across all viewports and edge cases.

**Steps**:
1. **Mobile responsive adjustments** (per design-style breakpoints):
   - Mobile (<640px): `bottom-20 right-4` (bottom: 80px, right: 16px)
   - Tablet (640-1023px): `sm:bottom-[100px] sm:right-4`
   - Desktop (1024px+): `lg:bottom-[120px] lg:right-[19px]`
   - Verify 106x64px pill meets 44x44px touch target (it does — exceeds minimum)
   - Expanded buttons on mobile: keep same dimensions (214px max width fits in 320px viewport with 16px right margin)

2. **FAB behind modals (FR-006)**: Already handled by z-index layering:
   - FAB: `z-50`
   - `WriteKudoModal` overlay: `fixed inset-0 z-50` with `bg-[rgba(0,16,26,0.8)]` backdrop (existing pattern in `write-kudo-modal.tsx`)
   - The backdrop covers the FAB. Additionally, when `WriteKudoModal` opens via `onWriteKudo`, the FAB collapses (expanded=false) before the modal opens — so it's the small pill behind the backdrop.
   - Other overlays (notification, profile dropdown): use `z-[60]`+ — FAB stays below.

3. **Rapid expand/collapse**: The closing animation uses a `closing` state flag. If user clicks during closing animation, ignore the click (guard: `if (closing) return`). No race conditions.

4. **Performance (TR-001)**: FAB is a simple component with no data fetching, no heavy computation, no dynamic imports. Render time is inherently under 100ms. No special optimization needed.

**Acceptance**: FAB renders correctly on mobile (320px+), tablet, and desktop. No visual glitches on rapid toggling. FAB visually hidden behind modal backdrops.

### Phase 5: Testing

**Goal**: Unit tests covering all FAB behavior.

**Steps**:
1. Create `components/ui/__tests__/floating-action-button.test.tsx`
2. Mock `next/navigation` (`usePathname`, `useRouter`)
3. Test cases:

   **Collapsed state:**
   - Renders collapsed pill by default with PenIcon, "/" divider, SaaSmallIcon
   - Has `aria-label="Quick actions"` and `role="button"`
   - Expands to 3 buttons on click

   **Expanded state:**
   - Shows "Thể lệ", "Viết KUDOS", Close buttons with correct labels
   - Has `role="menu"` on container, `role="menuitem"` on buttons
   - Collapses on close button click
   - Collapses on Escape key press
   - Collapses on outside click (mousedown outside container)
   - Collapses on focus-out (Tab past last button, FR-010)
   - "Viết KUDOS" calls `onWriteKudo` callback (NOT router.push)
   - "Thể lệ" calls `router.push('/the-le')`
   - Auto-focuses first button when expanded

   **Keyboard navigation:**
   - Tab cycles through expanded buttons in order
   - Enter/Space activates each button

**Acceptance**: All tests pass. All functional requirements (FR-001 through FR-010 from both specs) covered.

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: FAB ↔ Layout, FAB ↔ Router
- [ ] **External dependencies**: None
- [ ] **Data layer**: None
- [x] **User workflows**: Expand → Click action → Navigate

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Toggle state, keyboard navigation, focus trap |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Mobile/desktop responsiveness |

### Test Environment

- **Environment type**: Local (jsdom via Vitest)
- **Test data strategy**: N/A (no data)
- **Isolation approach**: Fresh render per test (React Testing Library `render`)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `next/navigation` (usePathname, useRouter) | Mock | Standard Next.js testing pattern |
| Icons (PenIcon, SaaSmallIcon, CloseIcon) | Real | Simple SVG components, no side effects |
| `useClickOutside` hook | Real | Simple DOM event hook, works in jsdom |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Renders collapsed pill with correct icons and divider
   - [x] Expands to 3 buttons on pill click
   - [x] "Viết KUDOS" button calls `onWriteKudo` callback (opens modal)
   - [x] "Thể lệ" button calls `router.push('/the-le')`
   - [x] Close button collapses back to pill

2. **Error Handling**
   - [x] Graceful behavior on rapid expand/collapse toggling (guard via `closing` state)

3. **Edge Cases**
   - [x] Escape key collapses expanded menu
   - [x] Outside click collapses expanded menu
   - [x] Route change collapses expanded menu
   - [x] Focus-out collapses expanded menu (FR-010)
   - [x] Keyboard Tab navigates through expanded buttons
   - [x] ARIA attributes present on all interactive elements (`role="menu"`, `role="menuitem"`, `aria-label`)

### Tooling & Framework

- **Test framework**: Vitest 4.1.4 + @testing-library/react 16.3.2
- **Supporting tools**: @testing-library/jest-dom for assertions
- **CI integration**: Existing Vitest CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Toggle logic (expand/collapse) | 95%+ | High |
| Navigation actions | 90%+ | High |
| Keyboard/accessibility | 85%+ | High |
| Animation classes | 70%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| FAB overlaps with page content on mobile | Low | Medium | Responsive positioning with breakpoint-specific bottom/right values |
| FAB visible during modal overlay (z-index conflict) | Low | Low | z-index layering: FAB=z-50, modals=z-50+ with backdrop. FAB collapses before modal opens. |
| Expand animation jank on low-end devices | Low | Low | Use CSS transforms (GPU-accelerated), avoid layout-triggering properties |
| Route change detection misses programmatic navigation | Low | Medium | `usePathname()` covers both link clicks and `router.push()` |
| `MainLayoutClient` breaks existing `sun-kudos` Write Kudo button | Medium | Medium | `sun-kudos/client.tsx` currently renders its own `WriteKudoModal`. After this change, either: (a) remove it from sun-kudos and use the layout-level modal, or (b) keep both but ensure only one is open at a time. Prefer (a) for simplicity. |
| Thể lệ placeholder page may confuse users | Low | Low | Page clearly indicates "Coming soon" and will be replaced when Thể lệ spec is implemented |

### Estimated Complexity

- **Frontend**: Low — Single component, well-defined states, existing patterns to follow
- **Backend**: None
- **Testing**: Low — Pure UI, no async data fetching, predictable behavior

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (both screens)
- [x] `design-style.md` completed (both screens)
- [x] Codebase research completed (all icons exist, hooks available, layout ready)
- [ ] API contracts defined — N/A (pure UI)
- [ ] Database migrations planned — N/A

### External Dependencies

None. All required assets and patterns already exist in the codebase.

---

## File Change Summary

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `components/ui/floating-action-button.tsx` | FAB component (collapsed + expanded states, accepts `onWriteKudo` callback) |
| **Create** | `components/ui/main-layout-client.tsx` | Client wrapper for `(main)` layout — renders FAB + `WriteKudoModal`, manages modal state |
| **Create** | `app/(main)/the-le/page.tsx` | Placeholder "Thể lệ" rules page (to be fully implemented with its own spec later) |
| **Create** | `components/ui/__tests__/floating-action-button.test.tsx` | Unit tests for FAB |
| **Modify** | `app/(main)/layout.tsx` | Wrap content in `<MainLayoutClient>`, pass `userId` prop |
| **Modify** | `app/globals.css` | Add `@keyframes fab-slide-in` and `fab-slide-out` |

**Total**: 4 new files, 2 modified files.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → 5)

---

## Notes

- Both FAB screens (`_hphd32jN2` collapsed + `Sv7DFwBw1h` expanded) are implemented as a **single component** because they represent two states of the same widget. The plan covers both screens together.
- All 3 required icons (`PenIcon`, `SaaSmallIcon`, `CloseIcon`) already exist in the project — zero new icon creation needed.
- The golden glow shadow (`--shadow-golden-glow`) is already defined in `globals.css` and matches the Figma spec exactly.
- Montserrat font at weight 700 is already configured via `next/font/google` in `app/layout.tsx`.
- The `useClickOutside` hook at `hooks/use-click-outside.ts` can be directly reused for dismiss-on-outside-click.
- **Navigation targets resolved**:
  - "Viết KUDOS" → Opens `WriteKudoModal` via `onWriteKudo` callback (existing modal at `components/write-kudo/write-kudo-modal.tsx`). It requires `userId` prop, which is supplied by `MainLayoutClient`.
  - "Thể lệ" → `router.push('/the-le')`. Route does not exist yet — a placeholder page is created in Phase 2. Full implementation will follow the Thể lệ spec (screen `b1Filzi9i6`).
- The `MainLayoutClient` pattern (client wrapper around server layout content) is established to share Write Kudo modal state between FAB and any future trigger point. It also allows the `sun-kudos` page to reuse the same modal instance instead of rendering its own.
