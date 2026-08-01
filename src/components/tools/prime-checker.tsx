"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let remaining = n;
  let divisor = 2;
  while (divisor * divisor <= remaining) {
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining /= divisor;
    }
    divisor++;
  }
  if (remaining > 1) factors.push(remaining);
  return factors;
}

function primesUpTo(limit: number): number[] {
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) sieve[j] = false;
    }
  }
  const result: number[] = [];
  for (let i = 2; i <= limit; i++) if (sieve[i]) result.push(i);
  return result;
}

export default function PrimeChecker() {
  const [input, setInput] = useState("97");
  const n = parseInt(input, 10);
  const valid = input.trim() !== "" && Number.isInteger(n) && n >= 0 && n <= 10_000_000;

  const [listLimit, setListLimit] = useState(50);
  const primesList = primesUpTo(Math.min(Math.max(listLimit, 2), 1000));

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Check a number</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-lg outline-none"
        />
      </label>

      {valid && (
        <div className="mt-4">
          <div className={`flex items-center gap-2 rounded-xl border p-4 ${isPrime(n) ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}>
            {isPrime(n) ? <Check className="text-emerald-500" size={20} /> : <X className="text-red-500" size={20} />}
            <p className="font-medium text-neutral-900 dark:text-white">
              {n} is {isPrime(n) ? "a prime number" : "not a prime number"}
            </p>
          </div>
          {!isPrime(n) && n > 1 && (
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Prime factors: {primeFactors(n).join(" × ")}
            </p>
          )}
        </div>
      )}
      {!valid && input && <p className="mt-3 text-xs text-red-500">Enter a whole number between 0 and 10,000,000.</p>}

      <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-6">
        <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>List primes up to: {listLimit}</span>
          <input type="range" min={10} max={1000} value={listLimit} onChange={(e) => setListLimit(Number(e.target.value))} className="ml-4 w-1/2 accent-neutral-900 dark:accent-white" />
        </label>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {primesList.map((p) => (
            <span key={p} className="rounded bg-black/5 dark:bg-white/10 px-2 py-1 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
