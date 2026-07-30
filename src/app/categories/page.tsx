import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import { CategoryCard } from "@/components/category-card";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse developer tools by category.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">Categories</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        Every tool is organized into a category so you can find what you need fast.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
