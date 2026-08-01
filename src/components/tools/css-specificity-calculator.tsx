"use client";

import { useState } from "react";

function calculateSpecificity(selector: string) {
  // Strip contents of attribute selectors/strings so commas/dots inside them
  // don't get miscounted, then count each category with straightforward regexes.
  const cleaned = selector.replace(/\[[^\]]*\]/g, "[]").trim();

  let ids = 0;
  let classes = 0;
  let elements = 0;

  // IDs: #id
  ids += (cleaned.match(/#[a-zA-Z0-9_-]+/g) ?? []).length;

  // Classes, attribute selectors, pseudo-classes (not pseudo-elements)
  classes += (cleaned.match(/\.[a-zA-Z0-9_-]+/g) ?? []).length;
  classes += (cleaned.match(/\[\]/g) ?? []).length;
  classes += (cleaned.match(/:(?!:)[a-zA-Z-]+(?:\([^)]*\))?/g) ?? []).filter((p) => !p.startsWith("::")).length;

  // Pseudo-elements (::before) and plain element/type selectors
  const pseudoElements = (cleaned.match(/::[a-zA-Z-]+/g) ?? []).length;
  elements += pseudoElements;
  const withoutSelectors = cleaned
    .replace(/#[a-zA-Z0-9_-]+/g, "")
    .replace(/\.[a-zA-Z0-9_-]+/g, "")
    .replace(/\[\]/g, "")
    .replace(/::[a-zA-Z-]+/g, "")
    .replace(/:(?!:)[a-zA-Z-]+(?:\([^)]*\))?/g, "")
    .replace(/[>+~,]/g, " ");
  elements += (withoutSelectors.match(/[a-zA-Z][a-zA-Z0-9-]*/g) ?? []).filter((t) => t !== "important").length;

  return { ids, classes, elements };
}

export default function CssSpecificityCalculator() {
  const [selector, setSelector] = useState("#nav ul li.active > a:hover::before");

  const { ids, classes, elements } = calculateSpecificity(selector);
  const specificityString = `${ids}, ${classes}, ${elements}`;
  const weight = ids * 1_000_000 + classes * 1_000 + elements;

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">CSS selector</span>
        <input
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
        />
      </label>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{ids}</p>
          <p className="mt-0.5 text-xs text-neutral-400">IDs</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{classes}</p>
          <p className="mt-0.5 text-xs text-neutral-400">Classes / attrs / pseudo-classes</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{elements}</p>
          <p className="mt-0.5 text-xs text-neutral-400">Elements / pseudo-elements</p>
        </div>
      </div>

      <p className="mt-4 text-center text-lg font-mono text-neutral-900 dark:text-white">({specificityString})</p>
      <p className="text-center text-xs text-neutral-400">Relative weight for comparison: {weight.toLocaleString()}</p>

      <p className="mt-4 text-xs text-neutral-400">
        Specificity is compared category by category, left to right (IDs first, then classes, then elements) — a
        single ID always outweighs any number of classes, regardless of the numeric &quot;weight&quot; shown above,
        which is just a convenient way to sort/compare selectors on this page.
      </p>
    </div>
  );
}
