"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function randomHex() {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return "#" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function RandomColorGenerator() {
  const [count, setCount] = useState(6);
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 6 }, randomHex));

  const handleGenerate = () => setColors(Array.from({ length: Math.min(Math.max(count || 1, 1), 30) }, randomHex));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Count
          <input
            type="number"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Generate
        </button>
        <CopyButton getValue={() => colors.join(", ")} label="Copy all" className="ml-auto" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {colors.map((hex, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            <div className="h-20" style={{ backgroundColor: hex }} />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="font-mono text-sm text-neutral-800 dark:text-neutral-100">{hex}</span>
              <CopyButton getValue={() => hex} label="" className="shrink-0 px-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
