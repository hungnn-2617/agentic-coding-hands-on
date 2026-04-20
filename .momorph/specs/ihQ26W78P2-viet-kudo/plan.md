# Implementation Plan: Viết Kudo (Write Kudo)

**Frame**: `ihQ26W78P2-viet-kudo`
**Spec**: `spec.md` (Reviewed — 3 passes)
**Design**: `design-style.md`
**Created**: 2026-04-20

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| TypeScript strict mode | All code MUST use TypeScript strict | ✅ Compliant |
| `"use client"` only when needed | Default to RSC; add `"use client"` for hooks/events | ✅ Modal is client component (TR-001) |
| File naming (kebab-case) | Files/folders MUST use kebab-case | ✅ Planned |
| Component naming (PascalCase) | Exports MUST use PascalCase | ✅ Planned |
| `@/*` path alias | No relative imports crossing feature boundaries | ✅ Planned |
| Responsive (mobile-first) | Base → sm → md → lg → xl breakpoints | ✅ Planned (US9) |
| Supabase Auth | Session via HTTP-only cookies | ✅ Uses existing auth pattern |
| Supabase RLS | All tables MUST have RLS enabled | ✅ Planned for `kudos` table |
| Input validation (server) | Client-side validation is UX only; server MUST validate | ✅ Planned (TR-009 XSS + server validation) |
| XSS prevention | Never use `dangerouslySetInnerHTML` unsanitized | ✅ DOMPurify for rich text (TR-009) |
| `next/image` | Images MUST use `next/image` for optimization | ✅ Planned for thumbnails |
| Error boundaries | Every route MUST have `error.tsx` | ✅ Already exists in `(main)/` |
| TDD | Red-Green-Refactor cycle | 📋 Planned per phase |

---

## Architecture Decisions

### Frontend

- **Component pattern**: Feature-scoped directory `components/write-kudo/` with barrel export. Modal is a `"use client"` component wrapping all form logic.
- **State management**: `useReducer` within the modal component — 14 state fields are too many for individual `useState` calls. Matches project pattern (no global state library).
- **Rich text editor**: **TipTap** — best React 19 compatibility, built-in extensions for all required formatting (Bold, Italic, Strike, OrderedList, Link, Blockquote), @ mention via `@tiptap/extension-mention`, character count via `@tiptap/extension-character-count`. Alternatives considered: Slate (lower-level, more work), Lexical (newer, less mature mentions).
- **Toast system**: **Sonner** — lightweight, accessible, SSR-safe, good Next.js App Router support. Add `<Toaster />` in root layout.
- **Form validation**: Manual validation in reducer + server-side validation on submit. No form library needed (project has no React Hook Form pattern established).
- **Image uploads**: Client-side preview via `URL.createObjectURL()`, then upload to Supabase Storage using the Supabase JS client directly (no server route handler needed — Supabase Storage SDK handles auth and bucket policies). **Eager upload pattern** — images are uploaded immediately on file selection with a progress indicator; on cancel/discard, uploaded images are cleaned up. This avoids a slow submit when multiple large images are attached. The spec's predicted `/api/upload/images` endpoint is not needed since Supabase Storage handles uploads, size limits (5MB), and MIME type restrictions at the bucket policy level.
- **i18n**: Extend the existing custom i18n system. Add `writeKudo.*` translation keys to `types.ts`, `vi.ts`, `en.ts`.

### Backend

- **API design**: Next.js Route Handlers in `app/api/` using Supabase server client.
- **Database**: New `kudos` table + `hashtags` table in Supabase. RLS policies for authenticated users.
- **Storage**: New Supabase Storage bucket `kudo-images` with 5MB file size limit, image MIME type restrictions.

---

## i18n Strategy

The project uses a custom i18n system (`lib/i18n/`). All user-facing strings in the Write Kudo modal MUST be translated.

### New Translation Keys

