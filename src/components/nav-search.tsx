"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchTools } from "@/lib/tools-config";

export function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = open ? searchTools(query).slice(0, 8) : [];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Search tools"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Search tools…</span>
        <kbd className="hidden sm:inline rounded border border-black/10 dark:border-white/10 px-1.5 py-0.5 text-[10px]">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 px-4 py-3">
              <Search size={16} className="text-neutral-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 100+ tools…"
                className="w-full bg-transparent text-sm outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search">
                <X size={16} className="text-neutral-400" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-neutral-400">
                  {query ? "No tools matched your search." : "Start typing to search…"}
                </li>
              )}
              {results.map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      router.push(`/tools/${tool.slug}`);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <span className="font-medium text-neutral-900 dark:text-white">{tool.name}</span>
                    <span className="ml-2 text-neutral-400">{tool.shortDescription}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
