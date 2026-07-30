"use client";

import { useState } from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, generateUuid)
  );

  const handleGenerate = () => {
    setUuids(Array.from({ length: Math.min(Math.max(count, 1), 100) }, generateUuid));
  };

  const handleClear = () => setUuids([]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Count
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </label>

        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Generate
        </button>

        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>

        <CopyButton getValue={() => uuids.join("\n")} label="Copy all" className="ml-auto" />
      </div>

      <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm min-h-[10rem]">
        {uuids.length === 0 ? (
          <p className="text-neutral-400">No UUIDs yet — click Generate.</p>
        ) : (
          <ul className="space-y-1">
            {uuids.map((id, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-neutral-700 dark:text-neutral-300">
                <span>{id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
