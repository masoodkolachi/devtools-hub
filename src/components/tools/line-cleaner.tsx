"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export default function LineCleaner() {
  const [input, setInput] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(true);

  let lines = input.split("\n");
  if (trimLines) lines = lines.map((l) => l.trim());
  if (removeEmpty) lines = lines.filter((l) => l.length > 0);
  if (removeDuplicates) {
    const seen = new Set<string>();
    lines = lines.filter((l) => {
      const key = caseSensitive ? l : l.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  const output = lines.join("\n");

  const inputLineCount = input ? input.split("\n").length : 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />
          Remove duplicate lines
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          Remove empty lines
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
          Trim whitespace
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case sensitive
        </label>
        <button
          onClick={() => setInput("")}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input ({inputLineCount} lines)</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"apple\nbanana\napple\n\ncherry"}
            rows={10}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">Output ({lines.length} lines)</p>
            <CopyButton getValue={() => output} />
          </div>
          <pre className="min-h-[15rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {output || <span className="text-neutral-400">Cleaned text will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