Add to `lib/i18n/types.ts` (TranslationKey union), `lib/i18n/locales/vi.ts`, and `lib/i18n/locales/en.ts`:

| Key | Vietnamese (vi) | English (en) |
|---|---|---|
| `writeKudo.title` | Gửi lời cám ơn và ghi nhận đến đồng đội | Send appreciation and recognition to your teammate |
| `writeKudo.recipient.label` | Người nhận | Recipient |
| `writeKudo.recipient.placeholder` | Tìm kiếm | Search |
| `writeKudo.recipient.noResults` | Không tìm thấy kết quả | No results found |
| `writeKudo.danhHieu.label` | Danh hiệu | Title |
| `writeKudo.danhHieu.placeholder` | Dành tặng một danh hiệu cho đồng đội | Give a title to your teammate |
| `writeKudo.danhHieu.helperExample` | Ví dụ: Người truyền động lực cho tôi. | Example: The person who motivates me. |
| `writeKudo.danhHieu.helperDisplay` | Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn. | The title will be displayed as your Kudos heading. |
| `writeKudo.content.placeholder` | Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé! | Write your appreciation message here! |
| `writeKudo.content.mentionHint` | Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác | You can use "@ + name" to mention other colleagues |
| `writeKudo.content.communityStandards` | Tiêu chuẩn cộng đồng | Community Standards |
| `writeKudo.hashtag.label` | Hashtag | Hashtag |
| `writeKudo.hashtag.add` | Hashtag | Hashtag |
| `writeKudo.hashtag.max` | Tối đa 5 | Max 5 |
| `writeKudo.hashtag.createNew` | Tạo hashtag: #{input} | Create hashtag: #{input} |
| `writeKudo.image.label` | Image | Image |
| `writeKudo.image.add` | Image | Image |
| `writeKudo.image.max` | Tối đa 5 | Max 5 |
| `writeKudo.anonymous.label` | Gửi lời cám ơn và ghi nhận ẩn danh | Send appreciation and recognition anonymously |
| `writeKudo.anonymous.namePlaceholder` | Nhập tên ẩn danh | Enter anonymous name |
| `writeKudo.cancel` | Hủy | Cancel |
| `writeKudo.submit` | Gửi | Send |
| `writeKudo.submitting` | Đang gửi... | Sending... |
| `writeKudo.success` | Gửi Kudo thành công! | Kudo sent successfully! |
| `writeKudo.error` | Gửi Kudo thất bại. Vui lòng thử lại. | Failed to send Kudo. Please try again. |
| `writeKudo.validation.recipientRequired` | Vui lòng chọn người nhận | Please select a recipient |
| `writeKudo.validation.titleRequired` | Vui lòng nhập danh hiệu | Please enter a title |
| `writeKudo.validation.contentRequired` | Vui lòng nhập nội dung | Please enter content |
| `writeKudo.validation.hashtagRequired` | Vui lòng chọn ít nhất 1 hashtag | Please select at least 1 hashtag |
| `writeKudo.toolbar.bold` | In đậm | Bold |
| `writeKudo.toolbar.italic` | In nghiêng | Italic |
| `writeKudo.toolbar.strikethrough` | Gạch ngang | Strikethrough |
| `writeKudo.toolbar.numberedList` | Danh sách đánh số | Numbered list |
| `writeKudo.toolbar.link` | Chèn liên kết | Insert link |
| `writeKudo.toolbar.quote` | Trích dẫn | Quote |

---

## Project Structure

### New Files

