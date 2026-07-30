"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned.split("").map((c) => c + c).join("")
      : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function HexRgbConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const rgb = hexToRgb(hex);

  const handleRgbChange = (index: 0 | 1 | 2, value: string) => {
    const current = rgb ?? [0, 0, 0];
    const next = [...current] as [number, number, number];
    next[index] = Number(value) || 0;
    setHex(rgbToHex(...next));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="text-xs font-medium text-neutral-400">Color picker</label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="color"
            value={rgb ? hex : "#000000"}
            onChange={(e) => setHex(e.target.value)}
            className="h-12 w-12 cursor-pointer rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
          />
          <input
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#3B82F6"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
          <CopyButton getValue={() => hex} label="" className="shrink-0 px-2.5" />
        </div>

        {!rgb && <p className="mt-2 text-xs text-red-500">Enter a valid 3 or 6 digit hex color.</p>}

        <div className="mt-4 h-24 w-full rounded-xl border border-black/10 dark:border-white/10" style={{ backgroundColor: rgb ? hex : "transparent" }} />
      </div>

      <div>
        <label className="text-xs font-medium text-neutral-400">RGB values</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["R", "G", "B"].map((label, i) => (
            <div key={label}>
              <p className="mb-1 text-xs text-neutral-400">{label}</p>
              <input
                type="number"
                min={0}
                max={255}
                value={rgb ? rgb[i] : 0}
                onChange={(e) => handleRgbChange(i as 0 | 1 | 2, e.target.value)}
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
          <p className="font-mono text-sm text-neutral-800 dark:text-neutral-100">
            {rgb ? `rgb(${rgb.join(", ")})` : "—"}
          </p>
          <CopyButton getValue={() => (rgb ? `rgb(${rgb.join(", ")})` : "")} label="" className="px-2.5" />
        </div>
      </div>
    </div>
  );
}
