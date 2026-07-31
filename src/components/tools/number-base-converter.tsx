"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const BASES = [
  { label: "Binary", base: 2, prefix: "0b" },
  { label: "Octal", base: 8, prefix: "0o" },
  { label: "Decimal", base: 10, prefix: "" },
  { label: "Hexadecimal", base: 16, prefix: "0x" },
] as const;

export default function NumberBaseConverter() {
  const [decimal, setDecimal] = useState<number | null>(255);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (base: number, value: string) => {
    const cleaned = value.trim();
    if (!cleaned) {
      setDecimal(null);
      setError(null);
      return;
    }
    const parsed = parseInt(cleaned, base);
    if (Number.isNaN(parsed) || parsed < 0) {
      setError(`"${value}" isn't a valid base ${base} number.`);
      return;
    }
    setError(null);
    setDecimal(parsed);
  };

  return (
    <div>
      <div className="space-y-3">
        {BASES.map(({ label, base, prefix }) => (
          <div key={base} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs font-medium text-neutral-400">
              {label} ({prefix || "base 10"})
            </span>
            <input
              value={decimal === null ? "" : decimal.toString(base)}
              onChange={(e) => handleChange(base, e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 font-mono text-sm outline-none"
            />
            <CopyButton getValue={() => (decimal === null ? "" : decimal.toString(base))} label="" className="shrink-0 px-2.5" />
          </div>
        ))}
      </div>
      {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
      <p className="mt-4 text-xs text-neutral-400">
        Type in any field — the others update automatically since they all share the same underlying value.
      </p>
    </div>
  );
}
