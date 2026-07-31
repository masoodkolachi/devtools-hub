"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function randomInt(min: number, max: number) {
  const range = max - min + 1;
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return min + (bytes[0] % range);
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (min > max) {
      setError("Min must be less than or equal to Max.");
      return;
    }
    const rangeSize = max - min + 1;
    if (!allowDuplicates && count > rangeSize) {
      setError(`Can't pick ${count} unique numbers from a range of only ${rangeSize}.`);
      return;
    }
    setError(null);

    if (allowDuplicates) {
      setResults(Array.from({ length: count }, () => randomInt(min, max)));
    } else {
      const pool = new Set<number>();
      while (pool.size < count) pool.add(randomInt(min, max));
      setResults(Array.from(pool));
    }
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Min</span>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Max</span>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">How many</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} />
          Allow duplicates
        </label>
        <button
          onClick={handleGenerate}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Generate
        </button>
        <CopyButton getValue={() => results.join(", ")} label="Copy all" />
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <div className="mt-4 min-h-[6rem] rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4">
        {results.length === 0 ? (
          <p className="text-sm text-neutral-400">No numbers yet — click Generate.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 px-3 py-1.5 font-mono text-sm text-neutral-800 dark:text-neutral-100"
              >
                {n}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
