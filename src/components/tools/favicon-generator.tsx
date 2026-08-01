"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

const SIZES = [16, 32, 48, 180, 192, 512];

export default function FaviconGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Record<number, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const generateAll = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const results: Record<number, string> = {};
    let remaining = SIZES.length;

    SIZES.forEach((size) => {
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) results[size] = URL.createObjectURL(blob);
        remaining--;
        if (remaining === 0) setOutputs({ ...results });
      }, "image/png");
    });
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      generateAll();
    };
    img.src = url;
  };

  const handleDownload = (size: number) => {
    const url = outputs[size];
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = `favicon-${size}x${size}.png`;
    link.click();
  };

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Upload size={20} className="text-neutral-400" />
        <span className="text-sm text-neutral-500">Upload a square-ish source image (works best if it&apos;s already square)</span>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </label>

      {imageUrl && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 p-4">
              {outputs[size] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outputs[size]} alt={`${size}x${size} favicon`} width={Math.min(size, 64)} height={Math.min(size, 64)} className="rounded" style={{ imageRendering: size <= 32 ? "pixelated" : "auto" }} />
              ) : (
                <div className="h-16 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
              )}
              <p className="text-xs text-neutral-400">{size}×{size}</p>
              <button
                onClick={() => handleDownload(size)}
                disabled={!outputs[size]}
                className="inline-flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 px-2 py-1 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-40"
              >
                <Download size={12} /> Download
              </button>
            </div>
          ))}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
      <p className="mt-4 text-xs text-neutral-400">
        Generates PNG icons at common favicon and app-icon sizes (16/32/48 for browser tabs, 180 for Apple touch
        icon, 192/512 for Android/PWA). Everything runs in your browser — nothing is uploaded anywhere.
      </p>
    </div>
  );
}
