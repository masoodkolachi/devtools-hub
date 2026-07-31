"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const GROUPS: { title: string; items: { pattern: string; meaning: string }[] }[] = [
  {
    title: "Character classes",
    items: [
      { pattern: ".", meaning: "Any character except newline" },
      { pattern: "\\d", meaning: "Any digit (0-9)" },
      { pattern: "\\D", meaning: "Any non-digit" },
      { pattern: "\\w", meaning: "Word character (letters, digits, underscore)" },
      { pattern: "\\W", meaning: "Non-word character" },
      { pattern: "\\s", meaning: "Whitespace character" },
      { pattern: "\\S", meaning: "Non-whitespace character" },
      { pattern: "[abc]", meaning: "Any of a, b, or c" },
      { pattern: "[^abc]", meaning: "Any character except a, b, or c" },
      { pattern: "[a-z]", meaning: "Any lowercase letter" },
    ],
  },
  {
    title: "Anchors",
    items: [
      { pattern: "^", meaning: "Start of string (or line, with m flag)" },
      { pattern: "$", meaning: "End of string (or line, with m flag)" },
      { pattern: "\\b", meaning: "Word boundary" },
      { pattern: "\\B", meaning: "Not a word boundary" },
    ],
  },
  {
    title: "Quantifiers",
    items: [
      { pattern: "*", meaning: "0 or more" },
      { pattern: "+", meaning: "1 or more" },
      { pattern: "?", meaning: "0 or 1 (optional)" },
      { pattern: "{n}", meaning: "Exactly n times" },
      { pattern: "{n,}", meaning: "n or more times" },
      { pattern: "{n,m}", meaning: "Between n and m times" },
      { pattern: "*?", meaning: "0 or more, lazy (shortest match)" },
    ],
  },
  {
    title: "Groups & alternation",
    items: [
      { pattern: "(abc)", meaning: "Capture group" },
      { pattern: "(?:abc)", meaning: "Non-capturing group" },
      { pattern: "(?<name>abc)", meaning: "Named capture group" },
      { pattern: "a|b", meaning: "Match a or b" },
      { pattern: "(?=abc)", meaning: "Positive lookahead" },
      { pattern: "(?!abc)", meaning: "Negative lookahead" },
      { pattern: "(?<=abc)", meaning: "Positive lookbehind" },
      { pattern: "(?<!abc)", meaning: "Negative lookbehind" },
    ],
  },
  {
    title: "Flags",
    items: [
      { pattern: "g", meaning: "Global — find all matches, not just the first" },
      { pattern: "i", meaning: "Case-insensitive" },
      { pattern: "m", meaning: "Multiline — ^ and $ match line boundaries" },
      { pattern: "s", meaning: "Dot matches newline too" },
      { pattern: "u", meaning: "Unicode mode" },
    ],
  },
  {
    title: "Common patterns",
    items: [
      { pattern: "^[\\w.-]+@[\\w.-]+\\.\\w+$", meaning: "Basic email address" },
      { pattern: "^https?:\\/\\/.+", meaning: "URL starting with http(s)" },
      { pattern: "^\\d{3}-\\d{3}-\\d{4}$", meaning: "US phone number (123-456-7890)" },
      { pattern: "^#([0-9a-fA-F]{3}){1,2}$", meaning: "Hex color code" },
      { pattern: "^\\d{4}-\\d{2}-\\d{2}$", meaning: "ISO date (YYYY-MM-DD)" },
    ],
  },
];

export default function RegexCheatSheet() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filteredGroups = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((it) => !q || it.pattern.toLowerCase().includes(q) || it.meaning.toLowerCase().includes(q)),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patterns (e.g. lookahead, email, digit)…"
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4 space-y-6 max-h-[32rem] overflow-y-auto">
        {filteredGroups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">{g.title}</p>
            <div className="mt-2 space-y-1.5">
              {g.items.map((it) => (
                <div
                  key={it.pattern}
                  className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2"
                >
                  <code className="shrink-0 rounded bg-black/5 dark:bg-white/10 px-2 py-1 font-mono text-sm text-neutral-800 dark:text-neutral-100">
                    {it.pattern}
                  </code>
                  <span className="flex-1 text-sm text-neutral-500 dark:text-neutral-400">{it.meaning}</span>
                  <CopyButton getValue={() => it.pattern} label="" className="shrink-0 px-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {filteredGroups.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">No patterns matched.</p>}
      </div>
    </div>
  );
}
