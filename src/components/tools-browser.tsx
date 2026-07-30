"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { tools } from "@/lib/tools-config";
import { categories } from "@/lib/categories";
import { ToolCard } from "@/components/tool-card";

export function ToolsBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      const matchesCategory = category === "all" || t.category === category;
      const matchesQuery =
        !q ||
        [t.name, t.shortDescription, t.category, ...t.keywords].join(" ").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const activeCategories = categories.filter((c) => tools.some((t) => t.category === c.slug));

  return (
    <div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none"
        >
          <option value="all">All categories</option>
          {activeCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-neutral-400">
        {filtered.length} tool{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-neutral-400">No tools match your search yet.</p>
        )}
      </div>
    </div>
  );
}
