import { UpgradeModalProvider } from "@/lib/upgrade-modal-context";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <UpgradeModalProvider>{children}</UpgradeModalProvider>;
}
