import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Luggage, PlusCircle, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface PackingChecklistProps {
  storageKey: string;
  seed?: string[];
  title?: string;
  icon?: "luggage" | "check";
}

const DEFAULT_ITEMS = [
  "Passport & ID",
  "Travel insurance",
  "Chargers & adapters",
  "Comfortable shoes",
  "Sunscreen & sunglasses",
  "Medication",
  "Reusable water bottle",
];

export function PackingChecklist({
  storageKey,
  seed = DEFAULT_ITEMS,
  title = "Packing checklist",
  icon = "luggage",
}: PackingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setItems(JSON.parse(raw) as ChecklistItem[]);
        return;
      }
    } catch {
      /* ignore */
    }
    setItems(seed.map((label, i) => ({ id: `${i}-${label}`, label, done: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (items.length === 0) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, storageKey]);

  const done = items.filter((i) => i.done).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const add = () => {
    const label = newItem.trim();
    if (!label) return;
    setItems((prev) => [...prev, { id: `${Date.now()}-${label}`, label, done: false }]);
    setNewItem("");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon === "luggage" ? (
            <Luggage className="h-4 w-4 text-primary" />
          ) : (
            <CheckSquare className="h-4 w-4 text-primary" />
          )}
          {title}
        </div>
        <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
          {done}/{items.length}
        </span>
      </div>
      <div className="h-1 w-full bg-muted">
        <motion.div
          className="h-full gradient-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      <ul className="max-h-72 overflow-auto p-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/60"
          >
            <Checkbox
              id={`check-${it.id}`}
              checked={it.done}
              onCheckedChange={() => toggle(it.id)}
              aria-label={it.label}
            />
            <label
              htmlFor={`check-${it.id}`}
              className={cn(
                "flex-1 cursor-pointer text-sm",
                it.done && "text-muted-foreground line-through",
              )}
            >
              {it.label}
            </label>
            <button
              type="button"
              onClick={() => remove(it.id)}
              className="rounded-full p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              aria-label={`Remove ${it.label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-border/70 p-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add item…"
          className="h-9 rounded-lg text-sm"
        />
        <button
          type="button"
          onClick={add}
          className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-white shadow-soft transition hover:brightness-110"
          aria-label="Add item"
        >
          <PlusCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
