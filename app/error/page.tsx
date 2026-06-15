"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="w-full bg-[#FCFAEF] border border-stone-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="pt-8 pb-3 flex flex-col items-center text-center">
            <div className="mb-3 text-red-500/90 bg-red-100/50 p-3.5 rounded-full">
              <AlertTriangle className="w-10 h-10 stroke-[1.5]" />
            </div>
            <CardTitle className="text-[22px] font-bold text-stone-900 tracking-tight">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 sm:px-10 pb-8 pt-2 text-center flex flex-col items-center">
            <p className="text-sm text-stone-600 font-medium mb-8 leading-relaxed max-w-sm">
              We encountered an unexpected error. Don&apos;t worry, our team has
              been notified and we&apos;re working on fixing it.
            </p>

            <Button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto px-8 h-11 bg-[#2D8A78] hover:bg-[#236B5D] text-white font-semibold rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
