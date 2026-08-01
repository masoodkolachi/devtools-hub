"use client";

import { useState } from "react";
import Papa from "papaparse";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const CSV_EXAMPLE = "name,category,live\nUUID Generator,Developer,true\nJSON Formatter,JSON,true";
const JSON_EXAMPLE = '[\n  {"name": "UUID Generator", "category": "Developer", "live": true},\n  {"name": "JSON Formatter", "category": "JSON", "live": true}\n]';

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<"csv-to-json" | "json-to-csv">("csv-to-json");
  const [input, setInput] = useState(CSV_EXAMPLE);

  let output = "";
  let error: string | null = null;

  if (input.trim()) {
    if (mode === "csv-to-json") {
      const result = Papa.parse(input.trim(), { header: true, skipEmptyLines: true, dynamicTyping: true });
      if (result.errors.length > 0) {
        error = result.errors[0].message;
      } else {
        output = JSON.stringify(result.data, null, 2);
      }
    } else {
      try {
        const parsed = JSON.parse(input);
        const rows = Array.isArray(parsed) ? parsed : [parsed];
        output = Papa.unparse(rows);
      } catch (e) {
        error = e instanceof Error ? e.message : "Input must be a JSON array of objects.";
      }
    }
  }

  const handleSwap = () => {
    const next = mode === "csv-to-json" ? "json-to-csv" : "csv-to-json";
    setMode(next);
    setInput(output || (next === "csv-to-json" ? CSV_EXAMPLE : JSON_EXAMPLE));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button
            onClick={() => setMode("csv-to-json")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "csv-to-json" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            CSV → JSON
          </button>
          <button
            onClick={() => setMode("json-to-csv")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "json-to-csv" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            JSON → CSV
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
            {mode === "csv-to-json" ? "CSV input (first row = headers)" : "JSON input (array of objects)"}
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
            {mode === "csv-to-json" ? "JSON output" : "CSV output"}
          </p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
