import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { History } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

export function HistoryPage() {
  return (
    <PageShell
      eyebrow="History"
      title="Nothing here yet."
      description="Your recently generated itineraries will appear here once trip history is enabled."
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-soft"
      >
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow">
          <History className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-lg font-semibold">History is a click away</h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Generate an itinerary on the home page to see it here. You can copy,
          print or download every plan RoamAI creates.
        </p>
        <Button asChild className="mt-5 h-11 rounded-xl gradient-primary text-white shadow-glow">
          <Link to="/">Generate one now</Link>
        </Button>
      </motion.div>
    </PageShell>
  );
}
