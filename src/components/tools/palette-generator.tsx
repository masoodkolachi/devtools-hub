"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
      <div className="h-16" style={{ backgroundColor: hex }} />
      <div className="flex items-center justify-between px-3 py-2">
        <div>
          <p className="text-xs text-neutral-400">{label}</p>
          <p className="font-mono text-sm text-neutral-800 dark:text-neutral-100">{hex}</p>
        </div>
        <CopyButton getValue={() => hex} label="" className="shrink-0 px-2" />
      </div>
    </div>
  );
}

export default function PaletteGenerator() {
  const [base, setBase] = useState("#3B82F6");
  const [h, s, l] = hexToHsl(base);

  const shades = [-30, -15, 0, 15, 30].map((delta) => hslToHex(h, s, Math.min(95, Math.max(5, l + delta))));
  const complementary = hslToHex(h + 180, s, l);
  const analogous = [h - 30, h + 30].map((hue) => hslToHex(hue, s, l));
  const triadic = [h + 120, h + 240].map((hue) => hslToHex(hue, s, l));

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
        />
        <input
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="w-32 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
        />
        <span className="text-xs text-neutral-400">Pick a base color to build palettes from</span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Shades &amp; tints</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {shades.map((hex, i) => (
            <Swatch key={i} hex={hex} label={["Darkest", "Dark", "Base", "Light", "Lightest"][i]} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Complementary</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Swatch hex={base} label="Base" />
          <Swatch hex={complementary} label="Complementary" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Analogous</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <Swatch hex={analogous[0]} label="-30°" />
          <Swatch hex={base} label="Base" />
          <Swatch hex={analogous[1]} label="+30°" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Triadic</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <Swatch hex={base} label="Base" />
          <Swatch hex={triadic[0]} label="+120°" />
          <Swatch hex={triadic[1]} label="+240°" />
        </div>
      </div>
    </div>
  );
}
