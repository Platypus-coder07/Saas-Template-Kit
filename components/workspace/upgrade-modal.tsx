"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRO_FEATURES = [
  {
    title: "Infinite Workspace Canvas",
    desc: "Unlock unlimited tasks and clear structural backlogs",
  },
  {
    title: "Uncapped Focus Slots",
    desc: "Allocate as many priority targets to your daily tracker as needed",
  },
  {
    title: "Gemini AI Engine Activation",
    desc: "Decompose complex, vague goals into immediate 30-min actions",
  },
  {
    title: "Priority Support Pipeline",
    desc: "Direct access to engineering teams for rapid request loops",
  },
];

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to initiate checkout pipeline");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#161616]/40 backdrop-blur-xs flex items-center justify-center z-100 p-4 animate-fadeIn"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-stone-200 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/40 rounded-lg text-stone-400 hover:text-stone-700 transition-all duration-150 z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="p-6 pb-4 space-y-3 bg-[#F4F1E8]/20 border-b border-stone-100">
              <div className="flex items-center gap-1.5 bg-[#E6B85C]/10 border border-[#E6B85C]/30 text-amber-800 px-2.5 py-1 rounded-lg w-max text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3 fill-[#E6B85C]" />
                System Gated
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#161616] tracking-tight">
                  Unlock Todo Master Pro
                </h3>
                <p className="text-xs font-medium text-stone-500 leading-relaxed max-w-xs">
                  You've reached the free tier limits. Expand your workspace
                  engine into a fluid operational command center.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1">
              <div className="space-y-3.5">
                {PRO_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-md bg-[#2D8A78]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#2D8A78]/10 transition-colors group-hover:bg-[#2D8A78]/20">
                      <Check className="w-3 h-3 text-[#2D8A78] stroke-3" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-stone-800 tracking-tight leading-snug">
                        {feature.title}
                      </h4>
                      <p className="text-[11px] font-medium text-stone-400 leading-normal">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F4F1E8]/40 border border-stone-200 rounded-xl p-4 flex items-center justify-between shadow-3xs">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">
                    Full System Access
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#161616] tracking-tight">
                      $9.99
                    </span>
                    <span className="text-xs font-bold text-stone-400">
                      / month
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-[#2D8A78] bg-[#2D8A78]/10 px-2.5 py-1 rounded-md border border-[#2D8A78]/20">
                    Flexible Billing
                  </span>
                  <span className="text-[9px] font-medium text-stone-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-stone-400" /> Cancel
                    anytime
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  onClick={handleUpgrade}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#2D8A78] hover:bg-[#236B5D] disabled:opacity-60 text-white text-xs font-black rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-2 group tracking-wide uppercase"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Securing Session Link...
                    </>
                  ) : (
                    <>
                      Upgrade Now
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-[11px] font-bold text-stone-400 hover:text-stone-700 transition-colors text-center block"
                >
                  Return to free limited sandbox
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
