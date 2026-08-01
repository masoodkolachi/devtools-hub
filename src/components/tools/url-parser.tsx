"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
      <span className="shrink-0 text-sm text-neutral-500">{label}</span>
      <span className="truncate font-mono text-sm text-neutral-800 dark:text-neutral-100">{value || "—"}</span>
    </div>
  );
}

export default function UrlParser() {
  const [input, setInput] = useState("https://user:pass@www.example.com:8080/path/to/page?search=query&sort=asc#section");

  let url: URL | null = null;
  let error: string | null = null;
  try {
    if (input.trim()) url = new URL(input);
  } catch {
    error = "That doesn't look like a valid, complete URL (make sure it includes the protocol, e.g. https://).";
  }

  const params = url ? Array.from(url.searchParams.entries()) : [];

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">URL</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/path?query=value"
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {url && (
        <>
          <div className="mt-4 space-y-1.5">
            <Row label="Protocol" value={url.protocol} />
            <Row label="Host" value={url.host} />
            <Row label="Hostname" value={url.hostname} />
            <Row label="Port" value={url.port || "(default)"} />
            <Row label="Pathname" value={url.pathname} />
            <Row label="Query string" value={url.search} />
            <Row label="Fragment" value={url.hash} />
            {url.username && <Row label="Username" value={url.username} />}
          </div>

          {params.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-neutral-400">Query parameters</p>
                <CopyButton getValue={() => JSON.stringify(Object.fromEntries(params), null, 2)} label="Copy as JSON" />
              </div>
              <div className="mt-1.5 space-y-1.5">
                {params.map(([key, value], i) => (
                  <Row key={i} label={key} value={value} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
