import Link from "next/link";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-semibold text-neutral-900 dark:text-white">DevTools Hub</p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              100+ free developer tools. No login. No tracking your data.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Categories</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-neutral-900 dark:hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><Link href="/about" className="hover:text-neutral-900 dark:hover:text-white">About</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white">Blog</Link></li>
              <li><Link href="/tools" className="hover:text-neutral-900 dark:hover:text-white">All Tools</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Newsletter</p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-neutral-900 dark:bg-white px-3 py-2 text-sm font-medium text-white dark:text-neutral-900"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer ad placeholder — no ad code, layout space only */}
        <div className="mt-10 flex h-16 items-center justify-center rounded-lg border border-dashed border-black/10 dark:border-white/10 text-xs text-neutral-400">
          Ad placeholder — footer banner
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} DevTools Hub. Built for developers, free forever.
        </p>
      </div>
    </footer>
  );
}
