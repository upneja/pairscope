"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" as const },
  }),
};

function DepthSelectionContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "relationship";

  return (
    <div className="grain min-h-screen bg-cream flex flex-col">
      {/* Logo */}
      <div className="px-8 py-6">
        <Link
          href="/assess"
          className="font-display italic text-xl text-warm-black hover:text-terra transition-colors duration-700"
        >
          Pairscope
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="max-w-2xl w-full">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <h1 className="font-display text-4xl sm:text-5xl text-warm-black mb-4 leading-tight">
              How deep do you want to go?
            </h1>
            <p className="text-text-secondary text-lg">
              Both options use the same research frameworks. Deep Dive adds
              adaptive follow-ups and space for reflection.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Quick Insights */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              <Link
                href={`/assess/pre-knowledge?mode=${mode}&depth=quick`}
                className="block group"
              >
                <div className="bg-card border border-card-border rounded-2xl p-10 text-center transition-all duration-700 group-hover:border-terra/40 group-hover:-translate-y-1 group-hover:shadow-[0_8px_40px_rgba(196,122,90,0.08)] h-full">
                  <div className="w-14 h-14 rounded-full bg-terra/10 flex items-center justify-center mx-auto mb-7">
                    <svg
                      className="w-7 h-7 text-terra"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-warm-black mb-3">
                    Quick Insights
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Core questions across all five frameworks. Great for a first
                    look at your patterns.
                  </p>
                  <p className="text-xs text-text-tertiary">
                    ~30 questions &middot; 15 minutes
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Deep Dive */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              <Link
                href={`/assess/pre-knowledge?mode=${mode}&depth=deep`}
                className="block group"
              >
                <div className="bg-card border border-card-border rounded-2xl p-10 text-center transition-all duration-700 group-hover:border-sage/40 group-hover:-translate-y-1 group-hover:shadow-[0_8px_40px_rgba(122,154,138,0.08)] h-full">
                  <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-7">
                    <svg
                      className="w-7 h-7 text-sage"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-warm-black mb-3">
                    Deep Dive
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Adaptive follow-ups based on your answers, optional
                    reflections, and a richer analysis.
                  </p>
                  <p className="text-xs text-text-tertiary">
                    36&ndash;50 questions &middot; 25 minutes
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          <motion.p
            className="text-center text-xs text-text-secondary mt-10"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            You can always retake with a different depth later.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function DepthSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <DepthSelectionContent />
    </Suspense>
  );
}
