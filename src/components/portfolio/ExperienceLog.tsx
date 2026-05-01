import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { roles } from "@/lib/portfolio-data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function ExperienceLog() {
  const [open, setOpen] = useState<string | null>(roles[0].id);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace("#role-", "");
      if (hash && roles.some((r) => r.id === hash)) setOpen(hash);
    };
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <section id="experience" className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="./experience" sub="// click any entry to expand the log" />
        <div className="mt-8 rounded-lg border border-hairline bg-panel font-mono overflow-hidden">
          {roles.map((r, i) => {
            const isOpen = open === r.id;
            return (
              <div
                key={r.id}
                id={`role-${r.id}`}
                className={`scroll-mt-24 ${i < roles.length - 1 ? "border-b border-hairline" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="w-full flex items-start gap-3 px-4 py-4 text-left hover:bg-panel-elevated transition-colors text-base"
                >
                  <ChevronRight
                    className={`h-4 w-4 text-ink-faint transition-transform mt-0.5 shrink-0 ${
                      isOpen ? "rotate-90 text-data-cyan" : ""
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-ink-faint hidden sm:inline text-sm">
                        [{r.start} → {r.end}]
                      </span>
                      <span className="text-ink font-bold">{r.company}</span>
                      <span className="text-ink-dim font-medium">{r.role}</span>
                    </div>
                    {/* Headline visible on collapse */}
                    {!isOpen && (
                      <div className="text-sm text-data-cyan font-medium mt-0.5 truncate pr-4">
                        {r.headline}
                      </div>
                    )}
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs shrink-0 mt-0.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        r.status === "running"
                          ? "bg-signal-green pulse-dot"
                          : "bg-ink-faint/60"
                      }`}
                    />
                    <span
                      className={
                        r.status === "running"
                          ? "text-signal-green"
                          : "text-ink-faint"
                      }
                    >
                      {r.status}
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 space-y-3">
                        <div className="text-sm text-ink-faint mb-1">
                          {r.location} · <span className="text-ink font-semibold">{r.headline}</span>
                        </div>

                        {/* Impact badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {r.impacts.map((impact) => (
                            <span
                              key={impact}
                              className="text-xs px-2 py-0.5 rounded-full border border-signal-amber/30 bg-signal-amber/10 text-signal-amber font-mono"
                            >
                              {impact}
                            </span>
                          ))}
                        </div>

                        <ArchitectureDiagram arch={r.architecture} />
                        <div className="space-y-2 pt-1">
                          {r.bullets.map((b, j) => (
                            <LogLine key={j} text={b} />
                          ))}
                        </div>
                        <div className="pt-3 mt-1 border-t border-hairline flex flex-wrap gap-1.5">
                          {r.stack.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2 py-0.5 rounded border border-hairline bg-panel-elevated text-ink-dim"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LogLine({ text }: { text: string }) {
  const parts = text.split(/(\b\d[\d.,]*\s?(?:TB\+?|GB|M\+?|K\+?|%|hours\/week|x|sources)?)/g);
  return (
    <div className="flex gap-3 text-base leading-relaxed">
      <span className="text-signal-green font-semibold shrink-0 select-none">INFO</span>
      <span className="text-ink-dim">
        {parts.map((p, i) =>
          /^\d/.test(p) ? (
            <span key={i} className="text-signal-amber font-semibold">
              {p}
            </span>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </span>
    </div>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="font-mono pl-4 border-l-2 border-data-cyan">
      <h2 className="text-2xl sm:text-3xl font-bold text-data-cyan">
        <span className="text-ink-faint opacity-60">{">"}</span> {title}
      </h2>
      {sub && <div className="mt-1 text-xs text-ink-faint">{sub}</div>}
    </div>
  );
}
