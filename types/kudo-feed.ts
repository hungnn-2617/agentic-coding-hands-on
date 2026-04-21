import type { KudoUser } from '@/types/kudo';

export interface KudoPost {
  id: string;
  sender: KudoUser & { star_rating: number };
  receiver: KudoUser & { star_rating: number };
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  is_anonymous: boolean;
  anonymous_name: string | null;
  like_count: number;
  user_liked: boolean;
  created_at: string;
}

export interface UserStats {
  kudos_received: number;
  kudos_sent: number;
  hearts_received: number;
  secret_boxes_opened: number;
  secret_boxes_unopened: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar_url: string | null;
  prize_description: string;
}

export interface SpotlightNode {
  id: string;
  name: string;
  kudo_count: number;
}

export interface FilterState {
  hashtag: string | null;
  department: string | null;
}
