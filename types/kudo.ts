// Kudo feature constants
export const KUDO_TITLE_MAX_LENGTH = 1024;
export const KUDO_CONTENT_MAX_LENGTH = 1024;
export const KUDO_MAX_HASHTAGS = 5;
export const KUDO_MAX_IMAGES = 5;
export const KUDO_MAX_IMAGE_SIZE_MB = 5;
export const KUDO_CHAR_WARNING_THRESHOLD = 900;

export const KUDO_ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

// Entities

export interface KudoUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
  department_id: number | null;
}

export interface Kudo {
  id: number;
  sender_id: string;
  receiver_id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  anonymous_name: string | null;
  status: 'published' | 'spam' | 'hidden';
  like_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // Joined relations (populated by queries with joins)
  hashtags?: string[];
  images?: string[];
}

export interface CreateKudoPayload {
  recipient_id: string;
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  is_anonymous: boolean;
  anonymous_name: string | null;
}

// Image upload tracking

export interface KudoImage {
  id: string;
  file: File | null;
  previewUrl: string;
  uploadedUrl: string | null;
  isUploading: boolean;
  error: string | null;
}

// Form state

export interface KudoFormState {
  recipient: KudoUser | null;
  searchQuery: string;
  searchResults: KudoUser[];
  title: string;
  content: string;
  hashtags: string[];
  hashtagOptions: string[];
  images: KudoImage[];
  isAnonymous: boolean;
  anonymousName: string;
  charCount: number;
  isSubmitting: boolean;
  errors: Partial<Record<'recipient' | 'title' | 'content' | 'hashtags', string>>;
}

export const initialKudoFormState: KudoFormState = {
  recipient: null,
  searchQuery: '',
  searchResults: [],
  title: '',
  content: '',
  hashtags: [],
  hashtagOptions: [],
  images: [],
  isAnonymous: false,
  anonymousName: '',
  charCount: 0,
  isSubmitting: false,
  errors: {},
};

// Reducer actions

export type KudoFormAction =
  | { type: 'SET_RECIPIENT'; payload: KudoUser | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: KudoUser[] }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: { html: string; charCount: number } }
  | { type: 'ADD_HASHTAG'; payload: string }
  | { type: 'REMOVE_HASHTAG'; payload: string }
  | { type: 'SET_HASHTAG_OPTIONS'; payload: string[] }
  | { type: 'ADD_IMAGE'; payload: KudoImage }
  | { type: 'UPDATE_IMAGE'; payload: { id: string; updates: Partial<KudoImage> } }
  | { type: 'REMOVE_IMAGE'; payload: string }
  | { type: 'SET_ANONYMOUS'; payload: boolean }
  | { type: 'SET_ANONYMOUS_NAME'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: KudoFormState['errors'] }
  | { type: 'RESET' };
