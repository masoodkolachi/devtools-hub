"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export default function ImageBase64Converter() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(null);

  // Decode tab
  const [base64Input, setBase64Input] = useState("");

  const handleFile = (file: File) => {
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const isValidDataUrl = base64Input.trim().startsWith("data:image/");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Image → Base64</p>
        <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-6 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Upload size={18} className="text-neutral-400" />
          <span className="text-sm text-neutral-500">Click to upload an image</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </label>

        {dataUrl && fileInfo && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="Uploaded" className="mt-3 max-h-40 rounded-lg border border-black/10 dark:border-white/10" />
            <p className="mt-2 text-xs text-neutral-400">
              {fileInfo.name} — {(fileInfo.size / 1024).toFixed(1)} KB — {fileInfo.type}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Base64 data URI ({dataUrl.length.toLocaleString()} chars)</span>
              <CopyButton getValue={() => dataUrl} />
            </div>
            <textarea readOnly value={dataUrl} rows={6} className="mt-1 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-3 font-mono text-xs outline-none" />
          </>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Base64 → Image</p>
        <textarea
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
          placeholder="Paste a data:image/... URI here"
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-3 font-mono text-xs outline-none"
        />
        {base64Input && !isValidDataUrl && (
          <p className="mt-2 text-xs text-red-500">This should start with &quot;data:image/&quot; — paste a full data URI, not just the raw Base64.</p>
        )}
        {isValidDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={base64Input} alt="Decoded preview" className="mt-3 max-h-64 rounded-lg border border-black/10 dark:border-white/10" />
        )}
      </div>
    </div>
  );
}
