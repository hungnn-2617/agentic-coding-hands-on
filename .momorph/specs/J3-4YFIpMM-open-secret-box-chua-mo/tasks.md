# Tasks: Open Secret Box (Unopened State)

**Frame**: `J3-4YFIpMM-open-secret-box-chua-mo`
**Prerequisites**: plan.md (✓), spec.md (✓), design-style.md (✓)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download assets and prepare project structure

- [ ] T001 [P] Create feature directory structure | components/secret-box/
- [ ] T002 [P] Download close icon SVG from Figma (node 1466:7679) | public/images/secret-box/close-icon.svg
- [ ] T003 [P] Download gift box SVG from Figma (node 1466:7686) | public/images/secret-box/gift-box.svg
- [ ] T004 [P] Download glow effect PNG from Figma (node 1466:7685) | public/images/secret-box/glow-effect.png
- [ ] T005 Verify and optimize downloaded assets | public/images/secret-box/

**Checkpoint**: Assets ready for implementation

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Types

- [ ] T006 Create TypeScript interfaces (SecretBox, Badge, UserBadge, API types, ModalState) | types/secret-box.ts

### Database

- [ ] T007 Create database migration for secret_boxes, badges, user_badges tables | supabase/migrations/YYYYMMDDHHMMSS_create_secret_box_tables.sql
- [ ] T008 Seed badge data with probability weights | supabase/migrations/YYYYMMDDHHMMSS_create_secret_box_tables.sql
- [ ] T009 Regenerate Supabase types after migration | types/database.ts

### API Routes

- [ ] T010 [P] Create GET /api/secret-boxes/count route | app/api/secret-boxes/count/route.ts
- [ ] T011 [P] Create POST /api/secret-boxes/open route with transaction logic | app/api/secret-boxes/open/route.ts
- [ ] T012 [P] (Optional) Create GET /api/badges route for preloading | app/api/secret-boxes/badges/route.ts

### Service Layer

- [ ] T013 Create secret-box-service with getUserUnopenedCount() | lib/services/secret-box-service.ts
- [ ] T014 Implement openSecretBox() with weighted random selection algorithm | lib/services/secret-box-service.ts
- [ ] T015 Write unit tests for secret-box-service | lib/services/__tests__/secret-box-service.test.ts

### CSS Animations

- [ ] T016 Add @keyframes glow-pulse animation | app/globals.css
- [ ] T017 [P] Add @keyframes box-shake animation | app/globals.css
- [ ] T018 [P] Add @keyframes modal-enter/modal-exit animations | app/globals.css
- [ ] T019 [P] Add @keyframes count-pop animation | app/globals.css

### i18n

- [ ] T020 [P] Add secretBox translation keys (Vietnamese) | lib/i18n/locales/vi.ts
- [ ] T021 [P] Add secretBox translation keys (English) | lib/i18n/locales/en.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Open a Secret Box (Priority: P1) 🎯 MVP

**Goal**: User can click on the gift box image to reveal a random badge reward

**Independent Test**: User with at least 1 unopened Secret Box can click the box and receive a badge

### Tests First (TDD)

- [ ] T022 [P] [US1] Write unit tests for GiftBox component | components/secret-box/__tests__/gift-box.test.tsx
- [ ] T023 [P] [US1] Write unit tests for useSecretBox hook | hooks/__tests__/use-secret-box.test.ts

### Components (US1)

- [ ] T024 [US1] Create GiftBox component with click handling | components/secret-box/gift-box.tsx
- [ ] T025 [US1] Implement glow overlay and animation states | components/secret-box/gift-box.tsx
- [ ] T026 [US1] Add keyboard accessibility (Enter/Space) | components/secret-box/gift-box.tsx

### Hook (US1)

- [ ] T027 [US1] Create useSecretBox hook with useReducer | hooks/use-secret-box.ts
- [ ] T028 [US1] Implement openBox() with debounce and optimistic update | hooks/use-secret-box.ts
- [ ] T029 [US1] Add toast notification on error | hooks/use-secret-box.ts

### Integration (US1)

- [ ] T030 [US1] Write integration test for box opening flow | components/secret-box/__tests__/secret-box-modal.test.tsx

**Checkpoint**: User Story 1 complete and independently testable

---

## Phase 4: User Story 2 - View Unopened Box Count (Priority: P2)

**Goal**: User can see how many Secret Boxes they have remaining

**Independent Test**: Display modal shows correct count of unopened boxes fetched from backend

### Tests First (TDD)

- [ ] T031 [P] [US2] Write unit tests for CountDisplay component | components/secret-box/__tests__/count-display.test.tsx

### Components (US2)

- [ ] T032 [US2] Create CountDisplay component with formatting logic | components/secret-box/count-display.tsx
- [ ] T033 [US2] Implement 99+ overflow display | components/secret-box/count-display.tsx
- [ ] T034 [US2] Add count-pop animation on decrement | components/secret-box/count-display.tsx

### Hook Extension (US2)

- [ ] T035 [US2] Implement fetchCount() in useSecretBox | hooks/use-secret-box.ts
- [ ] T036 [US2] Add skeleton loading state during fetch | hooks/use-secret-box.ts

**Checkpoint**: User Story 2 complete

---

## Phase 5: User Story 3 - Close Modal (Priority: P2)

**Goal**: User can close the modal via X button, Escape key, or backdrop click

**Independent Test**: Click close button dismisses the modal

### Tests First (TDD)

- [ ] T037 [P] [US3] Write unit tests for ModalHeader component | components/secret-box/__tests__/modal-header.test.tsx

### Components (US3)

