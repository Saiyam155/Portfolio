import type { Architecture } from "@/lib/portfolio-data";

const KIND_COLOR: Record<string, string> = {
  source: "var(--data-purple)",
  process: "var(--signal-amber)",
  store: "var(--data-cyan)",
  serve: "var(--signal-green)",
};

export function ArchitectureDiagram({ arch }: { arch: Architecture }) {
  const n = arch.nodes.length;
  const W = 720;
  const H = 140;
  const padX = 60;
  const stepX = n > 1 ? (W - padX * 2) / (n - 1) : 0;
  const y = H / 2;

  const positions = new Map(
    arch.nodes.map((node, i) => [node.id, { x: padX + stepX * i, y }] as const),
  );

  return (
    <div className="rounded-md border border-hairline bg-panel-elevated/40 p-3 overflow-x-auto">
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-2">
        // architecture
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto min-w-[520px]"
        role="img"
        aria-label="Architecture diagram"
      >
        {/* edges */}
        {arch.edges.map((e, i) => {
          const a = positions.get(e.from);
          const b = positions.get(e.to);
          if (!a || !b) return null;
          return (
            <g key={i}>
              <line
                x1={a.x + 44}
                y1={a.y}
                x2={b.x - 44}
                y2={b.y}
                stroke="var(--data-cyan)"
                strokeWidth="1.5"
                className="flow-line"
              />
              <polygon
                points={`${b.x - 44},${b.y - 4} ${b.x - 36},${b.y} ${b.x - 44},${b.y + 4}`}
                fill="var(--data-cyan)"
              />
            </g>
          );
        })}
        {/* nodes */}
        {arch.nodes.map((node) => {
          const p = positions.get(node.id)!;
          const color = KIND_COLOR[node.kind ?? "process"];
          return (
            <g key={node.id}>
              <rect
                x={p.x - 44}
                y={p.y - 22}
                width={88}
                height={44}
                rx={6}
                fill="var(--panel)"
                stroke={color}
                strokeWidth="1.2"
              />
              <circle cx={p.x - 36} cy={p.y - 14} r={2.5} fill={color} />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--ink)"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-3 font-mono text-[10px] text-ink-faint">
        <Legend color={KIND_COLOR.source} label="source" />
        <Legend color={KIND_COLOR.process} label="process" />
        <Legend color={KIND_COLOR.store} label="store" />
        <Legend color={KIND_COLOR.serve} label="serve" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
