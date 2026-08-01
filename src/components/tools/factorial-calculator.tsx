"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function factorial(n: number): bigint {
  let result = BigInt(1);
  for (let i = BigInt(2); i <= BigInt(n); i++) result *= i;
  return result;
}

export default function FactorialCalculator() {
  const [input, setInput] = useState("10");
  const n = parseInt(input, 10);
  const valid = input.trim() !== "" && Number.isInteger(n) && n >= 0 && n <= 5000;

  const result = valid ? factorial(n) : null;
  const resultStr = result !== null ? result.toString() : "";

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">n (0–5000)</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-lg outline-none"
        />
      </label>

      {!valid && input && <p className="mt-2 text-xs text-red-500">Enter a whole number from 0 to 5000 (larger values produce numbers too large to display usefully).</p>}

      {result !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">
              {n}! — {resultStr.length.toLocaleString()} digit{resultStr.length === 1 ? "" : "s"}
            </p>
            <CopyButton getValue={() => resultStr} />
          </div>
          <pre className="mt-1.5 max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {resultStr}
          </pre>
        </div>
      )}
    </div>
  );
}
