import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import { formatBudget } from "@/utils/format";

interface BudgetBreakdownProps {
  total: number;
}

const SPLIT = [
  { label: "Flights", pct: 30, color: "oklch(0.55 0.2 275)" },
  { label: "Hotels", pct: 35, color: "oklch(0.7 0.16 240)" },
  { label: "Food", pct: 15, color: "oklch(0.68 0.16 155)" },
  { label: "Activities", pct: 12, color: "oklch(0.72 0.18 60)" },
  { label: "Buffer", pct: 8, color: "oklch(0.55 0.05 265)" },
];

export function BudgetBreakdown({ total }: BudgetBreakdownProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-4 py-3">
        <PieChart className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">Estimated breakdown</div>
      </div>
      <div className="p-4">
        <div className="mb-3 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          {SPLIT.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ width: 0 }}
              animate={{ width: `${s.pct}%` }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 20 }}
              style={{ backgroundColor: s.color }}
              className="h-full"
              title={`${s.label} ${s.pct}%`}
            />
          ))}
        </div>
        <ul className="space-y-1.5 text-xs">
          {SPLIT.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="flex-1 text-foreground">{s.label}</span>
              <span className="text-muted-foreground">{s.pct}%</span>
              <span className="w-20 text-right font-semibold tabular-nums">
                {formatBudget(Math.round((total * s.pct) / 100))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
