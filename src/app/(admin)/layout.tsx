"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Scale,
  FileSpreadsheet,
  Users,
  Boxes,
  ClipboardList,
  AlertTriangle,
  PackageCheck,
  Truck,
  Building2,
  CreditCard,
  Receipt,
  UserCheck,
  FileText,
  Settings,
  BadgePercent,
  Zap,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Timer,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

const adminNavigation: NavGroup[] = [
  {
    groupLabel: "Executive Overview",
    items: [
      {
        title: "Main Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
      {
        title: "Yield Intelligence",
        href: "/admin/analytics/yield",
        icon: BadgePercent,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
      {
        title: "Utilities & Fuel",
        href: "/admin/analytics/utilities",
        icon: Zap,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
            {
        title: "Downtime",
        href: "/admin/analytics/downtime",
        icon: Timer,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
    ],
  },
  {
    groupLabel: "Procurement & Intake",
    items: [
      {
        title: "Weighbridge (GRN)",
        href: "/admin/procurement/grn",
        icon: Scale,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "WEIGHBRIDGE_OPERATOR"],
      },
      {
        title: "Grades & Pricing",
        href: "/admin/procurement/grades",
        icon: FileSpreadsheet,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
      {
        title: "Vendor Registry",
        href: "/admin/procurement/vendors",
        icon: Users,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "WEIGHBRIDGE_OPERATOR"],
      },
      {
        title: "Intake Batches",
        href: "/admin/procurement/batches",
        icon: Boxes,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
    ],
  },
  {
    groupLabel: "Operations & Sorting",
    items: [
      {
        title: "Daily Progress (DPR)",
        href: "/admin/operations/dpr",
        icon: ClipboardList,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
      {
        title: "Machine Downtime",
        href: "/admin/operations/downtime",
        icon: AlertTriangle,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
    ],
  },
  {
    groupLabel: "Finished Goods",
    items: [
      {
        title: "Stock Balance Ledger",
        href: "/admin/inventory/stock",
        icon: PackageCheck,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "WEIGHBRIDGE_OPERATOR"],
      },
    ],
  },
  {
    groupLabel: "Sales & Outward",
    items: [
      {
        title: "Dispatches & Passes",
        href: "/admin/sales/dispatch",
        icon: Truck,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "LOGISTICS", "WEIGHBRIDGE_OPERATOR"],
      },
      {
        title: "Offtaker Buyers",
        href: "/admin/sales/buyers",
        icon: Building2,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "LOGISTICS"],
      },
      {
        title: "Receivables",
        href: "/admin/sales/receivables",
        icon: CreditCard,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
      {
        title: "Tax Invoices",
        href: "/admin/sales/invoices",
        icon: Receipt,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER"],
      },
    ],
  },
  {
    groupLabel: "Workforce & Payroll",
    items: [
      {
        title: "Employees",
        href: "/admin/hr/employees",
        icon: UserCheck,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "HR_OFFICER"],
      },
      {
        title: "Daily Attendance",
        href: "/admin/hr/attendance",
        icon: ClipboardList,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "HR_OFFICER"],
      },
      {
        title: "Salary Advances",
        href: "/admin/hr/advances",
        icon: CreditCard,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "HR_OFFICER"],
      },
      {
        title: "Payroll & Slips",
        href: "/admin/hr/payroll",
        icon: FileText,
        roles: ["SUPER_ADMIN", "PLANT_MANAGER", "HR_OFFICER"],
      },
    ],
  },
  {
    groupLabel: "Platform Administration",
    items: [
      {
        title: "User Accounts",
        href: "/admin/users",
        icon: Settings,
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Facility Profile",
        href: "/admin/plants",
        icon: Building2,
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
];

function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
    if (!loading && user && isLoginPage) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, isLoginPage, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FDF8EE] text-[#006B3C]">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#006B3C] border-t-transparent" />
      </div>
    );
  }

  const filteredNav = adminNavigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(user.role)),
    }))
    .filter((group) => group.items.length > 0);

  const NavigationContent = () => (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-5 bg-[#063D2A] text-[#FDF8EE] selection:bg-[#28A745] selection:text-white">
      <div className="space-y-6">
        {/* Brand Lockup */}
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="relative h-10 w-10 shrink-0 rounded-xl bg-[#FDF8EE] p-1.5 flex items-center justify-center shadow-md">
            <Image
              src="/main logo.png"
              alt="Swayambhu"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FDF8EE] leading-tight">
              Swayambhu
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#88C34A]">
              Operations v1
            </span>
          </div>
        </Link>

        {/* Dynamic Groups */}
        <nav className="space-y-5">
          {filteredNav.map((group) => (
            <div key={group.groupLabel} className="space-y-1">
              <span className="px-2.5 text-[9.5px] font-mono uppercase tracking-[0.16em] text-[#DDE5DC]/60 font-bold block">
                {group.groupLabel}
              </span>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href + "/"));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-150 ${
                        isActive
                          ? "bg-[#FDF8EE] text-[#063D2A] font-bold shadow-sm"
                          : "text-[#DDE5DC] hover:bg-white/[0.08] hover:text-[#FDF8EE]"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#006B3C]" : "text-[#DDE5DC]/70"}`} />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Operator Session Card */}
      <div className="border-t border-white/15 pt-4 mt-6">
        <div className="flex items-center justify-between rounded-xl bg-white/[0.08] p-2.5 border border-white/10">
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-xs font-bold text-[#FDF8EE] truncate">{user.full_name}</span>
            <span className="text-[9px] font-mono text-[#88C34A] uppercase truncate">{user.role}</span>
          </div>
          <button
            onClick={logout}
            className="h-8 w-8 rounded-lg bg-black/20 text-[#DDE5DC] hover:bg-red-900/60 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDF8EE] text-[#171F1B] font-sans selection:bg-[#006B3C] selection:text-white">
      
      {/* 1. DESKTOP BRAND GREEN SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col shrink-0 shadow-lg z-20">
        <NavigationContent />
      </aside>

      {/* 2. MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute right-3.5 top-3.5 text-[#DDE5DC] hover:text-[#FDF8EE] p-1.5 rounded-lg bg-black/20"
                >
                  <X className="h-4 w-4" />
                </button>
                <NavigationContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. LIGHT MINERAL CANVAS VIEWPORT */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#FDF8EE]">
        
        {/* LIGHT TOPBAR HEADER */}
        <header className="h-16 border-b border-[#DDE5DC] bg-[#FFFFFF]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-lg p-2 text-[#52605A] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Fixed Single Facility Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#063D2A] bg-[#EEF5ED] border border-[#006B3C]/20 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="h-3.5 w-3.5 text-[#006B3C]" />
              <span className="font-semibold">Haridwar Plant (SIDCUL)</span>
              <span className="text-[10px] text-[#52605A] hidden sm:inline">• Node HW-01</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF5ED] border border-[#DDE5DC]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28A745] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006B3C]" />
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#006B3C] uppercase font-bold">
                API Active
              </span>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto bg-[#FDF8EE] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AuthProvider>
  );
}