"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Activity } from "lucide-react";

const events = [
  {
    id: 1,
    type: "Water Level Rising",
    message: "Water level detected at Y = 612 (Warning)",
    time: "2 minutes ago",
    level: "warning",
  },
  {
    id: 2,
    type: "Normal",
    message: "Water level stable at Y = 680",
    time: "15 minutes ago",
    level: "normal",
  },
  {
    id: 3,
    type: "AI Detection",
    message: "Water surface successfully segmented",
    time: "32 minutes ago",
    level: "info",
  },
  {
    id: 4,
    type: "System",
    message: "Model inference running normally",
    time: "1 hour ago",
    level: "info",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect public users to Water Level page
  useEffect(() => {
    if (user?.role === "public") {
      router.replace("/water-level");
    }
  }, [user, router]);

  // Don't render dashboard while redirecting
  if (user?.role === "public") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Real-time flood monitoring • Sungai Taman Ros Merah
        </p>
      </div>

      {/* Single Livestream */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="aspect-video bg-slate-950 relative">
          {/* Live badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-white font-medium">LIVE</span>
          </div>

          {/* Snapshot placeholder image */}
          <img
            src="/Untitled.png"   // ← change filename if needed
            alt="Camera snapshot"
            className="w-full h-full object-cover"
          />

          {/* Camera name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
            <p className="text-white font-medium">MBS-KDN-C1 • Sungai Taman Ros Merah</p>
            <p className="text-slate-400 text-sm">Flood Detection Camera</p>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={18} className="text-blue-400" />
          <h2 className="font-semibold text-white">Event Log</h2>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              <div
                className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                  event.level === "warning"
                    ? "bg-amber-400"
                    : event.level === "danger"
                    ? "bg-red-500"
                    : "bg-blue-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-200">{event.type}</p>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {event.time}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-0.5">{event.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}