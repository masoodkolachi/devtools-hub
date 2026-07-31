"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function GridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [columnGap, setColumnGap] = useState(12);
  const [rowGap, setRowGap] = useState(12);

  const css = `display: grid;\ngrid-template-columns: repeat(${columns}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ncolumn-gap: ${columnGap}px;\nrow-gap: ${rowGap}px;`;

  const sliders = [
    { label: "Columns", value: columns, setValue: setColumns, min: 1, max: 8 },
    { label: "Rows", value: rows, setValue: setRows, min: 1, max: 6 },
    { label: "Column gap", value: columnGap, setValue: setColumnGap, min: 0, max: 48 },
    { label: "Row gap", value: rowGap, setValue: setRowGap, min: 0, max: 48 },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {sliders.map((s) => (
          <label key={s.label} className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span className="w-24 shrink-0">{s.label}</span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => s.setValue(Number(e.target.value))}
              className="mx-3 flex-1 accent-neutral-900 dark:accent-white"
            />
            <span className="w-10 shrink-0 text-right">{s.value}{s.label.includes("gap") ? "px" : ""}</span>
          </label>
        ))}
      </div>

      <div
        className="mt-4 min-h-[12rem] rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 p-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          columnGap,
          rowGap,
        }}
      >
        {Array.from({ length: columns * rows }, (_, i) => (
          <div key={i} className="flex items-center justify-center rounded-lg bg-violet-500 text-sm font-medium text-white">
            {i + 1}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3">
        <pre className="whitespace-pre-wrap font-mono text-sm text-neutral-800 dark:text-neutral-100">{css}</pre>
        <CopyButton getValue={() => css} label="" className="shrink-0 px-2.5" />
      </div>
    </div>
  );
}
