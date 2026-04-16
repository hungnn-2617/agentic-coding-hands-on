/**
 * Footer component with copyright text.
 * Fixed position at bottom with border-top.
 */
export function Footer() {
  return (
    <footer
      className="fixed bottom-0 z-50 w-full px-4 py-6 sm:px-12 lg:px-[90px] lg:py-10 border-t border-[#2E3940] flex items-center justify-center"
      role="contentinfo"
    >
      <span className="font-bold text-sm lg:text-base text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Bản quyền thuộc về Sun* © 2025
      </span>
    </footer>
  );
}
