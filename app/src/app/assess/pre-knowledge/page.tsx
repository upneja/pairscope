"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

function PreKnowledgeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "relationship";
  const depth = searchParams.get("depth") || "quick";

  const [attachmentStyle, setAttachmentStyle] = useState("not_sure");
  const [loveLanguage, setLoveLanguage] = useState("not_sure");
  const [therapyHistory, setTherapyHistory] = useState<string | null>(null);

  const handleContinue = () => {
    sessionStorage.setItem(
      "pairscope_preknowledge",
      JSON.stringify({
        attachmentStyle,
        loveLanguage,
        therapyHistory,
      })
    );
    router.push(`/assess/${mode}?depth=${depth}`);
  };

  const handleSkip = () => {
    sessionStorage.setItem(
      "pairscope_preknowledge",
      JSON.stringify({
        attachmentStyle: "not_sure",
        loveLanguage: "not_sure",
        therapyHistory: null,
      })
    );
    router.push(`/assess/${mode}?depth=${depth}`);
  };

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
        <div className="max-w-xl w-full">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <h1 className="font-display text-4xl sm:text-5xl text-warm-black mb-4 leading-tight">
              Before we begin &mdash; what do you already know?
            </h1>
            <p className="text-text-secondary text-lg">
              All optional. This helps us personalize your report.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6 mb-8"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            {/* Attachment Style */}
            <div>
              <label
                htmlFor="attachment-style"
                className="block text-warm-black font-medium mb-2"
              >
                Do you know your attachment style?
              </label>
              <select
                id="attachment-style"
                value={attachmentStyle}
                onChange={(e) => setAttachmentStyle(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card text-warm-black px-4 py-3 text-sm focus:ring-2 focus:ring-terra/20 focus:border-terra focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="not_sure">Not sure</option>
                <option value="secure">Secure</option>
                <option value="anxious_preoccupied">
                  Anxious-Preoccupied
                </option>
                <option value="dismissive_avoidant">
                  Dismissive-Avoidant
                </option>
                <option value="fearful_avoidant">Fearful-Avoidant</option>
              </select>
            </div>

            {/* Love Language */}
            <div>
              <label
                htmlFor="love-language"
                className="block text-warm-black font-medium mb-2"
              >
                Do you know your primary love language?
              </label>
              <select
                id="love-language"
                value={loveLanguage}
                onChange={(e) => setLoveLanguage(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card text-warm-black px-4 py-3 text-sm focus:ring-2 focus:ring-terra/20 focus:border-terra focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="not_sure">Not sure</option>
                <option value="words_of_affirmation">
                  Words of Affirmation
                </option>
                <option value="quality_time">Quality Time</option>
                <option value="physical_touch">Physical Touch</option>
                <option value="acts_of_service">Acts of Service</option>
                <option value="receiving_gifts">Receiving Gifts</option>
              </select>
            </div>

            {/* Therapy History */}
            <div>
              <label
                htmlFor="therapy-history"
                className="block text-warm-black font-medium mb-2"
              >
                Have you done couples therapy or relationship coaching?
              </label>
              <select
                id="therapy-history"
                value={therapyHistory ?? ""}
                onChange={(e) =>
                  setTherapyHistory(e.target.value || null)
                }
                className="w-full rounded-xl border border-card-border bg-card text-warm-black px-4 py-3 text-sm focus:ring-2 focus:ring-terra/20 focus:border-terra focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            <button
              onClick={handleContinue}
              className="bg-terra text-white rounded-full px-10 py-3 font-medium text-sm hover:bg-terra/90 transition-colors duration-300 mb-4"
            >
              Continue
            </button>
            <div>
              <button
                onClick={handleSkip}
                className="text-text-secondary text-sm hover:text-warm-black transition-colors duration-300"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function PreKnowledgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PreKnowledgeContent />
    </Suspense>
  );
}
