"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function shiftChar(char: string, shift: number): string {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
  return char;
}

function caesarShift(text: string, shift: number) {
  return [...text].map((c) => shiftChar(c, shift)).join("");
}

export default function CaesarCipher() {
  const [input, setInput] = useState("Meet me at midnight");
  const [shift, setShift] = useState(3);

  const encoded = input ? caesarShift(input, shift) : "";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Text</span>
        <button onClick={() => setInput("")} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none" />

      <label className="mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <span>Shift: {shift}</span>
        <input type="range" min={-25} max={25} value={shift} onChange={(e) => setShift(Number(e.target.value))} className="ml-4 w-2/3 accent-neutral-900 dark:accent-white" />
      </label>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
        <p className="text-neutral-800 dark:text-neutral-100">{encoded || <span className="text-neutral-400">Result will appear here.</span>}</p>
        <CopyButton getValue={() => encoded} label="" className="shrink-0 px-2.5" />
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        To decode, use the negative of the shift you originally encoded with (e.g. shifted by 3 → decode with -3).
        This is a classic substitution cipher for puzzles and learning — not secure for real secrets.
      </p>
    </div>
  );
}
