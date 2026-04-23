# Feature Specification: Open Secret Box (Unopened State)

**Frame ID**: `J3-4YFIpMM`
**Frame Name**: `Open secret box- chưa mở`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft

---

## Overview

This modal displays the Secret Box opening interface for users who have unopened boxes. Users can click on the gift box image to reveal a random badge reward. The modal shows the current count of unopened Secret Boxes and provides visual guidance for the interaction.

**Target Users**: Authenticated users with accumulated Secret Boxes
**Business Context**: Gamification feature to reward user engagement through collectible badges

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a Secret Box (Priority: P1)

As a user with unopened Secret Boxes, I want to click on the gift box to reveal my random badge reward, so that I can collect badges and feel rewarded for my engagement.

**Why this priority**: This is the core functionality of the modal - without it, the feature has no purpose.

**Independent Test**: User with at least 1 unopened Secret Box can click the box and receive a badge.

**Acceptance Scenarios**:

1. **Given** user has 5 unopened Secret Boxes and modal is displayed, **When** user clicks on the gift box image, **Then** the box opens to reveal a random badge and the unopened count decreases to 4.

2. **Given** user clicks on the gift box, **When** the animation completes, **Then** one of the six badges is displayed according to probability distribution:
   - Stay Gold: 30%
   - Flow to Horizon: 25%
   - Beyond the Boundary: 10%
   - Root Further: 5%
   - Touch of Light: 20%
   - Revival: 10%

3. **Given** user successfully opens a box, **When** the badge is revealed, **Then** only ONE badge is awarded per opening (never multiple).

---

### User Story 2 - View Unopened Box Count (Priority: P2)

As a user, I want to see how many Secret Boxes I have remaining, so that I know how many rewards I can still claim.

**Why this priority**: Essential feedback for users to understand their available rewards, but secondary to the actual opening functionality.

**Independent Test**: Display modal shows correct count of unopened boxes fetched from backend.

**Acceptance Scenarios**:

1. **Given** user has 5 unopened Secret Boxes, **When** modal opens, **Then** the counter displays "05" with label "Secretbox chưa mở".

2. **Given** user opens a Secret Box successfully, **When** the opening animation completes, **Then** the counter updates to reflect the new count (e.g., 5 → 4).

3. **Given** user has 105 unopened Secret Boxes, **When** modal opens, **Then** the counter displays "99+" to indicate overflow.

---

### User Story 3 - Close Modal (Priority: P2)

As a user, I want to close the modal when I'm done viewing or opening boxes, so that I can return to the main application.

**Why this priority**: Standard UX requirement for modal interactions.

**Independent Test**: Click close button dismisses the modal.

**Acceptance Scenarios**:

1. **Given** modal is displayed, **When** user clicks the "X" close button, **Then** modal closes and user returns to previous screen.

---

### User Story 4 - No Boxes Available State (Priority: P3)

As a user with no unopened Secret Boxes, I want to understand that I cannot open any boxes, so that I know to return when I have more.

**Why this priority**: Edge case handling for zero-box state.

**Independent Test**: User with 0 boxes sees disabled state.

**Acceptance Scenarios**:

1. **Given** user has 0 unopened Secret Boxes, **When** modal is displayed, **Then** the instruction text "Click vào box để mở" is hidden.

2. **Given** user has 0 unopened Secret Boxes, **When** user attempts to click the gift box, **Then** the click is disabled and no action occurs.

---

### Edge Cases

- What happens when user rapidly clicks the box multiple times?
  - System should debounce clicks, processing only one opening at a time
- How does system handle network failure during box opening?
  - Show error state, do not decrement counter until server confirms
- What if the badge probability API returns an error?
  - Show generic error, allow retry

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Title | `1466:7678` | Modal header "KHÁM PHÁ SECRET BOX CỦA BẠN" with close button | Close button dismisses modal |
| B_Group 396 | `1466:7681` | Instruction text "Click vào box để mở" | Display only, hidden when boxes = 0 |
| C_Box image | `1466:7684` | Gift box illustration with glow effect | Click to open box, disabled when boxes = 0 |
| D_Số box chưa mở | `1466:7689` | Counter showing number and label | Updates on successful box open |
| MM_MEDIA_Close | `1466:7679` | Close button (X icon) | Click to dismiss modal |
| Dividers | `1466:7680`, `1466:7688` | Horizontal line separators | Display only |

### Navigation Flow

- **Entry Points**:
  - Homepage SAA (screenId: `i87tDx10uM`) — via Secret Box action/banner
  - Profile ban than (screenId: `3FoIx6ALVb`) — via rewards section
  - Event notification — deep link from push notification
- **To (on close)**: Return to previous screen (no navigation change)
- **To (on open)**: Transition to "Open secret box - đã mở" state screens:
  - Action bam mo states: `K-LuEblC08`, `p0qHd6DJ6A`
  - Standby animation states: `iJqdwTEiDj` through `AzMhNg8aqW`
- **Triggers**:
  - Click close button → dismiss modal
  - Click gift box → open box and reveal badge
  - Press Escape key → dismiss modal
  - Click outside modal (backdrop) → dismiss modal

