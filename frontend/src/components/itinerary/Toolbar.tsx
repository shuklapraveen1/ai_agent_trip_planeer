import { toast } from "sonner";
import { motion } from "framer-motion";
import { Copy, Download, Printer, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  markdown: string;
  onRegenerate: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function Toolbar({ markdown, onRegenerate, onClear, disabled }: ToolbarProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Itinerary copied to clipboard");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>RoamAI Itinerary</title>
      <style>
        body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:780px;margin:40px auto;padding:0 24px;color:#0f172a;line-height:1.65}
        h1,h2,h3{letter-spacing:-.01em}
        pre{background:#0f172a;color:#f8fafc;padding:14px;border-radius:10px;overflow:auto}
        table{border-collapse:collapse;width:100%;margin:14px 0}
        th,td{border:1px solid #e2e8f0;padding:8px 10px;text-align:left}
        thead{background:#f1f5f9}
      </style></head><body><pre style="white-space:pre-wrap;background:transparent;color:inherit;padding:0">${escapeHtml(markdown)}</pre></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roamai-itinerary.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Itinerary downloaded — open & Print → Save as PDF");
  };

  const actions = [
    { icon: Copy, label: "Copy", onClick: handleCopy },
    { icon: Printer, label: "Print", onClick: handlePrint },
    { icon: Download, label: "Download", onClick: handleDownload },
    { icon: RefreshCw, label: "Regenerate", onClick: onRegenerate },
    { icon: Trash2, label: "Clear", onClick: onClear, destructive: true },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-soft"
    >
      {actions.map((a) => (
        <Button
          key={a.label}
          type="button"
          variant="ghost"
          size="sm"
          onClick={a.onClick}
          disabled={disabled}
          className={
            "h-9 rounded-xl px-3 text-xs font-medium " +
            (("destructive" in a && a.destructive)
              ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          <a.icon className="mr-1.5 h-3.5 w-3.5" />
          {a.label}
        </Button>
      ))}
    </motion.div>
  );
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
