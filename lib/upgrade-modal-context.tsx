"use client";

import { createContext, useContext, useState } from "react";
import { UpgradeModal } from "@/components/workspace/upgrade-modal";

interface UpgradeModalContextType {
  showUpgradeModal: () => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextType>({
  showUpgradeModal: () => {},
});

export function UpgradeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UpgradeModalContext.Provider
      value={{ showUpgradeModal: () => setIsOpen(true) }}
    >
      {children}
      <UpgradeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </UpgradeModalContext.Provider>
  );
}

export function useUpgradeModal() {
  return useContext(UpgradeModalContext);
}
