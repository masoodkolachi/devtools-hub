"use client";

import { useState } from "react";

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-400">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
        />
        {suffix && <span className="shrink-0 text-sm text-neutral-400">{suffix}</span>}
      </div>
    </label>
  );
}

function Result({ text }: { text: string }) {
  return (
    <p className="mt-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-100">
      {text}
    </p>
  );
}

export default function PercentageCalculator() {
  // X% of Y
  const [pctA, setPctA] = useState("20");
  const [valueA, setValueA] = useState("150");

  // X is what % of Y
  const [partB, setPartB] = useState("30");
  const [wholeB, setWholeB] = useState("150");

  // % change from X to Y
  const [fromC, setFromC] = useState("50");
  const [toC, setToC] = useState("75");

  const resultA = (Number(pctA) / 100) * Number(valueA);
  const resultB = Number(wholeB) !== 0 ? (Number(partB) / Number(wholeB)) * 100 : NaN;
  const resultC = Number(fromC) !== 0 ? ((Number(toC) - Number(fromC)) / Math.abs(Number(fromC))) * 100 : NaN;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">What is X% of Y?</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="X (percentage)" value={pctA} onChange={setPctA} suffix="%" />
          <Field label="Y (value)" value={valueA} onChange={setValueA} />
        </div>
        <Result text={`${pctA || 0}% of ${valueA || 0} is ${Number.isFinite(resultA) ? resultA.toLocaleString() : "—"}`} />
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">X is what percent of Y?</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="X (part)" value={partB} onChange={setPartB} />
          <Field label="Y (whole)" value={wholeB} onChange={setWholeB} />
        </div>
        <Result
          text={
            Number.isFinite(resultB)
              ? `${partB || 0} is ${resultB.toLocaleString(undefined, { maximumFractionDigits: 2 })}% of ${wholeB || 0}`
              : "Enter a non-zero value for Y."
          }
        />
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Percent change from X to Y</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="X (from)" value={fromC} onChange={setFromC} />
          <Field label="Y (to)" value={toC} onChange={setToC} />
        </div>
        <Result
          text={
            Number.isFinite(resultC)
              ? `Change from ${fromC || 0} to ${toC || 0} is ${resultC >= 0 ? "+" : ""}${resultC.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`
              : "Enter a non-zero value for X."
          }
        />
      </div>
    </div>
  );
}
