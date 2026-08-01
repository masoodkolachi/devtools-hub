"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

interface DiffToken {
  text: string;
  type: "same" | "added" | "removed";
}

// Word-level LCS-based diff — good enough for prose/config comparisons
// without pulling in a heavier diff library.
function diffWords(a: string, b: string): DiffToken[] {
  const aWords = a.split(/(\s+)/);
  const bWords = b.split(/(\s+)/);
  const m = aWords.length;
  const n = bWords.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = aWords[i] === bWords[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const tokens: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (aWords[i] === bWords[j]) {
      tokens.push({ text: aWords[i], type: "same" });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      tokens.push({ text: aWords[i], type: "removed" });
      i++;
    } else {
      tokens.push({ text: bWords[j], type: "added" });
      j++;
    }
  }
  while (i < m) {
    tokens.push({ text: aWords[i], type: "removed" });
    i++;
  }
  while (j < n) {
    tokens.push({ text: bWords[j], type: "added" });
    j++;
  }
  return tokens;
}

export default function TextDiffChecker() {
  const [left, setLeft] = useState("The quick brown fox jumps over the lazy dog.");
  const [right, setRight] = useState("The quick brown fox leaps over the lazy dog quickly.");

  const tokens = useMemo(() => diffWords(left, right), [left, right]);
  const added = tokens.filter((t) => t.type === "added").length;
  const removed = tokens.filter((t) => t.type === "removed").length;

  return (
    <div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => {
            setLeft("");
            setRight("");
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear both
        </button>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Original text</p>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Changed text</p>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-neutral-400">
          {added} word{added === 1 ? "" : "s"} added, {removed} word{removed === 1 ? "" : "s"} removed
        </p>
        <div className="mt-1.5 min-h-[4rem] whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-sm leading-relaxed">
          {tokens.map((t, i) =>
            t.type === "same" ? (
              <span key={i}>{t.text}</span>
            ) : t.type === "added" ? (
              <span key={i} className="rounded bg-emerald-200 dark:bg-emerald-500/30 text-emerald-900 dark:text-emerald-200">
                {t.text}
              </span>
            ) : (
              <span key={i} className="rounded bg-red-200 dark:bg-red-500/30 text-red-900 dark:text-red-200 line-through">
                {t.text}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
