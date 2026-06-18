"use client";

import {
  Sparkles,
  Check,
  ArrowRight,
  Brain,
  Target,
  RefreshCw,
} from "lucide-react";

export function MarketingSections() {
  const handleRedirect = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-full bg-[#F4F1E8] text-[#161616] font-sans antialiased">
      {/* 1. HOW IT WORKS SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-12 border-b border-stone-200/60">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black tracking-widest text-[#2D8A78] uppercase bg-[#8FB8A8]/10 px-2.5 py-1 rounded-md">
            The Engine Mechanics
          </span>
          <h2 className="text-3xl font-black tracking-tight text-stone-900">
            Engineered for Cognitive Clarity
          </h2>
          <p className="text-xs font-medium text-stone-500 max-w-md mx-auto">
            Traditional tools create compounding task piles. Todo Master forces
            systematic focus and clean execution loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "1. Rapid Capture",
              desc: "Drop raw thoughts into your Inbox instantly. No categorization stress, no friction. Just clear it from your working memory.",
              icon: Brain,
            },
            {
              title: "2. Intentional Focus",
              desc: "Allocate a maximum of 3 key targets to your Today's Focus meter. Everything else stays safely locked in the Backlog.",
              icon: Target,
            },
            {
              title: "3. Absolute Daily Reset",
              desc: "At midnight, uncompleted tasks smoothly roll back to the Backlog automatically. Wake up to an unburdened, blank canvas.",
              icon: RefreshCw,
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/50 p-5 rounded-2xl space-y-3 shadow-3xs"
            >
              <div className="w-9 h-9 bg-[#8FB8A8]/10 text-[#2D8A78] flex items-center justify-center rounded-xl">
                <step.icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-black text-stone-800">
                {step.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ABOUT US (PHILOSOPHY) SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-b border-stone-200/60">
        <div className="space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#E6B85C] uppercase bg-[#E6B85C]/10 px-2.5 py-1 rounded-md">
            Our Blueprint
          </span>
          <h3 className="text-2xl font-black tracking-tight text-stone-900">
            We build software craftsmanship, not data traps.
          </h3>
          <p className="text-xs font-medium text-stone-500 leading-relaxed">
            Todo Master was engineered out of systemic frustration with
            overwhelming productivity suites. We believe intentional boundaries
            reduce digital anxiety.
          </p>
          <p className="text-xs font-medium text-stone-500 leading-relaxed">
            By combining lightweight, lightning-fast interfaces with structural
            execution rules, we help you transition away from constant visual
            layout clutter and move directly into execution.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-xs space-y-4">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Operational Philosophy
          </div>
          <blockquote className="text-xs font-semibold text-stone-700 italic border-l-2 border-[#2D8A78] pl-3 py-1 leading-relaxed">
            "Decomposing complex objectives into actionable, 30-minute blocks
            completely neutralizes procrastination behaviors before they
            materialize."
          </blockquote>
          <div className="flex items-center gap-2 pt-1">
            <div className="w-7 h-7 bg-[#2D8A78] rounded-full flex items-center justify-center text-white text-[10px] font-black">
              TM
            </div>
            <div>
              <div className="text-[11px] font-black text-stone-800">
                Todo Master Core Labs
              </div>
              <div className="text-[9px] font-bold text-stone-400">
                Architectural Framework Design
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SWEET PRICING SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-stone-900">
            Pricing Mapped to Value
          </h2>
          <p className="text-xs font-medium text-stone-500">
            Simple billing thresholds. Zero hidden tier costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free Sandbox */}
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-3xs relative">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-stone-400 uppercase tracking-widest">
                  Free Sandbox
                </h4>
                <div className="text-3xl font-black text-stone-900 mt-1">
                  $0
                </div>
              </div>
              <ul className="space-y-2.5 pt-2">
                {[
                  "Up to 10 active tasks total",
                  "3 active Today's Focus slots",
                  "Standard global inbox tracking",
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
            <button
              onClick={handleRedirect}
              className="w-full py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold rounded-xl transition-all"
            >
              Get Started Free
            </button>
          </div>

          {/* Premium Pro Engine */}
          <div className="bg-white border-2 border-[#2D8A78] p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm relative">
            <div className="absolute -top-3 right-4 bg-[#2D8A78] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
              Highly Recommended
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-[#2D8A78] uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-[#E6B85C] text-[#E6B85C]" />{" "}
                  Pro Engine
                </h4>
                <div className="text-3xl font-black text-stone-900 mt-1">
                  $9.99
                  <span className="text-xs font-bold text-stone-400">/mo</span>
                </div>
              </div>
              <ul className="space-y-2.5 pt-2">
                {[
                  "Infinite task tracking architecture",
                  "Uncapped daily Focus slots",
                  "Gemini AI Goal Decomposition pipelines",
                  "Priority server-side support paths",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-bold text-stone-700"
                  >
                    <Check className="w-3.5 h-3.5 text-[#2D8A78] stroke-[2.5] shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleRedirect}
              className="w-full py-2 bg-[#2D8A78] hover:bg-[#236B5D] text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 group"
            >
              Unlock Complete Access
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. STRUCTURAL MINIMALIST FOOTER */}
      <footer className="w-full bg-white border-t border-stone-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-stone-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#2D8A78] rounded-md flex items-center justify-center text-white text-[10px] font-black">
              TM
            </div>
            <span className="text-stone-800 tracking-tight font-black">
              Todo Master
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="hover:text-stone-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-stone-600 transition-colors">
              Terms of Service
            </a>
            <a
              href="mailto:support@todomaster.com"
              className="hover:text-stone-600 transition-colors"
            >
              Contact Engineering
            </a>
          </div>
          <div className="font-medium text-[11px]">
            © {new Date().getFullYear()} Todo Master. All pipelines unified.
          </div>
        </div>
      </footer>
    </div>
  );
}
