"use client";

import { useState } from "react";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function textToBinary(text: string) {
  return [...text].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

function binaryToText(binary: string) {
  const groups = binary.trim().split(/\s+/).filter(Boolean);
  return groups.map((g) => String.fromCharCode(parseInt(g, 2))).join("");
}

export default function BinaryTextConverter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello!");

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      if (mode === "encode") {
        output = textToBinary(input);
      } else if (!/^[01\s]+$/.test(input.trim())) {
        error = "Binary input should only contain 0s, 1s, and spaces between bytes.";
      } else {
        output = binaryToText(input);
      }
    }
  } catch {
    error = "Couldn't convert this input.";
  }

  const handleSwap = () => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output || input);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button onClick={() => setMode("encode")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === "encode" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Text → Binary
          </button>
          <button onClick={() => setMode("decode")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === "decode" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Binary → Text
          </button>
        </div>
        <button onClick={handleSwap} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <ArrowRightLeft size={14} /> Swap
        </button>
        <button onClick={() => setInput("")} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} className="ml-auto" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">{mode === "encode" ? "Text" : "Binary (8-bit bytes, space separated)"}</p>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none" />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">{mode === "encode" ? "Binary" : "Text"}</p>
          <pre className="min-h-[9rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
