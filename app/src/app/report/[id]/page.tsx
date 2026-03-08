"use client";

import { useState, useCallback, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  placeholderReportRelationship,
  placeholderReportSingle,
} from "@/lib/placeholder-report";
import { ReportSectionCard } from "@/components/report-section-card";
import { exportReportToPDF } from "@/lib/pdf-export";

export default function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [isExporting, setIsExporting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);

  // Select report based on ID
  const report =
    id === "rpt_demo_002"
      ? placeholderReportSingle
      : placeholderReportRelationship;

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      await exportReportToPDF(report);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [report]);

  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
        // In production, this would call an API
        console.log("Email captured:", email);
        setEmailSaved(true);
      }
    },
    [email]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-navy hover:text-coral transition-colors"
          >
            Pairscope
          </Link>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Export PDF
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Report content */}
      <div className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Report header */}
          <motion.div
            className="text-center mb-12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium text-coral uppercase tracking-widest">
              {report.mode === "relationship"
                ? "Relationship Assessment"
                : "Solo Assessment"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-4">
              Your Report
            </h1>
            <p className="text-slate-dark leading-relaxed max-w-xl mx-auto">
              {report.overallSummary}
            </p>
            <p className="text-xs text-slate-mid mt-4">
              Generated on{" "}
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* Report sections */}
          <div className="space-y-8">
            {report.sections.map((section, index) => (
              <ReportSectionCard
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </div>

          {/* Email capture */}
          <motion.div
            className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {emailSaved ? (
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  You&apos;re all set!
                </h3>
                <p className="text-sm text-slate-dark">
                  We&apos;ll send you a copy of your report and remind you to
                  retake in 90 days.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  Save your report
                </h3>
                <p className="text-sm text-slate-dark mb-6 max-w-sm mx-auto">
                  Get a copy of your report emailed to you, plus a reminder to
                  retake in 90 days and see how you&apos;ve grown.
                </p>
                <form
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-coral text-white font-medium rounded-xl text-sm hover:bg-coral-light transition-colors"
                  >
                    Save
                  </button>
                </form>
                <p className="text-xs text-slate-mid mt-3">
                  Optional. We won&apos;t spam you.
                </p>
              </>
            )}
          </motion.div>

          {/* Disclaimer */}
          <div className="mt-8 px-4 py-6 text-center">
            <p className="text-xs text-slate-mid leading-relaxed max-w-xl mx-auto">
              {report.disclaimerText}
            </p>
          </div>

          {/* Retake CTA */}
          <div className="mt-4 text-center pb-8">
            <Link
              href="/assess"
              className="text-sm text-coral hover:text-coral-light transition-colors font-medium"
            >
              Retake the Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
