import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RoamAI" },
      { name: "description", content: "RoamAI is a modern AI travel planner that turns ideas into beautiful itineraries." },
      { property: "og:title", content: "About RoamAI" },
      { property: "og:description", content: "RoamAI is a modern AI travel planner that turns ideas into beautiful itineraries." },
    ],
  }),
  component: AboutPage,
});