| File | Purpose |
|---|---|
| **Components** | |
| `components/write-kudo/field-label.tsx` | Shared label component (text + required asterisk) — used by recipient, danh hieu, hashtag, image fields |
| `components/write-kudo/write-kudo-modal.tsx` | Main modal component (`"use client"`) — orchestrates all form sections |
| `components/write-kudo/recipient-field.tsx` | Search dropdown for selecting recipient |
| `components/write-kudo/danh-hieu-field.tsx` | Free-text input with helper text |
| `components/write-kudo/kudo-editor.tsx` | TipTap rich text editor with custom toolbar |
| `components/write-kudo/editor-toolbar.tsx` | Connected toolbar buttons (B, I, S, list, link, quote) + char count |
| `components/write-kudo/hashtag-field.tsx` | Hashtag dropdown + chip group |
| `components/write-kudo/image-upload-field.tsx` | Image thumbnails + add button |
| `components/write-kudo/anonymous-checkbox.tsx` | Checkbox + conditional name field |
| `components/write-kudo/action-bar.tsx` | Cancel + Submit buttons |
| `components/write-kudo/index.ts` | Barrel export |
| **Hooks** | |
| `hooks/use-write-kudo.ts` | `useReducer`-based form state + actions (validate, submit, reset) |
| `hooks/use-user-search.ts` | Debounced user search with Supabase (shared by recipient field + @mention) |
| **Icons** | |
| `components/icons/bold-icon.tsx` | Toolbar bold icon |
| `components/icons/italic-icon.tsx` | Toolbar italic icon |
| `components/icons/strikethrough-icon.tsx` | Toolbar strikethrough icon |
| `components/icons/numbered-list-icon.tsx` | Toolbar numbered list icon |
| `components/icons/link-icon.tsx` | Toolbar link icon |
| `components/icons/quote-icon.tsx` | Toolbar quote icon |
| `components/icons/plus-icon.tsx` | Add button icon (+) |
| `components/icons/send-icon.tsx` | Submit button icon |
| `components/icons/close-icon.tsx` | Cancel button X icon / image remove X icon |
| **Pages** | |
| `app/(main)/sun-kudos/page.tsx` | Sun Kudos page (RSC) — renders the Kudo feed/list and the "Viết Kudo" CTA button that opens the modal. This page does NOT exist yet. |
| `app/(main)/sun-kudos/loading.tsx` | Loading skeleton for the Kudos page |
| `app/(main)/sun-kudos/error.tsx` | Error boundary for the Kudos page (per constitution) |
| **API Routes** | |
| `app/api/kudos/route.ts` | POST — create a new Kudo |
| `app/api/users/search/route.ts` | GET — search users by name/email |
| `app/api/hashtags/route.ts` | GET — fetch predefined hashtags + POST — create new custom hashtag (Q6: both predefined and user-created) |
| **Types** | |
| `types/kudo.ts` | Kudo, CreateKudoPayload, KudoFormState, KudoFormAction types |
| **Database** | |
| `types/database.ts` | Update with `kudos` and `hashtags` table types |
| **Lib** | |
| `lib/services/kudo-service.ts` | Server-side Kudo CRUD operations |
| `lib/services/user-service.ts` | User search query |
| `lib/services/hashtag-service.ts` | Hashtag fetch |
| `lib/utils/sanitize.ts` | DOMPurify wrapper for rich text sanitization |
| `lib/utils/image-upload.ts` | Supabase Storage image upload helper |

### Modified Files

| File | Changes |
|---|---|
| `lib/i18n/types.ts` | Add ~33 `writeKudo.*` translation keys to `TranslationKey` union |
| `lib/i18n/locales/vi.ts` | Add Vietnamese translations for all new keys |
| `lib/i18n/locales/en.ts` | Add English translations for all new keys |
| `types/database.ts` | Regenerated via `supabase gen types typescript` after creating `kudos` + `hashtags` tables in Supabase — adds table types to `Database` interface |
| `app/layout.tsx` | Add `<Toaster />` from sonner |
| `app/globals.css` | Add TipTap `.ProseMirror` base styles (focus outline, placeholder, min-height) if not scoped in component |
| `package.json` | Add new dependencies |

