export interface MarkdownSection {
  title: string;
  icon: string; // lucide icon name key
  content: string;
}

const SECTION_ICON_MAP: { keywords: string[]; icon: string }[] = [
  { keywords: ["flight", "airline", "airfare"], icon: "plane" },
  { keywords: ["hotel", "accommodation", "stay", "lodging"], icon: "hotel" },
  { keywords: ["budget", "cost", "expense", "price"], icon: "wallet" },
  { keywords: ["weather", "climate", "temperature"], icon: "cloud-sun" },
  { keywords: ["visa", "document", "passport"], icon: "file-check" },
  { keywords: ["pack", "packing"], icon: "luggage" },
  { keywords: ["itinerary", "day-by-day", "schedule", "day "], icon: "calendar-days" },
  { keywords: ["restaurant", "food", "dining", "cuisine"], icon: "utensils" },
  { keywords: ["tip", "advice", "note", "recommendation"], icon: "lightbulb" },
  { keywords: ["transport", "getting around", "taxi"], icon: "bus" },
  { keywords: ["overview", "summary", "introduction"], icon: "compass" },
];

export function iconForTitle(title: string): string {
  const lower = title.toLowerCase();
  for (const entry of SECTION_ICON_MAP) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.icon;
  }
  return "sparkles";
}

/**
 * Splits markdown into sections using top-level (# or ##) headings.
 * Content before the first heading (if any) becomes an "Overview" section.
 */
export function splitMarkdownSections(md: string): MarkdownSection[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;
  let preamble: string[] = [];

  const headingRe = /^(#{1,2})\s+(.+?)\s*#*\s*$/;

  for (const line of lines) {
    const m = line.match(headingRe);
    if (m) {
      if (current) sections.push(current);
      const title = m[2].replace(/[*_`]/g, "").trim();
      current = { title, icon: iconForTitle(title), content: "" };
    } else if (current) {
      current.content += line + "\n";
    } else {
      preamble.push(line);
    }
  }
  if (current) sections.push(current);

  const preambleContent = preamble.join("\n").trim();
  if (preambleContent) {
    sections.unshift({
      title: "Overview",
      icon: iconForTitle("overview"),
      content: preambleContent,
    });
  }

  return sections.length > 0
    ? sections.map((s) => ({ ...s, content: s.content.trim() }))
    : [{ title: "Itinerary", icon: "sparkles", content: md.trim() }];
}
