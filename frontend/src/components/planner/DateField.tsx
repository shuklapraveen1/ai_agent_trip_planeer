import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  invalid?: boolean;
  label?: string;
}

export function DateField({ value, onChange, placeholder = "Select date", disabled, minDate, invalid, label }: DateFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={label}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-xl border border-input bg-background px-3 text-left text-sm transition",
            "hover:border-ring/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            invalid && "border-destructive",
            disabled && "opacity-60 cursor-not-allowed",
          )}
        >
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? format(value, "PPP") : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={minDate ? { before: minDate } : undefined}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}
