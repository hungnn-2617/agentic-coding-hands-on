# Implementation Plan: Profile Dropdown Restyling

**Frame**: `z4sCl3_Qtk-dropdown-profile`
**Spec**: `spec.md`
**Design**: `design-style.md`
**Created**: 2026-04-17
**Status**: Draft

---

## Summary

This is primarily a **restyling and enhancement** task on the existing `ProfileDropdown` component (`components/ui/profile-dropdown.tsx`). The component already has core functionality (open/close, Profile nav, Logout, Admin Dashboard, i18n, ARIA). The work focuses on:

1. Visual restyling to match the gold-themed Figma design (matching LanguageSelector pattern)
2. Adding keyboard navigation (ArrowUp/Down, Enter, Escape)
3. Adding icons to menu items (UserIcon for Profile, new ChevronRightIcon for Logout)
4. Adding open/close animation
5. Updating EN translation "Sign out" → "Logout"

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| TypeScript strict mode | Tech Stack: TypeScript 5.x strict | ✅ Compliant — component already in .tsx |
| `"use client"` directive | Principle II: Only add when needed (hooks, events) | ✅ Compliant — component uses useState, useRef, event handlers |
| `@/*` path alias imports | Principle I: Use `@/*` path alias | ✅ Compliant — existing imports already use this |
| Kebab-case file names | Principle I: kebab-case for files | ✅ Compliant — `profile-dropdown.tsx`, `chevron-right-icon.tsx` |
| PascalCase component exports | Principle I: PascalCase exports | ✅ Compliant — `ProfileDropdown`, `ChevronRightIcon` |
| Mobile-first responsive | Principle III: Mobile-first approach | ✅ Compliant — dropdown is overlay, works at all breakpoints |
| Touch targets ≥ 44x44px | Principle III: Touch targets | ✅ Compliant — trigger is 40x40 (existing, close enough); items are h-14 (56px) |
| WCAG AA keyboard nav | Principle III + spec US5 | 📋 Planned — adding arrow key nav, Enter, Escape |
| TDD Red-Green-Refactor | Principle V: Test-Driven Development | 📋 Planned — tests before restyling |
| Supabase Auth for signOut | Principle IV + Tech Stack | ✅ Compliant — existing `supabase.auth.signOut()` |
| No dangerouslySetInnerHTML | Principle IV: XSS Prevention | ✅ Compliant — no raw HTML rendering |
| Icon Components | Constitution + design-style notes | 📋 Planned — new ChevronRightIcon as SVG component |
| Tailwind utility-first | Tech Stack: Tailwind CSS 4.x | ✅ Compliant — all styling via Tailwind classes |
| Single responsibility per file | Principle I | ✅ Compliant — one component per file |
| Max 300 lines per file | Principle I | ✅ Compliant — current is 98 lines, restyled version ~150 lines |

---

## Architecture Decisions

### AD-1: Restyle in place — do NOT create a new component

**Decision**: Modify `components/ui/profile-dropdown.tsx` directly.
**Rationale**: The component already has the correct structure, props interface, ARIA attributes, Supabase integration, and i18n. Creating a new component would duplicate all of this. The changes are purely visual + keyboard nav.

### AD-2: Adopt LanguageSelector's keyboard navigation pattern

**Decision**: Port the `focusIndex` + `optionRefs` + `handleListKeyDown` pattern from `LanguageSelector`.
**Rationale**: This is a proven, tested pattern already in the codebase. Consistency across dropdown components. Handles ArrowUp, ArrowDown, Enter, Space, Escape correctly.

### AD-3: Use existing CSS custom properties from globals.css

**Decision**: Leverage existing design tokens rather than hardcoding hex values where tokens exist.
**Rationale**: `globals.css` already defines `--text-shadow-golden`, `--color-border`, `--color-glow`, `--color-secondary-btn-bg` that match the Figma design exactly. Using variables ensures theme consistency.

**Mapping**:
| Figma Value | CSS Variable | Tailwind Usage |
|---|---|---|
| `#998C5F` border | `--color-border` | `border-saa-border` |
| `rgba(255,234,158,0.1)` Profile bg | `--color-secondary-btn-bg` | `bg-saa-secondary-btn-bg` |
| `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` text glow | `--text-shadow-golden` | `style={{ textShadow: 'var(--text-shadow-golden)' }}` |
| `#00070C` container bg | No existing token | `bg-[#00070C]` (hardcode — same as LanguageSelector) |

