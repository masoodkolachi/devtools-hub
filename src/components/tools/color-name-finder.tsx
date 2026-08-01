"use client";

import { useState } from "react";

const NAMED_COLORS: [string, string][] = [
  ["Black", "#000000"], ["White", "#FFFFFF"], ["Red", "#FF0000"], ["Lime", "#00FF00"], ["Blue", "#0000FF"],
  ["Yellow", "#FFFF00"], ["Cyan", "#00FFFF"], ["Magenta", "#FF00FF"], ["Silver", "#C0C0C0"], ["Gray", "#808080"],
  ["Maroon", "#800000"], ["Olive", "#808000"], ["Green", "#008000"], ["Purple", "#800080"], ["Teal", "#008080"],
  ["Navy", "#000080"], ["Orange", "#FFA500"], ["Pink", "#FFC0CB"], ["Brown", "#A52A2A"], ["Coral", "#FF7F50"],
  ["Salmon", "#FA8072"], ["Gold", "#FFD700"], ["Khaki", "#F0E68C"], ["Violet", "#EE82EE"], ["Indigo", "#4B0082"],
  ["Turquoise", "#40E0D0"], ["Tomato", "#FF6347"], ["Orchid", "#DA70D6"], ["Plum", "#DDA0DD"], ["Crimson", "#DC143C"],
  ["Chocolate", "#D2691E"], ["Tan", "#D2B48C"], ["SkyBlue", "#87CEEB"], ["SlateGray", "#708090"], ["Beige", "#F5F5DC"],
  ["Ivory", "#FFFFF0"], ["Lavender", "#E6E6FA"], ["SteelBlue", "#4682B4"], ["ForestGreen", "#228B22"], ["HotPink", "#FF69B4"],
  ["Firebrick", "#B22222"], ["SeaGreen", "#2E8B57"], ["RoyalBlue", "#4169E1"], ["Chartreuse", "#7FFF00"], ["Sienna", "#A0522D"],
  ["MidnightBlue", "#191970"], ["DarkOrange", "#FF8C00"], ["DeepPink", "#FF1493"], ["MediumPurple", "#9370DB"], ["LightCoral", "#F08080"],
];

function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "");
  const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function colorDistance(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

export default function ColorNameFinder() {
  const [hex, setHex] = useState("#3B82F6");

  const rgb = hexToRgb(hex);
  const nearest = rgb
    ? NAMED_COLORS.map(([name, nHex]) => {
        const nRgb = hexToRgb(nHex)!;
        return { name, hex: nHex, distance: colorDistance(rgb, nRgb) };
      }).sort((a, b) => a.distance - b.distance)
    : [];

  return (
    <div>
      <div className="flex items-center gap-3">
        <input type="color" value={rgb ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-10 w-10 cursor-pointer rounded-lg border border-black/10 dark:border-white/10 bg-transparent" />
        <input value={hex} onChange={(e) => setHex(e.target.value)} className="w-40 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none" />
      </div>

      {!rgb && <p className="mt-2 text-xs text-red-500">Enter a valid hex color.</p>}

      {rgb && nearest.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
            <div className="h-16 w-16 shrink-0 rounded-lg border border-black/10 dark:border-white/10" style={{ backgroundColor: hex }} />
            <div>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">{nearest[0].name}</p>
              <p className="text-sm text-neutral-400">Closest named color match</p>
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-neutral-400">Other close matches</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {nearest.slice(1, 9).map((c) => (
              <div key={c.name} className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-2">
                <div className="h-6 w-6 shrink-0 rounded border border-black/10 dark:border-white/10" style={{ backgroundColor: c.hex }} />
                <span className="truncate text-xs text-neutral-600 dark:text-neutral-300">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
