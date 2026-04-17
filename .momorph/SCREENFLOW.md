# Screen Flow - SSA 2025 EX

## Screens Overview

### Main Pages

| Screen | Screen ID | Status | Description |
|--------|-----------|--------|-------------|
| Login | GzbNeVGJHz | design | Google OAuth login page |
| Countdown - Prelaunch page | 8PJQswPZmU | design | Pre-event countdown landing page |
| Homepage SAA | i87tDx10uM | design | Main homepage with hero, awards, and Kudos sections |
| He thong giai (Awards Information) | zFYDgyj_pD | design | Award categories detail page |
| Sun* Kudos - Live board | MaZUn5xHXZ | design | Sun* Kudos live board with kudos feed |
| Profile ban than | 3FoIx6ALVb | design | User's own profile page |
| Profile nguoi khac | w4WUvsJ9KI | design | Other user's profile page |
| Viet Kudo | ihQ26W78P2 | design | Write/send a Kudo message |
| Tieu chuan cong dong | Dpn7C89--r | design | Community standards page |
| Error page - 403 | T3e_iS9PCL | design | Access denied page |
| Error page - 404 | p0yJ89B-9_ | design | Page not found |

### Admin Pages

| Screen | Screen ID | Status | Description |
|--------|-----------|--------|-------------|
| Admin - Overview | 9ja9g9iJLW | design | Admin dashboard overview |
| Admin - Review content | MTExSUSdUn | design | Content review/moderation |
| Admin - Review content - Search | kO5qYafrMh | design | Content search in review |
| Admin - Setting | fTCVEC9aV_ | design | Admin settings management |
| Admin - Setting - add Campaign | cb7kD3-Xr6 | design | Add campaign to settings |
| Admin - Setting - add new Campaign | FVA7A5f8z8 | design | Create new campaign |
| Admin - Setting - Edit Campaign | htgRaDTO2f | design | Edit existing campaign |
| Admin - User | -u1lKib0JL | design | User management |

### Overlays / Dropdowns / Modals

| Screen | Screen ID | Status | Description |
|--------|-----------|--------|-------------|
| Dropdown-profile | z4sCl3_Qtk | design | User profile dropdown menu |
| Dropdown-profile Admin | 54rekaCHG1 | design | Admin profile dropdown menu |
| Dropdown-ngon ngu | hUyaaugye2 | design | Language switcher dropdown |
| Notification | D_jgDqvIc8 | design | Notification panel |
| Floating Action Button | _hphd32jN2 | design | Widget quick action expanded |
| Floating Action Button 2 | Sv7DFwBw1h | design | Widget quick action variant |
| Alert Overlay | ZUofoTelpc | design | Alert/confirmation dialog |
| Gui loi chuc Kudos | JsTvi8KVQA | design | Send Kudos modal |
| View Kudo | onDIohs2bS | design | View Kudo detail |
| Hover Avatar info user | Bf5XiTE7AO | design | User avatar hover tooltip |

### Secret Box Flow

| Screen | Screen ID | Status | Description |
|--------|-----------|--------|-------------|
| Open secret box - chua mo | J3-4YFIpMM | design | Secret box initial (unopened) state |
| Open secret box - action bam mo | K-LuEblC08 | design | Secret box opening action |
| Open secret box - Standby | iJqdwTEiDj | design | Secret box post-open standby |

---

## Navigation Flow

### Login (GzbNeVGJHz)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Google OAuth Button | Click | Homepage SAA (via callback) | i87tDx10uM |

### Countdown - Prelaunch (8PJQswPZmU)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Event starts | Auto-redirect | Homepage SAA | i87tDx10uM |

### Homepage SAA (i87tDx10uM)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Logo (Header) | Click | Homepage SAA (scroll top) | i87tDx10uM |
| Nav: "About SAA 2025" | Click | Homepage SAA (scroll top, selected state) | i87tDx10uM |
| Nav: "Awards Information" | Click | He thong giai | zFYDgyj_pD |
| Nav: "Sun* Kudos" | Click | Sun* Kudos - Live board | MaZUn5xHXZ |
| Notification Bell | Click | Notification panel (overlay) | D_jgDqvIc8 |
| Language Selector | Click | Language dropdown | hUyaaugye2 |
| User Avatar | Click | Dropdown-profile | z4sCl3_Qtk |
| User Avatar (Admin) | Click | Dropdown-profile Admin | 54rekaCHG1 |
| CTA: "ABOUT AWARDS" | Click | He thong giai | zFYDgyj_pD |
| CTA: "ABOUT KUDOS" | Click | Sun* Kudos - Live board | MaZUn5xHXZ |
| Award Card: Top Talent | Click | He thong giai #top-talent | zFYDgyj_pD |
| Award Card: Top Project | Click | He thong giai #top-project | zFYDgyj_pD |
| Award Card: Top Project Leader | Click | He thong giai #top-project-leader | zFYDgyj_pD |
| Award Card: Best Manager | Click | He thong giai #best-manager | zFYDgyj_pD |
| Award Card: Signature 2025 | Click | He thong giai #signature-2025-creator | zFYDgyj_pD |
| Award Card: MVP | Click | He thong giai #mvp | zFYDgyj_pD |
| Kudos "Chi tiet" | Click | Sun* Kudos - Live board | MaZUn5xHXZ |
| Widget Button | Click | Floating Action Button | _hphd32jN2 |
| Footer Logo | Click | Homepage SAA (scroll top) | i87tDx10uM |
| Footer: "About SAA 2025" | Click | Homepage SAA (scroll top) | i87tDx10uM |
| Footer: "Awards Information" | Click | He thong giai | zFYDgyj_pD |
| Footer: "Sun* Kudos" | Click | Sun* Kudos - Live board | MaZUn5xHXZ |
| Footer: "Tieu chuan chung" | Click | Tieu chuan cong dong | Dpn7C89--r |

