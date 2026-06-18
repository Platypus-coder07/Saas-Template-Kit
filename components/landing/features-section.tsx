"use client";

import { ProblemSection } from "./features/problem-section";
import { WorkflowSection } from "./features/workflow-section";
import { ShowcaseSection } from "./features/showcase-section";
import { ComparisonSection } from "./features/comparison-section";

export function FeaturesSection() {
  return (
    <div className="w-full bg-[#F4F1E8] text-[#161616] font-sans antialiased space-y-40 sm:space-y-56 py-32 md:py-48 border-t border-stone-200/60 overflow-hidden">
      <ProblemSection />

      <WorkflowSection />

      <ShowcaseSection />

      <ComparisonSection />
    </div>
  );
}
