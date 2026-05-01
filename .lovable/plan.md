## Problem

In `src/components/portfolio/HeroDAG.tsx`, the desktop layout uses a hardcoded grid:

```
grid-cols-[1fr_auto_1fr_auto_1fr]
```

That defines 5 column slots (3 cards + 2 arrows), but the portfolio now has **4 roles** (Humanitarians.ai, Aris Insights, SlowRida, Corpack). Rendering 4 cards + 3 arrows = 7 children into a 5-column grid causes the row to wrap and creates the large empty gap the user sees between Humanitarians.ai and Aris Insights at laptop width (770px viewport).

The arrow SVG is also a fixed 64px wide, which is fine on wide screens but contributes to overflow at ~1024–1280px once 4 cards are in play.

## Fix

Replace the rigid grid with a flex row that auto-sizes to the number of roles, and make the arrow shrink on narrower laptop widths.

### Changes in `src/components/portfolio/HeroDAG.tsx`

1. Replace the desktop container:
   ```
   <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
   ```
   with a flex row where each card flexes equally and arrows stay auto-width:
   ```
   <div className="hidden md:flex items-stretch gap-2 lg:gap-3">
     {ordered.map((r, i) => (
       <Fragment key={r.id}>
         <div className="flex-1 min-w-0">
           <DagCard ... />
         </div>
         {i < ordered.length - 1 && <Arrow />}
       </Fragment>
     ))}
   </div>
   ```
   (Drop the `DagNode` wrapper or inline it — its only job was emitting card + arrow.)

2. Make the `Arrow` component responsive so 4 cards fit cleanly between ~1024px and 1440px:
   - width: `w-8 lg:w-12 xl:w-16` (or use an inline responsive svg with `className="shrink-0 w-8 lg:w-12 xl:w-16 h-10"` and `preserveAspectRatio="none"` on the line, keeping the arrowhead as a fixed polygon at the right edge).

3. Ensure `DagCard` already truncates long company/role text — it does (`truncate` is present), so no change needed there.

### Result

- All 4 role cards share the row equally, eliminating the oversized gap between Humanitarians.ai and Aris Insights.
- Arrows scale down on smaller laptop widths so nothing overflows.
- Layout automatically adapts if a 5th role is added later — no more hardcoded column count.

### Files touched
- `src/components/portfolio/HeroDAG.tsx` (desktop grid + Arrow sizing only; mobile vertical layout untouched)
