"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

export default function ImageWatermark() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [text, setText] = useState("© Your Brand");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(50);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<"center" | "bottom-right" | "bottom-left" | "top-right" | "top-left">("bottom-right");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const render = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity / 100;
    const metrics = ctx.measureText(text);
    const padding = fontSize * 0.5;

    let x = padding;
    let y = fontSize + padding;
    if (position.includes("right")) x = canvas.width - metrics.width - padding;
    if (position.includes("bottom")) y = canvas.height - padding;
    if (position === "center") {
      x = (canvas.width - metrics.width) / 2;
      y = canvas.height / 2;
    }

    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
    canvas.toBlob((blob) => {
      if (blob) setOutputUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  useEffect(() => {
    if (imgRef.current) render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontSize, opacity, color, position]);

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      render();
    };
    img.src = url;
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const link = document.createElement("a");
    link.href = outputUrl;
    link.download = `${fileName}-watermarked.png`;
    link.click();
  };

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Upload size={20} className="text-neutral-400" />
        <span className="text-sm text-neutral-500">Click to upload an image</span>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </label>

      {imageUrl && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-neutral-400">Watermark text</span>
              <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-neutral-400">Position</span>
              <select value={position} onChange={(e) => setPosition(e.target.value as typeof position)} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none">
                <option value="bottom-right">Bottom right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="top-right">Top right</option>
                <option value="top-left">Top left</option>
                <option value="center">Center</option>
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              Size: {fontSize}px
              <input type="range" min={12} max={80} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-24 accent-neutral-900 dark:accent-white" />
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              Opacity: {opacity}%
              <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-24 accent-neutral-900 dark:accent-white" />
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              Color
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-black/10 dark:border-white/10 bg-transparent" />
            </label>
          </div>

          {outputUrl && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outputUrl} alt="Watermarked result" className="max-h-80 rounded-xl border border-black/10 dark:border-white/10" />
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!outputUrl}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Download size={14} /> Download watermarked image
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
      <p className="mt-4 text-xs text-neutral-400">Everything happens in your browser using the Canvas API — nothing is uploaded anywhere.</p>
    </div>
  );
}
