import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

export function TripsPage() {
  return (
    <PageShell
      eyebrow="Your trips"
      title="No trips yet."
      description="Generated itineraries are shown per session for now. Craft your first trip on the home page to see it here."
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-soft"
      >
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow">
          <Plane className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-lg font-semibold">Plan your first trip</h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Tell RoamAI where you'd like to go and it will build a beautiful, personalised itinerary
          for you.
        </p>
        <Button asChild className="mt-5 h-11 rounded-xl gradient-primary text-white shadow-glow">
          <Link to="/">Start planning</Link>
        </Button>
      </motion.div>
    </PageShell>
  );
}
