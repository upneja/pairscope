# RELATIONSHIP MRI

**Product Concept Spec & Agent Prompts**

*The 23andMe of Your Relationship*
*A research-backed diagnostic that reveals how you show up in relationships*

March 2026 · v0.1 Draft

---

## 1. Product Vision

**One-liner:** A free, AI-powered relationship health diagnostic grounded in 50+ years of relationship science. Take an assessment, receive a personalized Relationship Health Report with actionable insights and conversation scripts.

**The insight:** Research shows your own personality traits predict relationship satisfaction more than your partner's. Neuroticism is the #1 negative predictor; conscientiousness is the #1 positive predictor. Most people don't know this. Nobody is delivering this research to consumers in a way that's personal, actionable, and beautiful.

**The gap:** Existing AI couples apps (Maia, CoupleWork, Flamme, Relish) all converge on the same model: ongoing chatbot + daily micro-tasks + subscription. They're engagement-driven, not insight-driven. Nobody is building the "single moment of clarity" product — a deep diagnostic that synthesizes across multiple validated frameworks and produces a report you'd actually share.

**Key differentiator:** Works for singles AND people in relationships. Solo mode analyzes your patterns across past relationships and personality tendencies. This isn't "couples therapy lite" — it's "understand yourself as a partner."

---

## 2. Scientific Foundations

The assessment engine draws from five validated research frameworks, synthesized into one coherent flow:

### 2.1 Gottman's Sound Relationship House

50 years of research with thousands of couples. The "Four Horsemen" (criticism, contempt, defensiveness, stonewalling) predict relationship dissolution with ~90% accuracy. The Sound Relationship House model covers: love maps (how well you know your partner), fondness/admiration, turning toward vs. away, positive sentiment override, conflict management, making dreams come true, and shared meaning. We adapt the 33-item Four Horsemen Questionnaire and the 5-item Sound Relationship House scales.

### 2.2 Attachment Theory

Attachment orientations (anxiety and avoidance) predict ~22% of the variance in destructive communication behaviors, above and beyond relationship satisfaction. This means attachment style is a leading indicator of HOW you'll fight, not just WHETHER you're happy. We use the ECR-R (Experiences in Close Relationships — Revised) adapted to ~8 key items.

### 2.3 Big Five Personality Traits

A 9-year longitudinal study (N=972) found that actor effects (your own personality) dominate partner effects. Specifically: low Neuroticism and high Conscientiousness predict long-term satisfaction. Agreeableness matters in cross-sectional studies but washes out longitudinally. We measure the 3 relationship-critical dimensions: Neuroticism, Conscientiousness, and Agreeableness via a BFI-K adaptation (~10 items).

### 2.4 Couples Satisfaction Index (CSI)

The gold standard for measuring relationship satisfaction. Developed using Item Response Theory across 5,315 participants and 8 prior validated scales. The CSI-4 (4-item version) provides a quick global satisfaction benchmark with strong convergent validity (.85-.98 correlation with the full 32-item DAS). Used only in "In a Relationship" mode.

### 2.5 Love Languages + Emotional Bank Account

Chapman's love languages framework is less rigorously validated than the others but has extremely high consumer recognition and serves as an accessible entry point. Gottman's emotional bank account concept (positive-to-negative ratio of 5:1 in stable relationships) provides the behavioral framing. These are used for the "how to deposit" actionable section.

---

## 3. Two Assessment Modes

### Mode A: "In a Relationship"

The user answers about their current relationship dynamic. ~45 questions across all five frameworks.

**Report sections:** (1) Your Relationship Snapshot — global satisfaction score via CSI-4, contextualized. (2) Your Conflict Signature — which Horseman you default to, with behavioral examples. (3) Emotional Bank Account Balance — estimated positive-to-negative ratio and what's draining it. (4) Attachment Dynamic Map — your attachment style and how it interacts with common partner styles. (5) Personality & Your Relationship — Big Five insights, especially neuroticism/conscientiousness impact. (6) Love Language Mismatch Analysis — where your giving and receiving languages diverge. (7) Conversation Scripts — 3-5 specific scripts tailored to your weak spots. (8) Quarterly Retake Prompt — encouragement to reassess in 90 days.

### Mode B: "Flying Solo"

The user answers about their general patterns across past relationships and tendencies. ~35 questions (CSI-4 omitted, Gottman questions reframed as pattern-based).

