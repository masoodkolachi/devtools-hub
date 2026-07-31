"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

const FIRST_NAMES = ["Ada", "Liam", "Zara", "Noah", "Maya", "Ethan", "Priya", "Lucas", "Sofia", "Omar", "Elena", "Kenji", "Fatima", "Leo", "Nina"];
const LAST_NAMES = ["Khan", "Garcia", "Smith", "Chen", "Silva", "Kowalski", "Johansson", "Osei", "Rossi", "Tanaka", "Fernandez", "Novak"];
const STREETS = ["Maple Street", "Oak Avenue", "Sunset Boulevard", "River Road", "Elm Court", "Highland Drive", "Park Lane"];
const CITIES = ["Karachi", "Austin", "Berlin", "Toronto", "Nairobi", "Manila", "Lisbon", "Auckland", "Seoul", "Dubai"];
const DOMAINS = ["example.com", "mail.dev", "inbox.io", "testmail.net"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDigits(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
}

interface FakeUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  username: string;
}

function generateUser(): FakeUser {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  return {
    firstName,
    lastName,
    email: `${username}@${pick(DOMAINS)}`,
    phone: `+1 (${randomDigits(3)}) ${randomDigits(3)}-${randomDigits(4)}`,
    address: `${randomDigits(3)} ${pick(STREETS)}, ${pick(CITIES)}`,
    username,
  };
}

export default function FakeUserGenerator() {
  const [count, setCount] = useState(3);
  const [users, setUsers] = useState<FakeUser[]>(() => Array.from({ length: 3 }, generateUser));

  const handleGenerate = () => setUsers(Array.from({ length: Math.min(Math.max(count || 1, 1), 50) }, generateUser));

  const asText = users
    .map((u) => `${u.firstName} ${u.lastName} | ${u.email} | ${u.phone} | ${u.address}`)
    .join("\n");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          Count
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} /> Generate
        </button>
        <CopyButton getValue={() => asText} label="Copy all" className="ml-auto" />
      </div>

      <div className="mt-4 space-y-2">
        {users.map((u, i) => (
          <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
            <p className="font-medium text-neutral-900 dark:text-white">
              {u.firstName} {u.lastName} <span className="font-normal text-neutral-400">@{u.username}</span>
            </p>
            <div className="mt-1 grid gap-1 text-sm text-neutral-500 dark:text-neutral-400 sm:grid-cols-3">
              <span>{u.email}</span>
              <span>{u.phone}</span>
              <span>{u.address}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        All data is randomly generated for testing — none of it refers to real people.
      </p>
    </div>
  );
}
