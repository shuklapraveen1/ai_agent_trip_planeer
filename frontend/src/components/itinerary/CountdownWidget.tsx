import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

interface CountdownWidgetProps {
  target: Date;
  destination: string;
}

export function CountdownWidget({ target, destination }: CountdownWidgetProps) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(target);
  const parts = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-4 py-3">
        <Timer className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">
          {isPast ? "You're on the trip!" : `Countdown to ${destination || "your trip"}`}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4">
        {parts.map((p) => (
          <motion.div
            key={p.label}
            layout
            className="rounded-xl bg-muted/60 py-3 text-center"
          >
            <div className="text-2xl font-semibold tabular-nums">{p.value}</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {p.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
