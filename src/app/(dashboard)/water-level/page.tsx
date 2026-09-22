"use client";

import { Waves } from "lucide-react";

export default function WaterLevelPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-white">Water Level</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Historical water level trend • Sungai Taman Ros Merah
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Current Level (Y)</p>
          <p className="text-2xl font-bold text-white mt-1">612</p>
          <p className="text-xs text-amber-400 mt-1">Warning threshold</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">24h Highest</p>
          <p className="text-2xl font-bold text-white mt-1">589</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">24h Lowest</p>
          <p className="text-2xl font-bold text-white mt-1">712</p>
        </div>
      </div>

      {/* Graph Placeholder */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Waves size={18} className="text-blue-400" />
          <h2 className="font-semibold text-white">Water Level Trend</h2>
        </div>

        {/* Simple CSS graph placeholder */}
        <div className="h-64 flex items-end gap-1.5">
          {[65, 58, 72, 68, 55, 48, 52, 60, 70, 75, 68, 62, 58, 50, 45, 48, 55, 63, 70, 78, 72, 65, 60, 55].map(
            (height, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-500/80 hover:bg-blue-400 rounded-t transition-all"
                style={{ height: `${height}%` }}
                title={`Y: ${800 - height * 3}`}
              />
            )
          )}
        </div>

        <div className="flex justify-between mt-3 text-xs text-slate-500">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>Now</span>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          (This is a placeholder chart. We will replace it with real data from your model later)
        </p>
      </div>
    </div>
  );
}