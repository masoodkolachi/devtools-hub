"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

interface Match {
  match: string;
  index: number;
  groups?: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Contact us at hello@example.com or support@devtools.dev for help.");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as Match[], error: null };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const results: Match[] = [];
      let m: RegExpExecArray | null;
      let iterations = 0;
      while ((m = re.exec(text)) !== null && iterations < 1000) {
        results.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (m[0] === "") re.lastIndex++;
        iterations++;
      }
      return { matches: results, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regular expression" };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    const parts: { text: string; isMatch: boolean }[] = [];
    let last = 0;
    for (const m of matches) {
      if (m.index > last) parts.push({ text: text.slice(last, m.index), isMatch: false });
      parts.push({ text: m.match || "", isMatch: true });
      last = m.index + (m.match?.length || 0);
    }
    if (last < text.length) parts.push({ text: text.slice(last), isMatch: false });
    return parts;
  }, [matches, text, error]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Pattern</span>
          <div className="mt-1 flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <span className="text-neutral-400">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-transparent font-mono text-sm outline-none"
            />
            <span className="text-neutral-400">/{flags}</span>
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Flags</span>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Test string</span>
        <button
          onClick={() => setText("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
      />

      <div className="mt-4">
        <p className="text-xs font-medium text-neutral-400">
          {error ? "Error" : `${matches.length} match${matches.length === 1 ? "" : "es"}`}
        </p>
        <div className="mt-1.5 min-h-[4rem] whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 font-mono text-sm">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : highlighted ? (
            highlighted.map((p, i) =>
              p.isMatch ? (
                <mark key={i} className="rounded bg-amber-200 dark:bg-amber-500/40 px-0.5">
                  {p.text}
                </mark>
              ) : (
                <span key={i}>{p.text}</span>
              )
            )
          ) : (
            <span className="text-neutral-400">No matches yet.</span>
          )}
        </div>

        {matches.some((m) => m.groups && m.groups.length > 0) && (
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-medium text-neutral-400">Capture groups</p>
            {matches.map((m, i) => (
              <p key={i} className="font-mono text-xs text-neutral-600 dark:text-neutral-300">
                Match {i + 1}: {m.groups?.map((g, gi) => `$${gi + 1}=${g ?? ""}`).join("  ")}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
