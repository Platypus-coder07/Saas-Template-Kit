"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Minus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMPARISON_ROWS = [
  { name: "Inbox Bucket", free: "Yes", pro: "Yes", special: false },
  { name: "Today's Focus", free: "3 Slots", pro: "Unlimited", special: true },
  { name: "Backlog Stream", free: "Yes", pro: "Yes", special: false },
  { name: "Daily Reset", free: "Yes", pro: "Yes", special: false },
  {
    name: "Active Task Limit",
    free: "50 Tasks",
    pro: "Unlimited",
    special: true,
  },
  { name: "AI Task Breakdown", free: "No", pro: "Yes", special: false },
  { name: "Smart Prioritization", free: "No", pro: "Yes", special: false },
];

const PRO_PLAN_FEATURES = [
  "Unlimited Tasks architecture",
  "Gemini AI Task Breakdown",
  "Daily Execution Reports",
  "Custom Focus Sessions",
  "Premium Minimalist Themes",
  "Future AI Features inclusion",
  "Early Access to new modules",
];

export function PricingSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#F4F1E8] text-[#161616] font-sans antialiased py-20 space-y-20">
      <header className="max-w-4xl mx-auto text-center px-4 space-y-3">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
          Invest in Focus. Not More Complexity.
        </h2>
        <p className="text-sm sm:text-base font-bold text-stone-500 max-w-lg mx-auto">
          Start for free. Upgrade when execution becomes a habit.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[40px] bg-white/40 border border-stone-200/60 p-6 sm:p-10 flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-5xl mx-auto">
          <motion.div
            whileHover={{ y: -4, borderColor: "rgba(120, 113, 108, 0.3)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white border border-stone-200/80 rounded-2xl p-8 sm:p-10 space-y-8 flex flex-col justify-between max-w-[420px] w-full min-h-[580px] shadow-2xs"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-black text-stone-900">Free</h3>
                <p className="text-xs font-medium text-stone-400">
                  Perfect for building better execution habits.
                </p>
              </div>
              <div className="text-6xl sm:text-7xl font-black text-stone-900 tracking-tight">
                $0
              </div>
              <p className="text-[11px] font-medium text-stone-400 italic">
                Experience the system engine foundation.
              </p>

              <ul className="space-y-3 pt-4 border-t border-stone-100">
                {[
                  "Inbox Bucket capture lanes",
                  "3 Today's Focus slots",
                  "Midnight Daily Reset",
                  "Basic progress metric tracking",
                  "Up to 50 active tasks total",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-stone-600"
                  >
                    <Check className="w-3.5 h-3.5 text-stone-400 shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full h-12 border-stone-300 rounded-xl text-xs font-bold transition-all active:scale-[0.985]"
            >
              <a href="/sign-in">Start Free</a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.06), 0 8px 10px -6px rgb(0 0 0 / 0.06)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white border-2 border-[#2D8A78] rounded-2xl p-8 sm:p-10 space-y-8 flex flex-col justify-between max-w-[420px] w-full min-h-[580px] relative shadow-lg"
          >
            <div className="absolute -top-3 left-6 bg-[#2D8A78] text-white text-[9px] font-black tracking-widest uppercase px-3 py-0.5 rounded-full border border-[#4EAA98]/40 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-current text-amber-400" />{" "}
              Best For Serious Execution
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-black text-stone-900">Pro</h3>
                <p className="text-xs font-medium text-stone-500">
                  The complete uncompromised Todo Master experience.
                </p>
              </div>
              <div>
                <div className="text-6xl sm:text-7xl font-black text-stone-900 tracking-tight">
                  $9.99
                  <span className="text-xs font-bold text-stone-400">/mo</span>
                </div>
                <span className="text-[11px] font-bold text-[#2D8A78] block mt-1 bg-[#2D8A78]/5 w-max px-2 py-0.5 rounded border border-[#2D8A78]/10">
                  Less than $0.34/day
                </span>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-stone-100 max-h-[260px] overflow-y-auto pr-1">
                {PRO_PLAN_FEATURES.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-bold text-stone-800"
                  >
                    <Check className="w-3.5 h-3.5 text-[#2D8A78] stroke-[3] shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              asChild
              className="w-full h-12 bg-[#2D8A78] hover:bg-[#236B5D] text-white rounded-xl text-xs font-black uppercase tracking-wide transition-all active:scale-[0.985]"
            >
              <a href="/dashboard/upgrade">Upgrade to Pro</a>
            </Button>
          </motion.div>
        </div>
      </div>


      <section className="max-w-3xl mx-auto px-4 pt-4 space-y-6">
        <div className="text-center space-y-1.5 py-2 border-b border-stone-200/50 pb-6">
          <p className="text-lg font-black text-stone-700">
            Join people who want{" "}
            <span className="text-[#2D8A78]">
              less planning and more execution.
            </span>
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            {
              q: "Why is there a task limit on the Free plan?",
              a: "The Free plan is designed to help users experience the core Todo Master execution loop before expanding their operations into an unconstrained layout.",
            },
            {
              q: "Can I upgrade later?",
              a: "Yes. Start with the Free plan and upgrade whenever you need more operational power and advanced workflow flexibility.",
            },
            {
              q: "Do I lose my data if I downgrade?",
              a: "No. Your data remains perfectly safe and accessible. Some advanced premium feature scopes may become temporarily locked until you reactivate your upgrade pipeline again.",
            },
            {
              q: "Can I cancel my subscription anytime?",
              a: "Yes. You maintain absolute control over your billing cycle. You can cancel with a single click and retain access until the current period terminates.",
            },
            {
              q: "Will future AI features be included in Pro?",
              a: "Yes. Pro subscribers receive all upcoming AI-powered execution modules directly as they are compiled to production.",
            },
          ].map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-3xs hover:border-stone-300/80 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer group select-none"
                >
                  <h4 className="text-xs sm:text-sm font-black text-stone-800 transition-colors group-hover:text-stone-900">
                    {faq.q}
                  </h4>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-stone-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-4 text-xs font-medium text-stone-500 border-t border-stone-50 pt-2 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
