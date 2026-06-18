"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const TASK_POOL = [
  {
    label: "Prioritize architectural system design documentation",
    time: "10:00 AM",
  },
  {
    label: "Review production-ready MERN folder layout structure",
    time: "2:30 PM",
  },
  { label: "Refactor validation middleware pipelines", time: "4:00 PM" },
  { label: "Optimize MongoDB indexing and schema queries", time: "5:15 PM" },
  { label: "Audit security headers and Clerk auth webhooks", time: "6:45 PM" },
];

export function HeroSection() {
  const [visibleTasks, setVisibleTasks] = useState([
    {
      id: 1,
      label: TASK_POOL[0].label,
      time: TASK_POOL[0].time,
      checked: true,
    },
    {
      id: 2,
      label: TASK_POOL[1].label,
      time: TASK_POOL[1].time,
      checked: false,
    },
    {
      id: 3,
      label: TASK_POOL[2].label,
      time: TASK_POOL[2].time,
      checked: false,
    },
  ]);
  const [poolIndex, setPoolIndex] = useState(3);
  const [cycleStep, setCycleStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (cycleStep === 0) {
        setVisibleTasks((prev) =>
          prev.map((t, i) =>
            i === prev.findIndex((x) => !x.checked)
              ? { ...t, checked: true }
              : t,
          ),
        );
        setCycleStep(1);
      } else {
        setVisibleTasks((prev) => [
          ...prev.slice(1),
          {
            id: Date.now(),
            label: TASK_POOL[poolIndex].label,
            time: TASK_POOL[poolIndex].time,
            checked: false,
          },
        ]);
        setPoolIndex((prev) => (prev + 1) % TASK_POOL.length);
        setCycleStep(0);
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [cycleStep, poolIndex]);

  return (
    <div className="w-full bg-linear-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-6 sm:p-12 md:p-24 relative overflow-hidden flex flex-col items-center justify-center min-h-screen shrink-0">
      <div className="absolute top-12 left-12 w-96 h-96 bg-[#2D8A78]/10 rounded-full blur-[120px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl flex flex-col items-center justify-center text-center relative z-10 space-y-10"
      >
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-[#FCFAEF] tracking-tight max-w-4xl leading-[1.05] text-balance">
            Master Your Daily Workflow with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2D8A78] to-[#4EAA98]">
              Todo Master
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed text-balance">
            A minimalist, lightning-fast task management platform engineered to
            eliminate cognitive clutter and maximize execution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto pt-2">
            <Button
              asChild
              className="w-full sm:w-auto h-12 px-8 bg-[#2D8A78] hover:bg-[#236B5D] text-white font-bold rounded-xl shadow-xl text-sm group transition-all"
            >
              <Link href="/sign-in" className="flex items-center gap-2">
                Sign In & Start Managing{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 border-stone-400/40 text-[#FCFAEF] bg-transparent hover:bg-white/5 rounded-xl text-sm font-semibold"
            >
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-[#FCFAEF]/10 border border-white/10 backdrop-blur-md rounded-2xl p-3 shadow-2xl text-left">
          <div className="bg-[#FCFAEF] rounded-xl p-4 shadow-inner text-stone-800 space-y-3 overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D8A78]" />
                <span className="text-[11px] font-bold text-stone-400 ml-1 tracking-tight">
                  Workspace / Inbox
                </span>
              </div>
              <div className="w-16 h-3 bg-stone-200 rounded" />
            </div>
            <div className="relative flex flex-col gap-2.5 h-40 overflow-hidden">
              <AnimatePresence initial={false}>
                {visibleTasks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 450, damping: 38 }}
                    className="flex items-center gap-3 px-3 py-2 bg-stone-50 border border-stone-200/50 rounded-xl w-full h-11 shrink-0"
                  >
                    <motion.div
                      animate={{
                        scale: item.checked ? [1, 1.15, 1] : 1,
                        backgroundColor: item.checked ? "#2D8A78" : "#ffffff",
                      }}
                      className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${item.checked ? "border-[#2D8A78] text-white" : "border-stone-300"}`}
                    >
                      {item.checked && (
                        <CheckCircle2 className="w-3 h-3 stroke-[3.5]" />
                      )}
                    </motion.div>
                    <span
                      className={`text-xs font-semibold tracking-tight truncate max-w-xs sm:max-w-md transition-all duration-300 ${item.checked ? "line-through text-stone-400" : "text-stone-700"}`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 ml-auto bg-stone-200/40 px-2 py-0.5 rounded-md shrink-0">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
