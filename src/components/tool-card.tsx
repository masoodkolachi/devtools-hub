import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ToolConfig } from "@/lib/tools-config";

export function ToolCard({ tool }: { tool: ToolConfig }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 transition-all hover:border-black/20 dark:hover:border-white/20 hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-neutral-900 dark:text-white">{tool.name}</h3>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
          />
        </div>
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{tool.shortDescription}</p>
      </div>
      <span className="mt-4 inline-block w-fit rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-xs capitalize text-neutral-500 dark:text-neutral-400">
        {tool.category.replace("-", " ")}
      </span>
    </Link>
  );
}
