import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and updates from DevTools Hub.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">Blog</h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">
        Guides on using each tool, plus release notes as new tools ship, will appear here.
      </p>
      <div className="mt-10 rounded-xl border border-dashed border-black/10 dark:border-white/10 p-10 text-center text-neutral-400">
        No posts yet — check back soon.
      </div>
    </div>
  );
}
