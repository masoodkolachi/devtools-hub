"use client";

import { useState } from "react";

function todayInputValue() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function calculateAge(birthDate: Date, asOf: Date) {
  let years = asOf.getFullYear() - birthDate.getFullYear();
  let months = asOf.getMonth() - birthDate.getMonth();
  let days = asOf.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOf.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [asOfDate, setAsOfDate] = useState(todayInputValue());

  const birth = new Date(birthDate);
  const asOf = new Date(asOfDate);
  const valid = !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && birth <= asOf;

  const result = valid ? calculateAge(birth, asOf) : null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Date of birth</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">As of date</span>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      {!valid && (birthDate || asOfDate) && (
        <p className="mt-3 text-xs text-red-500">Date of birth must be on or before the &quot;as of&quot; date.</p>
      )}

      {result && (
        <>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Years", value: result.years },
              { label: "Months", value: result.months },
              { label: "Days", value: result.days },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{c.value}</p>
                <p className="mt-0.5 text-xs text-neutral-400">{c.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
            That&apos;s {result.totalDays.toLocaleString()} total days.
          </p>
        </>
      )}
    </div>
  );
}
