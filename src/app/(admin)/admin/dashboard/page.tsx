"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Scale, Truck, Boxes, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OperationalKpiGrid } from "@/components/dashboard/OperationalKpiGrid";
import { QuickActionDock } from "@/components/dashboard/QuickActionDock";

interface DashboardTelemetry {
  financials: {
    total_sales_revenue?: number;
    total_revenue?: number;
    net_operating_ebitda?: number;
    operating_ebitda?: number;
  } | null;
  yieldSummary: {
    total_raw_processed_kg?: number;
    total_feedstock_intake_kg?: number;
    total_output_kg?: number;
    total_finished_bales_kg?: number;
    overall_recovery_rate_pct?: number;
    recovery_yield_percentage?: number;
  } | null;
  downtimeSummary: {
    total_downtime_minutes?: number;
    primary_reason?: string;
    breakdown_by_reason?: Array<{ reason: string }>;
  } | null;
  recentGRN: Array<{
    id: string;
    grn_number: string;
    vehicle_number: string;
    accepted_net_weight: number;
    gross_weight: number;
  }>;
  recentDispatches: Array<{
    id: string;
    dispatch_number: string;
    buyer_name?: string;
    net_weight_kg: number;
    total_amount: number;
    payment_status: string;
  }>;
  stockLedger: Array<{
    waste_grade_id?: string;
    grade_code: string;
    current_stock_kg: number;
    total_bales: number;
  }>;
}

