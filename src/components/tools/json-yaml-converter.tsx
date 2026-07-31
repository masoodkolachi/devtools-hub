"use client";

import { useState } from "react";
import { dump, load } from "js-yaml";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE_JSON = '{\n  "name": "Ada",\n  "roles": ["admin", "editor"],\n  "active": true\n}';

export default function JsonYamlConverter() {
  const [mode, setMode] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const [input, setInput] = useState(EXAMPLE_JSON);

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      output =
        mode === "json-to-yaml"
          ? dump(JSON.parse(input))
          : JSON.stringify(load(input), null, 2);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not parse input.";
  }

  const handleSwap = () => {
    setMode((m) => (m === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml"));
    setInput(output || input);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button
            onClick={() => setMode("json-to-yaml")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "json-to-yaml" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            JSON → YAML
          </button>
          <button
            onClick={() => setMode("yaml-to-json")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "yaml-to-json" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            YAML → JSON
          </button>
        </div>

        <button
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowRightLeft size={14} /> Swap
        </button>

        <button
          onClick={() => setInput("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>

        <CopyButton getValue={() => output} className="ml-auto" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">
            {mode === "json-to-yaml" ? "JSON input" : "YAML input"}
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">
            {mode === "json-to-yaml" ? "YAML output" : "JSON output"}
          </p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
