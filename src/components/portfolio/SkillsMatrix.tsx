import { skills } from "@/lib/portfolio-data";
import { SectionHeader } from "./ExperienceLog";

export function SkillsMatrix() {
  return (
    <section id="skills" className="border-b border-hairline bg-panel/30">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="./skills" sub="// $ ls -la ~/skills" />
        <div className="mt-8 rounded-lg border border-hairline bg-panel font-mono overflow-hidden">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 p-4 ${
                group.highlight ? "border-data-purple/40 bg-data-purple/5" : ""
              } ${i < skills.length - 1 ? "border-b border-hairline" : ""}`}
            >
              <div className={`text-base font-semibold flex items-center gap-2 ${group.highlight ? "text-data-purple" : "text-data-cyan"}`}>
                {group.highlight && (
                  <span className="h-1.5 w-1.5 rounded-full bg-data-purple pulse-dot shrink-0" />
                )}
                <span>
                  {!group.highlight && <span className="text-ink-faint">drwxr-xr-x </span>}
                  {group.category}/
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className={`text-sm px-2.5 py-1 rounded border transition-colors ${
                      group.highlight
                        ? "border-data-purple/40 bg-data-purple/10 text-data-purple hover:bg-data-purple/20"
                        : "border-hairline bg-panel-elevated text-ink-dim hover:text-signal-green hover:border-signal-green/40"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-12 font-mono">
        <SectionHeader title="./education" />
        <div className="mt-6 space-y-2 text-sm">
          <CommitLine
            hash="a1f3c92"
            range="Sep 2023 – Aug 2025"
            title="Northeastern University"
            subtitle="M.S. Computer Information Systems"
          />
          <CommitLine
            hash="7d2e8b4"
            range="Jun 2019 – Jul 2023"
            title="Dwarkadas J Sanghvi College of Engineering"
            subtitle="B.E. Electronics & Telecommunication"
          />
        </div>
      </div>
    </section>
  );
}

function CommitLine({
  hash,
  range,
  title,
  subtitle,
}: {
  hash: string;
  range: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-3 py-2 rounded hover:bg-panel-elevated transition-colors">
      <span className="text-signal-amber">{hash}</span>
      <span className="text-ink-faint text-xs">{range}</span>
      <span className="text-ink font-semibold">{title}</span>
      <span className="text-ink-dim text-xs">— {subtitle}</span>
    </div>
  );
}
