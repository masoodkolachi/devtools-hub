import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tools, getTool, getToolsByCategory } from "@/lib/tools-config";
import { getCategory } from "@/lib/categories";
import { Breadcrumb } from "@/components/breadcrumb";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  const url = `/tools/${tool.slug}`;
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} | DevTools Hub`,
      description: tool.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${tool.name} | DevTools Hub`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const category = getCategory(tool.category);
  const related = getToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 5);
  const ToolComponent = tool.component;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category?.name ?? "Tools", href: `/categories/${tool.category}` },
          { label: tool.name },
        ]}
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_260px]">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">{tool.name}</h1>
          <p className="mt-2 max-w-2xl text-neutral-500 dark:text-neutral-400">{tool.description}</p>

          <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] p-4 sm:p-6">
            <ToolComponent />
          </div>

          {(tool.exampleInput || tool.exampleOutput) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tool.exampleInput && (
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <p className="text-xs font-medium text-neutral-400">Example input</p>
                  <p className="mt-1 break-all font-mono text-sm text-neutral-700 dark:text-neutral-300">
                    {tool.exampleInput}
                  </p>
                </div>
              )}
              {tool.exampleOutput && (
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <p className="text-xs font-medium text-neutral-400">Example output</p>
                  <p className="mt-1 break-all font-mono text-sm text-neutral-700 dark:text-neutral-300">
                    {tool.exampleOutput}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* In-content ad placeholder */}
          <div className="mt-8 flex h-20 items-center justify-center rounded-lg border border-dashed border-black/10 dark:border-white/10 text-xs text-neutral-400">
            Ad placeholder — in-content
          </div>
        </div>

        <aside className="space-y-6">
          {/* Sidebar ad placeholder */}
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-black/10 dark:border-white/10 text-xs text-neutral-400">
            Ad placeholder — sidebar
          </div>

          {related.length > 0 && (
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                More {category?.name} tools
              </p>
              <ul className="mt-3 space-y-2">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
