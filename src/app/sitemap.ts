import type { MetadataRoute } from "next";
import { tools, getToolsByCategory, getToolLastModified } from "@/lib/tools-config";
import { categories } from "@/lib/categories";

const siteUrl = "https://devtools-hub-rose.vercel.app";

// Stable date for pages that haven't changed since launch (not regenerated per build).
const LAUNCH_DATE = "2026-07-29";

function mostRecentToolDate(): string {
  return tools
    .map((t) => getToolLastModified(t.slug))
    .sort()
    .at(-1) ?? LAUNCH_DATE;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestChange = mostRecentToolDate();

  // Listing pages reflect the most recently changed tool, since their content
  // (the tool list itself) changes whenever any tool is added or updated.
  const dynamicListingRoutes = ["", "/tools", "/categories"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: latestChange,
  }));

  // Static content pages that haven't changed since launch.
  const staticContentRoutes = ["/about", "/blog"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: LAUNCH_DATE,
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: getToolLastModified(tool.slug),
  }));

  const categoryRoutes = categories.map((category) => {
    const toolsInCategory = getToolsByCategory(category.slug);
    const mostRecent = toolsInCategory
      .map((t) => getToolLastModified(t.slug))
      .sort()
      .at(-1);
    return {
      url: `${siteUrl}/categories/${category.slug}`,
      lastModified: mostRecent ?? LAUNCH_DATE,
    };
  });

  return [...dynamicListingRoutes, ...staticContentRoutes, ...toolRoutes, ...categoryRoutes];
}
