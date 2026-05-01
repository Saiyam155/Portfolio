import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { contact } from "@/lib/portfolio-data";
import { SectionHeader } from "./ExperienceLog";

const lines: { key: string; label: string; value: string; href?: string; copy?: boolean }[] = [
  { key: "email", label: "email", value: contact.email, href: `mailto:${contact.email}`, copy: true },
  { key: "phone", label: "phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`, copy: true },
  { key: "linkedin", label: "linkedin", value: "/in/saiyam-doshi", href: contact.linkedin },
  { key: "github", label: "github", value: "/saiyam155", href: contact.github },
  { key: "location", label: "location", value: contact.location },
];

export function ContactTerminal() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (k: string, v: string) => {
    navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="contact" className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader title="./contact" sub="// reach out — i reply within 24h" />
        <div className="mt-8 rounded-lg border border-hairline bg-panel overflow-hidden font-mono">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-hairline bg-panel-elevated text-xs text-ink-faint">
            <span className="h-2.5 w-2.5 rounded-full bg-signal-red/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-green/80" />
            <span className="ml-2">bash — 80×24</span>
          </div>
          <div className="p-5 text-sm">
            <div className="text-ink">
              <span className="text-signal-green">saiyam@portfolio</span>
              <span className="text-ink-faint">:</span>
              <span className="text-data-cyan">~</span>
              <span className="text-ink-faint">$</span>{" "}
              <span className="text-ink">contact --me</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {lines.map((l) => (
                <div key={l.key} className="flex items-center gap-3 group">
                  <span className="text-signal-green shrink-0">{">"}</span>
                  <span className="text-ink-faint w-20 shrink-0">{l.label}:</span>
                  {l.href ? (
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-data-cyan hover:underline truncate"
                    >
                      {l.value}
                    </a>
                  ) : (
                    <span className="text-ink-dim">{l.value}</span>
                  )}
                  {l.copy && (
                    <button
                      onClick={() => copy(l.key, l.value)}
                      aria-label={`Copy ${l.label}`}
                      className="ml-auto opacity-0 group-hover:opacity-100 text-ink-faint hover:text-signal-green transition-all"
                    >
                      {copied === l.key ? (
                        <Check className="h-3.5 w-3.5 text-signal-green" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-ink">
              <span className="text-signal-green">saiyam@portfolio</span>
              <span className="text-ink-faint">:</span>
              <span className="text-data-cyan">~</span>
              <span className="text-ink-faint">$</span>{" "}
              <span className="blink text-signal-green">▍</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
