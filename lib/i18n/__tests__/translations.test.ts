import { describe, it, expect } from 'vitest';
import { vi as viTranslations } from '@/lib/i18n/locales/vi';
import { en as enTranslations } from '@/lib/i18n/locales/en';

describe('Translation completeness', () => {
  const viKeys = Object.keys(viTranslations);
  const enKeys = Object.keys(enTranslations);

  it('every key in vi.ts exists in en.ts', () => {
    const missingInEn = viKeys.filter((key) => !(key in enTranslations));
    expect(missingInEn).toEqual([]);
  });

  it('every key in en.ts exists in vi.ts', () => {
    const missingInVi = enKeys.filter((key) => !(key in viTranslations));
    expect(missingInVi).toEqual([]);
  });

  it('no empty string values in vi.ts', () => {
    const emptyKeys = viKeys.filter((key) => viTranslations[key as keyof typeof viTranslations] === '');
    expect(emptyKeys).toEqual([]);
  });

  it('no empty string values in en.ts', () => {
    const emptyKeys = enKeys.filter((key) => enTranslations[key as keyof typeof enTranslations] === '');
    expect(emptyKeys).toEqual([]);
  });

  it('both locale files have the same number of keys', () => {
    expect(viKeys.length).toBe(enKeys.length);
  });
});
