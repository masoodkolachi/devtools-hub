export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { slug: "developer", name: "Developer", description: "Everyday utilities for writing and debugging code." },
  { slug: "json", name: "JSON", description: "Format, validate, and convert JSON data." },
  { slug: "text", name: "Text", description: "Manipulate and analyze plain text." },
  { slug: "image", name: "Image", description: "Compress, resize, and convert images." },
  { slug: "color", name: "Color", description: "Pick, convert, and generate colors and palettes." },
  { slug: "css", name: "CSS", description: "Generate CSS snippets visually." },
  { slug: "html", name: "HTML", description: "Work with HTML markup." },
  { slug: "javascript", name: "JavaScript", description: "Tools for JavaScript developers." },
  { slug: "security", name: "Security", description: "Hashing, passwords, and security checks." },
  { slug: "encoding", name: "Encoding", description: "Encode and decode data formats." },
  { slug: "conversion", name: "Conversion", description: "Convert between file and data formats." },
  { slug: "generators", name: "Generators", description: "Generate IDs, codes, and sample data." },
  { slug: "calculators", name: "Calculators", description: "Quick calculators for everyday problems." },
  { slug: "markdown", name: "Markdown", description: "Write and preview Markdown." },
  { slug: "regex", name: "Regex", description: "Build and test regular expressions." },
  { slug: "sql", name: "SQL", description: "Format and clean up SQL queries." },
  { slug: "networking", name: "Networking", description: "HTTP and network reference tools." },
  { slug: "date-time", name: "Date & Time", description: "Convert and calculate dates and times." },
  { slug: "numbers", name: "Numbers", description: "Number base and unit conversions." },
  { slug: "productivity", name: "Productivity", description: "Small tools that save you time daily." },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