### Visual Requirements

- Responsive breakpoints: Mobile-first design (modal width ~651px)
- Animations/Transitions:
  - Box opening animation (gift unwrapping effect)
  - Badge reveal animation
  - Glow/particle effects around gift box (continuous pulse animation)
  - Loading spinner during API call
- Accessibility:
  - Close button must have `aria-label="Đóng"` (or localized equivalent)
  - Interactive elements must be keyboard accessible (Tab, Enter, Escape)
  - Visible focus ring on all interactive elements (2px solid outline)
  - Gift box must have `role="button"` and `aria-label="Mở Secret Box"`
  - Screen reader announcement on successful box open: "[Badge name] đã được mở!"
  - Sufficient color contrast for text elements (gold #FFEA9E on dark #00101A passes WCAG AA)

### Loading & Progress States

- **Initial loading**: Show skeleton placeholder while fetching unopened count
- **Opening in progress**:
  - Disable gift box click
  - Show opening animation (box shaking/unwrapping)
  - Display subtle loading indicator or progress bar
- **Success**: Transition to revealed badge screen
- **Error**: Show toast/inline error message, re-enable gift box click

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the current count of user's unopened Secret Boxes
- **FR-002**: System MUST allow users to open a Secret Box by clicking the gift box image
- **FR-003**: System MUST randomly award ONE badge per box opening according to defined probabilities
- **FR-004**: System MUST update the unopened box count after successful opening
- **FR-005**: System MUST disable box clicking when user has 0 unopened boxes
- **FR-006**: System MUST hide instruction text when user has 0 unopened boxes
- **FR-007**: System MUST allow users to close the modal via the X button

### Technical Requirements

- **TR-001**: Box opening must complete within 2 seconds (excluding animations)
- **TR-002**: Badge randomization must be server-side to prevent manipulation
- **TR-003**: Count updates must be atomic and consistent with database state
- **TR-004**: Modal must render server-side for SEO (if applicable) or client-side with proper loading state

### Key Entities

- **SecretBox**: Represents a user's unopened box
  - Attributes: id, user_id, created_at, opened_at (null if unopened)
- **Badge**: Represents a collectible reward
  - Attributes: id, name, probability_weight, image_url
  - Types: Stay Gold (30%), Flow to Horizon (25%), Beyond the Boundary (10%), Root Further (5%), Touch of Light (20%), Revival (10%)
- **UserBadge**: Junction entity linking user to earned badges
  - Attributes: id, user_id, badge_id, earned_at, secret_box_id

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/secret-boxes/count` | GET | Get user's unopened box count | Predicted |
| `/api/secret-boxes/open` | POST | Open a box and receive random badge | Predicted |
| `/api/badges` | GET | List all available badges with probabilities | Predicted |
| `/api/user/badges` | GET | Get user's collected badges | Predicted |

### Predicted Request/Response

**GET /api/secret-boxes/count**
```json
{
  "unopened_count": 5
}
```

**POST /api/secret-boxes/open**
```json
// Request: (empty body, uses session user)
// Response:
{
  "success": true,
  "badge": {
    "id": "badge_stay_gold",
    "name": "Stay Gold",
    "image_url": "/badges/stay-gold.png"
  },
  "remaining_count": 4
}
```

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of box openings complete successfully without error
- **SC-002**: User can open all available boxes in a session without page refresh
- **SC-003**: Badge distribution matches expected probability within 5% margin over 1000+ opens
- **SC-004**: Modal interaction is smooth with no layout shifts or jank

---

## Out of Scope

- Badge inventory/collection view (separate feature)
- Trading or gifting badges between users
- Special/limited edition Secret Boxes with different rewards
- Notifications when new Secret Boxes are earned
- History of past box openings

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Internationalization (i18n)

| Text Key | Vietnamese (Default) | English |
|----------|---------------------|---------|
| modal.title | KHÁM PHÁ SECRET BOX CỦA BẠN | DISCOVER YOUR SECRET BOX |
| modal.instruction | Click vào box để mở | Click the box to open |
| modal.count_label | Secretbox chưa mở | Unopened Secretbox |
| modal.close_aria | Đóng | Close |
| modal.box_aria | Mở Secret Box | Open Secret Box |
| error.network | Không thể mở hộp. Vui lòng thử lại. | Unable to open box. Please try again. |
| error.no_boxes | Bạn không còn Secret Box nào. | You have no Secret Boxes remaining. |

---

## Notes

- Badge probability must be enforced server-side; client receives already-determined result
- Consider rate limiting to prevent rapid consecutive opens (potential abuse)
- Box count should be fetched fresh when modal opens, not cached
- Animation timing should account for user perception - too fast feels cheap, too slow feels frustrating
- Related screen: "Open secret box - đã mở" (post-opening state showing revealed badge)
- **Max unopened boxes**: 99 (display limit)
- **Count display format**: Zero-padded two digits (e.g., "05", "12", "99")
- **Count overflow**: Display "99+" when actual count exceeds 99
