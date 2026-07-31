"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const STATUS_CODES: { code: number; text: string; description: string }[] = [
  { code: 200, text: "OK", description: "The request succeeded." },
  { code: 201, text: "Created", description: "The request succeeded and a new resource was created." },
  { code: 204, text: "No Content", description: "The request succeeded but there's no content to return." },
  { code: 301, text: "Moved Permanently", description: "The resource has permanently moved to a new URL." },
  { code: 302, text: "Found", description: "The resource temporarily lives at a different URL." },
  { code: 304, text: "Not Modified", description: "Cached version is still valid, no need to resend." },
  { code: 400, text: "Bad Request", description: "The server couldn't understand the request due to invalid syntax." },
  { code: 401, text: "Unauthorized", description: "Authentication is required and has failed or not been provided." },
  { code: 403, text: "Forbidden", description: "The client doesn't have access rights to this content." },
  { code: 404, text: "Not Found", description: "The server can't find the requested resource." },
  { code: 405, text: "Method Not Allowed", description: "The request method isn't supported for this resource." },
  { code: 408, text: "Request Timeout", description: "The server timed out waiting for the request." },
  { code: 409, text: "Conflict", description: "The request conflicts with the current state of the resource." },
  { code: 418, text: "I'm a teapot", description: "An April Fools' joke from RFC 2324 — servers refusing to brew coffee." },
  { code: 429, text: "Too Many Requests", description: "The user has sent too many requests in a given time." },
  { code: 500, text: "Internal Server Error", description: "The server encountered an unexpected condition." },
  { code: 501, text: "Not Implemented", description: "The server doesn't support the functionality required." },
  { code: 502, text: "Bad Gateway", description: "The server got an invalid response from an upstream server." },
  { code: 503, text: "Service Unavailable", description: "The server isn't ready to handle the request, often overloaded." },
  { code: 504, text: "Gateway Timeout", description: "The upstream server didn't respond in time." },
];

function categoryFor(code: number) {
  if (code < 300) return { label: "Success", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" };
  if (code < 400) return { label: "Redirect", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" };
  if (code < 500) return { label: "Client Error", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" };
  return { label: "Server Error", color: "bg-red-500/15 text-red-600 dark:text-red-400" };
}

export default function HttpStatusExplorer() {
  const [query, setQuery] = useState("");

  const filtered = STATUS_CODES.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return s.code.toString().includes(q) || s.text.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code or name (e.g. 404, not found)…"
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <div className="mt-4 space-y-2 max-h-[28rem] overflow-y-auto">
        {filtered.map((s) => {
          const cat = categoryFor(s.code);
          return (
            <div key={s.code} className="flex items-start gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3">
              <span className="shrink-0 font-mono text-lg font-semibold text-neutral-900 dark:text-white">{s.code}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-neutral-900 dark:text-white">{s.text}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>{cat.label}</span>
                </div>
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{s.description}</p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">No status codes matched.</p>}
      </div>
    </div>
  );
}
