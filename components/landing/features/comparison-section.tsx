"use client";

const TRADITIONAL_CHAOS = [
  "50+ Active Tasks accumulating indefinitely",
  "Endless nested sub-categories and tags",
  "Constant reactive replanning and backlog guilt",
  "Growing item queues that compound daily",
  "Inevitable mental overload before work begins",
];

const TOM_CONTROL = [
  "Inbox-first rapid capture processing",
  "Strictly limited dynamic daily focus targets",
  "Clear operational priorities without alignment lag",
  "Automatic midnight backlog reset sweeps",
  "Absolute cognitive clarity and morning focus",
];

export function ComparisonSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
          A Better Way to Execute
        </h2>
        <p className="text-xs sm:text-sm font-medium text-stone-500">
          How Todo Master re-engineers your relationship with task management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-8 sm:p-10 space-y-6">
          <h4 className="text-base font-black text-stone-400 uppercase tracking-wider border-b border-stone-100 pb-3">
            Traditional Todo Apps
          </h4>
          <ul className="space-y-4">
            {TRADITIONAL_CHAOS.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm font-semibold text-stone-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-2 border-[#2D8A78] rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
          <h4 className="text-base font-black text-[#2D8A78] uppercase tracking-wider border-b border-stone-100 pb-3 flex items-center justify-between">
            Todo Master
            <span className="text-[9px] font-black bg-[#2D8A78]/10 px-2 py-0.5 rounded-md border border-[#8FB8A8]/20 text-[#2D8A78]">
              PROVEN METHOD
            </span>
          </h4>
          <ul className="space-y-4">
            {TOM_CONTROL.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm font-black text-stone-800"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D8A78] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
