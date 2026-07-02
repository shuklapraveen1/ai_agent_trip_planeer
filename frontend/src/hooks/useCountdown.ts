import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function useCountdown(target: Date | null): Countdown {
  const compute = (): Countdown => {
    if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff / 3_600_000) % 24);
    const minutes = Math.floor((diff / 60_000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isPast: false };
  };

  const [state, setState] = useState<Countdown>(compute);

  useEffect(() => {
    setState(compute());
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.getTime()]);

  return state;
}
