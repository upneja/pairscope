import type {
  Question,
  QuestionV2,
  Framework,
  Dimension,
  QuestionFormat,
  ScenarioOption,
  ForcedChoiceOption,
  AssessmentMode,
  TriggerCondition,
} from "@/lib/types";
import questionBankV2 from "./question_bank_v2.json";

// ---------------------------------------------------------------------------
// Raw JSON shapes from question_bank_v2.json
// ---------------------------------------------------------------------------

interface RawForcedChoice {
  id: string;
  text: string;
  score: number;
  dimension: string;
}

interface RawOption {
  id: string;
  text: string;
  score: number;
  dimension: string;
}

interface RawScoring {
  dimension: string;
  weight: number;
  reverse_scored: boolean;
}

interface RawTriggerCondition {
  dimension: string;
  operator: string;
  threshold: number;
}

interface RawV2Question {
  id: string;
  framework: string;
  dimension: string;
  format: string;
  depth: string;
  assessment_length: string;
  text_mode_a: string | null;
  text_mode_b: string | null;
  subtext: string | null;
  likert_labels: { low: string; high: string } | null;
  options: RawOption[] | null;
  forced_choices: RawForcedChoice[] | null;
  scoring: RawScoring;
  source_instrument: string;
  text_prompt: string | null;
  sequence_order_a: number | null;
  sequence_order_b: number | null;
  trigger_condition: RawTriggerCondition | null;
  follow_up_for: string | null;
}

// ---------------------------------------------------------------------------
// Dimension mapping: v2 dimension names → frontend Dimension type
// ---------------------------------------------------------------------------

const DIMENSION_MAP: Record<string, Dimension> = {
  criticism: "criticism",
  contempt: "contempt",
  defensiveness: "defensiveness",
  stonewalling: "stonewalling",
  love_maps: "love_maps",
  fondness_admiration: "fondness",
  fondness: "fondness",
  turning_toward: "turning_toward",
  positive_sentiment: "positive_sentiment",
  conflict_management: "conflict_management",
  shared_meaning: "shared_meaning",
  anxiety: "anxiety",
  avoidance: "avoidance",
  neuroticism: "neuroticism",
  conscientiousness: "conscientiousness",
  agreeableness: "agreeableness",
  satisfaction: "satisfaction",
  relationship_satisfaction: "satisfaction",
  love_languages: "primary_love_language",
  primary_love_language: "primary_love_language",
  giving_love_language: "giving_love_language",
  words_of_affirmation: "words_of_affirmation",
  quality_time: "quality_time",
  physical_touch: "physical_touch",
  acts_of_service: "acts_of_service",
  gifts: "gifts",
};

function mapDimension(raw: string): Dimension {
  return DIMENSION_MAP[raw] ?? (raw as Dimension);
}

// ---------------------------------------------------------------------------
// Map assessment_length from v2 JSON to QuestionV2 format
// ---------------------------------------------------------------------------

function mapAssessmentLength(
  raw: string
): "quick" | "deep" | "both" {
  if (raw === "deep") return "deep";
  if (raw === "quick") return "quick";
  return "both"; // "both", "mode_a", "mode_b" all map to "both" for depth purposes
}

// ---------------------------------------------------------------------------
// Determine which modes a question supports based on text availability
// ---------------------------------------------------------------------------

function determineModes(q: RawV2Question): AssessmentMode[] {
  const modes: AssessmentMode[] = [];
  if (q.text_mode_a !== null) modes.push("relationship");
  if (q.text_mode_b !== null) modes.push("single");
  // If neither text is available (shouldn't happen), default to both
  if (modes.length === 0) return ["relationship", "single"];
  return modes;
}

// ---------------------------------------------------------------------------
// Convert raw v2 question → QuestionV2
// ---------------------------------------------------------------------------

function convertToV2(
  raw: RawV2Question,
  mode: "relationship" | "single"
): QuestionV2 {
  const text =
    mode === "relationship"
      ? raw.text_mode_a ?? raw.text_mode_b ?? ""
      : raw.text_mode_b ?? raw.text_mode_a ?? "";

  const q: QuestionV2 = {
    id: raw.id,
    framework: raw.framework,
    dimension: raw.dimension,
    format: raw.format as QuestionFormat,
    depth: raw.depth as "core" | "follow_up" | "pre_knowledge",
    assessmentLength: mapAssessmentLength(raw.assessment_length),
    text,
    scoring: {
      dimension: raw.scoring.dimension,
      weight: raw.scoring.weight,
      reverse_scored: raw.scoring.reverse_scored,
    },
    modes: determineModes(raw),
  };

  if (raw.subtext) q.subtext = raw.subtext;
  if (raw.source_instrument) q.sourceInstrument = raw.source_instrument;
  if (raw.text_prompt !== null && raw.text_prompt !== undefined)
    q.textPrompt = raw.text_prompt;
  if (raw.trigger_condition) {
    q.triggerCondition = raw.trigger_condition as TriggerCondition;
  }
  if (raw.follow_up_for) q.followUpFor = raw.follow_up_for;

  // Map options (scenario format)
  if (raw.options && raw.format === "scenario") {
    q.options = raw.options.map(
      (opt): ScenarioOption => ({
        id: opt.id,
        text: opt.text,
        score: opt.score,
      })
    );
  }

  // Map forced_choices
  if (raw.forced_choices && raw.format === "forced_choice") {
    q.forcedChoices = [
      { id: raw.forced_choices[0].id, text: raw.forced_choices[0].text, score: raw.forced_choices[0].score },
      { id: raw.forced_choices[1].id, text: raw.forced_choices[1].text, score: raw.forced_choices[1].score },
    ] as [ForcedChoiceOption, ForcedChoiceOption];
  }

  // Map likert labels
  if (raw.likert_labels && raw.format === "likert") {
    q.likertLabels = { low: raw.likert_labels.low, high: raw.likert_labels.high };
  }

  return q;
}

