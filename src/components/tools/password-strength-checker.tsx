"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function analyze(password: string) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "At least 12 characters", pass: password.length >= 12 },
    { label: "Contains lowercase letter", pass: /[a-z]/.test(password) },
    { label: "Contains uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Contains a number", pass: /[0-9]/.test(password) },
    { label: "Contains a symbol", pass: /[^a-zA-Z0-9]/.test(password) },
    { label: "No obvious repeated characters (aaa, 111)", pass: !/(.)\1{2,}/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  let label = "Very weak";
  let color = "bg-red-500";
  if (score >= 6) {
    label = "Very strong";
    color = "bg-emerald-600";
  } else if (score >= 5) {
    label = "Strong";
    color = "bg-emerald-500";
  } else if (score >= 3) {
    label = "Okay";
    color = "bg-amber-500";
  } else if (score >= 1) {
    label = "Weak";
    color = "bg-orange-500";
  }
  return { checks, score, label, color };
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { checks, score, label, color } = analyze(password);

  return (
    <div>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to check…"
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 pr-12 font-mono text-sm outline-none"
        />
        <button
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className={`h-full transition-all ${color}`} style={{ width: `${(score / checks.length) * 100}%` }} />
        </div>
        <span className="w-24 shrink-0 text-right text-xs font-medium text-neutral-500">{password ? label : "—"}</span>
      </div>

      <ul className="mt-4 space-y-1.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-sm">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-white ${
                c.pass ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"
              }`}
            >
              {c.pass ? "✓" : ""}
            </span>
            <span className={c.pass ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-400"}>
              {c.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-400">
        Nothing you type here leaves your browser — this runs entirely client-side.
      </p>
    </div>
  );
}
