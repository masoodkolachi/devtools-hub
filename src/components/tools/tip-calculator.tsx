"use client";

import { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmount / people : tipAmount;

  const presets = [10, 15, 18, 20, 25];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Bill amount</span>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Number of people</span>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-4">
        <span className="text-xs font-medium text-neutral-400">Tip percentage: {tipPercent}%</span>
        <input
          type="range"
          min={0}
          max={40}
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
          className="mt-1 w-full accent-neutral-900 dark:accent-white"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setTipPercent(p)}
              className={`rounded-lg border px-3 py-1 text-sm font-medium transition-colors ${
                tipPercent === p
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                  : "border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">${tipPerPerson.toFixed(2)}</p>
          <p className="mt-0.5 text-xs text-neutral-400">Tip per person</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">${perPerson.toFixed(2)}</p>
          <p className="mt-0.5 text-xs text-neutral-400">Total per person</p>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-neutral-400">
        Total bill with tip: ${total.toFixed(2)} (tip: ${tipAmount.toFixed(2)})
      </p>
    </div>
  );
}
