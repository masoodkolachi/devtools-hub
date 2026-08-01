"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function TextShadowGenerator() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(50);
  const [textColor, setTextColor] = useState("#3B82F6");

  const rgba = () => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
  };

  const css = `text-shadow: ${x}px ${y}px ${blur}px ${rgba()};`;

  const sliders = [
    { label: "Horizontal offset", value: x, setValue: setX, min: -20, max: 20 },
    { label: "Vertical offset", value: y, setValue: setY, min: -20, max: 20 },
    { label: "Blur radius", value: blur, setValue: setBlur, min: 0, max: 30 },
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
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Shadow color
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Text color
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
          </label>
        </div>
      </div>

      <div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900">
          <p style={{ color: textColor, textShadow: `${x}px ${y}px ${blur}px ${rgba()}` }} className="text-4xl font-bold">
            Shadow Text
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
          <code className="truncate text-sm text-neutral-800 dark:text-neutral-100">{css}</code>
          <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
        </div>
      </div>
    </div>
  );
}
