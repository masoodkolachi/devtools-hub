"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const EXAMPLE = `# Hello\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n\n\`\`\`js\nconsole.log("hi");\n\`\`\``;

export default function MarkdownPreview() {
  const [input, setInput] = useState(EXAMPLE);

  const html = useMemo(() => {
    try {
      return marked.parse(input, { async: false }) as string;
    } catch {
      return "<p>Could not render Markdown.</p>";
    }
  }, [input]);

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <CopyButton getValue={() => input} label="Copy Markdown" />
        <button
          onClick={() => setInput("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
        />
        <div
          className="prose prose-neutral dark:prose-invert prose-sm max-w-none rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
