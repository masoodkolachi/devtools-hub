"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const NUMERALS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(num: number): string {
  let n = num;
  let result = "";
  for (const [value, symbol] of NUMERALS) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number | null {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const cleaned = roman.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(cleaned)) return null;
  let total = 0;
  for (let i = 0; i < cleaned.length; i++) {
    const current = map[cleaned[i]];
    const next = map[cleaned[i + 1]];
    if (next && current < next) total -= current;
    else total += current;
  }
  // Round-trip check — catches invalid forms like "IIII" or "VV" that would
  // otherwise silently produce a number.
  return toRoman(total) === cleaned ? total : null;
}

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState("1994");
  const [roman, setRoman] = useState("MCMXCIV");
  const [lastEdited, setLastEdited] = useState<"number" | "roman">("number");

  const handleNumberChange = (value: string) => {
    setNumber(value);
    setLastEdited("number");
    const n = parseInt(value, 10);
    if (!Number.isNaN(n) && n > 0 && n < 4000) setRoman(toRoman(n));
  };

  const handleRomanChange = (value: string) => {
    setRoman(value);
    setLastEdited("roman");
    const n = fromRoman(value);
    if (n !== null) setNumber(String(n));
  };

  const numberValid = (() => {
    const n = parseInt(number, 10);
    return !Number.isNaN(n) && n > 0 && n < 4000;
  })();
  const romanValid = fromRoman(roman) !== null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Number (1–3999)</span>
          <input
            value={number}
            onChange={(e) => handleNumberChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
        </label>
        {lastEdited === "number" && !numberValid && number && (
          <p className="mt-1 text-xs text-red-500">Enter a whole number from 1 to 3999.</p>
        )}
      </div>
      <div>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Roman numeral</span>
          <div className="mt-1 flex gap-2">
            <input
              value={roman}
              onChange={(e) => handleRomanChange(e.target.value)}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
            />
            <CopyButton getValue={() => roman} label="" className="shrink-0 px-2.5" />
          </div>
        </label>
        {lastEdited === "roman" && !romanValid && roman && (
          <p className="mt-1 text-xs text-red-500">Not a valid Roman numeral.</p>
        )}
      </div>
    </div>
  );
}
