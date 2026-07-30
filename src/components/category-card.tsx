import Link from "next/link";
import type { Category } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools-config";

export function CategoryCard({ category }: { category: Category }) {
  const count = getToolsByCategory(category.slug).length;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 transition-all hover:border-black/20 dark:hover:border-white/20 hover:shadow-md"
    >
      <h3 className="font-medium text-neutral-900 dark:text-white">{category.name}</h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{category.description}</p>
      <p className="mt-3 text-xs font-medium text-neutral-400">{count} tool{count === 1 ? "" : "s"}</p>
    </Link>
  );
}
