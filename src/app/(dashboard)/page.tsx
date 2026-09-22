"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Activity, Maximize2, X } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const cameraFeeds = [
  { id: 1, name: "MBS-KDN-C1", location: "Sungai Taman Ros Merah", src: "0922.mp4" },
  { id: 2, name: "MBS-KDN-C2", location: "Sungai Taman Ros Merah", src: "0922(1).mp4" },
  { id: 3, name: "MBS-KDN-C3", location: "Sungai Taman Ros Merah", src: "0922(2).mp4" },
  { id: 4, name: "MBS-KDN-C4", location: "Sungai Taman Ros Merah", src: "0922(3).mp4" },
];

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
  const [selectedCamera, setSelectedCamera] = useState<
    (typeof cameraFeeds)[number] | null
  >(null);

  // Redirect public users to Water Level page
  useEffect(() => {
    if (user?.role === "public") {
      router.replace("/water-level");
    }
  }, [user, router]);

  useEffect(() => {
    if (!selectedCamera) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCamera(null);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCamera]);

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

      {/* Demo camera playback grid */}
      <section className="space-y-3" aria-labelledby="camera-playback-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="camera-playback-heading" className="font-semibold text-white">
              Camera Playback
            </h2>
            <p className="text-sm text-slate-400">
              Recorded footage for dashboard demonstration
            </p>
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap">4 cameras</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameraFeeds.map((camera) => (
            <article
              key={camera.id}
              className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden"
            >
              <div className="aspect-video bg-black relative">
                <video
                  className="h-full w-full object-cover cursor-zoom-in"
                  src={`${basePath}/${camera.src}`}
                  aria-label={`${camera.name} recorded camera footage`}
                  onClick={() => setSelectedCamera(camera)}
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-md bg-black/65 px-2.5 py-1 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[11px] text-white font-semibold tracking-wide">
                    DEMO REPLAY
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCamera(camera)}
                  className="absolute top-3 right-3 z-10 rounded-md bg-black/65 p-2 text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Enlarge ${camera.name}`}
                >
                  <Maximize2 size={16} />
                </button>

                <div className="absolute bottom-10 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3 pointer-events-none">
                  <p className="text-white text-sm font-medium">{camera.name}</p>
                  <p className="text-slate-300 text-xs">{camera.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedCamera && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="selected-camera-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCamera(null);
          }}
        >
          <div className="w-full max-w-6xl overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div>
                <h2 id="selected-camera-title" className="font-semibold text-white">
                  {selectedCamera.name}
                </h2>
                <p className="text-xs text-slate-400">{selectedCamera.location} · Demo replay</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCamera(null)}
                className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close enlarged camera view"
              >
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video bg-black">
              <video
                key={selectedCamera.id}
                className="h-full w-full object-contain"
                src={`${basePath}/${selectedCamera.src}`}
                aria-label={`${selectedCamera.name} enlarged recorded camera footage`}
                autoPlay
                controls
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
          </div>
        </div>
      )}

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
