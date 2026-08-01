"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface Schema {
  type: string;
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
}

function inferSchema(value: JsonValue): Schema {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    return { type: "array", items: value.length > 0 ? inferSchema(value[0]) : { type: "any" } };
  }
  if (typeof value === "object") {
    const properties: Record<string, Schema> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(value)) {
      properties[key] = inferSchema(val);
      required.push(key);
    }
    return { type: "object", properties, required };
  }
  if (typeof value === "number") return { type: Number.isInteger(value) ? "integer" : "number" };
  return { type: typeof value };
}

const EXAMPLE = '{\n  "id": 1,\n  "name": "Ada",\n  "active": true,\n  "tags": ["admin", "editor"],\n  "address": {"city": "London", "zip": "SW1A"}\n}';

export default function JsonSchemaGenerator() {
  const [input, setInput] = useState(EXAMPLE);

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      const parsed = JSON.parse(input);
      const schema = { $schema: "http://json-schema.org/draft-07/schema#", ...inferSchema(parsed) };
      output = JSON.stringify(schema, null, 2);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Invalid JSON.";
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <button onClick={() => setInput("")} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} />
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Sample JSON</p>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={14} className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none" />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Inferred JSON Schema</p>
          <pre className="min-h-[20rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Schema will appear here.</span>}
          </pre>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        Infers types and required fields from your sample data — it&apos;s a starting point, not a complete
        schema. It won&apos;t infer constraints like min/max, patterns, or enums that aren&apos;t visible in one example.
      </p>
    </div>
  );
}
