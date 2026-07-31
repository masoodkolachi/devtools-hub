"use client";

import { useState } from "react";

function todayInputValue() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState(todayInputValue());
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  });

  const start = new Date(startDate);
  const end = new Date(endDate);
  const valid = !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime());

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;
  const months = Math.abs(
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  );
  const isPast = end < start;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      {valid && (
        <>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Total days", value: totalDays.toLocaleString() },
              { label: "Weeks", value: `${weeks}w ${remainderDays}d` },
              { label: "Approx. months", value: months },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
                <p className="text-xl font-semibold text-neutral-900 dark:text-white">{c.value}</p>
                <p className="mt-0.5 text-xs text-neutral-400">{c.label}</p>
              </div>
            ))}
          </div>
          {isPast && <p className="mt-3 text-center text-xs text-neutral-400">End date is before the start date — showing the absolute difference.</p>}
        </>
      )}
    </div>
  );
}
