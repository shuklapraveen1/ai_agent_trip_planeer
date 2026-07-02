import { createFileRoute } from "@tanstack/react-router";
import { TripsPage } from "@/pages/TripsPage";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Your trips — RoamAI" },
      { name: "description", content: "Your saved trips and itineraries in RoamAI." },
      { property: "og:title", content: "Your trips — RoamAI" },
      { property: "og:description", content: "Your saved trips and itineraries in RoamAI." },
    ],
  }),
  component: TripsPage,
});
