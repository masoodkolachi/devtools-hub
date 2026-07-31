"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function BoxShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(4);
  const [blur, setBlur] = useState(12);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(20);
  const [inset, setInset] = useState(false);

  const rgba = () => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
  };

  const css = `box-shadow: ${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${rgba()};`;

  const sliders: { label: string; value: number; setValue: (n: number) => void; min: number; max: number }[] = [
    { label: "Horizontal offset", value: x, setValue: setX, min: -50, max: 50 },
    { label: "Vertical offset", value: y, setValue: setY, min: -50, max: 50 },
    { label: "Blur radius", value: blur, setValue: setBlur, min: 0, max: 100 },
    { label: "Spread", value: spread, setValue: setSpread, min: -50, max: 50 },
    { label: "Opacity (%)", value: opacity, setValue: setOpacity, min: 0, max: 100 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        {sliders.map((s) => (
          <label key={s.label} className="mb-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span className="w-36 shrink-0">{s.label}</span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => s.setValue(Number(e.target.value))}
              className="mx-3 flex-1 accent-neutral-900 dark:accent-white"
            />
            <span className="w-10 shrink-0 text-right">{s.value}</span>
          </label>
        ))}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Color
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
            Inset
          </label>
        </div>
      </div>

      <div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900">
          <div
            className="h-24 w-40 rounded-xl bg-white dark:bg-neutral-800"
            style={{ boxShadow: `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${rgba()}` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
          <code className="truncate text-sm text-neutral-800 dark:text-neutral-100">{css}</code>
          <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
        </div>
      </div>
    </div>
  );
}
