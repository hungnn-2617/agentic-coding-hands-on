function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function EventInfo() {
  const eventDate = process.env.NEXT_PUBLIC_EVENT_START_DATE ?? '';
  const venue = process.env.NEXT_PUBLIC_EVENT_VENUE ?? '';
  const livestreamNote = process.env.NEXT_PUBLIC_EVENT_LIVESTREAM_NOTE ?? '';

  const formattedDate = formatDate(eventDate);

  return (
    <div className="flex flex-col gap-2 max-w-[637px]">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-[60px]">
        {formattedDate && (
          <div className="flex items-baseline gap-2">
            <span className="text-white text-base font-bold leading-6 tracking-[0.15px]">
              Thời gian:
            </span>
            <span className="text-[#FFEA9E] text-2xl font-bold leading-8">
              {formattedDate}
            </span>
          </div>
        )}
        {venue && (
          <div className="flex items-baseline gap-2">
            <span className="text-white text-base font-bold leading-6 tracking-[0.15px]">
              Địa điểm:
            </span>
            <span className="text-[#FFEA9E] text-2xl font-bold leading-8">
              {venue}
            </span>
          </div>
        )}
      </div>
      {livestreamNote && (
        <p className="text-white text-base font-bold leading-6 tracking-[0.5px]">
          {livestreamNote}
        </p>
      )}
    </div>
  );
}
