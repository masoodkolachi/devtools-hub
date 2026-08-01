"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

const STOP_WORDS = new Set(["the", "a", "an", "is", "are", "was", "were", "at", "in", "on", "of", "to", "and", "but", "or"]);

export default function WordFrequencyCounter() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog. The dog barks at the fox, but the fox is too quick."
  );
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoreStopWords, setIgnoreStopWords] = useState(false);

  const frequencies = useMemo(() => {
    const words = text.match(/[A-Za-z']+/g) ?? [];
    const counts = new Map<string, number>();
    for (const w of words) {
      const key = caseSensitive ? w : w.toLowerCase();
      if (ignoreStopWords && STOP_WORDS.has(key.toLowerCase())) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [text, caseSensitive, ignoreStopWords]);

  const maxCount = frequencies[0]?.[1] ?? 1;
  const totalWords = (text.match(/[A-Za-z']+/g) ?? []).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Text</span>
        <button
          onClick={() => setText("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
      />

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case sensitive
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={ignoreStopWords} onChange={(e) => setIgnoreStopWords(e.target.checked)} />
          Ignore common words (the, a, is…)
        </label>
        <span className="ml-auto text-xs text-neutral-400">{totalWords} total words, {frequencies.length} unique</span>
      </div>

      <div className="mt-4 max-h-96 space-y-1.5 overflow-y-auto">
        {frequencies.map(([word, count]) => (
          <div key={word} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-sm text-neutral-700 dark:text-neutral-300">{word}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              <div className="h-full bg-blue-500" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <span className="w-8 shrink-0 text-right text-xs text-neutral-400">{count}</span>
          </div>
        ))}
        {frequencies.length === 0 && <p className="text-sm text-neutral-400">No words to count yet.</p>}
      </div>
    </div>
  );
}
