# Pairscope V2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix UX issues (light theme, selected states, contrast), rebuild question bank with deeper research, add adaptive assessment (Quick/Deep modes), pre-knowledge capture, optional text boxes, and improve report accuracy.

**Architecture:** Two parallel workstreams — (1) immediate UX fixes deployed first, (2) research agent rebuilds question bank v2, then assessment restructure and report overhaul build on top of it. All pages become light theme. Assessment flow gains depth selection, pre-knowledge capture, adaptive branching, and optional text inputs. API route sends raw answers + free-text + pre-knowledge to Claude for more grounded reports.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts, Claude API (Sonnet)

---

## WORKSTREAM A: UX Fixes (no dependencies, deploy immediately)

### Task 1: Light Theme — Assessment & Processing Pages

**Files:**
- Modify: `app/src/app/assess/page.tsx`
- Modify: `app/src/app/assess/[mode]/page.tsx`
- Modify: `app/src/app/assess/processing/page.tsx`

**Step 1: Update mode selection page to light theme**

In `app/src/app/assess/page.tsx`:
- Change outer div from `bg-warm-dark` to `bg-cream`
- Change all `text-text-on-dark` to `text-warm-black`
- Change all `text-text-on-dark-muted` to `text-text-secondary`
- Change card backgrounds from `bg-card-dark` to `bg-card` with `border-card-border`
- Change card borders from `border-card-dark-border` to `border-card-border`
- Change hover shadows to use warm-black/5 instead of terra/10
- Pairscope logo: `text-warm-black` instead of `text-text-on-dark`

**Step 2: Update assessment flow to light theme**

In `app/src/app/assess/[mode]/page.tsx`:
- Intro screen: `bg-cream` instead of `bg-warm-dark`. Title in `text-warm-black`. Muted text in `text-text-secondary`. Decorative line stays terra.
- Assessment flow: `bg-cream` background. Progress bar background: `bg-cream-dark`. Question text: `text-warm-black`. Framework badge: stays `text-terra`.
- Back/counter/exit text: `text-text-secondary` instead of `text-on-dark-muted`.
- Likert circles: unselected = `border-card-border text-text-secondary`, selected = `bg-terra text-white scale-110`. Make selected state unmistakable.
- Scenario cards: `bg-card border-card-border`, selected = `bg-terra/10 border-terra border-l-4` with `scale-[1.02]`. Text: `text-warm-black`.
- Forced choice cards: same as scenario cards.
- Continue button: active = `bg-terra text-white`, disabled = `bg-cream-dark text-text-muted`.

