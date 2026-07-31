"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

function base64UrlDecode(segment: string) {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/").padEnd(segment.length + ((4 - (segment.length % 4)) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

function tryFormat(raw: string) {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

const EXAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";

export default function JwtDecoder() {
  const [token, setToken] = useState(EXAMPLE);

  const parts = token.trim().split(".");
  let header = "";
  let payload = "";
  let error: string | null = null;

  if (token.trim()) {
    if (parts.length !== 3) {
      error = "A JWT should have three dot-separated parts: header.payload.signature.";
    } else {
      try {
        header = tryFormat(base64UrlDecode(parts[0]));
        payload = tryFormat(base64UrlDecode(parts[1]));
      } catch {
        error = "Couldn't decode this token — check that it's valid Base64URL.";
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">Paste a JWT</span>
        <button
          onClick={() => setToken("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        rows={4}
        className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs outline-none break-all"
      />

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {!error && (header || payload) && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-xs font-medium text-neutral-400">Header</p>
              <CopyButton getValue={() => header} />
            </div>
            <pre className="min-h-[6rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
              {header}
            </pre>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-xs font-medium text-neutral-400">Payload</p>
              <CopyButton getValue={() => payload} />
            </div>
            <pre className="min-h-[6rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
              {payload}
            </pre>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        This only decodes the token to read its contents — it doesn&apos;t verify the signature, since
        that requires the secret or public key the token was signed with. Don&apos;t treat a decoded
        token as trusted or authentic without verifying it server-side.
      </p>
    </div>
  );
}
