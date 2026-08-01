"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("DevTools Hub — Free Developer Tools");
  const [description, setDescription] = useState("A fast, free collection of developer tools. No login required.");
  const [url, setUrl] = useState("https://example.com");
  const [imageUrl, setImageUrl] = useState("https://example.com/og-image.png");
  const [siteName, setSiteName] = useState("DevTools Hub");
  const [twitterHandle, setTwitterHandle] = useState("");

  const tags = `<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />${twitterHandle ? `\n<meta name="twitter:site" content="@${twitterHandle.replace(/^@/, "")}" />` : ""}`;

  const fields: { label: string; value: string; setValue: (v: string) => void }[] = [
    { label: "Page title", value: title, setValue: setTitle },
    { label: "Meta description", value: description, setValue: setDescription },
    { label: "Page URL", value: url, setValue: setUrl },
    { label: "Preview image URL", value: imageUrl, setValue: setImageUrl },
    { label: "Site name", value: siteName, setValue: setSiteName },
    { label: "Twitter handle (optional)", value: twitterHandle, setValue: setTwitterHandle },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        {fields.map((f) => (
          <label key={f.label} className="block">
            <span className="text-xs font-medium text-neutral-400">{f.label}</span>
            <input
              value={f.value}
              onChange={(e) => f.setValue(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
            />
          </label>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-400">Generated tags</p>
          <CopyButton getValue={() => tags} />
        </div>
        <pre className="mt-1.5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 font-mono text-xs">
          {tags}
        </pre>
      </div>
    </div>
  );
}
