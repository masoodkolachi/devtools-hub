"use client";

import { useState } from "react";
import { html as beautifyHtml } from "js-beautify";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = `<!DOCTYPE html>
<html>
<head><title>Example</title></head>
<body>
<!-- main content -->
<div class="card"><h1>Hello</h1><p>Welcome to the page.</p></div>
</body>
</html>`;

function minifyHtml(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // strip comments
    .replace(/>\s+</g, "><") // collapse whitespace between tags
    .replace(/\s+/g, " ")
    .trim();
}

export default function HtmlMinifierBeautifier() {
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [input, setInput] = useState(EXAMPLE);

  const output = !input.trim()
    ? ""
    : mode === "beautify"
    ? beautifyHtml(input, { indent_size: 2, wrap_line_length: 0 })
    : minifyHtml(input);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button
            onClick={() => setMode("beautify")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "beautify" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            Beautify
          </button>
          <button
            onClick={() => setMode("minify")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              mode === "minify" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            Minify
          </button>
        </div>
        <button
          onClick={() => setInput("")}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Input HTML</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">Output</p>
          <pre className="min-h-[16.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
