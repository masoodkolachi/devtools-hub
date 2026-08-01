"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const WORDS = [
  "anchor", "bramble", "cinder", "dapple", "ember", "flint", "granite", "harbor", "ivory", "jasper",
  "kindle", "lumen", "meadow", "nectar", "oracle", "pebble", "quartz", "ripple", "sable", "thicket",
  "umber", "velvet", "willow", "xenon", "yonder", "zephyr", "amber", "birch", "coral", "dune",
  "echo", "fable", "glow", "haze", "isle", "juniper", "knoll", "lark", "moss", "nook",
  "onyx", "pine", "quill", "reed", "slate", "tide", "urn", "vale", "wisp", "yarrow",
];

function randomWord() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return WORDS[bytes[0] % WORDS.length];
}

function randomDigit() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return bytes[0] % 10;
}

export default function PassphraseGenerator() {
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [addNumber, setAddNumber] = useState(true);
  const [passphrase, setPassphrase] = useState(() => generate(4, "-", true, true));

  function generate(count: number, sep: string, cap: boolean, num: boolean) {
    const words = Array.from({ length: count }, () => {
      const w = randomWord();
      return cap ? w[0].toUpperCase() + w.slice(1) : w;
    });
    if (num) words.push(String(randomDigit()) + String(randomDigit()));
    return words.join(sep);
  }

  const handleGenerate = () => setPassphrase(generate(wordCount, separator, capitalize, addNumber));

  const entropyBits = Math.log2(WORDS.length) * wordCount;

  return (
    <div>
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="break-all font-mono text-lg text-neutral-800 dark:text-neutral-100">{passphrase}</p>
          <div className="flex shrink-0 gap-2">
            <button onClick={handleGenerate} aria-label="Regenerate" className="rounded-lg border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <RefreshCw size={16} />
            </button>
            <CopyButton getValue={() => passphrase} label="" className="px-2.5" />
          </div>
        </div>
        <p className="mt-2 text-xs text-neutral-400">~{entropyBits.toFixed(0)} bits of entropy from the word choices alone</p>
      </div>

      <div className="mt-5 space-y-4">
        <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Words: {wordCount}</span>
          <input type="range" min={3} max={8} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="ml-4 w-2/3 accent-neutral-900 dark:accent-white" />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            Separator
            <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none">
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Period (.)</option>
              <option value=" ">Space</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} />
            Capitalize words
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <input type="checkbox" checked={addNumber} onChange={(e) => setAddNumber(e.target.checked)} />
            Add trailing digits
          </label>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Word-based passphrases like this are easier to remember and type than random character strings, while
        still being hard to guess — this is the same idea behind Diceware passwords.
      </p>
    </div>
  );
}
