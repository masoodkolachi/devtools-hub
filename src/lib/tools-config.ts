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
  {
    slug: "json-yaml-converter",
    name: "JSON to YAML Converter",
    shortDescription: "Convert between JSON and YAML formats.",
    description:
      "Convert JSON data to YAML or YAML back to JSON, useful for config files, Kubernetes manifests, and CI pipelines.",
    category: "json",
    keywords: ["json", "yaml", "converter", "config"],
    exampleInput: '{"name": "Ada", "active": true}',
    exampleOutput: "name: Ada\nactive: true",
    component: dynamic(() => import("@/components/tools/json-yaml-converter")),
  },
  {
    slug: "json-compare",
    name: "JSON Compare",
    shortDescription: "Diff two JSON objects and see what changed.",
    description:
      "Paste two JSON objects side by side to see every added, removed, or changed key between them, with the exact path to each difference.",
    category: "json",
    keywords: ["json", "compare", "diff", "difference"],
    exampleInput: '{"a":1} vs {"a":2}',
    exampleOutput: "$.a changed from 1 to 2",
    component: dynamic(() => import("@/components/tools/json-compare")),
  },
  {
    slug: "box-shadow-generator",
    name: "Box Shadow Generator",
    shortDescription: "Visually build a CSS box-shadow.",
    description:
      "Adjust offset, blur, spread, color, and opacity with sliders and copy the generated box-shadow CSS instantly.",
    category: "css",
    keywords: ["css", "box shadow", "generator", "design"],
    exampleInput: "x:0 y:4 blur:12",
    exampleOutput: "box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.2);",
    component: dynamic(() => import("@/components/tools/box-shadow-generator")),
  },
  {
    slug: "border-radius-generator",
    name: "Border Radius Generator",
    shortDescription: "Visually build a CSS border-radius.",
    description:
      "Adjust each corner independently or linked together and copy the generated border-radius CSS.",
    category: "css",
    keywords: ["css", "border radius", "generator", "rounded corners"],
    exampleInput: "16px all corners",
    exampleOutput: "border-radius: 16px 16px 16px 16px;",
    component: dynamic(() => import("@/components/tools/border-radius-generator")),
  },
  {
    slug: "gradient-generator",
    name: "Gradient Generator",
    shortDescription: "Build linear or radial CSS gradients visually.",
    description:
      "Pick two colors and an angle to generate a linear or radial CSS gradient, with a live preview and copyable code.",
    category: "css",
    keywords: ["css", "gradient", "linear-gradient", "radial-gradient", "generator"],
    exampleInput: "#3B82F6 to #8B5CF6 at 135deg",
    exampleOutput: "background: linear-gradient(135deg, #3B82F6, #8B5CF6);",
    component: dynamic(() => import("@/components/tools/gradient-generator")),
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    shortDescription: "Convert between binary, octal, decimal, and hex.",
    description:
      "Type a number in any base — binary, octal, decimal, or hexadecimal — and see it converted to all the others instantly.",
    category: "numbers",
    keywords: ["binary", "hex", "octal", "decimal", "base converter"],
    exampleInput: "255 (decimal)",
    exampleOutput: "0xFF (hex), 0b11111111 (binary)",
    component: dynamic(() => import("@/components/tools/number-base-converter")),
  },
  {
    slug: "http-status-explorer",
    name: "HTTP Status Code Explorer",
    shortDescription: "Look up what any HTTP status code means.",
    description:
      "Search or browse common HTTP status codes with plain-language explanations, grouped by success, redirect, client error, and server error.",
    category: "networking",
    keywords: ["http", "status code", "404", "500", "networking"],
    exampleInput: "404",
    exampleOutput: "Not Found — the server can't find the requested resource.",
    component: dynamic(() => import("@/components/tools/http-status-explorer")),
  },
  {
    slug: "mime-type-finder",
    name: "MIME Type Finder",
    shortDescription: "Look up the MIME type for any file extension.",
    description:
      "Search by file extension or MIME type to find the correct Content-Type value for HTTP headers and file uploads.",
    category: "networking",
    keywords: ["mime type", "content-type", "file extension"],
    exampleInput: "json",
    exampleOutput: "application/json",
    component: dynamic(() => import("@/components/tools/mime-type-finder")),
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    shortDescription: "See one moment in time across many time zones.",
    description:
      "Pick a date and time and instantly see what it looks like on a clock in cities and time zones around the world.",
    category: "date-time",
    keywords: ["timezone", "time zone", "converter", "world clock"],
    exampleInput: "Now, in your local timezone",
    exampleOutput: "Same moment shown across 20 zones",
    component: dynamic(() => import("@/components/tools/time-zone-converter")),
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    shortDescription: "Generate random numbers in any range.",
    description:
      "Generate one or many random numbers within a min/max range, with an option to allow or exclude duplicates.",
    category: "generators",
    keywords: ["random number", "generator", "range"],
    exampleInput: "1–100, 5 numbers",
    exampleOutput: "42, 7, 88, 15, 63",
    component: dynamic(() => import("@/components/tools/random-number-generator")),
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
