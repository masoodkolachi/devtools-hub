// Central tool registry.
//
// HOW TO ADD A NEW TOOL:
// 1. Create a client component in `src/components/tools/your-tool.tsx`
//    that default-exports a React component with no required props.
// 2. Add one entry to the `tools` array below, pointing `component`
//    at that file via a dynamic import.
// 3. Done. The homepage, /tools listing, category pages, search,
//    sitemap, and the dynamic /tools/[slug] page all pick it up
//    automatically. No other file needs to change.

import { ComponentType } from "react";
import dynamic from "next/dynamic";

export interface ToolConfig {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string; // matches Category.slug in categories.ts
  keywords: string[];
  exampleInput?: string;
  exampleOutput?: string;
  component: ComponentType;
}

export const tools: ToolConfig[] = [
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate random UUID v4 identifiers.",
    description:
      "Generate one or many RFC-4122 version 4 UUIDs, entirely in your browser. Useful for database keys, test fixtures, and request IDs.",
    category: "developer",
    keywords: ["uuid", "guid", "id", "identifier", "unique"],
    exampleInput: "Click Generate",
    exampleOutput: "3f9b2c1a-5d4e-4a11-9c2f-8e7d6a5b4c3d",
    component: dynamic(() => import("@/components/tools/uuid-generator")),
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Format, validate, and beautify JSON.",
    description:
      "Paste messy or minified JSON and get a clean, indented, syntax-checked version back, with clear error messages when something doesn't parse.",
    category: "json",
    keywords: ["json", "format", "beautify", "validate", "pretty print"],
    exampleInput: '{"name":"Ada","active":true,"tags":["dev","math"]}',
    exampleOutput: '{\n  "name": "Ada",\n  "active": true,\n  "tags": ["dev", "math"]\n}',
    component: dynamic(() => import("@/components/tools/json-formatter")),
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode text to Base64 or decode it back.",
    description:
      "Convert plain text to Base64 or decode a Base64 string back to readable text, with UTF-8 support and instant error feedback on invalid input.",
    category: "encoding",
    keywords: ["base64", "encode", "decode", "atob", "btoa"],
    exampleInput: "Hello, world!",
    exampleOutput: "SGVsbG8sIHdvcmxkIQ==",
    component: dynamic(() => import("@/components/tools/base64-encoder-decoder")),
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortDescription: "Create strong, random passwords.",
    description:
      "Generate cryptographically random passwords with adjustable length and character sets, along with a quick strength indicator.",
    category: "security",
    keywords: ["password", "generator", "random", "security", "strength"],
    exampleInput: "Length: 16, symbols on",
    exampleOutput: "k8#Lm2$Xr9!qPz4W",
    component: dynamic(() => import("@/components/tools/password-generator")),
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortDescription: "Count words, characters, and reading time.",
    description:
      "Paste any text to instantly see word count, character count, sentence count, and estimated reading time.",
    category: "text",
    keywords: ["word count", "character count", "text", "reading time"],
    exampleInput: "The quick brown fox jumps over the lazy dog.",
    exampleOutput: "9 words · 44 characters",
    component: dynamic(() => import("@/components/tools/word-counter")),
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    shortDescription: "Convert text between letter cases.",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, or kebab-case in one click.",
    category: "text",
    keywords: ["case", "uppercase", "lowercase", "camelcase", "snakecase", "kebabcase"],
    exampleInput: "hello developer world",
    exampleOutput: "helloDeveloperWorld",
    component: dynamic(() => import("@/components/tools/case-converter")),
  },
  {
    slug: "hex-rgb-converter",
    name: "HEX to RGB Converter",
    shortDescription: "Convert colors between HEX and RGB.",
    description:
      "Pick a color or type a HEX/RGB value to instantly see it converted, plus a live preview swatch.",
    category: "color",
    keywords: ["color", "hex", "rgb", "converter", "picker"],
    exampleInput: "#3B82F6",
    exampleOutput: "rgb(59, 130, 246)",
    component: dynamic(() => import("@/components/tools/hex-rgb-converter")),
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    shortDescription: "Write Markdown and preview it live.",
    description:
      "A split-pane Markdown editor with a live-rendered preview, so you can see exactly how your README or post will look.",
    category: "markdown",
    keywords: ["markdown", "preview", "editor", "readme"],
    exampleInput: "# Hello\n\nThis is **bold** text.",
    exampleOutput: "Rendered heading and bold text",
    component: dynamic(() => import("@/components/tools/markdown-preview")),
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    shortDescription: "Turn any text or URL into a QR code.",
    description:
      "Generate a downloadable QR code from any text, link, or contact detail, rendered entirely in your browser.",
    category: "generators",
    keywords: ["qr code", "generator", "barcode", "scan"],
    exampleInput: "https://example.com",
    exampleOutput: "Scannable QR code image",
    component: dynamic(() => import("@/components/tools/qr-code-generator")),
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    shortDescription: "Convert between Unix timestamps and dates.",
    description:
      "Convert a Unix timestamp to a human-readable date, or a date back into seconds/milliseconds since epoch, with your local timezone shown alongside UTC.",
    category: "date-time",
    keywords: ["unix", "timestamp", "epoch", "date", "converter"],
    exampleInput: "1735689600",
    exampleOutput: "Wed, 01 Jan 2025 00:00:00 UTC",
    component: dynamic(() => import("@/components/tools/unix-timestamp-converter")),
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    shortDescription: "Turn any text into a clean URL slug.",
    description:
      "Convert a title or phrase into a lowercase, URL-safe slug with your choice of separator, stripping accents and special characters.",
    category: "text",
    keywords: ["slug", "url", "seo", "permalink"],
    exampleInput: "My Awesome Blog Post!",
    exampleOutput: "my-awesome-blog-post",
    component: dynamic(() => import("@/components/tools/slug-generator")),
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder text for mockups.",
    description:
      "Generate any number of paragraphs, sentences, or words of classic Lorem Ipsum placeholder text for wireframes and mockups.",
    category: "text",
    keywords: ["lorem ipsum", "placeholder", "dummy text", "filler"],
    exampleInput: "3 paragraphs",
    exampleOutput: "Lorem ipsum dolor sit amet…",
    component: dynamic(() => import("@/components/tools/lorem-ipsum-generator")),
  },
  {
    slug: "line-cleaner",
    name: "Remove Duplicate / Empty Lines",
    shortDescription: "Clean up lists by removing duplicate or blank lines.",
    description:
      "Paste any list or block of text to strip duplicate lines, empty lines, or extra whitespace, with case-sensitive matching optional.",
    category: "text",
    keywords: ["duplicate lines", "empty lines", "deduplicate", "clean text"],
    exampleInput: "apple\nbanana\napple\n\ncherry",
    exampleOutput: "apple\nbanana\ncherry",
    component: dynamic(() => import("@/components/tools/line-cleaner")),
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    shortDescription: "Encode or decode URLs and query strings.",
    description:
      "Percent-encode text for safe use in URLs, or decode an already-encoded URL back to readable text.",
    category: "encoding",
    keywords: ["url encode", "url decode", "percent encoding", "uri"],
    exampleInput: "https://example.com/search?q=hello world",
    exampleOutput: "https://example.com/search%3Fq%3Dhello%20world",
    component: dynamic(() => import("@/components/tools/url-encoder-decoder")),
  },
  {
    slug: "html-encoder-decoder",
    name: "HTML Encoder / Decoder",
    shortDescription: "Convert text to and from HTML entities.",
    description:
      "Escape special characters into HTML entities so markup renders as text, or decode entities back into readable HTML.",
    category: "encoding",
    keywords: ["html encode", "html decode", "entities", "escape"],
    exampleInput: '<div class="card">Hello & welcome</div>',
    exampleOutput: "&lt;div class=&quot;card&quot;&gt;Hello &amp; welcome&lt;/div&gt;",
    component: dynamic(() => import("@/components/tools/html-encoder-decoder")),
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortDescription: "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes.",
    description:
      "Hash any text using the browser's built-in Web Crypto API and compare SHA-1, SHA-256, SHA-384, and SHA-512 digests side by side.",
    category: "security",
    keywords: ["hash", "sha256", "sha1", "sha512", "checksum"],
    exampleInput: "hello world",
    exampleOutput: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde",
    component: dynamic(() => import("@/components/tools/hash-generator")),
  },
  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    shortDescription: "Check how strong a password is.",
    description:
      "Type a password to see a live strength score against length, character variety, and common weak patterns, entirely in your browser.",
    category: "security",
    keywords: ["password strength", "security", "checker"],
    exampleInput: "correcthorsebattery",
    exampleOutput: "Strength: Strong",
    component: dynamic(() => import("@/components/tools/password-strength-checker")),
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    shortDescription: "Calculate percentages, portions, and percent change.",
    description:
      "Three calculators in one: find X% of a number, find what percent one number is of another, and calculate percent change between two values.",
    category: "calculators",
    keywords: ["percentage", "percent change", "calculator"],
    exampleInput: "20% of 150",
    exampleOutput: "30",
    component: dynamic(() => import("@/components/tools/percentage-calculator")),
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    shortDescription: "Test regular expressions against sample text.",
    description:
      "Write a regular expression and test string to see live-highlighted matches and capture groups as you type.",
    category: "regex",
    keywords: ["regex", "regular expression", "pattern", "tester"],
    exampleInput: "\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b",
    exampleOutput: "hello@example.com",
    component: dynamic(() => import("@/components/tools/regex-tester")),
  },
];

export function getTool(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): ToolConfig[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function searchTools(query: string): ToolConfig[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((t) =>
    [t.name, t.shortDescription, t.category, ...t.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
