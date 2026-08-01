"use client";

import { useState } from "react";
import { Plus, Send, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];

interface HeaderRow {
  key: string;
  value: string;
}

export default function ApiRequestBuilder() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [headers, setHeaders] = useState<HeaderRow[]>([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ status: number; statusText: string; headers: string; body: string; timeMs: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateHeader = (index: number, field: keyof HeaderRow, value: string) => {
    setHeaders((rows) => rows.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };
  const addHeader = () => setHeaders((rows) => [...rows, { key: "", value: "" }]);
  const removeHeader = (index: number) => setHeaders((rows) => rows.filter((_, i) => i !== index));

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const start = performance.now();
    try {
      const headerObj: Record<string, string> = {};
      headers.forEach((h) => {
        if (h.key.trim()) headerObj[h.key.trim()] = h.value;
      });

      const res = await fetch(url, {
        method,
        headers: headerObj,
        body: method !== "GET" && method !== "HEAD" && body.trim() ? body : undefined,
      });

      const text = await res.text();
      let formattedBody = text;
      try {
        formattedBody = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // not JSON, leave as-is
      }

      const headerLines: string[] = [];
      res.headers.forEach((value, key) => headerLines.push(`${key}: ${value}`));

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: headerLines.join("\n"),
        body: formattedBody,
        timeMs: Math.round(performance.now() - start),
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message} — this is often a CORS restriction from the target server, not a bug in the request itself.`
          : "Request failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm font-medium outline-none"
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading || !url}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Send size={14} /> {loading ? "Sending…" : "Send"}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">Headers</span>
          <button onClick={addHeader} className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <Plus size={12} /> Add header
          </button>
        </div>
        <div className="mt-1.5 space-y-1.5">
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={h.key}
                onChange={(e) => updateHeader(i, "key", e.target.value)}
                placeholder="Header name"
                className="w-1/2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-1.5 font-mono text-sm outline-none"
              />
              <input
                value={h.value}
                onChange={(e) => updateHeader(i, "value", e.target.value)}
                placeholder="Value"
                className="w-1/2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-1.5 font-mono text-sm outline-none"
              />
              <button onClick={() => removeHeader(i)} aria-label="Remove header" className="shrink-0 text-neutral-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {method !== "GET" && method !== "HEAD" && (
        <label className="mt-4 block">
          <span className="text-xs font-medium text-neutral-400">Request body</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder='{"key": "value"}'
            className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none"
          />
        </label>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {response && (
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                response.status < 300
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : response.status < 400
                  ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400"
              }`}
            >
              {response.status} {response.statusText}
            </span>
            <span className="text-xs text-neutral-400">{response.timeMs}ms</span>
            <CopyButton getValue={() => response.body} label="Copy body" className="ml-auto" />
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-medium text-neutral-400">Response headers</p>
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs">
                {response.headers || "(none)"}
              </pre>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-neutral-400">Response body</p>
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs">
                {response.body || "(empty)"}
              </pre>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Requests are sent directly from your browser to the target server. Many APIs block cross-origin browser
        requests (CORS) unless they explicitly allow it — that&apos;s a server-side restriction, not something this
        tool can bypass.
      </p>
    </div>
  );
}
