"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["admin", "public"],
  },
  {
    name: "Water Level",
    href: "/water-level",
    icon: Waves,
    roles: ["admin", "public"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className="w-64 bg-[#0b1220] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-slate-800">
        <Logo />
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              )}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        © 2026 MBS-KDN • Flood Detection
      </div>
    </aside>
  );
}
