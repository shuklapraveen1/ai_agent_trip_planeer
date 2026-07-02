import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Planning trip",
  "Searching flights",
  "Searching hotels",
  "Checking visa & docs",
  "Generating itinerary",
] as const;

export function LoadingProgress() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= STEPS.length - 1) return;
    // Progress steps at a nice pace but always leave the last step running.
    const timeout = setTimeout(() => setIndex((i) => Math.min(i + 1, STEPS.length - 1)), 1400);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-3 py-8">
      <div className="mb-2 text-center">
        <div className="text-sm font-medium text-muted-foreground">
          Working with our AI travel agent
        </div>
        <div className="mt-1 text-2xl font-semibold tracking-tight">
          Preparing your journey
        </div>
      </div>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {STEPS.map((step, i) => {
            const done = i < index;
            const active = i === index;
            return (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft"
              >
                <span
                  className={
                    "grid h-7 w-7 place-items-center rounded-full transition " +
                    (done
                      ? "bg-success text-success-foreground"
                      : active
                        ? "gradient-primary text-white"
                        : "bg-muted text-muted-foreground")
                  }
                  aria-hidden
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={
                    "text-sm font-medium " +
                    (done ? "text-muted-foreground line-through" : "text-foreground")
                  }
                >
                  {step}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
