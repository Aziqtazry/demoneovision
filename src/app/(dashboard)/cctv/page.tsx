"use client";

import { useState } from "react";
import {
  Grid2X2,
  Grid3X3,
  Maximize2,
  Camera,
  AlertTriangle,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const cameras = [
  { id: 1, name: "Dewan Hamzah - Pintu Utama", location: "Dewan Hamzah", status: "live" },
  { id: 2, name: "Jalan Kota Raja", location: "Kota Raja", status: "live" },
  { id: 3, name: "Pasar Jawa", location: "Pasar Jawa", status: "live" },
  { id: 4, name: "Taman Botani", location: "Taman Botani", status: "offline" },
  { id: 5, name: "Jambatan Kota Bridge", location: "Kota Bridge", status: "live" },
  { id: 6, name: "Kawasan Parkir A", location: "Parkir A", status: "live" },
  { id: 7, name: "Jalan Tengku Kelana", location: "Tengku Kelana", status: "live" },
  { id: 8, name: "Pusat Bandar Klang", location: "Pusat Bandar", status: "live" },
  { id: 9, name: "Stesen Bas Klang", location: "Stesen Bas", status: "live" },
];

const aiAlerts = [
  {
    id: 1,
    camera: "Dewan Hamzah - Pintu Utama",
    type: "Pencerobohan Kawasan Larangan",
    time: "2 minit lalu",
    level: "high",
  },
  {
    id: 2,
    camera: "Kawasan Parkir A",
    type: "Parkir Haram Dikesan",
    time: "8 minit lalu",
    level: "medium",
  },
  {
    id: 3,
    camera: "Jalan Kota Raja",
    type: "Objek Ditinggalkan",
    time: "15 minit lalu",
    level: "medium",
  },
  {
    id: 4,
    camera: "Pasar Jawa",
    type: "Aliran Orang Ramai Tinggi",
    time: "22 minit lalu",
    level: "low",
  },
];

export default function CCTVPage() {
  const [gridSize, setGridSize] = useState<2 | 3>(2);
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredCameras = cameras.filter((cam) =>
    cam.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = cameras.find((c) => c.id === selectedCamera);

  return (
    <div className="h-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pemantauan CCTV</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {cameras.filter((c) => c.status === "live").length} kamera aktif •{" "}
            {cameras.length} total
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Cari kamera..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-48"
            />
          </div>

          {/* Grid Toggle */}
          <div className="flex bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setGridSize(2)}
              className={cn(
                "p-2 transition",
                gridSize === 2 ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Grid2X2 size={18} />
            </button>
            <button
              onClick={() => setGridSize(3)}
              className={cn(
                "p-2 transition",
                gridSize === 3 ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Grid3X3 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-5 min-h-0">
        {/* Camera Grid */}
        <div className="xl:col-span-3 flex flex-col min-h-0">
          <div
            className={cn(
              "grid gap-4 overflow-y-auto pr-1",
              gridSize === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {filteredCameras.map((cam) => (
              <div
                key={cam.id}
                onClick={() => setSelectedCamera(cam.id)}
                className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden cursor-pointer group hover:border-blue-500/60 transition relative"
              >
                {/* Video Placeholder */}
                <div className="aspect-video bg-slate-950 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Live badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        cam.status === "live" ? "bg-red-500 animate-pulse" : "bg-slate-500"
                      )}
                    />
                    <span className="text-[11px] text-white font-medium uppercase tracking-wide">
                      {cam.status}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition z-10">
                    <div className="bg-black/50 p-1.5 rounded-md">
                      <Maximize2 size={14} className="text-white" />
                    </div>
                  </div>

                  <Camera size={32} className="text-slate-700" />

                  {/* Camera info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <p className="text-white text-sm font-medium truncate">{cam.name}</p>
                    <p className="text-slate-400 text-xs">{cam.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - AI Alerts */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-400" />
            <h2 className="font-semibold text-white">Amaran AI</h2>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1">
            {aiAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-2 h-2 mt-1.5 rounded-full shrink-0",
                      alert.level === "high"
                        ? "bg-red-500"
                        : alert.level === "medium"
                        ? "bg-amber-400"
                        : "bg-blue-400"
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-200 leading-snug">{alert.type}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate">{alert.camera}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen / Selected Camera Modal */}
      {selectedCamera && selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <div className="relative w-full max-w-6xl">
            {/* Close button */}
            <button
              onClick={() => setSelectedCamera(null)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-slate-300 hover:text-white transition"
            >
              <X size={20} />
              <span className="text-sm">Tutup</span>
            </button>

            {/* Video area */}
            <div className="aspect-video bg-slate-950 rounded-xl border border-slate-700 relative flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-white font-medium">LIVE</span>
              </div>

              <div className="text-center">
                <Camera size={48} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">
                  Live stream placeholder
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  (Akan diganti dengan RTSP / HLS stream)
                </p>
              </div>

              {/* Camera name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-white text-lg font-medium">{selected.name}</p>
                <p className="text-slate-400 text-sm">{selected.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}