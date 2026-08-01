"use client";

import { useState } from "react";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..",
  J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.",
  "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};
const REVERSE_MAP: Record<string, string> = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

function textToMorse(text: string) {
  return text
    .toUpperCase()
    .split(" ")
    .map((word) =>
      [...word]
        .map((c) => MORSE_MAP[c] ?? "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");
}

function morseToText(morse: string) {
  return morse
    .trim()
    .split(" / ")
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => REVERSE_MAP[code] ?? "")
        .join("")
    )
    .join(" ");
}

export default function MorseCodeTranslator() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("SOS HELLO WORLD");

  const output = input.trim() ? (mode === "encode" ? textToMorse(input) : morseToText(input)) : "";

  const handleSwap = () => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
          <button onClick={() => setMode("encode")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === "encode" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Text → Morse
          </button>
          <button onClick={() => setMode("decode")} className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === "decode" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"}`}>
            Morse → Text
          </button>
        </div>
        <button onClick={handleSwap} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <ArrowRightLeft size={14} /> Swap
        </button>
        <button onClick={() => setInput("")} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Trash2 size={14} /> Clear
        </button>
        <CopyButton getValue={() => output} className="ml-auto" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">{mode === "encode" ? "Text" : "Morse code (words separated by /)"}</p>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm outline-none" />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-400">{mode === "encode" ? "Morse code" : "Text"}</p>
          <pre className="min-h-[9rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-sm">
            {output || <span className="text-neutral-400">Result will appear here.</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
