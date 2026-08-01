"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

type Alignment = "left" | "center" | "right";

export default function MarkdownTableGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [alignments, setAlignments] = useState<Alignment[]>(["left", "left", "left"]);
  const [headers, setHeaders] = useState<string[]>(["Name", "Category", "Status"]);
  const [cells, setCells] = useState<string[][]>([
    ["UUID Generator", "Developer", "Live"],
    ["JSON Formatter", "JSON", "Live"],
    ["Regex Tester", "Regex", "Live"],
  ]);

  const resize = (newCols: number, newRows: number) => {
    setColumns(newCols);
    setRows(newRows);
    setAlignments((prev) => Array.from({ length: newCols }, (_, i) => prev[i] ?? "left"));
    setHeaders((prev) => Array.from({ length: newCols }, (_, i) => prev[i] ?? `Column ${i + 1}`));
    setCells((prev) =>
      Array.from({ length: newRows }, (_, r) => Array.from({ length: newCols }, (_, c) => prev[r]?.[c] ?? ""))
    );
  };

  const alignMark = (a: Alignment) => (a === "left" ? ":---" : a === "center" ? ":---:" : "---:");

  const markdown = [
    `| ${headers.join(" | ")} |`,
    `| ${alignments.map(alignMark).join(" | ")} |`,
    ...cells.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Columns
          <button onClick={() => resize(Math.max(1, columns - 1), rows)} className="rounded border border-black/10 dark:border-white/10 p-1"><Minus size={12} /></button>
          <span className="w-4 text-center">{columns}</span>
          <button onClick={() => resize(columns + 1, rows)} className="rounded border border-black/10 dark:border-white/10 p-1"><Plus size={12} /></button>
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Rows
          <button onClick={() => resize(columns, Math.max(1, rows - 1))} className="rounded border border-black/10 dark:border-white/10 p-1"><Minus size={12} /></button>
          <span className="w-4 text-center">{rows}</span>
          <button onClick={() => resize(columns, rows + 1)} className="rounded border border-black/10 dark:border-white/10 p-1"><Plus size={12} /></button>
        </label>
        <CopyButton getValue={() => markdown} className="ml-auto" />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((h, c) => (
                <th key={c} className="border border-black/10 dark:border-white/10 p-1">
                  <input
                    value={h}
                    onChange={(e) => setHeaders((prev) => prev.map((v, i) => (i === c ? e.target.value : v)))}
                    className="w-full min-w-[6rem] bg-transparent px-2 py-1 font-medium outline-none"
                  />
                  <select
                    value={alignments[c]}
                    onChange={(e) => setAlignments((prev) => prev.map((v, i) => (i === c ? (e.target.value as Alignment) : v)))}
                    className="mt-1 w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-1 py-0.5 text-xs outline-none"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="border border-black/10 dark:border-white/10 p-1">
                    <input
                      value={cell}
                      onChange={(e) =>
                        setCells((prev) => prev.map((rowArr, ri) => (ri === r ? rowArr.map((v, ci) => (ci === c ? e.target.value : v)) : rowArr)))
                      }
                      className="w-full min-w-[6rem] bg-transparent px-2 py-1 outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="mt-4 overflow-auto whitespace-pre rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
        {markdown}
      </pre>
    </div>
  );
}
