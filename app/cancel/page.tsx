"use client";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-[#F4F1E8] flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-md w-full text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto">
          <XCircle className="w-7 h-7 text-stone-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-black text-stone-900 tracking-tight">
            Payment Cancelled
          </h1>
          <p className="text-xs font-medium text-stone-500 leading-relaxed">
            No worries — you haven't been charged. You can upgrade anytime from
            your dashboard.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-black rounded-xl transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