**Report sections:** (1) Your Partner Personality Profile — Big Five snapshot and what it means for relationships. (2) Your Conflict Signature — same as Mode A but framed as "your default pattern" across relationships. (3) Attachment Blueprint — your attachment style, what triggers you, what you seek. (4) Your Relationship Risk Factors — neuroticism-driven patterns, avoidance tendencies, etc. (5) What to Screen For — traits in future partners that would complement vs. clash with your style. (6) Questions to Ask Yourself — reflection prompts before the next serious relationship.

---

## 4. User Flow

1. **Landing page:** Hero section with value prop. Single CTA: "Take the Assessment." No account creation required.
2. **Mode selection:** "Are you currently in a relationship?" — Yes / No. This routes to Mode A or Mode B. Clean, no judgment either way.
3. **Assessment flow:** One question at a time, full-screen. Progress bar at top. Mix of formats: Likert scale (1-7), scenario-based multiple choice, forced-choice pairs. Estimated time: 8-12 minutes. Questions feel conversational, not clinical.
4. **Processing screen:** After submission, a "Generating your report..." screen with subtle animation. 15-30 second wait (AI synthesis happening). This builds anticipation and makes the report feel premium, not instant/disposable.
5. **Report delivery:** Beautiful web page (scrollable). Each section is a card with a visual element (radar charts, spectrum bars, icons). Export to PDF button in top-right.
6. **Soft account creation:** After viewing the report: "Save your report & get notified when it's time to retake." Email capture only. Optional.
7. **Share mechanic:** Each report section has a share button that generates a branded image card (for Instagram stories, iMessage, etc.) with a CTA back to the assessment.

---

## 5. Question Design Principles

- **Conversational tone:** Not "Rate your level of emotional reactivity." Instead: "When your partner (or ex) said something hurtful, what did you usually do first?"
- **Scenario-based where possible:** Present a situation, ask for the most honest response. E.g., "Your partner cancels plans last minute for the third time. Your gut reaction is:" (a) bring it up immediately, (b) let it go but feel resentful, (c) shut down, (d) make a sarcastic comment.
- **No "obviously correct" answers:** Every option should feel like a real thing a real person would do. Avoid signaling the "healthy" answer.
- **Mix of formats to prevent fatigue:** Alternate between Likert scales, multiple choice, and "which describes you better" forced pairs. Never more than 5 Likert questions in a row.
- **Validated backbone, accessible wording:** Questions are adapted from CSI-4, ECR-R, BFI-K, and the Gottman 33-item questionnaire, but rewritten for clarity and modern language. The psychometric mapping must be preserved even if the surface wording changes.

---

## 6. Report Output Specification

The report is the product. It needs to feel like something you'd get from a high-end therapist, not a BuzzFeed quiz. Key characteristics:

- **Narrative, not numeric:** The user gets a story about themselves, not a score out of 10. Numbers appear as supporting context ("Your neuroticism sits in the 72nd percentile") but the headline is always a human-readable insight.
- **Visual anchors:** Radar chart for Big Five traits. Spectrum bar for attachment (anxiety axis, avoidance axis). Icon system for Four Horsemen. Emotional bank account as a literal meter visual.
- **Actionable over diagnostic:** Every insight section ends with "What to do about it." The conversation scripts are not generic — they reference the user's specific patterns. E.g., "Since you tend toward defensiveness when criticized, try this repair attempt: 'I can see why that bothered you. Can we rewind?'"
- **Screenshottable sections:** Each card in the web view is designed to look good as a standalone image. This is the organic growth engine.
- **PDF export:** Clean, well-formatted PDF that preserves charts as images and maintains the visual hierarchy. Not a raw text dump.

---

## 7. Technical Architecture (High-Level)

- **Frontend:** Next.js (React) app. Tailwind CSS. Framer Motion for question transitions. Chart.js or Recharts for visualizations. html2canvas + jsPDF for PDF export.
- **Assessment engine:** Static question bank (JSON). Client-side scoring with validated rubrics for each framework. No server needed for raw scoring.
- **AI synthesis layer:** Claude API call that takes the scored dimensions and generates the personalized narrative report. System prompt includes the research framework context, scoring rubrics, and report template. This is the "processing..." step.
- **Backend:** Minimal — Vercel serverless functions for the Claude API call (to protect the API key). Optionally: Supabase or Firebase for email capture and report storage.
- **No auth required:** Assessment and report delivery work without login. Email capture is optional post-report.

---

## 8. Growth & Monetization Model

### Growth Loops

