# Tasks: Floating Action Button (FAB)

**Frame**: `_hphd32jN2-floating-action-button` (collapsed) + `Sv7DFwBw1h-floating-action-button-2` (expanded)
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## User Story Mapping

| Story ID | Title | Priority | Source |
|----------|-------|----------|--------|
| US1 | FAB Collapsed State & Expand Toggle | P1 | Screen 1 US1 + US2 |
| US2 | FAB Expanded — Write Kudos + Close/Dismiss | P1 | Screen 2 US1 + US3 |
| US3 | FAB Expanded — Thể Lệ Navigation | P2 | Screen 2 US2 |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add CSS keyframes and verify existing assets

- [x] T001 Add `@keyframes fab-slide-in` and `fab-slide-out` to globals.css for expand/collapse animations | `app/globals.css`
- [x] T002 Verify all required icons are exported from barrel file (`PenIcon`, `SaaSmallIcon`, `CloseIcon`) | `components/icons/index.ts`

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Create the layout-level client wrapper that enables FAB + WriteKudoModal from any page

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create `MainLayoutClient` component — `"use client"` wrapper accepting `children` and `userId` props, managing `isWriteKudoOpen` state, rendering `{children}` + `<FloatingActionButton>` + `<WriteKudoModal>` | `components/ui/main-layout-client.tsx`
- [x] T004 Modify `app/(main)/layout.tsx` — extract `userId` from Supabase user object (already fetched at line 17), import and wrap `<main>` content in `<MainLayoutClient userId={userId}>` between `<MainHeader>` and `<MainFooter>` | `app/(main)/layout.tsx`

**Checkpoint**: Layout integration ready — FAB component can now be built

---

## Phase 3: User Story 1 — FAB Collapsed State & Expand Toggle (Priority: P1) MVP

**Goal**: Display the pill-shaped FAB at bottom-right on all authenticated pages. Clicking it toggles to expanded state.

**Independent Test**: Navigate to any `(main)` route. Verify the golden pill FAB is visible at bottom-right with pen icon, "/" divider, and SAA icon. Click it — verify it switches to expanded view with 3 buttons.

### Frontend (US1)

- [x] T005 [US1] Create `FloatingActionButton` component scaffold — `"use client"` with props `onWriteKudo: () => void`, internal `useState<boolean>(false)` for expanded, `useRef` for container | `components/ui/floating-action-button.tsx`
- [x] T006 [US1] Implement collapsed state rendering — fixed position (`fixed bottom-[120px] right-[19px] z-50`), pill shape (`w-[106px] h-16 rounded-full bg-[var(--color-bg-button-primary)]`), shadow (`shadow-[var(--shadow-golden-glow)]`), content: `<PenIcon>` + "/" span (Montserrat 700 24px `font-montserrat font-bold text-2xl text-[#00101A] leading-8`) + `<SaaSmallIcon>`, flex row with gap-2, padding p-4 | `components/ui/floating-action-button.tsx`
- [x] T007 [US1] Add collapsed state interactions — hover shadow (`hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.35),0_0_10px_0_#FAE287]`), active press (`active:scale-[0.97]`), focus outline (`focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`), transition (`transition-all duration-200 ease-in-out`), `onClick={() => setExpanded(true)}` | `components/ui/floating-action-button.tsx`
- [x] T008 [US1] Add collapsed accessibility attributes — `aria-label="Quick actions"`, `role="button"`, `tabIndex={0}`, `aria-expanded={expanded}` | `components/ui/floating-action-button.tsx`
- [x] T009 [US1] Implement expanded state rendering — container `w-[214px] flex flex-col items-end gap-5`, three buttons: "Thể lệ" (`w-[149px] h-16 rounded bg-[var(--color-bg-button-primary)] p-4 flex items-center gap-2` with `<SaaSmallIcon>` + label span), "Viết KUDOS" (`w-[214px] h-16 rounded` same pattern with `<PenIcon>` + label span), Close (`w-14 h-14 rounded-full bg-[#D4271D] flex items-center justify-center` with `<CloseIcon className="w-6 h-6 text-white">`) | `components/ui/floating-action-button.tsx`
- [x] T010 [US1] Add expanded button interactions — action buttons: `hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#00101A] focus-visible:outline-offset-2`; close button: `hover:bg-[#B8221A] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[#D4271D] focus-visible:outline-offset-2`; all: `transition-all duration-150 ease-in-out cursor-pointer` | `components/ui/floating-action-button.tsx`
- [x] T011 [US1] Add expanded accessibility — container: `role="menu"`, each button: `role="menuitem"`, auto-focus first button ("Thể lệ") when expanded via `useEffect` + `useRef`, label text for each button | `components/ui/floating-action-button.tsx`
- [x] T012 [US1] Implement conditional rendering — render collapsed pill when `!expanded`, render expanded container when `expanded`. Close button sets `setExpanded(false)` | `components/ui/floating-action-button.tsx`

