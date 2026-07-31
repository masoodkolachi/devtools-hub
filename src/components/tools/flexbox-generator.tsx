"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const JUSTIFY = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];
const ALIGN = ["stretch", "flex-start", "flex-end", "center", "baseline"];
const DIRECTION = ["row", "row-reverse", "column", "column-reverse"];
const WRAP = ["nowrap", "wrap", "wrap-reverse"];

function LabeledSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FlexboxGenerator() {
  const [justifyContent, setJustifyContent] = useState("center");
  const [alignItems, setAlignItems] = useState("center");
  const [flexDirection, setFlexDirection] = useState("row");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState(12);
  const [itemCount, setItemCount] = useState(4);

  const css = `display: flex;\nflex-direction: ${flexDirection};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\nflex-wrap: ${flexWrap};\ngap: ${gap}px;`;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledSelect label="justify-content" value={justifyContent} onChange={setJustifyContent} options={JUSTIFY} />
        <LabeledSelect label="align-items" value={alignItems} onChange={setAlignItems} options={ALIGN} />
        <LabeledSelect label="flex-direction" value={flexDirection} onChange={setFlexDirection} options={DIRECTION} />
        <LabeledSelect label="flex-wrap" value={flexWrap} onChange={setFlexWrap} options={WRAP} />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Gap: {gap}px</span>
          <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="ml-4 w-2/3 accent-neutral-900 dark:accent-white" />
        </label>
        <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Items: {itemCount}</span>
          <input type="range" min={1} max={10} value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} className="ml-4 w-2/3 accent-neutral-900 dark:accent-white" />
        </label>
      </div>

      <div
        className="mt-4 min-h-[12rem] rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 p-4"
        style={{ display: "flex", flexDirection: flexDirection as never, justifyContent, alignItems, flexWrap: flexWrap as never, gap }}
      >
        {Array.from({ length: itemCount }, (_, i) => (
          <div
            key={i}
            className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-sm font-medium text-white"
          >
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
