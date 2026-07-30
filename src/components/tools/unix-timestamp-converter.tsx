"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(String(nowSeconds()));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 19));

  const tsNumber = Number(timestamp);
  const validTs = timestamp.trim() !== "" && !Number.isNaN(tsNumber);
  const dateFromTs = validTs ? new Date(tsNumber * (String(tsNumber).length > 10 ? 1 : 1000)) : null;

  const handleDateToTimestamp = (value: string) => {
    setDateInput(value);
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      setTimestamp(String(Math.floor(parsed.getTime() / 1000)));
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="text-xs font-medium text-neutral-400">Unix timestamp (seconds)</label>
        <div className="mt-2 flex gap-2">
          <input
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1735689600"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
          <button
            onClick={() => setTimestamp(String(nowSeconds()))}
            className="shrink-0 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            Now
          </button>
        </div>

        {dateFromTs && !Number.isNaN(dateFromTs.getTime()) ? (
          <div className="mt-3 space-y-2">
            <Row label="UTC" value={dateFromTs.toUTCString()} />
            <Row label="Local" value={dateFromTs.toString()} />
            <Row label="ISO 8601" value={dateFromTs.toISOString()} />
          </div>
        ) : (
          <p className="mt-3 text-xs text-red-500">Enter a valid numeric timestamp.</p>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-neutral-400">Date & time</label>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => handleDateToTimestamp(e.target.value)}
          className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
        />
        <p className="mt-3 text-xs text-neutral-400">Converts to seconds and milliseconds since epoch.</p>
        <div className="mt-2 space-y-2">
          <Row label="Seconds" value={timestamp} />
          <Row label="Milliseconds" value={validTs ? String(tsNumber * 1000) : ""} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
      <div className="min-w-0">
        <p className="text-xs text-neutral-400">{label}</p>
        <p className="truncate font-mono text-sm text-neutral-800 dark:text-neutral-100">{value || "—"}</p>
      </div>
      <CopyButton getValue={() => value} label="" className="shrink-0 px-2.5" />
    </div>
  );
}
