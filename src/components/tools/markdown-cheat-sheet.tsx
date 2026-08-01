"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const GROUPS: { title: string; items: { syntax: string; result: string }[] }[] = [
  {
    title: "Headings",
    items: [
      { syntax: "# Heading 1", result: "Largest heading" },
      { syntax: "## Heading 2", result: "Second-level heading" },
      { syntax: "### Heading 3", result: "Third-level heading" },
    ],
  },
  {
    title: "Emphasis",
    items: [
      { syntax: "**bold**", result: "Bold text" },
      { syntax: "*italic*", result: "Italic text" },
      { syntax: "~~strikethrough~~", result: "Strikethrough text" },
      { syntax: "`inline code`", result: "Inline code" },
    ],
  },
  {
    title: "Lists",
    items: [
      { syntax: "- Item", result: "Unordered list item" },
      { syntax: "1. Item", result: "Ordered list item" },
      { syntax: "- [ ] Task", result: "Unchecked task box" },
      { syntax: "- [x] Task", result: "Checked task box" },
    ],
  },
  {
    title: "Links & images",
    items: [
      { syntax: "[text](url)", result: "A hyperlink" },
      { syntax: "![alt](url)", result: "An image" },
      { syntax: "[text][ref]", result: "Reference-style link" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { syntax: "> quote", result: "Blockquote" },
      { syntax: "```lang\\ncode\\n```", result: "Fenced code block" },
      { syntax: "---", result: "Horizontal rule" },
    ],
  },
  {
    title: "Tables",
    items: [
      { syntax: "| A | B |\\n|---|---|\\n| 1 | 2 |", result: "A simple table" },
      { syntax: ":---", result: "Left-align column" },
      { syntax: ":---:", result: "Center-align column" },
      { syntax: "---:", result: "Right-align column" },
    ],
  },
];

export default function MarkdownCheatSheet() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((it) => !q || it.syntax.toLowerCase().includes(q) || it.result.toLowerCase().includes(q)),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (e.g. table, bold, link)…"
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4 space-y-6 max-h-[32rem] overflow-y-auto">
        {filtered.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">{g.title}</p>
            <div className="mt-2 space-y-1.5">
              {g.items.map((it) => (
                <div key={it.syntax} className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
                  <code className="shrink-0 rounded bg-black/5 dark:bg-white/10 px-2 py-1 font-mono text-sm text-neutral-800 dark:text-neutral-100">
                    {it.syntax}
                  </code>
                  <span className="flex-1 text-sm text-neutral-500 dark:text-neutral-400">{it.result}</span>
                  <CopyButton getValue={() => it.syntax.replace(/\\n/g, "\n")} label="" className="shrink-0 px-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">No matches.</p>}
      </div>
    </div>
  );
}
