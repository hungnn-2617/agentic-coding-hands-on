# Design Style: Hệ thống giải (Prize System)

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
**Extracted At**: 2026-04-17

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|---|---|---|---|
| --color-bg-primary | #00101A | 100% | Page background, dark navy base |
| --color-bg-header | #101417 | 80% | Header background (semi-transparent) |
| --color-bg-card | #0F0F0F | 100% | SunKudos card background |
| --color-accent-gold | #FFEA9E | 100% | Gold accent: section titles, active nav text, CTA button bg |
| --color-accent-gold-10 | #FFEA9E | 10% | Footer active nav item background |
| --color-text-primary | #FFFFFF | 100% | Body text, numbers, nav text |
| --color-text-decorative | #DBD1C1 | 100% | "KUDOS" large decorative text |
| --color-divider | #2E3940 | 100% | Divider lines (1px separators) |
| --color-border-gold | #998C5F | 100% | User profile icon button border |
| --color-badge-red | #D4271D | 100% | Notification badge dot |
| --color-gradient-overlay | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%) | - | Cover overlay: bottom-to-top dark fade |
| --color-glow-gold | #FAE287 | 100% | Golden glow effect on shadows & text-shadow |

### CSS Variable Tokens (Figma Design System)

| Variable | Fallback | Usage |
|---|---|---|
| --Details-Text-Primary-1 | #FFEA9E | Active nav text, active menu text, award image border |
| --Details-Text-Secondary-1 | #FFF | Footer active nav text |
| --Details-Border | #998C5F | User profile icon button border |
| --Details-Divider | #2E3940 | Footer top border, section dividers |
| --Details-TextButton-Normal | rgba(0,0,0,0) | Text button default background (transparent) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| --text-decorative-xl | SVN-Gotham | 96.16px | 400 | 24.04px | -13% |
| --text-heading-1 | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-heading-2 | Montserrat | 36px | 700 | 44px | 0px |
| --text-heading-3 | Montserrat | 24px | 700 | 32px | 0px |
| --text-body | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-nav | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0% |
| --text-menu | Montserrat | 14px | 700 | 20px | 0.25px |
| --text-label-sm | Montserrat | 14px | 700 | 20px | 0.1px |

### Text Alignment

| Context | Alignment |
|---|---|
| Navigation text | center |
| Page subtitle | center |
| Copyright | center |
| Section titles | left |
| Body descriptions | justified |
| Numbers & labels | left |

### Text Effects

| Effect | Value | Usage |
|---|---|---|
| Active nav glow | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active navigation text (golden glow) |

### Spacing

| Token Name | Value | Usage |
|---|---|---|
| --spacing-page-section | 120px | Between main page sections |
| --spacing-section | 80px | Between award sections (D.1-D.6); B_He thong giai children |
| --spacing-header-nav | 64px | Between logo and nav items in header |
| --spacing-footer-nav | 48px | Between footer nav items |
| --spacing-card-inner | 40px | Between picture and content in award cards; KV children |
| --spacing-content | 32px | Between content blocks inside award cards; SunKudos content |
| --spacing-md | 24px | Between nav items in header; content paragraphs |
| --spacing-sm | 16px | Between menu items; between icon and label; header right-side items |
| --spacing-xs | 10px | KV frame inner; Awards-Name inner |
| --spacing-xxs | 8px | Between number and unit text; notification button inner |
| --spacing-3xs | 4px | Between icon and text in nav buttons |
| --spacing-4xs | 2px | Language button inner |

### Padding

| Context | Value |
|---|---|
| Main content area (Bia) | 96px 144px |
| Header | 12px 144px |
| Footer | 40px 90px |
| Button/nav items | 16px |
| Icon buttons | 10px |
| Award picture inner | 149.864px 53.455px |

### Border & Radius

