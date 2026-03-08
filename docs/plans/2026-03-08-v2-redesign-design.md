# Pairscope V2 Redesign — Design Document

**Date:** 2026-03-08
**Status:** Approved

## Problems

1. **UX broken**: selected states invisible on quiz questions, text contrast failures on dark backgrounds, wrong date on reports
2. **Theme inconsistent**: mix of dark/light sections with broken text contrast
3. **Assessment quality**: questions not comprehensive enough, naive scoring (simple averages)
4. **Report quality**: AI makes up specifics not supported by answers (a), feels generic/archetypal rather than specific (c)
5. **No flexibility**: users can't express answers outside fixed buckets
6. **No pre-knowledge capture**: users who already know their attachment style or love language can't provide that
7. **One-size-fits-all**: no option for quick vs deep assessment

## Design

### 1. Light Theme + UX Fixes

- All pages: light/cream backgrounds, dark text as default
- Any dark sections (stats strip, science frameworks) use light text — enforced
- Assessment and processing pages go light (or if dark, all text is light)
- Selected states made unmistakable:
  - Likert: filled terracotta + white text when selected
  - Scenario/forced-choice: terracotta left border + cream-dark fill + subtle scale(1.02)
- Date fix: use actual completion timestamp from sessionStorage, not render-time `new Date()`
- WCAG AA contrast audit on every text/background combination (4.5:1 minimum)

### 2. Assessment Restructure

**New flow:**
1. Mode select: "Are you in a relationship?" (unchanged)
2. **Depth select (new)**: "Quick Insights" (~15 min, ~30 questions, no branching) vs "Deep Dive" (~25 min, adaptive follow-ups, text boxes, 36-50 questions)
3. **Pre-knowledge capture (new)**: Before quiz starts, optional questions:
   - "Do you know your attachment style?" → dropdown (Secure / Anxious / Avoidant / Fearful-Avoidant / Not sure)
   - "Do you know your love language?" → dropdown (5 options + Not sure)
   - "Have you done couples therapy or relationship coaching?" → Yes / No
   - All default to "Not sure". Data enriches report narrative, does NOT skip questions.

**Quick Insights mode:**
- Fixed ~30 questions covering all 5 frameworks
- No branching, no text boxes
- Faster scoring, slightly lighter report

**Deep Dive mode:**
- Same ~30 core questions
- After each framework section completes, real-time scoring checks thresholds
- If dimension scores above trigger threshold (e.g., stonewalling > 5/7), inject 2-3 pre-authored follow-up questions
- Optional "Tell us more" text box after scenario questions
- Total: 36-50 questions depending on branching
- All follow-up questions are pre-authored in the question bank with `trigger_condition` field

### 3. Question Quality (Research Agent)

Kick off a research agent to rebuild the question bank:

- Deep engagement with actual ECR-R, BFI-K, CSI-4, Gottman FHQ items and their psychometric properties
- Better scenario questions that discriminate between adjacent constructs (defensiveness vs stonewalling)
- Adaptive follow-up question sets with explicit trigger conditions
- Scoring rubrics with weighted scoring (not simple averages), dimension-specific normalization
- "Tell us more" text prompts crafted to elicit useful context
- Pre-knowledge validation questions

**New `question_bank_v2.json` schema additions:**
- `depth`: "core" | "follow_up"
- `trigger_condition`: `{ dimension: string, operator: ">"|"<", threshold: number }` (follow-ups only)
- `follow_up_for`: question ID this follows up on (follow-ups only)
- `text_prompt`: optional string shown as a text box after the question (Deep Dive only)
- `assessment_length`: "quick" | "deep" | "both"

**Deliverables:**
- `question_bank_v2.json`
- `scoring_rubrics_v2.md` with weighted scoring
- `instrument_mapping_v2.md` with tighter citations

### 4. Report Generation Improvements

**System prompt changes:**
- Raw answers piped in explicitly (scenario choices + free-text responses), not just aggregate scores
- Hard constraint: "For each claim about the user's pattern, reference the specific question and answer that supports it. Do not infer patterns not directly evidenced."
- Pre-knowledge integration: if user self-reported attachment style, acknowledge and validate/complicate based on scores
- Tone recalibration: "Match language intensity to score magnitude. A 4/7 is 'a moderate tendency that shows up sometimes,' not 'a significant pattern.'"
- Free-text integration: if user wrote something in a text box, reference it directly in the report
- Quick vs Deep report variants: Quick gets a more concise report, Deep gets the full narrative treatment

### 5. Scoring Engine Upgrade

Replace the current `averageScore` approach with:
- Per-dimension weighted scoring based on question discriminating power
- Dimension-specific normalization (attachment uses 1-7 scale, Gottman uses 0-10, etc.)
- Real-time scoring during assessment (for adaptive branching in Deep Dive)
- Pre-knowledge data passed alongside scores to API

## Execution Order

| # | Workstream | Depends On | Parallel? |
|---|-----------|------------|-----------|
| 1 | UX fixes (light theme, selected states, contrast, date) | Nothing | Yes — run immediately |
| 2 | Research agent (question bank v2, scoring v2) | Nothing | Yes — run immediately |
| 3 | Assessment restructure (depth select, pre-knowledge, branching, text boxes) | #2 | After #2 |
| 4 | Report prompt overhaul | #2 | After #2 |
| 5 | Integration + deploy | #1, #3, #4 | After all |

## Out of Scope

- AI-generated follow-up questions (unpredictable — all questions are pre-authored)
- Mid-assessment feedback (would bias remaining answers)
- Partner comparison features
- Saving/accounts beyond existing email capture
