import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools-config";
import { categories } from "@/lib/categories";

const siteUrl = "https://devtools-hub-rose.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/categories", "/about", "/blog"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...toolRoutes, ...categoryRoutes];
}
