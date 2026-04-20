'use client';

import { useState, useRef, useEffect } from 'react';
import { FieldLabel } from './field-label';
import { PlusIcon } from '@/components/icons/plus-icon';
import { CloseIcon } from '@/components/icons/close-icon';
import { KUDO_MAX_HASHTAGS } from '@/types/kudo';

interface HashtagFieldProps {
  hashtags: string[];
  options: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  onFetchOptions: () => void;
  onCreateNew: (name: string) => Promise<void>;
  error?: string;
  labels: {
    label: string;
    add: string;
    max: string;
    createNew: string;
  };
}

export function HashtagField({
  hashtags, options, onAdd, onRemove, onFetchOptions, onCreateNew, error, labels,
}: HashtagFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(
    (o) => o.toLowerCase().includes(filter.toLowerCase()) && !hashtags.includes(o)
  );
  const canCreate = filter.trim() && !options.some((o) => o.toLowerCase() === filter.trim().toLowerCase()) && !hashtags.includes(filter.trim());
  const atLimit = hashtags.length >= KUDO_MAX_HASHTAGS;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFilter('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleOpen() {
    if (atLimit) return;
    onFetchOptions();
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleSelect(tag: string) {
    onAdd(tag);
    setFilter('');
    if (hashtags.length + 1 >= KUDO_MAX_HASHTAGS) setIsOpen(false);
  }

  async function handleCreate() {
    const name = filter.trim().toLowerCase();
    if (!name) return;
    await onCreateNew(name);
    onAdd(name);
    setFilter('');
    if (hashtags.length + 1 >= KUDO_MAX_HASHTAGS) setIsOpen(false);
  }

  return (
    <div className="flex items-start gap-4 w-full max-sm:flex-col max-sm:gap-2">
      <FieldLabel label={labels.label} required />
      <div ref={containerRef} className="relative flex flex-wrap items-center gap-2">
        {/* Selected chips */}
        {hashtags.map((tag) => (
          <span
            key={tag}
            className="h-12 px-2 py-1 bg-[#FFEA9E] border border-[#998C5F] rounded-lg flex items-center gap-2 text-[11px] font-bold tracking-[0.5px] text-[#00101A]"
          >
            #{tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              aria-label={`Remove ${tag}`}
              className="w-4 h-4 flex items-center justify-center hover:opacity-70"
            >
              <CloseIcon className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Add button */}
        {!atLimit && (
          <button
            type="button"
            onClick={handleOpen}
            className="h-12 px-2 py-1 bg-white border border-[#998C5F] rounded-lg flex items-center gap-2 text-[11px] font-bold tracking-[0.5px] text-[#666] cursor-pointer hover:border-[#FFEA9E] transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="flex flex-col items-start">
              <span>{labels.add}</span>
              <span>{labels.max}</span>
            </span>
          </button>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-48 overflow-y-auto bg-white border border-[#998C5F] rounded-lg shadow-lg z-10">
            <input
              ref={inputRef}
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search or create..."
              className="w-full px-3 py-2 border-b border-[#998C5F] text-sm font-bold outline-none placeholder:text-[#666]"
            />
            <ul role="listbox">
              {filtered.map((tag) => (
                <li
                  key={tag}
                  role="option"
                  aria-selected={false}
                  onClick={() => handleSelect(tag)}
                  className="px-3 py-2 text-sm font-bold text-[#00101A] cursor-pointer hover:bg-[rgba(255,234,158,0.1)]"
                >
                  #{tag}
                </li>
              ))}
              {canCreate && (
                <li
                  role="option"
                  aria-selected={false}
                  onClick={handleCreate}
                  className="px-3 py-2 text-sm font-bold text-[#998C5F] cursor-pointer hover:bg-[rgba(255,234,158,0.1)]"
                >
                  {labels.createNew.replace('{input}', filter.trim())}
                </li>
              )}
              {filtered.length === 0 && !canCreate && (
                <li className="px-3 py-2 text-sm text-[#666] text-center">No options</li>
              )}
            </ul>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm font-bold text-[#CF1322] w-full mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
