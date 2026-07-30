"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function hash(algorithm: (typeof ALGORITHMS)[number], text: string) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      Promise.resolve().then(() => {
        if (!cancelled) setResults({});
      });
      return () => {
        cancelled = true;
      };
    }
    Promise.all(ALGORITHMS.map((alg) => hash(alg, input))).then((values) => {
      if (cancelled) return;
      const next: Record<string, string> = {};
      ALGORITHMS.forEach((alg, i) => (next[alg] = values[i]));
      setResults(next);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div>
      <div className="flex items-center justify-end">
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
        placeholder="Type or paste text to hash…"
        rows={4}
        className="mt-3 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
      />

      <div className="mt-4 space-y-2">
        {ALGORITHMS.map((alg) => (
          <div
            key={alg}
            className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-xs text-neutral-400">{alg}</p>
              <p className="truncate font-mono text-sm text-neutral-800 dark:text-neutral-100">
                {results[alg] || <span className="text-neutral-400">—</span>}
              </p>
            </div>
            <CopyButton getValue={() => results[alg] || ""} label="" className="shrink-0 px-2.5" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        MD5 isn&apos;t included — it&apos;s not supported by the browser&apos;s built-in crypto API and is
        considered cryptographically broken.
      </p>
    </div>
  );
}
