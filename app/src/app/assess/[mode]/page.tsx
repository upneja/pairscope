"use client";

import { useState, useCallback, useMemo, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  relationshipQuestions,
  singleQuestions,
  getCoreQuestionsForMode,
  getFollowUpsForDimension,
} from "@/data/questions";
import { Question, QuestionV2, AssessmentMode, AssessmentDepth } from "@/lib/types";
import { computeRealtimeScore } from "@/lib/scoring";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

/* ── Shared question shape for UI components ── */
type DisplayQuestion = {
  id: string;
  framework: string;
  text: string;
  subtext?: string;
  format: string;
  options?: { id: string; text: string; score: number }[];
  forcedChoices?: [
    { id: string; text: string; score: number },
    { id: string; text: string; score: number },
  ];
  likertLabels?: { low: string; high: string };
  textPrompt?: string | null;
};

function LikertScale({
  question,
  value,
  onSelect,
}: {
  question: DisplayQuestion;
  value?: number;
  onSelect: (val: number) => void;
}) {
  const labels = question.likertLabels || { low: "Disagree", high: "Agree" };
  return (
    <div className="mt-10">
      <div className="flex justify-between text-sm text-text-secondary mb-5">
        <span>{labels.low}</span>
        <span>{labels.high}</span>
      </div>
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`w-12 h-12 rounded-full transition-all duration-500 ease-out text-sm font-medium
              ${
                value === n
                  ? "bg-terra border-2 border-terra text-white scale-110 shadow-md shadow-terra/20"
                  : "border-2 border-card-border text-text-secondary bg-transparent hover:border-terra/40"
              }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScenarioChoice({
  question,
  value,
  onSelect,
}: {
  question: DisplayQuestion;
  value?: string;
  onSelect: (id: string, score: number) => void;
}) {
  return (
    <div className="mt-10 space-y-3">
      {question.options?.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id, opt.score)}
          className={`w-full text-left p-5 rounded-xl transition-all duration-500
            ${
              value === opt.id
                ? "bg-terra/10 border-l-4 border-terra text-warm-black scale-[1.02] shadow-sm"
                : "bg-card border border-card-border text-warm-black hover:border-terra/40"
            }`}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}

function ForcedChoice({
  question,
  value,
  onSelect,
}: {
  question: DisplayQuestion;
  value?: string;
  onSelect: (id: string, score: number) => void;
}) {
  const choices = question.forcedChoices;
  if (!choices) return null;

  return (
    <div className="mt-10 grid sm:grid-cols-2 gap-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice.id, choice.score)}
          className={`text-left p-5 rounded-xl transition-all duration-500
            ${
              value === choice.id
                ? "bg-terra/10 border-l-4 border-terra text-warm-black scale-[1.02] shadow-sm"
                : "bg-card border border-card-border text-warm-black hover:border-terra/40"
            }`}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}

/* ── Assessment content (needs Suspense for useSearchParams) ── */
function AssessmentContent({ mode }: { mode: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const depth: AssessmentDepth =
    (searchParams.get("depth") as AssessmentDepth) || "quick";
  const assessmentMode: AssessmentMode =
    mode === "relationship" ? "relationship" : "single";

  // Build mode-specific V2 question queue
  const modeQuestions = useMemo(() => {
    const core = getCoreQuestionsForMode(assessmentMode);
    // For quick mode, filter to questions that are "quick" or "both"
    if (depth === "quick") {
      return core.filter(
        (q) => q.assessmentLength === "quick" || q.assessmentLength === "both"
      );
    }
    // For deep mode, include all core questions
    return core;
  }, [assessmentMode, depth]);

  // Legacy fallback questions (used if V2 queue is empty)
  const legacyQuestions: Question[] =
    assessmentMode === "relationship" ? relationshipQuestions : singleQuestions;

  // Dynamic question queue that can grow with follow-ups in deep mode
  const [questionQueue, setQuestionQueue] = useState<QuestionV2[]>(
    () => modeQuestions
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [direction, setDirection] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const [freeTextResponses, setFreeTextResponses] = useState<
    Record<string, string>
  >({});
  const [showTextBox, setShowTextBox] = useState<Record<string, boolean>>({});

  // Use V2 queue if available, otherwise fall back to legacy
  const useV2 = questionQueue.length > 0;
  const questions = useV2 ? questionQueue : (legacyQuestions as unknown as QuestionV2[]);

  const currentQuestion: DisplayQuestion = questions[currentIndex];
  const currentQuestionV2: QuestionV2 | null = useV2
    ? questionQueue[currentIndex]
    : null;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback(
    (questionId: string, value: number | string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  // Adaptive follow-up injection for deep mode
  const checkAndInjectFollowUps = useCallback(
    (answeredIndex: number) => {
      if (depth !== "deep" || !useV2) return;

      const current = questionQueue[answeredIndex];
      const next = questionQueue[answeredIndex + 1];

      // Check if we just finished a framework section
      if (!next || next.framework !== current.framework) {
        // Get unique dimensions for this framework
        const frameworkQuestions = questionQueue
          .slice(0, answeredIndex + 1)
          .filter((q) => q.framework === current.framework);
        const dimensions = [
          ...new Set(frameworkQuestions.map((q) => q.scoring.dimension)),
        ];

        // Check each dimension for trigger thresholds
        const newFollowUps: QuestionV2[] = [];
        for (const dim of dimensions) {
          const score = computeRealtimeScore(answers, questionQueue, dim);
          const followUps = getFollowUpsForDimension(
            dim,
            score,
            assessmentMode
          ).filter((fu) => !questionQueue.some((q) => q.id === fu.id));
          newFollowUps.push(...followUps);
        }

        if (newFollowUps.length > 0) {
          setQuestionQueue((prev) => {
            const updated = [...prev];
            updated.splice(answeredIndex + 1, 0, ...newFollowUps);
            return updated;
          });
        }
      }
    },
    [depth, useV2, questionQueue, answers, assessmentMode]
  );

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      // Check for follow-up injection before advancing
      checkAndInjectFollowUps(currentIndex);
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Read pre-knowledge from sessionStorage
      let preKnowledge = null;
      try {
        const preKnowledgeStr =
          sessionStorage.getItem("pairscope_preknowledge");
        if (preKnowledgeStr) preKnowledge = JSON.parse(preKnowledgeStr);
      } catch {
        // ignore parse errors
      }

      // Store enriched payload in sessionStorage and navigate to processing
      sessionStorage.setItem(
        "pairscope_answers",
        JSON.stringify({
          mode: assessmentMode,
          depth,
          answers,
          freeTextResponses:
            Object.keys(freeTextResponses).length > 0
              ? freeTextResponses
              : undefined,
          preKnowledge,
          completedAt: new Date().toISOString(),
        })
      );
      router.push("/assess/processing");
    }
  }, [
    currentIndex,
    questions.length,
    answers,
    assessmentMode,
    depth,
    freeTextResponses,
    router,
    checkAndInjectFollowUps,
  ]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const hasAnswer = answers[currentQuestion?.id] !== undefined;

  /* ── Intro screen ── */
  if (showIntro) {
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

        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            className="max-w-lg text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            {/* Decorative line */}
            <div className="w-12 h-px bg-terra/40 mx-auto mb-10" />

            <h1 className="font-display text-4xl sm:text-5xl text-warm-black mb-6 leading-tight">
              {assessmentMode === "relationship"
                ? "Your Relationship Assessment"
                : "Your Partner Profile Assessment"}
            </h1>

            <p className="text-text-secondary text-lg mb-1">
              About {depth === "deep" ? "25" : "15"} minutes
            </p>
            <p className="text-text-muted text-sm mb-10">
              {questions.length} questions across five research frameworks
              {depth === "deep" && " \u00B7 adaptive follow-ups enabled"}
            </p>

            <button
              onClick={() => setShowIntro(false)}
              className="px-10 py-4 bg-terra text-white font-medium rounded-full text-lg hover:bg-terra-light transition-colors duration-700"
            >
              Begin
            </button>

            <p className="mt-10 text-xs text-text-tertiary max-w-xs mx-auto leading-relaxed">
              Your answers are processed locally. We don&apos;t store personal
              data without your consent.
            </p>

            {/* Decorative line */}
            <div className="w-8 h-px bg-terra/20 mx-auto mt-8" />
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Assessment flow ── */
  return (
    <div className="grain min-h-screen bg-cream flex flex-col">
      {/* Progress bar — thin, at very top */}
      <div className="w-full bg-cream-dark">
        <div
          className="h-0.5 bg-terra transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="px-8 py-5 flex justify-between items-center">
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          className={`text-sm transition-colors duration-500
            ${
              currentIndex === 0
                ? "text-text-muted cursor-not-allowed"
                : "text-text-secondary hover:text-warm-black"
            }`}
        >
          Back
        </button>
        <span className="text-sm text-text-secondary">
          {currentIndex + 1} of {questions.length}
        </span>
        <Link
          href="/"
          className="text-sm text-text-secondary hover:text-warm-black transition-colors duration-500"
        >
          Exit
        </Link>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" as const }}
            >
              {/* Framework badge */}
              <div className="mb-5">
                <span className="text-[11px] font-medium text-terra uppercase tracking-widest">
                  {currentQuestion.framework.replace(/_/g, " ")}
                </span>
              </div>

              {/* Question text */}
              <h2 className="font-display text-2xl sm:text-3xl text-warm-black leading-snug">
                {currentQuestion.text}
              </h2>
              {currentQuestion.subtext && (
                <p className="mt-3 text-text-secondary text-sm">
                  {currentQuestion.subtext}
                </p>
              )}

              {/* Answer component based on format */}
              {currentQuestion.format === "likert" && (
                <LikertScale
                  question={currentQuestion}
                  value={answers[currentQuestion.id] as number | undefined}
                  onSelect={(val) => handleAnswer(currentQuestion.id, val)}
                />
              )}
              {currentQuestion.format === "scenario" && (
                <ScenarioChoice
                  question={currentQuestion}
                  value={answers[currentQuestion.id] as string | undefined}
                  onSelect={(id, score) => {
                    handleAnswer(currentQuestion.id, score);
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: score,
                      [`${currentQuestion.id}_choice`]: id,
                    }));
                  }}
                />
              )}
              {currentQuestion.format === "forced_choice" && (
                <ForcedChoice
                  question={currentQuestion}
                  value={
                    answers[`${currentQuestion.id}_choice`] as
                      | string
                      | undefined
                  }
                  onSelect={(id, score) => {
                    handleAnswer(currentQuestion.id, score);
                    setAnswers((prev) => ({
                      ...prev,
                      [`${currentQuestion.id}_choice`]: id,
                    }));
                  }}
                />
              )}

              {/* Optional text box for deep mode */}
              {depth === "deep" &&
                currentQuestionV2?.textPrompt && (
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setShowTextBox((prev) => ({
                          ...prev,
                          [currentQuestion.id]: !prev[currentQuestion.id],
                        }))
                      }
                      className="text-sm text-terra hover:text-terra-light transition-colors"
                    >
                      {showTextBox[currentQuestion.id]
                        ? "Hide"
                        : "Want to add context?"}
                    </button>
                    {showTextBox[currentQuestion.id] && (
                      <textarea
                        value={freeTextResponses[currentQuestion.id] || ""}
                        onChange={(e) =>
                          setFreeTextResponses((prev) => ({
                            ...prev,
                            [currentQuestion.id]: e.target.value,
                          }))
                        }
                        placeholder={currentQuestionV2.textPrompt ?? undefined}
                        maxLength={300}
                        className="mt-3 w-full p-4 rounded-xl border border-card-border bg-card text-warm-black text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-terra/20 focus:border-terra transition-colors"
                      />
                    )}
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-8 py-8">
        <div className="max-w-xl mx-auto flex justify-end">
          <button
            onClick={goNext}
            disabled={!hasAnswer}
            className={`px-8 py-3.5 rounded-full font-medium transition-all duration-700 flex items-center gap-2
              ${
                hasAnswer
                  ? "bg-terra text-white hover:bg-terra-light"
                  : "bg-cream-dark text-text-muted cursor-not-allowed"
              }`}
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Continue"}
            <span className="text-sm">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page component with Suspense boundary ── */
export default function AssessmentPage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <AssessmentContent mode={mode} />
    </Suspense>
  );
}
