# Design Style: Viết Kudo (Write Kudo)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/ihQ26W78P2
**Extracted At**: 2026-04-20

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|---|---|---|---|
| --color-bg-page | #00101A | 100% | Page background, primary text color |
| --color-bg-overlay | #00101A | 80% | Modal overlay (dark scrim behind modal) |
| --color-bg-header | #101417 | 80% | Header background (semi-transparent) |
| --color-bg-modal | #FFF8E1 | 100% | Modal background (warm cream/ivory) `rgba(255, 248, 225, 1)` |
| --color-bg-input | #FFFFFF | 100% | Input fields, textarea, dropdown backgrounds |
| --color-accent-gold | #FFEA9E | 100% | Primary CTA button background, active nav text, golden accents |
| --color-accent-gold-10 | #FFEA9E | 10% | Secondary button background `rgba(255, 234, 158, 0.10)` |
| --color-text-primary | #00101A | 100% | Modal title, section labels, button text on gold bg `rgba(0, 16, 26, 1)` |
| --color-text-white | #FFFFFF | 100% | Header nav text, input backgrounds |
| --color-text-placeholder | #999999 | 100% | Placeholder text, checkbox label (unchecked), chip text `rgba(153, 153, 153, 1)` |
| --color-text-hint | #00101A | 100% | Hint text below textarea |
| --color-border | #998C5F | 100% | All bordered inputs, dropdowns, toolbar buttons, chips |
| --color-border-checkbox | #999999 | 100% | Unchecked checkbox border |
| --color-required | #CF1322 | 100% | Required asterisk (*) red `rgba(207, 19, 34, 1)` |
| --color-error-badge | #D4271D | 100% | Notification badge, image remove button red `rgba(212, 39, 29, 1)` |
| --color-error-count | #E46060 | 100% | Character count warning text `rgba(228, 96, 96, 1)` |
| --color-divider | #2E3940 | 100% | Divider lines |
| --color-nav-active | #FFEA9E | 100% | Active nav text and border |
| --color-nav-glow | #FAE287 | 100% | Active nav text-shadow glow |
| --color-transparent | rgba(0,0,0,0) | 0% | Transparent button backgrounds |

### CSS Variable Tokens (Figma Design System)

