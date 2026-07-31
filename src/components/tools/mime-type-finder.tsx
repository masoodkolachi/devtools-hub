"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const MIME_TYPES: { ext: string; mime: string }[] = [
  { ext: "html", mime: "text/html" },
  { ext: "htm", mime: "text/html" },
  { ext: "css", mime: "text/css" },
  { ext: "js", mime: "text/javascript" },
  { ext: "mjs", mime: "text/javascript" },
  { ext: "json", mime: "application/json" },
  { ext: "xml", mime: "application/xml" },
  { ext: "csv", mime: "text/csv" },
  { ext: "txt", mime: "text/plain" },
  { ext: "md", mime: "text/markdown" },
  { ext: "pdf", mime: "application/pdf" },
  { ext: "zip", mime: "application/zip" },
  { ext: "tar", mime: "application/x-tar" },
  { ext: "gz", mime: "application/gzip" },
  { ext: "png", mime: "image/png" },
  { ext: "jpg", mime: "image/jpeg" },
  { ext: "jpeg", mime: "image/jpeg" },
  { ext: "gif", mime: "image/gif" },
  { ext: "svg", mime: "image/svg+xml" },
  { ext: "webp", mime: "image/webp" },
  { ext: "ico", mime: "image/x-icon" },
  { ext: "mp3", mime: "audio/mpeg" },
  { ext: "wav", mime: "audio/wav" },
  { ext: "mp4", mime: "video/mp4" },
  { ext: "webm", mime: "video/webm" },
  { ext: "avi", mime: "video/x-msvideo" },
  { ext: "woff", mime: "font/woff" },
  { ext: "woff2", mime: "font/woff2" },
  { ext: "ttf", mime: "font/ttf" },
  { ext: "otf", mime: "font/otf" },
  { ext: "doc", mime: "application/msword" },
  { ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { ext: "xls", mime: "application/vnd.ms-excel" },
  { ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { ext: "wasm", mime: "application/wasm" },
  { ext: "yaml", mime: "application/yaml" },
  { ext: "yml", mime: "application/yaml" },
];

export default function MimeTypeFinder() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase().replace(/^\./, "");
  const filtered = MIME_TYPES.filter(
    (m) => !q || m.ext.includes(q) || m.mime.toLowerCase().includes(q)
  );

  return (
    <div>
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search extension (e.g. json) or MIME type (e.g. image)…"
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4 max-h-[26rem] space-y-1.5 overflow-y-auto">
        {filtered.map((m) => (
          <div
            key={m.ext}
            className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5"
          >
            <span className="font-mono text-sm text-neutral-500">.{m.ext}</span>
            <span className="flex-1 truncate px-3 font-mono text-sm text-neutral-800 dark:text-neutral-100">{m.mime}</span>
            <CopyButton getValue={() => m.mime} label="" className="shrink-0 px-2.5" />
          </div>
        ))}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">No matches found.</p>}
      </div>
    </div>
  );
}
