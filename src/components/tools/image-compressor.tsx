"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressor() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [fileName, setFileName] = useState("image");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    setOriginalSize(file.size);
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      compress(img, quality);
    };
    img.src = url;
  };

  const compress = (img: HTMLImageElement, q: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setCompressedSize(blob.size);
        setCompressedUrl(URL.createObjectURL(blob));
      },
      "image/jpeg",
      q
    );
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    if (imgRef.current) compress(imgRef.current, q);
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `${fileName}-compressed.jpg`;
    link.click();
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Upload size={20} className="text-neutral-400" />
        <span className="text-sm text-neutral-500">Click to upload an image (JPG, PNG, WebP)</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </label>

      <canvas ref={canvasRef} className="hidden" />

      {imageUrl && (
        <>
          <label className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span>Quality: {Math.round(quality * 100)}%</span>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="ml-4 w-2/3 accent-neutral-900 dark:accent-white"
            />
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-medium text-neutral-400">Original — {formatBytes(originalSize)}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Original upload" className="w-full rounded-xl border border-black/10 dark:border-white/10" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-neutral-400">
                Compressed — {compressedSize ? formatBytes(compressedSize) : "…"}{" "}
                {savings > 0 && <span className="text-emerald-500">({savings}% smaller)</span>}
              </p>
              {compressedUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={compressedUrl} alt="Compressed result" className="w-full rounded-xl border border-black/10 dark:border-white/10" />
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!compressedUrl}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Download size={14} /> Download compressed image
          </button>
        </>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Your image is compressed entirely in your browser using the Canvas API — it&apos;s never uploaded anywhere.
      </p>
    </div>
  );
}
