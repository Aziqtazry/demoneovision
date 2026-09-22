"use client";

import { useEffect, useState } from "react";
import { Bell, CloudSun, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
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
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1220] pl-14 pr-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <h1 className="truncate text-xs font-medium text-white sm:text-sm">
          AI Detection Dashboard
        </h1>
      </div>

      <div className="hidden shrink-0 items-center gap-1 sm:flex sm:gap-3 lg:gap-5">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CloudSun size={16} className="text-amber-400" />
          <span>28°C</span>
          <span className="hidden text-slate-500 md:inline">|</span>
          <span className="hidden text-slate-400 md:inline">{date ?? ""}</span>
          <span className="hidden font-mono text-blue-400 sm:inline">{time ?? "--:--"}</span>
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 transition hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-slate-400" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-700 pl-2 sm:gap-3 sm:pl-3">
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-slate-700 sm:flex">
            <User size={16} className="text-slate-300" />
          </div>
          <div className="hidden text-xs md:block">
            <p className="font-medium text-slate-200">{user?.username}</p>
            <p className="capitalize text-slate-500">{user?.role}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
