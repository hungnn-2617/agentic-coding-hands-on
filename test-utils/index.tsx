import type { ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import type { KudoPost, UserStats, LeaderboardEntry, SpotlightNode } from '@/types/kudo-feed';

/**
 * Custom render function that wraps components with necessary providers.
 * Use this for all component tests that need context providers.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Wrapper component for testing hooks that require LanguageProvider
 */
export function TestWrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

/**
 * Factory function to create mock KudoPost objects for testing.
 * Override any fields as needed.
 */
export function createMockKudoPost(overrides: Partial<KudoPost> = {}): KudoPost {
  return {
    id: 'kudo-1',
    sender: {
      id: 'user-1',
      full_name: 'John Doe',
      avatar_url: 'https://example.com/avatar1.jpg',
      department_id: 1,
      star_rating: 2,
    },
    receiver: {
      id: 'user-2',
      full_name: 'Jane Smith',
      avatar_url: 'https://example.com/avatar2.jpg',
      department_id: 2,
      star_rating: 1,
    },
    title: 'Great work!',
    content: '<p>Thank you for your excellent contribution to the project.</p>',
    hashtags: ['teamwork', 'innovation'],
    images: [],
    is_anonymous: false,
    anonymous_name: null,
    like_count: 10,
    user_liked: false,
    created_at: '2025-04-20T10:00:00Z',
    ...overrides,
  };
}

/**
 * Creates an array of mock KudoPost objects with unique IDs.
 */
export function createMockKudosList(count: number, baseOverrides: Partial<KudoPost> = {}): KudoPost[] {
  return Array.from({ length: count }, (_, index) =>
    createMockKudoPost({
      id: `kudo-${index + 1}`,
      like_count: 100 - index * 10, // Descending like count for highlight testing
      created_at: new Date(Date.now() - index * 3600000).toISOString(), // Each 1 hour apart
      ...baseOverrides,
    }),
  );
}

/**
 * Factory function to create mock UserStats for testing.
 */
export function createMockUserStats(overrides: Partial<UserStats> = {}): UserStats {
  return {
    kudos_received: 25,
    kudos_sent: 15,
    hearts_received: 100,
    secret_boxes_opened: 3,
    secret_boxes_unopened: 2,
    ...overrides,
  };
}

/**
 * Factory function to create mock LeaderboardEntry for testing.
 */
export function createMockLeaderboardEntry(overrides: Partial<LeaderboardEntry> = {}): LeaderboardEntry {
  return {
    id: 'user-1',
    name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    prize_description: 'Gift Card $100',
    ...overrides,
  };
}

/**
 * Creates an array of mock LeaderboardEntry objects.
 */
export function createMockLeaderboard(count: number): LeaderboardEntry[] {
  return Array.from({ length: count }, (_, index) =>
    createMockLeaderboardEntry({
      id: `user-${index + 1}`,
      name: `User ${index + 1}`,
      prize_description: `Prize ${index + 1}`,
    }),
  );
}

/**
 * Factory function to create mock SpotlightNode for testing.
 */
export function createMockSpotlightNode(overrides: Partial<SpotlightNode> = {}): SpotlightNode {
  return {
    id: 'spotlight-1',
    name: 'John Doe',
    kudo_count: 50,
    ...overrides,
  };
}

/**
 * Creates an array of mock SpotlightNode objects.
 */
export function createMockSpotlightData(count: number): SpotlightNode[] {
  return Array.from({ length: count }, (_, index) =>
    createMockSpotlightNode({
      id: `spotlight-${index + 1}`,
      name: `Person ${index + 1}`,
      kudo_count: Math.floor(Math.random() * 100) + 1,
    }),
  );
}

// Re-export everything from testing-library for convenience
export * from '@testing-library/react';
