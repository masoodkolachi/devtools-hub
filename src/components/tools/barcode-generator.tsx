"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { Download } from "lucide-react";

const FORMATS = ["CODE128", "EAN13", "UPC", "CODE39", "ITF14", "MSI", "pharmacode"];

export default function BarcodeGenerator() {
  const [value, setValue] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !value) return;
    let cancelled = false;
    try {
      JsBarcode(svgRef.current, value, {
        format,
        width: 2,
        height: 80,
        displayValue: true,
        background: "transparent",
        lineColor: "#171717",
      });
      Promise.resolve().then(() => {
        if (!cancelled) setError(null);
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : `"${value}" isn't valid for the ${format} format.`;
      Promise.resolve().then(() => {
        if (!cancelled) setError(message);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [value, format]);

  const handleDownload = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.download = "barcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Value to encode</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">Format</span>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none">
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col items-center rounded-xl border border-black/10 dark:border-white/10 bg-white p-6">
        <svg ref={svgRef} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <button
        onClick={handleDownload}
        disabled={!!error || !value}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        <Download size={14} /> Download PNG
      </button>

      <p className="mt-4 text-xs text-neutral-400">
        Different formats expect different input — EAN13 needs exactly 12-13 digits, UPC needs 11-12, CODE128
        accepts nearly anything. If a value doesn&apos;t generate, try switching format or check the error above.
      </p>
    </div>
  );
}
