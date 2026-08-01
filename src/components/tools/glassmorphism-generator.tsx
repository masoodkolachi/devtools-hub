"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function GlassmorphismGenerator() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(20);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [radius, setRadius] = useState(16);
  const [bgColor, setBgColor] = useState("#ffffff");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  const { r, g, b } = hexToRgb(bgColor);

  const background = `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
  const borderColor = `rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)})`;

  const css = `background: ${background};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder-radius: ${radius}px;\nborder: 1px solid ${borderColor};`;

  const sliders = [
    { label: "Blur", value: blur, setValue: setBlur, min: 0, max: 40, unit: "px" },
    { label: "Background opacity", value: opacity, setValue: setOpacity, min: 0, max: 100, unit: "%" },
    { label: "Border opacity", value: borderOpacity, setValue: setBorderOpacity, min: 0, max: 100, unit: "%" },
    { label: "Border radius", value: radius, setValue: setRadius, min: 0, max: 48, unit: "px" },
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
            <span className="w-12 shrink-0 text-right">
              {s.value}
              {s.unit}
            </span>
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Glass tint
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent"
          />
        </label>
      </div>

      <div>
        <div
          className="flex h-48 items-center justify-center rounded-xl p-6"
          style={{
            background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
          }}
        >
          <div
            className="flex h-28 w-48 items-center justify-center text-sm font-medium text-white"
            style={{
              background,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              borderRadius: `${radius}px`,
              border: `1px solid ${borderColor}`,
            }}
          >
            Glass panel
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3">
          <pre className="whitespace-pre-wrap font-mono text-sm text-neutral-800 dark:text-neutral-100">{css}</pre>
          <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
        </div>
      </div>
    </div>
  );
}
