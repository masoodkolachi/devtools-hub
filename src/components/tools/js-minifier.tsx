"use client";

import { useEffect, useState } from "react";
import { minify } from "terser";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = `function greet(name) {
  const message = "Hello, " + name + "!";
  console.log(message);
  return message;
}`;

function formatBytes(n: number) {
  return n < 1024 ? `${n} B` : `${(n / 1024).toFixed(2)} KB`;
}

export default function JsMinifier() {
  const [input, setInput] = useState(EXAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!input.trim()) {
      Promise.resolve().then(() => {
        if (!cancelled) {
          setOutput("");
          setError(null);
        }
      });
      return () => {
        cancelled = true;
      };
    }
    minify(input, { compress: true, mangle: true })
      .then((result) => {
        if (cancelled) return;
        setOutput(result.code ?? "");
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setOutput("");
        setError(e instanceof Error ? e.message : "Couldn't minify this code.");
      });
    return () => {
      cancelled = true;
    };
  }, [input]);

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings = originalSize > 0 && output ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

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
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input JavaScript — {formatBytes(originalSize)}</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">
            Minified — {output ? formatBytes(minifiedSize) : "…"}
            {savings > 0 && <span className="text-emerald-500"> ({savings}% smaller)</span>}
          </p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Minified code will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
