import { ReactNode } from "react";

// Preview layout - minimal, no auth required
export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
