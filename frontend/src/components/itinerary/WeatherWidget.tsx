import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun, Snowflake, CloudSun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WeatherWidgetProps {
  destination: string;
}

const CONDITIONS: { label: string; icon: LucideIcon; hi: number; lo: number }[] = [
  { label: "Sunny", icon: Sun, hi: 32, lo: 24 },
  { label: "Partly cloudy", icon: CloudSun, hi: 28, lo: 21 },
  { label: "Cloudy", icon: Cloud, hi: 24, lo: 18 },
  { label: "Light rain", icon: CloudRain, hi: 22, lo: 17 },
  { label: "Cool", icon: Snowflake, hi: 14, lo: 6 },
];

// Deterministic pseudo-random from string
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function WeatherWidget({ destination }: WeatherWidgetProps) {
  const seed = hash(destination || "roam");
  const forecast = Array.from({ length: 5 }).map((_, i) => {
    const c = CONDITIONS[(seed + i * 7) % CONDITIONS.length];
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][(seed + i) % 7];
    return { day, ...c };
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-4 py-3">
        <CloudSun className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">
          Weather · {destination || "Destination"}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1 p-3">
        {forecast.map((f, i) => (
          <motion.div
            key={f.day + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center rounded-xl px-1 py-2 hover:bg-muted/60"
          >
            <div className="text-[10px] font-medium text-muted-foreground">{f.day}</div>
            <f.icon className="my-1 h-5 w-5 text-primary" />
            <div className="text-xs font-semibold tabular-nums">{f.hi}°</div>
            <div className="text-[10px] text-muted-foreground tabular-nums">{f.lo}°</div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 pb-3 text-[11px] text-muted-foreground">
        Illustrative forecast — check a live source before departure.
      </div>
    </div>
  );
}
