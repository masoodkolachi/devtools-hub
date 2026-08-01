"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

type Mode = "characters" | "words" | "lines";

function reverseText(text: string, mode: Mode): string {
  if (mode === "characters") return [...text].reverse().join("");
  if (mode === "words") return text.split(/(\s+)/).reverse().join("");
  return text.split("\n").reverse().join("\n");
}

export default function TextReverser() {
  const [input, setInput] = useState("The quick brown fox jumps over the lazy dog");
  const [mode, setMode] = useState<Mode>("characters");

  const output = reverseText(input, mode);

  return (
    <div>
      <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
        {(["characters", "words", "lines"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors ${
              mode === m ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input</p>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">Reversed ({mode})</p>
            <CopyButton getValue={() => output} />
          </div>
          <pre className="min-h-[9rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
