"use client";

import { useState } from "react";
import { format as formatSql } from "sql-formatter";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = "SELECT id, name, email FROM users WHERE active = true AND created_at > '2025-01-01' ORDER BY created_at DESC LIMIT 20;";

const DIALECTS = ["sql", "mysql", "postgresql", "sqlite", "mariadb", "bigquery"] as const;

export default function SqlFormatter() {
  const [input, setInput] = useState(EXAMPLE);
  const [dialect, setDialect] = useState<(typeof DIALECTS)[number]>("postgresql");
  const [uppercase, setUppercase] = useState(true);

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      output = formatSql(input, { language: dialect, keywordCase: uppercase ? "upper" : "preserve" });
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Couldn't format this SQL.";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Dialect
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value as (typeof DIALECTS)[number])}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          >
            {DIALECTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
          Uppercase keywords
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
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input SQL</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Formatted SQL</p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Formatted SQL will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
