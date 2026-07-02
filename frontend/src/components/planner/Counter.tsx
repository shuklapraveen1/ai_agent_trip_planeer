import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

export function Counter({ label, sublabel, value, min = 0, max = 20, onChange, disabled }: CounterProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sublabel && <div className="text-xs text-muted-foreground">{sublabel}</div>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={disabled || value <= min}
          aria-label={`Decrease ${label}`}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full border border-border text-foreground transition",
            "hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={inc}
          disabled={disabled || value >= max}
          aria-label={`Increase ${label}`}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full border border-border text-foreground transition",
            "hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
