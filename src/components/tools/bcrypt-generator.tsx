"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { Eye, EyeOff, Lock } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export default function BcryptGenerator() {
  const [text, setText] = useState("");
  const [rounds, setRounds] = useState(10);
  const [visible, setVisible] = useState(false);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  // Verify tab
  const [checkText, setCheckText] = useState("");
  const [checkHash, setCheckHash] = useState("");
  const [matchResult, setMatchResult] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const handleHash = async () => {
    if (!text) return;
    setLoading(true);
    // Yield to the browser first so the "Hashing…" state actually paints
    // before the (synchronous, CPU-bound) hashSync call blocks the thread.
    await new Promise((resolve) => setTimeout(resolve, 20));
    try {
      const salt = bcrypt.genSaltSync(rounds);
      setHash(bcrypt.hashSync(text, salt));
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async () => {
    if (!checkText || !checkHash) return;
    setChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 20));
    try {
      setMatchResult(bcrypt.compareSync(checkText, checkHash));
    } catch {
      setMatchResult(false);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Generate a bcrypt hash</p>
        <div className="mt-2 relative">
          <input
            type={visible ? "text" : "password"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text to hash…"
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 pr-12 font-mono text-sm outline-none"
          />
          <button
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide text" : "Show text"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Cost factor (rounds)
            <input
              type="number"
              min={4}
              max={14}
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
            />
          </label>
          <button
            onClick={handleHash}
            disabled={!text || loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Lock size={14} /> {loading ? "Hashing…" : "Generate hash"}
          </button>
        </div>

        {hash && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <code className="truncate text-sm text-neutral-800 dark:text-neutral-100">{hash}</code>
            <CopyButton getValue={() => hash} label="" className="shrink-0 px-2.5" />
          </div>
        )}
        <p className="mt-2 text-xs text-neutral-400">
          Higher cost factors are slower but harder to brute-force. 10–12 is a common default. Everything runs in your browser — nothing is sent anywhere.
        </p>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-6">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Verify text against a hash</p>
        <div className="mt-2 space-y-2">
          <input
            value={checkText}
            onChange={(e) => setCheckText(e.target.value)}
            placeholder="Plain text to check…"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
          <input
            value={checkHash}
            onChange={(e) => setCheckHash(e.target.value)}
            placeholder="$2a$10$... bcrypt hash to compare against"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={!checkText || !checkHash || checking}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-40"
        >
          {checking ? "Checking…" : "Verify"}
        </button>
        {matchResult !== null && (
          <p className={`mt-2 text-sm font-medium ${matchResult ? "text-emerald-500" : "text-red-500"}`}>
            {matchResult ? "✓ Match — this text produces this hash." : "✗ No match."}
          </p>
        )}
      </div>
    </div>
  );
}
