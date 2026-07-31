import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const siteUrl = "https://devtools-hub-rose.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevTools Hub — 100+ Free Developer Tools",
    template: "%s | DevTools Hub",
  },
  description:
    "A fast, free, and modern collection of 100+ developer tools: JSON formatting, encoding, generators, converters, and more. No login required.",
  openGraph: {
    type: "website",
    siteName: "DevTools Hub",
    title: "DevTools Hub — 100+ Free Developer Tools",
    description:
      "A fast, free, and modern collection of 100+ developer tools. No login required.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub — 100+ Free Developer Tools",
    description: "A fast, free, and modern collection of 100+ developer tools.",
  },
  verification: {
    google: "I8VhUO0GkRQZsaKfak2jr4gZIJqtHvCVctiIP83gclA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