**Checkpoint**: US1 complete — FAB pill visible on all auth pages, toggles to expanded view

---

## Phase 4: User Story 2 — Write Kudos + Close/Dismiss (Priority: P1)

**Goal**: "Viết KUDOS" button opens the WriteKudoModal from any page. All dismiss behaviors work: close button, outside click, Escape, route change, focus-out.

**Independent Test**: Expand FAB, click "Viết KUDOS" — modal opens. Close modal. Expand FAB again, press Escape — collapses. Expand, click outside — collapses. Navigate to another page — collapses.

### Frontend (US2)

- [x] T013 [US2] Wire "Viết KUDOS" button — `onClick` calls `onWriteKudo()` prop then `setExpanded(false)` | `components/ui/floating-action-button.tsx`
- [x] T014 [US2] Wire Close button — `onClick` calls `setExpanded(false)` (already scaffolded in T012, verify) | `components/ui/floating-action-button.tsx`
- [x] T015 [US2] Implement outside-click dismiss — use `useClickOutside(containerRef, () => setExpanded(false))` from `@/hooks/use-click-outside` | `components/ui/floating-action-button.tsx`
- [x] T016 [US2] Implement Escape key dismiss — `useEffect` adding `keydown` listener when expanded, `if (e.key === 'Escape') setExpanded(false)`, cleanup on unmount/collapse | `components/ui/floating-action-button.tsx`
- [x] T017 [US2] Implement route-change collapse — import `usePathname` from `next/navigation`, `useEffect` watching pathname, `useRef` to track previous pathname, collapse when pathname changes | `components/ui/floating-action-button.tsx`
- [x] T018 [US2] Implement focus-out collapse (FR-010) — add `onBlurCapture` handler on expanded container div, check `!containerRef.current?.contains(e.relatedTarget as Node)`, if focus left the container then `setExpanded(false)` | `components/ui/floating-action-button.tsx`
- [x] T019 [US2] Wire WriteKudoModal in MainLayoutClient — pass `isWriteKudoOpen` and `onClose` (resets state) to `<WriteKudoModal>`, pass `onWriteKudo={() => setIsWriteKudoOpen(true)}` to `<FloatingActionButton>`, pass `userId` to modal. Import from `@/components/write-kudo` | `components/ui/main-layout-client.tsx`

**Checkpoint**: US2 complete — Write Kudos modal opens from FAB on any page, all dismiss behaviors functional

---

## Phase 5: User Story 3 — Thể Lệ Navigation (Priority: P2)

**Goal**: "Thể lệ" button navigates to the rules page.

**Independent Test**: Expand FAB, click "Thể lệ" — browser navigates to `/the-le`, FAB collapses.

### Frontend (US3)

- [x] T020 [US3] Wire "Thể lệ" button navigation — import `useRouter` from `next/navigation`, `onClick` calls `router.push('/the-le')` then `setExpanded(false)` | `components/ui/floating-action-button.tsx`
- [x] T021 [US3] Create placeholder Thể lệ page — server component with metadata `title: "Thể lệ - SAA 2025"`, render heading "Thể lệ" + "Coming soon" text, follow existing page patterns | `app/(main)/the-le/page.tsx`

**Checkpoint**: US3 complete — Thể lệ navigation works end-to-end

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Animations, responsive design, edge cases

### Animations

- [x] T022 [P] Implement expand animation — apply `fab-slide-in` keyframes from T001 to each expanded button with staggered delays (Thể lệ: 0ms, Viết KUDOS: 50ms, Close: 100ms) using inline `style={{ animationDelay }}` or Tailwind arbitrary values. Container: `animate-[fab-slide-in_250ms_ease-out]` with scale 0.95→1 | `components/ui/floating-action-button.tsx`
- [x] T023 [P] Implement collapse animation — add `closing` state (`useState<boolean>(false)`), when user triggers collapse: set `closing=true`, apply `fab-slide-out` with reverse stagger (Close: 0ms, Viết KUDOS: 50ms, Thể lệ: 100ms), after 250ms timeout set `expanded=false` + `closing=false`. Guard all expand triggers: `if (closing) return` | `components/ui/floating-action-button.tsx`

### Responsive

