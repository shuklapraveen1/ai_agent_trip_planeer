import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { PlannerForm } from "@/components/planner/PlannerForm";
import { LoadingProgress } from "@/components/planner/LoadingProgress";
import { EmptyState } from "@/components/itinerary/EmptyState";
import { ItineraryView } from "@/components/itinerary/ItineraryView";
import { Toolbar } from "@/components/itinerary/Toolbar";
import { QuickStats } from "@/components/itinerary/QuickStats";
import { CountdownWidget } from "@/components/itinerary/CountdownWidget";
import { WeatherWidget } from "@/components/itinerary/WeatherWidget";
import { CurrencyWidget } from "@/components/itinerary/CurrencyWidget";
import { BudgetBreakdown } from "@/components/itinerary/BudgetBreakdown";
import { PackingChecklist } from "@/components/itinerary/PackingChecklist";
import { generatePlan, ApiError } from "@/services/api";
import { formValuesToRequest } from "@/utils/format";
import type { TripFormValues } from "@/types";

export function PlannerPage() {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [trip, setTrip] = useState<TripFormValues | null>(null);

  const runPlan = useCallback(async (values: TripFormValues) => {
    setLoading(true);
    setTrip(values);
    try {
      const req = formValuesToRequest(values);
      const res = await generatePlan(req);
      setItinerary(res.itinerary);
      toast.success("Your itinerary is ready!");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const regenerate = () => {
    if (!trip) return;
    void runPlan(trip);
  };

  const clear = () => {
    setItinerary(null);
    toast.info("Cleared. Adjust your trip and generate a new one.");
  };

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 md:px-8">
        {/* Hero header */}
        <div className="mb-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            AI travel agent · v1
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Design the trip you've been{" "}
            <span className="text-gradient whitespace-nowrap">Dreaming about</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base"
          >
            RoamAI turns a few details into a beautiful, day-by-day itinerary — flights, stays,
            activities, weather and packing tips included.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-10">
          {/* Left panel */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-elevated">
                <div className="mb-4">
                  <h2 className="text-base font-semibold">Trip details</h2>
                  <p className="text-xs text-muted-foreground">
                    Fill everything to craft your personalised plan.
                  </p>
                </div>
                <PlannerForm onSubmit={runPlan} loading={loading} />
              </div>
              <CurrencyWidget />
            </div>
          </motion.aside>

          {/* Right panel */}
          <section className="lg:col-span-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border border-border bg-card shadow-elevated"
                >
                  <LoadingProgress />
                </motion.div>
              ) : itinerary ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  {trip && <QuickStats trip={trip} />}

                  <Toolbar
                    markdown={itinerary}
                    onRegenerate={regenerate}
                    onClear={clear}
                    disabled={loading}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    {trip && (
                      <CountdownWidget target={trip.departureDate} destination={trip.destination} />
                    )}
                    {trip && <WeatherWidget destination={trip.destination} />}
                  </div>

                  <ItineraryView markdown={itinerary} />

                  <div className="grid gap-4 md:grid-cols-2">
                    {trip && <BudgetBreakdown total={trip.budget} />}
                    <PackingChecklist storageKey="roamai-packing" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border border-border bg-card shadow-elevated"
                >
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
