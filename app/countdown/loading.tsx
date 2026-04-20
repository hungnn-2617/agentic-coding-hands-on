export default function CountdownLoading() {
  return (
    <div className="bg-[#00101A] min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Title placeholder */}
        <div className="w-64 h-8 lg:w-96 lg:h-12 bg-white/10 rounded-lg animate-pulse" />

        {/* Digit cards placeholder */}
        <div className="flex flex-row items-center gap-4 sm:gap-7 md:gap-10 lg:gap-15">
          {[0, 1, 2].map((group) => (
            <div key={group} className="flex flex-col items-start gap-2 lg:gap-[21px]">
              <div className="flex flex-row gap-2 lg:gap-[21px]">
                <div className="w-12 h-[77px] lg:w-[77px] lg:h-[123px] bg-white/10 rounded-xl animate-pulse" />
                <div className="w-12 h-[77px] lg:w-[77px] lg:h-[123px] bg-white/10 rounded-xl animate-pulse" />
              </div>
              <div className="w-16 h-5 lg:w-24 lg:h-8 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
