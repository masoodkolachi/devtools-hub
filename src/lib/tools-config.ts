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

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSeoContent {
  /** Optimized <title> — falls back to `${name} — Free Online Tool` if omitted */
  seoTitle?: string;
  /** Optimized meta description — falls back to `description` if omitted */
  seoDescription?: string;
  /** 150-300 word intro answering "what is this and when do I need it" */
  intro: string;
  /** A concrete, realistic scenario — this is the E-E-A-T / differentiation content */
  whenToUse: string;
  /** How the tool/technique actually works, in plain language */
  howItWorks: string;
  faqs: ToolFaq[];
}

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
  seo?: ToolSeoContent;
}

export const tools: ToolConfig[] = [
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate random UUID v4 identifiers.",
    description:
      "Generate one or many RFC-4122 version 4 UUIDs, entirely in your browser. Useful for database keys, test fixtures, and request IDs.",
    category: "developer",
    keywords: ["uuid generator", "guid generator", "random uuid v4", "generate unique id"],
    exampleInput: "Click Generate",
    exampleOutput: "3f9b2c1a-5d4e-4a11-9c2f-8e7d6a5b4c3d",
    component: dynamic(() => import("@/components/tools/uuid-generator")),
    seo: {
      seoTitle: "UUID Generator — Free Random UUID v4 Online",
      seoDescription:
        "Generate RFC 4122 version 4 UUIDs instantly, one or in bulk. Cryptographically random, copy-ready, runs entirely in your browser with no tracking.",
      intro:
        "A UUID (Universally Unique Identifier) is a 128-bit value formatted as 32 hex digits split into five groups (8-4-4-4-12), like 3f9b2c1a-5d4e-4a11-9c2f-8e7d6a5b4c3d. The version 4 variant this tool generates is random rather than derived from a timestamp or hardware address — 122 of its 128 bits are chosen randomly, which makes the odds of two systems ever generating the same UUID by accident astronomically small, without needing a central authority to hand out IDs. That's what makes UUIDs useful for distributed systems where multiple services need to generate unique IDs independently.",
      whenToUse:
        "UUIDs show up constantly as primary keys in databases (especially when you want IDs generated client-side or across multiple services without coordination), as request IDs for tracing a single request through logs across microservices, as API keys or session tokens, and as unique identifiers for test fixtures so parallel test runs don't collide. If you're building a REST API and need a placeholder resource ID while writing example requests, generating a batch here is faster than making one up.",
      howItWorks:
        "This tool uses crypto.randomUUID(), a built-in browser API backed by the operating system's cryptographically secure random number generator — the same underlying entropy source used for generating encryption keys. That's an important distinction from UUIDs generated with Math.random(), which is not cryptographically secure and can theoretically be predicted; crypto.randomUUID() doesn't have that weakness. The version (4) and variant bits are set automatically per the RFC 4122 spec so the output is a standards-compliant v4 UUID that any system expecting one will accept.",
      faqs: [
        {
          question: "What's the difference between a UUID and a GUID?",
          answer:
            "They're effectively the same thing — GUID (Globally Unique Identifier) is Microsoft's term for the same 128-bit identifier format standardized as UUID in RFC 4122. The formats are interchangeable in practice.",
        },
        {
          question: "Can two UUID v4 values ever collide?",
          answer:
            "Theoretically yes, but the probability is negligible — with 122 random bits, you'd need to generate roughly 2.7 quintillion UUIDs before there's a 50% chance of a single collision. For virtually all practical purposes, UUID v4 values are treated as guaranteed unique.",
        },
        {
          question: "Should I use UUID v4 or v7 for database primary keys?",
          answer:
            "UUID v4 is fully random, which can hurt database index performance because new rows insert at random locations in the index. UUID v7 (a newer standard) embeds a timestamp so IDs sort roughly chronologically, giving better insert performance for large tables. If your database performance is a concern, v7 is usually the better choice for primary keys specifically.",
        },
        {
          question: "Is it safe to use a UUID as a security token or API key?",
          answer:
            "A cryptographically random UUID v4 (like the ones this tool generates) has enough entropy to be unguessable, but UUIDs aren't designed as secrets — they're commonly logged, shown in URLs, and displayed in UIs. For anything security-sensitive, use a dedicated secret generated for that purpose rather than repurposing a UUID.",
        },
      ],
    },
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Format, validate, and beautify JSON.",
    description:
      "Paste messy or minified JSON and get a clean, indented, syntax-checked version back, with clear error messages when something doesn't parse.",
    category: "json",
    keywords: ["json formatter", "json validator", "json beautifier", "json pretty print", "format json online"],
    exampleInput: '{"name":"Ada","active":true,"tags":["dev","math"]}',
    exampleOutput: '{\n  "name": "Ada",\n  "active": true,\n  "tags": ["dev", "math"]\n}',
    component: dynamic(() => import("@/components/tools/json-formatter")),
    seo: {
      seoTitle: "JSON Formatter & Validator — Free Online Tool",
      seoDescription:
        "Format, validate, and beautify JSON instantly in your browser. Paste minified or broken JSON and get clean, indented output with clear error messages. No signup, no data leaves your device.",
      intro:
        "A JSON formatter takes compact or poorly indented JSON — the kind you get from a minified API response, a database export, or a log file — and rewrites it with consistent indentation, line breaks, and spacing so a human can actually read it. This tool also validates the JSON as it formats it: if a brace is unbalanced, a comma is missing, or a string isn't properly quoted, you'll get a specific error instead of a silent failure. Because everything runs in your browser using the built-in JSON.parse(), nothing you paste here is ever sent to a server, which matters if the payload contains real API keys, tokens, or customer data.",
      whenToUse:
        "The most common case is debugging: you copy a response body out of your browser's network tab or a server log, and it's one unreadable line. Pasting it here turns it into a structure you can actually scan for the field that's wrong. It's also useful before committing a config file — many build tools (package.json, tsconfig.json, API schemas) are strict about JSON syntax, and catching a trailing comma here is faster than waiting for a build to fail. Teams also use it to normalize formatting before a code review, so a diff shows only the actual data change instead of noisy whitespace differences.",
      howItWorks:
        "Under the hood, the tool calls the browser's native JSON.parse() on your input, which either succeeds and gives back a JavaScript object, or throws a syntax error with a position in the string. On success, JSON.stringify() re-serializes that object with your chosen indent width (2 or 4 spaces). This round-trip through parse-then-stringify is what both validates and reformats in one step — it's the same approach any JSON tool uses, since JSON.parse() is intentionally strict about the spec (unlike JavaScript object literals, real JSON doesn't allow trailing commas, single quotes, or unquoted keys).",
      faqs: [
        {
          question: "Is it safe to paste API keys or tokens into this JSON formatter?",
          answer:
            "Yes — this tool runs entirely client-side in your browser. Nothing you type or paste is transmitted to any server; the formatting and validation happen locally using your browser's built-in JSON parser.",
        },
        {
          question: "Why does my JSON fail to format even though it looks correct?",
          answer:
            "The most common causes are trailing commas after the last item in an object or array, single quotes instead of double quotes around strings, and unquoted object keys — all valid in JavaScript object literals but not in strict JSON. The error message will point to roughly where parsing failed.",
        },
        {
          question: "What's the difference between formatting and minifying JSON?",
          answer:
            "Formatting (beautifying) adds indentation and line breaks to make JSON readable by humans. Minifying strips all unnecessary whitespace to make the payload as small as possible for transmission. This tool does both — use Minify when you need to shrink a payload, and the default formatted view when you need to read it.",
        },
        {
          question: "Can I convert the formatted JSON to another format?",
          answer:
            "Yes — if you need YAML, CSV, or a JSON Schema instead, this site also has dedicated JSON to YAML, CSV to JSON, and JSON Schema Generator tools that accept the same input.",
        },
      ],
    },
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode text to Base64 or decode it back.",
    description:
      "Convert plain text to Base64 or decode a Base64 string back to readable text, with UTF-8 support and instant error feedback on invalid input.",
    category: "encoding",
    keywords: ["base64 encode", "base64 decode", "base64 converter", "atob btoa online"],
    exampleInput: "Hello, world!",
    exampleOutput: "SGVsbG8sIHdvcmxkIQ==",
    component: dynamic(() => import("@/components/tools/base64-encoder-decoder")),
    seo: {
      seoTitle: "Base64 Encode & Decode — Free Online Converter",
      seoDescription:
        "Encode text to Base64 or decode Base64 back to plain text instantly. Full UTF-8 support for emoji and non-English characters. Runs entirely in your browser.",
      intro:
        "Base64 is a way of representing binary or text data using only 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It doesn't compress or encrypt anything — it just re-encodes data into a format that's safe to put inside places that don't handle raw binary well, like email bodies, URLs, JSON strings, or HTML attributes. This tool converts text to Base64 and back, with proper UTF-8 handling so accented characters and emoji round-trip correctly, which is a common source of bugs in simpler Base64 tools that only handle plain ASCII.",
      whenToUse:
        "You'll run into Base64 most often when embedding a small image directly in CSS or HTML as a data URI, decoding the payload of a JWT to inspect it, reading Basic Auth credentials out of an HTTP Authorization header, or debugging why an API is sending back a garbled string that turns out to just be Base64-encoded JSON. It's also common when working with email (MIME attachments are Base64-encoded) or when a config file stores a binary secret as text.",
      howItWorks:
        "Encoding works by taking your text's UTF-8 byte representation and mapping every group of 3 bytes to 4 Base64 characters, using padding (=) when the input isn't a multiple of 3 bytes. This tool uses the browser's built-in btoa()/atob() functions, but wraps them with encodeURIComponent/decodeURIComponent so multi-byte UTF-8 characters (like emoji or accented letters) don't break — a raw btoa() call alone will throw or corrupt data on anything outside the Latin1 range, which is the most common bug people hit when Base64-encoding by hand.",
      faqs: [
        {
          question: "Is Base64 the same as encryption?",
          answer:
            "No. Base64 is an encoding scheme, not encryption — anyone can decode it instantly with no key or password. Never use Base64 alone to protect sensitive data; use it purely for safely representing data as text, and use actual encryption (like AES) if you need confidentiality.",
        },
        {
          question: "Why does my Base64 string end with one or two = signs?",
          answer:
            "The = characters are padding. Base64 encodes data in 3-byte chunks; if your original input isn't a multiple of 3 bytes, padding is added so the output length stays a multiple of 4 characters. One = means the input had 2 bytes left over, two = means 1 byte was left over.",
        },
        {
          question: "Why did decoding my Base64 string fail or produce garbage?",
          answer:
            "The most common cause is that the string isn't actually Base64 — for example, it's URL-safe Base64 (which uses - and _ instead of + and /), or it has line breaks or extra whitespace mixed in. Strip whitespace and swap URL-safe characters back before decoding.",
        },
        {
          question: "Can I Base64-encode an image, not just text?",
          answer:
            "Yes, but for images specifically this site has a dedicated Image to Base64 Converter that handles binary image data and produces a ready-to-use data:image/... URI, which is more convenient than converting through plain text.",
        },
      ],
    },
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortDescription: "Create strong, random passwords.",
    description:
      "Generate cryptographically random passwords with adjustable length and character sets, along with a quick strength indicator.",
    category: "security",
    keywords: ["password generator", "strong password generator", "random password online", "secure password"],
    exampleInput: "Length: 16, symbols on",
    exampleOutput: "k8#Lm2$Xr9!qPz4W",
    component: dynamic(() => import("@/components/tools/password-generator")),
    seo: {
      seoTitle: "Password Generator — Free Strong & Secure Passwords",
      seoDescription:
        "Generate strong, random passwords with adjustable length and character sets. Cryptographically secure, with a live strength meter. Nothing is stored or transmitted.",
      intro:
        "A password generator creates random passwords that are hard to guess and resistant to the automated cracking techniques attackers actually use — dictionary attacks (trying real words and common substitutions) and brute-force attacks (trying every possible combination). The strength of a random password comes almost entirely from length and character variety: a longer password drawn from a larger character set has exponentially more possible combinations for an attacker to search through, which is why this tool lets you control both independently rather than just picking a fixed length.",
      whenToUse:
        "Use a generated password any time you're creating a new account, especially for anything tied to money, email recovery, or admin access — these are the accounts attackers target first, because compromising them often unlocks everything else. It's also the right tool when setting a database or service password during deployment, since a memorable password is a weak password by definition, and a password manager (not your memory) should be holding onto the result anyway.",
      howItWorks:
        "The generator uses crypto.getRandomValues(), the browser's cryptographically secure random number source, to pick each character — not Math.random(), which is faster but not designed to resist prediction and shouldn't be used for anything security-related. Each character is drawn independently and uniformly from whichever character sets you've enabled (lowercase, uppercase, numbers, symbols), so the strength meter reflects the actual combinatorial size of the password space: more enabled sets and more length both directly increase how long a brute-force attack would take.",
      faqs: [
        {
          question: "How long should a strong password be?",
          answer:
            "At least 12 characters is a reasonable modern minimum, and 16+ is better if the site allows it. Length matters more than complexity — a 20-character password using only lowercase letters is generally harder to brute-force than an 8-character password mixing every character type.",
        },
        {
          question: "Is it safe to generate my password in a browser tool like this?",
          answer:
            "Yes, as long as the tool generates it client-side and never transmits it — which is the case here. The password is created and shown entirely in your browser using the Web Crypto API, and nothing is logged, stored, or sent to any server.",
        },
        {
          question: "Should I reuse a strong password across multiple sites?",
          answer:
            "No — even a very strong password should be unique per site. If one service you use suffers a data breach, reused passwords let attackers immediately try that same password on your other accounts (called credential stuffing). Use a password manager to generate and store a different strong password for every account.",
        },
        {
          question: "Do I need symbols in my password, or are letters and numbers enough?",
          answer:
            "Symbols add some entropy but the bigger factor is always length. If a site restricts symbols or you want something slightly easier to type, a longer letters-and-numbers password is a reasonable tradeoff — this tool's strength meter will show you the practical difference as you toggle character sets.",
        },
      ],
    },
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
    keywords: ["hex to rgb converter", "rgb to hex", "color code converter", "css color picker"],
    exampleInput: "#3B82F6",
    exampleOutput: "rgb(59, 130, 246)",
    component: dynamic(() => import("@/components/tools/hex-rgb-converter")),
    seo: {
      seoTitle: "HEX to RGB Converter — Free Online Color Code Tool",
      seoDescription:
        "Convert colors between HEX and RGB instantly with a live preview swatch. Pick a color visually or type a code directly. No signup required.",
      intro:
        "HEX and RGB are two different ways of writing down the exact same color information for use in CSS, design tools, and image editors. HEX (like #3B82F6) packs red, green, and blue values into a six-digit hexadecimal string, while RGB (like rgb(59, 130, 246)) writes those same three values out as plain decimal numbers from 0-255. Neither format is more 'correct' — different tools and codebases just have different conventions, and this converter exists because you'll regularly need to translate between them (a design tool exports HEX, but a JavaScript animation library expects RGB values you can interpolate between, for example).",
      whenToUse:
        "This comes up constantly in frontend work: a designer hands you a HEX code from Figma, but you're writing JavaScript that needs individual R, G, B channels to calculate opacity or blend colors. Or the reverse — you're reading a color out of a canvas pixel (which gives RGB) and need to write it into a CSS class as HEX. It's also useful for quickly sanity-checking a color value someone sent you looks like what you expect, using the live swatch preview.",
      howItWorks:
        "Converting HEX to RGB is base conversion: each pair of hex digits (00-FF) represents one color channel and converts directly to its decimal equivalent (0-255) — for example, hex 3B is 59 in decimal, which becomes the red value in rgb(59, 130, 246). Converting the other direction reverses this, formatting each decimal channel value back into two-digit hexadecimal and concatenating them with a # prefix. This is exact, lossless math in both directions — there's no rounding or approximation, since both formats represent the same underlying 24-bit color value.",
      faqs: [
        {
          question: "Why do some HEX codes have 3 digits and others have 6?",
          answer:
            "A 3-digit HEX code (like #3BF) is shorthand where each digit is doubled to form the full 6-digit value (#33BBFF) — it only works when both digits in each channel pair are identical. Most colors need the full 6-digit form; the 3-digit shorthand is just a CSS convenience for colors that happen to fit the pattern.",
        },
        {
          question: "What's the difference between RGB and RGBA?",
          answer:
            "RGBA adds a fourth value — alpha — controlling transparency, from 0 (fully transparent) to 1 (fully opaque). Plain RGB and HEX have no transparency information; if you need to convert a color that includes opacity, you'll need the RGBA or 8-digit HEX (#RRGGBBAA) format specifically.",
        },
        {
          question: "Can I convert HEX or RGB to HSL instead?",
          answer:
            "This tool focuses on HEX/RGB conversion, but the Palette Generator tool on this site works internally with HSL and can help you explore related shades, tints, and complementary colors from a base HEX value.",
        },
      ],
    },
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
    keywords: ["qr code generator", "free qr code maker", "generate qr code online", "qr code from url"],
    exampleInput: "https://example.com",
    exampleOutput: "Scannable QR code image",
    component: dynamic(() => import("@/components/tools/qr-code-generator")),
    seo: {
      seoTitle: "QR Code Generator — Free, No Signup, Downloadable PNG",
      seoDescription:
        "Turn any URL or text into a scannable QR code instantly. Adjustable size, downloadable as PNG, generated entirely in your browser with no expiry or tracking.",
      intro:
        "A QR code is a two-dimensional barcode that encodes text data — most often a URL — into a pattern of black and white squares that any smartphone camera can scan and decode instantly. Unlike some QR code generators that route the scanned URL through their own redirect service (so they can track scans, and which can break if the service ever shuts down), this tool encodes your data directly into the QR code itself with no intermediary, no expiry, and no tracking.",
      whenToUse:
        "QR codes are useful anywhere you need to bridge a physical object or space to a digital destination: printed on a business card or flyer linking to a website, on packaging linking to setup instructions, on a poster linking to an event registration form, or for quickly transferring a Wi-Fi password or contact card to a phone without typing it manually. They're also commonly used in restaurants for digital menus and in presentations to let an audience quickly open a link without typing a URL.",
      howItWorks:
        "QR code generation follows the QR code specification (ISO/IEC 18004), which encodes your input text using one of several error-correction levels — meaning the code remains scannable even if part of it is damaged, obscured, or poorly printed, since redundant data is built into the pattern. This tool generates the code entirely client-side in your browser using a JavaScript QR encoding library, then renders it to canvas so you can download it as a PNG — your URL or text never leaves your device or gets sent to any server in the process.",
      faqs: [
        {
          question: "Do QR codes generated by this tool expire?",
          answer:
            "No. Because the data is encoded directly into the QR code pattern with no redirect service in between, the code will keep working for as long as the underlying URL or content it points to remains valid — there's no expiration built into the QR code itself.",
        },
        {
          question: "What's the maximum amount of text a QR code can hold?",
          answer:
            "It depends on the QR code's version (size) and error-correction level, but a standard QR code can hold roughly up to 4,000 alphanumeric characters or about 3,000 bytes of binary data. In practice, shorter content (like a URL) produces a simpler, more reliably scannable code.",
        },
        {
          question: "Can I use a generated QR code for commercial printing?",
          answer:
            "Yes — download the PNG at a large enough size for your print resolution. For print use, generate the code larger than you think you need (higher pixel dimensions), since scaling a small QR code up can introduce blur that hurts scannability.",
        },
        {
          question: "Why won't my QR code scan?",
          answer:
            "The most common causes are insufficient contrast (light gray on white, for example), the code being too small relative to the scanning distance, or damage/obstruction covering one of the three corner alignment squares. Try increasing the size and testing with your phone's actual camera app before finalizing.",
        },
      ],
    },
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    shortDescription: "Convert between Unix timestamps and dates.",
    description:
      "Convert a Unix timestamp to a human-readable date, or a date back into seconds/milliseconds since epoch, with your local timezone shown alongside UTC.",
    category: "date-time",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "unix time online"],
    exampleInput: "1735689600",
    exampleOutput: "Wed, 01 Jan 2025 00:00:00 UTC",
    component: dynamic(() => import("@/components/tools/unix-timestamp-converter")),
    seo: {
      seoTitle: "Unix Timestamp Converter — Epoch to Date, Free Online",
      seoDescription:
        "Convert Unix timestamps to human-readable dates and back, in UTC and your local timezone. Instant, accurate, no signup required.",
      intro:
        "A Unix timestamp (also called epoch time) is a single number representing a point in time: the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC — an arbitrary reference point chosen when Unix systems were first designed. Computers store and compare dates as timestamps because a single number is trivial to sort, compare, and do arithmetic on, unlike a formatted date string. This tool converts between that raw number and a readable date, showing both UTC and your local timezone side by side, since timestamp values are always in UTC but you usually want to read them in your own timezone.",
      whenToUse:
        "You'll hit Unix timestamps constantly when reading API responses (created_at or expires_at fields are very often returned as raw epoch numbers), debugging why a JWT's exp claim seems wrong, setting up a cron job or scheduled task where you need to reason about specific future times, or querying a database where date columns are stored as timestamps. It's also useful when a log file shows raw timestamps and you need to quickly figure out what time an event actually happened.",
      howItWorks:
        "Converting a timestamp to a date is simple multiplication and JavaScript's built-in Date object: seconds-since-epoch × 1000 gives milliseconds-since-epoch, which is what JavaScript's new Date() constructor expects. Converting the other direction — a picked date back to a timestamp — uses Date.getTime() and divides by 1000. The tricky part users usually run into isn't the math, it's units: some systems (like JavaScript itself) use milliseconds since epoch, while Unix and most backend systems use seconds — this tool shows both explicitly so you don't have to guess which one an API expects.",
      faqs: [
        {
          question: "Is a Unix timestamp in seconds or milliseconds?",
          answer:
            "Traditionally, Unix timestamps are in seconds — that's the original Unix/POSIX standard. However, JavaScript's Date.now() and many modern APIs use milliseconds instead. If a timestamp looks unexpectedly large (13 digits instead of 10), it's very likely milliseconds, not seconds.",
        },
        {
          question: "Why is the date shown different between UTC and my local time?",
          answer:
            "A Unix timestamp represents one universal moment in time, but that same moment corresponds to different clock times depending on timezone — 00:00 UTC is a different local hour almost everywhere else in the world. This tool shows both so you can see exactly how the timestamp maps to your own timezone.",
        },
        {
          question: "What happens when Unix timestamps run out in 2038?",
          answer:
            "This is the '2038 problem' — systems that store timestamps as a 32-bit signed integer will overflow on January 19, 2038, wrapping around to a negative number. Modern systems use 64-bit integers for timestamps, which pushes the same limit out roughly 292 billion years, so this only affects older 32-bit systems.",
        },
        {
          question: "Can Unix timestamps represent dates before 1970?",
          answer:
            "Yes, as negative numbers — a timestamp of -86400, for example, represents December 31, 1969. Most modern systems and this tool handle negative timestamps correctly, though some older or stricter systems may not.",
        },
      ],
    },
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
    keywords: ["sha256 generator", "hash generator online", "sha1 sha512 checksum", "text hash calculator"],
    exampleInput: "hello world",
    exampleOutput: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde",
    component: dynamic(() => import("@/components/tools/hash-generator")),
    seo: {
      seoTitle: "SHA-256 & Hash Generator — Free Online SHA-1/256/384/512",
      seoDescription:
        "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text instantly, side by side. Runs entirely in your browser via the Web Crypto API.",
      intro:
        "A cryptographic hash function takes any input — a word, a file, a whole document — and produces a fixed-length string of characters (the hash, or digest) that's unique to that exact input. Change even one character of the input and the entire hash output changes completely and unpredictably. Hashing is one-way: you can't reverse a hash back into the original text, which is exactly what makes it useful for verifying data integrity and, with proper additional steps, storing passwords without keeping the plaintext.",
      whenToUse:
        "Hashes are used to verify a downloaded file wasn't corrupted or tampered with (comparing the published SHA-256 checksum against the one you compute locally), to generate a consistent cache key or content fingerprint for a piece of text, and to check whether two pieces of text are identical without comparing them character by character. This tool is not for hashing passwords for storage — for that specific case, use the dedicated bcrypt tool, since general-purpose hash functions like SHA-256 are deliberately fast, which makes them unsuitable for password storage where you actually want hashing to be slow.",
      howItWorks:
        "This tool calls crypto.subtle.digest(), part of the browser's built-in Web Crypto API, which computes the hash using the same underlying algorithms (SHA-1, SHA-256, SHA-384, SHA-512) as any server-side implementation — there's no custom or simplified hashing logic here, so results match exactly what you'd get from command-line tools like sha256sum or a backend language's crypto library. The text is first encoded to UTF-8 bytes, then digested, then the resulting bytes are converted to a lowercase hexadecimal string, which is the standard way hash digests are displayed.",
      faqs: [
        {
          question: "Which hash algorithm should I use — SHA-1, SHA-256, or SHA-512?",
          answer:
            "SHA-1 is considered cryptographically broken and shouldn't be used for security purposes anymore, though it still appears in some legacy systems. SHA-256 is the current standard for most use cases (file checksums, Git commit hashes, general integrity checks). SHA-512 offers a larger output and is used where slightly higher security margins matter, at a small performance cost.",
        },
        {
          question: "Why isn't MD5 included in this tool?",
          answer:
            "MD5 isn't supported by the browser's built-in Web Crypto API, and it's also cryptographically broken — collisions (two different inputs producing the same hash) have been demonstrated in practice, so it shouldn't be relied on for security-sensitive uses regardless.",
        },
        {
          question: "Can I use a SHA-256 hash to store user passwords?",
          answer:
            "Not safely on its own. General-purpose hashes like SHA-256 are fast by design, which means an attacker with a leaked hash database can try billions of password guesses per second. Password-specific algorithms like bcrypt are deliberately slow and include salting, which is why they're the correct choice for password storage — this site has a dedicated bcrypt tool for that.",
        },
        {
          question: "Will hashing the same text twice always produce the same result?",
          answer:
            "Yes — hash functions are deterministic. The exact same input will always produce the exact same output hash, which is precisely what makes them useful for verifying that two pieces of data are identical.",
        },
      ],
    },
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
    keywords: ["regex tester", "regular expression tester", "test regex online", "regex match highlighter"],
    exampleInput: "\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b",
    exampleOutput: "hello@example.com",
    component: dynamic(() => import("@/components/tools/regex-tester")),
    seo: {
      seoTitle: "Regex Tester — Test Regular Expressions Online Free",
      seoDescription:
        "Test regular expressions against real text with live match highlighting and capture group inspection. Supports all standard JavaScript regex flags.",
      intro:
        "A regex tester lets you write a regular expression pattern and immediately see, against real sample text, exactly what it matches — highlighted inline, with capture groups broken out separately. This matters because regex is notoriously hard to get right on the first try: a pattern that looks correct can silently match too much, too little, or the wrong part of a string, and the only reliable way to catch that is to test it against real examples rather than reason about it purely in your head.",
      whenToUse:
        "Reach for a regex tester when validating user input (emails, phone numbers, postal codes), extracting a specific piece of data out of log lines or scraped text, writing a find-and-replace pattern before running it against a real codebase, or debugging why a regex in production isn't matching something it should. Testing here first — before pasting a pattern into code — catches mistakes like unescaped special characters or wrong quantifiers without needing to run and re-run your actual program.",
      howItWorks:
        "This tool runs your pattern through JavaScript's native RegExp engine — the same engine your pattern will actually run on if you're writing JavaScript or TypeScript — and calls exec() repeatedly to find every match in the test string, highlighting each one and listing out any capture groups (the parts of your pattern wrapped in parentheses). The global (g) flag is automatically applied so every match is found, not just the first one, matching how most real-world regex usage (like String.replace with a global pattern) actually behaves.",
      faqs: [
        {
          question: "Why does my regex work in this tester but not in my code?",
          answer:
            "The most common cause is flags — check that your code applies the same flags (g, i, m, etc.) shown here. Another common cause is escaping: if your pattern is inside a string literal in your code, backslashes may need to be doubled (e.g., \\\\d instead of \\d) depending on the language.",
        },
        {
          question: "What do the capture groups shown below the matches mean?",
          answer:
            "Any part of your pattern wrapped in parentheses — like (\\\\w+) — becomes a capture group, and its matched text is shown separately for each full match. Capture groups are commonly used to extract specific pieces of data, like pulling the domain out of an email match, or referenced in replacements as $1, $2, and so on.",
        },
        {
          question: "What's the difference between greedy and lazy quantifiers?",
          answer:
            "A greedy quantifier like * or + matches as much text as possible before backing off if needed. A lazy quantifier — the same symbol followed by a ? like *? — matches as little as possible instead. This matters most with patterns like <.*> against HTML, where greedy matching can span across multiple tags unintentionally.",
        },
        {
          question: "Can I use this to test find-and-replace patterns, not just matching?",
          answer:
            "This tool is focused on match testing and highlighting. For testing an actual find-and-replace with capture group references in the replacement text, this site also has a dedicated Regex Find & Replace tool.",
        },
      ],
    },
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
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode a JWT to inspect its header and payload.",
    description:
      "Paste a JSON Web Token to decode its header and payload without needing the signing key. Doesn't verify signatures.",
    category: "developer",
    keywords: ["jwt decoder", "decode json web token", "jwt debugger online", "jwt payload viewer"],
    exampleInput: "eyJhbGciOiJIUzI1NiJ9...",
    exampleOutput: '{"sub": "1234567890", "name": "Ada Lovelace"}',
    component: dynamic(() => import("@/components/tools/jwt-decoder")),
    seo: {
      seoTitle: "JWT Decoder — Free Online JSON Web Token Debugger",
      seoDescription:
        "Decode a JWT's header and payload instantly without needing the signing key. See claims, expiry, and algorithm at a glance. Runs entirely in your browser.",
      intro:
        "A JSON Web Token (JWT) is a compact, URL-safe string used to represent claims between two parties — most commonly, proof that a user is authenticated. It's made of three Base64URL-encoded parts separated by dots: a header (describing the signing algorithm), a payload (the actual claims, like user ID and expiry), and a signature (proving the token wasn't tampered with). This tool decodes the header and payload so you can read what's actually inside a token — it deliberately does not and cannot verify the signature, since that requires the secret or public key the token was signed with, which this tool never asks for or sees.",
      whenToUse:
        "This is the tool you reach for when debugging authentication — a login isn't working, an API is rejecting a token as expired, or you need to confirm which claims (user ID, roles, expiry timestamp) are actually embedded in a token you're working with. It's also useful when integrating with a third-party auth provider and you want to sanity-check the shape of the tokens they're issuing before writing code against them.",
      howItWorks:
        "JWTs use Base64URL encoding (a variant of Base64 that's safe to put directly in a URL, using - and _ instead of + and /) for the header and payload sections. This tool splits the token on its dots, Base64URL-decodes the first two segments, and pretty-prints the resulting JSON. The third segment (the signature) is intentionally left alone and unverified — decoding a JWT tells you what it claims, not whether those claims are trustworthy, which is why treating a decoded-but-unverified token as authenticated in your own code is a serious security mistake.",
      faqs: [
        {
          question: "Is it safe to paste a real JWT into this decoder?",
          answer:
            "Decoding happens entirely in your browser, so the token itself isn't transmitted anywhere. That said, JWTs often contain sensitive claims, so treat them the same way you'd treat any credential — avoid pasting production tokens into any tool, including this one, if you can reproduce the issue with a test token instead.",
        },
        {
          question: "Why can't this tool verify if my JWT signature is valid?",
          answer:
            "Verifying a signature requires the secret key (for HMAC algorithms like HS256) or public key (for RSA/ECDSA algorithms) the token was signed with — something only the issuing server should have. A tool that could verify any signature without that key would mean the signing scheme isn't actually secure.",
        },
        {
          question: "What does the 'exp' claim in my JWT payload mean?",
          answer:
            "exp is the standard claim for expiration time, given as a Unix timestamp (seconds since 1970). If the current time is past this value, the token is expired and a properly implemented server should reject it regardless of whether the signature is still valid.",
        },
        {
          question: "Why does my decoded JWT payload look different from what I expected?",
          answer:
            "Double-check you're decoding the actual token string and not a wrapped version of it (some APIs prefix tokens with \"Bearer \" in headers — that prefix isn't part of the token itself and needs to be stripped first).",
        },
      ],
    },
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    shortDescription: "Shrink image file size with an adjustable quality slider.",
    description:
      "Upload a JPG, PNG, or WebP image and compress it in your browser using the Canvas API, comparing before and after file sizes.",
    category: "image",
    keywords: ["image compressor", "shrink image", "reduce file size"],
    exampleInput: "photo.jpg (2.4 MB)",
    exampleOutput: "photo-compressed.jpg (480 KB)",
    component: dynamic(() => import("@/components/tools/image-compressor")),
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    shortDescription: "Resize an image to exact width and height.",
    description:
      "Upload an image and resize it to any dimensions, with an option to lock the aspect ratio, entirely in your browser.",
    category: "image",
    keywords: ["image resizer", "resize image", "dimensions"],
    exampleInput: "1920×1080",
    exampleOutput: "800×450",
    component: dynamic(() => import("@/components/tools/image-resizer")),
  },
  {
    slug: "image-format-converter",
    name: "Image Format Converter",
    shortDescription: "Convert images between PNG, JPG, and WebP.",
    description:
      "Upload any raster image and convert it to PNG, JPG, or WebP with adjustable quality for lossy formats.",
    category: "image",
    keywords: ["png to jpg", "jpg to png", "webp converter", "image format"],
    exampleInput: "logo.png",
    exampleOutput: "logo.webp",
    component: dynamic(() => import("@/components/tools/image-format-converter")),
  },
  {
    slug: "svg-viewer",
    name: "SVG Viewer",
    shortDescription: "Paste or upload SVG code and preview it live.",
    description:
      "Paste raw SVG markup or upload an .svg file to see it rendered instantly in a sandboxed preview against a transparency grid.",
    category: "image",
    keywords: ["svg viewer", "svg preview", "vector graphics"],
    exampleInput: "<svg>...</svg>",
    exampleOutput: "Rendered graphic",
    component: dynamic(() => import("@/components/tools/svg-viewer")),
  },
  {
    slug: "flexbox-generator",
    name: "Flexbox Generator",
    shortDescription: "Visually build CSS flexbox layouts.",
    description:
      "Adjust justify-content, align-items, direction, wrap, and gap with a live preview, then copy the generated flexbox CSS.",
    category: "css",
    keywords: ["css", "flexbox", "flex", "generator", "layout"],
    exampleInput: "justify-content: center",
    exampleOutput: "display: flex; justify-content: center;",
    component: dynamic(() => import("@/components/tools/flexbox-generator")),
  },
  {
    slug: "grid-generator",
    name: "Grid Generator",
    shortDescription: "Visually build a CSS grid layout.",
    description:
      "Set columns, rows, and gaps with sliders and a live preview, then copy the generated CSS Grid code.",
    category: "css",
    keywords: ["css", "grid", "css grid", "generator", "layout"],
    exampleInput: "3 columns, 2 rows",
    exampleOutput: "grid-template-columns: repeat(3, 1fr);",
    component: dynamic(() => import("@/components/tools/grid-generator")),
  },
  {
    slug: "clamp-generator",
    name: "Clamp Generator",
    shortDescription: "Generate fluid, responsive CSS clamp() font sizes.",
    description:
      "Set a min and max font size across a viewport range to generate a fluid clamp() value, with a live preview at any test viewport width.",
    category: "css",
    keywords: ["css clamp", "fluid typography", "responsive font size"],
    exampleInput: "16px to 32px",
    exampleOutput: "font-size: clamp(1rem, 0.5rem + 2vw, 2rem);",
    component: dynamic(() => import("@/components/tools/clamp-generator")),
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    shortDescription: "Format and beautify SQL queries.",
    description:
      "Paste a messy SQL query to get a clean, indented, readable version, with support for several SQL dialects.",
    category: "sql",
    keywords: ["sql formatter", "sql beautify", "query formatter"],
    exampleInput: "select id,name from users where active=true;",
    exampleOutput: "SELECT id, name\nFROM users\nWHERE active = true;",
    component: dynamic(() => import("@/components/tools/sql-formatter")),
  },
  {
    slug: "fake-user-generator",
    name: "Fake User Generator",
    shortDescription: "Generate realistic-looking fake user data for testing.",
    description:
      "Generate fake names, emails, phone numbers, and addresses for filling out test forms or seeding sample data.",
    category: "generators",
    keywords: ["fake data", "test data", "fake user", "mock data"],
    exampleInput: "3 users",
    exampleOutput: "Ada Khan | ada.khan42@example.com | ...",
    component: dynamic(() => import("@/components/tools/fake-user-generator")),
  },
  {
    slug: "nano-id-generator",
    name: "Nano ID Generator",
    shortDescription: "Generate compact, URL-safe unique IDs.",
    description:
      "Generate short, unique, URL-friendly IDs with a configurable length and character set — a lighter-weight alternative to UUIDs.",
    category: "developer",
    keywords: ["nanoid", "id generator", "unique id", "short id"],
    exampleInput: "size: 21",
    exampleOutput: "V1StGXR8_Z5jdHi6B-myT",
    component: dynamic(() => import("@/components/tools/nano-id-generator")),
  },
  {
    slug: "palette-generator",
    name: "Palette Generator",
    shortDescription: "Build color palettes from a single base color.",
    description:
      "Pick one base color and instantly get shades, tints, complementary, analogous, and triadic color palettes to use in your design.",
    category: "color",
    keywords: ["color palette", "palette generator", "color scheme"],
    exampleInput: "#3B82F6",
    exampleOutput: "5 shades + complementary + analogous + triadic",
    component: dynamic(() => import("@/components/tools/palette-generator")),
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    shortDescription: "Crop an image to a custom region.",
    description:
      "Upload an image, drag and resize a crop box over it, and download just the selected region as a new image.",
    category: "image",
    keywords: ["image cropper", "crop image", "trim image"],
    exampleInput: "Full photo",
    exampleOutput: "Cropped region as PNG",
    component: dynamic(() => import("@/components/tools/image-cropper")),
  },
  {
    slug: "json-viewer",
    name: "JSON Viewer",
    shortDescription: "Browse JSON as a collapsible tree.",
    description:
      "Paste JSON to explore it as a collapsible, color-coded tree instead of a flat block of text — easier for digging into deeply nested data.",
    category: "json",
    keywords: ["json viewer", "json tree", "json explorer"],
    exampleInput: '{"user": {"name": "Ada", "roles": ["admin"]}}',
    exampleOutput: "Collapsible tree view",
    component: dynamic(() => import("@/components/tools/json-viewer")),
  },
  {
    slug: "markdown-html-converter",
    name: "Markdown ↔ HTML Converter",
    shortDescription: "Convert between Markdown and HTML.",
    description:
      "Convert Markdown to HTML for embedding, or convert existing HTML back into clean Markdown — either direction, one tool.",
    category: "markdown",
    keywords: ["markdown to html", "html to markdown", "converter"],
    exampleInput: "# Hello\\n\\nThis is **bold**.",
    exampleOutput: "<h1>Hello</h1><p>This is <strong>bold</strong>.</p>",
    component: dynamic(() => import("@/components/tools/markdown-html-converter")),
  },
  {
    slug: "regex-cheat-sheet",
    name: "Regex Cheat Sheet",
    shortDescription: "Quick reference for common regex syntax.",
    description:
      "A searchable reference of character classes, anchors, quantifiers, groups, flags, and common ready-to-use patterns.",
    category: "regex",
    keywords: ["regex cheat sheet", "regex reference", "regex syntax"],
    exampleInput: "lookahead",
    exampleOutput: "(?=abc) — Positive lookahead",
    component: dynamic(() => import("@/components/tools/regex-cheat-sheet")),
  },
  {
    slug: "sql-minifier",
    name: "SQL Minifier",
    shortDescription: "Compress a SQL query onto one line.",
    description:
      "Strip comments and collapse whitespace to shrink a SQL query down to a single compact line, without changing its logic.",
    category: "sql",
    keywords: ["sql minifier", "sql compress", "sql minify"],
    exampleInput: "SELECT *\\nFROM users;",
    exampleOutput: "SELECT * FROM users;",
    component: dynamic(() => import("@/components/tools/sql-minifier")),
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortDescription: "Calculate exact age in years, months, and days.",
    description:
      "Enter a date of birth and an as-of date to get an exact age breakdown down to the day, plus total days lived.",
    category: "calculators",
    keywords: ["age calculator", "how old am i", "birthday calculator"],
    exampleInput: "Born 2000-01-01",
    exampleOutput: "25 years, 6 months, 12 days",
    component: dynamic(() => import("@/components/tools/age-calculator")),
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    shortDescription: "Calculate the number of days between two dates.",
    description:
      "Pick a start and end date to see the exact number of days, weeks, and months between them.",
    category: "date-time",
    keywords: ["date difference", "days between dates", "date calculator"],
    exampleInput: "2026-01-01 to 2026-03-01",
    exampleOutput: "59 days",
    component: dynamic(() => import("@/components/tools/date-difference-calculator")),
  },
  {
    slug: "bcrypt-generator",
    name: "bcrypt Generator",
    shortDescription: "Hash text with bcrypt and verify matches.",
    description:
      "Generate a bcrypt hash from any text with an adjustable cost factor, and verify whether plain text matches an existing hash.",
    category: "security",
    keywords: ["bcrypt", "password hash", "hash generator"],
    exampleInput: "correcthorsebattery",
    exampleOutput: "$2a$10$N9qo8uLOickgx2ZMRZoMy...",
    component: dynamic(() => import("@/components/tools/bcrypt-generator")),
  },
  {
    slug: "glassmorphism-generator",
    name: "Glassmorphism Generator",
    shortDescription: "Build a frosted-glass CSS effect visually.",
    description:
      "Adjust blur, tint, opacity, and border to create a glassmorphism panel effect, with a live preview and copyable CSS.",
    category: "css",
    keywords: ["glassmorphism", "css", "backdrop-filter", "frosted glass"],
    exampleInput: "blur: 12px",
    exampleOutput: "backdrop-filter: blur(12px);",
    component: dynamic(() => import("@/components/tools/glassmorphism-generator")),
  },
  {
    slug: "html-minifier-beautifier",
    name: "HTML Minifier / Beautifier",
    shortDescription: "Format or compress HTML markup.",
    description:
      "Beautify messy HTML into a clean, indented structure, or minify it down by stripping comments and extra whitespace.",
    category: "html",
    keywords: ["html formatter", "html minifier", "html beautifier"],
    exampleInput: "<div><h1>Hi</h1></div>",
    exampleOutput: "<div>\n  <h1>Hi</h1>\n</div>",
    component: dynamic(() => import("@/components/tools/html-minifier-beautifier")),
  },
  {
    slug: "js-minifier",
    name: "JavaScript Minifier",
    shortDescription: "Shrink JavaScript by minifying and mangling names.",
    description:
      "Minify JavaScript using Terser — the same minifier used by most modern build tools — to shrink file size for production.",
    category: "javascript",
    keywords: ["js minifier", "javascript minify", "terser"],
    exampleInput: "function greet(name) { ... }",
    exampleOutput: "function greet(n){...}",
    component: dynamic(() => import("@/components/tools/js-minifier")),
  },
  {
    slug: "js-beautifier",
    name: "JavaScript Beautifier",
    shortDescription: "Format minified or messy JavaScript.",
    description:
      "Turn minified or poorly formatted JavaScript into clean, indented, readable code.",
    category: "javascript",
    keywords: ["js beautifier", "javascript formatter", "js formatter"],
    exampleInput: "function greet(n){...}",
    exampleOutput: "function greet(name) {\n  ...\n}",
    component: dynamic(() => import("@/components/tools/js-beautifier")),
  },
  {
    slug: "totp-generator",
    name: "TOTP / 2FA Code Generator",
    shortDescription: "Generate time-based one-time codes from a secret.",
    description:
      "Generate standard TOTP (RFC 6238) codes from a Base32 secret — the same algorithm used by Google Authenticator and Authy — entirely client-side.",
    category: "security",
    keywords: ["totp", "2fa", "one-time password", "authenticator"],
    exampleInput: "JBSWY3DPEHPK3PXP",
    exampleOutput: "123456 (refreshes every 30s)",
    component: dynamic(() => import("@/components/tools/totp-generator")),
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    shortDescription: "Convert length, weight, and temperature units.",
    description:
      "Convert between common length, weight, and temperature units instantly, from meters and pounds to Celsius and Fahrenheit.",
    category: "conversion",
    keywords: ["unit converter", "length", "weight", "temperature"],
    exampleInput: "1 meter",
    exampleOutput: "3.2808 feet",
    component: dynamic(() => import("@/components/tools/unit-converter")),
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    shortDescription: "A focus timer with work and break cycles.",
    description:
      "A simple 25-minute focus / 5-minute break Pomodoro timer to help structure work sessions and track completed cycles.",
    category: "productivity",
    keywords: ["pomodoro", "timer", "focus", "productivity"],
    exampleInput: "25 min focus",
    exampleOutput: "5 min break",
    component: dynamic(() => import("@/components/tools/pomodoro-timer")),
  },
  {
    slug: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    shortDescription: "Calculate network, broadcast, and host range from a CIDR.",
    description:
      "Enter an IPv4 address and CIDR prefix to calculate the network address, broadcast address, subnet mask, and usable host range.",
    category: "networking",
    keywords: ["subnet calculator", "cidr", "ip address", "networking"],
    exampleInput: "192.168.1.10/24",
    exampleOutput: "192.168.1.0 – 192.168.1.255",
    component: dynamic(() => import("@/components/tools/ip-subnet-calculator")),
  },
  {
    slug: "user-agent-parser",
    name: "User Agent Parser",
    shortDescription: "Break down a user agent string into browser, OS, and device.",
    description:
      "Parse any user agent string to identify the browser, operating system, and device type — defaults to your own browser's user agent.",
    category: "networking",
    keywords: ["user agent", "browser detection", "ua parser"],
    exampleInput: "Mozilla/5.0 (Windows NT 10.0...) Chrome/120...",
    exampleOutput: "Chrome 120 on Windows 10/11, Desktop",
    component: dynamic(() => import("@/components/tools/user-agent-parser")),
  },
  {
    slug: "api-request-builder",
    name: "API Request Builder",
    shortDescription: "Build and send HTTP requests, and inspect the response.",
    description:
      "Set a method, URL, headers, and body to send a real HTTP request from your browser and inspect the status, headers, and response body — like a lightweight Postman.",
    category: "developer",
    keywords: ["api tester", "http client", "postman alternative", "request builder"],
    exampleInput: "GET https://api.example.com/users",
    exampleOutput: "200 OK — { \"users\": [...] }",
    component: dynamic(() => import("@/components/tools/api-request-builder")),
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    shortDescription: "Compare two blocks of text and highlight differences.",
    description:
      "Paste two versions of a text to see exactly which words were added or removed between them, highlighted inline.",
    category: "text",
    keywords: ["text diff", "compare text", "difference checker"],
    exampleInput: "\"the fox jumps\" vs \"the fox leaps\"",
    exampleOutput: "jumps removed, leaps added",
    component: dynamic(() => import("@/components/tools/text-diff-checker")),
  },
  {
    slug: "color-contrast-checker",
    name: "Color Contrast Checker",
    shortDescription: "Check WCAG accessibility contrast between two colors.",
    description:
      "Enter a text color and background color to calculate the contrast ratio and see whether it passes WCAG AA and AAA accessibility standards.",
    category: "color",
    keywords: ["contrast checker", "wcag", "accessibility", "a11y"],
    exampleInput: "#1F2937 on #FFFFFF",
    exampleOutput: "13.15:1 — passes AAA",
    component: dynamic(() => import("@/components/tools/color-contrast-checker")),
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Calculate body mass index from height and weight.",
    description:
      "Enter height and weight in metric or imperial units to calculate BMI and see which general category it falls into.",
    category: "calculators",
    keywords: ["bmi calculator", "body mass index"],
    exampleInput: "170cm, 70kg",
    exampleOutput: "24.2 — Healthy weight",
    component: dynamic(() => import("@/components/tools/bmi-calculator")),
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    shortDescription: "Split a bill and calculate the tip per person.",
    description:
      "Enter a bill amount, tip percentage, and number of people to instantly see the tip and total owed per person.",
    category: "calculators",
    keywords: ["tip calculator", "bill splitter", "gratuity"],
    exampleInput: "$50 bill, 18% tip, 2 people",
    exampleOutput: "$34.50 per person",
    component: dynamic(() => import("@/components/tools/tip-calculator")),
  },
  {
    slug: "data-size-converter",
    name: "Data Size Converter",
    shortDescription: "Convert between bits, bytes, KB, MB, GB, TB, and PB.",
    description:
      "Convert a file or storage size between bits, bytes, and decimal-based KB/MB/GB/TB/PB units.",
    category: "conversion",
    keywords: ["data size", "byte converter", "storage size", "file size"],
    exampleInput: "1 GB",
    exampleOutput: "1,000,000,000 bytes",
    component: dynamic(() => import("@/components/tools/data-size-converter")),
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    shortDescription: "Convert between numbers and Roman numerals.",
    description:
      "Convert any number from 1 to 3999 into Roman numerals, or decode a Roman numeral back into a number.",
    category: "numbers",
    keywords: ["roman numerals", "number converter"],
    exampleInput: "1994",
    exampleOutput: "MCMXCIV",
    component: dynamic(() => import("@/components/tools/roman-numeral-converter")),
  },
  {
    slug: "markdown-table-generator",
    name: "Markdown Table Generator",
    shortDescription: "Build a Markdown table visually.",
    description:
      "Edit a table in a spreadsheet-like grid — set columns, rows, and alignment — and get properly formatted Markdown table syntax.",
    category: "markdown",
    keywords: ["markdown table", "table generator"],
    exampleInput: "3 columns × 3 rows",
    exampleOutput: "| Name | Category | Status |",
    component: dynamic(() => import("@/components/tools/markdown-table-generator")),
  },
  {
    slug: "url-parser",
    name: "URL Parser",
    shortDescription: "Break a URL down into its individual parts.",
    description:
      "Paste any URL to see its protocol, host, port, path, query parameters, and fragment broken out individually.",
    category: "networking",
    keywords: ["url parser", "url breakdown", "query params"],
    exampleInput: "https://example.com/path?sort=asc#top",
    exampleOutput: "pathname: /path, query: sort=asc",
    component: dynamic(() => import("@/components/tools/url-parser")),
  },
  {
    slug: "credit-card-validator",
    name: "Credit Card Validator",
    shortDescription: "Check a card number's format using the Luhn algorithm.",
    description:
      "Validate whether a card number is mathematically well-formed using the Luhn checksum used by all major card networks, and detect the likely card type.",
    category: "developer",
    keywords: ["credit card validator", "luhn algorithm", "card number check"],
    exampleInput: "4532015112830366",
    exampleOutput: "Visa — valid Luhn checksum",
    component: dynamic(() => import("@/components/tools/credit-card-validator")),
  },
  {
    slug: "passphrase-generator",
    name: "Passphrase Generator",
    shortDescription: "Generate memorable, word-based passphrases.",
    description:
      "Generate Diceware-style passphrases built from random words instead of random characters — easier to remember and type, still hard to guess.",
    category: "security",
    keywords: ["passphrase generator", "diceware", "word-based password"],
    exampleInput: "4 words",
    exampleOutput: "Ember-Quartz-Willow-Nook-42",
    component: dynamic(() => import("@/components/tools/passphrase-generator")),
  },
  {
    slug: "csv-json-converter",
    name: "CSV to JSON Converter",
    shortDescription: "Convert between CSV and JSON formats.",
    description:
      "Convert CSV data to a JSON array of objects, or convert a JSON array back into CSV — handles quoted fields and type detection.",
    category: "conversion",
    keywords: ["csv to json", "json to csv", "converter"],
    exampleInput: "name,age\\nAda,30",
    exampleOutput: '[{"name": "Ada", "age": 30}]',
    component: dynamic(() => import("@/components/tools/csv-json-converter")),
  },
  {
    slug: "cron-builder",
    name: "Cron Expression Builder",
    shortDescription: "Build and understand cron schedule expressions.",
    description:
      "Build a cron expression field by field, get a plain-English description of what it means, and see the next 5 times it would run.",
    category: "developer",
    keywords: ["cron", "cron expression", "cron builder", "schedule"],
    exampleInput: "*/15 9-17 * * 1-5",
    exampleOutput: "Every 15 minutes, 9am-5pm, weekdays",
    component: dynamic(() => import("@/components/tools/cron-builder")),
  },
  {
    slug: "cubic-bezier-generator",
    name: "Cubic Bezier Generator",
    shortDescription: "Visually design a CSS easing curve.",
    description:
      "Drag control points on a curve to design a custom cubic-bezier() easing function for CSS transitions and animations.",
    category: "css",
    keywords: ["cubic-bezier", "css easing", "animation timing"],
    exampleInput: "ease-in-out preset",
    exampleOutput: "cubic-bezier(0.42, 0, 0.58, 1)",
    component: dynamic(() => import("@/components/tools/cubic-bezier-generator")),
  },
  {
    slug: "text-shadow-generator",
    name: "Text Shadow Generator",
    shortDescription: "Visually build a CSS text-shadow.",
    description:
      "Adjust offset, blur, and color with sliders and a live text preview, then copy the generated text-shadow CSS.",
    category: "css",
    keywords: ["css", "text shadow", "generator"],
    exampleInput: "x:2 y:2 blur:4",
    exampleOutput: "text-shadow: 2px 2px 4px rgba(0,0,0,0.5);",
    component: dynamic(() => import("@/components/tools/text-shadow-generator")),
  },
  {
    slug: "random-color-generator",
    name: "Random Color Generator",
    shortDescription: "Generate random hex colors.",
    description:
      "Generate one or many random hex colors at once, with a swatch preview and one-click copy for each.",
    category: "generators",
    keywords: ["random color", "hex color generator"],
    exampleInput: "6 colors",
    exampleOutput: "#3B82F6, #EC4899, #F59E0B...",
    component: dynamic(() => import("@/components/tools/random-color-generator")),
  },
  {
    slug: "prime-checker",
    name: "Prime Number Checker",
    shortDescription: "Check if a number is prime and see its factors.",
    description:
      "Check whether any number is prime, see its prime factorization if it isn't, and browse a list of primes up to a chosen limit.",
    category: "numbers",
    keywords: ["prime number", "prime checker", "factorization"],
    exampleInput: "97",
    exampleOutput: "97 is a prime number",
    component: dynamic(() => import("@/components/tools/prime-checker")),
  },
  {
    slug: "factorial-calculator",
    name: "Factorial Calculator",
    shortDescription: "Calculate the factorial of any number.",
    description:
      "Calculate n! for any whole number, with full precision using arbitrary-precision arithmetic — no rounding errors even for large results.",
    category: "numbers",
    keywords: ["factorial", "factorial calculator"],
    exampleInput: "10",
    exampleOutput: "3628800",
    component: dynamic(() => import("@/components/tools/factorial-calculator")),
  },
  {
    slug: "word-frequency-counter",
    name: "Word Frequency Counter",
    shortDescription: "Count how often each word appears in a text.",
    description:
      "Paste any text to see a ranked breakdown of how often each word appears, with an option to ignore common words.",
    category: "text",
    keywords: ["word frequency", "word count", "text analysis"],
    exampleInput: "the fox jumps... the fox is quick",
    exampleOutput: "fox: 2, the: 3, quick: 2",
    component: dynamic(() => import("@/components/tools/word-frequency-counter")),
  },
  {
    slug: "markdown-cheat-sheet",
    name: "Markdown Cheat Sheet",
    shortDescription: "Quick reference for Markdown syntax.",
    description:
      "A searchable reference of Markdown syntax for headings, emphasis, lists, links, tables, and code blocks.",
    category: "markdown",
    keywords: ["markdown cheat sheet", "markdown syntax", "markdown reference"],
    exampleInput: "table",
    exampleOutput: "| A | B |\\n|---|---|",
    component: dynamic(() => import("@/components/tools/markdown-cheat-sheet")),
  },
  {
    slug: "loan-calculator",
    name: "Loan / EMI Calculator",
    shortDescription: "Calculate monthly loan payments and total interest.",
    description:
      "Enter a loan amount, interest rate, and term to calculate the fixed monthly payment (EMI) and total interest paid over the life of the loan.",
    category: "calculators",
    keywords: ["loan calculator", "emi calculator", "amortization"],
    exampleInput: "$20,000 at 6.5% for 5 years",
    exampleOutput: "$391.32/month",
    component: dynamic(() => import("@/components/tools/loan-calculator")),
  },
  {
    slug: "image-watermark",
    name: "Image Watermark Tool",
    shortDescription: "Add a text watermark to an image.",
    description:
      "Upload an image and overlay custom watermark text with adjustable size, color, opacity, and position, then download the result.",
    category: "image",
    keywords: ["watermark", "image watermark", "add text to image"],
    exampleInput: "photo.jpg + \"© Brand\"",
    exampleOutput: "photo-watermarked.png",
    component: dynamic(() => import("@/components/tools/image-watermark")),
  },
  {
    slug: "image-base64-converter",
    name: "Image to Base64 Converter",
    shortDescription: "Convert an image to a Base64 data URI and back.",
    description:
      "Upload an image to get its Base64 data URI for embedding directly in CSS or HTML, or paste a data URI to preview the decoded image.",
    category: "image",
    keywords: ["image to base64", "base64 image", "data uri"],
    exampleInput: "logo.png",
    exampleOutput: "data:image/png;base64,iVBORw0KG...",
    component: dynamic(() => import("@/components/tools/image-base64-converter")),
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    shortDescription: "Generate favicon and app icon sizes from one image.",
    description:
      "Upload a source image and generate PNG icons at the common favicon and app-icon sizes — 16, 32, 48, 180, 192, and 512 pixels — ready to download.",
    category: "image",
    keywords: ["favicon generator", "app icon", "touch icon"],
    exampleInput: "logo.png",
    exampleOutput: "favicon-32x32.png, favicon-192x192.png...",
    component: dynamic(() => import("@/components/tools/favicon-generator")),
  },
  {
    slug: "regex-replace",
    name: "Regex Find & Replace",
    shortDescription: "Find and replace text using regular expressions.",
    description:
      "Run a find-and-replace using a regular expression pattern, with support for capture group references in the replacement text.",
    category: "regex",
    keywords: ["regex replace", "find and replace", "pattern replace"],
    exampleInput: "(\\w+)@(\\w+)\\.com → $1 at $2 dot com",
    exampleOutput: "hello at example dot com",
    component: dynamic(() => import("@/components/tools/regex-replace")),
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    shortDescription: "Reverse text by character, word, or line.",
    description:
      "Reverse a block of text by individual characters, word order, or line order.",
    category: "text",
    keywords: ["text reverser", "reverse text", "reverse words"],
    exampleInput: "hello world",
    exampleOutput: "dlrow olleh",
    component: dynamic(() => import("@/components/tools/text-reverser")),
  },
  {
    slug: "palindrome-checker",
    name: "Palindrome Checker",
    shortDescription: "Check if text reads the same forwards and backwards.",
    description:
      "Check whether a word or phrase is a palindrome, ignoring spaces, punctuation, and capitalization.",
    category: "text",
    keywords: ["palindrome checker", "palindrome"],
    exampleInput: "A man, a plan, a canal: Panama",
    exampleOutput: "Yes, that's a palindrome!",
    component: dynamic(() => import("@/components/tools/palindrome-checker")),
  },
  {
    slug: "uuid-validator",
    name: "UUID Validator",
    shortDescription: "Check if a string is a valid, well-formed UUID.",
    description:
      "Validate a UUID's format, version, and variant bits against RFC 4122 — not just that it's 36 characters with dashes in the right places.",
    category: "developer",
    keywords: ["uuid validator", "uuid check", "guid validator"],
    exampleInput: "550e8400-e29b-41d4-a716-446655440000",
    exampleOutput: "Valid UUID — version 4",
    component: dynamic(() => import("@/components/tools/uuid-validator")),
  },
  {
    slug: "color-blindness-simulator",
    name: "Color Blindness Simulator",
    shortDescription: "Preview an image under common color vision deficiencies.",
    description:
      "Upload an image to see side-by-side previews simulating protanopia, deuteranopia, and tritanopia — useful for a quick accessibility check.",
    category: "color",
    keywords: ["color blindness simulator", "accessibility", "color vision deficiency"],
    exampleInput: "design mockup.png",
    exampleOutput: "3 simulated variants side by side",
    component: dynamic(() => import("@/components/tools/color-blindness-simulator")),
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    shortDescription: "Generate SEO and social sharing meta tags.",
    description:
      "Fill in a title, description, and image to generate ready-to-paste meta tags for SEO, Open Graph, and Twitter cards.",
    category: "html",
    keywords: ["meta tags", "seo tags", "open graph", "twitter card"],
    exampleInput: "title + description + image URL",
    exampleOutput: "<meta property=\"og:title\" content=\"...\" />",
    component: dynamic(() => import("@/components/tools/meta-tag-generator")),
  },
  {
    slug: "number-to-words",
    name: "Number to Words Converter",
    shortDescription: "Spell out a number in English words.",
    description:
      "Convert any whole number into its full English word form — useful for checks, invoices, and legal documents.",
    category: "numbers",
    keywords: ["number to words", "spell out number", "number in words"],
    exampleInput: "1234567",
    exampleOutput: "one million two hundred thirty-four thousand five hundred sixty-seven",
    component: dynamic(() => import("@/components/tools/number-to-words")),
  },
  {
    slug: "morse-code-translator",
    name: "Morse Code Translator",
    shortDescription: "Convert text to Morse code and back.",
    description:
      "Translate plain text into Morse code, or decode Morse code (words separated by /) back into readable text.",
    category: "encoding",
    keywords: ["morse code", "morse translator"],
    exampleInput: "SOS",
    exampleOutput: "... --- ...",
    component: dynamic(() => import("@/components/tools/morse-code-translator")),
  },
  {
    slug: "binary-text-converter",
    name: "Binary to Text Converter",
    shortDescription: "Convert text to binary and back.",
    description:
      "Convert plain text into 8-bit binary representation, or decode space-separated binary bytes back into text.",
    category: "encoding",
    keywords: ["binary converter", "text to binary", "binary to text"],
    exampleInput: "Hi",
    exampleOutput: "01001000 01101001",
    component: dynamic(() => import("@/components/tools/binary-text-converter")),
  },
  {
    slug: "caesar-cipher",
    name: "Caesar Cipher Tool",
    shortDescription: "Encode or decode text with a classic shift cipher.",
    description:
      "Shift each letter of a message by a chosen amount to encode it, or use the negative shift to decode it back — a classic substitution cipher for puzzles and learning.",
    category: "security",
    keywords: ["caesar cipher", "shift cipher", "substitution cipher"],
    exampleInput: "Shift 3: Meet me",
    exampleOutput: "Phhw ph",
    component: dynamic(() => import("@/components/tools/caesar-cipher")),
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Text Generator",
    shortDescription: "Turn plain text into stylized Unicode text.",
    description:
      "Convert plain text into bold, monospace, fullwidth, circled, upside-down, and other Unicode text styles you can paste anywhere.",
    category: "generators",
    keywords: ["fancy text", "unicode text generator", "stylish text"],
    exampleInput: "Hello",
    exampleOutput: "𝐇𝐞𝐥𝐥𝐨, Ⓗⓔⓛⓛⓞ, ...",
    component: dynamic(() => import("@/components/tools/fancy-text-generator")),
  },
  {
    slug: "color-name-finder",
    name: "Color Name Finder",
    shortDescription: "Find the closest named color to any hex value.",
    description:
      "Pick or enter any color to find the closest matching named CSS color, plus a handful of other close matches.",
    category: "color",
    keywords: ["color name", "named colors", "closest color"],
    exampleInput: "#3B82F6",
    exampleOutput: "RoyalBlue",
    component: dynamic(() => import("@/components/tools/color-name-finder")),
  },
  {
    slug: "json-schema-generator",
    name: "JSON Schema Generator",
    shortDescription: "Infer a JSON Schema from a sample JSON object.",
    description:
      "Paste a sample JSON object or array to generate a starting-point JSON Schema with inferred types and required fields.",
    category: "json",
    keywords: ["json schema", "schema generator"],
    exampleInput: '{"name": "Ada", "age": 30}',
    exampleOutput: '{"type": "object", "properties": {...}}',
    component: dynamic(() => import("@/components/tools/json-schema-generator")),
  },
  {
    slug: "text-truncator",
    name: "Text Truncator",
    shortDescription: "Shorten text to a character or word limit.",
    description:
      "Truncate text down to a character or word count with a custom suffix — useful for meta descriptions, card previews, and excerpts.",
    category: "text",
    keywords: ["text truncate", "excerpt generator", "text shortener"],
    exampleInput: "160 character limit",
    exampleOutput: "Truncated text…",
    component: dynamic(() => import("@/components/tools/text-truncator")),
  },
  {
    slug: "whitespace-visualizer",
    name: "Whitespace Visualizer",
    shortDescription: "See hidden spaces, tabs, and line breaks in text.",
    description:
      "Paste text to visually reveal spaces, tabs, non-breaking spaces, and line breaks that are normally invisible — useful for debugging formatting issues.",
    category: "text",
    keywords: ["whitespace visualizer", "hidden characters", "invisible characters"],
    exampleInput: "Text  with\\tdouble spaces",
    exampleOutput: "Text··with→double·spaces",
    component: dynamic(() => import("@/components/tools/whitespace-visualizer")),
  },
  {
    slug: "css-specificity-calculator",
    name: "CSS Specificity Calculator",
    shortDescription: "Calculate the specificity of a CSS selector.",
    description:
      "Paste a CSS selector to see its specificity broken down by IDs, classes/attributes/pseudo-classes, and elements/pseudo-elements.",
    category: "css",
    keywords: ["css specificity", "specificity calculator"],
    exampleInput: "#nav ul li.active > a:hover",
    exampleOutput: "(1, 2, 2)",
    component: dynamic(() => import("@/components/tools/css-specificity-calculator")),
  },
  {
    slug: "barcode-generator",
    name: "Barcode Generator",
    shortDescription: "Generate scannable barcodes in several formats.",
    description:
      "Generate a barcode from any value in CODE128, EAN13, UPC, CODE39, and other common formats, with a downloadable PNG.",
    category: "generators",
    keywords: ["barcode generator", "barcode", "ean13", "code128"],
    exampleInput: "123456789012",
    exampleOutput: "Scannable barcode image",
    component: dynamic(() => import("@/components/tools/barcode-generator")),
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
