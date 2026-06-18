"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-[#F4F1E8] flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-md w-full text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 bg-[#2D8A78]/10 rounded-2xl flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-[#2D8A78]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-black text-stone-900 tracking-tight">
            You're now a Pro Member
          </h1>
          <p className="text-xs font-medium text-stone-500 leading-relaxed">
            Unlimited todos, AI task decomposer, and daily focus mode are now
            unlocked. Start building momentum.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5 bg-[#2D8A78]/10 text-[#2D8A78] px-4 py-2 rounded-xl text-xs font-black border border-[#2D8A78]/20 w-max mx-auto">
          <Sparkles className="w-3.5 h-3.5 fill-[#2D8A78]" />
          Todo Master Pro Active
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 bg-[#2D8A78] hover:bg-[#236B5D] text-white text-sm font-black rounded-xl transition-colors shadow-sm"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
