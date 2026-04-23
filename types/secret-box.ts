/**
 * Secret Box Types
 *
 * TypeScript interfaces for the Secret Box gamification feature.
 * Users can open mystery boxes to receive random badge rewards.
 */

// ==========================================
// Core Entity Types
// ==========================================

/**
 * Represents a Secret Box in the system
 */
export interface SecretBox {
  id: number;
  user_id: string;
  badge_id: number | null;
  is_opened: boolean;
  opened_at: string | null;
  created_at: string;
}

/**
 * Represents a collectible badge reward
 */
export interface Badge {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  drop_rate: number; // 0-100 percentage
  created_at: string;
}

/**
 * Badge with localized names for display
 */
export interface LocalizedBadge extends Badge {
  display_name: string; // Localized name based on user's locale
}

// ==========================================
// API Request/Response Types
// ==========================================

/**
 * Response from GET /api/secret-boxes/count
 */
export interface SecretBoxCountResponse {
  unopened_count: number;
}

/**
 * Error response for count endpoint
 */
export interface SecretBoxCountErrorResponse {
  error: string;
  code: 'UNAUTHORIZED' | 'SERVER_ERROR';
}

/**
 * Response from POST /api/secret-boxes/open
 */
export interface SecretBoxOpenResponse {
  success: true;
  badge: {
    id: number;
    name: string;
    image_url: string | null;
  };
  remaining_count: number;
}

/**
 * Error response for open endpoint
 */
export interface SecretBoxOpenErrorResponse {
  success: false;
  error: string;
  code: 'UNAUTHORIZED' | 'NO_BOXES' | 'RATE_LIMITED' | 'SERVER_ERROR';
}

/**
 * Response from GET /api/secret-boxes/badges (optional preload endpoint)
 */
export interface BadgesResponse {
  badges: Array<{
    id: number;
    name: string;
    image_url: string | null;
  }>;
}

// ==========================================
// Component/Hook State Types
// ==========================================

/**
 * Modal state managed by useSecretBox hook
 */
export interface SecretBoxModalState {
  isLoading: boolean; // Initial count fetch in progress
  isOpening: boolean; // Box opening API call in progress
  unopenedCount: number;
  error: string | null;
  revealedBadge: LocalizedBadge | null;
}

/**
 * Actions for the modal state reducer
 */
export type SecretBoxAction =
  | { type: 'FETCH_COUNT_START' }
  | { type: 'FETCH_COUNT_SUCCESS'; payload: number }
  | { type: 'FETCH_COUNT_ERROR'; payload: string }
  | { type: 'OPEN_BOX_START' }
  | { type: 'OPEN_BOX_SUCCESS'; payload: { badge: LocalizedBadge; remainingCount: number } }
  | { type: 'OPEN_BOX_ERROR'; payload: string }
  | { type: 'RESET_ERROR' }
  | { type: 'RESET_STATE' };

/**
 * Return type for useSecretBox hook
 */
export interface UseSecretBoxReturn {
  state: SecretBoxModalState;
  openBox: () => Promise<void>;
  fetchCount: () => Promise<void>;
  resetError: () => void;
  resetState: () => void;
}

// ==========================================
// Component Props Types
// ==========================================

export interface SecretBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GiftBoxProps {
  isDisabled: boolean;
  isOpening: boolean;
  onClick: () => void;
}

export interface CountDisplayProps {
  count: number;
  isAnimating?: boolean;
}

export interface ModalHeaderProps {
  onClose: () => void;
}

export interface InstructionTextProps {
  isVisible: boolean;
}

// ==========================================
// Constants
// ==========================================

/**
 * Maximum displayed count (shows "99+" for larger values)
 */
export const SECRET_BOX_MAX_DISPLAY_COUNT = 99;

/**
 * Debounce interval for box opening (milliseconds)
 */
export const SECRET_BOX_OPEN_DEBOUNCE_MS = 500;

/**
 * Badge names for reference
 */
export const BADGE_NAMES = {
  STAY_GOLD: 'Stay Gold',
  FLOW_TO_HORIZON: 'Flow to Horizon',
  BEYOND_THE_BOUNDARY: 'Beyond the Boundary',
  ROOT_FURTHER: 'Root Further',
  TOUCH_OF_LIGHT: 'Touch of Light',
  REVIVAL: 'Revival',
} as const;

/**
 * Badge probability weights (out of 100)
 */
export const BADGE_PROBABILITIES = {
  STAY_GOLD: 30,
  FLOW_TO_HORIZON: 25,
  BEYOND_THE_BOUNDARY: 10,
  ROOT_FURTHER: 5,
  TOUCH_OF_LIGHT: 20,
  REVIVAL: 10,
} as const;
