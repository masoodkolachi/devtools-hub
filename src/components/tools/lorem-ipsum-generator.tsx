"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence() {
  const len = 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function makeParagraph(sentences: number) {
  return Array.from({ length: sentences }, makeSentence).join(" ");
}

export default function LoremIpsumGenerator() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(0);

  const generate = () => {
    if (unit === "words") {
      const words = Array.from({ length: count }, randomWord);
      if (startWithLorem) {
        words[0] = "Lorem";
        if (words.length > 1) words[1] = "ipsum";
      }
      return words.join(" ") + ".";
    }
    if (unit === "sentences") {
      const sentences = Array.from({ length: count }, makeSentence);
      if (startWithLorem) sentences[0] = "Lorem ipsum dolor sit amet, " + sentences[0].toLowerCase();
      return sentences.join(" ");
    }
    const paragraphs = Array.from({ length: count }, () => makeParagraph(4 + Math.floor(Math.random() * 3)));
    if (startWithLorem) {
      paragraphs[0] =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraphs[0];
    }
    return paragraphs.join("\n\n");
  };

  // Regenerated on demand; seed forces recompute even with identical settings.
  const output = seed >= 0 ? generate() : "";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Generate
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as typeof unit)}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />
          Start with &quot;Lorem ipsum&quot;
        </label>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Regenerate
        </button>
        <CopyButton getValue={() => output} />
      </div>

      <div className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {output}
      </div>
    </div>
  );
}
