import {
  Question,
  AssessmentScores,
  GottmanScores,
  AttachmentScores,
  BigFiveScores,
} from "./types";

/**
 * Client-side scoring engine.
 * Takes raw answers and the question bank, computes dimension scores.
 */
export function computeScores(
  answers: Record<string, number | string>,
  questions: Question[]
): AssessmentScores {
  const gottman = computeGottmanScores(answers, questions);
  const attachment = computeAttachmentScores(answers, questions);
  const bigFive = computeBigFiveScores(answers, questions);
  const csiTotal = computeCSIScore(answers, questions);
  const loveLanguages = computeLoveLanguageRanking(answers, questions);

  return {
    gottman,
    attachment,
    big_five: bigFive,
    csi_total: csiTotal,
    love_languages: loveLanguages,
  };
}

function getQuestionsForDimensions(
  questions: Question[],
  framework: string,
  dimensions: string[]
): Question[] {
  return questions.filter(
    (q) => q.framework === framework && dimensions.includes(q.dimension)
  );
}

function averageScore(
  answers: Record<string, number | string>,
  qs: Question[],
  maxVal: number
): number {
  if (qs.length === 0) return 0;
  let total = 0;
  let count = 0;
  for (const q of qs) {
    const ans = answers[q.id];
    if (ans !== undefined) {
      total += typeof ans === "number" ? ans : 0;
      count++;
    }
  }
  if (count === 0) return 0;
  return Math.min(maxVal, (total / count / 5) * maxVal);
}

function computeGottmanScores(
  answers: Record<string, number | string>,
  questions: Question[]
): GottmanScores {
  const dims: (keyof GottmanScores)[] = [
    "criticism",
    "contempt",
    "defensiveness",
    "stonewalling",
    "love_maps",
    "fondness",
    "turning_toward",
  ];

  const result: Record<string, number> = {};
  for (const dim of dims) {
    const qs = questions.filter(
      (q) =>
        (q.framework === "gottman_horsemen" || q.framework === "gottman_srh") &&
        q.dimension === dim
    );
    result[dim] = averageScore(answers, qs, 10);
  }

  return result as unknown as GottmanScores;
}

function computeAttachmentScores(
  answers: Record<string, number | string>,
  questions: Question[]
): AttachmentScores {
  const anxQs = getQuestionsForDimensions(questions, "attachment", ["anxiety"]);
  const avoQs = getQuestionsForDimensions(questions, "attachment", [
    "avoidance",
  ]);

  return {
    anxiety: averageScore(answers, anxQs, 7),
    avoidance: averageScore(answers, avoQs, 7),
  };
}

function computeBigFiveScores(
  answers: Record<string, number | string>,
  questions: Question[]
): BigFiveScores {
  const dims: (keyof BigFiveScores)[] = [
    "neuroticism",
    "conscientiousness",
    "agreeableness",
  ];
  const result: Record<string, number> = {};

  for (const dim of dims) {
    const qs = getQuestionsForDimensions(questions, "big_five", [dim]);
    result[dim] = averageScore(answers, qs, 5);
  }

  return result as unknown as BigFiveScores;
}

function computeCSIScore(
  answers: Record<string, number | string>,
  questions: Question[]
): number | undefined {
  const qs = questions.filter((q) => q.framework === "csi");
  if (qs.length === 0) return undefined;
  return averageScore(answers, qs, 21);
}

function computeLoveLanguageRanking(
  answers: Record<string, number | string>,
  questions: Question[]
): { ranked: string[] } {
  const languages = [
    "words_of_affirmation",
    "quality_time",
    "physical_touch",
    "acts_of_service",
    "gifts",
  ];

  const scores: Record<string, number> = {};
  for (const lang of languages) {
    const qs = questions.filter(
      (q) => q.framework === "love_languages" && q.dimension === lang
    );
    scores[lang] = averageScore(answers, qs, 10);
  }

  const ranked = languages.sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  return { ranked };
}