- [ ] T038 [US3] Create ModalHeader component with close button | components/secret-box/modal-header.tsx
- [ ] T039 [US3] Create InstructionText component | components/secret-box/instruction-text.tsx
- [ ] T040 [US3] Create Divider component (if not exists) | components/ui/divider.tsx

### Modal Container (US3)

- [ ] T041 [US3] Create SecretBoxModal main container | components/secret-box/secret-box-modal.tsx
- [ ] T042 [US3] Implement backdrop click to close | components/secret-box/secret-box-modal.tsx
- [ ] T043 [US3] Implement Escape key handler | components/secret-box/secret-box-modal.tsx
- [ ] T044 [US3] Add body scroll lock on open | components/secret-box/secret-box-modal.tsx
- [ ] T045 [US3] Add focus trap inside modal | components/secret-box/secret-box-modal.tsx
- [ ] T046 [US3] Add modal-enter/modal-exit animations | components/secret-box/secret-box-modal.tsx

**Checkpoint**: User Stories 1, 2 & 3 complete

---

## Phase 6: User Story 4 - No Boxes Available State (Priority: P3)

**Goal**: User with 0 unopened boxes sees disabled state

**Independent Test**: User with 0 boxes sees disabled state

### Tests First (TDD)

- [ ] T047 [US4] Write unit tests for zero-box state | components/secret-box/__tests__/secret-box-modal.test.tsx

### Implementation (US4)

- [ ] T048 [US4] Hide instruction text when count is 0 | components/secret-box/instruction-text.tsx
- [ ] T049 [US4] Disable GiftBox click when count is 0 | components/secret-box/gift-box.tsx
- [ ] T050 [US4] Apply disabled styling (grayscale, cursor-not-allowed) | components/secret-box/gift-box.tsx

**Checkpoint**: All user stories complete

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Production-ready quality improvements

### Accessibility

- [ ] T051 [P] Add role="dialog" and aria attributes to modal | components/secret-box/secret-box-modal.tsx
- [ ] T052 [P] Add role="button" and aria-label to GiftBox | components/secret-box/gift-box.tsx
- [ ] T053 [P] Add aria-label to close button | components/secret-box/modal-header.tsx
- [ ] T054 [P] Add screen reader announcement on badge reveal | components/secret-box/secret-box-modal.tsx
- [ ] T055 [P] Add visible focus ring (2px solid #FFEA9E) | components/secret-box/gift-box.tsx

### Responsive Design

- [ ] T056 Implement mobile-first responsive breakpoints | components/secret-box/secret-box-modal.tsx
- [ ] T057 Verify touch targets >= 44x44px | components/secret-box/

### Performance

- [ ] T058 [P] Lazy load modal via next/dynamic with ssr: false | components/secret-box/index.ts
- [ ] T059 [P] Memoize child components with React.memo | components/secret-box/
- [ ] T060 [P] Optimize images with next/image component | components/secret-box/gift-box.tsx

### Error Handling

- [ ] T061 Implement error toast for network failures | hooks/use-secret-box.ts
- [ ] T062 Implement optimistic update rollback | hooks/use-secret-box.ts

### Final Verification

- [ ] T063 Run all unit tests and verify 90%+ coverage | npm run test
- [ ] T064 Run lint check | npm run lint
- [ ] T065 Run type check | npm run type-check
- [ ] T066 Manual testing at all breakpoints (mobile, tablet, desktop)
- [ ] T067 E2E test for complete user flow | e2e/secret-box.spec.ts

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────►
                 │
                 ▼
Phase 2 (Foundation) ────────────────────────────────────────►
                 │ BLOCKS ALL USER STORIES
                 ▼
         ┌───────┴───────┐
         ▼               ▼
   Phase 3 (US1)   Phase 4 (US2)   ◄── Can start in parallel
   🎯 MVP          │                   after Foundation
         │         ▼
         │   Phase 5 (US3)
         │         │
         ▼         ▼
     Phase 6 (US4) ◄── Depends on US1 components
                 │
                 ▼
     Phase 7 (Polish) ◄── All stories must be complete
```

### Within Each Phase

- Tests MUST be written and FAIL before implementation (TDD)
- Types before services
- Services before API routes
- Core components before container components
- Story complete before moving to next priority

### Parallel Opportunities

| Phase | Parallelizable Tasks |
|-------|---------------------|
| Phase 1 | T001-T004 (all assets) |
| Phase 2 | T010-T012 (API routes), T016-T021 (CSS + i18n) |
| Phase 3 | T022-T023 (tests) |
| Phase 4 | T031 (test) |
| Phase 5 | T037 (test) |
| Phase 7 | T051-T055 (a11y), T058-T060 (perf) |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 - Open Box) **← MVP**
3. **STOP and VALIDATE**: Test box opening independently
4. Deploy if ready, continue to Phase 4-6

### Task Count Summary

| Phase | Total Tasks | Parallel Tasks |
|-------|-------------|----------------|
| Phase 1: Setup | 5 | 4 |
| Phase 2: Foundation | 16 | 8 |
| Phase 3: US1 (MVP) | 9 | 2 |
| Phase 4: US2 | 6 | 1 |
| Phase 5: US3 | 10 | 1 |
| Phase 6: US4 | 4 | 0 |
| Phase 7: Polish | 17 | 9 |
| **Total** | **67** | **25** |

---

## Notes

- Commit after each task or logical group
- Run tests before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- Badge reveal transition coordinates with "Open secret box - đã mở" screens
- TR-001: Box opening must complete within 2 seconds (excluding animations)
- TR-003: Database operations must be atomic (use transactions)
