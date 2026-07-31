"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [linked, setLinked] = useState(true);

  const setAll = (value: number) => {
    setTl(value);
    setTr(value);
    setBr(value);
    setBl(value);
  };

  const corners: { label: string; value: number; setValue: (n: number) => void }[] = [
    { label: "Top left", value: tl, setValue: (n) => (linked ? setAll(n) : setTl(n)) },
    { label: "Top right", value: tr, setValue: (n) => (linked ? setAll(n) : setTr(n)) },
    { label: "Bottom right", value: br, setValue: (n) => (linked ? setAll(n) : setBr(n)) },
    { label: "Bottom left", value: bl, setValue: (n) => (linked ? setAll(n) : setBl(n)) },
  ];

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-4 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" checked={linked} onChange={(e) => setLinked(e.target.checked)} />
          Link all corners
        </label>

        {corners.map((c) => (
          <label key={c.label} className="mb-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span className="w-28 shrink-0">{c.label}</span>
            <input
              type="range"
              min={0}
              max={150}
              value={c.value}
              onChange={(e) => c.setValue(Number(e.target.value))}
              className="mx-3 flex-1 accent-neutral-900 dark:accent-white"
            />
            <span className="w-12 shrink-0 text-right">{c.value}px</span>
          </label>
        ))}
      </div>

      <div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900">
          <div
            className="h-28 w-40 bg-gradient-to-br from-blue-500 to-violet-500"
            style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
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
