import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { tools } from "@/lib/tools-config";
import { categories } from "@/lib/categories";
import { ToolCard } from "@/components/tool-card";
import { CategoryCard } from "@/components/category-card";

const stats = [
  { label: "Tools available", value: "100+", icon: Sparkles },
  { label: "Cost to use", value: "Free forever", icon: ShieldCheck },
  { label: "Account needed", value: "No login required", icon: Lock },
  { label: "Everything runs", value: "Fast & secure", icon: Zap },
];

const faqs = [
  {
    q: "Is DevTools Hub really free?",
    a: "Yes. Every tool is free to use, with no account, no paywall, and no usage limits.",
  },
  {
    q: "Do my inputs get sent to a server?",
    a: "Most tools run entirely in your browser, so your data never leaves your device.",
  },
  {
    q: "Can I request a new tool?",
    a: "Reach out through the About page — new tools are added regularly.",
  },
  {
    q: "Will DevTools Hub always stay free?",
    a: "Yes, the core toolset stays free. Ads may appear in designated spots to support hosting costs.",
  },
];

export default function Home() {
  const popular = tools.slice(0, 8);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <Sparkles size={12} /> 100+ tools, one place
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
          Developer tools that <br className="hidden sm:block" /> actually save time.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
          Formatters, converters, generators, and calculators, all in your browser.
          No sign-up, no clutter, no waiting.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            Browse all tools <ArrowRight size={16} />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            View categories
          </Link>
        </div>
      </section>

      {/* Header banner ad placeholder */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-black/10 dark:border-white/10 text-xs text-neutral-400">
          Ad placeholder — header banner
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 text-center"
            >
              <s.icon size={18} className="mx-auto text-neutral-400" />
              <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Popular tools</h2>
          <Link href="/tools" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* In-content ad placeholder */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-black/10 dark:border-white/10 text-xs text-neutral-400">
          Ad placeholder — in-content
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-black/5 dark:divide-white/10 rounded-xl border border-black/10 dark:border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-medium text-neutral-900 dark:text-white">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