// ---------------------------------------------------------------------------
// Convert raw v2 question → legacy Question type (backward compat)
// ---------------------------------------------------------------------------

function convertToLegacy(
  raw: RawV2Question,
  mode: "relationship" | "single"
): Question {
  const text =
    mode === "relationship"
      ? raw.text_mode_a ?? raw.text_mode_b ?? ""
      : raw.text_mode_b ?? raw.text_mode_a ?? "";

  const q: Question = {
    id: raw.id,
    framework: raw.framework as Framework,
    dimension: mapDimension(raw.dimension),
    format: raw.format as QuestionFormat,
    text,
    modes: determineModes(raw),
  };

  if (raw.source_instrument) q.sourceInstrument = raw.source_instrument;

  // Map options (scenario format)
  if (raw.options && raw.format === "scenario") {
    q.options = raw.options.map(
      (opt): ScenarioOption => ({
        id: opt.id,
        text: opt.text,
        score: opt.score,
      })
    );
  }

  // Map forced_choices
  if (raw.forced_choices && raw.format === "forced_choice") {
    q.forcedChoices = [
      { id: raw.forced_choices[0].id, text: raw.forced_choices[0].text, score: raw.forced_choices[0].score },
      { id: raw.forced_choices[1].id, text: raw.forced_choices[1].text, score: raw.forced_choices[1].score },
    ] as [ForcedChoiceOption, ForcedChoiceOption];
  }

  // Map likert labels
  if (raw.likert_labels && raw.format === "likert") {
    q.likertLabels = { low: raw.likert_labels.low, high: raw.likert_labels.high };
  }

  return q;
}

// ---------------------------------------------------------------------------
// Load & sort questions from v2 JSON
// ---------------------------------------------------------------------------

const coreRaw = questionBankV2.core_questions as RawV2Question[];
const followUpRaw = questionBankV2.follow_up_questions as RawV2Question[];

// --- Build legacy exports (backward compat) ---

interface OrderedQuestion {
  question: Question;
  order: number;
}

// Relationship (mode A) questions — core only for legacy compat
const relationshipOrdered: OrderedQuestion[] = coreRaw
  .filter((q) => q.text_mode_a !== null)
  .map((q) => ({
    question: convertToLegacy(q, "relationship"),
    order: q.sequence_order_a ?? 999,
  }));

relationshipOrdered.sort((a, b) => a.order - b.order);

// Single (mode B) questions — core only for legacy compat
const singleOrdered: OrderedQuestion[] = coreRaw
  .filter((q) => q.text_mode_b !== null)
  .map((q) => ({
    question: convertToLegacy(q, "single"),
    order: q.sequence_order_b ?? 999,
  }));

singleOrdered.sort((a, b) => a.order - b.order);

// --- Build V2 exports ---

// For V2 we default to relationship mode text; consumers can pick mode at runtime
const coreV2Sorted = [...coreRaw].sort(
  (a, b) => (a.sequence_order_a ?? 999) - (b.sequence_order_a ?? 999)
);

const followUpV2Sorted = [...followUpRaw]; // follow-ups don't have fixed sequence order

// ---------------------------------------------------------------------------
// Exports — legacy
// ---------------------------------------------------------------------------

export const relationshipQuestions: Question[] = relationshipOrdered.map(
  (o) => o.question
);

export const singleQuestions: Question[] = singleOrdered.map(
  (o) => o.question
);

// ---------------------------------------------------------------------------
// Exports — V2
// ---------------------------------------------------------------------------

export const coreQuestionsV2: QuestionV2[] = coreV2Sorted.map((q) =>
  convertToV2(q, "relationship")
);

export const followUpQuestionsV2: QuestionV2[] = followUpV2Sorted.map((q) =>
  convertToV2(q, "relationship")
);

/**
 * Returns follow-up questions whose trigger_condition matches the current
 * dimension score. Used for adaptive branching in the deep assessment.
 */
export function getFollowUpsForDimension(
  dimension: string,
  currentScore: number
): QuestionV2[] {
  return followUpQuestionsV2.filter((q) => {
    if (!q.triggerCondition) return false;
    if (q.triggerCondition.dimension !== dimension) return false;

    const { operator, threshold } = q.triggerCondition;
    switch (operator) {
      case ">":
        return currentScore > threshold;
      case "<":
        return currentScore < threshold;
      case ">=":
        return currentScore >= threshold;
      case "<=":
        return currentScore <= threshold;
      default:
        return false;
    }
  });
}
