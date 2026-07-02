import { createFileRoute } from "@tanstack/react-router";
import { PlannerPage } from "@/pages/PlannerPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoamAI — AI Travel Planner" },
      { name: "description", content: "Craft beautiful, personalised trip itineraries with an AI travel agent — flights, hotels, weather, visa and day-by-day plans." },
      { property: "og:title", content: "RoamAI — AI Travel Planner" },
      { property: "og:description", content: "Turn a few trip details into a beautiful, day-by-day itinerary." },
    ],
  }),
  component: PlannerPage,
});
