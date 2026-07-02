import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CityAutocomplete } from "./CityAutocomplete";
import { DateField } from "./DateField";
import { Counter } from "./Counter";
import { HOTEL_OPTIONS, INTEREST_OPTIONS, POPULAR_CITIES } from "@/utils/constants";
import { cn } from "@/lib/utils";
import type { TripFormValues } from "@/types";
import { formatBudget } from "@/utils/format";

const schema = z
  .object({
    departure: z.string().trim().min(2, "Departure city is required"),
    destination: z.string().trim().min(2, "Destination is required"),
    departureDate: z.date({ required_error: "Pick a departure date" }),
    returnDate: z.date({ required_error: "Pick a return date" }),
    adults: z.number().int().min(1, "At least one adult"),
    children: z.number().int().min(0),
    budget: z.number().min(5000, "Budget seems too low"),
    hotel: z.enum(["Budget", "Mid-range", "Luxury"]),
    interests: z.array(z.string()).min(1, "Pick at least one interest"),
  })
  .refine((v) => v.returnDate >= v.departureDate, {
    path: ["returnDate"],
    message: "Return date must be after departure",
  });

type Schema = z.infer<typeof schema>;

interface PlannerFormProps {
  onSubmit: (v: TripFormValues) => void;
  loading: boolean;
}

export function PlannerForm({ onSubmit, loading }: PlannerFormProps) {
  const defaults = useMemo<Schema>(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 21);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      departure: "",
      destination: "",
      departureDate: start,
      returnDate: end,
      adults: 2,
      children: 0,
      budget: 150_000,
      hotel: "Mid-range",
      interests: [],
    };
  }, []);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onSubmit",
  });

  const interests = watch("interests");
  const budget = watch("budget");
  const departureDate = watch("departureDate");

  const toggleInterest = (label: string) => {
    if (loading) return;
    const next = interests.includes(label)
      ? interests.filter((i) => i !== label)
      : [...interests, label];
    setValue("interests", next, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-5", loading && "pointer-events-none opacity-70")}
      aria-busy={loading}
    >
      <fieldset disabled={loading} className="contents">
        {/* Cities */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="departure">From</Label>
            <Controller
              name="departure"
              control={control}
              render={({ field }) => (
                <CityAutocomplete
                  id="departure"
                  value={field.value}
                  onChange={field.onChange}
                  suggestions={POPULAR_CITIES}
                  placeholder="Departure city"
                  disabled={loading}
                  invalid={!!errors.departure}
                />
              )}
            />
            {errors.departure && (
              <p className="text-xs text-destructive">{errors.departure.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="destination">To</Label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <CityAutocomplete
                  id="destination"
                  value={field.value}
                  onChange={field.onChange}
                  suggestions={POPULAR_CITIES}
                  placeholder="Where to?"
                  disabled={loading}
                  invalid={!!errors.destination}
                />
              )}
            />
            {errors.destination && (
              <p className="text-xs text-destructive">{errors.destination.message}</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Departure</Label>
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <DateField
                  value={field.value}
                  onChange={(d) => d && field.onChange(d)}
                  label="Departure date"
                  disabled={loading}
                  invalid={!!errors.departureDate}
                />
              )}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Return</Label>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <DateField
                  value={field.value}
                  onChange={(d) => d && field.onChange(d)}
                  label="Return date"
                  minDate={departureDate}
                  disabled={loading}
                  invalid={!!errors.returnDate}
                />
              )}
            />
            {errors.returnDate && (
              <p className="text-xs text-destructive">{errors.returnDate.message}</p>
            )}
          </div>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <Label>Travelers</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            <Controller
              name="adults"
              control={control}
              render={({ field }) => (
                <Counter
                  label="Adults"
                  sublabel="Age 13+"
                  value={field.value}
                  onChange={field.onChange}
                  min={1}
                  disabled={loading}
                />
              )}
            />
            <Controller
              name="children"
              control={control}
              render={({ field }) => (
                <Counter
                  label="Children"
                  sublabel="Age 2–12"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={loading}
                />
              )}
            />
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="budget" className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              Budget
            </Label>
            <motion.span
              key={budget}
              initial={{ scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground tabular-nums"
            >
              {formatBudget(budget)}
            </motion.span>
          </div>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Slider
                id="budget"
                value={[field.value]}
                min={10_000}
                max={1_000_000}
                step={5_000}
                onValueChange={(v) => field.onChange(v[0])}
                disabled={loading}
                aria-label="Trip budget"
              />
            )}
          />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>₹10k</span>
            <span>₹10L</span>
          </div>
        </div>

        {/* Hotel */}
        <div className="space-y-2">
          <Label>Hotel preference</Label>
          <Controller
            name="hotel"
            control={control}
            render={({ field }) => (
              <div
                className="grid gap-2 sm:grid-cols-3"
                role="radiogroup"
                aria-label="Hotel preference"
              >
                {HOTEL_OPTIONS.map((opt) => {
                  const active = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => field.onChange(opt.value)}
                      disabled={loading}
                      className={cn(
                        "relative rounded-xl border p-3 text-left transition",
                        active
                          ? "border-primary bg-accent/60 shadow-soft"
                          : "border-border hover:border-ring/40 hover:bg-muted/50",
                      )}
                    >
                      <div className="text-sm font-semibold">{opt.title}</div>
                      <div className="text-xs text-muted-foreground">{opt.description}</div>
                      <div className="mt-1 text-[11px] font-medium text-primary">{opt.price}</div>
                      {active && (
                        <motion.span
                          layoutId="hotel-ring"
                          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-primary"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <Label>Interests</Label>
          <div className="flex flex-wrap gap-1.5">
            {INTEREST_OPTIONS.map((opt) => {
              const active = interests.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => toggleInterest(opt.label)}
                  aria-pressed={active}
                  className={cn(
                    "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-background text-foreground hover:border-ring/40 hover:bg-muted",
                  )}
                >
                  <span aria-hidden>{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          {errors.interests && (
            <p className="text-xs text-destructive">{errors.interests.message as string}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="group h-12 w-full rounded-xl gradient-primary text-base font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              Crafting your itinerary…
            </>
          ) : (
            <>
              <Sparkles className="h-4.5 w-4.5" />
              Generate my trip
            </>
          )}
        </Button>
      </fieldset>
    </form>
  );
}