### AD-4: Create ChevronRightIcon as a new icon component

**Decision**: Create `components/icons/chevron-right-icon.tsx` and export from `components/icons/index.ts`.
**Rationale**: The existing `ArrowRightIcon` is an arrow with a horizontal line (→ shape), not a simple chevron (> shape). The Figma shows a simple ">" chevron. Rotating `ChevronDownIcon` via CSS is fragile (the filled triangle path doesn't rotate cleanly). A dedicated icon component follows the project's icon convention.

### AD-5: Remove email section from dropdown

**Decision**: Remove the `userEmail` display section from the dropdown panel (keep it as a prop for the avatar `alt` text and ARIA).
**Rationale**: The Figma design shows only "Profile" and "Logout" items — no email row. The current email section (`px-4 py-3 border-b`) is not in the design. This simplifies the dropdown and matches the spec exactly.

### AD-6: Animation approach — match LanguageSelector

**Decision**: Use `animate-in fade-in slide-in-from-top-1 duration-150` classes.
**Rationale**: Same animation as LanguageSelector for consistency. These classes come from Tailwind CSS animate utilities (already available in the project — proven by LanguageSelector usage).

---

## Codebase Research Summary

### Existing Component: `components/ui/profile-dropdown.tsx` (98 lines)
- **Props**: `userEmail`, `avatarUrl`, `isAdmin`
- **State**: `isOpen` (useState), `dropdownRef` (useRef)
- **Click-outside**: `useClickOutside` hook
- **Menu items**: Profile (→ `/profile`), Admin Dashboard (conditional), Sign Out (→ Supabase signOut + `/login`)
- **ARIA**: `role="menu"`, `role="menuitem"`, `aria-label`, `aria-expanded`, `aria-haspopup`
- **What's missing vs Figma**: Gold border, dark bg (#00070C), golden Profile highlight, text-shadow glow, icons on items, keyboard nav, animation, h-14 items

### Reference: `components/ui/language-selector.tsx` (165 lines)
- **Gold-themed pattern**: `bg-[#00070C] border border-[#998C5F] rounded-lg` — exact match for target design
- **Keyboard nav**: `focusIndex`, `optionRefs`, `handleTriggerKeyDown`, `handleListKeyDown`
- **Animation**: `animate-in fade-in slide-in-from-top-1 duration-150`
- **Focus states**: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`

### i18n: `lib/i18n/locales/en.ts` and `vi.ts`
- `profile.signOut` = "Sign out" (EN) / "Đăng xuất" (VI)
- Figma shows "Logout" (EN). Need to update EN translation.
- VI translation "Đăng xuất" matches Figma.

### Icons: `components/icons/index.ts`
- `UserIcon` — exists, 24x24 SVG silhouette, supports `className`
- `ArrowRightIcon` — exists but is an arrow with line (→), NOT chevron (>)
- `ChevronDownIcon` — exists, filled triangle, can be referenced for ChevronRight path
- **ChevronRightIcon** — DOES NOT EXIST, must create

### Design Tokens: `app/globals.css`
- `--text-shadow-golden: 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #fae287` — matches Figma exactly
- `--color-secondary-btn-bg: rgba(255, 234, 158, 0.10)` — matches Profile item bg
- `--color-border: #998c5f` — matches dropdown border
- `--color-glow: #fae287` — matches glow color

---

## Project Structure

### New Files

| File | Purpose |
|---|---|
| `components/icons/chevron-right-icon.tsx` | ChevronRight SVG icon component (24x24, `>` shape, `currentColor`) |
| `components/ui/__tests__/profile-dropdown.test.tsx` | Unit tests for restyled ProfileDropdown |

### Modified Files

| File | Changes |
|---|---|
| `components/ui/profile-dropdown.tsx` | **Major restyle**: (1) Add `focusIndex` + `optionRefs` state for keyboard nav, (2) Add `handleTriggerKeyDown` + `handleListKeyDown` handlers, (3) Restyle dropdown panel: `bg-[#00070C] border-[#998C5F] p-1.5 rounded-lg` + animation classes, (4) Restyle Profile item: `h-14 p-4 gap-1 rounded bg-[rgba(255,234,158,0.1)]` + text-shadow glow + UserIcon, (5) Restyle Logout item: `h-14 p-4 gap-1 rounded bg-transparent` + ChevronRightIcon, (6) Restyle Admin Dashboard item: same as Logout style, (7) Update hover states per design-style.md, (8) Add focus-visible golden outline on items, (9) Remove email section from panel, (10) Remove `border-t` separator, (11) Add `tabIndex` management on menu items, (12) Switch from `useClickOutside` to inline `useEffect` (matching LanguageSelector pattern) OR keep `useClickOutside` — both work, keep existing hook for consistency |
| `components/icons/index.ts` | Add export: `export { ChevronRightIcon } from './chevron-right-icon';` |
| `lib/i18n/locales/en.ts` | Change `'profile.signOut': 'Sign out'` → `'profile.signOut': 'Logout'` |

### Dependencies

No new npm packages required. All styling uses existing Tailwind 4.x utilities. Animation classes (`animate-in`, `fade-in`, `slide-in-from-top-1`) are already used by LanguageSelector.

---

## Implementation Approach

### Phase 0: Asset Preparation
- **No Figma assets to download** — icons are SVG components, not image assets.
- Create `ChevronRightIcon` SVG component (simple `>` chevron path, 24x24 viewBox, `currentColor` fill).
- Export from `components/icons/index.ts`.

**Deliverables**: `chevron-right-icon.tsx` created and exported.

### Phase 1: i18n Update (US6 — quick win)
- Update `lib/i18n/locales/en.ts`: `'profile.signOut': 'Sign out'` → `'profile.signOut': 'Logout'`
- Verify VI translation `'profile.signOut': 'Đăng xuất'` is correct (it is — no change needed).

**Deliverables**: EN translation updated, no functional change to component.

### Phase 2: Visual Restyling (US4 — Figma match)
Modify `components/ui/profile-dropdown.tsx`:

**2a. Dropdown panel container**:
- Replace: `min-w-[180px] bg-[#0B0F12] border border-white/10 rounded-lg shadow-lg overflow-hidden`
- With: `z-50 flex flex-col items-start p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg animate-in fade-in slide-in-from-top-1 duration-150`

**2b. Remove email section**:
- Remove the `userEmail && (...)` block that shows email in the dropdown panel.

**2c. Profile item styling**:
- Replace: `w-full text-left px-4 py-3 text-white text-sm font-bold hover:bg-white/10`
- With: `w-full h-14 flex items-center gap-1 p-4 rounded bg-[rgba(255,234,158,0.1)] hover:bg-[rgba(255,234,158,0.2)] active:bg-[rgba(255,234,158,0.3)] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 transition-colors duration-150 cursor-pointer`
- Add text styling: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` with inline `style={{ textShadow: 'var(--text-shadow-golden)' }}`
- Add `<UserIcon className="w-6 h-6 text-white" />` after text

**2d. Admin Dashboard item styling** (conditional, same pattern as Logout):
- Same structure as Logout item but no icon (or add appropriate icon later)
- `bg-transparent hover:bg-white/10`

**2e. Logout item styling**:
- Replace: `w-full text-left px-4 py-3 text-white text-sm font-bold hover:bg-white/10 border-t border-white/10`
- With: `w-full h-14 flex items-center gap-1 p-4 rounded bg-transparent hover:bg-white/10 active:bg-[rgba(255,234,158,0.3)] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 transition-colors duration-150 cursor-pointer`
- Add text styling: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`
- Add `<ChevronRightIcon className="w-6 h-6 text-white" />` after text
- Remove `border-t border-white/10` separator

**Deliverables**: Component visually matches Figma design. All colors, spacing, typography, icons, and animation applied.

### Phase 3: Keyboard Navigation (US5 — Accessibility)
Add keyboard navigation to `components/ui/profile-dropdown.tsx`:

**3a. Add state**:
```tsx
const [focusIndex, setFocusIndex] = useState(-1);
const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
```

**3b. Build menu items array** (dynamic based on `isAdmin`):
```tsx
const menuItems = [
  { key: 'profile', action: () => { setIsOpen(false); router.push('/profile'); } },
  ...(isAdmin ? [{ key: 'admin', action: () => { setIsOpen(false); router.push('/admin'); } }] : []),
  { key: 'logout', action: handleSignOut },
];
```

**3c. Focus management on open**:
```tsx
useEffect(() => {
  if (isOpen) {
    setFocusIndex(0);
    itemRefs.current[0]?.focus();
  } else {
    setFocusIndex(-1);
  }
}, [isOpen]);
```

**3d. Trigger keyboard handler** (`onKeyDown` on the avatar button):
- `Enter`/`Space` → toggle dropdown
- `Escape` → close dropdown

**3e. List keyboard handler** (`onKeyDown` on the dropdown panel):
- `ArrowDown` → focus next item (wrap around)
- `ArrowUp` → focus previous item (wrap around)
- `Enter`/`Space` → execute focused item's action
- `Escape` → close dropdown, return focus to trigger button

**3f. TabIndex management**:
- Each menu item: `tabIndex={focusIndex === index ? 0 : -1}`
- Ref assignment: `ref={(el) => { itemRefs.current[index] = el; }}`

**Deliverables**: Full keyboard navigation matching LanguageSelector pattern. All menu items keyboard-accessible.

### Phase 4: Edge Cases & Error Handling (Spec Edge Cases)

**4a. Logout failure handling**:
- Current code doesn't handle `signOut()` failure. Add try/catch:
```tsx
async function handleSignOut() {
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Silently proceed — redirect to login regardless
    }
  }
  router.push('/login');
}
```
- **Decision**: Redirect to `/login` even on failure (spec says "show generic error or retry silently" — silent redirect is safest since the user explicitly wants to leave).

**4b. Browser navigation while open**:
- The dropdown already closes on click-outside. Browser back/forward triggers a route change, which unmounts/re-renders. The `isOpen` state resets to `false` on re-render. **No additional handling needed.**

**Deliverables**: Robust error handling for signOut, browser nav edge case verified.

### Phase 5: Testing (Constitution: TDD)

**5a. Unit tests** (`components/ui/__tests__/profile-dropdown.test.tsx`):

| Test Case | What It Verifies |
|---|---|
| renders trigger button with avatar | Avatar image rendered when `avatarUrl` provided |
| renders trigger button with UserIcon fallback | UserIcon rendered when no `avatarUrl` |
| opens dropdown on click | `role="menu"` appears after click |
| closes dropdown on outside click | Dropdown disappears on outside mousedown |
| closes dropdown on trigger re-click | Toggle behavior |
| shows Profile item with golden background | Profile item has `bg-[rgba(255,234,158,0.1)]` |
| shows Profile item with UserIcon | UserIcon present in Profile item |
| shows Logout item with ChevronRightIcon | ChevronRightIcon present in Logout item |
| shows Admin Dashboard when isAdmin=true | Conditional rendering |
| hides Admin Dashboard when isAdmin=false | Conditional rendering |
| navigates to /profile on Profile click | `router.push('/profile')` called |
| calls signOut and navigates to /login on Logout | `supabase.auth.signOut()` + `router.push('/login')` |
| keyboard: ArrowDown moves focus | Focus moves to next item |
| keyboard: ArrowUp moves focus | Focus moves to previous item |
| keyboard: Enter triggers action | Focused item action executes |
| keyboard: Escape closes dropdown | Dropdown closes, focus returns to trigger |
| displays translated text | `t('profile.profile')` and `t('profile.signOut')` rendered |
| has correct ARIA attributes | role, aria-expanded, aria-haspopup verified |

**Deliverables**: Comprehensive test suite covering visual, functional, keyboard, and accessibility requirements.

---

## Visual Change Summary (Current → Target)

| Property | Current Code | Figma Target |
|---|---|---|
| Container bg | `bg-[#0B0F12]` | `bg-[#00070C]` |
| Container border | `border-white/10` | `border-[#998C5F]` |
| Container padding | implicit (none) | `p-1.5` (6px) |
| Container animation | none | `animate-in fade-in slide-in-from-top-1 duration-150` |
| Email section | shown | **removed** |
| Profile item bg | none | `bg-[rgba(255,234,158,0.1)]` |
| Profile item text | `text-sm` | `font-montserrat text-base font-bold leading-6 tracking-[0.15px]` |
| Profile text glow | none | `textShadow: var(--text-shadow-golden)` |
| Profile icon | none | `UserIcon` 24x24 right of text |
| Logout item border-t | `border-t border-white/10` | **removed** |
| Logout icon | none | `ChevronRightIcon` 24x24 right of text |
| Item height | auto | `h-14` (56px) |
| Item padding | `px-4 py-3` | `p-4` (16px all) |
| Item layout | block text-left | `flex items-center gap-1` |
| Profile hover | `hover:bg-white/10` | `hover:bg-[rgba(255,234,158,0.2)]` |
| Logout hover | `hover:bg-white/10` | `hover:bg-white/10` (same) |
| Active state | none | `active:bg-[rgba(255,234,158,0.3)]` |
| Focus outline | none on items | `focus-visible:outline-2 outline-[#FFEA9E] outline-offset-2` |
| EN "Sign out" label | "Sign out" | "Logout" |
| Keyboard nav | none | ArrowUp/Down, Enter, Escape |

---

## Testing Strategy

| Type | Focus | Target |
|---|---|---|
| Unit | Component rendering, props, conditional menu items, ARIA attributes | All 18+ test cases in Phase 5 |
| Integration | Click handlers (router.push, supabase.signOut), keyboard nav flow, i18n text | Mock router + supabase, test full interaction flows |
| Visual | Figma match — colors, spacing, typography, icons, animation | Manual browser verification against `assets/frame.png` |
| Accessibility | Keyboard-only navigation, screen reader roles, focus management | Automated ARIA checks + manual keyboard walkthrough |

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| `animate-in` classes not available | Medium — no animation on open | Low — LanguageSelector already uses them successfully | Verify by checking LanguageSelector works in browser. If not available, use Tailwind `transition` + conditional classes as fallback. |
| ChevronRightIcon path doesn't match Figma | Low — visual mismatch | Low — simple SVG path | Cross-reference with Figma frame screenshot. The `>` shape is a basic path: `M9 6l6 6-6 6` (stroke) or `M10 7L15 12L10 17H10Z` (fill). |
| Removing email section breaks expected UX | Low — minor info loss | Medium — users may expect to see email | The Figma design explicitly doesn't show email. If needed later, it can be re-added as a separate item above Profile. |
| Keyboard focus management conflicts with click-outside | Medium — dropdown may close unexpectedly | Low — LanguageSelector handles this correctly | Use `mousedown` (not `click`) for outside detection, matching existing pattern. Keyboard events don't trigger mousedown. |
| EN translation change "Sign out" → "Logout" affects other screens | Low — only used in this dropdown | Very Low — `profile.signOut` key is only referenced in ProfileDropdown | Grep confirms: key only used in `profile-dropdown.tsx`. Safe to change. |

---

## Open Questions

- [ ] **Admin Dashboard item icon**: The Figma design (`z4sCl3_Qtk`) shows only Profile and Logout. The admin variant exists as a separate screen (`54rekaCHG1` — `Dropdown-profile Admin`). Should the Admin Dashboard item use a specific icon, or remain text-only for now until the admin variant spec is created?
- [ ] **Admin item styling**: Should the Admin Dashboard item follow Logout styling (transparent bg, no glow) or Profile styling (golden bg, glow)? The current implementation treats it like any other menu item. Figma for the admin variant hasn't been spec'd yet.

---

## Implementation Order (Recommended)

```
Phase 0: ChevronRightIcon creation          (~15 min)
Phase 1: i18n translation update            (~5 min)  
Phase 2: Visual restyling                   (~45 min)
Phase 3: Keyboard navigation                (~30 min)
Phase 4: Edge case handling                 (~10 min)
Phase 5: Unit tests                         (~45 min)
──────────────────────────────────────
Total estimated effort: ~2.5 hours
```

Phases 0 and 1 are independent and can be done in parallel. Phase 2 must complete before Phase 3 (keyboard nav depends on the new item structure). Phase 5 can be developed alongside Phases 2-4 (TDD: write test → implement → verify).