| Variable | Fallback | Usage |
|---|---|---|
| --Details-Text-Primary-1 | #FFEA9E | Active nav text, image thumbnail border |
| --Details-Text-Secondary-1 | #FFF | Input backgrounds, white surfaces |
| --Details-Text-Secondary-2 | #999 | Placeholder text, chip text, grey states |
| --Details-Border | #998C5F | All bordered inputs, buttons, chips |
| --Details-SecondaryButton-Normal | rgba(255, 234, 158, 0.10) | Secondary/outline button background |
| --Details-TextButton-Normal | rgba(0, 0, 0, 0.00) | Transparent icon button background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0px | Modal heading |
| --text-section-label | Montserrat | 22px | 700 | 28px | 0px | Section labels (Người nhận, Danh hiệu, Hashtag, Image), checkbox label, submit button text |
| --text-body | Montserrat | 16px | 700 | 24px | 0.15px | Input text, placeholder text, button labels, nav text |
| --text-hint | Montserrat | 16px | 700 | 24px | 0.5px | Hint text below textarea |
| --text-required | Noto Sans JP | 16px | 700 | 20px | 0px | Required asterisk (*) |
| --text-chip | Montserrat | 11px | 700 | 16px | 0.5px | Tag chip labels, small hints ("Tối đa 5") |
| --text-nav | Montserrat | 16px | 700 | 24px | 0.15px | Header navigation text |
| --text-nav-small | Montserrat | 14px | 700 | 20px | 0.1px | Smaller nav items |
| --text-error | Montserrat | 14px | 700 | 20px | 0.15px | Validation error messages below fields (color: #CF1322) |

### Text Effects

| Effect | Value | Usage |
|---|---|---|
| Active nav glow | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active navigation text (golden glow) |

### Spacing

| Token Name | Value | Usage |
|---|---|---|
| --spacing-modal-padding | 40px | Modal internal padding (all sides) |
| --spacing-section-gap | 32px | Between form sections within modal |
| --spacing-field-gap | 16px | Between label and input within a section |
| --spacing-content-gap | 24px | Between content blocks (toolbar/textarea/hint) |
| --spacing-input-padding | 16px 24px | Input field internal padding |
| --spacing-toolbar-padding | 10px 16px | Toolbar button internal padding |
| --spacing-cancel-padding | 16px 40px | Cancel button padding |
| --spacing-submit-padding | 16px | Submit button padding |
| --spacing-chip-padding | 4px 8px | Tag chip internal padding |
| --spacing-chip-gap | 8px | Between tag chips |
| --spacing-image-gap | 16px | Between section label and content in image row |
| --spacing-action-gap | 24px | Between Cancel and Submit buttons |
| --spacing-checkbox-gap | 16px | Between checkbox and label text |
| --spacing-header-padding | 12px 144px | Header padding |
| --spacing-header-nav-gap | 64px | Between logo and nav items in header |
| --spacing-header-right-gap | 16px | Between right header items |

### Padding

| Context | Value |
|---|---|
| Modal panel | 40px (all sides) |
| Input fields / Dropdowns | 16px 24px |
| Toolbar buttons | 10px 16px |
| Cancel button | 16px 40px |
| Submit button | 16px |
| Tag chips / Add buttons | 4px 8px |
| Header | 12px 144px |
| Nav buttons | 16px |
| Icon buttons | 10px |

### Border & Radius

| Token Name | Value | Usage |
|---|---|---|
| --radius-modal | 24px | Modal panel container |
| --radius-input | 8px | Input fields, dropdowns, submit button, tag chips |
| --radius-toolbar-first | 8px 0 0 0 | Toolbar first button (Bold) — top-left only |
| --radius-toolbar-last | 0 8px 0 0 | Toolbar last section — top-right only |
| --radius-textarea | 0 0 8px 8px | Textarea — bottom corners only (connected to toolbar) |
| --radius-thumbnail | 18px | Image thumbnail container |
| --radius-thumbnail-inner | 4px | Image thumbnail inner fill |
| --radius-checkbox | 4px | Checkbox control |
| --radius-cancel-btn | 4px | Cancel button |
| --radius-nav | 4px | Navigation buttons |
| --radius-remove-btn | 71px | Image remove button (fully circular) |
| --radius-badge | 100px | Notification badge dot |
| --border-input | 1px solid #998C5F | All inputs, dropdowns, toolbar buttons |
| --border-checkbox | 1px solid #999 | Unchecked checkbox |
| --border-thumbnail | 1px solid #998C5F | Image thumbnail container border |
| --border-thumbnail-inner | 1px solid #FFEA9E | Image thumbnail inner golden border |
| --border-nav-active | border-bottom: 1px solid #FFEA9E | Active nav item underline |
| --border-profile | 1px solid #998C5F | Profile icon button border |

### Shadows

| Token Name | Value | Usage |
|---|---|---|
| --shadow-none | none | Modal panel (no external shadow in design) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|---|---|---|
| Page width | 1440px | Fixed desktop width |
| Modal width | 775px | Fixed desktop modal width |
| Modal height | 1012px | Content-driven (scrollable if needed) |
| Modal content width | 672px | 752 - (40 * 2) inner content |

### Modal Structure

| Property | Value | Notes |
|---|---|---|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| justify-content | flex-start | Top-aligned |
| align-items | flex-start | Left-aligned |
| gap | 32px | Between form sections |
| padding | 40px | All sides |
| border-radius | 24px | Rounded corners |
| background | rgba(255, 248, 225, 1) | Warm cream |
| position | absolute | Centered on overlay |
| z-index | 1 | Above overlay |
| max-height | calc(100vh - 40px) | Prevent overflow on short viewports |
| overflow-y | auto | Scrollable when content exceeds viewport |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Page (w: 1440px, h: 1024px, bg: #00101A)                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Header (w: 1440, h: 80, p: 12px 144px, bg: #101417/80%)               ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Overlay (w: 1440, h: 1024, bg: rgba(0,16,26,0.8))                     ││
│  │                                                                          ││
│  │  ┌──────────────────────────────────────────────────────────────────┐   ││
│  │  │  Modal (w: 752, h: 1012, r: 24px, bg: #FFF8E1, p: 40px)        │   ││
│  │  │  gap: 32px between sections                                      │   ││
│  │  │                                                                  │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  A: Title (w: 672, h: 80, centered)                      │   │   ││
│  │  │  │  "Gửi lời cám ơn và ghi nhận đến đồng đội" (32px)       │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  B: Recipient Row (w: 672, h: 56, flex-row, gap: 16px)   │   │   ││
│  │  │  │  ┌─────────┐  16px  ┌────────────────────────────────┐  │   │   ││
│  │  │  │  │ B.1 Label│       │ B.2 Search Dropdown (flex: 1)  │  │   │   ││
│  │  │  │  │ 146x28   │       │ p: 16px 24px, r: 8px           │  │   │   ││
│  │  │  │  └─────────┘       └────────────────────────────────┘  │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  Danh hiệu Row (w: 672, h: 104)                          │   │   ││
│  │  │  │  ┌─────────┐  16px  ┌────────────────────────────────┐  │   │   ││
│  │  │  │  │ Label    │       │ Text Input (flex: 1)            │  │   │   ││
│  │  │  │  │ 120x28   │       │ p: 16px 24px, r: 8px           │  │   │   ││
│  │  │  │  └─────────┘       └────────────────────────────────┘  │   │   ││
│  │  │  │  Helper text (grey, 16px) below input                     │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  C+D: Content Area (w: 672, h: 444, flex-col, gap: 24px) │   │   ││
│  │  │  │                                                          │   │   ││
│  │  │  │  ┌──────────────────────────────────────────────────┐   │   │   ││
│  │  │  │  │  C: Toolbar (flex-row, h: 40)                     │   │   │   ││
│  │  │  │  │  ┌──┬──┬──┬──┬──┬──┐ ┌──────────────────────┐   │   │   ││
│  │  │  │  │  │B │I │S │# │🔗│❝ │ │ Tiêu chuẩn cộng đồng │   │   │   ││
│  │  │  │  │  │  │  │  │  │  │  │ │ (char count / link)  │   │   │   ││
│  │  │  │  │  └──┴──┴──┴──┴──┴──┘ └──────────────────────┘   │   │   ││
│  │  │  │  └──────────────────────────────────────────────────┘   │   │   ││
│  │  │  │  ┌──────────────────────────────────────────────────┐   │   │   ││
│  │  │  │  │  D: Textarea (h: 200, min-h: 120, r: 0 0 8 8)   │   │   │   ││
│  │  │  │  │  bg: #FFF, border: 1px #998C5F                   │   │   │   ││
│  │  │  │  │  Placeholder: "Hãy gửi gắm lời cám ơn..."       │   │   │   ││
│  │  │  │  └──────────────────────────────────────────────────┘   │   │   ││
│  │  │  │  ┌──────────────────────────────────────────────────┐   │   │   ││
│  │  │  │  │  D.1: Hint (h: 24, text: "@+tên" hint)           │   │   │   ││
│  │  │  │  └──────────────────────────────────────────────────┘   │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  E: Hashtag Row (w: 672, h: 48, flex-row, gap: 16px)     │   │   ││
│  │  │  │  ┌────────┐  16px  ┌────────────────────────────────┐   │   │   ││
│  │  │  │  │E.1 Label│       │ E.2 Tag Group (gap: 8px)       │   │   ││
│  │  │  │  │108x28   │       │ [+ Hashtag] [chip] [chip]...   │   │   ││
│  │  │  │  └────────┘       └────────────────────────────────┘   │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  F: Image Row (w: 672, h: 80, flex-row, gap: 16px)       │   │   ││
│  │  │  │  ┌───────┐ ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐ ┌──────┐│   │   ││
│  │  │  │  │F.1 Lbl│ │ Img ││ Img ││ Img ││ Img ││ Img │ │+Image││   │   ││
│  │  │  │  │74x28  │ │80x80││80x80││80x80││80x80││80x80│ │F.5   ││   │   ││
│  │  │  │  └───────┘ └─────┘└─────┘└─────┘└─────┘└─────┘ └──────┘│   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  G: Anonymous Checkbox (w: 672, h: 28, flex-row, gap:16) │   │   ││
│  │  │  │  ┌────┐  16px  ┌────────────────────────────────────┐   │   │   ││
│  │  │  │  │ □  │        │ "Gửi lời cám ơn...ẩn danh" (22px) │   │   │   ││
│  │  │  │  │24x24│       └────────────────────────────────────┘   │   │   ││
│  │  │  │  └────┘                                                  │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                          32px                                    │   ││
│  │  │  ┌──────────────────────────────────────────────────────────┐   │   ││
│  │  │  │  H: Actions (w: 672, h: 60, flex-row, gap: 24px)         │   │   ││
│  │  │  │  ┌────────────┐  24px  ┌────────────────────────────┐   │   │   ││
│  │  │  │  │ H.1 Hủy ✕  │       │ H.2 Gửi ▷ (flex: 1, 502w) │   │   │   ││
│  │  │  │  │ p:16px 40px │       │ bg: #FFEA9E, r: 8px        │   │   ││
│  │  │  │  │ r: 4px      │       │ h: 60px                    │   │   ││
│  │  │  │  └────────────┘       └────────────────────────────┘   │   │   ││
│  │  │  └──────────────────────────────────────────────────────────┘   │   ││
│  │  │                                                                  │   ││
│  │  └──────────────────────────────────────────────────────────────────┘   ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Modal Panel (Viết KUDO)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | 520:11647 | - |
| width | 775px | `width: 775px` / `max-width: 100%` |
| height | 1012px | `height: auto` (content-driven) |
| padding | 40px | `padding: 40px` |
| background | rgba(255, 248, 225, 1) | `background: #FFF8E1` |
| border-radius | 24px | `border-radius: 24px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| z-index | - | Above overlay |

---

### Modal Title (A)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9870 | - |
| width | 672px | `width: 100%` |
| height | 80px | `height: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |
| text-align | center | `text-align: center` |

---

### Section Label (Người nhận, Danh hiệu, Hashtag, Image)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.1: I520:11647;520:9872, E.1: I520:11647;520:9891, F.1: I520:11647;520:9897 | - |
| display | flex | `display: flex; flex-direction: row; align-items: center; gap: 2px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |

**Required Asterisk (*):**
| Property | Value | CSS |
|---|---|---|
| font-family | Noto Sans JP | `font-family: 'Noto Sans JP', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| color | rgba(207, 19, 34, 1) | `color: #CF1322` |

---

### Search Dropdown / Input Field (B.2 Search Dropdown, Danh hiệu Text Input)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | B.2: I520:11647;520:9873, Danh hiệu: I520:11647;1688:10437 | - |
| flex | 1 0 0 | `flex: 1` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: var(--Details-Text-Secondary-1, #FFF)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |

**Placeholder Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | rgba(153, 153, 153, 1) | `color: #999` |

**Helper Text (below Danh hiệu):**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;1688:10447 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | rgba(153, 153, 153, 1) | `color: #999` |

**States:**
| State | Property | Value |
|---|---|---|
| Default | border | 1px solid #998C5F |
| Focus | border | 1px solid #FFEA9E (gold) |
| Error | border | 1px solid #CF1322 (red) |
| Disabled | background | #F5F5F5, opacity: 0.6 |

---

### Rich Text Toolbar (C)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9877 | - |
| width | 672px (full content width) | `width: 100%` |
| height | 40px | `height: 40px` |
| display | flex | `display: flex; flex-direction: row; align-items: center` |
| justify-content | flex-end | `justify-content: flex-end` |

**Toolbar Button (shared style for C.1-C.6):**
| Property | Value | CSS |
|---|---|---|
| **Node IDs** | C.1: I520:11647;520:9881, C.2: I520:11647;662:11119, C.3: I520:11647;662:11213, C.4: I520:11647;662:10376, C.5: I520:11647;662:10507, C.6: I520:11647;662:10647 | - |
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| background | transparent | `background: var(--Details-TextButton-Normal, transparent)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 8px` |
| icon-size | 24x24 | `width: 24px; height: 24px` |

**Toolbar Button Border Radius:**
| Button | Border Radius | Notes |
|---|---|---|
| C.1 Bold (first) | 8px 0 0 0 | Top-left rounded only |
| C.2-C.5 (middle) | 0 | Square corners |
| C.6 Quote (last icon) | 0 | Square corners |
| Community Standards (rightmost) | 0 8px 0 0 | Top-right rounded only |

**Toolbar Button States:**
| State | Property | Value |
|---|---|---|
| Default | background | transparent |
| Hover | background | rgba(0, 0, 0, 0.05) |
| Active/Pressed | background | rgba(153, 140, 95, 0.2) |
| Focus | outline | 2px solid #FFEA9E |

**Community Standards Link / Char Count:**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;3053:11619 | - |
| width | 336px | `width: auto` / `flex: 1` |
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| background | transparent | `background: transparent` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 8px 0 0 | `border-radius: 0 8px 0 0` |
| text-color | rgba(228, 96, 96, 1) | `color: #E46060` (character count warning) |
| font-size | 16px | `font-size: 16px` |
| text-align | right | `text-align: right` |

---

### Text Area (D)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9886 | - |
| width | 672px (full content) | `width: 100%; align-self: stretch` |
| height | 200px | `height: 200px` |
| min-height | 120px | `min-height: 120px` |
| padding-left | 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: var(--Details-Text-Secondary-1, #FFF)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 0 0 8px 8px | `border-radius: 0 0 8px 8px` (bottom corners only — connected to toolbar above) |

**Placeholder Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | rgba(153, 153, 153, 1) | `color: #999` |

---

### Hint Text (D.1)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9888 | - |
| width | 454px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |

---

### Tag Chip / Pill Button (E.2 > Button)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;662:8911 | - |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| background | #FFFFFF | `background: var(--Details-Text-Secondary-1, #FFF)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center; gap: 8px` |

**Chip Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 11px | `font-size: 11px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 16px | `line-height: 16px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | rgba(153, 153, 153, 1) | `color: var(--Details-Text-Secondary-2, #999)` |

**Selected Tag Chip (displayed after hashtag is chosen):**
| Property | Value | CSS |
|---|---|---|
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| background | #FFEA9E (gold, selected state) | `background: var(--Details-Text-Primary-1, #FFEA9E)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| text-color | #00101A | `color: #00101A` |
| font-size | 11px | `font-size: 11px; font-weight: 700` |
| remove icon | 16x16 "x" | Appears on right side, click to remove |

> **Note**: The "+ Hashtag" button uses white background (#FFF) with grey text (#999). Once a hashtag is selected, the chip switches to gold background (#FFEA9E) with dark text (#00101A) and gains a remove "x" icon. This visual differentiation makes it clear which hashtags are selected vs. the add action.

---

### Image Thumbnail (F.2-F.4)

| Property | Value | CSS |
|---|---|---|
| **Node IDs** | I520:11647;662:9197, 662:9393, 662:9439, 662:9495, 662:9561 | - |
| width | 80px | `width: 80px` |
| height | 80px | `height: 80px` |
| background | #FFFFFF | `background: #FFF` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 18px | `border-radius: 18px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` (for close button positioning) |

**Thumbnail Image Fill:**
| Property | Value | CSS |
|---|---|---|
| width | 80px | `width: 100%` |
| height | 80px | `height: 100%` |
| object-fit | cover | `object-fit: cover` |
| border | 1px solid #FFEA9E | `border: 1px solid var(--Details-Text-Primary-1, #FFEA9E)` |
| border-radius | 4px | `border-radius: 4px` |

**Image Remove Button (red X):**
| Property | Value | CSS |
|---|---|---|
| width | 20px | `width: 20px` |
| height | 20px | `height: 20px` |
| background | rgba(212, 39, 29, 1) | `background: #D4271D` |
| border-radius | 71px (fully circular) | `border-radius: 50%` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| position | absolute | `position: absolute; top: -4px; right: -4px` |
| icon-size | 17x17 | `width: 12px; height: 12px` (X icon inside) |
| color | white | `color: #FFF` |

**Image Remove Button States:**
| State | Property | Value |
|---|---|---|
| Default | background | #D4271D |
| Hover | background | #B91C1C, transform: scale(1.1) |
| Focus | outline | 2px solid #FFEA9E, offset: 1px |

---

### Anonymous Checkbox (G)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:14099 | - |
| width | 672px | `width: 100%` |
| height | 28px | `height: auto` |
| display | flex | `display: flex; flex-direction: row; align-items: center; gap: 16px` |

**Checkbox Control:**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:14099;520:14097 | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| background | #FFFFFF (unchecked) | `background: var(--Details-Text-Secondary-1, #FFF)` |
| border | 1px solid #999 (unchecked) | `border: 1px solid var(--Details-Text-Secondary-2, #999)` |
| border-radius | 4px | `border-radius: 4px` |

**Checkbox States:**
| State | Property | Value |
|---|---|---|
| Unchecked | background | #FFF |
| Unchecked | border | 1px solid #999 |
| Hover (unchecked) | border | 1px solid #998C5F |
| Checked | background | #FFEA9E (gold) |
| Checked | border | 1px solid #998C5F |
| Checked | icon | white checkmark |
| Hover (checked) | background | #F5E088 |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

**Checkbox Label:**
| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:14099;520:14095 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color (unchecked) | rgba(153, 153, 153, 1) | `color: #999` |
| color (checked) | rgba(0, 16, 26, 1) | `color: #00101A` |

**Checkbox Label States:**
| State | Property | Value |
|---|---|---|
| Unchecked | color | #999 (grey) |
| Checked | color | #00101A (dark, active) |

---

### Anonymous Name Field (Conditional — shown when checkbox G is checked)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | (dynamic — not in static Figma frame) | - |
| width | 672px | `width: 100%` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: var(--Details-Text-Secondary-1, #FFF)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| margin-top | 12px | `margin-top: 12px` (below checkbox row) |
| display | none (default) | `display: none` / `display: flex` when checkbox is checked |

> **Note**: This field is revealed with an expand animation when the anonymous checkbox is toggled on. Uses the same input styling as the Danh hiệu text input. The Figma design item specification states: "Bật: Hiển thị text field điền tên ẩn danh" (When enabled: Show text field for anonymous name entry).

---

### Cancel Button (H.1)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9906 | - |
| padding | 16px 40px | `padding: 16px 40px` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--Details-SecondaryButton-Normal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex; align-self: stretch; align-items: center; gap: 8px` |

**Button Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |

**States:**
| State | Property | Value |
|---|---|---|
| Default | background | rgba(255, 234, 158, 0.10) |
| Hover | background | rgba(255, 234, 158, 0.20) |
| Active/Pressed | background | rgba(255, 234, 158, 0.30) |
| Focus | outline | 2px solid #FFEA9E, offset: 2px |

---

### Submit Button (H.2)

| Property | Value | CSS |
|---|---|---|
| **Node ID** | I520:11647;520:9907 | - |
| width | 502px | `flex: 1` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 1) | `background: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; justify-content: center; align-items: center; gap: 8px` |

**Button Text:**
| Property | Value | CSS |
|---|---|---|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |

**States:**
| State | Property | Value |
|---|---|---|
| Default | background | #FFEA9E |
| Hover | background | #F5E088, transform: translateY(-1px) |
| Focus | outline | 2px solid #998C5F, offset: 2px |
| Disabled | background | #D4CCA8, color: #999, cursor: not-allowed |
| Loading | show spinner, text: "Đang gửi..." |

---

## Component Hierarchy with Styles

```
Overlay (w: 1440, h: 1024, bg: rgba(0,16,26,0.8))
└── Modal (w: 752, h: 1012, r: 24px, bg: #FFF8E1, p: 40px, flex, col, gap: 32px)
    ├── A: Title (672px, 32px/700, #00101A, center)
    │   └── "Gửi lời cám ơn và ghi nhận đến đồng đội"
    │
    ├── B: Recipient (672px, flex, row, center, gap: 16px)
    │   ├── B.1: Label "Người nhận" (22px/700, #00101A) + "*" (16px/700, #CF1322)
    │   └── B.2: Search Dropdown (flex: 1, p: 16px 24px, r: 8px, bg: #FFF, border: 1px #998C5F)
    │       ├── Placeholder "Tìm kiếm" (16px/700, #999)
    │       └── Dropdown Arrow Icon (24x24)
    │
    ├── Danh hiệu (672px, h: 104px)
    │   ├── Row (flex, row, center, gap: 16px)
    │   │   ├── Label "Danh hiệu" (22px/700, #00101A) + "*" (16px/700, #CF1322)
    │   │   └── Text Input (flex: 1, p: 16px 24px, r: 8px, bg: #FFF, border: 1px #998C5F) — free text, NOT dropdown
    │   └── Helper text (16px/700, #999, 2 lines: "Ví dụ:..." + "Danh hiệu sẽ...")
    │
    ├── Content Area (672px, h: 444px, flex, col, gap: 24px)
    │   ├── C: Toolbar (flex, row, h: 40px)
    │   │   ├── C.1 Bold (h: 40, p: 10px 16px, border: 1px #998C5F, r: 8px 0 0 0)
    │   │   ├── C.2 Italic (h: 40, p: 10px 16px, border: 1px #998C5F, r: 0)
    │   │   ├── C.3 Stroke (h: 40, p: 10px 16px, border: 1px #998C5F, r: 0)
    │   │   ├── C.4 Number (h: 40, p: 10px 16px, border: 1px #998C5F, r: 0)
    │   │   ├── C.5 Link (h: 40, p: 10px 16px, border: 1px #998C5F, r: 0)
    │   │   ├── C.6 Quote (h: 40, p: 10px 16px, border: 1px #998C5F, r: 0)
    │   │   └── CharCount/Link (336px, h: 40, p: 10px 16px, border: 1px #998C5F, r: 0 8px 0 0, text: #E46060)
    │   │
    │   ├── D: Textarea (align-self: stretch, h: 200px, min-h: 120px, r: 0 0 8px 8px, bg: #FFF, border: 1px #998C5F)
    │   │   └── Placeholder "Hãy gửi gắm lời cám ơn..." (16px/700, #999)
    │   │
    │   └── D.1: Hint (flex, row, between, gap: 4px)
    │       └── "Bạn có thể '@+tên' để nhắc tới đồng nghiệp khác" (16px/700, #00101A, ls: 0.5px)
    │
    ├── E: Hashtag (672px, h: 48px, flex, row, start, gap: 16px)
    │   ├── E.1: Label "Hashtag" (22px/700, #00101A) + "*" (16px/700, #CF1322)
    │   └── E.2: Tag Group (548px, flex, row, center, gap: 8px)
    │       └── [+ Hashtag] Button (h: 48, p: 4px 8px, r: 8px, bg: #FFF, border: 1px #998C5F)
    │           ├── "+" Icon (24x24)
    │           ├── "Hashtag" (11px/700, #999)
    │           └── "Tối đa 5" (11px/700, #999)
    │
    ├── F: Image (672px, h: 80px, flex, row, center, gap: 16px)
    │   ├── F.1: Label "Image" (22px/700, #00101A) — no asterisk (optional)
    │   ├── F.2-F.4: Thumbnails (80x80, r: 18px, bg: #FFF, border: 1px #998C5F)
    │   │   ├── Image Fill (80x80, r: 4px, border: 1px #FFEA9E, object-fit: cover)
    │   │   └── Remove Btn (20x20, bg: #D4271D, r: 50%, absolute, top-right)
    │   └── F.5: [+ Image] Button (h: 48, p: 4px 8px, r: 8px, bg: #FFF, border: 1px #998C5F)
    │       ├── "+" Icon
    │       ├── "Image" (11px/700, #999)
    │       └── "Tối đa 5" (11px/700, #999)
    │
    ├── G: Anonymous (672px, flex, col, gap: 12px)
    │   ├── Row (flex, row, center, gap: 16px)
    │   │   ├── Checkbox (24x24, r: 4px, bg: #FFF/#FFEA9E, border: 1px #999/#998C5F)
    │   │   └── Label "Gửi lời cám ơn và ghi nhận ẩn danh" (22px/700, #999/#00101A)
    │   └── [Conditional] Anonymous Name Input (shown when checked)
    │       └── Text Input (flex: 1, p: 16px 24px, r: 8px, bg: #FFF, border: 1px #998C5F)
    │
    └── H: Actions (672px, h: 60px, flex, row, start, gap: 24px)
        ├── H.1: Cancel "Hủy ✕" (p: 16px 40px, r: 4px, bg: gold/10%, border: 1px #998C5F)
        │   └── Text (16px/700, #00101A) + X Icon
        └── H.2: Submit "Gửi ▷" (flex: 1, 502px, h: 60, r: 8px, bg: #FFEA9E)
            └── Text (22px/700, #00101A) + Send Icon
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
| Desktop (xl) | 1280px | infinity |

### Responsive Changes

#### Mobile (< 640px)

| Component | Changes |
|---|---|
| Modal | Full screen, border-radius: 0, padding: 16px, overflow-y: auto |
| Title | font-size: 24px, line-height: 32px |
| Section labels | font-size: 18px |
| Recipient row | flex-direction: column, gap: 8px |
| Danh hiệu row | flex-direction: column, gap: 8px |
| Hashtag row | flex-direction: column, gap: 8px |
| Image row | flex-direction: column, gap: 8px |
| Image thumbnails | flex-wrap: wrap |
| Toolbar | flex-wrap: wrap or horizontal scroll |
| Action buttons | flex-direction: column, both full width |
| Checkbox label | font-size: 16px |

#### Tablet (640px - 1023px)

| Component | Changes |
|---|---|
| Modal | width: 90vw, max-width: 775px, padding: 24px |
| Sections | Scale proportionally |
| Image thumbnails | 64x64px |

#### Desktop (>= 1024px)

| Component | Changes |
|---|---|
| Modal | width: 775px, centered on overlay |
| All components | Match Figma design exactly |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|---|---|---|---|
| Dropdown Arrow | 24x24 | #00101A | Recipient search dropdown only (Danh hiệu is a plain text input — no dropdown arrow) |
| Bold (B) | 24x24 | #00101A | Toolbar: toggle bold |
| Italic (I) | 24x24 | #00101A | Toolbar: toggle italic |
| Strikethrough (S) | 24x24 | #00101A | Toolbar: toggle strikethrough |
| Numbered List | 24x24 | #00101A | Toolbar: toggle numbered list |
| Link | 24x24 | #00101A | Toolbar: insert link |
| Quote | 24x24 | #00101A | Toolbar: toggle blockquote |
| Plus (+) | 24x24 | #999 | Add hashtag, Add image buttons |
| Close (X) | 17x17 | #FFF | Image remove button (on red bg) |
| Close (X) | 24x24 | #00101A | Cancel button icon |
| Send | 24x24 | #00101A | Submit button icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---|---|---|---|---|
| Modal open | opacity, transform (scale) | 200ms | ease-out | Open trigger |
| Modal close | opacity, transform (scale) | 150ms | ease-in | Cancel/Submit/Overlay click |
| Overlay | opacity | 200ms | ease-in-out | Open/Close |
| Input focus | border-color | 150ms | ease-in-out | Focus |
| Button hover | background, transform | 150ms | ease-out | Hover |
| Toolbar toggle | background-color | 100ms | ease-in-out | Click |
| Image thumbnail add | opacity, scale | 200ms | ease-out | After upload |
| Image thumbnail remove | opacity, scale | 150ms | ease-in | Click remove |
| Hashtag chip add | opacity, scale | 150ms | ease-out | After selection |
| Hashtag chip remove | opacity, width | 150ms | ease-in | Click remove |
| Anonymous name field | height, opacity | 200ms | ease-out | Checkbox toggle (expand/collapse) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|---|---|---|---|
| Modal overlay | - | `fixed inset-0 bg-[#00101A]/80 z-50 flex items-center justify-center` | `<WriteKudoModal />` |
| Modal panel | 520:11647 | `w-[775px] max-w-full max-h-[calc(100vh-40px)] overflow-y-auto bg-[#FFF8E1] rounded-3xl p-10 flex flex-col gap-8` | `<WriteKudoForm />` |
| Modal title | I520:11647;520:9870 | `text-[32px] font-bold leading-10 text-[#00101A] text-center` | `<h2>` |
| Recipient row | I520:11647;520:9871 | `flex items-center gap-4` | `<RecipientField />` |
| Section label | I520:11647;520:9872 | `text-[22px] font-bold leading-7 text-[#00101A] flex items-center gap-0.5` | `<FieldLabel />` |
| Required asterisk | - | `text-[#CF1322] font-bold text-base` | `<span>` |
| Search dropdown | I520:11647;520:9873 | `flex-1 px-6 py-4 bg-white border border-[#998C5F] rounded-lg` | `<SearchDropdown />` |
| Danh hiệu field | I520:11647;1688:10448 | `flex flex-col gap-2` | `<DanhHieuField />` |
| Toolbar | I520:11647;520:9877 | `flex items-center h-10` | `<EditorToolbar />` |
| Toolbar button | I520:11647;520:9881 (etc.) | `h-10 px-4 py-2.5 border border-[#998C5F] flex items-center justify-center` | `<ToolbarButton />` |
| Textarea | I520:11647;520:9886 | `w-full h-[200px] min-h-[120px] bg-white border border-[#998C5F] rounded-b-lg px-6 py-4` | `<RichTextEditor />` |
| Hint text | I520:11647;520:9888 | `text-base font-bold text-[#00101A] tracking-wide` | `<p>` |
| Hashtag row | I520:11647;520:9890 | `flex items-start gap-4` | `<HashtagField />` |
| Tag chip | I520:11647;662:8911 | `h-12 px-2 py-1 bg-white border border-[#998C5F] rounded-lg flex items-center gap-2` | `<TagChip />` |
| Image row | I520:11647;520:9896 | `flex items-center gap-4` | `<ImageUploadField />` |
| Image thumbnail | I520:11647;662:9197 | `w-20 h-20 rounded-[18px] bg-white border border-[#998C5F] overflow-hidden relative` | `<ImageThumbnail />` |
| Remove button | - | `absolute -top-1 -right-1 w-5 h-5 bg-[#D4271D] rounded-full flex items-center justify-center` | `<RemoveButton />` |
| Checkbox row | I520:11647;520:14099 | `flex flex-col gap-3` | `<AnonymousCheckbox />` |
| Checkbox | I520:11647;520:14099;520:14097 | `w-6 h-6 rounded border border-[#999] bg-white checked:bg-[#FFEA9E] checked:border-[#998C5F]` | `<input type="checkbox" />` |
| Anonymous name input | (conditional) | `w-full px-6 py-4 bg-white border border-[#998C5F] rounded-lg` (shown when checkbox checked) | `<AnonymousNameInput />` |
| Action bar | I520:11647;520:9905 | `flex items-start gap-6` | `<ActionBar />` |
| Cancel button | I520:11647;520:9906 | `px-10 py-4 bg-[#FFEA9E]/10 border border-[#998C5F] rounded flex items-center gap-2` | `<Button variant="secondary" />` |
| Submit button | I520:11647;520:9907 | `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2` | `<Button variant="primary" />` |

---

## Notes

- All colors should use CSS variables / Tailwind config for theming support
- **Montserrat** font must be loaded via Google Fonts (weight: 700)
- **Noto Sans JP** font needed for required asterisk only (weight: 700)
- The toolbar and textarea form a connected group: toolbar has top border-radius, textarea has bottom border-radius — they share a continuous border
- The modal uses a **warm cream** (#FFF8E1) background that contrasts with the dark page — this is unique to the Kudo writing experience
- Image remove buttons use **absolute positioning** relative to their thumbnail container
- The "Tiêu chuẩn cộng đồng" text in the toolbar appears as a link (likely red/gold text) — implement as an anchor tag
- Character count display uses warning red (#E46060) — implement logic to change color as content approaches the limit
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- Ensure color contrast meets WCAG AA: gold #FFEA9E on dark #00101A = ~13:1 (AAA). Grey #999 on white #FFF = ~2.8:1 (fails AA) — consider darkening placeholder to #666 for accessibility
