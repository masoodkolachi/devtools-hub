"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const PRESETS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
};

export default function CubicBezierGenerator() {
  const [p1x, setP1x] = useState(0.25);
  const [p1y, setP1y] = useState(0.1);
  const [p2x, setP2x] = useState(0.25);
  const [p2y, setP2y] = useState(1);

  const css = `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;
  const transition = `transition-timing-function: ${css};`;

  const applyPreset = (name: string) => {
    const [a, b, c, d] = PRESETS[name];
    setP1x(a);
    setP1y(b);
    setP2x(c);
    setP2y(d);
  };

  // SVG coordinate space: 0-200 in both axes, y flipped (CSS y grows down, we want up)
  const toSvg = (x: number, y: number) => `${x * 200} ${200 - y * 200}`;

  const sliders = [
    { label: "P1 x", value: p1x, setValue: setP1x, min: 0, max: 1 },
    { label: "P1 y", value: p1y, setValue: setP1y, min: -0.5, max: 1.5 },
    { label: "P2 x", value: p2x, setValue: setP2x, min: 0, max: 1 },
    { label: "P2 y", value: p2y, setValue: setP2y, min: -0.5, max: 1.5 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-1 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {sliders.map((s) => (
            <label key={s.label} className="mb-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
              <span className="w-14 shrink-0">{s.label}</span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={0.01}
                value={s.value}
                onChange={(e) => s.setValue(Number(e.target.value))}
                className="mx-3 flex-1 accent-neutral-900 dark:accent-white"
              />
              <span className="w-12 shrink-0 text-right font-mono text-xs">{s.value.toFixed(2)}</span>
            </label>
          ))}
        </div>

        <div className="mt-2 flex items-start justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3">
          <code className="text-sm text-neutral-800 dark:text-neutral-100">{transition}</code>
          <CopyButton getValue={() => transition} label="" className="shrink-0 px-2.5" />
        </div>
      </div>

      <div>
        <svg viewBox="0 0 200 200" className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50">
          <line x1="0" y1="200" x2="200" y2="0" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-black/10 dark:text-white/10" />
          <path d={`M 0 200 C ${toSvg(p1x, p1y)}, ${toSvg(p2x, p2y)}, 200 0`} fill="none" stroke="#3B82F6" strokeWidth="3" />
          <circle cx={p1x * 200} cy={200 - p1y * 200} r="5" fill="#3B82F6" />
          <circle cx={p2x * 200} cy={200 - p2y * 200} r="5" fill="#8B5CF6" />
        </svg>
        <p className="mt-2 text-center text-xs text-neutral-400">Blue point = P1, purple point = P2</p>
      </div>
    </div>
  );
}
