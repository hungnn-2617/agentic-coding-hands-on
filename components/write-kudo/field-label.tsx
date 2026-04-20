interface FieldLabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

export function FieldLabel({ label, required = false, htmlFor }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-0.5 text-[22px] font-bold leading-7 text-[#00101A] shrink-0"
    >
      {label}
      {required && (
        <span className="text-[#CF1322] text-base font-bold leading-5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
