'use client';

import { useState, useRef, useEffect } from 'react';
import { FlagVnIcon, FlagEnIcon, ChevronDownIcon } from '@/components/icons';

type Locale = 'vi' | 'en';

interface Language {
  code: Locale;
  label: string;
  Flag: typeof FlagVnIcon;
}

const languages: Language[] = [
  { code: 'vi', label: 'VN', Flag: FlagVnIcon },
  { code: 'en', label: 'EN', Flag: FlagEnIcon },
];

/**
 * Language selector dropdown component.
 * Allows switching between Vietnamese and English.
 */
export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('vi');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)!;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  }

  function handleSelect(locale: Locale) {
    setCurrentLocale(locale);
    setIsOpen(false);

    // Store preference in cookie for persistence
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-0.5 px-4 py-2 rounded
          font-bold text-base text-white
          cursor-pointer
          transition-colors duration-150
          hover:bg-white/10
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          ${isOpen ? 'bg-white/10' : ''}
        `}
      >
        <currentLanguage.Flag className="w-5 h-5" />
        <span className="ml-1">{currentLanguage.label}</span>
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className={`
            absolute right-0 mt-2 min-w-[100px]
            bg-[#0B0F12] border border-white/10 rounded-lg
            shadow-lg overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-150
          `}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              role="option"
              aria-selected={language.code === currentLocale}
              onClick={() => handleSelect(language.code)}
              className={`
                w-full flex items-center gap-2 px-4 py-3
                font-bold text-base text-white
                cursor-pointer
                transition-colors duration-150
                hover:bg-white/10
                ${language.code === currentLocale ? 'bg-white/5' : ''}
              `}
            >
              <language.Flag className="w-5 h-5" />
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
