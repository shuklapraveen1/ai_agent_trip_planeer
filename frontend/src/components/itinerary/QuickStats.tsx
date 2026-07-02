import { motion } from "framer-motion";
import { CalendarClock, MapPin, Users, Wallet, Hotel } from "lucide-react";
import type { TripFormValues } from "@/types";
import { formatBudget, daysBetween } from "@/utils/format";

interface QuickStatsProps {
  trip: TripFormValues;
}

export function QuickStats({ trip }: QuickStatsProps) {
  const nights = daysBetween(trip.departureDate, trip.returnDate);
  const items = [
    { icon: MapPin, label: "Destination", value: trip.destination || "—" },
    { icon: CalendarClock, label: "Duration", value: `${nights} night${nights === 1 ? "" : "s"}` },
    { icon: Users, label: "Travelers", value: `${trip.adults + trip.children}` },
    { icon: Wallet, label: "Budget", value: formatBudget(trip.budget) },
    { icon: Hotel, label: "Hotel", value: trip.hotel },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-border bg-card p-3 shadow-soft"
        >
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <it.icon className="h-3 w-3" />
            {it.label}
          </div>
          <div className="truncate text-sm font-semibold" title={it.value}>
            {it.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
