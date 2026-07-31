"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

const FORMATS = [
  { label: "PNG", mime: "image/png", ext: "png" },
  { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  { label: "WebP", mime: "image/webp", ext: "webp" },
] as const;

export default function ImageFormatConverter() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [quality, setQuality] = useState(0.9);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const convert = (img: HTMLImageElement, mime: string, q: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (mime === "image/jpeg") {
      // JPG has no transparency — fill white first so transparent PNGs don't turn black.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) setOutputUrl(URL.createObjectURL(blob));
      },
      mime,
      q
    );
  };

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      convert(img, format.mime, quality);
    };
    img.src = url;
  };

  const handleFormatChange = (f: (typeof FORMATS)[number]) => {
    setFormat(f);
    if (imgRef.current) convert(imgRef.current, f.mime, quality);
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    if (imgRef.current) convert(imgRef.current, format.mime, q);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const link = document.createElement("a");
    link.href = outputUrl;
    link.download = `${fileName}.${format.ext}`;
    link.click();
  };

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Upload size={20} className="text-neutral-400" />
        <span className="text-sm text-neutral-500">Click to upload an image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </label>

      {imageUrl && (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 p-1">
              {FORMATS.map((f) => (
                <button
                  key={f.ext}
                  onClick={() => handleFormatChange(f)}
                  className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    format.ext === f.ext ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {format.mime !== "image/png" && (
              <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                Quality: {Math.round(quality * 100)}%
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-32 accent-neutral-900 dark:accent-white"
                />
              </label>
            )}
          </div>

          {outputUrl && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outputUrl} alt="Converted result" className="max-h-80 rounded-xl border border-black/10 dark:border-white/10" />
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!outputUrl}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Download size={14} /> Download as {format.label}
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <p className="mt-4 text-xs text-neutral-400">
        Conversion happens entirely in your browser — nothing is uploaded anywhere. Some browsers don&apos;t
        support WebP encoding via Canvas; if the WebP output looks wrong, try Chrome or Edge.
      </p>
    </div>
  );
}
