"use client";

import { useState } from "react";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Karachi",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function nowLocalInputValue() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function TimeZoneConverter() {
  const [dateTime, setDateTime] = useState(nowLocalInputValue());
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  // datetime-local inputs are always parsed by the browser as local time,
  // so this Date object represents "the moment you picked, in your own zone."
  const moment = new Date(dateTime);
  const isValid = !Number.isNaN(moment.getTime());

  const format = (tz: string) => {
    if (!isValid) return "—";
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(moment);
    } catch {
      return "Invalid timezone";
    }
  };

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">
          Pick a date &amp; time (in your local timezone: {localTz})
        </span>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
        />
      </label>

      <p className="mt-4 text-xs text-neutral-400">
        Here&apos;s that same moment as it would read on a clock in each zone below.
      </p>

      <div className="mt-2 space-y-1.5">
        {TIMEZONES.map((tz) => (
          <div
            key={tz}
            className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${
              tz === localTz
                ? "border-neutral-900/20 dark:border-white/30 bg-neutral-900/5 dark:bg-white/10"
                : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
            }`}
          >
            <span className="text-sm text-neutral-500">{tz}</span>
            <span className="font-mono text-sm text-neutral-800 dark:text-neutral-100">{format(tz)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
