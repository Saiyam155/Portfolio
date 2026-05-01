import { useEffect, useState } from "react";

const navItems = [
  { id: "experience", label: "./experience" },
  { id: "projects", label: "./projects" },
  { id: "skills", label: "./skills" },
  { id: "contact", label: "./contact" },
];

export function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", { hour12: false }) +
          " " +
          Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop(),
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-panel/80 backdrop-blur-md font-mono text-xs">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-signal-red/80" />
          <span className="h-3 w-3 rounded-full bg-signal-amber/80" />
          <span className="h-3 w-3 rounded-full bg-signal-green/80" />
        </div>
        <div className="hidden sm:block text-ink-faint">
          ~/saiyam/<span className="text-ink-dim">portfolio.tsx</span>
        </div>
        <nav className="ml-auto flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="px-2 py-1 rounded text-ink-dim hover:text-data-cyan hover:bg-panel-elevated transition-colors whitespace-nowrap"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-hairline text-ink-faint">
          <span className="h-2 w-2 rounded-full bg-signal-green pulse-dot" />
          <span>healthy</span>
          <span className="text-ink-faint/60">·</span>
          <span>{time}</span>
        </div>
      </div>
    </header>
  );
}
