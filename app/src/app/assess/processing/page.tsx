"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const statusMessages = [
  "Cross-referencing with Gottman\u2019s research...",
  "Mapping your attachment patterns...",
  "Analyzing your conflict signature...",
  "Evaluating your emotional bank account...",
  "Generating your personalized report...",
];

function PulsingCircles() {
  return (
    <div className="relative w-48 h-48 mx-auto mb-12">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-coral/20"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{
            scale: [0.3, 1.2],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.75,
            ease: "easeOut" as const,
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-coral"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
    </div>
  );
}

export default function ProcessingPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-redirect after 18 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      // In production, this would redirect to the actual report
      // For now, use the demo report
      const stored = sessionStorage.getItem("pairscope_answers");
      const mode = stored ? JSON.parse(stored).mode : "relationship";
      const reportId = mode === "relationship" ? "rpt_demo_001" : "rpt_demo_002";
      router.push(`/report/${reportId}`);
    }, 18000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <PulsingCircles />

        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Analyzing your responses
        </motion.h1>

        <div className="h-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="text-slate-light text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {statusMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtle progress dots */}
        <div className="flex justify-center gap-2">
          {statusMessages.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                i <= messageIndex ? "bg-coral" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <p className="mt-12 text-xs text-slate-mid">
          We&apos;re synthesizing your answers across five research frameworks
          to create a report that&apos;s truly personalized to you.
        </p>
      </div>
    </div>
  );
}