- **Screenshot virality:** Report cards designed for social sharing. Each section generates a branded image with "Take yours at relationshipmri.com" watermark.
- **Partner invite:** After Mode A, prompt: "Want the full picture? Invite your partner to take it independently." This doubles the user base organically.
- **Quarterly retake:** Email nudge at 90 days: "Your relationship has changed. Has your report?" Re-engagement loop.
- **Content engine:** Anonymized, aggregated insights become content. "73% of users who scored high on stonewalling also had avoidant attachment." Blog posts, social content, and PR bait.

### Future Monetization (not at launch)

- Couples Report (combined partner analysis) — premium unlock
- Deep Dive AI Sessions (follow-up chat about specific report sections) — subscription
- Therapist referral marketplace (partner with licensed couples therapists)
- Enterprise: wellness programs, pre-marital counseling programs, therapy practices using it as intake

---

## 9. Agent Prompts

Below are four specialized agent prompts designed to kick-start parallel workstreams. Each agent has a clear scope, deliverable, and the context it needs to do its job. These are meant to be run in Claude, Cursor, or similar AI coding/research tools.

---

### Agent 1: Research & Question Design Agent

**Scope:** Design the complete question bank for both assessment modes.

**Deliverable:** A JSON file containing all questions, response options, scoring rubrics, and framework mappings for Mode A and Mode B.

**PROMPT:**

> You are a relationship psychology researcher and psychometrician. Your task is to design a complete assessment question bank for "Relationship MRI" — a consumer-facing relationship health diagnostic.
>
> **SCIENTIFIC FRAMEWORKS TO SYNTHESIZE:**
>
> 1. Gottman's Four Horsemen (criticism, contempt, defensiveness, stonewalling) and Sound Relationship House (love maps, fondness/admiration, turning toward, positive sentiment, conflict management, shared meaning). Source: 33-item Four Horsemen Questionnaire + 5-item SRH scales.
> 2. Attachment Theory (anxiety x avoidance dimensions). Source: ECR-R (Experiences in Close Relationships — Revised).
> 3. Big Five Personality Traits (focus on Neuroticism, Conscientiousness, Agreeableness). Source: BFI-K short form.
> 4. Couples Satisfaction Index (CSI-4, 4-item version). Used only in "In a Relationship" mode.
> 5. Love Languages (5 categories: words of affirmation, quality time, physical touch, acts of service, gifts).
>
> **TWO MODES:**
>
> Mode A ("In a Relationship"): ~45 questions about the user's current relationship. All 5 frameworks active.
>
> Mode B ("Flying Solo"): ~35 questions about the user's patterns across past relationships and general tendencies. CSI-4 omitted. Gottman questions reframed as pattern-based (e.g., "In past relationships, I tended to..." instead of "My partner and I...").
>
> **QUESTION DESIGN REQUIREMENTS:**
>
> - Conversational, non-clinical tone. Rewrite validated instrument items for accessibility while preserving psychometric mapping.
> - Mix of formats: Likert (1-7), scenario-based multiple choice, forced-choice pairs. Never more than 5 Likert questions in a row.
> - No "obviously correct" answers. Every option should feel like a real thing a real person would do.
> - 8-12 minute completion time across all questions.
> - Each question must map to exactly one scored dimension with a clear rubric.
>
> **OUTPUT FORMAT:** A single JSON file with this structure:
>
> ```json
> {
>   "mode_a": {
>     "questions": [
>       {
>         "id": "a1",
>         "framework": "gottman_horsemen",
>         "dimension": "criticism",
>         "format": "scenario",
>         "text": "...",
>         "options": [...],
>         "scoring": {...},
>         "source_instrument": "Four Horsemen Questionnaire, adapted"
>       }
>     ]
>   },
>   "mode_b": { "questions": [...] },
>   "scoring_rubrics": {
>     "gottman_horsemen": {...},
>     "attachment": {...},
>     "big_five": {...},
>     "csi": {...},
>     "love_languages": {...}
>   }
> }
> ```
>
> Also provide: (1) A mapping table showing which validated instrument item each question adapts from. (2) Scoring rubrics for each dimension including thresholds for "healthy/at-risk/critical" categories. (3) A question sequencing recommendation that alternates formats and progressively deepens.

---

### Agent 2: AI Report Generation Agent

**Scope:** Design and write the system prompt + report template for the Claude API call that generates personalized reports.

**Deliverable:** A production-ready system prompt, a report template with dynamic sections, and 3 example reports (one Mode A, one Mode B, one edge case).

**PROMPT:**

