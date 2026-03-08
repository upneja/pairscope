"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { computeScores } from "@/lib/scoring";
import { AssessmentScores } from "@/lib/types";
import { relationshipQuestions, singleQuestions } from "@/data/questions";

const statusMessages = [
  "Cross-referencing with Gottman\u2019s research...",
  "Mapping your attachment patterns...",
  "Analyzing your conflict signature...",
  "Evaluating your emotional bank account...",
  "Generating your personalized report...",
];

const MIN_DISPLAY_MS = 12000; // Minimum time to show the animation

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
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  // Rotate status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate report
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const generateReport = async () => {
      const animationStart = Date.now();

      try {
        // Read answers from sessionStorage
        const storedData = sessionStorage.getItem("pairscope_answers");
        if (!storedData) {
          throw new Error("No assessment data found. Please retake the assessment.");
        }

        const parsed = JSON.parse(storedData);
        const mode: "relationship" | "single" = parsed.mode || "relationship";
        const answers: Record<string, number | string> = parsed.answers || {};

        // Compute scores from answers using the question bank
        let scores: AssessmentScores;
        const questions =
          mode === "relationship" ? relationshipQuestions : singleQuestions;
        if (questions && questions.length > 0 && Object.keys(answers).length > 0) {
          scores = computeScores(answers, questions);
        } else if (parsed.scores) {
          // Use pre-computed scores if available
          scores = parsed.scores;
        } else {
          // Fallback: construct minimal scores from answers
          scores = {
            gottman: {
              criticism: 3,
              contempt: 2,
              defensiveness: 4,
              stonewalling: 3,
              love_maps: 6,
              fondness: 7,
              turning_toward: 5,
            },
            attachment: { anxiety: 3, avoidance: 2 },
            big_five: { neuroticism: 3, conscientiousness: 3, agreeableness: 3 },
            csi_total: mode === "relationship" ? 14 : undefined,
            love_languages: {
              ranked: [
                "quality_time",
                "words_of_affirmation",
                "physical_touch",
                "acts_of_service",
                "gifts",
              ],
            },
          };
        }

        // Call the API to generate the report
        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode,
            scores,
            raw_answers: answers,
          }),
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const report = await response.json();

        // Store the report in sessionStorage
        sessionStorage.setItem("pairscope_report", JSON.stringify(report));

        // Wait for minimum animation time
        const elapsed = Date.now() - animationStart;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        await new Promise((resolve) => setTimeout(resolve, remaining));

        // Redirect to the report page
        router.push("/report/latest");
      } catch (err) {
        console.error("Report generation failed:", err);

        // Wait for minimum animation time even on error
        const elapsed = Date.now() - animationStart;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        await new Promise((resolve) => setTimeout(resolve, remaining));

        // Try to show a fallback report
        const storedData = sessionStorage.getItem("pairscope_answers");
        const mode = storedData
          ? JSON.parse(storedData).mode || "relationship"
          : "relationship";

        // Fetch the placeholder as fallback
        try {
          const fallbackResponse = await fetch("/api/generate-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode,
              scores: {
                gottman: {
                  criticism: 3, contempt: 2, defensiveness: 4,
                  stonewalling: 3, love_maps: 6, fondness: 7, turning_toward: 5,
                },
                attachment: { anxiety: 3, avoidance: 2 },
                big_five: { neuroticism: 3, conscientiousness: 3, agreeableness: 3 },
                csi_total: mode === "relationship" ? 14 : undefined,
                love_languages: { ranked: ["quality_time", "words_of_affirmation", "physical_touch", "acts_of_service", "gifts"] },
              },
              raw_answers: {},
            }),
          });

          if (fallbackResponse.ok) {
            const fallbackReport = await fallbackResponse.json();
            sessionStorage.setItem("pairscope_report", JSON.stringify(fallbackReport));
            router.push("/report/latest");
            return;
          }
        } catch {
          // Fallback API call also failed
        }

        setError(
          err instanceof Error ? err.message : "Something went wrong generating your report."
        );
      }
    };

    generateReport();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-slate-light text-sm mb-8">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setError(null);
                hasStarted.current = false;
                window.location.reload();
              }}
              className="px-6 py-3 bg-coral text-white font-medium rounded-xl text-sm hover:bg-coral/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/assess")}
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl text-sm hover:bg-white/20 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

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
