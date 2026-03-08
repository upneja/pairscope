# Pairscope

**The 23andMe of your relationship.** A free, AI-powered relationship health diagnostic grounded in 50+ years of relationship science.

Take an assessment, receive a personalized Relationship Health Report with actionable insights and conversation scripts.

## What It Does

Pairscope synthesizes five validated research frameworks into one coherent, consumer-friendly assessment:

- **Gottman's Sound Relationship House** — Four Horsemen detection, love maps, fondness/admiration
- **Attachment Theory** — Anxiety and avoidance dimensions via ECR-R adaptation
- **Big Five Personality Traits** — Neuroticism, conscientiousness, and agreeableness (the relationship-critical dimensions)
- **Couples Satisfaction Index (CSI-4)** — Gold-standard satisfaction measurement
- **Love Languages + Emotional Bank Account** — Actionable behavioral insights

## Two Modes

| Mode | For | Questions | Focus |
|------|-----|-----------|-------|
| **In a Relationship** | People in current relationships | ~45 | Current dynamics, conflict patterns, satisfaction |
| **Flying Solo** | Singles between relationships | ~35 | Personal patterns, attachment blueprint, risk factors |

## The Report

The report is the product. It reads like advice from a brilliant, warm friend who happens to have a PhD in relationship psychology:

- **Narrative, not numeric** — Stories about you, not scores out of 10
- **Visual anchors** — Radar charts, spectrum bars, emotional bank account meters
- **Actionable** — Every insight ends with "what to do about it" + specific conversation scripts
- **Shareable** — Each section is designed as a standalone screenshottable card
- **Exportable** — Full PDF export preserving the visual design

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Assessment Engine:** Static question bank (JSON), client-side scoring with validated rubrics
- **AI Synthesis:** Claude API for personalized narrative report generation
- **PDF Export:** html2canvas + jsPDF
- **Deploy:** Vercel

## Project Structure

```
pairscope/
├── app/                          # Next.js application
├── agents/
│   ├── agent1_research/          # Question bank & scoring rubrics
│   ├── agent2_ai_report/         # System prompt & report schema
│   ├── agent3_frontend/          # Frontend brief
│   └── agent4_brand/             # Brand copy & marketing
├── ORCHESTRATOR.md               # Build orchestration plan
├── DASHBOARD.md                  # Live build progress tracker
└── relationship_mri_spec.md      # Product specification
```

## Development

```bash
cd app
npm install
npm run dev
```

## Disclaimer

Pairscope is an educational and self-reflection tool, not a substitute for licensed therapy or clinical diagnosis. The assessment adapts from validated instruments but the consumer adaptation has not itself been independently validated. For informational and self-awareness purposes only. If you're experiencing relationship crisis, domestic violence, or mental health emergencies, please contact appropriate professional resources.

## License

MIT
