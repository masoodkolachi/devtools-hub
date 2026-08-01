"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "");
  const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function Requirement({ label, pass }: { label: string; pass: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${pass ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
        {pass ? <Check size={12} /> : <X size={12} />}
      </span>
      <span className="text-neutral-600 dark:text-neutral-300">{label}</span>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState("#1F2937");
  const [background, setBackground] = useState("#FFFFFF");

  const ratio = contrastRatio(foreground, background);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Text color</span>
          <div className="mt-1 flex items-center gap-2">
            <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} className="h-9 w-9 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
            <input value={foreground} onChange={(e) => setForeground(e.target.value)} className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none" />
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Background color</span>
          <div className="mt-1 flex items-center gap-2">
            <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="h-9 w-9 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
            <input value={background} onChange={(e) => setBackground(e.target.value)} className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none" />
          </div>
        </label>
      </div>

      <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 p-6 text-center" style={{ backgroundColor: background, color: foreground }}>
        <p className="text-2xl font-semibold">The quick brown fox</p>
        <p className="mt-1 text-sm">Sample body text at normal size, for reference.</p>
      </div>

      {ratio ? (
        <>
          <p className="mt-4 text-center text-3xl font-semibold text-neutral-900 dark:text-white">{ratio.toFixed(2)}:1</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Requirement label="AA — normal text (4.5:1)" pass={ratio >= 4.5} />
            <Requirement label="AA — large text (3:1)" pass={ratio >= 3} />
            <Requirement label="AAA — normal text (7:1)" pass={ratio >= 7} />
            <Requirement label="AAA — large text (4.5:1)" pass={ratio >= 4.5} />
          </div>
        </>
      ) : (
        <p className="mt-4 text-center text-sm text-red-500">Enter two valid hex colors to calculate contrast.</p>
      )}
    </div>
  );
}
