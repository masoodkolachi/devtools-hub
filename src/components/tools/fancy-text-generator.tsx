"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function mapAlphanumeric(text: string, upperBase: number, lowerBase: number, digitBase: number | null): string {
  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(upperBase + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(lowerBase + (code - 97));
      if (digitBase !== null && code >= 48 && code <= 57) return String.fromCodePoint(digitBase + (code - 48));
      return c;
    })
    .join("");
}

const CIRCLED_DIGITS = ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468"];

function toCircled(text: string): string {
  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
      if (code >= 48 && code <= 57) return CIRCLED_DIGITS[code - 48];
      return c;
    })
    .join("");
}

const FLIP_MAP: Record<string, string> = {
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F", g: "\u0183", h: "\u0265",
  i: "\u0131", j: "\u027E", k: "\u029E", l: "l", m: "\u026F", n: "u", o: "o", p: "d", q: "b",
  r: "\u0279", s: "s", t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x", y: "\u028E", z: "z",
  A: "\u2200", B: "\u0299", C: "\u0186", D: "\u15E1", E: "\u018E", F: "\u2132", G: "\u2141", H: "H",
  I: "I", J: "\u017F", K: "\u029E", L: "\u2142", M: "W", N: "N", O: "O", P: "\u0500", Q: "\u038C",
  R: "\u1D1A", S: "S", T: "\u22A5", U: "\u2229", V: "\u039B", W: "M", X: "X", Y: "\u2144", Z: "Z",
  "1": "\u0196", "2": "\u1105", "3": "\u0190", "4": "\u3123", "5": "\u03DB", "6": "9", "7": "\u3125",
  "8": "8", "9": "6", "0": "0", ".": "\u02D9", ",": "'", "'": ",", "?": "\u00BF", "!": "\u00A1",
};

function flipText(text: string): string {
  return [...text].reverse().map((c) => FLIP_MAP[c] ?? c).join("");
}

const STYLES: { name: string; fn: (t: string) => string }[] = [
  { name: "Bold", fn: (t) => mapAlphanumeric(t, 0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Sans-serif", fn: (t) => mapAlphanumeric(t, 0x1d5a0, 0x1d5ba, 0x1d7e2) },
  { name: "Sans-serif Bold", fn: (t) => mapAlphanumeric(t, 0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { name: "Monospace", fn: (t) => mapAlphanumeric(t, 0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Fullwidth", fn: (t) => mapAlphanumeric(t, 0xff21, 0xff41, 0xff10) },
  { name: "Circled", fn: toCircled },
  { name: "Upside Down", fn: flipText },
];

export default function FancyTextGenerator() {
  const [input, setInput] = useState("Hello World");

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Your text</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-lg outline-none"
        />
      </label>

      <div className="mt-4 space-y-2">
        {STYLES.map((s) => {
          const value = input ? s.fn(input) : "";
          return (
            <div key={s.name} className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
              <div className="min-w-0">
                <p className="text-xs text-neutral-400">{s.name}</p>
                <p className="truncate text-lg text-neutral-800 dark:text-neutral-100">{value || "—"}</p>
              </div>
              <CopyButton getValue={() => value} label="" className="shrink-0 px-2.5" />
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-neutral-400">
        These use real Unicode characters, not images or fonts — they&apos;ll paste as text anywhere, though some
        apps and older devices may not render every style correctly.
      </p>
    </div>
  );
}
