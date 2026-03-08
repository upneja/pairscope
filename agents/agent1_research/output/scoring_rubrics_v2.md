# Pairscope v2 Scoring Rubrics

## Overview

Pairscope v2 uses a weighted scoring system across five research frameworks to produce a relationship health profile. Scores are computed per-dimension within each framework, then normalized to framework-specific scales. Adaptive follow-up questions are triggered when dimension scores exceed defined thresholds after core question completion.

---

## 1. General Scoring Formula

### Dimension Score Calculation

For each dimension `d`, the raw weighted score is:

```
dimension_score(d) = sum(answer_i * weight_i) / sum(weight_i)
```

Where:
- `answer_i` = the respondent's answer value for question `i` targeting dimension `d`
- `weight_i` = the scoring weight assigned to question `i` (range: 0.5 - 2.0)

### Reverse-Scored Items

For questions where `reverse_scored = true`, the answer is transformed before weighting:

```
reversed_answer = (scale_max + scale_min) - raw_answer
```

For a 1-7 likert scale: `reversed_answer = 8 - raw_answer`

### Scenario and Forced-Choice Questions

- **Scenario questions**: The `score` field on the selected option is used directly as the answer value.
- **Forced-choice questions**: A tally of +1 is added to the chosen dimension. Love language scores are ranked by total tally count across all forced-choice items.

---

## 2. Per-Framework Normalization

### Gottman's Four Horsemen (horsemen dimensions)

| Dimension | Scale | Interpretation |
|-----------|-------|----------------|
| Criticism | 1-7 | 1 = rarely uses global character attacks; 7 = frequently uses "you always/never" language |
| Contempt | 1-7 | 1 = maintains respect; 7 = frequent sarcasm, eye-rolling, mockery, superiority |
| Defensiveness | 1-7 | 1 = accepts responsibility; 7 = reflexive counter-attacking and excuse-making |
| Stonewalling | 1-7 | 1 = stays engaged during conflict; 7 = frequent emotional withdrawal/shutdown |

**Positive indicators (reverse-direction; higher = healthier):**

| Dimension | Scale | Interpretation |
|-----------|-------|----------------|
| Love Maps | 1-7 | 1 = little knowledge of partner's inner world; 7 = deep understanding |
| Fondness | 1-7 | 1 = difficulty identifying admirable qualities; 7 = strong admiration system |
| Turning Toward | 1-7 | 1 = frequently misses/ignores bids; 7 = consistently responds to bids for connection |

Note: Love maps, fondness, and turning_toward are reverse-scored at the question level so that the dimension score also runs 1-7 where higher = more of the construct. The report inverts the interpretation (higher = healthier).

### Attachment Theory (ECR-R)

| Dimension | Scale | Interpretation |
|-----------|-------|----------------|
| Anxiety | 1-7 | 1 = low attachment anxiety (secure); 7 = high anxiety (fear of abandonment, hyperactivation) |
| Avoidance | 1-7 | 1 = low avoidance (comfortable with closeness); 7 = high avoidance (discomfort with intimacy, deactivation) |

Attachment style quadrant mapping:
- Low anxiety + Low avoidance = **Secure**
- High anxiety + Low avoidance = **Anxious-Preoccupied**
- Low anxiety + High avoidance = **Dismissive-Avoidant**
- High anxiety + High avoidance = **Fearful-Avoidant**

Threshold for "high" on either dimension: >= 4.5 on the 1-7 scale.

### Big Five Personality (BFI-K)

| Dimension | Scale | Interpretation |
|-----------|-------|----------------|
| Neuroticism | 1-5 | 1 = emotionally stable; 5 = high emotional reactivity |
| Conscientiousness | 1-5 | 1 = flexible/spontaneous; 5 = highly organized/dependable |
| Agreeableness | 1-5 | 1 = competitive/skeptical; 5 = cooperative/trusting |

Normalization from 1-7 raw to 1-5 scale:
```
normalized = 1 + (raw - 1) * (4 / 6)
```

### Couples Satisfaction Index (CSI-4)

| Dimension | Scale | Interpretation |
|-----------|-------|----------------|
| Satisfaction | 0-21 | 0 = extremely distressed; 21 = perfectly satisfied |

CSI scoring uses the Funk & Rogge (2007) original scoring:
- Item 1 (c17): 0-6 scale mapped from the 7-point likert
- Items 2-4 (c22, c27, c31/c32): 0-5 scale mapped from the 7-point likert

The satisfaction score is the sum across items, producing a 0-21 composite.

Clinical cutoff: Score < 13.5 indicates notable relationship dissatisfaction (Funk & Rogge, 2007).

**Mode considerations:**
- Mode A (relationship): All 4+ CSI items administered. Full 0-21 scale.
- Mode B (single/past): Items c31, c32 are excluded. Score is pro-rated from available items: `prorated = (sum / items_answered) * 4`

### Love Languages

