"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function GradientGenerator() {
  const [colorA, setColorA] = useState("#3B82F6");
  const [colorB, setColorB] = useState("#8B5CF6");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css =
    type === "linear"
      ? `background: linear-gradient(${angle}deg, ${colorA}, ${colorB});`
      : `background: radial-gradient(circle, ${colorA}, ${colorB});`;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button
            onClick={() => setType("linear")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              type === "linear" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            Linear
          </button>
          <button
            onClick={() => setType("radial")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              type === "radial" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            Radial
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Color A
            <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Color B
            <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
          </label>
        </div>

        {type === "linear" && (
          <label className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span>Angle: {angle}°</span>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="ml-4 w-2/3 accent-neutral-900 dark:accent-white"
            />
          </label>
        )}
      </div>

      <div>
        <div
          className="h-48 rounded-xl border border-black/10 dark:border-white/10"
          style={{
            background:
              type === "linear"
                ? `linear-gradient(${angle}deg, ${colorA}, ${colorB})`
                : `radial-gradient(circle, ${colorA}, ${colorB})`,
          }}
        />
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
          <code className="truncate text-sm text-neutral-800 dark:text-neutral-100">{css}</code>
          <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
        </div>
      </div>
    </div>
  );
}
