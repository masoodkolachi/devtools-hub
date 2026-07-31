"use client";

import { useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const turndown = new TurndownService();

const MD_EXAMPLE = "# Hello\n\nThis is **bold** text with a [link](https://example.com).";
const HTML_EXAMPLE = "<h1>Hello</h1>\n<p>This is <strong>bold</strong> text with a <a href=\"https://example.com\">link</a>.</p>";

export default function MarkdownHtmlConverter() {
  const [mode, setMode] = useState<"md-to-html" | "html-to-md">("md-to-html");
  const [input, setInput] = useState(MD_EXAMPLE);

  let output = "";
  let error: string | null = null;
  try {
    if (input.trim()) {
      output = mode === "md-to-html" ? (marked.parse(input, { async: false }) as string) : turndown.turndown(input);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Couldn't convert this input.";
  }

  const handleSwap = () => {
    const next = mode === "md-to-html" ? "html-to-md" : "md-to-html";
    setMode(next);
    setInput(output || (next === "md-to-html" ? MD_EXAMPLE : HTML_EXAMPLE));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button
            onClick={() => setMode("md-to-html")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "md-to-html" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            Markdown → HTML
          </button>
          <button
            onClick={() => setMode("html-to-md")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "html-to-md" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            HTML → Markdown
          </button>
        </div>
        <button
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowRightLeft size={14} /> Swap
        </button>
        <button
          onClick={() => setInput("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} className="ml-auto" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">
            {mode === "md-to-html" ? "Markdown input" : "HTML input"}
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">
            {mode === "md-to-html" ? "HTML output" : "Markdown output"}
          </p>
          <pre className="min-h-[14rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
