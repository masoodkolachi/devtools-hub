"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const FIELD_RANGES = { minute: [0, 59], hour: [0, 23], day: [1, 31], month: [1, 12], weekday: [0, 6] } as const;

function matchesField(value: number, expr: string, range: readonly [number, number]): boolean {
  return expr.split(",").some((part) => {
    let step = 1;
    let base = part;
    if (part.includes("/")) {
      const [b, s] = part.split("/");
      base = b;
      step = parseInt(s, 10) || 1;
    }
    let lo = range[0];
    let hi = range[1];
    if (base !== "*") {
      if (base.includes("-")) {
        const [a, b] = base.split("-").map(Number);
        lo = a;
        hi = b;
      } else {
        lo = hi = parseInt(base, 10);
      }
    }
    if (value < lo || value > hi) return false;
    return (value - lo) % step === 0;
  });
}

function describeField(expr: string, unit: string, names?: string[]): string {
  if (expr === "*") return `every ${unit}`;
  if (expr.includes("/")) {
    const [base, step] = expr.split("/");
    return base === "*" ? `every ${step} ${unit}s` : `every ${step} ${unit}s starting at ${base}`;
  }
  if (expr.includes(",")) {
    const parts = expr.split(",");
    return `at ${unit}s ${names ? parts.map((p) => names[Number(p)]).join(", ") : parts.join(", ")}`;
  }
  if (expr.includes("-")) return `${unit}s ${expr}`;
  return names ? names[Number(expr)] : expr;
}

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function nextRunTimes(minute: string, hour: string, day: string, month: string, weekday: string, count: number): Date[] {
  const results: Date[] = [];
  const cursor = new Date();
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let iterations = 0;
  while (results.length < count && iterations < 200000) {
    iterations++;
    const matches =
      matchesField(cursor.getMinutes(), minute, FIELD_RANGES.minute) &&
      matchesField(cursor.getHours(), hour, FIELD_RANGES.hour) &&
      matchesField(cursor.getDate(), day, FIELD_RANGES.day) &&
      matchesField(cursor.getMonth() + 1, month, FIELD_RANGES.month) &&
      matchesField(cursor.getDay(), weekday, FIELD_RANGES.weekday);
    if (matches) results.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

export default function CronBuilder() {
  const [minute, setMinute] = useState("*/15");
  const [hour, setHour] = useState("9-17");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("1-5");

  const expression = `${minute} ${hour} ${day} ${month} ${weekday}`;

  let description = "";
  let error: string | null = null;
  try {
    description = `Runs ${describeField(minute, "minute")}, ${describeField(hour, "hour")}, on ${describeField(day, "day")} of the month, in ${describeField(month, "month")}, on ${describeField(weekday, "day", WEEKDAY_NAMES)}.`;
  } catch {
    error = "Couldn't parse this expression.";
  }

  const upcoming = error ? [] : nextRunTimes(minute, hour, day, month, weekday, 5);

  const fields = [
    { label: "Minute (0-59)", value: minute, setValue: setMinute },
    { label: "Hour (0-23)", value: hour, setValue: setHour },
    { label: "Day of month (1-31)", value: day, setValue: setDay },
    { label: "Month (1-12)", value: month, setValue: setMonth },
    { label: "Day of week (0=Sun)", value: weekday, setValue: setWeekday },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-5">
        {fields.map((f) => (
          <label key={f.label} className="block">
            <span className="text-xs font-medium text-neutral-400">{f.label}</span>
            <input
              value={f.value}
              onChange={(e) => f.setValue(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 font-mono text-sm outline-none"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
        <code className="text-lg text-neutral-800 dark:text-neutral-100">{expression}</code>
        <CopyButton getValue={() => expression} label="" className="shrink-0 px-2.5" />
      </div>

      {error ? (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      ) : (
        <>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
          <div className="mt-4">
            <p className="text-xs font-medium text-neutral-400">Next 5 run times</p>
            <div className="mt-1.5 space-y-1.5">
              {upcoming.map((d, i) => (
                <p key={i} className="rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 font-mono text-sm text-neutral-700 dark:text-neutral-300">
                  {d.toLocaleString()}
                </p>
              ))}
              {upcoming.length === 0 && <p className="text-sm text-neutral-400">No upcoming matches found in a reasonable window.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
