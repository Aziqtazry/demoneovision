"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Waves,
  X,
} from "lucide-react";
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

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-dvh w-64 flex-col border-r border-slate-800 bg-[#0b1220] transition-[transform,width] duration-300 ease-in-out lg:static lg:z-auto lg:h-screen lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "lg:w-20" : "lg:w-64"
      )}
      aria-label="Primary navigation"
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-2 border-b border-slate-800 px-3",
          isCollapsed && "lg:justify-center"
        )}
      >
        <div className={cn("min-w-0", isCollapsed && "lg:hidden")}>
          <Logo />
        </div>

        <button
          type="button"
          onClick={onCloseMobile}
          className="inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden shrink-0 items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:inline-flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                isCollapsed && "lg:justify-center lg:px-2",
                isActive
                  ? "border border-blue-500/30 bg-blue-600/20 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              )}
            >
              <Icon size={18} className="shrink-0" />
              <span className={cn(isCollapsed && "lg:hidden")}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div
        className={cn(
          "border-t border-slate-800 p-4 text-xs text-slate-500",
          isCollapsed && "lg:hidden"
        )}
      >
        © 2026 MBS-KDN • Flood Detection
      </div>
    </aside>
  );
}
