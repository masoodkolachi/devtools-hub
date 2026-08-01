"use client";

import { useState } from "react";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Healthy weight", color: "text-emerald-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-500" };
  return { label: "Obesity", color: "text-red-500" };
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [weightLb, setWeightLb] = useState(154);

  const bmi =
    unit === "metric"
      ? weightKg / (heightCm / 100) ** 2
      : (weightLb / ((heightFt * 12 + heightIn) ** 2)) * 703;

  const valid = Number.isFinite(bmi) && bmi > 0;
  const category = valid ? bmiCategory(bmi) : null;

  return (
    <div>
      <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
        <button
          onClick={() => setUnit("metric")}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${unit === "metric" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}
        >
          Metric
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${unit === "imperial" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}
        >
          Imperial
        </button>
      </div>

      {unit === "metric" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-neutral-400">Height (cm)</span>
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-neutral-400">Weight (kg)</span>
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
          </label>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-medium text-neutral-400">Height (ft)</span>
            <input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-neutral-400">Height (in)</span>
            <input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-neutral-400">Weight (lb)</span>
            <input type="number" value={weightLb} onChange={(e) => setWeightLb(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
          </label>
        </div>
      )}

      {valid && category && (
        <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 text-center">
          <p className="text-4xl font-semibold text-neutral-900 dark:text-white">{bmi.toFixed(1)}</p>
          <p className={`mt-1 text-sm font-medium ${category.color}`}>{category.label}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        BMI is a general screening measure and doesn&apos;t account for muscle mass, bone density, or body
        composition — it&apos;s not a diagnosis. Talk to a doctor for personalized health guidance.
      </p>
    </div>
  );
}
