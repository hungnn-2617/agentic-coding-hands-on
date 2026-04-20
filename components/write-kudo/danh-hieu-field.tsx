import { FieldLabel } from './field-label';
import { KUDO_TITLE_MAX_LENGTH } from '@/types/kudo';

interface DanhHieuFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  labels: {
    label: string;
    placeholder: string;
    helperExample: string;
    helperDisplay: string;
  };
}

export function DanhHieuField({ value, onChange, error, labels }: DanhHieuFieldProps) {
  const inputId = 'kudo-danh-hieu';
  const errorId = 'kudo-danh-hieu-error';
  const helperId = 'kudo-danh-hieu-helper';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-4 w-full">
        <FieldLabel label={labels.label} required htmlFor={inputId} />
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={labels.placeholder}
          maxLength={KUDO_TITLE_MAX_LENGTH}
          aria-required="true"
          aria-describedby={error ? errorId : helperId}
          aria-invalid={!!error}
          className={`flex-1 px-6 py-4 bg-white border rounded-lg text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] placeholder:text-[#666] outline-none transition-colors ${
            error ? 'border-[#CF1322]' : 'border-[#998C5F] focus:border-[#FFEA9E]'
          }`}
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-bold text-[#CF1322] ml-auto">
          {error}
        </p>
      ) : (
        <div id={helperId} className="text-base font-bold leading-6 tracking-[0.15px] text-[#999] ml-auto max-w-[514px]">
          <p>{labels.helperExample}</p>
          <p>{labels.helperDisplay}</p>
        </div>
      )}
    </div>
  );
}
