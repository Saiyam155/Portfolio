import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { roles } from "@/lib/portfolio-data";

const TICKER_LINES = [
  "[2026-04-30 08:01:12] ✓ pipeline:embedding-sync  chunks=84,201  model=text-embed-3  store=pgvector  status=OK",
  "[2026-04-30 08:01:15] ✓ pipeline:payment-ingest  records=1,247,391  latency=8.2min  status=OK",
  "[2026-04-30 08:01:18] ✓ dbt:bronze→gold  models=34  tests_passed=98  duration=4m12s  status=OK",
  "[2026-04-30 08:01:21] ✓ llm-sql-gen  query=\"revenue by merchant\"  tokens=312  latency=0.9s  status=OK",
  "[2026-04-30 08:01:24] ✓ airflow:dag_run  dag=payment_eltl  tasks=12  duration=6m48s  status=OK",
  "[2026-04-30 08:01:27] ✓ rag:retrieval  top_k=8  rerank=true  latency=1.1s  store=pgvector  status=OK",
  "[2026-04-30 08:01:30] ✓ snowpipe:trip-events  records=41,892  lag=4.2min  warehouse=COMPUTE_WH  status=OK",
  "[2026-04-30 08:01:33] ✓ dbt:freshness  source=aris_payments  age=3m12s  threshold=30m  status=OK",
  "[2026-04-30 08:01:36] ✓ anomaly-detect  merchants=142  flagged=3  model=isolation_forest  status=OK",
  "[2026-04-30 08:01:39] ✓ pipeline:embedding-sync  chunks=84,201  model=text-embed-3  store=pgvector  status=OK",
  "[2026-04-30 08:01:42] ✓ clickhouse:query  table=payments_gold  rows_scanned=2.1M  latency=42ms  status=OK",
  "[2026-04-30 08:01:45] ✓ github-actions:deploy  env=prod  dbt_models=34  tests=98  duration=3m22s  status=OK",
];

export function HeroDAG() {
  const [hovered, setHovered] = useState<string | null>(null);
  const ordered = [...roles];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--data-cyan) 12%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* header line */}
        <div className="font-mono text-xs text-ink-faint mb-6 flex items-center gap-2">
          <span className="text-signal-green">●</span>
          <span>saiyam@portfolio</span>
          <span className="text-ink-faint/60">~</span>
          <span className="text-data-cyan">main</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-green/50 bg-signal-green/10 px-3 py-1 font-mono text-xs text-signal-green font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green pulse-dot" />
            OPEN TO WORK · Full-time · Boston (Open to Relocation)
          </span>
        </div>
        <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-ink">
          <span className="text-data-cyan">{">"}</span> Saiyam Doshi
        </h1>
        <p className="mt-3 max-w-2xl font-mono text-base sm:text-lg text-ink">
          <span className="text-signal-green font-bold">Data Engineer</span> · AI & LLM Infrastructure
          <span className="blink ml-1 text-signal-green">▍</span>
        </p>
        <p className="mt-1 max-w-2xl font-mono text-sm sm:text-base text-ink-dim">
          I build the data pipelines, RAG systems, and retrieval infrastructure AI products run on — at terabyte scale.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
          <button
            onClick={() => scrollTo("experience")}
            className="rounded-md border border-signal-green/40 bg-signal-green/10 px-4 py-2 text-signal-green hover:bg-signal-green/20 transition-colors"
          >
            [ ./view --experience ]
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-md border border-hairline bg-panel-elevated px-4 py-2 text-ink-dim hover:text-data-cyan hover:border-data-cyan/40 transition-colors"
          >
            [ ./contact ]
          </button>
        </div>

        {/* Live pipeline ticker */}
        <div className="mt-8 overflow-hidden rounded border border-hairline bg-panel/60 py-2">
          <motion.div
            className="flex gap-8 whitespace-nowrap font-mono text-[11px] text-ink-faint"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
              <span key={i} className="shrink-0">
                {line.replace("status=OK", "")}<span className="text-signal-green font-semibold">status=OK</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* DAG */}
        <div className="mt-10">
          <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            // <span className="text-data-cyan font-bold tracking-widest">career.dag</span> — chronological data flow
          </div>

          {/* Desktop horizontal */}
          <div className="hidden md:flex items-stretch gap-2 lg:gap-3">
            {ordered.map((r, i) => (
              <Fragment key={r.id}>
                <div className="flex-1 min-w-0 flex">
                  <DagCard
                    role={r}
                    hovered={hovered}
                    setHovered={setHovered}
                    index={i}
                  />
                </div>
                {i < ordered.length - 1 && <Arrow />}
              </Fragment>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-3">
            {ordered.map((r, i) => (
              <div key={r.id}>
                <DagCard role={r} hovered={hovered} setHovered={setHovered} index={i} />
                {i < ordered.length - 1 && (
                  <div className="flex justify-center my-1">
                    <svg width="20" height="32" viewBox="0 0 20 32">
                      <line
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="32"
                        stroke="var(--data-cyan)"
                        strokeWidth="1.5"
                        className="flow-line"
                      />
                      <polygon points="6,24 14,24 10,32" fill="var(--data-cyan)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type NodeProps = {
  role: (typeof roles)[number];
  hovered: string | null;
  setHovered: (id: string | null) => void;
  index: number;
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 64 40"
      preserveAspectRatio="none"
      className="shrink-0 self-center w-6 lg:w-10 xl:w-16 h-10"
    >
      <line
        x1="0"
        y1="20"
        x2="56"
        y2="20"
        stroke="var(--data-cyan)"
        strokeWidth="1.5"
        className="flow-line"
        vectorEffect="non-scaling-stroke"
      />
      <polygon points="56,14 64,20 56,26" fill="var(--data-cyan)" />
    </svg>
  );
}

function DagCard({ role, hovered, setHovered, index }: NodeProps) {
  const isHovered = hovered === role.id;
  const dim = hovered && !isHovered;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: dim ? 0.45 : 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
      onMouseEnter={() => setHovered(role.id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        const el = document.getElementById(`role-${role.id}`);
        if (el) {
          history.replaceState(null, "", `#role-${role.id}`);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={`group relative text-left rounded-lg border bg-panel p-4 font-mono transition-all w-full ${
        isHovered
          ? "border-data-cyan/60 glow-cyan -translate-y-0.5"
          : "border-hairline hover:border-data-cyan/40"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest text-ink-faint">
          {role.start} → {role.end}
        </span>
        <span className="flex items-center gap-1.5 text-[10px]">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              role.status === "running" ? "bg-signal-green pulse-dot" : "bg-ink-faint/60"
            }`}
          />
          <span
            className={role.status === "running" ? "text-signal-green" : "text-ink-faint"}
          >
            {role.status}
          </span>
        </span>
      </div>
      <div className="text-base font-bold text-ink truncate">{role.company}</div>
      <div className="text-sm text-ink-dim font-medium truncate">{role.role}</div>
      <div className="mt-3 pt-3 border-t border-hairline text-sm text-data-cyan font-medium leading-snug">
        {role.headline}
      </div>

      {/* Stack tags on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 4, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="mt-2 flex flex-wrap gap-1">
              {role.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-hairline bg-panel-elevated text-ink-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
