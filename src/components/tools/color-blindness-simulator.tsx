"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

// Simulation matrices (Brettel/Vienot-style approximations, commonly used
// for quick client-side previews of how colors shift for each deficiency.
const MATRICES: Record<string, number[]> = {
  Protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  Deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  Tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
};

function applyMatrix(imageData: ImageData, matrix: number[]): ImageData {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = r * matrix[0] + g * matrix[1] + b * matrix[2];
    data[i + 1] = r * matrix[3] + g * matrix[4] + b * matrix[5];
    data[i + 2] = r * matrix[6] + g * matrix[7] + b * matrix[8];
  }
  return imageData;
}

export default function ColorBlindnessSimulator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const imgRef = useRef<HTMLImageElement | null>(null);

  const generate = (img: HTMLImageElement) => {
    const results: Record<string, string> = {};
    for (const [name, matrix] of Object.entries(MATRICES)) {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(applyMatrix(imageData, matrix), 0, 0);
      results[name] = canvas.toDataURL("image/png");
    }
    setOutputs(results);
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      generate(img);
    };
    img.src = url;
  };

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Upload size={20} className="text-neutral-400" />
        <span className="text-sm text-neutral-500">Upload an image to preview</span>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </label>

      {imageUrl && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-medium text-neutral-400">Original</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Original" className="w-full rounded-xl border border-black/10 dark:border-white/10" />
          </div>
          {Object.entries(outputs).map(([name, url]) => (
            <div key={name}>
              <p className="mb-1.5 text-xs font-medium text-neutral-400">{name}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={name} className="w-full rounded-xl border border-black/10 dark:border-white/10" />
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Approximates how an image looks under three common color vision deficiencies, using standard simulation
        matrices — useful for a quick accessibility gut-check, not a clinically precise simulation. Everything
        happens in your browser.
      </p>
    </div>
  );
}
