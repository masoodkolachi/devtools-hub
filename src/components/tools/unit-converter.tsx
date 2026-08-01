"use client";

import { useState } from "react";

type Category = "length" | "weight" | "temperature";

const LENGTH_UNITS: Record<string, number> = {
  Millimeters: 0.001,
  Centimeters: 0.01,
  Meters: 1,
  Kilometers: 1000,
  Inches: 0.0254,
  Feet: 0.3048,
  Yards: 0.9144,
  Miles: 1609.344,
};

const WEIGHT_UNITS: Record<string, number> = {
  Milligrams: 0.001,
  Grams: 1,
  Kilograms: 1000,
  Ounces: 28.3495,
  Pounds: 453.592,
  "Metric tons": 1_000_000,
};

function convertLinear(value: number, fromUnit: string, toUnit: string, table: Record<string, number>) {
  return (value * table[fromUnit]) / table[toUnit];
}

function celsiusToUnit(c: number, unit: string) {
  if (unit === "Celsius") return c;
  if (unit === "Fahrenheit") return (c * 9) / 5 + 32;
  return c + 273.15; // Kelvin
}

function toCelsius(value: number, unit: string) {
  if (unit === "Celsius") return value;
  if (unit === "Fahrenheit") return ((value - 32) * 5) / 9;
  return value - 273.15; // Kelvin
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Feet");

  const unitsFor = (cat: Category) =>
    cat === "length" ? Object.keys(LENGTH_UNITS) : cat === "weight" ? Object.keys(WEIGHT_UNITS) : ["Celsius", "Fahrenheit", "Kelvin"];

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const units = unitsFor(cat);
    setFromUnit(units[0]);
    setToUnit(units[1] ?? units[0]);
  };

  let result: number;
  if (category === "temperature") {
    result = celsiusToUnit(toCelsius(value, fromUnit), toUnit);
  } else {
    const table = category === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
    result = convertLinear(value, fromUnit, toUnit, table);
  }

  const units = unitsFor(category);

  return (
    <div>
      <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
        {(["length", "weight", "temperature"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors ${
              category === cat ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-neutral-400">From</label>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-2 text-sm outline-none"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-400">To</label>
          <div className="mt-1 flex gap-2">
            <input
              readOnly
              value={Number.isFinite(result) ? Number(result.toFixed(6)) : ""}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm outline-none"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-2 text-sm outline-none"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        {value} {fromUnit} = {Number.isFinite(result) ? result.toFixed(4) : "—"} {toUnit}
      </p>
    </div>
  );
}
