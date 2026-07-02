import { format } from "date-fns";
import type { PlanRequest, TripFormValues } from "@/types";

export function formatTravelDates(start: Date, end: Date): string {
  return `${format(start, "d MMM yyyy")} - ${format(end, "d MMM yyyy")}`;
}

export function formatBudget(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formValuesToRequest(values: TripFormValues): PlanRequest {
  const travelersParts: string[] = [];
  if (values.adults > 0) travelersParts.push(`${values.adults} Adult${values.adults > 1 ? "s" : ""}`);
  if (values.children > 0) travelersParts.push(`${values.children} Child${values.children > 1 ? "ren" : ""}`);

  return {
    destination: values.destination.trim(),
    departure: values.departure.trim(),
    travel_dates: formatTravelDates(values.departureDate, values.returnDate),
    travelers: travelersParts.join(", "),
    budget: formatBudget(values.budget),
    hotel: values.hotel,
    interests: values.interests.join(", "),
  };
}

export function daysBetween(a: Date, b: Date): number {
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}
