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
  question: Question;
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
  question: Question;
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
              About {assessmentMode === "relationship" ? "10" : "8"} minutes
            </p>
            <p className="text-text-muted text-sm mb-10">
              {questions.length} questions across five research frameworks
            </p>

            <button
              onClick={() => setShowIntro(false)}
              className="px-10 py-4 bg-terra text-white font-medium rounded-full text-lg hover:bg-terra-light transition-colors duration-700"
            >
              Begin
            </button>

            <p className="mt-10 text-xs text-text-tertiary max-w-xs mx-auto leading-relaxed">
              Your answers are processed locally. We don&apos;t store personal data without your consent.
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
