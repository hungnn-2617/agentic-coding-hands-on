import { CloseIcon } from '@/components/icons/close-icon';
import { SendIcon } from '@/components/icons/send-icon';

interface ActionBarProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isDisabled: boolean;
  labels: {
    cancel: string;
    submit: string;
    submitting: string;
  };
}

export function ActionBar({ onCancel, onSubmit, isSubmitting, isDisabled, labels }: ActionBarProps) {
  return (
    <div className="flex items-start gap-6 w-full">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-2 px-10 py-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] hover:bg-[rgba(255,234,158,0.20)] active:bg-[rgba(255,234,158,0.30)] transition-colors focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 self-stretch"
      >
        {labels.cancel}
        <CloseIcon className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        className="flex-1 flex items-center justify-center gap-2 h-[60px] rounded-lg text-[22px] font-bold leading-7 text-[#00101A] transition-all focus:outline-2 focus:outline-[#998C5F] focus:outline-offset-2 disabled:bg-[#D4CCA8] disabled:text-[#999] disabled:cursor-not-allowed enabled:bg-[#FFEA9E] enabled:hover:bg-[#F5E088] enabled:hover:-translate-y-px"
      >
        {isSubmitting ? labels.submitting : labels.submit}
        {!isSubmitting && <SendIcon className="w-6 h-6" />}
        {isSubmitting && (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
            <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
          </svg>
        )}
      </button>
    </div>
  );
}
