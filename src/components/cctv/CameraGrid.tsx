"use client";

const cameras = [
  { id: 1, name: "Dewan Hamzah - Pintu Utama", status: "live" },
  { id: 2, name: "Jalan Kota Raja", status: "live" },
  { id: 3, name: "Pasar Jawa", status: "live" },
  { id: 4, name: "Taman Botani", status: "offline" },
  { id: 5, name: "Jambatan Kota Bridge", status: "live" },
  { id: 6, name: "Kawasan Parkir A", status: "live" },
];

export default function CameraGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {cameras.map((cam) => (
        <div
          key={cam.id}
          className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden group hover:border-blue-500/50 transition"
        >
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-950 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Fake live indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  cam.status === "live" ? "bg-red-500 animate-pulse" : "bg-slate-500"
                }`}
              ></span>
              <span className="text-xs text-white font-medium uppercase">
                {cam.status}
              </span>
            </div>

            <div className="text-slate-600 text-sm">Live Stream Placeholder</div>

            {/* Camera name */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-sm font-medium truncate">{cam.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}