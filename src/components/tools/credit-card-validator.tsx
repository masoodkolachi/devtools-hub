"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

function luhnCheck(digits: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alternate) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function detectCardType(digits: string): string {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";
  if (/^6(?:011|5)/.test(digits)) return "Discover";
  if (/^35/.test(digits)) return "JCB";
  if (/^3(?:0[0-5]|[68])/.test(digits)) return "Diners Club";
  return "Unknown";
}

export default function CreditCardValidator() {
  const [input, setInput] = useState("4532015112830366");

  const digits = input.replace(/\D/g, "");
  const hasValidLength = digits.length >= 13 && digits.length <= 19;
  const passesLuhn = hasValidLength && luhnCheck(digits);
  const cardType = digits.length >= 2 ? detectCardType(digits) : "Unknown";

  const formatted = digits.replace(/(.{4})/g, "$1 ").trim();

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Card number</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="4532 0151 1283 0366"
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-lg tracking-wider outline-none"
        />
      </label>

      {digits && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <span className="text-sm text-neutral-500">Formatted</span>
            <span className="font-mono text-sm text-neutral-800 dark:text-neutral-100">{formatted}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <span className="text-sm text-neutral-500">Detected type</span>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{cardType}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
            <span className="text-sm text-neutral-500">Luhn checksum</span>
            <span className={`flex items-center gap-1.5 text-sm font-medium ${passesLuhn ? "text-emerald-500" : "text-red-500"}`}>
              {passesLuhn ? <Check size={14} /> : <X size={14} />}
              {passesLuhn ? "Valid" : "Invalid"}
            </span>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        This only checks whether the number is mathematically well-formed (the Luhn algorithm used by all major
        card networks) — it does not check whether the card actually exists, is active, or has funds. Never enter
        a real card number into a tool like this.
      </p>
    </div>
  );
}
