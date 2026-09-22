"use client";

import { useEffect, useState } from "react";
import { Bell, CloudSun } from "lucide-react";

export default function Topbar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const time = now?.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now?.toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1220] pl-14 pr-2 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <h1 className="truncate text-xs font-medium text-white sm:text-sm">
          AI Detection<span className="hidden sm:inline"> Dashboard</span>
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
        <CloudSun size={15} className="shrink-0 text-amber-400" />
        <div className="text-right text-[10px] leading-tight">
          <div className="flex items-center justify-end gap-1.5">
            <span className="font-medium text-slate-200">28°C</span>
            <span className="font-mono text-blue-400">{time ?? "--:--"}</span>
          </div>
          <p className="mt-0.5 whitespace-nowrap text-slate-400">{date ?? ""}</p>
        </div>
        <button
          type="button"
          className="relative rounded-lg p-1.5 transition hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell size={17} className="text-slate-400" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>

      <div className="hidden shrink-0 items-center gap-3 sm:flex lg:gap-5">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CloudSun size={16} className="text-amber-400" />
          <span>28°C</span>
          <span className="hidden text-slate-500 md:inline">|</span>
          <span className="hidden text-slate-400 md:inline">{date ?? ""}</span>
          <span className="font-mono text-blue-400">{time ?? "--:--"}</span>
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 transition hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-slate-400" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
