'use client';

interface AnonymousCheckboxProps {
  isChecked: boolean;
  anonymousName: string;
  onToggle: (checked: boolean) => void;
  onNameChange: (name: string) => void;
  labels: {
    label: string;
    namePlaceholder: string;
  };
}

export function AnonymousCheckbox({
  isChecked, anonymousName, onToggle, onNameChange, labels,
}: AnonymousCheckboxProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="flex items-center gap-4 cursor-pointer">
        <div className="relative w-6 h-6 shrink-0">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
            className="peer sr-only"
          />
          <div className={`w-6 h-6 rounded border-[1px] transition-colors flex items-center justify-center ${
            isChecked
              ? 'bg-[#FFEA9E] border-[#998C5F]'
              : 'bg-white border-[#999] hover:border-[#998C5F]'
          }`}>
            {isChecked && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7l3.5 3.5L12 4" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className={`text-[22px] font-bold leading-7 transition-colors max-sm:text-base ${
          isChecked ? 'text-[#00101A]' : 'text-[#999]'
        }`}>
          {labels.label}
        </span>
      </label>

      {/* Conditional anonymous name field */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isChecked ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <input
          type="text"
          value={anonymousName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={labels.namePlaceholder}
          tabIndex={isChecked ? 0 : -1}
          aria-hidden={!isChecked}
          className="w-full px-6 py-4 bg-white border border-[#998C5F] rounded-lg text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] placeholder:text-[#666] outline-none focus:border-[#FFEA9E] transition-colors"
        />
      </div>
    </div>
  );
}
