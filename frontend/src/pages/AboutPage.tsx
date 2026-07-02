import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Wand2, Globe2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

const FEATURES = [
  {
    icon: Wand2,
    title: "AI-crafted itineraries",
    body: "Give RoamAI a destination and it builds a beautiful, day-by-day plan tailored to your interests, budget and vibe.",
  },
  {
    icon: Globe2,
    title: "End-to-end travel context",
    body: "Flights, hotels, weather, visa, packing and restaurant picks — all in one place, in one clean layout.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Trip data lives in your browser session. Copy, print or download itineraries whenever you want.",
  },
  {
    icon: Sparkles,
    title: "Delightfully fast",
    body: "Modern React 19 + TanStack Start, Tailwind v4, Framer Motion and a beautifully consistent design system.",
  },
];

export function AboutPage() {
  return (
    <PageShell
      eyebrow="About RoamAI"
      title="Travel planning, redesigned."
      description="RoamAI blends the calm of a good travel journal with the power of a modern AI planner — so getting from idea to itinerary feels effortless."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <span className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white shadow-glow">
              <f.icon className="h-4.5 w-4.5" />
            </span>
            <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
