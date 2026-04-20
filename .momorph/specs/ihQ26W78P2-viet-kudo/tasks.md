# Task List: Viết Kudo (Write Kudo)

**Feature**: Write Kudo Modal
**Frame**: `ihQ26W78P2-viet-kudo`
**Plan**: `plan.md`
**Spec**: `spec.md` (Reviewed — 3 passes)
**Created**: 2026-04-20
**Total Tasks**: 52

---

## Phase 1: Setup

**Goal**: Install dependencies, create types, configure infrastructure.

- [x] T001 Install npm dependencies: `@tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-character-count @tiptap/extension-placeholder @tiptap/pm sonner isomorphic-dompurify` in `package.json`
- [x] T002 [P] Create Kudo entity types and constants in `types/kudo.ts` — Kudo, CreateKudoPayload, KudoFormState, KudoFormAction, constants: `KUDO_TITLE_MAX_LENGTH=1024`, `KUDO_CONTENT_MAX_LENGTH=1024`, `KUDO_MAX_HASHTAGS=5`, `KUDO_MAX_IMAGES=5`, `KUDO_MAX_IMAGE_SIZE_MB=5`
- [x] T003 [P] Create `kudos` and `hashtags` tables in Supabase with RLS policies, then run `supabase gen types typescript` to regenerate `types/database.ts`
- [x] T004 [P] Add `writeKudo.*` translation keys (~34 keys) to `lib/i18n/types.ts` (TranslationKey union)
- [x] T005 [P] Add Vietnamese translations for all `writeKudo.*` keys in `lib/i18n/locales/vi.ts`
- [x] T006 [P] Add English translations for all `writeKudo.*` keys in `lib/i18n/locales/en.ts`
- [x] T007 [P] Create DOMPurify sanitization wrapper in `lib/utils/sanitize.ts` using `isomorphic-dompurify` — allow bold, italic, strike, list, link, blockquote tags only
- [x] T008 [P] Create Supabase Storage image upload helper in `lib/utils/image-upload.ts` — upload file, get public URL, delete file, validate type/size
- [x] T009 [P] Add `<Toaster />` from sonner to `app/layout.tsx` with custom theme (gold accent #FFEA9E, dark text #00101A, cream bg #FFF8E1)
- [x] T010 [P] Create icon components: `components/icons/bold-icon.tsx`, `italic-icon.tsx`, `strikethrough-icon.tsx`, `numbered-list-icon.tsx`, `link-icon.tsx`, `quote-icon.tsx`, `plus-icon.tsx`, `send-icon.tsx`, `close-icon.tsx`

**Verify**: `tsc --noEmit` passes, i18n keys resolve in both vi/en locales.

---

## Phase 2: Foundational — API Layer

**Goal**: All backend services and route handlers ready before UI work begins.

- [x] T011 Create user search service in `lib/services/user-service.ts` — `searchUsers(query: string, excludeUserId: string)` querying Supabase `profiles` table, excludes current user (self-send blocked)
- [x] T012 [P] Create user search route handler in `app/api/users/search/route.ts` — GET with `?q=` query param, reads session user, passes excludeUserId, returns filtered results
- [x] T013 Create hashtag service in `lib/services/hashtag-service.ts` — `getHashtags()` fetch all + `createHashtag(name: string)` with duplicate check and length validation
- [x] T014 [P] Create hashtag route handler in `app/api/hashtags/route.ts` — GET (fetch all) + POST (create new, auth check, duplicate check)
- [x] T015 Create kudo service in `lib/services/kudo-service.ts` — `createKudo(payload: CreateKudoPayload)` with server-side validation, XSS sanitization via `sanitize.ts`, rejects self-send
- [x] T016 Create kudo route handler in `app/api/kudos/route.ts` — POST with auth check, input validation (required fields, max lengths 1024), sanitization, returns created kudo
- [x] T017 Configure Supabase Storage bucket `kudo-images` — 5MB limit, MIME types: image/jpeg, image/png, image/gif, image/webp, RLS: authenticated users can upload/delete own files

**Verify**: All API routes return correct 200/400/401 responses. Service functions unit-tested.

---

## Phase 3: US1 + US8 — Send Kudo & Danh Hieu (P1)

**Goal**: Modal shell opens, danh hieu field works, form validates and submits. Independently testable: open modal → type title → submit → see toast.

**Independent test**: Open modal, enter danh hieu, attempt submit (should fail on other required fields), verify validation messages appear.

- [x] T018 [US1] Create `useReducer`-based form state hook in `hooks/use-write-kudo.ts` — all 15 state fields, actions: SET_RECIPIENT, SET_TITLE, SET_CONTENT, ADD_HASHTAG, REMOVE_HASHTAG, ADD_IMAGE, REMOVE_IMAGE, SET_ANONYMOUS, SET_ANONYMOUS_NAME, SET_SUBMITTING, SET_ERRORS, RESET
- [x] T019 [US1] Create shared field label component in `components/write-kudo/field-label.tsx` — text + required asterisk (*) in red #CF1322, `aria-required` support, i18n label via `t()` prop
- [x] T020 [US1] Create modal component in `components/write-kudo/write-kudo-modal.tsx` — overlay (bg rgba(0,16,26,0.8)), panel (752px, bg #FFF8E1, r:24px, p:40px, gap:32px), `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Esc close, overlay click close, scroll `max-h-[calc(100vh-40px)] overflow-y-auto`, background scroll lock
- [x] T021 [US8] Create danh hieu field in `components/write-kudo/danh-hieu-field.tsx` — FieldLabel "Danh hiệu *" + text input (p:16px 24px, r:8px, border:#998C5F) + 2-line helper text (#999) + `aria-describedby` for errors + max length 1024
- [x] T022 [US1] Create action bar in `components/write-kudo/action-bar.tsx` — Cancel button (p:16px 40px, r:4px, bg:gold/10%, border:#998C5F, icon:close-icon) + Submit button (flex:1, h:60px, r:8px, bg:#FFEA9E, text:22px/700, icon:send-icon), disabled state (bg:#D4CCA8, color:#999), loading state ("Đang gửi...")
- [x] T023 [US1] Wire form validation in `write-kudo-modal.tsx` — check all required fields (recipient, title, content, hashtags), show red border + error text on invalid fields via `role="alert"`, disable submit button until valid
- [x] T024 [US1] Wire submit flow in `write-kudo-modal.tsx` — POST to `/api/kudos`, show loading state, on success: toast `t('writeKudo.success')` + close modal + call `onSuccess` callback, on error: toast `t('writeKudo.error')` + keep modal open
- [x] T025 [US1] Create barrel export in `components/write-kudo/index.ts`
- [x] T026 [US1] Integrate i18n in all Phase 3 components — all user-facing strings via `t('writeKudo.*')` from `useLanguage()` hook

**Verify**: Modal opens/closes (button, Esc, overlay), focus trapped inside, danh hieu types text with helper below, submit disabled when empty, validation messages appear on attempt, loading spinner on submit.

---

## Phase 4: US2 — Search and Select Recipient (P1)

**Goal**: Searchable dropdown for recipient selection with debounced API. Independently testable: type name → see results → click to select.

**Independent test**: Open modal, type in recipient field, verify dropdown shows filtered results, click to select, verify selection displayed.

- [x] T027 [US2] Create debounced user search hook in `hooks/use-user-search.ts` — accepts query string, debounces 300ms, calls `/api/users/search?q=`, returns `{ results, isLoading, error }`, reused by recipient field and @mention
- [x] T028 [US2] Create recipient field in `components/write-kudo/recipient-field.tsx` — FieldLabel "Người nhận *" + search input (placeholder "Tìm kiếm", dropdown arrow icon) + dropdown results list + empty state "Không tìm thấy kết quả" + selected state (show name in field). ARIA: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, result items with `role="option"`. Keyboard: Arrow Up/Down navigate, Enter selects, Esc closes dropdown.
- [x] T029 [US2] Wire recipient selection into form reducer — SET_RECIPIENT action, clear search query on select, validation: required field

**Verify**: Type to search → results appear after 300ms → click/keyboard select → name shown in field → empty state for no match → validation error if empty on submit.

---

## Phase 5: US3 — Rich Text Editor with Formatting (P1)

**Goal**: TipTap editor with toolbar, @ mentions, character count. Independently testable: type text → use formatting buttons → @mention → see char count.

**Independent test**: Open modal, click Bold, type text (appears bold), type "@" to see mention dropdown, verify char counter shows and turns red near 1024.

- [x] T030 [US3] Create editor toolbar in `components/write-kudo/editor-toolbar.tsx` — connected button group: Bold(r:8px 0 0 0), Italic, Strikethrough, NumberedList, Link, Quote (all r:0) + right section (r:0 8px 0 0) with community standards link `<a href="https://saa.sun-asterisk.vn/community-standards" target="_blank">` + char counter. All buttons: h:40px, p:10px 16px, border:1px #998C5F, icons 24x24. Each button: `aria-label` via `t('writeKudo.toolbar.*')`, `aria-pressed` for toggle state. Char count turns red (#E46060) when >= 900.
- [x] T031 [US3] Create TipTap editor in `components/write-kudo/kudo-editor.tsx` — use `next/dynamic` with `{ ssr: false }`. Extensions: StarterKit (Bold, Italic, Strike, OrderedList, Blockquote), Link, Mention (with suggestion config), CharacterCount (limit: 1024), Placeholder. Style: bg:#FFF, border:1px #998C5F, r:0 0 8px 8px (connected to toolbar above), min-h:120px, h:200px, p:16px 24px. Add `.ProseMirror` base styles in `app/globals.css`.
- [x] T032 [US3] Implement @mention autocomplete in `kudo-editor.tsx` — use `use-user-search.ts` hook (shared with recipient), render mention suggestion popup with `role="listbox"`, show user avatar + name in each suggestion
- [x] T033 [US3] Wire editor content to form reducer — SET_CONTENT action on editor `onUpdate`, read char count from TipTap CharacterCount extension, pass to toolbar display
- [x] T034 [US3] Add hint text below editor in `write-kudo-modal.tsx` — "Bạn có thể '@ + tên' để nhắc tới đồng nghiệp khác" (16px/700, #00101A, ls:0.5px)

**Verify**: All 6 formatting buttons toggle correctly, @mention triggers on "@" with user results, char counter shows X/1024, turns red at 900+, placeholder visible when empty, toolbar + editor visually connected.

---

## Phase 6: US4 — Add Hashtags (P1)

**Goal**: Hashtag combobox with predefined + custom creation, chip display with remove. Independently testable: click add → select/create hashtag → see chip → remove chip.

**Independent test**: Open modal, click "+ Hashtag", select from list, verify chip appears, type custom name → "Tạo hashtag" option → create, remove chip with "x".

- [x] T035 [US4] Create hashtag field in `components/write-kudo/hashtag-field.tsx` — FieldLabel "Hashtag *" + "+ Hashtag" add button (h:48, p:4px 8px, r:8px, bg:#FFF, border:#998C5F, text:11px/700/#999, "Tối đa 5") + combobox dropdown (shows predefined hashtags, filters on typing, "Tạo hashtag: #{input}" create option at bottom when no match) + selected chips group (gap:8px)
- [x] T036 [US4] Implement selected hashtag chip style in `hashtag-field.tsx` — gold bg (#FFEA9E), dark text (#00101A), 11px/700, r:8px, "x" remove icon with `aria-label`. Keyboard: Backspace/Delete removes last chip.
- [x] T037 [US4] Wire hashtag state — ADD_HASHTAG / REMOVE_HASHTAG actions in reducer, max 5 limit (hide add button at 5), validation: min 1 required. POST to `/api/hashtags` when creating custom.
- [x] T038 [US4] Fetch hashtag options from `/api/hashtags` on first dropdown open, cache in `hashtagOptions` state

**Verify**: Predefined hashtags appear in dropdown, typing filters them, custom creation works, chips displayed with gold style, max 5 enforced (button hidden), min 1 validated on submit.

---

## Phase 7: US5 — Attach Images (P2)

**Goal**: Image upload with thumbnails, eager upload to Supabase Storage. Independently testable: click add → pick file → see thumbnail + progress → remove.

**Independent test**: Open modal, click "+ Image", select JPG file, verify upload progress and thumbnail (80x80), click red "x" to remove, verify 5-image limit.

- [x] T039 [US5] Create image upload field in `components/write-kudo/image-upload-field.tsx` — FieldLabel "Image" (no asterisk) + thumbnail grid (flex-wrap, gap:16px) + "+ Image" add button (same style as hashtag add, "Tối đa 5") + hidden `<input type="file" accept="image/*">`. Thumbnails: 80x80, r:18px, border:1px #998C5F, image fill r:4px border:1px #FFEA9E, object-fit:cover.
- [x] T040 [US5] Implement red remove button on each thumbnail in `image-upload-field.tsx` — 20x20, bg:#D4271D, r:50%, position:absolute top:-4px right:-4px, white "x" icon, `aria-label="Remove image"`, hover: bg:#B91C1C scale(1.1)
- [x] T041 [US5] Implement eager image upload flow in `image-upload-field.tsx` — on file select: validate type+size (5MB, jpg/png/gif/webp), create preview via `URL.createObjectURL()`, upload to Supabase Storage via `image-upload.ts`, show progress indicator on thumbnail, store returned URL in form state (ADD_IMAGE)
- [x] T042 [US5] Wire max 5 image limit — hide "+ Image" button when 5 images attached, REMOVE_IMAGE action deletes from Supabase Storage + revokes object URL

**Verify**: File picker opens, validates type/size, thumbnail with progress shown, upload completes, remove button works, max 5 enforced.

---

## Phase 8: US6 + US7 — Anonymous & Cancel (P2)

**Goal**: Anonymous toggle with conditional name field, cancel/dismiss behaviors. Independently testable: check anonymous → name field appears → uncheck → hidden.

**Independent test**: Check anonymous checkbox, verify name field appears with expand animation, leave empty (defaults to "Ẩn danh"), uncheck → field hidden. Click Hủy/overlay/Esc → modal closes.

- [x] T043 [US6] Create anonymous checkbox in `components/write-kudo/anonymous-checkbox.tsx` — native `<input type="checkbox">` with `aria-checked`, label "Gửi lời cám ơn và ghi nhận ẩn danh" (22px/700, #999 unchecked → #00101A checked), checkbox: 24x24, r:4px, border:#999 unchecked / bg:#FFEA9E checked with white checkmark
- [x] T044 [US6] Implement conditional anonymous name field in `anonymous-checkbox.tsx` — text input (same style as danh hieu: p:16px 24px, r:8px, border:#998C5F), placeholder "Nhập tên ẩn danh", expand animation (height + opacity, 200ms ease-out), optional — defaults to "Ẩn danh" if empty
- [x] T045 [US6] Wire anonymous state — SET_ANONYMOUS / SET_ANONYMOUS_NAME actions in reducer, on submit: if anonymous enabled and name empty → set anonymousName to "Ẩn danh"
- [x] T046 [US7] Verify all dismiss behaviors in `write-kudo-modal.tsx` — Hủy button click, overlay click outside modal, Esc key → all close modal and reset form state. On discard: clean up any uploaded images from Supabase Storage.

**Verify**: Checkbox toggles, name field expands/collapses with animation, label color changes, empty name defaults to "Ẩn danh", all 3 dismiss methods work, uploaded images cleaned up on discard.

---

## Phase 9: US9 — Responsive & Polish

**Goal**: Mobile/tablet responsive, final accessibility audit, trigger page, edge cases.

**Independent test**: Resize viewport to mobile → modal goes full-screen. Keyboard-only navigation works end-to-end.

- [x] T047 [US9] Implement responsive breakpoints in `write-kudo-modal.tsx` — Mobile (<640px): full-screen, r:0, p:16px, fields stack vertically, action buttons column + full-width. Tablet (640-1023px): w:90vw, max-w:752px, p:24px, thumbnails 64x64. Desktop (>=1024px): w:752px, centered.
- [x] T048 [US9] Apply responsive to all child components — `recipient-field.tsx`, `danh-hieu-field.tsx`, `hashtag-field.tsx`, `image-upload-field.tsx`: stack label above input on mobile (flex-col), image thumbnails flex-wrap. `editor-toolbar.tsx`: horizontal scroll or flex-wrap on mobile. `action-bar.tsx`: flex-col + both full-width on mobile.
- [x] T049 Create minimal Sun Kudos page in `app/(main)/sun-kudos/page.tsx` — RSC page with "Viết Kudo" CTA button that opens the WriteKudoModal. Include `loading.tsx` and `error.tsx` per constitution.
- [x] T050 Handle edge cases in `write-kudo-modal.tsx` — network failure retry (toast + keep modal open), modal scroll on short viewports (already handled by max-height), image cleanup on discard (delete orphaned uploads)
- [x] T051 Cross-cutting accessibility audit — run axe-core on modal at each breakpoint, verify complete keyboard-only flow (Tab through all fields, Enter to submit, Esc to close), verify all ARIA attributes, fix placeholder contrast (#999 → #666 on white bg for AA compliance)
- [x] T052 Create barrel export and verify full integration — import WriteKudoModal in sun-kudos page, test full flow: open → fill all fields → submit → success toast → modal closes. Verify i18n works in both vi and en locales.

**Verify**: Responsive layouts correct at all breakpoints, axe-core zero violations, keyboard-only flow works, full happy path end-to-end, both locales display correctly.

---

## Dependencies

```
T001 ──────────────────────────────────────────────────────┐
  │                                                         │
  ▼                                                         │
T002-T010 (parallel setup) ────────────────────────────────┤
  │                                                         │
  ▼                                                         │
T011-T017 (API layer, partially parallel) ─────────────────┤
  │                                                         │
  ├──────────────────┐                                      │
  ▼                  ▼                                      │
T018-T026          T027-T029                                │
(Core Form)        (Recipient — parallel with Core)         │
  │                  │                                      │
  ▼                  │                                      │
T030-T034 ◄─────────┘ (Editor uses use-user-search hook)   │
  │                                                         │
  ▼                                                         │
T035-T038 (Hashtags)                                        │
  │                                                         │
  ▼                                                         │
T039-T042 (Images)                                          │
  │                                                         │
  ▼                                                         │
T043-T046 (Anonymous + Cancel)                              │
  │                                                         │
  ▼                                                         │
T047-T052 (Responsive + Polish + Page) ◄────────────────────┘
```

**Parallel opportunities**:
- T002-T010 are all independent (different files) — run in parallel
- T011+T013+T015 (services) can run in parallel, then T012+T014+T016 (routes) in parallel
- T018-T026 (Core Form) and T027-T029 (Recipient) can run in parallel after API layer
- Within each phase, tasks with [P] are parallelizable

---

## Implementation Strategy

### MVP Scope (Phase 1-3)
Minimum viable: modal opens with danh hieu field + validation + submit flow. Can be demo'd without the full feature.

### Incremental Delivery
Each phase after Phase 3 adds one independently testable capability:
- Phase 4: Recipient search
- Phase 5: Rich text editing
- Phase 6: Hashtags
- Phase 7: Images
- Phase 8: Anonymous + Cancel
- Phase 9: Responsive + Polish

### Task Count by Phase

| Phase | Name | Tasks | Story |
|---|---|---|---|
| 1 | Setup | 10 | - |
| 2 | API Layer | 7 | - |
| 3 | Core Form | 9 | US1, US8 |
| 4 | Recipient | 3 | US2 |
| 5 | Editor | 5 | US3 |
| 6 | Hashtags | 4 | US4 |
| 7 | Images | 4 | US5 |
| 8 | Anonymous + Cancel | 4 | US6, US7 |
| 9 | Responsive + Polish | 6 | US9 |
| **Total** | | **52** | |
