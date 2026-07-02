import { motion } from "framer-motion";
import { splitMarkdownSections } from "@/utils/markdown";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { SectionIcon } from "./SectionIcon";

interface ItineraryViewProps {
  markdown: string;
}

export function ItineraryView({ markdown }: ItineraryViewProps) {
  const sections = splitMarkdownSections(markdown);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <motion.section
          key={`${section.title}-${i}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
        >
          <header className="flex items-center gap-3 border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-5 py-3.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-white shadow-glow/50">
              <SectionIcon name={section.icon} className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-semibold tracking-tight">{section.title}</h3>
          </header>
          <div className="px-5 py-4">
            <MarkdownRenderer content={section.content} />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
