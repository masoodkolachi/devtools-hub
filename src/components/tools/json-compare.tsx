"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

type DiffEntry = { path: string; type: "added" | "removed" | "changed"; left?: unknown; right?: unknown };

function diff(a: unknown, b: unknown, path = "$"): DiffEntry[] {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    return [{ path, type: "changed", left: a, right: b }];
  }
  if (a === null || b === null || typeof a !== "object") {
    return a === b ? [] : [{ path, type: "changed", left: a, right: b }];
  }
  const entries: DiffEntry[] = [];
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const keys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
  for (const key of keys) {
    const childPath = Array.isArray(a) ? `${path}[${key}]` : `${path}.${key}`;
    if (!(key in aObj)) {
      entries.push({ path: childPath, type: "added", right: bObj[key] });
    } else if (!(key in bObj)) {
      entries.push({ path: childPath, type: "removed", left: aObj[key] });
    } else {
      entries.push(...diff(aObj[key], bObj[key], childPath));
    }
  }
  return entries;
}

function format(value: unknown) {
  if (value === undefined) return "—";
  return typeof value === "string" ? value : JSON.stringify(value);
}

export default function JsonCompare() {
  const [left, setLeft] = useState('{"name":"Ada","version":1,"tags":["math"]}');
  const [right, setRight] = useState('{"name":"Ada","version":2,"tags":["math","dev"]}');

  let entries: DiffEntry[] = [];
  let error: string | null = null;
  try {
    if (left.trim() && right.trim()) {
      entries = diff(JSON.parse(left), JSON.parse(right));
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Both sides must be valid JSON.";
  }

  const badgeStyles: Record<DiffEntry["type"], string> = {
    added: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    removed: "bg-red-500/15 text-red-600 dark:text-red-400",
    changed: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  };

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
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Left JSON</p>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Right JSON</p>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-neutral-400">
          {error ? "Error" : `${entries.length} difference${entries.length === 1 ? "" : "s"}`}
        </p>
        <div className="mt-1.5 min-h-[4rem] space-y-1.5">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!error && entries.length === 0 && (left || right) && (
            <p className="text-sm text-neutral-400">No differences — both sides are identical.</p>
          )}
          {!error &&
            entries.map((entry, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2 text-sm"
              >
                <span className={`rounded px-1.5 py-0.5 text-xs font-medium capitalize ${badgeStyles[entry.type]}`}>
                  {entry.type}
                </span>
                <span className="font-mono text-neutral-500">{entry.path}</span>
                {entry.type !== "added" && (
                  <span className="font-mono text-red-500 line-through">{format(entry.left)}</span>
                )}
                {entry.type !== "removed" && (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{format(entry.right)}</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
