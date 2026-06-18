"use client";
import Image from "next/image";

export function ShowcaseSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
          See The System In Action
        </h2>
        <p className="text-sm sm:text-base font-medium text-stone-500 leading-relaxed">
          Designed around a single goal: helping you spend less time managing
          work and more time completing it.
        </p>
      </div>
      <div className="w-full bg-white border border-stone-200/60 p-2 sm:p-3 rounded-2xl shadow-xl max-w-5xl mx-auto relative group">
        <div className="w-full relative overflow-hidden rounded-xl bg-[#F4F1E8]">
          <Image
            src="/images/dashboard.png"
            alt="Todo Master Full Workspace Dashboard View"
            width={1920}
            height={1200}
            priority
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
