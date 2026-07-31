"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const ALPHABETS = {
  "URL-safe (default)": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-",
  "Alphanumeric only": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "Lowercase + digits": "abcdefghijklmnopqrstuvwxyz0123456789",
  "Digits only": "0123456789",
};

function nanoid(alphabet: string, size: number) {
  const bytes = new Uint32Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export default function NanoIdGenerator() {
  const [alphabetName, setAlphabetName] = useState<keyof typeof ALPHABETS>("URL-safe (default)");
  const [size, setSize] = useState(21);
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => nanoid(ALPHABETS["URL-safe (default)"], 21))
  );

  const handleGenerate = () => {
    const alphabet = ALPHABETS[alphabetName];
    setIds(Array.from({ length: Math.min(Math.max(count || 1, 1), 100) }, () => nanoid(alphabet, size)));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Alphabet
          <select
            value={alphabetName}
            onChange={(e) => setAlphabetName(e.target.value as keyof typeof ALPHABETS)}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          >
            {Object.keys(ALPHABETS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Size
          <input
            type="number"
            min={4}
            max={64}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Count
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Generate
        </button>
        <CopyButton getValue={() => ids.join("\n")} label="Copy all" className="ml-auto" />
      </div>

      <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm min-h-[10rem]">
        {ids.length === 0 ? (
          <p className="text-neutral-400">No IDs yet — click Generate.</p>
        ) : (
          <ul className="space-y-1">
            {ids.map((id, i) => (
              <li key={i} className="text-neutral-700 dark:text-neutral-300">
                {id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