### New Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@tiptap/react` | ^2.x | React bindings for TipTap editor |
| `@tiptap/starter-kit` | ^2.x | Bold, Italic, Strike, lists, blockquote, etc. |
| `@tiptap/extension-link` | ^2.x | Link insertion/editing |
| `@tiptap/extension-mention` | ^2.x | @ mention autocomplete |
| `@tiptap/extension-character-count` | ^2.x | Character count tracking |
| `@tiptap/extension-placeholder` | ^2.x | Placeholder text in editor |
| `@tiptap/pm` | ^2.x | ProseMirror peer dependency |
| `sonner` | ^2.x | Toast notifications |
| `isomorphic-dompurify` | ^2.x | HTML sanitization for XSS prevention (Edge/Workers compatible — uses `dompurify` + `jsdom` shim for server, native DOM on client) |

---

## Implementation Approach

### Phase 0: Foundation & Setup (no UI)

**Goal**: Install dependencies, set up types, database, and i18n keys.

- 0.1: Install all npm dependencies (TipTap, sonner, dompurify)
- 0.2: Create `types/kudo.ts` with Kudo entity types, form state type, reducer action types. Include constants: `KUDO_TITLE_MAX_LENGTH = 1024`, `KUDO_CONTENT_MAX_LENGTH = 1024`, `KUDO_MAX_HASHTAGS = 5`, `KUDO_MAX_IMAGES = 5`, `KUDO_MAX_IMAGE_SIZE_MB = 5`
- 0.3: Create `kudos` and `hashtags` tables in Supabase (with RLS policies), then run `supabase gen types typescript` to regenerate `types/database.ts` — **do NOT hand-edit** this file per constitution ("Database types MUST be generated from Supabase schema")
- 0.4: Add all `writeKudo.*` i18n keys to `types.ts`, `vi.ts`, `en.ts`
- 0.5: Add `<Toaster />` from sonner to `app/layout.tsx` with custom theme matching project design tokens (gold accent, dark text, cream background — see design-style.md color tokens)
- 0.6: Create `lib/utils/sanitize.ts` (`isomorphic-dompurify` wrapper — edge/Workers compatible per constitution Cloudflare Workers requirement)
- 0.7: Create `lib/utils/image-upload.ts` (Supabase Storage helper)
- 0.8: Create toolbar icon components (`components/icons/bold-icon.tsx`, etc.)

**Test**: Type-check passes (`tsc --noEmit`), i18n keys resolve in both locales.

### Phase 1: API Layer (backend)

**Goal**: Implement all server-side data operations.

- 1.1: Create `lib/services/user-service.ts` — `searchUsers(query: string, excludeUserId: string)` using Supabase `profiles` table. **MUST exclude current user** from results (Q3: self-send blocked).
- 1.2: Create `app/api/users/search/route.ts` — GET handler with query param validation. Reads current user from session and passes `excludeUserId`.
- 1.3: Create `lib/services/hashtag-service.ts` — `getHashtags()` fetch from Supabase + `createHashtag(name: string)` for user-created hashtags (Q6: both predefined and custom).
- 1.4: Create `app/api/hashtags/route.ts` — GET (fetch all) + POST (create new hashtag with auth check, duplicate check, length validation)
- 1.5: Create `lib/services/kudo-service.ts` — `createKudo(payload)` with server-side validation + sanitization
- 1.6: Create `app/api/kudos/route.ts` — POST handler with auth check, input validation, XSS sanitization
- 1.7: Configure Supabase Storage bucket `kudo-images` (5MB limit per file, allowed MIME types: image/jpeg, image/png, image/gif, image/webp). Set RLS policy: authenticated users can upload/delete their own files. Note: images are uploaded directly via Supabase JS client — no server route handler needed.

**Test**: API routes return correct responses. Vitest tests for service functions.

### Phase 2: Core Form Components (US1, US8)

**Goal**: Modal shell + basic text fields + submit/cancel flow.

