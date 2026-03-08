import type {
  Question,
  Framework,
  Dimension,
  QuestionFormat,
  ScenarioOption,
  ForcedChoiceOption,
  LikertOption,
  AssessmentMode,
} from "@/lib/types";
import questionBank from "./question_bank.json";

// ---------------------------------------------------------------------------
// Raw JSON shapes from Agent 1's question bank
// ---------------------------------------------------------------------------

interface RawOption {
  value: string | number;
  label: string;
}

interface RawScoring {
  dimension: string;
  mapping: Record<string, number | string> | "direct";
  score_range?: [number, number];
  score_type?: string;
  interpretation?: string;
}

interface RawSharedQuestion {
  id: string;
  framework: string;
  dimension: string;
  format: string;
  text_mode_a: string;
  text_mode_b: string;
  options: RawOption[];
  scoring: RawScoring;
  source_instrument: string;
  sequence_order_a: number;
  sequence_order_b: number;
}

interface RawModeQuestion {
  id: string;
  framework: string;
  dimension: string;
  format: string;
  text: string;
  options: RawOption[];
  scoring: RawScoring;
  source_instrument: string;
  sequence_order: number;
}

// ---------------------------------------------------------------------------
// Dimension mapping: Agent 1 dimension names → frontend Dimension type
// ---------------------------------------------------------------------------

const DIMENSION_MAP: Record<string, Dimension> = {
  criticism: "criticism",
  contempt: "contempt",
  defensiveness: "defensiveness",
  stonewalling: "stonewalling",
  love_maps: "love_maps",
  fondness_admiration: "fondness",
  turning_toward: "turning_toward",
  positive_sentiment: "positive_sentiment",
  conflict_management: "conflict_management",
  shared_meaning: "shared_meaning",
  anxiety: "anxiety",
  avoidance: "avoidance",
  neuroticism: "neuroticism",
  conscientiousness: "conscientiousness",
  agreeableness: "agreeableness",
  relationship_satisfaction: "satisfaction",
  primary_love_language: "primary_love_language",
  giving_love_language: "giving_love_language",
};

function mapDimension(raw: string): Dimension {
  return DIMENSION_MAP[raw] ?? (raw as Dimension);
}

// ---------------------------------------------------------------------------
// Score resolution: turn Agent 1's mapping + option value into a number
// ---------------------------------------------------------------------------

function resolveScore(
  option: RawOption,
  scoring: RawScoring
): number {
  if (scoring.mapping === "direct") {
    // For direct mapping, the value IS the score
    return typeof option.value === "number" ? option.value : 0;
  }

  const key = String(option.value);
  const mapped = scoring.mapping[key];

  if (typeof mapped === "number") {
    return mapped;
  }

  // Categorical love-language mappings (e.g. "a" → "words_of_affirmation").
  // We assign a flat score of 1 so the tally logic in scoring can count picks.
  if (typeof mapped === "string") {
    return 1;
  }

  return 0;
}

// ---------------------------------------------------------------------------
// Convert raw options → frontend option types based on question format
// ---------------------------------------------------------------------------

function buildScenarioOptions(
  options: RawOption[],
  scoring: RawScoring,
  questionId: string
): ScenarioOption[] {
  return options.map((opt, idx) => ({
    id: `${questionId}${String.fromCharCode(97 + idx)}`, // a, b, c, d …
    text: opt.label,
    score: resolveScore(opt, scoring),
  }));
}

function buildForcedChoices(
  options: RawOption[],
  scoring: RawScoring,
  questionId: string
): [ForcedChoiceOption, ForcedChoiceOption] {
  const mapped = options.map((opt, idx) => ({
    id: `${questionId}${String.fromCharCode(97 + idx)}`,
    text: opt.label,
    score: resolveScore(opt, scoring),
  }));
  return [mapped[0], mapped[1]];
}

function buildLikertLabels(
  options: RawOption[]
): { low: string; high: string } {
  if (options.length === 0) return { low: "", high: "" };
  return {
    low: options[0].label,
    high: options[options.length - 1].label,
  };
}

// ---------------------------------------------------------------------------
// Generic converter: raw question data → frontend Question
// ---------------------------------------------------------------------------

function convertQuestion(
  id: string,
  framework: string,
  dimension: string,
  format: string,
  text: string,
  options: RawOption[],
  scoring: RawScoring,
  sourceInstrument: string,
  modes: AssessmentMode[]
): Question {
  const q: Question = {
    id,
    framework: framework as Framework,
    dimension: mapDimension(dimension),
    format: format as QuestionFormat,
    text,
    modes,
    sourceInstrument: sourceInstrument,
  };

  switch (format) {
    case "scenario":
      q.options = buildScenarioOptions(options, scoring, id);
      break;
    case "forced_choice":
      q.forcedChoices = buildForcedChoices(options, scoring, id);
      break;
    case "likert":
      q.likertLabels = buildLikertLabels(options);
      break;
  }

  return q;
}

// ---------------------------------------------------------------------------
// Process shared questions → one entry per mode
// ---------------------------------------------------------------------------

interface OrderedQuestion {
  question: Question;
  order: number;
}

const sharedQuestions = questionBank.shared_questions as RawSharedQuestion[];
const modeAOnlyQuestions = questionBank.mode_a_only
  .questions as RawModeQuestion[];
const modeBOnlyQuestions = questionBank.mode_b_only
  .questions as RawModeQuestion[];

// --- Build relationship (mode A) list ---

const relationshipOrdered: OrderedQuestion[] = [];

for (const sq of sharedQuestions) {
  relationshipOrdered.push({
    question: convertQuestion(
      sq.id,
      sq.framework,
      sq.dimension,
      sq.format,
      sq.text_mode_a,
      sq.options,
      sq.scoring,
      sq.source_instrument,
      ["relationship", "single"]
    ),
    order: sq.sequence_order_a,
  });
}

for (const mq of modeAOnlyQuestions) {
  relationshipOrdered.push({
    question: convertQuestion(
      mq.id,
      mq.framework,
      mq.dimension,
      mq.format,
      mq.text,
      mq.options,
      mq.scoring,
      mq.source_instrument,
      ["relationship"]
    ),
    order: mq.sequence_order,
  });
}

relationshipOrdered.sort((a, b) => a.order - b.order);

// --- Build single (mode B) list ---

const singleOrdered: OrderedQuestion[] = [];

for (const sq of sharedQuestions) {
  singleOrdered.push({
    question: convertQuestion(
      sq.id,
      sq.framework,
      sq.dimension,
      sq.format,
      sq.text_mode_b,
      sq.options,
      sq.scoring,
      sq.source_instrument,
      ["relationship", "single"]
    ),
    order: sq.sequence_order_b,
  });
}

for (const mq of modeBOnlyQuestions) {
  singleOrdered.push({
    question: convertQuestion(
      mq.id,
      mq.framework,
      mq.dimension,
      mq.format,
      mq.text,
      mq.options,
      mq.scoring,
      mq.source_instrument,
      ["single"]
    ),
    order: mq.sequence_order,
  });
}

singleOrdered.sort((a, b) => a.order - b.order);

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const relationshipQuestions: Question[] = relationshipOrdered.map(
  (o) => o.question
);

export const singleQuestions: Question[] = singleOrdered.map(
  (o) => o.question
);
