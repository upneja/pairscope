"use client";

import { useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  relationshipQuestions,
  singleQuestions,
} from "@/data/questions";
import { Question, AssessmentMode } from "@/lib/types";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

function LikertScale({
  question,
  value,
  onSelect,
}: {
  question: Question;
  value?: number;
  onSelect: (val: number) => void;
}) {
  const labels = question.likertLabels || { low: "Disagree", high: "Agree" };
  return (
    <div className="mt-8">
      <div className="flex justify-between text-sm text-slate-light mb-4">
        <span>{labels.low}</span>
        <span>{labels.high}</span>
      </div>
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all text-sm font-medium
              ${
                value === n
                  ? "bg-coral border-coral text-white scale-110"
                  : "border-white/20 text-white/60 hover:border-coral/50 hover:text-white"
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
  question: Question;
  value?: string;
  onSelect: (id: string, score: number) => void;
}) {
  return (
    <div className="mt-8 space-y-3">
      {question.options?.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id, opt.score)}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all
            ${
              value === opt.id
                ? "bg-coral/10 border-coral text-white"
                : "border-white/10 text-slate-light hover:border-white/30 hover:text-white"
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
  question: Question;
  value?: string;
  onSelect: (id: string, score: number) => void;
}) {
  const choices = question.forcedChoices;
  if (!choices) return null;

  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice.id, choice.score)}
          className={`text-left p-6 rounded-xl border-2 transition-all
            ${
              value === choice.id
                ? "bg-coral/10 border-coral text-white"
                : "border-white/10 text-slate-light hover:border-white/30 hover:text-white"
            }`}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = use(params);
  const router = useRouter();
  const assessmentMode: AssessmentMode =
    mode === "relationship" ? "relationship" : "single";
  const questions =
    assessmentMode === "relationship" ? relationshipQuestions : singleQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [direction, setDirection] = useState(1);
  const [showIntro, setShowIntro] = useState(true);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback(
    (questionId: string, value: number | string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Store answers in sessionStorage and navigate to processing
      sessionStorage.setItem(
        "pairscope_answers",
        JSON.stringify({
          mode: assessmentMode,
          answers,
          completedAt: new Date().toISOString(),
        })
      );
      router.push("/assess/processing");
    }
  }, [currentIndex, questions.length, answers, assessmentMode, router]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const hasAnswer = answers[currentQuestion?.id] !== undefined;

  if (showIntro) {
    return (
      <div className="min-h-screen bg-navy flex flex-col">
        <div className="px-6 py-4">
          <Link
            href="/assess"
            className="text-xl font-semibold tracking-tight text-white hover:text-coral transition-colors"
          >
            Pairscope
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            className="max-w-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-coral"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {assessmentMode === "relationship"
                ? "Your Relationship Assessment"
                : "Your Partner Profile Assessment"}
            </h1>
            <p className="text-slate-light text-lg mb-2">
              This takes about{" "}
              {assessmentMode === "relationship" ? "10" : "8"} minutes.
            </p>
            <p className="text-slate-mid text-sm mb-8 max-w-sm mx-auto">
              {questions.length} questions across five research frameworks.
              Answer honestly — there are no right or wrong answers.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="px-8 py-4 bg-coral text-white font-semibold rounded-xl text-lg hover:bg-coral-light transition-colors"
            >
              Begin
            </button>
            <p className="mt-6 text-xs text-slate-mid max-w-xs mx-auto">
              Your answers are processed locally. We don&apos;t store personal data without your consent.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-navy-light">
        <div
          className="h-1 bg-coral transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          className={`text-sm flex items-center gap-1 transition-colors
            ${
              currentIndex === 0
                ? "text-slate-mid/30 cursor-not-allowed"
                : "text-slate-light hover:text-white"
            }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
        <span className="text-sm text-slate-mid">
          {currentIndex + 1} of {questions.length}
        </span>
        <Link href="/" className="text-sm text-slate-mid hover:text-white transition-colors">
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
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
            >
              {/* Framework badge */}
              <div className="mb-4">
                <span className="text-xs font-medium text-coral/70 uppercase tracking-wider">
                  {currentQuestion.framework.replace(/_/g, " ")}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                {currentQuestion.text}
              </h2>
              {currentQuestion.subtext && (
                <p className="mt-2 text-slate-light text-sm">
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-6 py-6">
        <div className="max-w-xl mx-auto flex justify-end">
          <button
            onClick={goNext}
            disabled={!hasAnswer}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
              ${
                hasAnswer
                  ? "bg-coral text-white hover:bg-coral-light"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
          >
            {currentIndex === questions.length - 1
              ? "Submit"
              : "Continue"}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