### Profile Dropdown (z4sCl3_Qtk)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Profile | Click | Profile ban than | 3FoIx6ALVb |
| Sign out | Click | Login | GzbNeVGJHz |

### Profile Dropdown Admin (54rekaCHG1)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Profile | Click | Profile ban than | 3FoIx6ALVb |
| Admin Dashboard | Click | Admin - Overview | 9ja9g9iJLW |
| Sign out | Click | Login | GzbNeVGJHz |

### He thong giai / Awards Information (zFYDgyj_pD)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Header nav links | Click | Same as Homepage nav | - |
| Award detail sections | Scroll/anchor | In-page sections | - |

### Sun* Kudos - Live board (MaZUn5xHXZ)

| Element | Action | Target Screen | Screen ID |
|---------|--------|---------------|-----------|
| Header nav links | Click | Same as Homepage nav | - |
| Write Kudo button | Click | Viet Kudo | ihQ26W78P2 |
| Kudo card | Click | View Kudo | onDIohs2bS |
| User avatar hover | Hover | Hover Avatar info | Bf5XiTE7AO |
| User avatar click | Click | Profile nguoi khac | w4WUvsJ9KI |

---

## Screen Relationship Diagram

```
                              ┌──────────┐
                              │  Login   │
                              │GzbNeVGJHz│
                              └────┬─────┘
                                   │ (Google OAuth)
                                   ▼
                         ┌─────────────────┐
                         │  Homepage SAA   │
                         │   i87tDx10uM    │
                         └───┬───┬───┬─────┘
                             │   │   │
              ┌──────────────┘   │   └──────────────┐
              ▼                  ▼                   ▼
    ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐
    │ Awards Info     │  │ Sun* Kudos   │  │ Profile        │
    │ (He thong giai) │  │ Live board   │  │ (ban than)     │
    │  zFYDgyj_pD     │  │ MaZUn5xHXZ  │  │ 3FoIx6ALVb    │
    └─────────────────┘  └──┬───┬───────┘  └────────────────┘
                            │   │
                   ┌────────┘   └────────┐
                   ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │  Viet Kudo   │      │  View Kudo   │
          │ ihQ26W78P2   │      │ onDIohs2bS   │
          └──────────────┘      └──────────────┘

    ┌──────────────────────────────────────────┐
    │          Admin Section                    │
    │  ┌──────────┐  ┌─────────┐  ┌─────────┐ │
    │  │ Overview  │  │ Review  │  │ Setting │ │
    │  │9ja9g9iJLW│  │MTExSUSdUn│ │fTCVEC9aV_││
    │  └──────────┘  └─────────┘  └─────────┘ │
    │  ┌──────────┐                            │
    │  │  Users   │                            │
    │  │-u1lKib0JL│                            │
    │  └──────────┘                            │
    └──────────────────────────────────────────┘

    Overlays (accessible from any authenticated page):
    ┌────────────┐ ┌──────────────┐ ┌───────────────┐
    │ Notification│ │Language Drop │ │ Profile Drop  │
    │ D_jgDqvIc8 │ │ hUyaaugye2  │ │ z4sCl3_Qtk   │
    └────────────┘ └──────────────┘ └───────────────┘
    ┌────────────────┐ ┌──────────────┐
    │ Widget/FAB     │ │ Alert Overlay│
    │ _hphd32jN2     │ │ ZUofoTelpc  │
    └────────────────┘ └──────────────┘
```

---

## Navigation Summary

### Entry Points
- **Unauthenticated**: Login page (GzbNeVGJHz)
- **Pre-event**: Countdown page (8PJQswPZmU) → redirects to Homepage when event starts
- **Authenticated**: Homepage SAA (i87tDx10uM)

### Primary Navigation (Header + Footer)
All authenticated pages share the same header/footer with links to:
1. About SAA 2025 → Homepage SAA (i87tDx10uM)
2. Awards Information → He thong giai (zFYDgyj_pD)
3. Sun* Kudos → Sun* Kudos Live board (MaZUn5xHXZ)

### Secondary Navigation (Homepage-specific)
- CTA buttons in hero → Awards Information, Sun* Kudos
- Award cards → Awards Information with hash anchors
- Kudos section → Sun* Kudos Live board

### Utility Navigation (Header)
- Notification bell → Notification panel
- Language selector → VN/EN switch
- User avatar → Profile dropdown (Profile, Sign out, Admin Dashboard)

### Admin Flow
- Accessed via profile dropdown "Admin Dashboard" option (admin role only)
- Admin Overview → Review Content, Settings, Users
