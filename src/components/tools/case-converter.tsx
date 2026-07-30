"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function words(text: string) {
  return text
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean);
}

const converters: Record<string, (text: string) => string> = {
  "UPPERCASE": (t) => t.toUpperCase(),
  "lowercase": (t) => t.toLowerCase(),
  "Title Case": (t) => words(t).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" "),
  "camelCase": (t) =>
    words(t)
      .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
      .join(""),
  "PascalCase": (t) => words(t).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(""),
  "snake_case": (t) => words(t).map((w) => w.toLowerCase()).join("_"),
  "kebab-case": (t) => words(t).map((w) => w.toLowerCase()).join("-"),
};

export default function CaseConverter() {
  const [input, setInput] = useState("");

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
        placeholder="hello developer world"
        rows={3}
        className="mt-3 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
      />

      <div className="mt-4 space-y-2">
        {Object.entries(converters).map(([label, fn]) => {
          const value = input.trim() ? fn(input) : "";
          return (
            <div
              key={label}
              className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-xs text-neutral-400">{label}</p>
                <p className="truncate font-mono text-sm text-neutral-800 dark:text-neutral-100">
                  {value || <span className="text-neutral-400">—</span>}
                </p>
              </div>
              <CopyButton getValue={() => value} label="" className="shrink-0 px-2.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
