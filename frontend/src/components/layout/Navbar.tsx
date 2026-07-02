import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Moon, Sun, Plane } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/trips", label: "Trips" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow"
          >
            <Plane className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight">
            Roam<span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </Button>
          <Avatar className="h-9 w-9 ring-2 ring-border">
            <AvatarFallback className="gradient-primary text-white text-sm font-semibold">
              RA
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
