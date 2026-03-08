import {
  Question,
  QuestionV2,
  AssessmentScores,
  GottmanScores,
  AttachmentScores,
  BigFiveScores,
} from "./types";

// ---------------------------------------------------------------------------
// Legacy scoring (backward compat — uses Question[])
// ---------------------------------------------------------------------------

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

  const ranked = [...languages].sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );
  return { ranked };
}

// ---------------------------------------------------------------------------
// V2 weighted scoring (uses QuestionV2[])
// ---------------------------------------------------------------------------

/**
 * Weighted score: computes a weighted average of answered questions,
 * handling reverse scoring and normalizing to [0, maxVal].
 */
function weightedScore(
  answers: Record<string, number | string>,
  questions: QuestionV2[],
  maxVal: number
): number {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const q of questions) {
    const ans = answers[q.id];
    if (ans !== undefined && typeof ans === "number") {
      const score = q.scoring.reverse_scored ? 8 - ans : ans; // reverse for 1-7 scale
      weightedSum += score * q.scoring.weight;
      totalWeight += q.scoring.weight;
    }
  }
  if (totalWeight === 0) return 0;
  return Math.min(maxVal, (weightedSum / totalWeight / 7) * maxVal); // normalize from 1-7 to 0-maxVal
}

/**
 * Compute a real-time score for a single dimension.
 * Useful for adaptive branching (deciding whether to show follow-ups).
 * Returns a value normalized to a 1-7 scale for trigger comparison.
 */
export function computeRealtimeScore(
  answers: Record<string, number | string>,
  questions: QuestionV2[],
  dimension: string
): number {
  const dimQuestions = questions.filter(
    (q) => q.scoring.dimension === dimension
  );
  return weightedScore(answers, dimQuestions, 7); // normalized to 7 for trigger comparison
}

/**
 * V2 scoring engine using weighted scores.
 * Takes raw answers and QuestionV2[], computes dimension scores.
 */
export function computeScoresV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
): AssessmentScores {
  const gottman = computeGottmanScoresV2(answers, questions);
  const attachment = computeAttachmentScoresV2(answers, questions);
  const bigFive = computeBigFiveScoresV2(answers, questions);
  const csiTotal = computeCSIScoreV2(answers, questions);
  const loveLanguages = computeLoveLanguageRankingV2(answers, questions);

  return {
    gottman,
    attachment,
    big_five: bigFive,
    csi_total: csiTotal,
    love_languages: loveLanguages,
  };
}

function computeGottmanScoresV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
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
        (q.framework === "gottman_horsemen" ||
          q.framework === "gottman_srh" ||
          q.framework === "gottman_positive") &&
        q.scoring.dimension === dim
    );
    result[dim] = weightedScore(answers, qs, 10);
  }

  return result as unknown as GottmanScores;
}

function computeAttachmentScoresV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
): AttachmentScores {
  const anxQs = questions.filter(
    (q) => q.framework === "attachment" && q.scoring.dimension === "anxiety"
  );
  const avoQs = questions.filter(
    (q) => q.framework === "attachment" && q.scoring.dimension === "avoidance"
  );

  return {
    anxiety: weightedScore(answers, anxQs, 7),
    avoidance: weightedScore(answers, avoQs, 7),
  };
}

function computeBigFiveScoresV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
): BigFiveScores {
  const dims: (keyof BigFiveScores)[] = [
    "neuroticism",
    "conscientiousness",
    "agreeableness",
  ];
  const result: Record<string, number> = {};

  for (const dim of dims) {
    const qs = questions.filter(
      (q) => q.framework === "big_five" && q.scoring.dimension === dim
    );
    result[dim] = weightedScore(answers, qs, 5);
  }

  return result as unknown as BigFiveScores;
}

function computeCSIScoreV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
): number | undefined {
  const qs = questions.filter((q) => q.framework === "csi");
  if (qs.length === 0) return undefined;
  return weightedScore(answers, qs, 21);
}

function computeLoveLanguageRankingV2(
  answers: Record<string, number | string>,
  questions: QuestionV2[]
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
      (q) =>
        q.framework === "love_languages" && q.scoring.dimension === lang
    );
    scores[lang] = weightedScore(answers, qs, 10);
  }

  const ranked = [...languages].sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );
  return { ranked };
}
