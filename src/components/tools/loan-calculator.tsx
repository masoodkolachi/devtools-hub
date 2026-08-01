"use client";

import { useState } from "react";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(20000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - principal;

  const valid = principal > 0 && years > 0 && Number.isFinite(monthlyPayment);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Loan amount</span>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Annual interest rate (%)</span>
          <input
            type="number"
            step={0.1}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Loan term (years)</span>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      {valid && (
        <>
          <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 text-center">
            <p className="text-3xl font-semibold text-neutral-900 dark:text-white">
              {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-xs text-neutral-400">Monthly payment</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
              <p className="text-xl font-semibold text-neutral-900 dark:text-white">
                {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-0.5 text-xs text-neutral-400">Total interest paid</p>
            </div>
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center">
              <p className="text-xl font-semibold text-neutral-900 dark:text-white">
                {totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-0.5 text-xs text-neutral-400">Total paid over {years} years</p>
            </div>
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Uses the standard fixed-rate amortization formula. Doesn&apos;t account for taxes, insurance, fees, or
        variable-rate changes — actual loan terms will vary by lender.
      </p>
    </div>
  );
}
