"use client";

import { useState } from "react";

const UNITS = ["Bits", "Bytes", "KB", "MB", "GB", "TB", "PB"] as const;
type Unit = (typeof UNITS)[number];

// Bytes per unit (decimal, 1000-based — matches how storage vendors label capacity).
const BYTES_PER_UNIT: Record<Unit, number> = {
  Bits: 1 / 8,
  Bytes: 1,
  KB: 1000,
  MB: 1000 ** 2,
  GB: 1000 ** 3,
  TB: 1000 ** 4,
  PB: 1000 ** 5,
};

export default function DataSizeConverter() {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState<Unit>("GB");

  const bytes = value * BYTES_PER_UNIT[unit];

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as Unit)}
          className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-1.5">
        {UNITS.map((u) => (
          <div
            key={u}
            className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${
              u === unit
                ? "border-neutral-900/20 dark:border-white/30 bg-neutral-900/5 dark:bg-white/10"
                : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
            }`}
          >
            <span className="text-sm text-neutral-500">{u}</span>
            <span className="font-mono text-sm text-neutral-800 dark:text-neutral-100">
              {(bytes / BYTES_PER_UNIT[u]).toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        Uses decimal (1000-based) units, matching how storage manufacturers label capacity — not the 1024-based
        binary units (KiB, MiB) some operating systems display.
      </p>
    </div>
  );
}
