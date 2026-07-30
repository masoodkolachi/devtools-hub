"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Trash2 } from "lucide-react";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://example.com");
  const [size, setSize] = useState(240);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!value.trim()) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }
    QRCode.toCanvas(canvasRef.current, value, { width: size, margin: 1 }, (err) => {
      setError(err ? "Could not generate a QR code for this input." : null);
    });
  }, [value, size]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="text-xs font-medium text-neutral-400">Text or URL</label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="https://example.com"
          className="mt-2 w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-4 text-sm outline-none"
        />

        <label className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
          <span>Size: {size}px</span>
          <input
            type="range"
            min={120}
            max={512}
            step={8}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="ml-4 w-2/3 accent-neutral-900 dark:accent-white"
          />
        </label>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            <Download size={14} /> Download PNG
          </button>
          <button
            onClick={() => setValue("")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>

      <div className="flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white p-6">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
