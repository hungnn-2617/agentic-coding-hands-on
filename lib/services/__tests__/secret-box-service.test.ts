import { describe, it, expect } from 'vitest';
import { selectRandomBadge, SecretBoxError, SECRET_BOX_ERROR_CODES } from '../secret-box-service';
import type { Badge } from '@/types/secret-box';

describe('secret-box-service', () => {
  describe('selectRandomBadge', () => {
    const mockBadges: Badge[] = [
      {
        id: 1,
        name: 'Stay Gold',
        description: 'A golden badge',
        image_url: '/badges/stay-gold.png',
        drop_rate: 30,
        created_at: '2026-01-01',
      },
      {
        id: 2,
        name: 'Flow to Horizon',
        description: 'A horizon badge',
        image_url: '/badges/flow.png',
        drop_rate: 25,
        created_at: '2026-01-01',
      },
      {
        id: 3,
        name: 'Root Further',
        description: 'A rare badge',
        image_url: '/badges/root.png',
        drop_rate: 5,
        created_at: '2026-01-01',
      },
    ];

    it('throws error when badges array is empty', () => {
      expect(() => selectRandomBadge([])).toThrow(SecretBoxError);
      expect(() => selectRandomBadge([])).toThrow('No badges available');
    });

    it('returns a badge from the array', () => {
      const badge = selectRandomBadge(mockBadges);
      expect(mockBadges).toContainEqual(badge);
    });

    it('returns the only badge when array has one element', () => {
      const singleBadge: Badge[] = [mockBadges[0]];
      const badge = selectRandomBadge(singleBadge);
      expect(badge).toEqual(mockBadges[0]);
    });

    it('respects probability weights over many iterations', () => {
      // Run 1000 iterations and check distribution roughly matches weights
      const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        const badge = selectRandomBadge(mockBadges);
        counts[badge.id]++;
      }

      // With weights 30, 25, 5 (total 60), expected ratios:
      // Badge 1: 30/60 = 50%
      // Badge 2: 25/60 = ~41.7%
      // Badge 3: 5/60 = ~8.3%

      // Allow 15% tolerance for randomness
      const tolerance = 0.15;

      expect(counts[1] / iterations).toBeGreaterThan(0.5 - tolerance);
      expect(counts[1] / iterations).toBeLessThan(0.5 + tolerance);

      expect(counts[2] / iterations).toBeGreaterThan(0.417 - tolerance);
      expect(counts[2] / iterations).toBeLessThan(0.417 + tolerance);

      // Badge 3 should be rare (5/60 = ~8.3%)
      expect(counts[3] / iterations).toBeLessThan(0.25); // Should be much less than 25%
    });

    it('handles badges with zero drop rate', () => {
      const badgesWithZero: Badge[] = [
        { ...mockBadges[0], drop_rate: 0 },
        { ...mockBadges[1], drop_rate: 100 },
      ];

      // Run 100 iterations - badge with 100% rate should always win
      for (let i = 0; i < 100; i++) {
        const badge = selectRandomBadge(badgesWithZero);
        expect(badge.id).toBe(2); // Should always be badge 2
      }
    });

    it('handles badges with equal drop rates', () => {
      const equalBadges: Badge[] = [
        { ...mockBadges[0], drop_rate: 50 },
        { ...mockBadges[1], drop_rate: 50 },
      ];

      const counts: Record<number, number> = { 1: 0, 2: 0 };
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        const badge = selectRandomBadge(equalBadges);
        counts[badge.id]++;
      }

      // Both should be around 50% with some tolerance
      expect(counts[1] / iterations).toBeGreaterThan(0.35);
      expect(counts[1] / iterations).toBeLessThan(0.65);
      expect(counts[2] / iterations).toBeGreaterThan(0.35);
      expect(counts[2] / iterations).toBeLessThan(0.65);
    });
  });

  describe('SecretBoxError', () => {
    it('creates error with correct message and code', () => {
      const error = new SecretBoxError('Test error', SECRET_BOX_ERROR_CODES.NO_BOXES);

      expect(error.message).toBe('Test error');
      expect(error.code).toBe('NO_BOXES');
      expect(error.name).toBe('SecretBoxError');
    });

    it('is instanceof Error', () => {
      const error = new SecretBoxError('Test', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('SECRET_BOX_ERROR_CODES', () => {
    it('contains expected error codes', () => {
      expect(SECRET_BOX_ERROR_CODES.UNAUTHORIZED).toBe('UNAUTHORIZED');
      expect(SECRET_BOX_ERROR_CODES.NO_BOXES).toBe('NO_BOXES');
      expect(SECRET_BOX_ERROR_CODES.RATE_LIMITED).toBe('RATE_LIMITED');
      expect(SECRET_BOX_ERROR_CODES.SERVER_ERROR).toBe('SERVER_ERROR');
    });
  });
});
