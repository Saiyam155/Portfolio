import { useEffect, useRef, useState } from "react";
import { kpis } from "@/lib/portfolio-data";

function useCountUp(target: number, decimals = 0, durationMs = 1400, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
}

const COLOR_VARS: Record<string, string> = {
  green: "var(--signal-green)",
  cyan: "var(--data-cyan)",
  purple: "var(--data-purple)",
};

const COLOR_CLASSES: Record<string, string> = {
  green: "text-signal-green",
  cyan: "text-data-cyan",
  purple: "text-data-purple",
};

export function KPIStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-b border-hairline bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <KPITile key={k.label} kpi={k} animate={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KPITile({ kpi, animate }: { kpi: (typeof kpis)[number]; animate: boolean }) {
  const display = useCountUp(kpi.value, kpi.decimals ?? 0, 1400, animate);
  const color = kpi.color ?? "green";
  const colorVar = COLOR_VARS[color];
  const colorClass = COLOR_CLASSES[color];
  return (
    <div className="relative overflow-hidden rounded-lg border border-hairline bg-panel p-4 font-mono">
      <Sparkline color={colorVar} trend={kpi.trend} />
      <div className="relative">
        <div className="text-xs uppercase tracking-wider text-ink-dim font-semibold mb-0.5">
          {kpi.source}
        </div>
        <div className="text-xs uppercase tracking-widest text-ink-faint">
          {kpi.label}
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className={`text-3xl sm:text-4xl font-bold tabular-nums ${colorClass}`}>
            {display}
          </span>
          <span className={`text-lg ${colorClass} opacity-70`}>{kpi.suffix}</span>
        </div>
        <div className="mt-1 text-sm text-ink-dim truncate">{kpi.sub}</div>
      </div>
    </div>
  );
}

function Sparkline({ color, trend }: { color: string; trend?: "up" | "flat" }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    let y: number;
    if (trend === "flat") {
      // high and flat with tiny variance
      y = 8 + Math.sin(i * 0.4) * 2 + Math.cos(i * 0.8) * 1;
    } else {
      // upward trending
      const base = 30 - (i / 23) * 20;
      y = base + Math.sin(i * 0.8) * 4;
    }
    return `${(i / 23) * 100},${y}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-20"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
