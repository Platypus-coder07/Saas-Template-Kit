"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface NavbarProps {
  isSubscribed: boolean;
}

export function Navbar({ isSubscribed }: NavbarProps) {
  const handleUpgrade = async () => {
    toast.loading("Opening checkout...", { id: "checkout" });
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to initiate checkout pipeline", { id: "checkout" });
    }
  };

  return (
    <header className="w-full bg-[#FCFAEF] border-b border-stone-200/80 px-4 sm:px-8 h-16 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#2D8A78] rounded-lg flex items-center justify-center text-white font-black text-sm">
          TM
        </div>
        <span className="font-black text-stone-900 tracking-tight text-sm hidden sm:inline">
          Todo Master
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isSubscribed ? (
          <div className="flex items-center gap-1.5 bg-[#2D8A78]/10 text-[#2D8A78] px-3 py-1.5 rounded-xl text-xs font-bold border border-[#2D8A78]/20">
            <Sparkles className="w-3.5 h-3.5 fill-[#2D8A78]" />
            Pro Member
          </div>
        ) : (
          <Button
            onClick={handleUpgrade}
            className="h-9 px-4 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl text-xs shadow-md transition-all gap-1.5 group"
          >
            <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            Upgrade to Pro
          </Button>
        )}

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 border border-stone-200">
          <UserButton/>
        </div>
      </div>
    </header>
  );
}
