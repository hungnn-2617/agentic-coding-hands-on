export default function MainLoading() {
  return (
    <div className="min-h-screen bg-[#00101A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#FFEA9E] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm">Loading...</p>
      </div>
    </div>
  );
}