- 2.1: Create `hooks/use-write-kudo.ts` — `useReducer` with all form state + actions
- 2.2: Create `components/write-kudo/field-label.tsx` — Shared label with required asterisk, `aria-required` support
- 2.3: Create `components/write-kudo/write-kudo-modal.tsx` — Modal overlay + panel with `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Esc close, scroll behavior, background scroll lock
- 2.4: Create `components/write-kudo/danh-hieu-field.tsx` — Label + text input + helper text + `aria-describedby` for errors
- 2.5: Create `components/write-kudo/action-bar.tsx` — Cancel + Submit buttons with disabled/loading states
- 2.6: Wire up form validation (required field checks) and submit flow with toast notifications
- 2.7: Integrate i18n — all strings via `t('writeKudo.*')` hook

**A11y in this phase**: Modal ARIA roles, focus trap on open, focus return on close, Esc key dismiss, `aria-required` on required fields, `role="alert"` for validation errors.

**Test**: Modal opens/closes, focus trapped inside modal, text input works, validation prevents empty submit, loading state shows on submit, screen reader announces modal title.

### Phase 3: Recipient Search (US2)

**Goal**: Searchable dropdown with debounced API integration.

- 3.1: Create `hooks/use-user-search.ts` — Debounced search hook (300ms) using `/api/users/search`
- 3.2: Create `components/write-kudo/recipient-field.tsx` — Custom dropdown with keyboard nav (Arrow Up/Down, Enter to select, Esc to close), search input with `aria-expanded`, `aria-activedescendant`, result list with `role="listbox"`, empty state
- 3.3: Wire recipient selection into form state

**A11y in this phase**: Combobox pattern (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`), keyboard navigation, screen reader announcement of result count.

**Test**: Type to search, results appear, click to select, keyboard navigation works (Arrow/Enter/Esc), empty state shown for no results, screen reader announces search results.

### Phase 4: Rich Text Editor (US3)

**Goal**: TipTap editor with formatting toolbar and @ mentions.

