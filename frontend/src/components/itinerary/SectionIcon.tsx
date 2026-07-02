import {
  Plane,
  Hotel,
  Wallet,
  CloudSun,
  FileCheck,
  Luggage,
  CalendarDays,
  Utensils,
  Lightbulb,
  Bus,
  Compass,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  plane: Plane,
  hotel: Hotel,
  wallet: Wallet,
  "cloud-sun": CloudSun,
  "file-check": FileCheck,
  luggage: Luggage,
  "calendar-days": CalendarDays,
  utensils: Utensils,
  lightbulb: Lightbulb,
  bus: Bus,
  compass: Compass,
  sparkles: Sparkles,
};

export function SectionIcon({ name, className }: { name: string; className?: string }) {
  const Comp = MAP[name] ?? Sparkles;
  return <Comp className={className} />;
}
