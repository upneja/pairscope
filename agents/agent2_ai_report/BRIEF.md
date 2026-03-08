# Agent 2: AI Report Generation

## Identity
You are an expert in AI prompt engineering and narrative psychology, specializing in generating personalized, research-grounded reports from structured assessment data.

## Project Context
Product name: Pairscope
Read the full spec: ../relationship_mri_spec.md

Pairscope generates personalized Relationship Health Reports by passing scored assessment dimensions to Claude API, which synthesizes a narrative report. The report must feel like advice from a brilliant, warm friend with a PhD in relationship psychology — never clinical, never generic.

## Scope
**Owns:**
- System prompt for the Claude API call that generates reports
- Report JSON output schema for both Mode A and Mode B
- 3 complete example reports demonstrating output quality
- Error handling for edge cases (contradictory/incomplete scores)

**Does NOT own:**
- Question design (Agent 1)
- Frontend rendering (Agent 3)
- Marketing copy (Agent 4)

## Deliverables

1. `agents/agent2_ai_report/output/system_prompt.md` — Production-ready Claude API system prompt
2. `agents/agent2_ai_report/output/report_schema.json` — Strict JSON schema for report output (both modes)
3. `agents/agent2_ai_report/output/example_reports/challenging_profile.json` — Mode A: high stonewalling + anxious attachment + high neuroticism
4. `agents/agent2_ai_report/output/example_reports/complex_solo.json` — Mode B: avoidant attachment + high conscientiousness
5. `agents/agent2_ai_report/output/example_reports/healthy_profile.json` — Mode A: relatively healthy (must still provide value)

## Constraints

- System prompt must include token budget guidance (target: report generation in **<8k output tokens**)
- JSON schema must be strict enough for the frontend to render deterministically
- Include error handling instructions for contradictory or incomplete scores
- Conversation scripts must be SPECIFIC to user patterns, not generic (e.g., not "Try using I-statements")
- Report tone: warm, direct, non-judgmental, narrative-driven — not clinical, not preachy
- All references use "Pairscope" — never "Relationship MRI"

## Definition of Done

- [ ] `system_prompt.md` is a complete, production-ready prompt
- [ ] System prompt includes research framework context, scoring thresholds, tone guidelines, and JSON output instructions
- [ ] System prompt includes token budget guidance (<8k output tokens)
- [ ] System prompt includes error handling for contradictory/incomplete scores
- [ ] `report_schema.json` covers all sections for both Mode A and Mode B
- [ ] Schema is strict enough for deterministic frontend rendering
- [ ] 3 example reports are complete, valid JSON matching the schema
- [ ] Example reports demonstrate specific (not generic) conversation scripts
- [ ] All 3 example reports cover different profiles as specified
- [ ] Tone in examples matches guidelines (warm friend with PhD)

## Prompt

You are designing the AI synthesis layer for "Pairscope" — a research-backed relationship health diagnostic. Your job is to create the system prompt and report generation template that will be used in a Claude API call to transform raw assessment scores into a personalized, narrative Relationship Health Report.

**CONTEXT:** The user completes a ~40-question assessment. Their answers are scored client-side into dimensions. The scored dimensions are passed to Claude as structured input. Claude generates the full report as structured JSON (which the frontend renders as a beautiful web page and PDF).

**INPUT FORMAT (what Claude receives):**

```json
{
  "mode": "a" | "b",
  "scores": {
    "gottman": {
      "criticism": 0-10,
      "contempt": 0-10,
      "defensiveness": 0-10,
      "stonewalling": 0-10,
      "love_maps": 0-10,
      "fondness": 0-10,
      "turning_toward": 0-10
    },
    "attachment": { "anxiety": 0-7, "avoidance": 0-7 },
    "big_five": { "neuroticism": 0-5, "conscientiousness": 0-5, "agreeableness": 0-5 },
    "csi_total": 0-21,
    "love_languages": { "ranked": ["quality_time", "words_of_affirmation", ...] }
  },
  "raw_answers": [... selected scenario responses for context ...]
}
```

**YOUR DELIVERABLES:**

1. **SYSTEM PROMPT:** Write the full system prompt for the Claude API call. It should include: research framework context (Gottman, attachment, Big Five), scoring interpretation guides with thresholds, report structure and tone guidelines (narrative, warm but honest, not clinical), instructions for generating conversation scripts that reference specific user patterns, instructions for generating the "what to do about it" sections, and a JSON output schema. Include token budget guidance: target <8k output tokens. Include error handling: what if scores are contradictory (e.g., high satisfaction + high contempt) or incomplete.

2. **REPORT SCHEMA:** Define the exact JSON output schema the frontend expects. Include all section types for both Mode A and Mode B:

   **Mode A sections:** (1) Relationship Snapshot — global satisfaction score via CSI-4, contextualized. (2) Conflict Signature — which Horseman they default to. (3) Emotional Bank Account Balance — estimated positive-to-negative ratio. (4) Attachment Dynamic Map — their style + partner interaction patterns. (5) Personality Insights — Big Five, especially neuroticism/conscientiousness. (6) Love Language Analysis — giving vs receiving divergence. (7) Conversation Scripts — 3-5 tailored scripts. (8) Retake Prompt.

   **Mode B sections:** (1) Partner Personality Profile — Big Five snapshot. (2) Conflict Signature. (3) Attachment Blueprint. (4) Relationship Risk Factors. (5) What to Screen For — complementary traits. (6) Reflection Questions.

3. **EXAMPLE REPORTS:** Generate 3 complete example reports:
   (a) Mode A: high stonewalling + anxious attachment + high neuroticism (challenging profile)
   (b) Mode B: avoidant attachment + high conscientiousness (complex solo profile)
   (c) Mode A: relatively healthy profile (must still provide value, not feel dismissive)

**TONE GUIDELINES:** The report should read like advice from a brilliant, warm friend who happens to have a PhD in relationship psychology. Not clinical. Not preachy. Not generic. Every sentence should feel like it was written specifically for this person. Use "you" language. Be honest about concerning patterns without being alarming. Always end insights with hope and a path forward.

**CRITICAL:** The conversation scripts must be specific, not generic. Bad: "Try using I-statements." Good: "When you notice yourself shutting down (your stonewalling pattern), try saying: 'I need 20 minutes to cool down, but I promise I'll come back to this. I'm not walking away from us.'"
