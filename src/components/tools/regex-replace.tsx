"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export default function RegexReplace() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+)\\.com");
  const [flags, setFlags] = useState("g");
  const [replacement, setReplacement] = useState("$1 at $2 dot com");
  const [text, setText] = useState("Contact hello@example.com or support@devtools.com for help.");

  const { output, error, matchCount } = useMemo(() => {
    if (!pattern) return { output: text, error: null, matchCount: 0 };
    try {
      const re = new RegExp(pattern, flags);
      const matches = text.match(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"));
      return { output: text.replace(re, replacement), error: null, matchCount: matches?.length ?? 0 };
    } catch (e) {
      return { output: text, error: e instanceof Error ? e.message : "Invalid regular expression", matchCount: 0 };
    }
  }, [pattern, flags, replacement, text]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Pattern</span>
          <div className="mt-1 flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <span className="text-neutral-400">/</span>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full bg-transparent font-mono text-sm outline-none" />
            <span className="text-neutral-400">/{flags}</span>
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Flags</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none" />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="text-xs font-medium text-neutral-400">Replacement (use $1, $2… for capture groups)</span>
        <input value={replacement} onChange={(e) => setReplacement(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none" />
      </label>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Text</span>
        <button
          onClick={() => setText("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none" />

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-400">
            {error ? "Error" : `Result — ${matchCount} replacement${matchCount === 1 ? "" : "s"}`}
          </p>
          <CopyButton getValue={() => output} />
        </div>
        <pre className="mt-1.5 min-h-[6rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 font-mono text-sm">
          {error ? <span className="text-red-500">{error}</span> : output}
        </pre>
      </div>
    </div>
  );
}
