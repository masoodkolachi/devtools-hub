"use client";

import { useEffect, useState } from "react";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let browserVersion = "";
  let os = "Unknown";
  let deviceType = "Desktop";

  // Browser detection — order matters, since many UAs mention multiple engines.
  const browserPatterns: [RegExp, string][] = [
    [/Edg\/([\d.]+)/, "Edge"],
    [/OPR\/([\d.]+)/, "Opera"],
    [/Chrome\/([\d.]+)/, "Chrome"],
    [/Firefox\/([\d.]+)/, "Firefox"],
    [/Version\/([\d.]+).*Safari/, "Safari"],
  ];
  for (const [pattern, name] of browserPatterns) {
    const match = ua.match(pattern);
    if (match) {
      browser = name;
      browserVersion = match[1];
      break;
    }
  }

  const osPatterns: [RegExp, string][] = [
    [/Windows NT 10\.0/, "Windows 10/11"],
    [/Windows NT 6\.3/, "Windows 8.1"],
    [/Windows NT/, "Windows"],
    [/Mac OS X ([\d_]+)/, "macOS"],
    [/Android ([\d.]+)/, "Android"],
    [/iPhone OS ([\d_]+)/, "iOS"],
    [/iPad.*OS ([\d_]+)/, "iPadOS"],
    [/Linux/, "Linux"],
  ];
  for (const [pattern, name] of osPatterns) {
    if (pattern.test(ua)) {
      os = name;
      break;
    }
  }

  if (/Mobi|Android(?!.*Tablet)|iPhone/.test(ua) && !/iPad|Tablet/.test(ua)) deviceType = "Mobile";
  else if (/iPad|Tablet/.test(ua)) deviceType = "Tablet";

  return { browser, browserVersion, os, deviceType };
}

export default function UserAgentParser() {
  const [ua, setUa] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setUa(navigator.userAgent);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const result = ua ? parseUserAgent(ua) : null;

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">User agent string</span>
        <textarea
          value={ua}
          onChange={(e) => setUa(e.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs outline-none"
        />
      </label>

      {result && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Browser", value: `${result.browser} ${result.browserVersion}`.trim() },
            { label: "OS", value: result.os },
            { label: "Device type", value: result.deviceType },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{c.value}</p>
              <p className="mt-0.5 text-xs text-neutral-400">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Loaded with your own browser&apos;s user agent by default — paste a different one to parse it instead.
        Detection is pattern-based and covers the most common browsers/OSes, not every edge case.
      </p>
    </div>
  );
}
