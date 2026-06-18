"use client";

import {
  Brain,
  Inbox,
  Target,
  Zap,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Lottie from "lottie-react"; 
import workflowAnimationData from "@/public/animations/workflow.json";

const STEPS = [
  { step: "Thought", desc: "An idea appears.", icon: Brain },
  { step: "Inbox", desc: "Captured instantly.", icon: Inbox },
  { step: "Focus", desc: "Choose today's priorities.", icon: Target },
  { step: "Execute", desc: "Work without friction.", icon: Zap },
  { step: "Complete", desc: "Track progress.", icon: CheckCircle2 },
  { step: "Reset", desc: "Start tomorrow clean.", icon: RefreshCw },
];

export function WorkflowSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-20">
      {/* Editorial Headings */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
          How Work Flows Through Todo Master
        </h2>
        <p className="text-sm sm:text-base font-medium text-stone-500 leading-relaxed">
          A simple execution loop designed to eliminate mental clutter and
          increase meaningful progress.
        </p>
      </div>

      {/* Two-Column Side-by-Side Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4">
        {/* LEFT COLUMN: RAW NATIVE JSON LOTTIE CANVAS */}
        <div className="lg:col-span-7 w-full aspect-video max-w-xl mx-auto flex items-center justify-center overflow-hidden">
          <Lottie
            animationData={workflowAnimationData}
            loop={true}
            className="w-full h-full object-contain scale-130"
          />
        </div>

        {/* RIGHT COLUMN: PROCESS TIMELINE STEPS LIST */}
        <div className="lg:col-span-5 relative border-l border-stone-200/80 pl-6 ml-2 space-y-6">
          {STEPS.map((node, idx) => (
            <div key={idx} className="relative group flex items-start gap-4">
              {/* Timeline Connection Micro Node Anchors */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-md border border-stone-300 bg-[#F4F1E8] flex items-center justify-center group-hover:border-[#2D8A78] group-hover:bg-[#8FB8A8]/10 transition-colors duration-150">
                <div className="w-1.5 h-1.5 rounded-xs bg-stone-300 group-hover:bg-[#2D8A78] transition-colors" />
              </div>

              {/* Icon Frame */}
              <div className="w-8 h-8 bg-white border border-stone-200 rounded-lg flex items-center justify-center text-stone-500 group-hover:text-[#2D8A78] group-hover:border-[#8FB8A8]/40 transition-all shadow-3xs shrink-0">
                <node.icon className="w-4 h-4 stroke-[2]" />
              </div>

              {/* Step Copy Block */}
              <div className="space-y-0.5">
                <h4 className="text-sm font-black text-stone-900 tracking-tight flex items-center gap-2">
                  {node.step}
                  <span className="text-[9px] font-bold text-stone-300">
                    0{idx + 1}
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 font-medium leading-normal">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
