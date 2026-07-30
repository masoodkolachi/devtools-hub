import type { Metadata } from "next";
import { ToolsBrowser } from "@/components/tools-browser";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse and search every free developer tool on DevTools Hub.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">All Tools</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        Search by name, description, or category.
      </p>
      <ToolsBrowser />
    </div>
  );
}
