"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ModeSelectionPage() {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white hover:text-coral transition-colors"
        >
          Pairscope
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-2xl w-full">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Are you currently in a relationship?
            </h1>
            <p className="text-slate-light text-lg">
              This determines which version of the assessment you&apos;ll take.
              Both provide valuable insights.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              <Link href="/assess/relationship" className="block group">
                <div className="bg-navy-light border-2 border-white/10 rounded-2xl p-8 text-center transition-all group-hover:border-coral/50 group-hover:shadow-lg group-hover:shadow-coral/5 h-full">
                  <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-coral"
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
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Yes, I&apos;m in a relationship
                  </h2>
                  <p className="text-slate-light text-sm leading-relaxed">
                    ~45 questions about your current relationship dynamic.
                    You&apos;ll get insights on your conflict patterns,
                    emotional bank account, and personalized conversation
                    scripts.
                  </p>
                  <p className="text-xs text-slate-mid mt-4">
                    About 10 minutes
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              <Link href="/assess/single" className="block group">
                <div className="bg-navy-light border-2 border-white/10 rounded-2xl p-8 text-center transition-all group-hover:border-amber/50 group-hover:shadow-lg group-hover:shadow-amber/5 h-full">
                  <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-amber"
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
                  <h2 className="text-xl font-semibold text-white mb-3">
                    No, I&apos;m currently single
                  </h2>
                  <p className="text-slate-light text-sm leading-relaxed">
                    ~35 questions about your patterns across past relationships
                    and tendencies. You&apos;ll get your partner personality
                    profile and attachment blueprint.
                  </p>
                  <p className="text-xs text-slate-mid mt-4">
                    About 8 minutes
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          <motion.p
            className="text-center text-xs text-slate-mid mt-8"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            There&apos;s no wrong answer. Both assessments provide deep,
            research-backed insights.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
