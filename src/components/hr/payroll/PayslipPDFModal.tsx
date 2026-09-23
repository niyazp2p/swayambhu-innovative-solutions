"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Printer, Loader2, AlertCircle, FileText } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Payslip, Employee } from "@/types/hr";

interface ModalProps {
  payslip: Payslip | null;
  employee?: Employee;
  isOpen: boolean;
  onClose: () => void;
}

export default function PayslipPdfModal({
  payslip,
  employee,
  isOpen,
  onClose,
}: ModalProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const fetchPdfBlob = async () => {
      if (!payslip || !isOpen) return;
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/hr/payslip/${payslip.id}/pdf`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (err: any) {
        console.error("Failed to stream payslip PDF", err);
        setError("Failed to generate or render PDF payslip.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfBlob();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      setPdfUrl(null);
    };
  }, [payslip, isOpen]);

  if (!isOpen || !payslip) return null;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `payslip_${employee?.employee_code || "EMP"}_${String(
      payslip.month
    ).padStart(2, "0")}_${payslip.year}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    const iframe = document.getElementById("payslip-pdf-frame") as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#EEF5ED] bg-[#FDF8EE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">
                {employee?.full_name || "Employee"} — Salary Slip
              </h3>
              <span className="text-[10px] text-[#7B8580]">
                Ref: {payslip.id.substring(0, 8)} • Cycle: {String(payslip.month).padStart(2, "0")}/{payslip.year}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pdfUrl && (
              <>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-xl border border-[#DDE5DC] hover:bg-white text-[#52605A] transition-colors"
                  title="Print Slip"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#7B8580] hover:bg-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Stream Container */}
        <div className="flex-1 bg-[#2b2b2b] relative overflow-hidden flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-2 text-white/80">
              <Loader2 className="h-8 w-8 animate-spin text-[#006B3C]" />
              <span className="text-xs">Generating official printable PDF...</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {pdfUrl && !loading && (
            <iframe
              id="payslip-pdf-frame"
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0 bg-white"
              title="Official Payslip PDF"
            />
          )}
        </div>
      </div>
    </div>
  );
}