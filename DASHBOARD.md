# Pairscope — Build Dashboard

> Last updated: 2026-03-08 (Phase 1 kickoff)

## Overall Status: 🔵 In Progress

---

### Progress

| Agent | Status | Deliverables | Blockers | Last Update |
|-------|--------|-------------|----------|-------------|
| 1 — Research & Questions | 🔵 In Progress | 0/3 files | None | Kicked off |
| 2 — AI Report Generation | 🔵 In Progress | 0/3 files | None | Kicked off |
| 3 — Frontend & UX | 🔵 In Progress | 0/1 app | Scaffolding with placeholders | Kicked off |
| 4 — Brand & Copy | 🔵 In Progress | 0/5 files | None | Kicked off |
| Integration | ⬜ Not Started | — | Waiting on all agents | — |

### Status Key

⬜ Not Started · 🔵 In Progress · 🟡 In Review · 🟢 Complete · 🔴 Blocked · ⚠️ Needs Revision

---

### Dependency Tracker

| Dependency | From → To | Status |
|-----------|----------|--------|
| Question bank JSON | Agent 1 → Agent 3 | ⬜ Pending |
| Report schema JSON | Agent 2 → Agent 3 | ⬜ Pending |
| System prompt | Agent 2 → Agent 3 (API route) | ⬜ Pending |
| Landing copy | Agent 4 → Agent 3 (components) | ⬜ Pending |
| TypeScript interfaces | Agent 3 → Agent 1, 2 (conformance) | ⬜ Pending |

---

### Agent Deliverable Checklist

#### Agent 1 — Research & Questions
- [ ] `question_bank.json` — valid JSON, both modes, all frameworks
- [ ] `scoring_rubrics.md` — thresholds for healthy/at-risk/critical
- [ ] `instrument_mapping.md` — source instrument for each question

#### Agent 2 — AI Report Generation
- [ ] `system_prompt.md` — production-ready Claude API prompt
- [ ] `report_schema.json` — strict JSON schema, both modes
- [ ] `example_reports/` — 3 complete examples (challenging, complex, healthy)

#### Agent 3 — Frontend & UX
- [ ] Scaffolded Next.js app with all routes
- [ ] Landing page
- [ ] Mode selection screen
- [ ] Assessment flow (3 question formats)
- [ ] Processing screen with animation
- [ ] Report page with visualizations
- [ ] PDF export
- [ ] Mobile responsive
- [ ] Integrated with real data from Agents 1, 2, 4

#### Agent 4 — Brand & Copy
- [ ] `landing_copy.md` — JSON-structured, all sections
- [ ] `seo_meta.md` — title, description, OG, Twitter Card
- [ ] `social_templates.md` — sharing copy for each report section
- [ ] `email_templates.md` — 3 templates (delivery, retake, partner invite)
- [ ] `launch_calendar.md` — 4-week plan, 3 posts/week

---

### Integration QA

- [ ] Question bank loaded into app
- [ ] Report schema matches frontend types
- [ ] System prompt wired into API route
- [ ] Copy injected into landing page
- [ ] Full flow smoke test passed
- [ ] PDF export renders correctly
- [ ] No placeholder data remains
- [ ] All branding says "Pairscope"
- [ ] Disclaimer text present
- [ ] Mobile responsive verified

---

### Spec Issues Log

| # | Issue | Severity | Decision | Date |
|---|-------|----------|----------|------|
| — | None yet | — | — | — |

### Revision Log

| Agent | Revision | Reason | Date |
|-------|----------|--------|------|
| — | None yet | — | — |
