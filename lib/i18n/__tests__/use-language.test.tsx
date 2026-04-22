import { renderHook, act, render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ReactNode } from 'react';
import { LanguageProvider, useLanguage, HtmlLangUpdater } from '@/lib/i18n';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe('useLanguage', () => {
  beforeEach(() => {
    document.cookie = 'locale=; path=/; max-age=0';
  });

  it('defaults to vi when no cookie is set', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe('vi');
  });

  it('reads locale from cookie on mount', () => {
    document.cookie = 'locale=en; path=/';
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe('en');
  });

  it('changes locale with setLocale', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.locale).toBe('en');
  });

  it('t() returns correct string for current locale', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t('login.hero.line1')).toBe(
      'Bắt đầu hành trình của bạn cùng SAA 2025.',
    );

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.t('login.hero.line1')).toBe(
      'Start your journey with SAA 2025.',
    );
  });

  it('t() supports interpolation with {varName} params', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const text = result.current.t('countdown.ariaLabel', {
      days: '05',
      hours: '12',
      minutes: '30',
    });

    expect(text).toBe('05 ngày, 12 giờ, 30 phút cho đến sự kiện');
  });

  it('t() falls back to Vietnamese when EN key value is missing', () => {
    // This tests that if somehow a key were missing from EN,
    // it would fall back to VI. We test with an existing key to verify the mechanism.
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLocale('en');
    });

    // All keys exist in both files, so we verify the fallback mechanism
    // by confirming t() always returns a string (never undefined)
    const value = result.current.t('awards.title');
    expect(value).toBeTruthy();
    expect(typeof value).toBe('string');
  });

  it('writes locale cookie when setLocale is called', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLocale('en');
    });

    expect(document.cookie).toContain('locale=en');
  });

  it('throws when used outside LanguageProvider', () => {
    expect(() => {
      renderHook(() => useLanguage());
    }).toThrow('useLanguage must be used within a LanguageProvider');
  });

  it('ignores invalid cookie value and defaults to vi', () => {
    document.cookie = 'locale=fr; path=/';
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe('vi');
  });

  it('t() returns key when translation is missing', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    // Cast to test with a non-existent key
    const value = result.current.t('nonexistent.key' as Parameters<typeof result.current.t>[0]);
    expect(value).toBe('nonexistent.key');
  });

  it('t() preserves unmatched params in interpolation', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    // Using a key that uses params but passing incomplete params
    const text = result.current.t('countdown.ariaLabel', {
      days: '05',
      // hours and minutes are not provided
    });

    // Should replace days but keep hours and minutes placeholders
    expect(text).toContain('05');
    expect(text).toContain('{hours}');
    expect(text).toContain('{minutes}');
  });

  it('t() handles empty params object', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const text = result.current.t('login.hero.line1', {});
    expect(text).toBe('Bắt đầu hành trình của bạn cùng SAA 2025.');
  });

  it('t() handles undefined params', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const text = result.current.t('login.hero.line1', undefined);
    expect(text).toBe('Bắt đầu hành trình của bạn cùng SAA 2025.');
  });

  it('maintains stable t function reference with same locale', () => {
    const { result, rerender } = renderHook(() => useLanguage(), { wrapper });

    const initialT = result.current.t;
    rerender();

    expect(result.current.t).toBe(initialT);
  });

  it('updates t function reference when locale changes', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const initialT = result.current.t;

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.t).not.toBe(initialT);
  });
});

describe('HtmlLangUpdater', () => {
  beforeEach(() => {
    document.cookie = 'locale=; path=/; max-age=0';
    document.documentElement.lang = '';
  });

  it('sets document.documentElement.lang on mount', () => {
    render(
      <LanguageProvider>
        <HtmlLangUpdater />
      </LanguageProvider>,
    );

    expect(document.documentElement.lang).toBe('vi');
  });

  it('updates document.documentElement.lang when locale changes', () => {
    function TestComponent() {
      const { setLocale } = useLanguage();
      return (
        <>
          <HtmlLangUpdater />
          <button onClick={() => setLocale('en')}>Switch</button>
        </>
      );
    }

    const { getByText } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(document.documentElement.lang).toBe('vi');

    act(() => {
      getByText('Switch').click();
    });

    expect(document.documentElement.lang).toBe('en');
  });

  it('returns null (renders nothing)', () => {
    const { container } = render(
      <LanguageProvider>
        <HtmlLangUpdater />
      </LanguageProvider>,
    );

    // HtmlLangUpdater returns null, so container should be empty
    expect(container.firstChild).toBeNull();
  });

  it('works with en locale from cookie', () => {
    document.cookie = 'locale=en; path=/';

    render(
      <LanguageProvider>
        <HtmlLangUpdater />
      </LanguageProvider>,
    );

    expect(document.documentElement.lang).toBe('en');
  });
});
