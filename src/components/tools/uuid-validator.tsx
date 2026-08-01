"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

const UUID_PATTERN = /^([0-9a-f]{8})-([0-9a-f]{4})-([1-8])([0-9a-f]{3})-([89ab][0-9a-f]{3})-([0-9a-f]{12})$/i;

function analyze(input: string) {
  const trimmed = input.trim();
  const match = trimmed.match(UUID_PATTERN);
  if (!match) return null;
  const version = match[3];
  const variantChar = match[5][0].toLowerCase();
  const variant = ["8", "9", "a", "b"].includes(variantChar) ? "RFC 4122" : "Unknown";
  return { version, variant };
}

export default function UuidValidator() {
  const [input, setInput] = useState("550e8400-e29b-41d4-a716-446655440000");

  const result = input.trim() ? analyze(input) : null;
  const isWellFormedStructure = /^[0-9a-f-]{36}$/i.test(input.trim());

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">UUID to validate</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
        />
      </label>

      {input.trim() && (
        <div className={`mt-4 flex items-center gap-2 rounded-xl border p-4 ${result ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}>
          {result ? <Check className="text-emerald-500" size={20} /> : <X className="text-red-500" size={20} />}
          <p className="font-medium text-neutral-900 dark:text-white">
            {result ? "Valid UUID" : isWellFormedStructure ? "Right shape, but not a standard RFC 4122 UUID (bad version/variant bits)" : "Not a valid UUID"}
          </p>
        </div>
      )}

      {result && (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <span className="text-sm text-neutral-500">Version</span>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">v{result.version}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <span className="text-sm text-neutral-500">Variant</span>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{result.variant}</span>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Checks the standard 8-4-4-4-12 hex format along with the version (1-8) and variant bits defined by RFC
        4122 — not just that it&apos;s 36 characters with dashes in the right places.
      </p>
    </div>
  );
}
