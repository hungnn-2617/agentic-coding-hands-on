/**
 * Supabase Database Types
 *
 * This file will be regenerated using `supabase gen types typescript`
 * once the Supabase project is configured.
 *
 * For now, we define placeholder types based on the database schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          avatar_url: string | null;
          department_id: number | null;
          role: 'user' | 'admin';
          locale: 'vi' | 'en';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id: string;
          full_name: string;
          avatar_url?: string | null;
          department_id?: number | null;
          role?: 'user' | 'admin';
          locale?: 'vi' | 'en';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          avatar_url?: string | null;
          department_id?: number | null;
          role?: 'user' | 'admin';
          locale?: 'vi' | 'en';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      departments: {
        Row: {
          id: number;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      kudos: {
        Row: {
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
        };
        Insert: {
          id?: number;
          sender_id: string;
          receiver_id: string;
          title: string;
          content: string;
          is_anonymous?: boolean;
          anonymous_name?: string | null;
          status?: 'published' | 'spam' | 'hidden';
          like_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: number;
          sender_id?: string;
          receiver_id?: string;
          title?: string;
          content?: string;
          is_anonymous?: boolean;
          anonymous_name?: string | null;
          status?: 'published' | 'spam' | 'hidden';
          like_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      kudo_hashtags: {
        Row: {
          id: number;
          kudo_id: number;
          hashtag_id: number;
        };
        Insert: {
          id?: number;
          kudo_id: number;
          hashtag_id: number;
        };
        Update: {
          id?: number;
          kudo_id?: number;
          hashtag_id?: number;
        };
        Relationships: [];
      };
      kudo_images: {
        Row: {
          id: number;
          kudo_id: number;
          image_url: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          kudo_id: number;
          image_url: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          kudo_id?: number;
          image_url?: string;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      kudo_likes: {
        Row: {
          id: number;
          kudo_id: number;
          user_id: string;
          is_special_day: boolean;
          heart_value: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          kudo_id: number;
          user_id: string;
          is_special_day?: boolean;
          heart_value?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          kudo_id?: number;
          user_id?: string;
          is_special_day?: boolean;
          heart_value?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      secret_boxes: {
        Row: {
          id: number;
          user_id: string;
          badge_id: number | null;
          is_opened: boolean;
          opened_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          badge_id?: number | null;
          is_opened?: boolean;
          opened_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          badge_id?: number | null;
          is_opened?: boolean;
          opened_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      badges: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          image_url: string | null;
          drop_rate: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          image_url?: string | null;
          drop_rate: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          drop_rate?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      hashtags: {
        Row: {
          id: number;
          name: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: 'user' | 'admin';
      locale: 'vi' | 'en';
    };
  };
}
