import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why DevTools Hub exists and how it works.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">About DevTools Hub</h1>
      <div className="mt-6 space-y-4 text-neutral-600 dark:text-neutral-300">
        <p>
          DevTools Hub is a single place for the small utilities developers reach for every day —
          formatters, converters, generators, and calculators — without ads getting in the way of
          the actual tool, and without creating an account first.
        </p>
        <p>
          Most tools run entirely in your browser. Nothing you paste into a formatter or converter
          is sent to a server, so it stays private by default.
        </p>
        <p>
          New tools are added regularly. If there&apos;s something missing that you use often,
          it&apos;s worth checking back — the toolset is still growing toward 100+ tools.
        </p>
      </div>
    </div>
  );
}
