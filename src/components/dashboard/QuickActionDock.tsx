"use client";

import React from "react";
import Link from "next/link";
import { Scale, ClipboardList, Truck, Users } from "lucide-react";

export function QuickActionDock() {
  const actions = [
    { title: "Weighbridge", subtitle: "Log Inward GRN", href: "/admin/procurement/grn", icon: Scale },
    { title: "Daily Run", subtitle: "Submit Plant DPR", href: "/admin/operations/dpr", icon: ClipboardList },
    { title: "Consignments", subtitle: "Outward Dispatches", href: "/admin/sales/dispatch", icon: Truck },
    { title: "Roster Punch", subtitle: "Shift Attendance", href: "/admin/hr/attendance", icon: Users },
  ];

  return (
    <section className="space-y-2.5">
      <span className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold block">
        Direct Operations Dock
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.href}
              href={act.href}
              className="p-3.5 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] transition-all flex items-center gap-3 group shadow-2xs active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#EEF5ED] group-hover:bg-[#006B3C] border border-[#DDE5DC] group-hover:border-[#006B3C] flex items-center justify-center text-[#006B3C] group-hover:text-[#FDF8EE] transition-colors shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-[#063D2A] truncate">
                  {act.title}
                </span>
                <span className="text-[10px] font-mono text-[#52605A] truncate">
                  {act.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}