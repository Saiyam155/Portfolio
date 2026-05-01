export function StatusBar() {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-hairline bg-data-cyan/10 backdrop-blur-md font-mono text-[11px]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-1.5 text-ink-dim">
        <span className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" className="fill-current">
            <path d="M2 0v10l3-2 3 2V0z" />
          </svg>
          main ●
        </span>
        <span>UTF-8</span>
        <span>TypeScript React</span>
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-green pulse-dot" />
          <span>pipeline healthy</span>
        </span>
      </div>
    </footer>
  );
}
