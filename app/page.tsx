"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  {
    label: "Configure Edge functions for low-latency routing",
    time: "8:30 PM",
  },
];

export default function Home() {
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
        setVisibleTasks((prev) => {
          const updated = [...prev];
          const nextToComplete = updated.find((t) => !t.checked);
          if (nextToComplete) nextToComplete.checked = true;
          return updated;
        });
        setCycleStep(1);
      } else {
        setVisibleTasks((prev) => {
          const shifted = prev.slice(1);
          const upcomingTask = TASK_POOL[poolIndex];
          shifted.push({
            id: Date.now(),
            label: upcomingTask.label,
            time: upcomingTask.time,
            checked: false,
          });
          return shifted;
        });
        setPoolIndex((prev) => (prev + 1) % TASK_POOL.length);
        setCycleStep(0);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [cycleStep, poolIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:h-screen bg-linear-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-4 sm:p-8 overflow-y-auto lg:overflow-hidden relative">
      <div className="absolute top-12 left-12 w-72 h-72 bg-[#2D8A78]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-[#8E5A5A]/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl flex flex-col items-center justify-center text-center relative z-10 h-auto lg:h-full lg:max-h-[95vh]  lg:justify-between gap-6 lg:gap-0 py-6 lg:py-6"
      >
        {/* Typography Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-5xl font-black text-[#FCFAEF] tracking-tight max-w-4xl leading-[1.1] mb-2 text-balance">
            Master Your Daily Workflow <br className="hidden sm:inline" />
            with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2D8A78] to-[#4EAA98]">
              Todo Master
            </span>
          </h1>

          <p className="text-xs sm:text-base text-stone-300 font-medium max-w-2xl mb-4 leading-relaxed text-balance">
            A minimalist, lightning-fast task management platform{" "}
            <br className="hidden sm:inline" />
            engineered to eliminate cognitive clutter and maximize execution.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-4 sm:mb-6">
            <Button
              asChild
              className="w-full sm:w-auto h-11 px-6 bg-[#2D8A78] hover:bg-[#236B5D] text-white font-bold rounded-xl shadow-lg transition-all duration-200 group text-sm"
            >
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2"
              >
                Sign In & Start Managing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto h-11 px-6 border-stone-400/40 text-[#FCFAEF] bg-transparent hover:bg-white/5 hover:text-white rounded-xl text-sm font-semibold"
            >
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="w-full max-w-xl bg-[#FCFAEF]/10 border border-white/10 backdrop-blur-md rounded-xl p-2 mb-4 sm:mb-6 shadow-2xl text-left">
          <div className="bg-[#FCFAEF] rounded-lg p-3 shadow-inner text-stone-800 space-y-2.5 overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-[#2D8A78]" />
                <span className="text-[10px] font-bold text-stone-400 ml-1 tracking-tight">
                  Workspace / Inbox
                </span>
              </div>
              <div className="w-14 h-3 bg-stone-200/80 rounded" />
            </div>

            <div className="relative flex flex-col gap-2 h-34 overflow-hidden">
              <AnimatePresence initial={false}>
                {visibleTasks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 38 }}
                    className="flex items-center gap-3 p-2 bg-stone-50 border border-stone-200/50 rounded-lg w-full h-9.5 overflow-hidden shrink-0"
                  >
                    <motion.div
                      animate={{
                        scale: item.checked ? [1, 1.15, 1] : 1,
                        backgroundColor: item.checked ? "#2D8A78" : "#ffffff",
                      }}
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                        item.checked
                          ? "border-[#2D8A78] text-white"
                          : "border-stone-300"
                      }`}
                    >
                      {item.checked && (
                        <CheckCircle2 className="w-2.5 h-2.5 stroke-[3.5]" />
                      )}
                    </motion.div>

                    <span
                      className={`text-[11px] sm:text-xs font-semibold tracking-tight truncate max-w-40 sm:max-w-xs md:max-w-md transition-all duration-300 ${
                        item.checked
                          ? "line-through text-stone-400"
                          : "text-stone-700"
                      }`}
                    >
                      {item.label}
                    </span>

                    <span className="text-[9px] font-bold text-stone-400 ml-auto bg-stone-200/40 px-1.5 py-0.5 rounded shrink-0">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
          {[
            {
              title: "Task Architecture",
              desc: "Organize workflows cleanly into hierarchical intuitive tracks.",
              icon: CheckCircle2,
            },
            {
              title: "Secure Handshake",
              desc: "Complete encryption pipelines managed directly through Clerk.",
              icon: Shield,
            },
            {
              title: "Fluid Performance",
              desc: "Zero static lag. Optimized bundle states powered by Next.js.",
              icon: Sparkles,
            },
          ].map((feature, idx) => (
            <div key={idx}>
              <Card className="bg-[#FCFAEF] border border-stone-200 shadow-xl rounded-xl p-3 sm:p-4 h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="text-[#2D8A78] mb-2 bg-[#2D8A78]/10 w-8 h-8 flex items-center justify-center rounded-lg">
                    <feature.icon className="w-4 h-4 stroke-2" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] text-stone-600 font-medium leading-normal">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
