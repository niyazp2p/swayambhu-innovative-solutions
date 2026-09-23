"use client";

import React, { useState, useEffect } from "react";
import { X, FileText, Loader2, Download, Printer } from "lucide-react";
import { DispatchOrder } from "@/types/sales";
import { salesService } from "@/lib/services/sales";

interface InvoicePdfModalProps {
  dispatch: DispatchOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoicePdfModal({ dispatch, isOpen, onClose }: InvoicePdfModalProps) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activeUrl: string | null = null;

    if (isOpen && dispatch) {
      setLoading(true);
      setError(null);

      salesService
        .getTaxInvoicePdfBlob(dispatch.id)
        .then((blob) => {
          activeUrl = window.URL.createObjectURL(blob);
          setPdfBlobUrl(activeUrl);
        })
        .catch((err) => {
          console.error("Failed to stream invoice PDF", err);
          setError("Failed to retrieve authenticated PDF invoice document.");
        })
        .finally(() => setLoading(false));
    }

    return () => {
      if (activeUrl) {
        window.URL.revokeObjectURL(activeUrl);
      }
      setPdfBlobUrl(null);
    };
  }, [isOpen, dispatch]);

  if (!isOpen || !dispatch) return null;

  const handlePrint = () => {
    if (pdfBlobUrl) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = pdfBlobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow?.print();
    }
  };

  const handleDownload = () => {
    if (pdfBlobUrl) {
      const a = document.createElement("a");
      a.href = pdfBlobUrl;
      a.download = `TaxInvoice_${dispatch.dispatch_number}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EEF5ED] bg-[#FAF8F5] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">
                GST Tax Invoice Document Viewer
              </h3>
              <p className="text-[11px] text-[#7B8580]">
                Invoice Reference: {dispatch.dispatch_number}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pdfBlobUrl && (
              <>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg border border-[#DDE5DC] hover:bg-white text-[#52605A] transition-colors cursor-pointer"
                  title="Print Document"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#7B8580] hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF Stream Canvas */}
        <div className="flex-1 bg-neutral-100 flex items-center justify-center overflow-hidden relative">
          {loading ? (
            <div className="flex flex-col items-center gap-2 text-xs text-[#52605A]">
              <Loader2 className="h-6 w-6 animate-spin text-[#006B3C]" />
              <span>Rendering GST commercial invoice stream...</span>
            </div>
          ) : error ? (
            <div className="text-xs text-rose-600 font-bold">{error}</div>
          ) : pdfBlobUrl ? (
            <iframe
              src={`${pdfBlobUrl}#toolbar=0`}
              className="w-full h-full border-0"
              title="Tax Invoice PDF"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}