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
