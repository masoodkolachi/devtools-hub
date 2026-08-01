"use client";

import { useState } from "react";

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join(".");
}

export default function IpSubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.10");
  const [cidr, setCidr] = useState(24);

  const ipInt = ipToInt(ip);
  const valid = ipInt !== null && cidr >= 0 && cidr <= 32;

  let details: {
    network: string;
    broadcast: string;
    firstHost: string;
    lastHost: string;
    subnetMask: string;
    totalHosts: number;
    usableHosts: number;
  } | null = null;

  if (valid && ipInt !== null) {
    const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const totalHosts = 2 ** (32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;

    details = {
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost: usableHosts > 0 ? intToIp(networkInt + 1) : intToIp(networkInt),
      lastHost: usableHosts > 0 ? intToIp(broadcastInt - 1) : intToIp(broadcastInt),
      subnetMask: intToIp(maskInt),
      totalHosts,
      usableHosts,
    };
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">IP address</span>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.10"
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-neutral-400">CIDR prefix</span>
          <div className="mt-1 flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
            <span className="text-neutral-400">/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full bg-transparent font-mono text-sm outline-none"
            />
          </div>
        </label>
      </div>

      {!valid && <p className="mt-3 text-xs text-red-500">Enter a valid IPv4 address and a CIDR prefix from 0–32.</p>}

      {details && (
        <div className="mt-4 space-y-1.5">
          {[
            { label: "Network address", value: details.network },
            { label: "Subnet mask", value: details.subnetMask },
            { label: "Broadcast address", value: details.broadcast },
            { label: "First usable host", value: details.firstHost },
            { label: "Last usable host", value: details.lastHost },
            { label: "Total addresses", value: details.totalHosts.toLocaleString() },
            { label: "Usable hosts", value: details.usableHosts.toLocaleString() },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2.5">
              <span className="text-sm text-neutral-500">{row.label}</span>
              <span className="font-mono text-sm text-neutral-800 dark:text-neutral-100">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
