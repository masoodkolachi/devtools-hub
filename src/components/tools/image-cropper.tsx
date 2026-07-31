"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

interface CropBox {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
}

export default function ImageCropper() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [fileName, setFileName] = useState("image");
  const [crop, setCrop] = useState<CropBox>({ xPct: 10, yPct: 10, wPct: 60, hPct: 60 });
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCroppedUrl(null);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: crop.xPct, origY: crop.yPct };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || !imgWrapRef.current) return;
    const rect = imgWrapRef.current.getBoundingClientRect();
    const dxPct = ((e.clientX - dragState.current.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - dragState.current.startY) / rect.height) * 100;
    setCrop((c) => ({
      ...c,
      xPct: Math.min(100 - c.wPct, Math.max(0, dragState.current!.origX + dxPct)),
      yPct: Math.min(100 - c.hPct, Math.max(0, dragState.current!.origY + dyPct)),
    }));
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  const handleCrop = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const sx = (crop.xPct / 100) * naturalSize.width;
    const sy = (crop.yPct / 100) * naturalSize.height;
    const sw = (crop.wPct / 100) * naturalSize.width;
    const sh = (crop.hPct / 100) * naturalSize.height;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    canvas.toBlob((blob) => {
      if (blob) setCroppedUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const link = document.createElement("a");
    link.href = croppedUrl;
    link.download = `${fileName}-cropped.png`;
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
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
              <span>Width: {Math.round(crop.wPct)}%</span>
              <input
                type="range"
                min={5}
                max={100 - crop.xPct}
                value={crop.wPct}
                onChange={(e) => setCrop((c) => ({ ...c, wPct: Number(e.target.value) }))}
                className="ml-3 w-1/2 accent-neutral-900 dark:accent-white"
              />
            </label>
            <label className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
              <span>Height: {Math.round(crop.hPct)}%</span>
              <input
                type="range"
                min={5}
                max={100 - crop.yPct}
                value={crop.hPct}
                onChange={(e) => setCrop((c) => ({ ...c, hPct: Number(e.target.value) }))}
                className="ml-3 w-1/2 accent-neutral-900 dark:accent-white"
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-neutral-400">Drag the highlighted box on the image to reposition it.</p>

          <div
            ref={imgWrapRef}
            className="relative mt-3 select-none overflow-hidden rounded-xl border border-black/10 dark:border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Upload to crop" className="block w-full" draggable={false} />
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="absolute cursor-move border-2 border-blue-500 bg-blue-500/20"
              style={{
                left: `${crop.xPct}%`,
                top: `${crop.yPct}%`,
                width: `${crop.wPct}%`,
                height: `${crop.hPct}%`,
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleCrop}
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              Crop
            </button>
            <button
              onClick={handleDownload}
              disabled={!croppedUrl}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <Download size={14} /> Download
            </button>
          </div>

          {croppedUrl && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-neutral-400">Cropped result</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={croppedUrl} alt="Cropped result" className="max-h-72 rounded-xl border border-black/10 dark:border-white/10" />
            </div>
          )}
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <p className="mt-4 text-xs text-neutral-400">
        Cropping happens entirely in your browser using the Canvas API — nothing is uploaded anywhere.
      </p>
    </div>
  );
}
