"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generate(length: number, opts: Record<keyof typeof SETS, boolean>) {
  const pool = (Object.keys(opts) as (keyof typeof SETS)[])
    .filter((k) => opts[k])
    .map((k) => SETS[k])
    .join("");
  if (!pool) return "";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

function strengthLabel(length: number, activeSets: number) {
  const score = length * activeSets;
  if (score < 30) return { label: "Weak", color: "bg-red-500" };
  if (score < 60) return { label: "Okay", color: "bg-amber-500" };
  if (score < 90) return { label: "Strong", color: "bg-emerald-500" };
  return { label: "Very strong", color: "bg-emerald-600" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, numbers: true, symbols: true });
  const [seed, setSeed] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- `seed` intentionally forces regeneration
  const password = useMemo(() => generate(length, opts), [length, opts, seed]);
  const activeCount = Object.values(opts).filter(Boolean).length;
  const strength = strengthLabel(length, activeCount);

  const toggle = (key: keyof typeof opts) => setOpts((o) => ({ ...o, [key]: !o[key] }));

  return (
    <div>
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="break-all font-mono text-lg text-neutral-800 dark:text-neutral-100">
            {password || "Select at least one character set"}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setSeed((s) => s + 1)}
              aria-label="Regenerate password"
              className="rounded-lg border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
            <CopyButton getValue={() => password} label="" className="px-2.5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div className={`h-full ${strength.color}`} style={{ width: `${Math.min(activeCount * 25, 100)}%` }} />
          </div>
          <span className="text-xs font-medium text-neutral-500">{strength.label}</span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Length: {length}</span>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="ml-4 w-2/3 accent-neutral-900 dark:accent-white"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(SETS) as (keyof typeof SETS)[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm capitalize"
            >
              <input type="checkbox" checked={opts[key]} onChange={() => toggle(key)} />
              {key}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
