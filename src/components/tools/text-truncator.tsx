"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function truncate(text: string, limit: number, unit: "characters" | "words", suffix: string, wordBoundary: boolean): string {
  if (unit === "words") {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + suffix;
  }
  if (text.length <= limit) return text;
  let cut = text.slice(0, limit);
  if (wordBoundary) {
    const lastSpace = cut.lastIndexOf(" ");
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  }
  return cut + suffix;
}

export default function TextTruncator() {
  const [text, setText] = useState(
    "This is a long piece of sample text that you might want to truncate down to a shorter excerpt for a meta description, a card preview, or a social media post."
  );
  const [limit, setLimit] = useState(100);
  const [unit, setUnit] = useState<"characters" | "words">("characters");
  const [suffix, setSuffix] = useState("…");
  const [wordBoundary, setWordBoundary] = useState(true);

  const output = truncate(text, limit, unit, suffix, wordBoundary);

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none" />
      </label>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Limit
          <input type="number" min={1} value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="w-20 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none" />
        </label>
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button onClick={() => setUnit("characters")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${unit === "characters" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Characters
          </button>
          <button onClick={() => setUnit("words")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${unit === "words" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Words
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Suffix
          <input value={suffix} onChange={(e) => setSuffix(e.target.value)} className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none" />
        </label>
        {unit === "characters" && (
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <input type="checkbox" checked={wordBoundary} onChange={(e) => setWordBoundary(e.target.checked)} />
            Break at word boundary
          </label>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-400">Result — {output.length} characters</p>
          <CopyButton getValue={() => output} />
        </div>
        <p className="mt-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-sm text-neutral-800 dark:text-neutral-100">
          {output}
        </p>
      </div>
    </div>
  );
}