**Step 3: Update processing page — keep dark (it's a transition moment) but fix text**

In `app/src/app/assess/processing/page.tsx`:
- Keep `bg-warm-dark` (this is an intentional mood moment between quiz and report).
- Ensure ALL text uses `text-text-on-dark` or `text-text-on-dark-muted` — audit every text element.
- Error state: ensure all error text is `text-text-on-dark` / `text-text-on-dark-muted`.

**Step 4: Build and verify**

Run: `cd /Users/upneja/Projects/pairscope/app && npm run build`
Expected: clean build, no errors.

**Step 5: Commit**

```bash
git add app/src/app/assess/ app/src/app/assess/[mode]/ app/src/app/assess/processing/
git commit -m "fix: light theme for assessment pages, fix text contrast"
```

---

### Task 2: Fix Selected States Visibility

**Files:**
- Modify: `app/src/app/assess/[mode]/page.tsx`

**Step 1: Fix LikertScale selected state**

In the `LikertScale` component, update the button className:
- Unselected: `border-2 border-card-border text-text-secondary bg-transparent hover:border-terra/40`
- Selected: `bg-terra border-2 border-terra text-white scale-110 shadow-md shadow-terra/20`
- Add a checkmark or filled circle inside when selected

**Step 2: Fix ScenarioChoice selected state**

In the `ScenarioChoice` component, update button className:
- Unselected: `bg-card border border-card-border text-warm-black hover:border-terra/40`
- Selected: `bg-terra/10 border-l-4 border-terra text-warm-black scale-[1.02] shadow-sm`

**Step 3: Fix ForcedChoice selected state**

Same pattern as ScenarioChoice:
- Unselected: `bg-card border border-card-border text-warm-black hover:border-terra/40`
- Selected: `bg-terra/10 border-l-4 border-terra text-warm-black scale-[1.02] shadow-sm`

**Step 4: Build and verify**

Run: `cd /Users/upneja/Projects/pairscope/app && npm run build`

**Step 5: Commit**

```bash
git add app/src/app/assess/[mode]/
git commit -m "fix: make selected states unmistakable on all question formats"
```

---

### Task 3: Fix Report Date

**Files:**
- Modify: `app/src/app/assess/processing/page.tsx`
- Modify: `app/src/app/report/[id]/page.tsx`
- Modify: `app/src/lib/placeholder-report.ts`

**Step 1: Store completion timestamp in sessionStorage**

In `processing/page.tsx`, when storing the report add the timestamp:
```typescript
const report = await response.json();
report.createdAt = new Date().toISOString(); // actual generation time
sessionStorage.setItem("pairscope_report", JSON.stringify(report));
```

**Step 2: Fix placeholder reports**

In `placeholder-report.ts`, change `createdAt: new Date().toISOString()` to a static date string: `createdAt: "2026-03-08T00:00:00.000Z"`. This prevents hydration mismatches and shows a real date.

**Step 3: Verify report page date rendering**

The report page at `report/[id]/page.tsx` already reads `report.createdAt` — confirm it formats correctly with `toLocaleDateString`. No change needed if the createdAt field is a valid ISO string.

**Step 4: Build and verify**

Run: `cd /Users/upneja/Projects/pairscope/app && npm run build`

**Step 5: Commit**

```bash
git add app/src/app/assess/processing/ app/src/app/report/ app/src/lib/placeholder-report.ts
git commit -m "fix: use actual timestamp for report date, fix placeholder hydration"
```

---

### Task 4: Deploy UX Fixes

**Step 1: Push and deploy**

```bash
git push
cd /Users/upneja/Projects/pairscope/app && vercel --prod --yes
vercel alias <deployment-url> pairscope.vercel.app
```

---

## WORKSTREAM B: Research Agent (no dependencies, run in parallel with A)

### Task 5: Kick Off Research Agent

**Files:**
- Create: `agents/agent1_research/output/question_bank_v2.json`
- Create: `agents/agent1_research/output/scoring_rubrics_v2.md`
- Create: `agents/agent1_research/output/instrument_mapping_v2.md`

**Step 1: Launch research agent**

Use the Agent tool to launch a research agent with this brief:

The agent must deeply research the actual validated instruments (ECR-R, BFI-K, CSI-4, Gottman FHQ) and produce a v2 question bank that includes:

1. **Core questions** (~30) covering all 5 frameworks — used in both Quick and Deep modes. Better discrimination between adjacent constructs (e.g., defensiveness vs stonewalling). Conversational tone preserved.

2. **Follow-up questions** (~20) with explicit `trigger_condition` fields. Example: `{ "dimension": "stonewalling", "operator": ">", "threshold": 5 }` — if the user's real-time score on stonewalling exceeds 5/7 after core questions, these get injected. 2-3 follow-ups per high-scoring dimension.

3. **Pre-knowledge questions** (3): attachment style dropdown, love language dropdown, therapy history yes/no. These have `depth: "pre_knowledge"` and are shown before the main quiz.

4. **Text prompts**: certain scenario questions get a `text_prompt` field with a carefully crafted follow-up like "Is there anything about this pattern you'd want your report to address?" — shown only in Deep Dive mode.

5. **New JSON schema** for each question:
```json
{
  "id": "c1",
  "framework": "gottman_horsemen",
  "dimension": "criticism",
  "format": "scenario",
  "depth": "core",
  "assessment_length": "both",
  "text_mode_a": "...",
  "text_mode_b": "...",
  "options": [...],
  "scoring": { "dimension": "criticism", "mapping": {...}, "weight": 1.0 },
  "source_instrument": "...",
  "sequence_order_a": 1,
  "sequence_order_b": 1,
  "trigger_condition": null,
  "follow_up_for": null,
  "text_prompt": null
}
```

6. **Weighted scoring rubrics** — not simple averages. Each question gets a `weight` field (0.5-2.0) based on its discriminating power. Scoring formula: weighted sum / total weight per dimension, then normalized to scale.

7. **Better instrument mapping** with specific item numbers from source instruments.

**Step 2: Validate output**

- Parse JSON, verify valid
- Count: core questions should be ~30, follow-ups ~20, pre-knowledge 3
- Verify all trigger_conditions reference valid dimensions
- Check that no more than 5 Likert questions in a row in recommended sequence
- Verify all 5 frameworks covered in core questions

**Step 3: Commit**

```bash
git add agents/agent1_research/output/
git commit -m "feat: question bank v2 with adaptive follow-ups, weighted scoring, pre-knowledge"
```

---

## WORKSTREAM C: Assessment Restructure (depends on Task 5)

### Task 6: Update Types

**Files:**
- Modify: `app/src/lib/types.ts`

**Step 1: Add new types**

Add to `types.ts`:
```typescript
export type AssessmentDepth = "quick" | "deep";

export interface PreKnowledge {
  attachmentStyle: "secure" | "anxious" | "avoidant" | "fearful_avoidant" | "not_sure";
  loveLanguage: "words_of_affirmation" | "quality_time" | "physical_touch" | "acts_of_service" | "gifts" | "not_sure";
  therapyHistory: boolean | null;
}

export interface TriggerCondition {
  dimension: string;
  operator: ">" | "<" | ">=" | "<=";
  threshold: number;
}

// Update Question interface to add:
// - depth: "core" | "follow_up" | "pre_knowledge"
// - assessmentLength: "quick" | "deep" | "both"
// - triggerCondition?: TriggerCondition
// - followUpFor?: string
// - textPrompt?: string

// Update AssessmentSubmission to add:
// - depth: AssessmentDepth
// - preKnowledge: PreKnowledge
// - freeTextResponses: Record<string, string>
```

**Step 2: Commit**

```bash
git add app/src/lib/types.ts
git commit -m "feat: add types for adaptive assessment, pre-knowledge, depth modes"
```

---

### Task 7: Build Depth Selection Screen

**Files:**
- Create: `app/src/app/assess/depth/page.tsx`

**Step 1: Create depth selection page**

New page at `/assess/depth?mode=relationship`. Two cards:
- **Quick Insights**: "~15 minutes. Core questions across all 5 frameworks. Great for a first look." — links to `/assess/pre-knowledge?mode=X&depth=quick`
- **Deep Dive**: "~25 minutes. Adaptive follow-ups, optional reflections, richer analysis." — links to `/assess/pre-knowledge?mode=X&depth=deep`

Light theme (bg-cream). Instrument Serif headings. Same card styling as mode selection but with terra accent on Quick and sage on Deep.

**Step 2: Update mode selection to link to depth selection**

In `app/src/app/assess/page.tsx`, change links from `/assess/relationship` and `/assess/single` to `/assess/depth?mode=relationship` and `/assess/depth?mode=single`.

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git add app/src/app/assess/
git commit -m "feat: add depth selection screen (Quick Insights vs Deep Dive)"
```

---

### Task 8: Build Pre-Knowledge Capture Screen

**Files:**
- Create: `app/src/app/assess/pre-knowledge/page.tsx`

**Step 1: Create pre-knowledge page**

New page at `/assess/pre-knowledge?mode=X&depth=X`. Shows:
- "Before we begin — what do you already know?" in Instrument Serif
- "All optional. This helps us personalize your report." in secondary text
- Three dropdowns/selections:
  1. "Do you know your attachment style?" → Secure / Anxious-Preoccupied / Dismissive-Avoidant / Fearful-Avoidant / Not sure
  2. "Do you know your primary love language?" → Words of Affirmation / Quality Time / Physical Touch / Acts of Service / Gifts / Not sure
  3. "Have you done couples therapy or relationship coaching?" → Yes / No / Prefer not to say
- "Continue" button stores pre-knowledge in sessionStorage and navigates to `/assess/[mode]?depth=X`
- "Skip" link also navigates with defaults (all "not_sure" / null)
- Light theme. Dropdowns styled with warm borders, terra focus state.

**Step 2: Build and verify**

**Step 3: Commit**

```bash
git add app/src/app/assess/pre-knowledge/
git commit -m "feat: add pre-knowledge capture screen (attachment, love language, therapy)"
```

---

### Task 9: Transform Question Bank V2 + Update Data Layer

**Files:**
- Create: `app/src/data/question_bank_v2.json` (copy from agent output)
- Modify: `app/src/data/questions.ts` — update transformer to handle v2 schema
- Modify: `app/src/lib/scoring.ts` — implement weighted scoring

**Step 1: Copy question bank v2**

Copy `agents/agent1_research/output/question_bank_v2.json` to `app/src/data/question_bank_v2.json`.

**Step 2: Update question transformer**

Update `app/src/data/questions.ts` to:
- Import from `question_bank_v2.json`
- Export `coreQuestions`, `followUpQuestions`, `preKnowledgeQuestions` in addition to `relationshipQuestions` and `singleQuestions`
- Handle `depth`, `trigger_condition`, `follow_up_for`, `text_prompt` fields
- Sort by `sequence_order` within each group
- Export a `getFollowUpsForDimension(dimension, threshold)` function

**Step 3: Update scoring engine**

Update `app/src/lib/scoring.ts` to:
- Accept question weight in score computation (weighted sum / total weight, not simple average)
- Export a `computeRealtimeScores` function that scores a single framework section (for adaptive branching during assessment)
- Normalize dimension scores to their proper scales

**Step 4: Build and verify**

**Step 5: Commit**

```bash
git add app/src/data/ app/src/lib/scoring.ts
git commit -m "feat: question bank v2 with weighted scoring and adaptive support"
```

---

### Task 10: Update Assessment Flow — Adaptive Branching + Text Boxes

**Files:**
- Modify: `app/src/app/assess/[mode]/page.tsx`

**Step 1: Read depth and pre-knowledge from URL/sessionStorage**

Read `depth` from URL search params. Read pre-knowledge from sessionStorage.

**Step 2: Build question queue dynamically**

Instead of a static array, maintain a dynamic question queue:
- Start with core questions (filtered by assessment_length: "both" or matching depth)
- After each framework section completes (detect by checking if the next question is a different framework), compute real-time scores for that framework
- If depth === "deep" and any dimension exceeds its trigger threshold, inject the relevant follow-up questions into the queue

**Step 3: Add optional text box**

After scenario questions (in Deep Dive mode), if the question has a `text_prompt` field, show a text area below the answer options:
- Collapsible: "Want to add context?" toggle
- Textarea: placeholder from `text_prompt`, max 300 chars, `bg-card border-card-border`
- Store in a separate `freeTextResponses` record in state
- Include in sessionStorage when submitting

**Step 4: Update sessionStorage payload**

When submitting, store:
```typescript
{
  mode, depth, answers, freeTextResponses, preKnowledge, completedAt: new Date().toISOString()
}
```

**Step 5: Build and verify**

**Step 6: Commit**

```bash
git add app/src/app/assess/
git commit -m "feat: adaptive branching in Deep Dive, optional text boxes, dynamic question queue"
```

---

## WORKSTREAM D: Report Improvements (depends on Task 5)

### Task 11: Overhaul System Prompt

**Files:**
- Modify: `app/src/app/api/generate-report/route.ts`

**Step 1: Update system prompt**

Add these constraints to the SYSTEM_PROMPT constant:

1. **Evidence-based claims only**: "For each claim about the user's pattern, you MUST reference the specific dimension score that supports it. Do not infer patterns not directly evidenced by the scores. If a score is moderate (3-5 out of 7, or 4-6 out of 10), describe it as a 'moderate tendency' — not a 'significant pattern' or 'strong tendency.'"

2. **Tone calibration by score magnitude**:
   - 1-2/7 or 0-3/10: "minimal/low presence"
   - 3-4/7 or 4-5/10: "moderate tendency, shows up sometimes"
   - 5-6/7 or 6-8/10: "notable pattern worth attention"
   - 7/7 or 9-10/10: "strong pattern, significant impact"

3. **Pre-knowledge integration**: "If the user provided their self-assessed attachment style or love language, acknowledge it. Compare their self-assessment to what the scores suggest. If they match: validate ('You know yourself well — your scores confirm...'). If they differ: explore gently ('You identified as X, but your responses suggest Y tendencies — this is common because...')."

4. **Free-text integration**: "If the user provided free-text responses, reference them directly. Quote or paraphrase their words when relevant to an insight."

5. **Raw answer usage**: "You receive the user's raw answers alongside scores. Use specific scenario choices to ground your insights. Instead of 'you tend to get defensive,' say 'when presented with the scenario about receiving criticism, you chose the response about explaining your reasons — this suggests a defensiveness pattern where...'"

**Step 2: Update the API route to send raw answers + free-text + pre-knowledge**

Update the POST handler to accept and forward:
```typescript
const { mode, scores, raw_answers, free_text_responses, pre_knowledge, depth } = await req.json();
```

Include all of these in the user message to Claude, clearly labeled.

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git add app/src/app/api/generate-report/
git commit -m "feat: overhaul system prompt — evidence-based, tone-calibrated, pre-knowledge aware"
```

---

### Task 12: Update Processing Page to Send Full Payload

**Files:**
- Modify: `app/src/app/assess/processing/page.tsx`

**Step 1: Read all data from sessionStorage**

Update the `generateReport` function to read:
```typescript
const { mode, depth, answers, freeTextResponses, preKnowledge, completedAt } = parsed;
```

**Step 2: Send enriched payload to API**

```typescript
body: JSON.stringify({
  mode,
  depth,
  scores,
  raw_answers: answers,
  free_text_responses: freeTextResponses || {},
  pre_knowledge: preKnowledge || {},
})
```

**Step 3: Store completedAt on report**

```typescript
report.createdAt = completedAt || new Date().toISOString();
```

**Step 4: Build and verify**

**Step 5: Commit**

```bash
git add app/src/app/assess/processing/
git commit -m "feat: send full payload (free-text, pre-knowledge, depth) to report API"
```

---

## WORKSTREAM E: Final Integration

### Task 13: Integration Test — Full Flow

**Step 1: Run dev server**

```bash
cd /Users/upneja/Projects/pairscope/app && npm run dev
```

**Step 2: Test Quick Insights flow**

Navigate: `/` → `/assess` → `/assess/depth?mode=relationship` → choose Quick → `/assess/pre-knowledge` → skip → `/assess/relationship?depth=quick` → answer all ~30 questions → `/assess/processing` → `/report/latest`

Verify:
- All pages are light theme with readable dark text
- Selected states are clearly visible on all question formats
- No dark-bg-with-dark-text issues
- Report date is correct
- Report narrative references actual answer patterns
- Report doesn't over-dramatize moderate scores

**Step 3: Test Deep Dive flow**

Same flow but choose Deep Dive. Verify:
- Follow-up questions appear when scoring high on a dimension
- Text boxes appear after scenario questions
- Report references free-text responses if provided
- Pre-knowledge is reflected in the report

---

### Task 14: Deploy V2

**Step 1: Final build**

```bash
cd /Users/upneja/Projects/pairscope/app && npm run build
```

**Step 2: Push and deploy**

```bash
cd /Users/upneja/Projects/pairscope && git push
cd app && vercel --prod --yes
vercel alias <deployment-url> pairscope.vercel.app
```

**Step 3: Update dashboard**

Update `DASHBOARD.md` with V2 completion status.

**Step 4: Commit**

```bash
git add DASHBOARD.md
git commit -m "docs: update dashboard for V2 launch"
git push
```
