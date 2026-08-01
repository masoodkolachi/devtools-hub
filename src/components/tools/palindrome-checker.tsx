"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function PalindromeChecker() {
  const [input, setInput] = useState("A man, a plan, a canal: Panama");

  const cleaned = normalize(input);
  const isPalindrome = cleaned.length > 0 && cleaned === [...cleaned].reverse().join("");

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Text to check</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
        />
      </label>

      {input.trim() && (
        <div className={`mt-4 flex items-center gap-2 rounded-xl border p-4 ${isPalindrome ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}>
          {isPalindrome ? <Check className="text-emerald-500" size={20} /> : <X className="text-red-500" size={20} />}
          <p className="font-medium text-neutral-900 dark:text-white">
            {isPalindrome ? "Yes, that's a palindrome!" : "No, that's not a palindrome."}
          </p>
        </div>
      )}

      <p className="mt-3 text-xs text-neutral-400">
        Ignores spaces, punctuation, and capitalization — &quot;A man, a plan, a canal: Panama&quot; counts as a
        palindrome because it reads the same forwards and backwards once you strip those out.
      </p>
    </div>
  );
}
