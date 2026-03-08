"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" as const },
  }),
};

export default function ModeSelectionPage() {
  return (
    <div className="grain min-h-screen bg-cream flex flex-col">
      {/* Logo */}
      <div className="px-8 py-6">
        <Link
          href="/"
          className="font-display italic text-xl text-warm-black hover:text-terra transition-colors duration-700"
        >
          Pairscope
        </Link>
      </div>

      {/* Content */}
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
              Are you currently in a relationship?
            </h1>
            <p className="text-text-secondary text-lg">
              This shapes the questions you&apos;ll receive. Choose whichever feels right.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Relationship card */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              <Link href="/assess/relationship" className="block group">
                <div className="bg-card border border-card-border rounded-2xl p-10 text-center transition-all duration-700 group-hover:border-terra-muted group-hover:-translate-y-1 group-hover:shadow-[0_8px_40px_rgba(196,122,90,0.08)] h-full">
                  {/* Heart icon */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-7">
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-warm-black mb-3">
                    Yes, I&apos;m in a relationship
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Questions about your current relationship dynamic, conflict patterns, emotional connection, and communication style.
                  </p>
                  <p className="text-xs text-text-muted">
                    ~45 questions &middot; 10 minutes
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Single card */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              <Link href="/assess/single" className="block group">
                <div className="bg-card border border-card-border rounded-2xl p-10 text-center transition-all duration-700 group-hover:border-sage-muted group-hover:-translate-y-1 group-hover:shadow-[0_8px_40px_rgba(122,154,138,0.08)] h-full">
                  {/* Person icon */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-7">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-warm-black mb-3">
                    No, I&apos;m currently single
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Questions about your patterns across past relationships, attachment tendencies, and what you truly need in a partner.
                  </p>
                  <p className="text-xs text-text-muted">
                    ~35 questions &middot; 8 minutes
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
            Both assessments provide deep, research-backed insights.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
