"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

function stats(text: string) {
  const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) || []).length || (text.trim() ? 1 : 0) : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim()).length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));
  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const s = stats(text);

  const cards = [
    { label: "Words", value: s.words },
    { label: "Characters", value: s.characters },
    { label: "Characters (no spaces)", value: s.charactersNoSpaces },
    { label: "Sentences", value: s.sentences },
    { label: "Paragraphs", value: s.paragraphs },
    { label: "Reading time", value: `${s.readingTime} min` },
  ];

  return (
    <div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => setText("")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        rows={10}
        className="mt-3 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
      />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 text-center"
          >
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">{c.value}</p>
            <p className="mt-0.5 text-xs text-neutral-400">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
