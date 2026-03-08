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

function OrganicBlob() {
  return (
    <div className="w-64 h-64 mx-auto mb-16 relative flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gradient-to-br from-terra/40 via-sage/30 to-sand/40 blur-2xl animate-[morph_8s_ease-in-out_infinite] animate-[breathe_6s_ease-in-out_infinite]"
        style={{
          animation: "morph 8s ease-in-out infinite, breathe 6s ease-in-out infinite",
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
        const depth = parsed.depth || "quick";
        const answers: Record<string, number | string> = parsed.answers || {};
        const freeTextResponses: Record<string, string> = parsed.freeTextResponses || {};
        const preKnowledge = parsed.preKnowledge || {};
        const completedAt = parsed.completedAt;

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
            depth,
            scores,
            raw_answers: answers,
            free_text_responses: freeTextResponses,
            pre_knowledge: preKnowledge,
          }),
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const report = await response.json();
        report.createdAt = completedAt || new Date().toISOString();

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
      <div className="grain min-h-screen bg-warm-dark flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-terra/15 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-terra"
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
          <h1 className="font-display text-2xl text-text-on-dark mb-4">
            Something went wrong
          </h1>
          <p className="text-text-on-dark-muted text-sm mb-8">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setError(null);
                hasStarted.current = false;
                window.location.reload();
              }}
              className="px-6 py-3 bg-terra text-white font-medium rounded-xl text-sm hover:bg-terra-light transition-colors duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/assess")}
              className="px-6 py-3 bg-white/10 text-text-on-dark font-medium rounded-xl text-sm hover:bg-white/15 transition-colors duration-300"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grain min-h-screen bg-warm-dark flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <OrganicBlob />

        <motion.h1
          className="font-display text-3xl text-text-on-dark mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Analyzing your responses
        </motion.h1>

        <div className="h-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="text-text-on-dark-muted text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
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
              className={`w-2 h-2 rounded-full transition-colors duration-700 ${
                i <= messageIndex ? "bg-terra" : "bg-warm-dark-lighter"
              }`}
            />
          ))}
        </div>

        <p className="mt-12 text-xs text-text-on-dark-muted">
          We&apos;re synthesizing your answers across five research frameworks
          to create a report that&apos;s truly personalized to you.
        </p>
      </div>
    </div>
  );
}
