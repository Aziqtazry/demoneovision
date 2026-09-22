"use client";

import { Bell, CloudSun, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  const now = new Date();
  const time = now.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header className="h-14 bg-[#0b1220] border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-medium text-sm">
          AI Detection Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-5">
        {/* Weather / Time */}
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <CloudSun size={16} className="text-amber-400" />
          <span>28°C</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{date}</span>
          <span className="font-mono text-blue-400">{time}</span>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition">
          <Bell size={18} className="text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User + Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-700">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <User size={16} className="text-slate-300" />
          </div>
          <div className="text-xs">
            <p className="text-slate-200 font-medium">{user?.username}</p>
            <p className="text-slate-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-slate-800 transition text-slate-400 hover:text-red-400"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}