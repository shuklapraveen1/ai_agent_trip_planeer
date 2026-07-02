import { useState } from "react";
import { ArrowRightLeft, Coins } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Indicative rates relative to INR — user should verify before travel
const RATES: Record<string, { symbol: string; perInr: number }> = {
  INR: { symbol: "₹", perInr: 1 },
  USD: { symbol: "$", perInr: 0.012 },
  EUR: { symbol: "€", perInr: 0.011 },
  GBP: { symbol: "£", perInr: 0.0095 },
  JPY: { symbol: "¥", perInr: 1.8 },
  AED: { symbol: "د.إ", perInr: 0.044 },
  THB: { symbol: "฿", perInr: 0.41 },
  SGD: { symbol: "S$", perInr: 0.016 },
  AUD: { symbol: "A$", perInr: 0.018 },
};

export function CurrencyWidget() {
  const [amount, setAmount] = useState<number>(10_000);
  const [from, setFrom] = useState<string>("INR");
  const [to, setTo] = useState<string>("USD");

  const convert = (a: number, f: string, t: string) => {
    if (!RATES[f] || !RATES[t]) return 0;
    const inInr = a / RATES[f].perInr;
    return inInr * RATES[t].perInr;
  };
  const result = convert(amount || 0, from, to);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border/70 bg-gradient-to-r from-accent/40 to-transparent px-4 py-3">
        <Coins className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">Currency converter</div>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="h-10 rounded-lg text-sm"
            aria-label="Amount"
            min={0}
          />
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="h-10 w-[110px] rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(RATES).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swap}
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex h-10 flex-1 items-center rounded-lg border border-input bg-muted/40 px-3 text-sm font-semibold tabular-nums">
            {RATES[to].symbol} {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="h-10 w-[110px] rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(RATES).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-[11px] text-muted-foreground">Indicative rates only.</p>
      </div>
    </div>
  );
}