- [x] T024 Add responsive position classes — replace fixed bottom/right with responsive: `bottom-20 right-4 sm:bottom-[100px] sm:right-4 lg:bottom-[120px] lg:right-[19px]` (mobile: 80px/16px, tablet: 100px/16px, desktop: 120px/19px per design-style breakpoints) | `components/ui/floating-action-button.tsx`

### Edge Cases

- [x] T025 Handle rapid toggle — add guard in expand/collapse handlers: `if (closing) return` to prevent state conflicts during animation lifecycle | `components/ui/floating-action-button.tsx`

### Testing

- [x] T026 Create unit test file with mocks — setup mock for `next/navigation` (`usePathname` returns `/`, `useRouter` returns mock push fn), render helper for `<FloatingActionButton onWriteKudo={mockFn} />` | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T027 [P] Test collapsed state — renders pill with PenIcon, "/" divider, SaaSmallIcon; has `aria-label="Quick actions"` and `role="button"` | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T028 [P] Test expand/collapse toggle — click pill → 3 buttons appear with correct labels; click close → returns to pill | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T029 [P] Test "Viết KUDOS" action — expand, click "Viết KUDOS" → `onWriteKudo` mock called, FAB collapses | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T030 [P] Test "Thể lệ" action — expand, click "Thể lệ" → `router.push('/the-le')` called, FAB collapses | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T031 [P] Test Escape dismiss — expand, fire `keydown` Escape → FAB collapses | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T032 [P] Test outside click dismiss — expand, fire `mousedown` on document body → FAB collapses | `components/ui/__tests__/floating-action-button.test.tsx`
- [x] T033 [P] Test accessibility attributes — expanded container has `role="menu"`, buttons have `role="menuitem"`, `aria-expanded` toggles correctly | `components/ui/__tests__/floating-action-button.test.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)         → No dependencies, start immediately
Phase 2 (Foundation)    → Depends on Phase 1 — BLOCKS all user stories
Phase 3 (US1: Collapsed + Expand) → Depends on Phase 2
Phase 4 (US2: Write Kudos + Dismiss) → Depends on Phase 3 (expanded state must exist)
Phase 5 (US3: Thể Lệ)  → Depends on Phase 3 (expanded state must exist)
                          Can run in PARALLEL with Phase 4
Phase 6 (Polish)        → Depends on Phase 4 + 5
```

### Within Each User Story

- T005-T008 (collapsed) before T009-T012 (expanded) — collapsed is the default state
- T013-T018 (US2 behaviors) after T009-T012 (expanded rendering exists)
- T020-T021 (US3 navigation) can run in parallel with T013-T018 (different concerns)

### Parallel Opportunities

| Parallel Group | Tasks | Condition |
|---------------|-------|-----------|
| Phase 1 tasks | T001, T002 | Independent files |
| US2 + US3 | Phase 4, Phase 5 | Both depend only on Phase 3, different files/concerns |
| Animation tasks | T022, T023 | Different animation directions |
| Test cases | T027-T033 | Independent test scenarios |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (T001-T004)
2. Complete Phase 3 / US1 (T005-T012)
3. **STOP and VALIDATE**: FAB pill visible on all auth pages, expands to 3 buttons
4. Complete Phase 4 / US2 (T013-T019)
5. **STOP and VALIDATE**: Write Kudos modal opens from FAB, all dismiss behaviors work
6. Deploy MVP (US1 + US2)

### Incremental Delivery

1. Setup + Foundation → T001-T004
2. US1 (Collapsed + Expand) → T005-T012 → Test manually
3. US2 (Write Kudos + Dismiss) → T013-T019 → Test manually
4. US3 (Thể Lệ) → T020-T021 → Test manually
5. Polish (Animations + Responsive) → T022-T025
6. Automated Tests → T026-T033

---

## Notes

- All tasks target a single component file (`floating-action-button.tsx`) except: T001 (globals.css), T003-T004 (MainLayoutClient + layout), T019 (MainLayoutClient), T021 (the-le page), T026-T033 (tests)
- **No new dependencies** needed — all packages already installed
- **3 icons already exist**: `PenIcon`, `SaaSmallIcon`, `CloseIcon` in `components/icons/`
- **Golden glow shadow already defined**: `--shadow-golden-glow` in `globals.css`
- **Montserrat 700 already configured**: via `next/font/google` in `app/layout.tsx`
- **Risk**: `sun-kudos/client.tsx` currently renders its own `WriteKudoModal`. After T019, consider removing the duplicate modal from sun-kudos and using the layout-level instance instead (see plan.md risk assessment).
- Commit after each phase completion
- Mark tasks `[x]` as completed
