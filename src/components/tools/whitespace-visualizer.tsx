"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function WhitespaceVisualizer() {
  const [text, setText] = useState("Hello  world\t— here's a  line with\u00A0a non-breaking space.\nAnd a second line.");

  const stats = {
    spaces: (text.match(/ /g) ?? []).length,
    tabs: (text.match(/\t/g) ?? []).length,
    newlines: (text.match(/\n/g) ?? []).length,
    nbsp: (text.match(/\u00A0/g) ?? []).length,
    trailingSpaces: (text.match(/ +\n/g) ?? []).length,
  };

  const rendered = text.split("\n").map((line, i) => (
    <div key={i} className="whitespace-pre">
      {[...line].map((char, j) => {
        if (char === " ") return <span key={j} className="text-blue-400">·</span>;
        if (char === "\t") return <span key={j} className="text-amber-500">→   </span>;
        if (char === "\u00A0") return <span key={j} className="rounded bg-red-500/20 text-red-500">␣</span>;
        return <span key={j}>{char}</span>;
      })}
      <span className="text-emerald-500">¶</span>
    </div>
  ));

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Text</span>
        <button onClick={() => setText("")} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none" />

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400">
        <span>{stats.spaces} spaces</span>
        <span>{stats.tabs} tabs</span>
        <span>{stats.newlines} line breaks</span>
        <span>{stats.nbsp} non-breaking spaces</span>
        <span>{stats.trailingSpaces} trailing-space lines</span>
      </div>

      <div className="mt-2">
        <p className="mb-1.5 text-xs font-medium text-neutral-400">
          Visualized (· = space, → = tab, ␣ = non-breaking space, ¶ = line end)
        </p>
        <div className="min-h-[6rem] overflow-auto rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 font-mono text-sm">
          {rendered}
        </div>
      </div>
    </div>
  );
}
