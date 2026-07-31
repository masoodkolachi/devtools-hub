"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function ClampGenerator() {
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(32);
  const [minViewport, setMinViewport] = useState(400);
  const [maxViewport, setMaxViewport] = useState(1400);
  const [previewViewport, setPreviewViewport] = useState(800);

  // Standard fluid-typography formula: derive a slope + intercept so the
  // value scales linearly between the two viewport widths, then clamp it.
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intersection = -minViewport * slope + minSize;
  const preferredVw = (slope * 100).toFixed(4);
  const preferredRem = (intersection / 16).toFixed(4);

  const clampValue = `clamp(${minSize / 16}rem, ${preferredRem}rem + ${preferredVw}vw, ${maxSize / 16}rem)`;
  const css = `font-size: ${clampValue};`;

  const previewSize = Math.min(maxSize, Math.max(minSize, intersection + slope * previewViewport));

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Min font size (px)</span>
          <input type="number" value={minSize} onChange={(e) => setMinSize(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Max font size (px)</span>
          <input type="number" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Min viewport width (px)</span>
          <input type="number" value={minViewport} onChange={(e) => setMinViewport(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Max viewport width (px)</span>
          <input type="number" value={maxViewport} onChange={(e) => setMaxViewport(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
      </div>

      <label className="mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <span>Preview at viewport: {previewViewport}px</span>
        <input
          type="range"
          min={200}
          max={2000}
          value={previewViewport}
          onChange={(e) => setPreviewViewport(Number(e.target.value))}
          className="ml-4 w-1/2 accent-neutral-900 dark:accent-white"
        />
      </label>

      <div className="mt-4 flex min-h-[8rem] items-center justify-center overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 p-4">
        <p style={{ fontSize: `${previewSize}px` }} className="font-semibold text-neutral-900 dark:text-white">
          Fluid text
        </p>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3">
        <pre className="whitespace-pre-wrap break-all font-mono text-sm text-neutral-800 dark:text-neutral-100">{css}</pre>
        <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
      </div>
    </div>
  );
}
