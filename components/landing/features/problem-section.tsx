"use client";

import { motion } from "framer-motion";
import { ShieldAlert, AlertCircle, Layers } from "lucide-react";

const PROBLEMS = [
  {
    title: "Mental Overload",
    prob: "Traditional apps encourage users to manage dozens of tasks simultaneously, creating constant cognitive pressure.",
    impact: "Mental clutter.",
    icon: ShieldAlert,
  },
  {
    title: "Focus Fragmentation",
    prob: "When everything feels important, nothing gets completed. Users constantly switch contexts during deep sessions.",
    impact: "Reduced execution.",
    icon: AlertCircle,
  },
  {
    title: "Productivity Debt",
    prob: "Incomplete tasks accumulate day after day, making users feel behind before their morning work even starts.",
    impact: "Daily overwhelm.",
    icon: Layers,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProblemSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-[1.1]">
          Most productivity tools create more work than they remove.
        </h2>
        <p className="text-base sm:text-lg font-medium text-stone-500 leading-relaxed max-w-2xl">
          They encourage endless categorization, over-planning, and growing task
          lists. The ultimate result is more organization and less raw
          execution.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4"
      >
        {PROBLEMS.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white border border-stone-200/80 p-8 sm:p-10 rounded-2xl flex flex-col justify-between space-y-8 shadow-3xs hover:border-stone-300 transition-colors duration-200"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-stone-50 text-stone-400 flex items-center justify-center rounded-xl border border-stone-200/40">
                <card.icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-medium">
                {card.prob}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Result:
              </span>
              <span className="text-xs font-black text-[#E26D5A] bg-red-50 px-2.5 py-0.5 rounded-md">
                {card.impact}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
