"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

export default function ImageResizer() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const aspectRef = useRef(1);

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      aspectRef.current = img.naturalWidth / img.naturalHeight;
      setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      render(img.naturalWidth, img.naturalHeight, img);
    };
    img.src = url;
  };

  const render = (w: number, h: number, img?: HTMLImageElement) => {
    const image = img ?? imgRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || w <= 0 || h <= 0) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, w, h);
    canvas.toBlob((blob) => {
      if (blob) setResizedUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  const handleWidthChange = (value: number) => {
    setWidth(value);
    const h = lockAspect ? Math.round(value / aspectRef.current) : height;
    if (lockAspect) setHeight(h);
    render(value, h);
  };

  const handleHeightChange = (value: number) => {
    setHeight(value);
    const w = lockAspect ? Math.round(value * aspectRef.current) : width;
    if (lockAspect) setWidth(w);
    render(w, value);
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `${fileName}-${width}x${height}.png`;
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
          <p className="mt-3 text-xs text-neutral-400">
            Original: {originalDims.width} × {originalDims.height}px
          </p>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-neutral-400">Width (px)</span>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-neutral-400">Height (px)</span>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>

          <label className="mt-3 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
            Lock aspect ratio
          </label>

          {resizedUrl && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-neutral-400">Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resizedUrl} alt="Resized result" className="max-h-80 rounded-xl border border-black/10 dark:border-white/10" />
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!resizedUrl}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Download size={14} /> Download resized image
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <p className="mt-4 text-xs text-neutral-400">
        Resizing happens entirely in your browser using the Canvas API — nothing is uploaded anywhere.
      </p>
    </div>
  );
}
