// ============================================================
// Pairscope — TypeScript Interfaces
// ============================================================

// --- Question Bank Types ---

export type QuestionFormat = "likert" | "scenario" | "forced_choice";
export type AssessmentMode = "relationship" | "single";

export type Framework =
  | "gottman_horsemen"
  | "gottman_srh"
  | "attachment"
  | "big_five"
  | "csi"
  | "love_languages";

export type Dimension =
  | "criticism"
  | "contempt"
  | "defensiveness"
  | "stonewalling"
  | "love_maps"
  | "fondness"
  | "turning_toward"
  | "anxiety"
  | "avoidance"
  | "neuroticism"
  | "conscientiousness"
  | "agreeableness"
  | "satisfaction"
  | "words_of_affirmation"
  | "quality_time"
  | "physical_touch"
  | "acts_of_service"
  | "gifts";

export interface LikertOption {
  value: number;
  label?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  score: number;
}

export interface ForcedChoiceOption {
  id: string;
  text: string;
  score: number;
}

export interface Question {
  id: string;
  framework: Framework;
  dimension: Dimension;
  format: QuestionFormat;
  text: string;
  subtext?: string;
  options?: ScenarioOption[];
  forcedChoices?: [ForcedChoiceOption, ForcedChoiceOption];
  likertLabels?: { low: string; high: string };
  sourceInstrument?: string;
  modes: AssessmentMode[];
}

export interface QuestionBank {
  mode_a: Question[];
  mode_b: Question[];
}

// --- Scoring Types ---

export interface GottmanScores {
  criticism: number;
  contempt: number;
  defensiveness: number;
  stonewalling: number;
  love_maps: number;
  fondness: number;
  turning_toward: number;
}

export interface AttachmentScores {
  anxiety: number;
  avoidance: number;
}

export interface BigFiveScores {
  neuroticism: number;
  conscientiousness: number;
  agreeableness: number;
}

export interface LoveLanguageRanking {
  ranked: string[];
}

export interface AssessmentScores {
  gottman: GottmanScores;
  attachment: AttachmentScores;
  big_five: BigFiveScores;
  csi_total?: number;
  love_languages: LoveLanguageRanking;
}

export interface AssessmentSubmission {
  mode: AssessmentMode;
  scores: AssessmentScores;
  raw_answers: Record<string, number | string>;
}

// --- Report Types ---

export type VisualizationType =
  | "radar"
  | "spectrum"
  | "meter"
  | "icon_grid"
  | "bar_chart";

export interface Visualization {
  type: VisualizationType;
  data: Record<string, number | string | number[]>;
  labels?: string[];
}

export interface ConversationScript {
  situation: string;
  script: string;
  explanation: string;
}

export interface ReportSection {
  id: string;
  title: string;
  subtitle?: string;
  narrative: string;
  visualization?: Visualization;
  actionItems?: string[];
  conversationScripts?: ConversationScript[];
  shareText?: string;
}

export interface Report {
  id: string;
  mode: AssessmentMode;
  createdAt: string;
  sections: ReportSection[];
  overallSummary: string;
  disclaimerText: string;
}

// --- UI State Types ---

export interface AssessmentState {
  mode: AssessmentMode;
  currentIndex: number;
  answers: Record<string, number | string>;
  startedAt: string;
}