- 4.1: Create `components/write-kudo/editor-toolbar.tsx` — Connected button group with all 6 formatting buttons (each with `aria-label`, `aria-pressed` for toggle state) + community standards link (`<a href="https://saa.sun-asterisk.vn/community-standards" target="_blank" rel="noopener noreferrer">`) + character counter (limit: 1024)
- 4.2: Create `components/write-kudo/kudo-editor.tsx` — TipTap editor with extensions (StarterKit, Link, Mention, CharacterCount, Placeholder). **Use `next/dynamic` with `{ ssr: false }`** to avoid SSR issues with TipTap/ProseMirror.
- 4.3: Implement @ mention autocomplete using `use-user-search.ts` hook (shared with recipient search)
- 4.4: Wire character count to toolbar display — limit 1024, red warning color (#E46060) when count >= 900 (configurable threshold)
- 4.5: Style toolbar + editor as connected group (toolbar top-radius, editor bottom-radius) per design-style.md. Add TipTap base styles (`.ProseMirror` reset) in `globals.css` or scoped within the editor component

**A11y in this phase**: Toolbar buttons with `aria-label` and `aria-pressed`, editor with `role="textbox"` and `aria-multiline="true"`, mention popup with `role="listbox"`.

**Test**: All 6 formatting options work, @ mention autocomplete triggers on "@", character count displays correctly, placeholder shows when empty, toolbar buttons announce state to screen reader.

### Phase 5: Hashtags & Images (US4, US5)

**Goal**: Tag chip selection and image upload with thumbnails.

- 5.1: Create `components/write-kudo/hashtag-field.tsx` — Label + add button + chip group + **combobox dropdown** (Q6: shows predefined hashtags, filters on typing, allows creating new custom hashtags if no match found — "Tạo hashtag: #{input}" option at bottom of dropdown)
- 5.2: Create `components/write-kudo/image-upload-field.tsx` — Label + thumbnail grid + add button + file picker
- 5.3: Implement image eager upload — upload to Supabase Storage immediately on file selection, show progress indicator on thumbnail, store returned URLs. On form discard, clean up uploaded images.
- 5.4: Wire max limits (5 hashtags, 5 images) with button hide/disable
- 5.5: Image remove buttons with `aria-label="Remove image"`, hashtag chips with `aria-label` for remove action

**A11y in this phase**: Image remove buttons with `aria-label`, hashtag chips keyboard-removable (Backspace/Delete), announced additions/removals.

**Test**: Add/remove hashtags as chips, add/remove image thumbnails, limits enforced, file validation (type + size), upload progress shown, remove buttons announced by screen reader.

### Phase 6: Anonymous, Responsive & Edge Cases (US6, US7, US9)

**Goal**: Anonymous checkbox, responsive layouts, and edge case handling. (Note: a11y is built into each component in Phases 2-5, not deferred here.)

- 6.1: Create `components/write-kudo/anonymous-checkbox.tsx` — Native `<input type="checkbox">` with `aria-checked`, conditional name field with expand animation, label color toggle (#999 unchecked → #00101A checked). Anonymous name field is **optional** — defaults to "Ẩn danh" if left empty (Q2).
- 6.2: Implement responsive breakpoints per design-style.md:
  - Mobile (< 640px): full-screen modal, `border-radius: 0`, `padding: 16px`, fields stack vertically, action buttons full-width column
  - Tablet (640-1023px): `width: 90vw`, `max-width: 752px`, `padding: 24px`, thumbnails 64x64
  - Desktop (>= 1024px): `width: 752px`, centered, match Figma exactly
- 6.3: Edge cases — network failure retry (keep modal open, show error toast), modal scroll on short viewports, image cleanup on discard
- 6.4: Cross-cutting a11y audit — verify all ARIA attributes end-to-end with axe-core, test complete keyboard-only flow, verify color contrast (note: grey #999 on white fails AA — use #666 for placeholders)
- 6.5: Create `app/(main)/sun-kudos/page.tsx` — Kudos page with feed/list + "Viết Kudo" CTA button that triggers the modal. (This is a minimal page shell — the full Kudos feed is a separate feature.)

**A11y in this phase**: Checkbox with `aria-checked`, final end-to-end audit only (components already have a11y from Phases 2-5).

**Test**: Anonymous toggle shows/hides name field, responsive layouts verified at all breakpoints, keyboard-only flow works end-to-end, axe-core reports zero violations, edge cases handled gracefully.

---

## Testing Strategy

| Type | Focus | Tool | Coverage Target |
|---|---|---|---|
| Unit | Reducer logic, validation, sanitization, services | Vitest | 90% |
| Component | Each form field renders, states work, events fire | Vitest + Testing Library | 80% |
| Integration | API routes return correct data, auth works | Vitest | 70% |
| Accessibility | ARIA, keyboard nav, focus trap, screen reader | Manual + axe-core | All requirements |
| Visual | Responsive breakpoints, design token accuracy | Manual browser testing | All breakpoints |
| E2E | Full happy path: open → fill → submit → toast | Manual (Playwright later) | Critical path |

### Test File Structure

```
components/write-kudo/__tests__/
├── field-label.test.tsx
├── write-kudo-modal.test.tsx
├── recipient-field.test.tsx
├── danh-hieu-field.test.tsx
├── kudo-editor.test.tsx
├── hashtag-field.test.tsx
├── image-upload-field.test.tsx
├── anonymous-checkbox.test.tsx
└── action-bar.test.tsx

hooks/__tests__/
├── use-write-kudo.test.ts
└── use-user-search.test.ts

lib/services/__tests__/
├── kudo-service.test.ts
├── user-service.test.ts
└── hashtag-service.test.ts

lib/utils/__tests__/
├── sanitize.test.ts
└── image-upload.test.ts
```

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| TipTap bundle size | Medium | Medium | Use tree-shaking, only import required extensions. Monitor bundle with `next build --analyze`. |
| TipTap + React 19 compatibility | High | Low | TipTap 2.x supports React 19. Test early in Phase 4. If issues, fall back to Slate.js. |
| Supabase Storage not configured | High | Medium | Must set up bucket + RLS policies before Phase 5. Block on DevOps if self-service unavailable. |
| Rich text XSS | High | Medium | DOMPurify sanitization on both client display and server storage (TR-009). Automated test for script injection. |
| Modal performance with TipTap | Medium | Low | Lazy-load TipTap editor component with `dynamic()` import. Only mount when modal is open. |
| i18n key count (33+ new keys) | Low | High | Plan for this — it's tedious but straightforward. Do it once in Phase 0 and validate both locales. |
| Image upload latency | Medium | Medium | Eager upload on file select with progress indicator. Cleanup on discard. This avoids slow submit for multiple large images. |
| DOMPurify on Edge | Medium | Low | Use `isomorphic-dompurify` instead of plain `dompurify` for Cloudflare Workers / Edge Runtime compatibility per constitution. |
| `kudos` table schema changes | Medium | Low | Finalize schema in Phase 0, apply migration once. Spec entity is clear. |

---

## Resolved Questions

All open questions from spec review have been answered (2026-04-20):

| # | Question | Answer | Impact |
|---|---|---|---|
| Q1 | Max character limits? | **1024 characters** for both content body and title (danh hiệu) | `types/kudo.ts`: `KUDO_TITLE_MAX_LENGTH = 1024`, `KUDO_CONTENT_MAX_LENGTH = 1024`. TipTap CharacterCount limit set to 1024. Validation on both client and server. |
| Q2 | Anonymous name required? | **Defaults to "Ẩn danh"** — field is optional, not required | If anonymous is enabled and name field is empty, server stores `anonymousName = "Ẩn danh"`. No validation error on empty anonymous name. |
| Q3 | Can user send Kudo to self? | **No** — self-send is blocked | Recipient search API MUST exclude current user from results. Client-side: filter out current userId from search results. Server-side: reject if `senderId === recipientId`. |
| Q4 | "Tiêu chuẩn cộng đồng" target? | **External URL: `https://saa.sun-asterisk.vn/community-standards`** | Implement as `<a href="..." target="_blank" rel="noopener noreferrer">`. Opens in new tab. No internal routing needed. |
| Q5 | Image file limits? | **5MB per file, formats: JPG, PNG, GIF, WebP** (confirmed default from spec) | Supabase bucket policy: `maxFileSize: 5MB`, allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`. Client-side validation before upload. |
| Q6 | Hashtags: predefined or user-created? | **Both** — predefined list from server + users can create new hashtags | Hashtag field needs a **combobox** pattern: dropdown shows predefined options, typing filters them, and if no match exists, user can create a custom hashtag. API needs a POST endpoint for creating new hashtags. |

---

## Phase Dependency Graph

```
Phase 0: Foundation ─────────────────────────────┐
    │                                             │
    ▼                                             │
Phase 1: API Layer ───────────────┐               │
    │                             │               │
    ▼                             ▼               ▼
Phase 2: Core Form          Phase 3: Recipient  (i18n keys from Phase 0
    │                             │                used in all phases)
    ▼                             │
Phase 4: Rich Text Editor ◄──────┘ (shares use-user-search hook)
    │
    ▼
Phase 5: Hashtags & Images
    │
    ▼
Phase 6: Anonymous & Polish
```

Phases 0→1→2 are sequential. Phase 3 can start in parallel with Phase 2 after Phase 1 completes. Phase 4 depends on Phase 3 (shared hook). Phases 5→6 are sequential after Phase 4. Phase 6.5 (Sun Kudos page) can be built as a minimal shell early if needed for integration testing.
