"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Uint8Array {
  const cleaned = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const char of cleaned) {
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) continue;
    bits += index.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

function randomBase32Secret(length = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => BASE32_ALPHABET[b % 32]).join("");
}

async function generateTotp(secret: string, timeStep = 30, digits = 6): Promise<string> {
  const key = base32Decode(secret);
  const counter = Math.floor(Date.now() / 1000 / timeStep);
  const counterBytes = new ArrayBuffer(8);
  new DataView(counterBytes).setBigUint64(0, BigInt(counter));

  const cryptoKey = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, counterBytes);
  const hmac = new Uint8Array(signature);

  const offset = hmac[hmac.length - 1] & 0x0f;
  const binCode =
    ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff);

  return (binCode % 10 ** digits).toString().padStart(digits, "0");
}

export default function TotpGenerator() {
  const [secret, setSecret] = useState(randomBase32Secret());
  const [code, setCode] = useState("------");
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      const remaining = 30 - (Math.floor(Date.now() / 1000) % 30);
      setSecondsLeft(remaining);
      if (secret.replace(/\s/g, "").length > 0) {
        generateTotp(secret).then((c) => {
          if (!cancelled) setCode(c);
        });
      } else {
        setCode("------");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [secret]);

  return (
    <div>
      <label className="block">
        <span className="text-xs font-medium text-neutral-400">Base32 secret</span>
        <div className="mt-1 flex gap-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
          <button
            onClick={() => setSecret(randomBase32Secret())}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={14} /> New secret
          </button>
        </div>
      </label>

      <div className="mt-6 flex items-center justify-center gap-6 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-8">
        <div className="text-center">
          <p className="font-mono text-4xl font-semibold tracking-widest text-neutral-900 dark:text-white">{code}</p>
          <p className="mt-2 text-xs text-neutral-400">Refreshes in {secondsLeft}s</p>
        </div>
        <CopyButton getValue={() => code} />
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        This generates standard TOTP codes (RFC 6238, same algorithm as Google Authenticator or Authy) entirely in
        your browser using the secret above — nothing is sent anywhere. Paste in a secret from a 2FA setup screen
        to generate matching codes, or use &quot;New secret&quot; to create one for testing.
      </p>
    </div>
  );
}
