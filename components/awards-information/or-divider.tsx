interface OrDividerProps {
  text: string;
}

export function OrDivider({ text }: OrDividerProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-px bg-[#2E3940]" />
      <span className="text-sm font-bold text-[#2E3940] shrink-0">
        {text}
      </span>
      <div className="flex-1 h-px bg-[#2E3940]" />
    </div>
  );
}
