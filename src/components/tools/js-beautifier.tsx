"use client";

import { useState } from "react";
import { js as beautifyJs } from "js-beautify";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = `function greet(name){const message="Hello, "+name+"!";console.log(message);return message;}`;

export default function JsBeautifier() {
  const [input, setInput] = useState(EXAMPLE);
  const [indent, setIndent] = useState(2);

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      output = beautifyJs(input, { indent_size: indent, space_in_empty_paren: true });
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Couldn't format this code.";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Indent
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
        <button
          onClick={() => setInput("")}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Minified / messy JavaScript</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Formatted output</p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Formatted code will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