| Token Name | Value | Usage |
|---|---|---|
| --radius-none | 0px | Default frames and containers |
| --radius-sm | 4px | Buttons (nav, CTA, icon) |
| --radius-lg | 16px | Content containers, award card content areas, SunKudos card |
| --radius-xl | 24px | Award picture images (rounded square) |
| --radius-full | 100px | Notification badge dot (circle) |
| --border-award-image | 0.955px solid #FFEA9E | Award picture frame (golden thin line) |
| --border-active-menu | 1px solid #FFEA9E | Active menu item bottom border (gold underline) |
| --border-profile | 1px solid #998C5F | User profile button border |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|---|---|---|
| --shadow-award-glow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award picture cards (dark shadow + golden glow, mix-blend-mode: screen) |

### Backdrop Filters

| Token Name | Value | Usage |
|---|---|---|
| --backdrop-glass | blur(32px) | Award content panels (frosted glass effect) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|---|---|---|
| Page width | 1440px | Fixed desktop width |
| Content padding-x | 144px | Main content horizontal padding |
| Content padding-y | 96px | Main content vertical padding |
| Content width (inner) | 1152px | 1440 - (144 * 2) |

### Page Structure

| Property | Value | Notes |
|---|---|---|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| padding-top | 80px | **Offset for fixed header** (header height) |
| Main section gap | 120px | Between page-level sections |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Page (w: 1440px, h: 6410px, bg: #00101A)                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Header (w: 1440, h: 80, p: 12px 144px, bg: #101417/80%)               ││
│  │  ┌────────┐ 64px ┌──────────────────────────┐   ┌───────────────────┐  ││
│  │  │ Logo   │      │  Nav Items (gap: 24px)    │   │ Lang|Notif|Avatar │  ││
│  │  │ 52x48  │      │  About|Award Info|Kudos   │   │ (gap: 16px)      │  ││
│  │  └────────┘      └──────────────────────────┘   └───────────────────┘  ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Key Visual (w: 1440, h: 547px)                                         ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │  Background Image + Gradient Overlay                             │   ││
│  │  │  "ROOT FURTHER" artwork                                          │   ││
│  │  └──────────────────────────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Main Content "Bia" (w: 1440, p: 96px 144px, gap: 120px)               ││
│  │                                                                          ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │  A: Title Section (w: 1152, h: 129px, gap: 32px)                │   ││
│  │  │  "Sun* Annual Awards 2025"  (24px, white)                        │   ││
│  │  │  "Hệ thống giải thưởng SAA 2025"  (57px, gold)                  │   ││
│  │  └──────────────────────────────────────────────────────────────────┘   ││
│  │                             120px                                        ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │  B: Prize System (w: 1152, h: 4833px, flex-row, gap: 80px)      │   ││
│  │  │                                                                  │   ││
│  │  │  ┌─────────────┐  80px  ┌──────────────────────────────────┐    │   ││
│  │  │  │ C: Sidebar   │       │ D: Award Cards (w: 853, gap: 80) │    │   ││
│  │  │  │ Menu         │       │                                  │    │   ││
│  │  │  │ w: 178       │       │ ┌────────────────────────────┐   │    │   ││
│  │  │  │ h: 448       │       │ │ D.1 Top Talent (856x631)   │   │    │   ││
│  │  │  │ gap: 16px    │       │ │ ┌──────┐ 40px ┌────────┐   │   │    │   ││
│  │  │  │              │       │ │ │ Pic  │      │Content │   │   │    │   ││
│  │  │  │ ● Top Talent │       │ │ │336x336│     │ 480px  │   │   │    │   ││
│  │  │  │ ○ Top Project│       │ │ │ r:24px│     │ r:16px │   │   │    │   ││
│  │  │  │ ○ Top PL     │       │ │ │ glow  │     │ blur   │   │   │    │   ││
│  │  │  │ ○ Best Mgr   │       │ │ └──────┘      └────────┘   │   │    │   ││
│  │  │  │ ○ Signature  │       │ │ ─────── divider ────────── │   │    │   ││
│  │  │  │ ○ MVP        │       │ └────────────────────────────┘   │    │   ││
│  │  │  │              │       │              80px                 │    │   ││
│  │  │  │              │       │ ┌────────────────────────────┐   │    │   ││
│  │  │  │              │       │ │ D.2 Top Project (856x679)  │   │    │   ││
│  │  │  │              │       │ └────────────────────────────┘   │    │   ││
│  │  │  │              │       │ ... D.3, D.4, D.5, D.6 ...      │    │   ││
│  │  │  └─────────────┘       └──────────────────────────────────┘    │   ││
│  │  └──────────────────────────────────────────────────────────────────┘   ││
│  │                             120px                                        ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │  D1: SunKudos Card (w: 1152, h: 500, r: 16px, bg: #0F0F0F)     │   ││
│  │  │  ┌──────────────────────┐   ┌──────────┐  ┌─────────────┐      │   ││
│  │  │  │ Content (470x408)    │   │ Illust.  │  │ "KUDOS" text│      │   ││
│  │  │  │ Title + Desc + CTA   │   │ 272x219  │  │ 96px        │      │   ││
│  │  │  │ [Chi tiết] btn       │   │          │  │ SVN-Gotham  │      │   ││
│  │  │  └──────────────────────┘   └──────────┘  └─────────────┘      │   ││
│  │  └──────────────────────────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Footer (w: 1440, p: 40px 90px, border-top: 1px #2E3940)               ││
│  │  ┌────────┐ ┌──────────────────────────────┐  ┌──────────────────────┐ ││
│  │  │ Logo   │ │ Nav (gap: 48px)               │  │ Copyright            │ ││
│  │  │ 69x64  │ │ About|Award|Sun*Kudos|Rules   │  │ "Ban quyen..."       │ ││
│  │  └────────┘ └──────────────────────────────┘  └──────────────────────┘ ││
│  └──────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header Bar

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 313:8436 (parent) | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | #101417 | `background: rgba(16, 20, 23, 0.8)` |
| position | fixed | `position: fixed; top: 0; left: 0; z-index: 50` |
| backdrop-filter | blur(12px) | `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)` *(recommended for readability — verify against Figma)* |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |

---

### Navigation Button (Active State)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | varies per nav item | - |
| padding | 16px | `padding: 16px` |
| background | transparent | `background: transparent` |
| border-radius | 4px | `border-radius: 4px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFEA9E | `color: var(--Details-Text-Primary-1)` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Golden glow |
| border-bottom | 1px solid #FFEA9E | `border-bottom: 1px solid var(--Details-Text-Primary-1)` |

**States:**
| State | Changes |
|---|---|
| Default | color: #FFFFFF, no border-bottom, no text-shadow |
| Hover | color: #FFEA9E (highlight) |
| Active | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: golden glow |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px, border-radius: 4px |

---

### Sidebar Menu Item (C_Menu list)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 313:8459 | - |
| width | 178px | `width: 178px` |
| display | flex / column | `display: flex; flex-direction: column` |
| gap | 16px | `gap: 16px` |
| position | sticky | `position: sticky; top: 104px` (80px header + 24px offset) |
| align-self | flex-start | `align-self: flex-start` (prevents stretching in flex row) |

**Menu Item:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.25px | `letter-spacing: 0.25px` |
| gap (icon-text) | 4px | `gap: 4px` |

**States:**
| State | Changes |
|---|---|
| Default | color: #FFFFFF, no icon indicator |
| Hover | color: #FFEA9E |
| Active | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, leading icon indicator visible |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Award Card (D.1 - D.6)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | D.1: 313:8467, D.2: 313:8468, D.3: 313:8469, D.4: 313:8470, D.5: 313:8471, D.6: 313:8510 | - |
| width | 856px | `width: 100%` |
| height | varies (631-1047px) | `height: auto` |
| display | flex / column | `display: flex; flex-direction: column` |
| gap | 80px | `gap: 80px` (between content row and divider) |

**Award Card Inner Row:**
| Property | Value | CSS |
|---|---|---|
| display | flex / row | `display: flex; flex-direction: row` |
| gap | 40px | `gap: 40px` |
| align-items | flex-start | `align-items: flex-start` |

**Note:** Cards D.1, D.3, D.5 = picture-left, content-right. Cards D.2, D.4, D.6 = content-left, picture-right.

---

### Award Picture Image

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I313:8467;214:2525 (D.1 example) | - |
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |
| border-radius | 24px | `border-radius: 24px` |
| border | 0.955px solid #FFEA9E | `border: 1px solid var(--color-accent-gold)` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: var(--shadow-award-glow)` |
| mix-blend-mode | screen | `mix-blend-mode: screen` |
| padding | ~150px 53px | Internal padding for badge centering |

---

### Award Content Panel

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I313:8467;214:2526 (D.1 example) | - |
| width | 480px | `width: 480px` |
| height | varies | `height: auto` |
| background | rgba(255, 255, 255, 0.05) | `background: rgba(255, 255, 255, 0.05)` (semi-transparent for glassmorphism) |
| border-radius | 16px | `border-radius: 16px` |
| backdrop-filter | blur(32px) | `backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px)` |
| display | flex / column | `display: flex; flex-direction: column` |
| gap | 32px | `gap: 32px` |
| padding | 32px | `padding: 32px` (estimated from content spacing) |

**Browser fallback**: For browsers not supporting `backdrop-filter`, use `background: rgba(0, 16, 26, 0.85)` as a solid dark fallback.

**Content Typography:**
| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Award title (with decorative icon/bullet before text) | Montserrat | 24px | 700 | #FFEA9E |
| Award description | Montserrat | 16px | 700 | #FFFFFF |
| "Số lượng giải thưởng:" label | Montserrat | 24px | 700 | #FFEA9E |
| Prize count number | Montserrat | 36px | 700 | #FFFFFF |
| Unit label ("Cá nhân", "Đơn vị") | Montserrat | 14px | 700 | #FFFFFF |
| "Giá trị giải thưởng:" label | Montserrat | 24px | 700 | #FFEA9E |
| Prize value ("7.000.000 VNĐ") | Montserrat | 36px | 700 | #FFFFFF |
| Value note ("cho mỗi giải thưởng") | Montserrat | 14px | 700 | #FFFFFF |

---

### Section Divider

| Property | Value | CSS |
|---|---|---|
| width | 853px (full) or 480px (within content) | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background: var(--color-divider)` |

---

### "Hoặc" (Or) Divider — Signature 2025 Only

Used between the two prize value sections in the Signature 2025 - Creator card.

| Property | Value | CSS |
|---|---|---|
| width | ~434px | `width: 100%` |
| display | flex / row | `display: flex; flex-direction: row; align-items: center` |
| gap | 8px | `gap: 8px` |

**Structure**: `[Line] — "Hoặc" — [Line]`
| Element | Property | Value |
|---|---|---|
| Left/Right line | height | 1px |
| Left/Right line | flex | 1 |
| Left/Right line | background | #2E3940 |
| "Hoặc" text | font | Montserrat 14px/700 |
| "Hoặc" text | color | #2E3940 |

---

### SunKudos Card

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 335:12023 | - |
| width | 1152px | `width: 100%` |
| height | 500px | `height: 500px` |
| border-radius | 16px | `border-radius: 16px` |
| background | #0F0F0F | `background: #0F0F0F` |
| display | flex / row | `display: flex; flex-direction: row` |
| align-items | center | `align-items: center` |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` (for decorative "KUDOS" text positioning) |

**Inner layout:**
| Element | Position | Dimensions | Notes |
|---|---|---|---|
| Content (text + CTA) | Left | 470x408px | `flex: none`, `padding: ~46px`, `z-index: 1` |
| Illustration | Right | 272x219px | Positioned beside content |
| "KUDOS" decorative text | Overlay/right | 319x67px | `position: absolute`, decorative background element, low opacity or blend |

**CTA Button ("Chi tiết"):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I335:12023;313:8426 | - |
| width | 127px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background: var(--color-accent-gold)` |
| border-radius | 4px | `border-radius: 4px` |
| color | #00101A | `color: var(--color-bg-primary)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |

**States:**
| State | Changes |
|---|---|
| Default | bg: #FFEA9E, color: #00101A |
| Hover | transform: translateY(-1px), box-shadow: 0 2px 8px rgba(255,234,158,0.3) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled | bg: #6B7280, color: #9CA3AF, cursor: not-allowed |

---

### SunKudos Card — Content Typography

| Element | Font | Size | Weight | Line Height | Color |
|---|---|---|---|---|---|
| Label "ĐIỂM MỚI CỦA SAA 2025" | Montserrat | 14px | 700 | 20px | #FFFFFF |
| Subtitle "Phong trào ghi nhận" | Montserrat | 24px | 700 | 32px | #FFFFFF |
| Title "Sun* Kudos" | Montserrat | 57px | 700 | 64px | #FFEA9E |
| Description text | Montserrat | 16px | 700 | 24px | #FFFFFF |
| "KUDOS" decorative text | SVN-Gotham | 96.16px | 400 | 24.04px | #DBD1C1 |

---

### Footer

| Property | Value | CSS |
|---|---|---|
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |

**Footer Nav Item:**
| State | Changes |
|---|---|
| Default | color: #FFFFFF, background: transparent |
| Hover | color: #FFEA9E |
| Active | background: rgba(255, 234, 158, 0.1), color: #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
Page (w: 1440px, bg: #00101A)
├── Header (h: 80px, p: 12px 144px, bg: rgba(16,20,23,0.8), flex, row, center, space-between)
│   ├── Left (flex, row, center, gap: 64px)
│   │   ├── Logo (52x48px)
│   │   └── Nav (flex, row, center, gap: 24px)
│   │       ├── NavItem "About SAA 2025" (16px/700, #FFF, p: 16px, r: 4px)
│   │       ├── NavItem "Award Information" [ACTIVE] (16px/700, #FFEA9E, border-b: 1px gold, text-shadow)
│   │       └── NavItem "Sun* Kudos" (16px/700, #FFF, p: 16px, r: 4px)
│   └── Right (flex, row, center, gap: 16px)
│       ├── LangSelector (108x56px, flex, gap: 2px) → Flag(24x24) + "VN" + ChevronDown
│       ├── NotificationBtn (40x40px, p: 10px) → BellIcon(24x24) + Badge(8x8, #D4271D, r: 100px)
│       └── AvatarBtn (40x40px, p: 10px, border: 1px #998C5F) → PersonIcon(24x24)
│
├── KeyVisual (w: 1440, h: 547px)
│   ├── BackgroundImage (cover, center crop)
│   └── GradientOverlay (w: 1440, h: 627px, linear-gradient bottom-fade)
│
├── Bia - Main Content (w: 1440, p: 96px 144px, flex, col, gap: 120px)
│   ├── KV Branding (gap: 40px)
│   │   ├── Logo Image (338x150px)
│   │   └── RootFurtherText
│   │
│   ├── A: Title Section (w: 1152, h: 129px, flex, col, center, gap: 32px)
│   │   ├── Subtitle "Sun* Annual Awards 2025" (24px/700, #FFF)
│   │   └── Title "Hệ thống giải thưởng SAA 2025" (57px/700, #FFEA9E)
│   │
│   ├── B: Prize System (w: 1152, h: 4833px, flex, row, start, space-between, gap: 80px)
│   │   ├── C: Sidebar Menu (w: 178, h: 448, flex, col, gap: 16px)
│   │   │   ├── C.1 "Top Talent" [ACTIVE] (14px/700, #FFEA9E, border-b: gold)
│   │   │   ├── C.2 "Top Project" (14px/700, #FFF)
│   │   │   ├── C.3 "Top Project Leader" (14px/700, #FFF, 2-line)
│   │   │   ├── C.4 "Best Manager" (14px/700, #FFF)
│   │   │   ├── C.5 "Signature 2025 - Creator" (14px/700, #FFF, 2-line)
│   │   │   └── C.6 "MVP" (14px/700, #FFF)
│   │   │
│   │   └── D: Award Cards (w: 853, flex, col, gap: 80px)
│   │       ├── D.1 Top Talent (856x631, flex, col, gap: 80px)
│   │       │   ├── Inner (flex, row, gap: 40px)
│   │       │   │   ├── Picture (336x336, r: 24px, border: gold, shadow: glow)
│   │       │   │   └── Content (480px, r: 16px, backdrop: blur(32px), flex, col, gap: 32px)
│   │       │   │       ├── Title "Top Talent" (24px/700, #FFEA9E)
│   │       │   │       ├── Description (16px/700, #FFF, justified)
│   │       │   │       ├── "Số lượng giải thưởng:" (24px/700, #FFEA9E) + "10" (36px) + "Đơn vị" (14px)
│   │       │   │       └── "Giá trị giải thưởng:" (24px/700, #FFEA9E) + "7.000.000 VNĐ" (36px) + "cho mỗi giải" (14px)
│   │       │   └── Divider (853x1px, #2E3940)
│   │       │
│   │       ├── D.2 Top Project (856x679) — content-LEFT, picture-RIGHT
│   │       │   └── Count: "02" / Value: "15.000.000 VNĐ"
│   │       ├── D.3 Top Project Leader (856x679) — picture-LEFT
│   │       │   └── Count: "03" / Value: "7.000.000 VNĐ"
│   │       ├── D.4 Best Manager (856x667) — content-LEFT
│   │       │   └── Count: "01" / Value: "10.000.000 VNĐ"
│   │       ├── D.5 Signature 2025 (856x1047) — picture-LEFT
│   │       │   └── Count: "01" / Ind: "5.000.000 VNĐ" / Team: "8.000.000 VNĐ"
│   │       └── D.6 MVP (856x730) — content-LEFT
│   │           └── Count: "01" / Value: "15.000.000 VNĐ"
│   │
│   └── D1: SunKudos (w: 1152, h: 500, r: 16px, bg: #0F0F0F, flex, ROW, relative)
│       ├── Content (470x408, flex, col, gap: 32px, z-index: 1)
│       │   ├── Label "ĐIỂM MỚI CỦA SAA 2025" (14px)
│       │   ├── Subtitle "Phong trào ghi nhận" (24px/700, #FFF)
│       │   ├── Title "Sun* Kudos" (57px/700, #FFEA9E)
│       │   ├── Description (16px/700)
│       │   └── CTA "Chi tiết" (127x56, bg: #FFEA9E, color: #00101A, r: 4px)
│       ├── Illustration (272x219, right side)
│       └── "KUDOS" Decorative (319x67, SVN-Gotham, 96px, #DBD1C1, absolute, decorative)
│
└── Footer (w: 1440, p: 40px 90px, border-top: 1px #2E3940, flex, center, between)
    ├── Logo (69x64)
    ├── Nav (flex, row, gap: 48px)
    │   ├── "About SAA 2025" (16px/700)
    │   ├── "Award Information" [ACTIVE] (bg: gold/10%, color: #FFEA9E, text-shadow)
    │   ├── "Sun* Kudos" (16px/700)
    │   └── "Tiêu chuẩn chung" (16px/700)
    └── Copyright "Bản quyền thuộc về Sun* (c) 2025" (Montserrat Alternates, 16px)
```

---

## Responsive Specifications

### Breakpoints (per Constitution)

| Name | Min Width | Max Width |
|---|---|---|
| Mobile | 0 | 639px |
| Tablet (sm) | 640px | 767px |
| Tablet (md) | 768px | 1023px |
| Desktop (lg) | 1024px | 1279px |
| Desktop (xl) | 1280px | ∞ |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|---|---|
| Page | padding: 16px |
| Header | p: 12px 16px, hamburger menu replaces nav |
| Sidebar menu | Hidden or horizontal scroll tabs above content |
| Award cards | Stack vertically: picture on top, content below (full width) |
| Award card row | flex-direction: column, gap: 24px |
| Picture | width: 100%, max-width: 336px, margin: 0 auto |
| Content panel | width: 100% |
| Title (57px) | font-size: 32px |
| Prize value (36px) | font-size: 24px |
| SunKudos card | Stack vertically, illustration hidden or below |
| Footer | flex-direction: column, center-aligned, gap: 24px |

#### Tablet (640px - 1023px)

| Component | Changes |
|---|---|
| Page | padding: 24px 48px |
| Sidebar menu | Horizontal tab bar above award cards |
| Award cards | Picture: 240px, Content: fill remaining |
| SunKudos | Content takes full width, illustration beside |
| Footer | 2-row layout if needed |

#### Desktop (>= 1024px)

| Component | Changes |
|---|---|
| Page | max-width: 1440px, padding: 96px 144px |
| Sidebar menu | Fixed sidebar on left (178px) |
| Award cards | Full layout as designed (856px) |
| All components | Match Figma design exactly |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|---|---|---|---|
| Bell / Notification | 24x24 | #FFFFFF | Header notification button |
| Person / Avatar | 24x24 | #FFFFFF | Header user profile button |
| ChevronDown | 24x24 | #FFFFFF | Language dropdown indicator |
| Flag (VN) | 24x24 (inner: 20x15) | - | Language selector flag |
| Arrow Right | 24x24 | #00101A | CTA button "Chi tiết" icon |
| Menu indicator | - | #FFEA9E | Active sidebar menu item dot/icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---|---|---|---|---|
| Nav item | color, text-shadow, border-bottom | 200ms | ease-in-out | Hover/Active |
| Sidebar menu item | color, border-bottom | 200ms | ease-in-out | Click |
| CTA Button | transform, box-shadow | 150ms | ease-out | Hover |
| Award card | scroll-into-view | 300ms | ease-out | Sidebar click (smooth scroll) |
| Header | background opacity | 200ms | ease-in-out | Scroll (sticky) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|---|---|---|---|
| Page container | 313:8436 | `bg-[#00101A] min-h-screen` | `<PrizeSystemPage />` |
| Header | - | `fixed top-0 w-full h-20 bg-[#101417]/80 backdrop-blur` | `<Header />` (shared) |
| Key Visual | 313:8437 | `relative w-full h-[547px] overflow-hidden` | `<HeroSection />` |
| Title Section | 313:8453 | `flex flex-col items-center gap-8` | `<SectionTitle />` |
| Sidebar Menu | 313:8459 | `flex flex-col gap-4 w-[178px] sticky top-[104px]` | `<PrizeSidebar />` |
| Menu Item | 313:8460-8465 | `text-sm font-bold tracking-wide cursor-pointer` | `<PrizeSidebarItem />` |
| Award Card | 313:8467-8510 | `flex gap-10` | `<AwardCard />` |
| Award Picture | I313:8467;214:2525 | `w-[336px] h-[336px] rounded-3xl border border-[#FFEA9E]` | `<AwardImage />` |
| Award Content | I313:8467;214:2526 | `w-[480px] rounded-2xl backdrop-blur-[32px] flex flex-col gap-8` | `<AwardContent />` |
| Divider | - | `w-full h-px bg-[#2E3940]` | `<Divider />` |
| SunKudos Card | 335:12023 | `w-full h-[500px] rounded-2xl bg-[#0F0F0F] flex flex-row relative overflow-hidden` | `<SunKudosCard />` |
| CTA Button | I335:12023;313:8426 | `px-4 py-4 bg-[#FFEA9E] text-[#00101A] rounded font-bold` | `<Button variant="gold" />` |
| Footer | - | `w-full border-t border-[#2E3940] px-[90px] py-10` | `<Footer />` (shared) |

---

## Notes

- All colors should use CSS variables / Tailwind config for theming support
- **Montserrat** font must be loaded via Google Fonts (weights: 700)
- **Montserrat Alternates** needed for copyright text only
- **SVN-Gotham** needed for decorative "KUDOS" text — load as local font
- Award cards use **alternating layout**: odd (1,3,5) = picture-left, even (2,4,6) = picture-right
- Sidebar menu should use **sticky positioning** and **smooth scroll** to anchor sections
- Award content panels use **glassmorphism** (backdrop-filter: blur(32px))
- Award images use **golden glow** shadow with mix-blend-mode: screen
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- Ensure color contrast meets WCAG AA (gold #FFEA9E on dark #00101A = ratio ~13:1, passes AAA)