> You are designing the AI synthesis layer for "Relationship MRI" — a research-backed relationship health diagnostic. Your job is to create the system prompt and report generation template that will be used in a Claude API call to transform raw assessment scores into a personalized, narrative Relationship Health Report.
>
> **CONTEXT:** The user completes a ~40-question assessment. Their answers are scored client-side into dimensions. The scored dimensions are passed to Claude as structured input. Claude generates the full report as structured JSON (which the frontend renders as a beautiful web page and PDF).
>
> **INPUT FORMAT (what Claude receives):**
>
> ```json
> {
>   "mode": "a" | "b",
>   "scores": {
>     "gottman": {
>       "criticism": 0-10,
>       "contempt": 0-10,
>       "defensiveness": 0-10,
>       "stonewalling": 0-10,
>       "love_maps": 0-10,
>       "fondness": 0-10,
>       "turning_toward": 0-10
>     },
>     "attachment": { "anxiety": 0-7, "avoidance": 0-7 },
>     "big_five": { "neuroticism": 0-5, "conscientiousness": 0-5, "agreeableness": 0-5 },
>     "csi_total": 0-21,
>     "love_languages": { "ranked": ["quality_time", "words_of_affirmation", ...] }
>   },
>   "raw_answers": [... selected scenario responses for context ...]
> }
> ```
>
> **YOUR DELIVERABLES:**
>
> 1. **SYSTEM PROMPT:** Write the full system prompt for the Claude API call. It should include: research framework context (Gottman, attachment, Big Five), scoring interpretation guides with thresholds, report structure and tone guidelines (narrative, warm but honest, not clinical), instructions for generating conversation scripts that reference specific user patterns, instructions for generating the "what to do about it" sections, and a JSON output schema.
>
> 2. **REPORT TEMPLATE:** Define the exact JSON output schema the frontend expects. Include all section types for both Mode A and Mode B.
>
> 3. **EXAMPLE REPORTS:** Generate 3 complete example reports: (a) Mode A user with high stonewalling + anxious attachment + high neuroticism (a challenging profile). (b) Mode B user with avoidant attachment + high conscientiousness (a complex solo profile). (c) Mode A user with a relatively healthy profile (to test that the report still provides value and doesn't feel dismissive).
>
> **TONE GUIDELINES:** The report should read like advice from a brilliant, warm friend who happens to have a PhD in relationship psychology. Not clinical. Not preachy. Not generic. Every sentence should feel like it was written specifically for this person. Use "you" language. Be honest about concerning patterns without being alarming. Always end insights with hope and a path forward.
>
> **CRITICAL:** The conversation scripts must be specific, not generic. Bad: "Try using I-statements." Good: "When you notice yourself shutting down (your stonewalling pattern), try saying: 'I need 20 minutes to cool down, but I promise I'll come back to this. I'm not walking away from us.'"

---

### Agent 3: Frontend & UX Agent

**Scope:** Build the complete frontend: landing page, assessment flow, processing screen, and report display (web + PDF export).

**Deliverable:** A deployable Next.js application with all screens implemented, responsive design, and PDF export functionality.

**PROMPT:**

> You are a senior frontend engineer building "Relationship MRI" — a free, research-backed relationship health diagnostic web app. Build a complete Next.js application with the following screens and functionality.
>
> **TECH STACK:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion for animations, Recharts for data visualization, html2canvas + jsPDF for PDF export. Deploy target: Vercel.
>
> **SCREENS TO BUILD:**
>
> 1. **LANDING PAGE (/):** Hero with headline "Understand yourself as a partner." Subhead: "A free, research-backed diagnostic grounded in 50 years of relationship science." Single CTA button: "Take the Assessment." Below the fold: social proof (research citations, not testimonials), "How it works" (3 steps), and credibility section showing the 5 scientific frameworks used. No signup required. Clean, premium, not playful.
>
> 2. **MODE SELECTION (/assess):** Full-screen. "Are you currently in a relationship?" Two large cards: "Yes, I'm in a relationship" and "No, I'm currently single." No judgment in the copy. Selecting routes to the assessment.
>
> 3. **ASSESSMENT FLOW (/assess/[mode]):** One question per screen with smooth Framer Motion transitions (slide/fade). Progress bar at top showing completion %. Supports 3 question formats: (a) Likert scale (1-7 with labeled endpoints, clickable circles), (b) Scenario-based multiple choice (question text + 3-4 response cards), (c) Forced-choice pairs ("Which describes you better?" with two side-by-side options). Back button available. Questions load from a JSON question bank. Estimated time shown at start: "This takes about 10 minutes."
>
> 4. **PROCESSING SCREEN (/assess/processing):** "Analyzing your responses..." with a subtle, premium animation (not a spinner — think: pulsing concentric circles, or a slow particle effect). Show 3-4 rotating text lines: "Cross-referencing with Gottman's research...", "Mapping your attachment patterns...", "Generating your personalized report..." 15-30 second display minimum, then auto-redirect to report.
>
> 5. **REPORT PAGE (/report/[id]):** Scrollable single page with card-based sections. Each section is a visually distinct card with: section title, narrative text, relevant visualization (radar chart, spectrum bar, icon grid, or meter), "What to do about it" sub-section, and a share button that generates a branded image card. Sections for Mode A: Relationship Snapshot, Conflict Signature, Emotional Bank Account, Attachment Dynamic Map, Personality Insights, Love Language Analysis, Conversation Scripts, Retake Prompt. Fixed top bar with "Export PDF" button. At bottom: email capture for report saving + retake reminders (optional).
>
> **DESIGN DIRECTION:** Premium, calm, trustworthy. Not playful or gamified. Think: Headspace meets 23andMe. Color palette: deep navy/slate backgrounds, warm accent (coral/amber), clean white cards. Typography: modern sans-serif (Inter or similar). Generous whitespace. Mobile-first responsive design.
>
> **PDF EXPORT:** Use html2canvas to capture each report section as an image, then compile into a multi-page PDF with jsPDF. The PDF should preserve the visual design, not just dump raw text. Include a cover page with the user's assessment date and mode.

---

### Agent 4: Landing Page Copy & Brand Agent

**Scope:** Write all marketing copy, brand positioning, and content strategy for launch.

**Deliverable:** Complete landing page copy, SEO metadata, social sharing copy, email templates, and a launch content calendar.

**PROMPT:**

> You are a senior brand strategist and copywriter. Write all consumer-facing copy for "Relationship MRI" — a free, AI-powered relationship health diagnostic grounded in 50 years of relationship science.
>
> **BRAND POSITIONING:** This is the 23andMe of relationships. It's not therapy, not a couples app, not a quiz. It's a diagnostic. It's research-backed, not vibes-based. It works for singles AND people in relationships. The tone is: intelligent, warm, direct, non-judgmental. Never preachy, never clinical, never condescending. Think: the friend who happens to have a PhD.
>
> **TARGET AUDIENCES:** (1) 25-40 year old professionals in relationships who feel "something is off" but can't articulate it. (2) Singles post-breakup doing self-work before their next relationship. (3) Couples who are curious, not in crisis. (4) People who are into self-improvement / personality tests (Enneagram, MBTI crowd) but want something more rigorous.
>
> **DELIVERABLES:**
>
> 1. **LANDING PAGE COPY:** Hero headline + subhead (3 options to A/B test). "How it works" section (3 steps). "The Science" section (credibility without being boring). FAQ section (5-7 questions addressing skeptics: "Is this just a quiz?" "Is my data private?" "Can AI really understand relationships?" etc.). Footer CTA.
>
> 2. **SEO & META:** Page title, meta description, Open Graph title/description/image text, Twitter Card copy. Target keywords: relationship assessment, relationship health test, couples compatibility, attachment style test.
>
> 3. **SOCIAL SHARING COPY:** Template text that appears when someone shares their report section on Instagram/Twitter/iMessage. Must be intriguing without revealing too much. E.g., "Apparently I'm a stonewaller. Here's what that actually means → [link]"
>
> 4. **EMAIL TEMPLATES:** (a) Report delivery email (for users who save with email). (b) 90-day retake reminder. (c) Partner invite email ("Someone who cares about your relationship wants you to take this.").
>
> 5. **LAUNCH CONTENT CALENDAR:** A 2-week pre-launch and 2-week post-launch content plan for Twitter/X and LinkedIn. 3 posts per week. Mix of: data-driven hooks from the research ("Your personality predicts your relationship satisfaction more than your partner's. Here's the 9-year study that proved it."), behind-the-build threads, and teaser content. Optimize for the self-improvement / tech Twitter audience.

---

## 10. Important Disclaimers

Relationship MRI is an educational and self-reflection tool, not a substitute for licensed therapy or clinical diagnosis. The assessment adapts from validated instruments but the consumer adaptation has not itself been independently validated. The report should be presented with clear disclaimers that it is for informational and self-awareness purposes only. Users experiencing relationship crisis, domestic violence, or mental health emergencies should be directed to appropriate professional resources. All user data should be handled with strong privacy protections and clear data handling policies.

---

*— End of Spec —*
