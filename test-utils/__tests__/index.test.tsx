import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  renderWithProviders,
  TestWrapper,
  createMockKudoPost,
  createMockKudosList,
  createMockUserStats,
  createMockLeaderboardEntry,
  createMockLeaderboard,
  createMockSpotlightNode,
  createMockSpotlightData,
} from '../index';
import { useLanguage } from '@/lib/i18n';

// Test component that uses the language context
function TestLanguageComponent() {
  const { locale } = useLanguage();
  return <div data-testid="language">{locale}</div>;
}

describe('test-utils', () => {
  describe('renderWithProviders', () => {
    it('wraps component with LanguageProvider', () => {
      renderWithProviders(<TestLanguageComponent />);
      expect(screen.getByTestId('language')).toHaveTextContent('vi');
    });

    it('renders component correctly', () => {
      renderWithProviders(<div data-testid="test">Hello</div>);
      expect(screen.getByTestId('test')).toHaveTextContent('Hello');
    });

    it('passes additional render options', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      renderWithProviders(<div data-testid="test">Hello</div>, {
        container,
      });

      expect(container.querySelector('[data-testid="test"]')).toBeInTheDocument();
      document.body.removeChild(container);
    });
  });

  describe('TestWrapper', () => {
    it('provides language context to children', () => {
      render(
        <TestWrapper>
          <TestLanguageComponent />
        </TestWrapper>,
      );
      expect(screen.getByTestId('language')).toHaveTextContent('vi');
    });

    it('renders children correctly', () => {
      render(
        <TestWrapper>
          <span data-testid="child">Child Content</span>
        </TestWrapper>,
      );
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });
  });

  describe('createMockKudoPost', () => {
    it('creates default kudo post', () => {
      const kudo = createMockKudoPost();

      expect(kudo.id).toBe('kudo-1');
      expect(kudo.sender.id).toBe('user-1');
      expect(kudo.sender.full_name).toBe('John Doe');
      expect(kudo.receiver.id).toBe('user-2');
      expect(kudo.receiver.full_name).toBe('Jane Smith');
      expect(kudo.title).toBe('Great work!');
      expect(kudo.content).toContain('Thank you');
      expect(kudo.hashtags).toEqual(['teamwork', 'innovation']);
      expect(kudo.images).toEqual([]);
      expect(kudo.is_anonymous).toBe(false);
      expect(kudo.anonymous_name).toBeNull();
      expect(kudo.like_count).toBe(10);
      expect(kudo.user_liked).toBe(false);
      expect(kudo.created_at).toBe('2025-04-20T10:00:00Z');
    });

    it('allows overriding specific fields', () => {
      const kudo = createMockKudoPost({
        id: 'custom-id',
        title: 'Custom Title',
        like_count: 100,
      });

      expect(kudo.id).toBe('custom-id');
      expect(kudo.title).toBe('Custom Title');
      expect(kudo.like_count).toBe(100);
      // Other fields should still have defaults
      expect(kudo.sender.full_name).toBe('John Doe');
    });

    it('allows creating anonymous kudo', () => {
      const kudo = createMockKudoPost({
        is_anonymous: true,
        anonymous_name: 'Secret Admirer',
      });

      expect(kudo.is_anonymous).toBe(true);
      expect(kudo.anonymous_name).toBe('Secret Admirer');
    });

    it('allows overriding nested sender object', () => {
      const kudo = createMockKudoPost({
        sender: {
          id: 'custom-sender',
          full_name: 'Custom Sender',
          avatar_url: 'https://custom.com/avatar.jpg',
          department_id: 5,
          star_rating: 3,
        },
      });

      expect(kudo.sender.id).toBe('custom-sender');
      expect(kudo.sender.full_name).toBe('Custom Sender');
      expect(kudo.sender.department_id).toBe(5);
    });

    it('allows setting images', () => {
      const kudo = createMockKudoPost({
        images: ['image1.jpg', 'image2.jpg'],
      });

      expect(kudo.images).toEqual(['image1.jpg', 'image2.jpg']);
    });
  });

  describe('createMockKudosList', () => {
    it('creates specified number of kudos', () => {
      const kudos = createMockKudosList(5);
      expect(kudos).toHaveLength(5);
    });

    it('assigns unique IDs', () => {
      const kudos = createMockKudosList(3);
      const ids = kudos.map((k) => k.id);
      expect(ids).toEqual(['kudo-1', 'kudo-2', 'kudo-3']);
    });

    it('assigns descending like counts', () => {
      const kudos = createMockKudosList(3);
      expect(kudos[0].like_count).toBe(100);
      expect(kudos[1].like_count).toBe(90);
      expect(kudos[2].like_count).toBe(80);
    });

    it('assigns different timestamps', () => {
      const kudos = createMockKudosList(3);
      const timestamps = kudos.map((k) => new Date(k.created_at).getTime());
      // Each should be 1 hour apart (decreasing)
      expect(timestamps[0]).toBeGreaterThan(timestamps[1]);
      expect(timestamps[1]).toBeGreaterThan(timestamps[2]);
    });

    it('applies base overrides to all kudos', () => {
      const kudos = createMockKudosList(3, { is_anonymous: true });
      kudos.forEach((kudo) => {
        expect(kudo.is_anonymous).toBe(true);
      });
    });

    it('creates empty list for zero count', () => {
      const kudos = createMockKudosList(0);
      expect(kudos).toHaveLength(0);
    });
  });

  describe('createMockUserStats', () => {
    it('creates default user stats', () => {
      const stats = createMockUserStats();

      expect(stats.kudos_received).toBe(25);
      expect(stats.kudos_sent).toBe(15);
      expect(stats.hearts_received).toBe(100);
      expect(stats.secret_boxes_opened).toBe(3);
      expect(stats.secret_boxes_unopened).toBe(2);
    });

    it('allows overriding specific fields', () => {
      const stats = createMockUserStats({
        kudos_received: 50,
        hearts_received: 200,
      });

      expect(stats.kudos_received).toBe(50);
      expect(stats.hearts_received).toBe(200);
      // Other fields should still have defaults
      expect(stats.kudos_sent).toBe(15);
    });

    it('allows setting all fields to zero', () => {
      const stats = createMockUserStats({
        kudos_received: 0,
        kudos_sent: 0,
        hearts_received: 0,
        secret_boxes_opened: 0,
        secret_boxes_unopened: 0,
      });

      expect(stats.kudos_received).toBe(0);
      expect(stats.kudos_sent).toBe(0);
      expect(stats.hearts_received).toBe(0);
      expect(stats.secret_boxes_opened).toBe(0);
      expect(stats.secret_boxes_unopened).toBe(0);
    });
  });

  describe('createMockLeaderboardEntry', () => {
    it('creates default leaderboard entry', () => {
      const entry = createMockLeaderboardEntry();

      expect(entry.id).toBe('user-1');
      expect(entry.name).toBe('John Doe');
      expect(entry.avatar_url).toBe('https://example.com/avatar.jpg');
      expect(entry.prize_description).toBe('Gift Card $100');
    });

    it('allows overriding specific fields', () => {
      const entry = createMockLeaderboardEntry({
        id: 'winner-1',
        name: 'Top Winner',
        prize_description: 'Grand Prize',
      });

      expect(entry.id).toBe('winner-1');
      expect(entry.name).toBe('Top Winner');
      expect(entry.prize_description).toBe('Grand Prize');
      // Avatar should still have default
      expect(entry.avatar_url).toBe('https://example.com/avatar.jpg');
    });
  });

  describe('createMockLeaderboard', () => {
    it('creates specified number of entries', () => {
      const leaderboard = createMockLeaderboard(5);
      expect(leaderboard).toHaveLength(5);
    });

    it('assigns unique IDs', () => {
      const leaderboard = createMockLeaderboard(3);
      const ids = leaderboard.map((e) => e.id);
      expect(ids).toEqual(['user-1', 'user-2', 'user-3']);
    });

    it('assigns sequential names', () => {
      const leaderboard = createMockLeaderboard(3);
      const names = leaderboard.map((e) => e.name);
      expect(names).toEqual(['User 1', 'User 2', 'User 3']);
    });

    it('assigns sequential prize descriptions', () => {
      const leaderboard = createMockLeaderboard(3);
      const prizes = leaderboard.map((e) => e.prize_description);
      expect(prizes).toEqual(['Prize 1', 'Prize 2', 'Prize 3']);
    });

    it('creates empty list for zero count', () => {
      const leaderboard = createMockLeaderboard(0);
      expect(leaderboard).toHaveLength(0);
    });
  });

  describe('createMockSpotlightNode', () => {
    it('creates default spotlight node', () => {
      const node = createMockSpotlightNode();

      expect(node.id).toBe('spotlight-1');
      expect(node.name).toBe('John Doe');
      expect(node.kudo_count).toBe(50);
    });

    it('allows overriding specific fields', () => {
      const node = createMockSpotlightNode({
        id: 'star-1',
        name: 'Star Employee',
        kudo_count: 100,
      });

      expect(node.id).toBe('star-1');
      expect(node.name).toBe('Star Employee');
      expect(node.kudo_count).toBe(100);
    });
  });

  describe('createMockSpotlightData', () => {
    it('creates specified number of nodes', () => {
      const data = createMockSpotlightData(5);
      expect(data).toHaveLength(5);
    });

    it('assigns unique IDs', () => {
      const data = createMockSpotlightData(3);
      const ids = data.map((n) => n.id);
      expect(ids).toEqual(['spotlight-1', 'spotlight-2', 'spotlight-3']);
    });

    it('assigns sequential names', () => {
      const data = createMockSpotlightData(3);
      const names = data.map((n) => n.name);
      expect(names).toEqual(['Person 1', 'Person 2', 'Person 3']);
    });

    it('assigns random kudo counts between 1 and 100', () => {
      const data = createMockSpotlightData(10);
      data.forEach((node) => {
        expect(node.kudo_count).toBeGreaterThanOrEqual(1);
        expect(node.kudo_count).toBeLessThanOrEqual(100);
      });
    });

    it('creates empty list for zero count', () => {
      const data = createMockSpotlightData(0);
      expect(data).toHaveLength(0);
    });
  });
});
