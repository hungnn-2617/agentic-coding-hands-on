# Feature Specification: Viết Kudo (Write Kudo)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-20
**Status**: Reviewed (3 passes — 2026-04-20)

---

## Overview

The **Write Kudo** feature ("Viết Kudo") is a modal dialog that allows authenticated Sun* employees to send appreciation/recognition messages (Kudos) to their colleagues. The modal is triggered from the Kudos page and provides a structured form with recipient search, a title/award designation, a rich text editor with formatting toolbar, hashtag tagging, image attachments, and an anonymous sending option.

This is a **data-entry modal** — the primary interaction is form completion and submission. The form collects: recipient (search/select), title/danh hieu (text), message content (rich text), hashtags (tag chips, max 5), images (file upload, max 5), and an anonymous toggle.

**Target Users**: Authenticated Sun* employees who want to send appreciation messages to colleagues.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Send a Kudo to a Colleague (Priority: P1)

A Sun* employee wants to write and send a Kudo message to recognize a colleague's contribution.

**Why this priority**: This is the core purpose of the modal — creating and sending Kudos. Without this, the feature has no value.

**Independent Test**: Open the Write Kudo modal, fill all required fields, and submit.

**Acceptance Scenarios**:

1. **Given** the user clicks "Viết Kudo" on the Kudos page, **When** the modal opens, **Then** a modal dialog is displayed with the title "Gửi lời cám ơn và ghi nhận đến đồng đội" centered at the top, with a warm cream background (#FFF8E1) and rounded corners.
2. **Given** the modal is open, **When** the user fills in all required fields (Người nhận, Danh hiệu, content, hashtag), **Then** the "Gửi" button becomes enabled (golden yellow background).
3. **Given** all required fields are filled, **When** the user clicks "Gửi", **Then** the form is validated, data is submitted, the button shows a loading state ("Đang gửi..."), and the modal closes on success.
4. **Given** the form was submitted successfully, **When** the modal closes, **Then** the new Kudo appears in the Kudos feed/list and a success toast notification is shown.
5. **Given** the form was submitted, **When** a network error occurs, **Then** the modal stays open with all data preserved, an error toast is shown, and the user can retry.

---

### User Story 2 - Search and Select a Recipient (Priority: P1)

A user needs to find and select a specific colleague as the Kudo recipient.

**Why this priority**: The recipient field is required — the user cannot send a Kudo without selecting one.

**Independent Test**: Click the recipient search dropdown, type a name, and select from results.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the "Người nhận" field, **Then** a search dropdown is displayed with placeholder "Tìm kiếm" and a dropdown arrow icon.
2. **Given** the user clicks the search field, **When** they type at least 1 character, **Then** a dropdown list appears with matching colleagues filtered by the typed text.
3. **Given** search results are displayed, **When** the user clicks on a colleague name, **Then** the colleague is selected as the recipient and displayed in the field.
4. **Given** the recipient field is empty, **When** the user attempts to submit, **Then** the field shows a red border and validation error message.

---

### User Story 3 - Write Rich Text Content with Formatting (Priority: P1)

A user wants to compose a Kudo message with text formatting options.

**Why this priority**: The content field is required and the rich text editor is a core differentiator of the feature.

**Independent Test**: Type in the text area and use each toolbar button (Bold, Italic, Strikethrough, Numbered list, Link, Quote).

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the content area, **Then** a toolbar is displayed above the textarea with 6 formatting buttons (B, I, S, numbered list, link, quote) and a "Tiêu chuẩn cộng đồng" link.
2. **Given** the user selects text in the editor, **When** they click the Bold (B) button, **Then** the selected text becomes bold and the button toggles to an active state.
3. **Given** the user is typing, **When** they type "@" followed by a name, **Then** an autocomplete dropdown appears to mention/tag a colleague.
4. **Given** the user is typing content, **When** the character count approaches the limit, **Then** a character counter in the toolbar area turns red (#E46060) to warn the user.
5. **Given** the user clicks the Link button (C.5), **When** the link dialog opens, **Then** a sub-dialog appears for entering a URL and optional display text, with an option to open in a new tab.
6. **Given** the textarea is empty, **When** viewing the field, **Then** the placeholder text "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!" is displayed.
7. **Given** below the textarea, **When** viewing, **Then** a hint text "Bạn có thể '@ + tên' để nhắc tới đồng nghiệp khác" is always visible.
8. **Given** the toolbar area, **When** viewing, **Then** a "Tiêu chuẩn cộng đồng" (Community Standards) link is displayed on the right side of the toolbar, which opens the community guidelines page/modal when clicked.

---

### User Story 4 - Add Hashtags to a Kudo (Priority: P1)

A user wants to tag their Kudo with relevant hashtags for categorization.

**Why this priority**: Hashtag is a required field — at least 1 hashtag must be added.

**Independent Test**: Click "+ Hashtag" and add/remove hashtags.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the Hashtag section, **Then** a label "Hashtag *" is displayed with a "+ Hashtag" button showing "Tối đa 5".
2. **Given** the user clicks "+ Hashtag", **When** the dropdown opens, **Then** a list of available hashtags is displayed for selection.
3. **Given** hashtags are selected, **When** viewing the tag group, **Then** selected hashtags appear as chips/pills that can be removed by clicking "x".
4. **Given** 5 hashtags are already added, **When** the user tries to add more, **Then** the "+ Hashtag" button is hidden or disabled.
5. **Given** no hashtags are selected, **When** the user attempts to submit, **Then** validation prevents submission and shows an error.

---

### User Story 5 - Attach Images to a Kudo (Priority: P2)

A user wants to attach images to their Kudo message.

**Why this priority**: Image attachment is optional but adds value to the recognition message.

**Independent Test**: Click "+ Image" and upload/remove images.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the Image section, **Then** a label "Image" is displayed with a "+ Image" button showing "Tối đa 5".
2. **Given** the user clicks "+ Image", **When** the file picker opens, **Then** the user can select image files to upload.
3. **Given** images are uploaded, **When** viewing the image row, **Then** thumbnails (80x80px, rounded) are displayed with a red "x" close button on each for removal.
4. **Given** 5 images are already attached, **When** viewing the section, **Then** the "+ Image" button is hidden.
5. **Given** the user clicks the red "x" on a thumbnail, **When** clicked, **Then** the image is removed from the attachment list.

---

### User Story 6 - Send a Kudo Anonymously (Priority: P2)

A user wants to send a Kudo without revealing their identity.

**Why this priority**: Anonymous sending is a secondary feature that enhances user comfort.

**Independent Test**: Toggle the anonymous checkbox and submit.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the anonymous option, **Then** a checkbox with label "Gửi lời cám ơn và ghi nhận ẩn danh" is displayed (unchecked by default, label in grey #999).
2. **Given** the checkbox is unchecked, **When** the user clicks it, **Then** the checkbox becomes checked (gold #FFEA9E background with white checkmark) and an additional text field appears below for entering an anonymous display name.
3. **Given** the anonymous checkbox is checked, **When** viewing the anonymous name field, **Then** a text input is displayed allowing the user to enter a custom anonymous name (e.g., "Người bí ẩn").
4. **Given** the anonymous option is enabled, **When** the Kudo is submitted and displayed, **Then** the sender's real identity is hidden and the anonymous display name (or a default "Ẩn danh") is shown instead.
5. **Given** the anonymous checkbox is checked, **When** the user unchecks it, **Then** the anonymous name field is hidden and the form returns to normal (sender identity will be shown).

---

### User Story 7 - Cancel Kudo Writing (Priority: P2)

A user decides to discard the Kudo and close the modal.

**Why this priority**: Users need a clear way to exit without submitting.

**Independent Test**: Click "Hủy" button and verify modal closes.

**Acceptance Scenarios**:

1. **Given** the modal is open with some fields filled, **When** the user clicks the "Hủy" button, **Then** the modal closes and all entered data is discarded.
2. **Given** the modal is open, **When** the user clicks the dark overlay area outside the modal, **Then** the modal closes and all entered data is discarded.
3. **Given** the modal is open, **When** the user presses the Esc key, **Then** the modal closes and all entered data is discarded.
4. **Given** the modal is open, **When** viewing the action bar, **Then** the "Hủy" button (with X icon) is on the left and the "Gửi" button (golden, with send icon) fills the remaining width on the right.

---

### User Story 8 - Enter a Danh Hieu (Title/Designation) (Priority: P1)

A user wants to give a custom title/designation to their Kudo message. This is a free-text input where the user types a personal title for their colleague.

**Why this priority**: The danh hieu becomes the displayed title of the Kudo and is required.

**Independent Test**: Type in the Danh hiệu field and verify placeholder, helper text, and validation.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** viewing the "Danh hiệu" field, **Then** a text input (not a dropdown) is displayed with placeholder "Dành tặng một danh hiệu cho đồng đội" and a required asterisk (*).
2. **Given** below the input, **When** viewing, **Then** two lines of helper text are shown in grey (#999): "Ví dụ: Người truyền động lực cho tôi." and "Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn."
3. **Given** the field is empty, **When** the user attempts to submit, **Then** validation prevents submission and shows a red border on the field.
4. **Given** the user types in the field, **When** viewing, **Then** the typed text replaces the placeholder and is displayed in the input style (16px/700, #00101A).

---

### User Story 9 - Responsive Modal on Mobile/Tablet (Priority: P2)

A user accesses the Write Kudo modal from a mobile or tablet device.

**Why this priority**: Mobile-first is a constitution requirement.

**Independent Test**: Open modal on mobile viewport and verify all fields are usable.

**Acceptance Scenarios**:

1. **Given** the user is on a mobile device (< 640px), **When** the modal opens, **Then** it takes full screen width with appropriate padding, all fields stack vertically.
2. **Given** a tablet viewport (640px-1023px), **When** the modal opens, **Then** it scales proportionally with adequate spacing.
3. **Given** any viewport, **When** the image thumbnails are displayed, **Then** they wrap to the next line if they exceed the available width.

---

### Edge Cases

- **Empty form submission**: All required fields (Người nhận, Danh hiệu, content, hashtag) must be validated. The "Gửi" button should be disabled until all required fields are filled.
- **Network failure on submit**: Show an error toast/message and keep the modal open with data preserved so the user can retry.
- **Recipient search with no results**: Display a "Không tìm thấy kết quả" empty state in the dropdown.
- **Special characters in content**: The rich text editor should handle special characters, emojis, and Unicode correctly.
- **Large image files**: Validate image file size (recommended max 5MB per image) and show an error for oversized files.
- **Unsupported image format**: Only allow common image formats (JPG, PNG, GIF, WebP). Show error for unsupported types.
- **Concurrent @ mentions**: When typing "@" in the content editor, the mention dropdown should not conflict with the main form interactions.
- **Browser back/close**: If the user has unsaved data and navigates away, consider showing a confirmation dialog (optional enhancement).
- **Content character limit**: The design includes a character counter in the toolbar area (text turns red #E46060 near the limit). Enforce a maximum content length and display remaining characters.
- **Modal scroll on short viewports**: The modal is 1012px tall (at desktop). On viewports shorter than the modal height, the modal MUST be scrollable (`overflow-y: auto`) with the overlay remaining fixed. The modal should not extend beyond the viewport.
- **Anonymous name field**: When the anonymous checkbox is enabled, an additional text field for the anonymous display name appears. If the user checks anonymous but leaves the name field empty, a default name (e.g., "Ẩn danh") should be used.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|---|---|---|---|
| Modal Title | I520:11647;520:9870 | "Gửi lời cám ơn và ghi nhận đến đồng đội" heading (32px, centered) | Display only |
| Recipient Field (B) | I520:11647;520:9871 | Label "Người nhận *" + search dropdown | Click: open dropdown, Type: filter results, Select: set recipient |
| Recipient Label (B.1) | I520:11647;520:9872 | "Người nhận" with required asterisk | Display only |
| Recipient Search (B.2) | I520:11647;520:9873 | Search input with dropdown arrow | Type: autocomplete, Click: open list |
| Danh hiệu Field | I520:11647;1688:10448 | Label "Danh hiệu *" + free-text input (NOT a dropdown) + 2-line helper text below | Type: enter custom title text |
| Toolbar Container (C) | I520:11647;520:9877 | Formatting toolbar with 6 buttons + community standards link | Click each button to toggle formatting |
| Bold Button (C.1) | I520:11647;520:9881 | "B" icon toggle button | Click: toggle bold |
| Italic Button (C.2) | I520:11647;662:11119 | "I" icon toggle button | Click: toggle italic |
| Strikethrough Button (C.3) | I520:11647;662:11213 | "S" icon toggle button | Click: toggle strikethrough |
| Numbered List Button (C.4) | I520:11647;662:10376 | List icon toggle button | Click: toggle numbered list |
| Link Button (C.5) | I520:11647;662:10507 | Link icon button | Click: open URL input dialog |
| Quote Button (C.6) | I520:11647;662:10647 | Quote icon toggle button | Click: toggle blockquote |
| Text Area (D) | I520:11647;520:9886 | Rich text textarea with placeholder | Type: enter content, @mention: autocomplete |
| Hint Text (D.1) | I520:11647;520:9887 | Hint about @ mention feature | Display only |
| Hashtag Section (E) | I520:11647;520:9890 | Label "Hashtag *" + tag group | Click "+ Hashtag": open dropdown |
| Hashtag Label (E.1) | I520:11647;520:9891 | "Hashtag" with required asterisk | Display only |
| Tag Group (E.2) | I520:11647;662:8595 | Chip/pill container for selected hashtags | Click chip "x": remove tag |
| Image Section (F) | I520:11647;520:9896 | Label "Image" + thumbnail row + add button | Click thumbnails: preview, Click "x": remove |
| Image Label (F.1) | I520:11647;520:9897 | "Image" label (no asterisk — optional field) | Display only |
| Image Thumbnails (F.2-F.4) | I520:11647;662:9197, 662:9393, 662:9439 | 80x80px rounded thumbnails with red "x" close button | Click "x": remove image |
| Add Image Button (F.5) | I520:11647;662:9132 | "+ Image / Tối đa 5" button | Click: open file picker |
| Anonymous Checkbox (G) | I520:11647;520:14099 | Checkbox + "Gửi lời cám ơn và ghi nhận ẩn danh" | Click: toggle anonymous mode, reveals anonymous name text field when checked |
| Anonymous Name Field | (dynamic, shown when G is checked) | Text input for entering anonymous display name | Type: enter anonymous name. Hidden when checkbox unchecked |
| Action Bar (H) | I520:11647;520:9905 | Container for Cancel and Submit buttons | - |
| Cancel Button (H.1) | I520:11647;520:9906 | "Hủy" + X icon, secondary style | Click: close modal, discard data |
| Submit Button (H.2) | I520:11647;520:9907 | "Gửi" + send icon, primary golden CTA | Click: validate & submit form |

### Navigation Flow

- **From**: Kudos page "Viết Kudo" CTA button, Profile page "Viết Kudo" button
- **To**: Closes modal on success (returns to Kudos page), Closes modal on cancel
- **Internal**: Recipient search dropdown, Hashtag dropdown, Link URL input dialog, @ mention autocomplete

### Visual Requirements

- **Modal background**: Warm cream/ivory (#FFF8E1) with 24px border-radius
- **Modal overlay**: Dark semi-transparent background (rgba(0, 16, 26, 0.8)) behind the modal
- **Modal width**: 752px (desktop), responsive on smaller screens
- **Section spacing**: 32px gap between form sections
- **Modal padding**: 40px on all sides
- **Primary CTA (Gửi)**: Golden yellow (#FFEA9E) background, dark text, 8px border-radius
- **Secondary button (Hủy)**: Subtle gold tint background, golden-brown border
- **Rich text toolbar**: Connected button group with golden-brown borders, first button has top-left radius, last has top-right radius
- **Text area**: White background, connected to toolbar (bottom corners only have radius)

> **See `design-style.md` for complete visual specifications including colors, typography, spacing, and component dimensions.**

### Accessibility Requirements

- **Focus management**: When modal opens, focus MUST move to the first interactive element (recipient search field). When modal closes, focus MUST return to the trigger button.
- **Keyboard navigation**: All form fields and buttons MUST be navigable via Tab key. Esc key MUST close the modal.
- **ARIA attributes**: Modal MUST have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the title element.
- **Required fields**: Fields with asterisk (*) MUST have `aria-required="true"` attribute.
- **Error messages**: Validation errors MUST be announced by screen readers using `aria-describedby` or `role="alert"`.
- **Toolbar buttons**: Each toolbar button MUST have `aria-label` (e.g., "Bold", "Italic") and `aria-pressed` for toggle state.
- **Image remove buttons**: Each red "x" button MUST have `aria-label="Remove image"`.
- **Checkbox**: MUST use native `<input type="checkbox">` or `role="checkbox"` with `aria-checked`.
- **Color contrast**: Gold #FFEA9E on dark #00101A text passes AAA. Grey #999 on white #FFF does NOT meet AA — consider darkening placeholder text to #666 for accessibility.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the Write Kudo modal when triggered from the Kudos page CTA button.
- **FR-002**: System MUST provide a searchable dropdown for selecting a recipient from the list of colleagues.
- **FR-003**: System MUST provide a text input for entering a "Danh hiệu" (title) for the Kudo, with helper text displayed below.
- **FR-004**: System MUST provide a rich text editor with formatting toolbar supporting: Bold, Italic, Strikethrough, Numbered List, Link insertion, and Blockquote.
- **FR-005**: System MUST support @ mention functionality in the content editor, showing autocomplete suggestions when typing "@" followed by text.
- **FR-006**: System MUST allow adding up to 5 hashtags via a dropdown selector, displayed as removable chips.
- **FR-007**: System MUST allow attaching up to 5 images with preview thumbnails and individual remove capability.
- **FR-008**: System MUST provide an anonymous sending option via checkbox toggle. When enabled, an additional text field MUST appear for entering a custom anonymous display name.
- **FR-009**: System MUST validate all required fields (Người nhận, Danh hiệu, content, hashtag) before allowing submission.
- **FR-010**: The "Gửi" button MUST be disabled when required fields are incomplete.
- **FR-011**: The "Hủy" button, overlay click, and Esc key MUST close the modal and discard all entered data.
- **FR-012**: System MUST display a "Tiêu chuẩn cộng đồng" (Community Standards) link in the toolbar area that opens the community guidelines page or modal when clicked.
- **FR-013**: When 5 images are attached, the "+ Image" button MUST be hidden.
- **FR-014**: When 5 hashtags are added, the "+ Hashtag" button MUST be hidden or disabled.
- **FR-015**: System MUST display a character counter in the toolbar area. The counter text MUST turn red (#E46060) when approaching the maximum content length.
- **FR-016**: When the modal content exceeds viewport height, the modal MUST be scrollable with the overlay remaining fixed.
- **FR-017**: On successful submission, system MUST show a success toast notification and close the modal. On failure, system MUST show an error toast and keep the modal open with data preserved.

### Technical Requirements

- **TR-001**: Modal MUST be implemented as a client component (`"use client"`) since it uses event handlers and state management.
- **TR-002**: Rich text editor SHOULD use a library like TipTap, Slate.js, or similar for the formatting toolbar functionality.
- **TR-003**: Image uploads MUST use Supabase Storage. Thumbnails MUST be generated client-side for preview before upload.
- **TR-004**: Recipient search MUST debounce API calls (recommended 300ms) to avoid excessive requests.
- **TR-005**: Form state MUST be managed with React `useState`/`useReducer` or a form library (e.g., React Hook Form).
- **TR-006**: Modal MUST trap focus within the dialog and prevent background scroll when open.
- **TR-007**: All file uploads MUST validate file type and size before sending to the server.
- **TR-008**: The @ mention autocomplete MUST use the same colleague search API as the recipient field.
- **TR-009**: Rich text content MUST be sanitized before storage and display to prevent XSS attacks, per Constitution OWASP requirements. Use a dedicated sanitization library (e.g., DOMPurify) to strip unsafe HTML while preserving allowed formatting tags (bold, italic, strikethrough, list, link, blockquote).
- **TR-010**: Hashtag options MUST be fetched from the server when the "+ Hashtag" button is clicked (or pre-fetched on modal open). Results SHOULD be cached to avoid redundant API calls.

### Key Entities *(data structure)*

- **Kudo**: Represents a single appreciation message
  - `id`: string (UUID)
  - `senderId`: string (user ID — always stored for auditing, even when anonymous)
  - `recipientId`: string (user ID of the recipient)
  - `title`: string (danh hieu free-text, max 1024 characters)
  - `content`: string (rich text HTML content)
  - `hashtags`: string[] (array of hashtag strings, 1-5 items)
  - `images`: string[] (array of image URLs, 0-5 items)
  - `isAnonymous`: boolean (default: false)
  - `anonymousName`: string | null (custom anonymous display name, null when not anonymous)
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

- **User** (for recipient search):
  - `id`: string
  - `name`: string
  - `email`: string
  - `avatar`: string (URL)
  - `department`: string

### State Management

| State | Type | Description |
|---|---|---|
| `isOpen` | Local (client) | Modal open/close state. Controlled by parent component. |
| `recipient` | Local (client) | Selected recipient user object. Null when not selected. |
| `searchQuery` | Local (client) | Current text in recipient search input. Used for debounced API calls. |
| `searchResults` | Local (client) | Array of users matching search query. |
| `title` | Local (client) | Danh hieu text input value. |
| `content` | Local (client) | Rich text editor content (HTML string). |
| `hashtags` | Local (client) | Array of selected hashtag strings (max 5). |
| `hashtagOptions` | Local (client) | Available hashtags fetched from server. Cached after first fetch. |
| `images` | Local (client) | Array of image File objects or uploaded URLs (max 5). |
| `isAnonymous` | Local (client) | Anonymous checkbox state. Default: false. When true, shows anonymous name field. |
| `anonymousName` | Local (client) | Anonymous display name text. Only used when isAnonymous is true. Default: empty string (falls back to "Ẩn danh"). |
| `charCount` | Local (client) | Current character count of content. Drives counter display and color (red when near limit). |
| `isSubmitting` | Local (client) | Loading state during form submission. |
| `errors` | Local (client) | Validation error messages per field. |

**Loading states**:
- Recipient search: Show spinner in dropdown while fetching results
- Form submission: Disable "Gửi" button and show loading spinner
- Image upload: Show progress indicator on thumbnail

**Error states**:
- Field validation: Red border + error text below field
- Submission failure: Toast notification with retry option
- Image upload failure: Error indicator on thumbnail with retry

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|---|---|---|---|
| /api/kudos | POST | Create a new Kudo | Predicted |
| /api/users/search?q={query} | GET | Search colleagues for recipient selection and @ mentions | Predicted |
| /api/hashtags | GET | Fetch available hashtags for selection | Predicted |
| /api/upload/images | POST | Upload image attachments to storage | Predicted |

> **Note**: API endpoints are predicted based on the UI requirements. Actual implementation may vary based on Supabase integration patterns (e.g., using Supabase Storage directly for images, using RPC functions for Kudo creation).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All required form fields (Người nhận, Danh hiệu, content, Hashtag) are validated and prevent submission when empty.
- **SC-002**: Rich text editor supports all 6 formatting options (Bold, Italic, Strikethrough, Numbered List, Link, Quote) correctly.
- **SC-003**: Recipient search returns filtered results within 500ms of typing (after debounce).
- **SC-004**: Image upload and thumbnail preview works for JPG, PNG, GIF, WebP up to 5MB per file.
- **SC-005**: Modal is fully functional and usable across all breakpoints (mobile, tablet, desktop).
- **SC-006**: Form submission creates a Kudo record and closes the modal on success.
- **SC-007**: Anonymous checkbox correctly hides sender identity when Kudo is displayed.
- **SC-008**: All accessibility requirements are met (keyboard navigation, screen reader support, focus management).

---

## Out of Scope

- Kudo editing after submission (this is a create-only modal)
- Kudo scheduling/drafts (send immediately only)
- Multiple recipients in a single Kudo
- Video or file attachments (images only)
- Kudo templates or pre-filled content
- Real-time collaborative editing
- Admin moderation of Kudo content within this modal

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Design style documented (`.momorph/specs/ihQ26W78P2-viet-kudo/design-style.md`)
- [ ] Recipient search API available
- [ ] Hashtag list API available
- [ ] Image upload (Supabase Storage) configured
- [ ] Kudo creation API available
- [ ] Shared Header component implemented
- [ ] Rich text editor library selected and integrated

---

## Notes

- The modal is designed at **752px width** on desktop — must be responsive per constitution requirements.
- All typography uses **Montserrat** font (weight 700 bold) except required asterisks which use **Noto Sans JP**.
- The toolbar buttons form a connected group: first button (Bold) has top-left border-radius, last section (character count / community standards) has top-right border-radius. The textarea connects below with bottom border-radius only.
- The "Tiêu chuẩn cộng đồng" link appears in the rightmost toolbar section — it opens a community guidelines page/modal for writing Kudos.
- The toolbar's rightmost section includes a character counter that turns red (#E46060) when content approaches the maximum length. The counter and community standards link share the same toolbar segment.
- When the anonymous checkbox is enabled, a text field appears below the checkbox for entering a custom anonymous display name. This is a conditional field documented in the Figma design item specs.
- Frame image reference: ![Viết Kudo](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/520:11602/2a59143b0305d622e49b962fdf2cb2c7.png)
