import { Clock, RefreshCw, Target, Zap } from "lucide-react";
import { HERO_STATS } from "@/lib/data";

const ICONS = {
  clock: Clock,
  zap: Zap,
  refresh: RefreshCw,
  target: Target,
};

export default function HeroStats() {
  return (
    <div className="shell grid grid-cols-1 gap-3 pb-16 pt-4 sm:grid-cols-2 lg:grid-cols-4">
      {HERO_STATS.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div
            key={s.label}
            className="glass flex items-start gap-3 rounded-2xl p-4"
          >
            <Icon className="mt-0.5 h-5 w-5 flex-none text-accent" />
            <div className="leading-tight">
              <strong className="block text-[0.95rem] font-bold text-text-hi">{s.strong}</strong>
              <span className="text-[0.82rem] text-text-mid">{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
