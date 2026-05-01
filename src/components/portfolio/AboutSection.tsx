export function AboutSection() {
  return (
    <section id="about" className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="font-mono">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">
            <span className="text-data-cyan">{">"}</span> ./about --me
          </h2>
          <div className="mt-1 text-xs text-ink-faint">
            // cat about.md
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-hairline bg-panel font-mono overflow-hidden">
          <div className="flex items-center gap-2 border-b border-hairline bg-panel-elevated px-4 py-2 text-[11px] text-ink-faint">
            <span className="h-2 w-2 rounded-full bg-signal-red/70" />
            <span className="h-2 w-2 rounded-full bg-signal-amber/70" />
            <span className="h-2 w-2 rounded-full bg-signal-green/70" />
            <span className="ml-2">~/saiyam/about.md</span>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {/* Left: condensed prose */}
            <div className="px-5 sm:px-6 py-6 text-base leading-relaxed text-ink-dim">
              <p>
                <span className="text-signal-green">$</span> Shipped production data and retrieval infrastructure at{" "}
                <a href="#role-aris" className="text-data-cyan hover:underline">Aris Insights</a>{" "}
                end-to-end — powering{" "}
                <span className="text-ink font-semibold">LLM SQL generation</span> and{" "}
                <span className="text-ink font-semibold">AI-assisted anomaly detection</span> across{" "}
                <span className="text-signal-amber font-bold">5TB+</span> of payment data.
                Now building retrieval and RAG infra at{" "}
                <a href="#role-humanitarians" className="text-data-cyan font-semibold hover:underline">Humanitarians AI</a>.
                Most AI systems fail at the{" "}
                <span className="text-signal-amber font-semibold">data layer</span> before they fail at the model layer — that's the layer I work on.
                <span className="blink ml-1 text-signal-green">▍</span>
              </p>
            </div>

            {/* Right: env-dump */}
            <div className="px-5 sm:px-6 py-6 text-base space-y-2">
              {[
                ["LOCATION", "Boston, MA"],
                ["OPEN_TO", "Full-time · Contract"],
                ["FOCUS", "RAG infra · LLM pipelines · Data Eng"],
                ["CURRENT", "humanitarians.ai (volunteer)"],
                ["GITHUB", "github.com/saiyam155"],
                ["EMAIL", "saiyamndoshi@gmail.com"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-data-cyan font-semibold shrink-0">{key}</span>
                  <span className="text-ink-faint">=</span>
                  <span className="text-ink font-medium">{val}</span>
                </div>
              ))}
              <span className="blink text-signal-green">▍</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
