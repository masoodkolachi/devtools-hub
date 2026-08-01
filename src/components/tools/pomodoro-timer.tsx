"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Phase = "focus" | "break";

const DURATIONS: Record<Phase, number> = { focus: 25 * 60, break: 5 * 60 };

export default function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>("focus");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhase((p) => {
            const next: Phase = p === "focus" ? "break" : "focus";
            if (p === "focus") setCyclesCompleted((c) => c + 1);
            setSecondsLeft(DURATIONS[next]);
            return next;
          });
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setPhase("focus");
    setSecondsLeft(DURATIONS.focus);
  };

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  const progress = 1 - secondsLeft / DURATIONS[phase];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 p-1">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            phase === "focus" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
          }`}
        >
          Focus
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            phase === "break" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500"
          }`}
        >
          Break
        </span>
      </div>

      <div className="relative mt-6 flex h-52 w-52 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-black/10 dark:text-white/10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress)}
            className={phase === "focus" ? "text-blue-500" : "text-emerald-500"}
          />
        </svg>
        <span className="font-mono text-5xl font-semibold text-neutral-900 dark:text-white">
          {minutes}:{seconds}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <p className="mt-4 text-sm text-neutral-400">{cyclesCompleted} focus session{cyclesCompleted === 1 ? "" : "s"} completed</p>
      <p className="mt-1 text-xs text-neutral-400">Keep this tab open — the timer pauses if you navigate away and come back.</p>
    </div>
  );
}
