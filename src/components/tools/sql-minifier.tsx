"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = `SELECT
  id,
  name,
  email
FROM users
WHERE active = true
  AND created_at > '2025-01-01'
ORDER BY created_at DESC
LIMIT 20;`;

function minify(sql: string) {
  return sql
    .replace(/--.*$/gm, "") // strip line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // strip block comments
    .replace(/\s+/g, " ")
    .replace(/\s*([,()])\s*/g, (_, c) => (c === "," ? ", " : c))
    .trim();
}

export default function SqlMinifier() {
  const [input, setInput] = useState(EXAMPLE);
  const output = input.trim() ? minify(input) : "";

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setInput("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} />
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input SQL</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Minified SQL</p>
          <pre className="min-h-[14rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {output || <span className="text-neutral-400">Minified SQL will appear here.</span>}
          </pre>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        Strips comments and collapses whitespace onto one line — doesn&apos;t rename identifiers or change query logic.
      </p>
    </div>
  );
}
