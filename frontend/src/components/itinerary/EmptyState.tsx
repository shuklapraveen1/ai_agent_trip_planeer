import { motion } from "framer-motion";
import { Compass, Sparkles, MapPinned, CalendarClock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 -z-10 rounded-full gradient-primary opacity-30 blur-2xl" />
        <div className="grid h-24 w-24 place-items-center rounded-3xl gradient-primary shadow-glow">
          <Compass className="h-11 w-11 text-white" strokeWidth={1.75} />
        </div>
      </motion.div>
      <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        Your AI itinerary will appear here.
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Fill in your trip details and RoamAI will craft a personalised plan —
        flights, stays, day-by-day activities, weather and packing tips.
      </p>
      <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-3">
        {[
          { icon: MapPinned, label: "Personalised routes" },
          { icon: Sparkles, label: "Smart suggestions" },
          { icon: CalendarClock, label: "Day-by-day plan" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="rounded-2xl border border-border bg-card px-3 py-4 text-xs shadow-soft"
          >
            <item.icon className="mx-auto mb-2 h-4 w-4 text-primary" />
            <div className="font-medium">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