export default function AdminDashboardPage() {
  const { selectedPlantId } = useAuth();

  const [telemetry, setTelemetry] = useState<DashboardTelemetry>({
    financials: null,
    yieldSummary: null,
    downtimeSummary: null,
    recentGRN: [],
    recentDispatches: [],
    stockLedger: [],
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [networkNotice, setNetworkNotice] = useState<string | null>(null);

  const fetchDashboardFeeds = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setRefreshing(true);
    setNetworkNotice(null);

    const now = new Date();
    const fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const toDate = now.toISOString().split("T")[0];

    const plantParam = selectedPlantId ? `&plant_id=${selectedPlantId}` : "";

    const [finRes, yieldRes, downRes, grnRes, dispRes, stockRes] = await Promise.allSettled([
      apiClient.get(`/financials/summary?from_date=${fromDate}&to_date=${toDate}${plantParam}`),
      apiClient.get(`/analytics/yield?from_date=${fromDate}&to_date=${toDate}${plantParam}`),
      apiClient.get(`/analytics/downtime?from_date=${fromDate}&to_date=${toDate}${plantParam}`),
      apiClient.get(`/procurement/grn?limit=5${plantParam}`),
      apiClient.get(`/sales/dispatch?limit=5${plantParam}`),
      apiClient.get(`/inventory/stock${selectedPlantId ? `?plant_id=${selectedPlantId}` : ""}`),
    ]);

    setTelemetry({
      financials: finRes.status === "fulfilled" ? finRes.value.data : null,
      yieldSummary: yieldRes.status === "fulfilled" ? yieldRes.value.data : null,
      downtimeSummary: downRes.status === "fulfilled" ? downRes.value.data : null,
      recentGRN: grnRes.status === "fulfilled" ? grnRes.value.data?.items || grnRes.value.data || [] : [],
      recentDispatches: dispRes.status === "fulfilled" ? dispRes.value.data?.items || dispRes.value.data || [] : [],
      stockLedger: stockRes.status === "fulfilled" ? stockRes.value.data?.items || stockRes.value.data || [] : [],
    });

    if (finRes.status === "rejected" || yieldRes.status === "rejected") {
      setNetworkNotice("Telemetry feed sync incomplete. Local parameters active.");
    }

    setLoading(false);
    setRefreshing(false);
  }, [selectedPlantId]);

  useEffect(() => {
    fetchDashboardFeeds();
  }, [fetchDashboardFeeds]);

  // Safe normalized values across differing schema signatures
  const rawIntake =
    Number(telemetry.yieldSummary?.total_raw_processed_kg ?? telemetry.yieldSummary?.total_feedstock_intake_kg) || 0;
  const yieldPct =
    Number(telemetry.yieldSummary?.overall_recovery_rate_pct ?? telemetry.yieldSummary?.recovery_yield_percentage) || 0;
  const outputKg =
    Number(telemetry.yieldSummary?.total_output_kg ?? telemetry.yieldSummary?.total_finished_bales_kg) || 0;
  const revenue =
    Number(telemetry.financials?.total_sales_revenue ?? telemetry.financials?.total_revenue) || 0;
  const ebitda =
    Number(telemetry.financials?.net_operating_ebitda ?? telemetry.financials?.operating_ebitda) || 0;
  const downtimeMins =
    Number(telemetry.downtimeSummary?.total_downtime_minutes) || 0;
  const downtimeReason =
    telemetry.downtimeSummary?.primary_reason ||
    telemetry.downtimeSummary?.breakdown_by_reason?.[0]?.reason ||
    "Operational";

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white">
      {/* 1. Header Navigation Bar */}
      <DashboardHeader
        plantId={selectedPlantId}
        refreshing={refreshing}
        onRefresh={() => fetchDashboardFeeds(true)}
      />

      {/* Network Alert Notification */}
      {networkNotice && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-mono text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{networkNotice}</span>
          </div>
          <button
            onClick={() => fetchDashboardFeeds(false)}
            className="underline font-bold text-[#006B3C] ml-3 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. Operational KPI Matrix */}
      <OperationalKpiGrid
        loading={loading}
        intakeKg={rawIntake}
        yieldPct={yieldPct}
        outputKg={outputKg}
        revenue={revenue}
        ebitda={ebitda}
        downtimeMins={downtimeMins}
        downtimeReason={downtimeReason}
      />

      {/* 3. Operational Quick Action Dock */}
      <QuickActionDock />

      {/* 4. Dual Operational Ledgers (Inward vs Outward) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weighbridge (GRN) Inward */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#DDE5DC] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#DDE5DC]">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#006B3C]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#063D2A]">
                  Latest Intake Weigh-Ins (GRN)
                </h3>
              </div>
              <Link
                href="/admin/procurement/grn"
                className="text-[10px] font-mono uppercase text-[#006B3C] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>All GRNs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#DDE5DC]/50 mt-1">
              {telemetry.recentGRN.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[#52605A]">
                  No inward weighbridge records detected.
                </div>
              ) : (
                telemetry.recentGRN.map((grn) => (
                  <div key={grn.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#063D2A] block">
                        {grn.grn_number}
                      </span>
                      <span className="text-[10px] font-mono text-[#52605A] block">
                        Vehicle: {grn.vehicle_number}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#006B3C] block">
                        {(Number(grn.accepted_net_weight || 0) / 1000).toFixed(2)} MT
                      </span>
                      <span className="text-[10px] font-mono text-[#52605A]">
                        Gross: {Number(grn.gross_weight || 0).toLocaleString("en-IN")} kg
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE5DC]/60 text-[10px] font-mono text-[#52605A] flex justify-between mt-4">
            <span>CPCB Cat-II Traceable</span>
            <span>GET /procurement/grn</span>
          </div>
        </div>

        {/* Right: Outward Dispatches Feed */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#DDE5DC] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#DDE5DC]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#006B3C]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#063D2A]">
                  Active Outward Dispatches
                </h3>
              </div>
              <Link
                href="/admin/sales/dispatch"
                className="text-[10px] font-mono uppercase text-[#006B3C] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Dispatches</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#DDE5DC]/50 mt-1">
              {telemetry.recentDispatches.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[#52605A]">
                  No outbound consignments processed.
                </div>
              ) : (
                telemetry.recentDispatches.map((disp) => (
                  <div key={disp.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#063D2A] block">
                        {disp.dispatch_number}
                      </span>
                      <span className="text-[10px] font-mono text-[#52605A] block">
                        {disp.buyer_name || "Offtaker Buyer"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#063D2A] block">
                        ₹{Number(disp.total_amount || 0).toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${
                          disp.payment_status === "PAID"
                            ? "bg-[#EEF5ED] text-[#006B3C] border border-[#006B3C]/20"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {disp.payment_status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE5DC]/60 text-[10px] font-mono text-[#52605A] flex justify-between mt-4">
            <span>Gate Clearance Issued</span>
            <span>GET /sales/dispatch</span>
          </div>
        </div>
      </section>

      {/* 5. Finished Goods Stock Ledger */}
      <section className="rounded-2xl bg-white border border-[#DDE5DC] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#DDE5DC]">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-[#006B3C]" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#063D2A]">
              Finished Goods Stock Balances (Floor Inventory)
            </h3>
          </div>
          <Link
            href="/admin/inventory/stock"
            className="text-[10px] font-mono uppercase text-[#006B3C] font-bold hover:underline flex items-center gap-0.5 self-start sm:self-center"
          >
            <span>Live Ledger</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {telemetry.stockLedger.length === 0 ? (
            <div className="col-span-full py-6 text-center text-xs font-mono text-[#52605A]">
              No baled goods registered in the stock ledger.
            </div>
          ) : (
            telemetry.stockLedger.map((item) => (
              <div
                key={item.waste_grade_id || item.grade_code}
                className="p-3 rounded-xl bg-[#EEF5ED] border border-[#DDE5DC] flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#52605A] font-bold truncate">
                  {item.grade_code}
                </span>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold font-mono text-[#063D2A] block">
                    {(Number(item.current_stock_kg || 0) / 1000).toFixed(2)} MT
                  </span>
                  <span className="text-[10px] font-mono text-[#006B3C] font-semibold">
                    {Number(item.total_bales || 0)} Bales
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}