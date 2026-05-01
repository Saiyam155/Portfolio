import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { SectionHeader } from "./ExperienceLog";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="./projects" sub="// repos worth a read" />
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={`group rounded-lg border bg-panel p-5 font-mono hover:bg-panel-elevated transition-all flex flex-col ${
                p.featured
                  ? "border-data-purple/50 hover:border-data-purple"
                  : "border-hairline hover:border-data-cyan/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-ink-faint mb-1">
                    {p.period}
                  </div>
                  <div className={`text-lg font-bold group-hover:underline ${p.featured ? "text-data-purple" : "text-data-cyan"}`}>
                    {p.name}
                  </div>
                  <div className="text-base text-ink font-medium">{p.tagline}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {p.featured && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded border border-data-purple/50 bg-data-purple/10 text-data-purple uppercase tracking-wider font-mono">
                      AI PROJECT
                    </span>
                  )}
                  <ExternalLink className={`h-4 w-4 text-ink-faint ${p.featured ? "group-hover:text-data-purple" : "group-hover:text-data-cyan"}`} />
                </div>
              </div>

              {/* Architecture diagram */}
              {p.architecture && (
                <div className="mt-4">
                  <ArchitectureDiagram arch={p.architecture} />
                </div>
              )}

              <p className="mt-4 text-base text-ink-dim leading-relaxed font-sans">
                {p.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-signal-amber" />
                <span className="text-ink-faint">{p.language}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded border border-hairline bg-background text-ink-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
