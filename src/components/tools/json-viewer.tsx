"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function TreeNode({ label, value, depth }: { label: string; value: JsonValue; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const isContainer = value !== null && typeof value === "object";

  if (!isContainer) {
    const colorClass =
      typeof value === "string"
        ? "text-emerald-600 dark:text-emerald-400"
        : typeof value === "number"
        ? "text-blue-600 dark:text-blue-400"
        : typeof value === "boolean"
        ? "text-amber-600 dark:text-amber-400"
        : "text-neutral-400";
    return (
      <div className="flex gap-2 py-0.5 pl-5 font-mono text-sm">
        <span className="text-neutral-500">{label}:</span>
        <span className={colorClass}>{value === null ? "null" : JSON.stringify(value)}</span>
      </div>
    );
  }

  const entries = Array.isArray(value) ? value.map((v, i) => [String(i), v] as const) : Object.entries(value);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 py-0.5 font-mono text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="text-neutral-500">{label}:</span>
        <span className="text-neutral-400">
          {Array.isArray(value) ? `Array(${value.length})` : `Object(${entries.length})`}
        </span>
      </button>
      {open && (
        <div className="ml-3 border-l border-black/10 dark:border-white/10 pl-2">
          {entries.map(([k, v]) => (
            <TreeNode key={k} label={k} value={v} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const EXAMPLE = '{\n  "name": "Ada",\n  "active": true,\n  "roles": ["admin", "editor"],\n  "address": {"city": "London", "zip": null}\n}';

export default function JsonViewer() {
  const [input, setInput] = useState(EXAMPLE);

  let parsed: JsonValue | null = null;
  let error: string | null = null;
  try {
    if (input.trim()) parsed = JSON.parse(input);
  } catch (e) {
    error = e instanceof Error ? e.message : "Invalid JSON";
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">JSON input</span>
          <button
            onClick={() => setInput("")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          className="mt-2 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
        />
      </div>
      <div>
        <p className="mb-1.5 text-xs font-medium text-neutral-400">Tree view</p>
        <div className="min-h-[20rem] overflow-auto rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!error && parsed !== null && <TreeNode label="root" value={parsed} depth={0} />}
          {!error && parsed === null && <p className="text-sm text-neutral-400">Paste JSON to see it as a tree.</p>}
        </div>
      </div>
    </div>
  );
}
