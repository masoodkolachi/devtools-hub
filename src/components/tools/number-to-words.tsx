"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

function threeDigitsToWords(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(ONES[Math.floor(n / 100)] + " hundred");
    n %= 100;
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : ""));
  } else if (n > 0) {
    parts.push(ONES[n]);
  }
  return parts.join(" ");
}

function numberToWords(num: number): string {
  if (num === 0) return "zero";
  const negative = num < 0;
  let n = Math.abs(Math.floor(num));
  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }
  const words = groups
    .map((group, i) => (group > 0 ? `${threeDigitsToWords(group)}${SCALES[i] ? " " + SCALES[i] : ""}` : ""))
    .filter(Boolean)
    .reverse()
    .join(" ");
  return (negative ? "negative " : "") + words;
}

export default function NumberToWords() {
  const [input, setInput] = useState("1234567");

  const num = Number(input);
  const valid = input.trim() !== "" && Number.isFinite(num) && Math.abs(num) < 1e15;
  const words = valid ? numberToWords(num) : "";

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Number</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-lg outline-none"
        />
      </label>

      {!valid && input && <p className="mt-2 text-xs text-red-500">Enter a whole number (decimals aren&apos;t supported).</p>}

      {valid && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
          <p className="capitalize text-neutral-800 dark:text-neutral-100">{words}</p>
          <CopyButton getValue={() => words} label="" className="shrink-0 px-2.5" />
        </div>
      )}
    </div>
  );
}
