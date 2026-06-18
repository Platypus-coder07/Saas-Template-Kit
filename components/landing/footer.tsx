"use client";

export function Footer() {
  return (
    <footer className="w-full bg-[#F4F1E8] text-[#161616] font-sans antialiased pt-28 pb-8 px-4 sm:px-8 border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* TOP SECTION: UTILITY NAVIGATION WITH ENHANCED TYPOGRAPHY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-stone-200/40">
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-black tracking-tight uppercase text-stone-950">
              Todo Master
            </h3>
            <p className="text-sm sm:text-base font-bold text-stone-500 leading-relaxed max-w-sm">
              Transforming fragmented focus into deep, meaningful execution. No
              filler frameworks. Just raw clarity.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full">
            <div className="space-y-3">
              <h4 className="text-xs font-black tracking-widest uppercase text-stone-400">
                Product
              </h4>
              <ul className="space-y-2 text-sm font-bold text-stone-600">
                <li>
                  <a
                    href="#features"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black tracking-widest uppercase text-stone-400">
                Resources
              </h4>
              <ul className="space-y-2 text-sm font-bold text-stone-600">
                <li>
                  <a
                    href="/docs"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/changelog"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-black tracking-widest uppercase text-stone-400">
                Legal
              </h4>
              <ul className="space-y-2 text-sm font-bold text-stone-600">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-[#2D8A78] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: SINGLE-LINE, Y-STRETCHED WORDMARK */}
        <div className="py-2 select-none tracking-tighter text-center">
          <span className="block font-black uppercase leading-none select-none text-5xl sm:text-[8vw] bg-linear-to-b from-amber-500/50 via-purple-600/30 to-[#2D8A78]/15 bg-clip-text text-transparent transform scale-y-140 origin-center whitespace-nowrap">
            Todo Master
          </span>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-6 border-t border-stone-200/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-black text-stone-400 tracking-widest uppercase">
          <div>&copy; 2026 Todo Master</div>
          <div className="tracking-wide text-stone-400/80">
            Designed for cognitive clarity
          </div>
        </div>
      </div>
    </footer>
  );
}
