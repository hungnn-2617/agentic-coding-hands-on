'use client';

import { useState, useRef } from 'react';
import { ChevronDownIcon } from '@/components/icons/chevron-down-icon';
import { useClickOutside } from '@/hooks/use-click-outside';

interface FilterDropdownButtonProps {
  label: string;
  options: { id: string | number; name: string }[];
  selectedValue: string | null;
  onSelect: (value: string | null) => void;
}

export function FilterDropdownButton({
  label,
  options,
  selectedValue,
  onSelect,
}: FilterDropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  const isActive = selectedValue !== null;
  const displayLabel = isActive
    ? options.find((o) => String(o.id) === selectedValue)?.name ?? label
    : label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-9 items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold leading-5 tracking-[0.1px] cursor-pointer transition-colors duration-200 ${
          isActive
            ? 'bg-[var(--color-border-highlight)] text-[#00101A] border-[var(--color-border-highlight)]'
            : 'bg-white/10 text-white border-[var(--color-border)] hover:bg-white/20'
        }`}
      >
        <span className="truncate max-w-[120px]">{displayLabel}</span>
        <ChevronDownIcon
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] max-h-[300px] overflow-y-auto bg-[#00070C] border border-[var(--color-border)] rounded-lg shadow-lg z-50 opacity-100 translate-y-0 transition-all duration-200">
          {isActive && (
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm font-bold text-[#999] hover:bg-white/10 cursor-pointer"
            >
              Clear filter
            </button>
          )}
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onSelect(String(option.id) === selectedValue ? null : String(option.id));
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm font-bold cursor-pointer hover:bg-white/10 ${
                String(option.id) === selectedValue
                  ? 'text-[var(--color-border-highlight)]'
                  : 'text-white'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
