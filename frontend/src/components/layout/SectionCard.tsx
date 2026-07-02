import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
}

export function SectionCard({ children, className, delay = 0, as = "div" }: SectionCardProps) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border border-border bg-card shadow-soft",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
