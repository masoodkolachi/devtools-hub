import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About DevTools Hub — Who Built It & Why",
  description:
    "DevTools Hub is a free, privacy-first collection of 100+ developer tools built and maintained by Masood Ahmed, a software engineering student. Here's the story and how to get in touch.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Masood Ahmed",
    url: "https://devtools-hub-rose.vercel.app/about",
    jobTitle: "Software Engineering Student & Developer",
    sameAs: ["https://github.com/masoodkolachi", "https://www.linkedin.com/in/masoodkolachi"],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">About DevTools Hub</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        The story behind the site, what it stands for, and how to reach me.
      </p>

      <div className="mt-8 space-y-10 text-neutral-600 dark:text-neutral-300">
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Why I built this</h2>
          <p className="mt-3 leading-relaxed">
            As a web developer, I end up needing small tools — a formatter, a converter, a generator —
            far more often than I&apos;d like to admit. The annoying part was never the tools themselves,
            it was remembering which random website did which thing, and bouncing between a dozen
            different tabs and domains just to get through a normal day of work. At some point I decided
            that was a dumb problem to keep living with, so I started building one place that covers the
            tools I and other developers actually reach for regularly. It also happened to line up with a
            project I needed to build and present for university — which made it the perfect excuse to
            finally sit down and fix something that had been mildly annoying me for a long time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">What makes it different</h2>
          <ul className="mt-3 space-y-3 leading-relaxed">
            <li>
              <strong className="text-neutral-900 dark:text-white">Most tools run entirely in your browser.</strong>{" "}
              Formatters, converters, and generators process your input locally using your browser&apos;s
              own JavaScript engine — nothing you paste gets sent to a server. That&apos;s not a privacy
              policy promise, it&apos;s how the tools are actually built.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">No account, no paywall.</strong> Every
              tool is free to use with no usage limits and no login wall between you and the thing you
              actually came to do.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Built and maintained by one person.</strong>{" "}
              There&apos;s no team, no investors, no roadmap dictated by a growth target — just steady,
              deliberate additions as the toolset grows.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Who&apos;s behind it</h2>
          <p className="mt-3 leading-relaxed">
            I&apos;m Masood Ahmed, a software engineering student at Sukkur IBA University. DevTools Hub
            is a project I build and maintain in my own time, alongside coursework and other software
            projects.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link
              href="https://github.com/masoodkolachi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
            >
              <ExternalLink size={16} /> github.com/masoodkolachi
            </Link>
            <Link
              href="https://www.linkedin.com/in/masoodkolachi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
            >
              <ExternalLink size={16} /> linkedin.com/in/masoodkolachi
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Get in touch</h2>
          <p className="mt-3 leading-relaxed">
            Found a bug, have a tool you&apos;d like to see added, or just want to say hello? I read
            everything that comes in.
          </p>
          <a
            href="mailto:kolachimasood77@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
          >
            <Mail size={16} /> kolachimasood77@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
}
