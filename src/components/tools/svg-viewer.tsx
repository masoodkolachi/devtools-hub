"use client";

import { useState } from "react";
import { Trash2, Upload } from "lucide-react";

const EXAMPLE = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#3B82F6" />
  <text x="50" y="55" font-size="14" text-anchor="middle" fill="white">SVG</text>
</svg>`;

export default function SvgViewer() {
  const [code, setCode] = useState(EXAMPLE);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setCode(String(reader.result ?? ""));
    reader.readAsText(file);
  };

  const isLikelySvg = code.trim().startsWith("<svg") || code.includes("<svg ");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">SVG source</span>
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Upload size={14} /> Upload
              <input
                type="file"
                accept=".svg,image/svg+xml"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
            <button
              onClick={() => setCode("")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={14}
          className="mt-2 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs outline-none"
        />
        {!isLikelySvg && code.trim() && (
          <p className="mt-2 text-xs text-amber-500">This doesn&apos;t look like an SVG — the preview may be blank.</p>
        )}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-neutral-400">Preview</p>
        <div
          className="flex min-h-[20rem] items-center justify-center rounded-xl p-6"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #80808020 25%, transparent 25%), linear-gradient(-45deg, #80808020 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #80808020 75%), linear-gradient(-45deg, transparent 75%, #80808020 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        >
          <iframe
            title="SVG preview"
            srcDoc={`<!DOCTYPE html><html><head><style>html,body{margin:0;height:100%;display:flex;align-items:center;justify-content:center;}svg{max-width:100%;max-height:100%;}</style></head><body>${code}</body></html>`}
            sandbox=""
            className="h-72 w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