Love language scores are tallied from forced-choice questions (c6, c11, c18, c24, c30). Each forced-choice increments the count for one of five dimensions:

| Dimension | Tally Range |
|-----------|-------------|
| Words of Affirmation | 0-5 |
| Quality Time | 0-5 |
| Physical Touch | 0-5 |
| Acts of Service | 0-5 |
| Gifts | 0-5 |

The primary love language is the one with the highest tally. In case of a tie, both are reported as co-primary languages.

---

## 3. Weight Guidelines

Scoring weights encode discriminating power and clinical importance:

| Weight Range | Meaning | Examples |
|-------------|---------|----------|
| 1.3 - 2.0 | High discriminating power, core construct | Contempt items (1.5), CSI global satisfaction (2.0) |
| 1.0 - 1.2 | Standard items with good discriminating power | Most Gottman and attachment items |
| 0.7 - 0.9 | Supplementary/contextual items | Big Five personality items in relationship context |
| 0.5 - 0.6 | Low-priority or indirect indicators | Reserved for future use |

Contempt receives the highest weights among Gottman horsemen because it is the strongest single predictor of relationship dissolution (Gottman & Levenson, 2000).

---

## 4. Follow-Up Question Trigger Thresholds

After all core questions are scored, dimension scores are evaluated against thresholds to determine which follow-up questions to inject in the "deep" assessment mode.

| Dimension | Threshold | Operator | # Follow-ups Available |
|-----------|-----------|----------|----------------------|
| Criticism | > 5.0 | greater than | 3 (f1, f2, f3) |
| Contempt | > 4.0 | greater than | 3 (f4, f5, f6) |
| Defensiveness | > 5.0 | greater than | 3 (f7, f8, f9) |
| Stonewalling | > 5.0 | greater than | 3 (f10, f11, f12) |
| Anxiety | > 5.0 | greater than | 3 (f13, f14, f15) |
| Avoidance | > 5.0 | greater than | 3 (f16, f17, f18) |

**Threshold rationale:**
- Contempt has a lower threshold (> 4.0) because Gottman's research identifies contempt as the most corrosive horseman. Even moderate levels warrant deeper exploration.
- Other horsemen and attachment dimensions trigger at > 5.0, representing clearly elevated scores on a 1-7 scale (top ~30%).

**Maximum follow-up count:**
- Deep assessment targets 36-50 total questions (30 core + 6-20 follow-ups).
- If all 6 dimensions trigger, all 18 follow-ups are administered (total: 48 questions).
- If no dimensions trigger, only core questions are asked (total: 30 questions).

---

## 5. Pre-Knowledge Integration

Pre-knowledge responses (pk1, pk2, pk3) do NOT affect dimension scores. They enrich the report in the following ways:

### Attachment Style (pk1)
- If the user self-identifies an attachment style, the report compares their self-report to the computed attachment profile.
- Concordance or discordance is noted: "You identified as securely attached, and your responses are consistent with that" or "You identified as securely attached, but your responses suggest some anxious tendencies worth exploring."

### Love Language (pk2)
- If the user identifies a love language, the report highlights whether the assessment confirms it or suggests an additional/different primary language.
- Useful for couples comparison: "You both identified Quality Time as primary, and the assessment confirms this alignment."

### Therapy History (pk3)
- "Yes" responses cause the report to use slightly more clinical terminology and reference therapeutic frameworks by name.
- "No" responses cause the report to use more accessible, everyday language.
- "Prefer not to say" is treated as "No" for language calibration purposes.

---

## 6. Score Aggregation for Reports

### Risk Flags

The following combinations trigger specific report sections:

| Flag | Condition | Report Section |
|------|-----------|----------------|
| High Conflict Risk | Any horseman > 5.0 AND satisfaction < 13.5 | "Conflict Patterns to Watch" |
| Pursuit-Withdrawal | Anxiety > 5.0 AND partner_avoidance > 5.0 (couples mode) | "The Pursue-Withdraw Dynamic" |
| Emotional Disconnection | Love maps < 3.0 AND turning_toward > 5.0 | "Rebuilding Emotional Connection" |
| Strengths Foundation | All horsemen < 3.0 AND satisfaction > 16 | "Your Relationship Strengths" |

### Composite Health Score

An overall relationship health index (0-100) is computed as:

```
health = 100 - (horsemen_penalty + attachment_insecurity_penalty - satisfaction_bonus - strengths_bonus)

horsemen_penalty = sum of (each horseman dimension normalized to 0-25 scale) / 4
attachment_insecurity_penalty = (anxiety_norm + avoidance_norm) / 2, each on 0-15 scale
satisfaction_bonus = satisfaction / 21 * 20
strengths_bonus = ((7 - turning_toward) + fondness + love_maps) / 21 * 15
```

This composite is presented as a general indicator, not a diagnostic score. The dimensional breakdown is always shown alongside it.
