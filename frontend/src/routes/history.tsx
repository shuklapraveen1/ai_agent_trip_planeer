import { createFileRoute } from "@tanstack/react-router";
import { HistoryPage } from "@/pages/HistoryPage";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — RoamAI" },
      { name: "description", content: "Your recently generated itineraries in RoamAI." },
      { property: "og:title", content: "History — RoamAI" },
      { property: "og:description", content: "Your recently generated itineraries in RoamAI." },
    ],
  }),
  component: HistoryPage,
});
