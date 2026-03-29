# Pairscope

**The 23andMe of your relationship.** A free, AI-powered relationship health diagnostic grounded in 50+ years of peer-reviewed research — Gottman, Attachment Theory, Big Five, CSI-4, and Love Languages.

Take a 10-minute assessment. Get a narrative report with visualizations and ready-to-use conversation scripts, personalized by Claude AI. No account required.

---

## What It Does

Pairscope synthesizes five validated research frameworks into one consumer-friendly assessment:

| Framework | Signal Measured |
|-----------|----------------|
| **Gottman's Sound Relationship House** | Four Horsemen patterns, love maps, fondness/admiration |
| **Attachment Theory (ECR-R adaptation)** | Anxiety and avoidance dimensions |
| **Big Five Personality (BFI)** | Neuroticism, conscientiousness, agreeableness |
| **Couples Satisfaction Index (CSI-4)** | Gold-standard satisfaction score (5,315-participant validated) |
| **Love Languages + Emotional Bank Account** | Giving/receiving style mismatch |

### Two Assessment Modes

| Mode | Questions | For |
|------|-----------|-----|
| **In a Relationship** | ~45 | Current dynamics, conflict patterns, satisfaction |
| **Flying Solo** | ~35 | Personal attachment blueprint, patterns across past relationships |

### The Report

- Narrative prose — reads like advice from a friend with a PhD in psychology, not a score table
- Interactive visualizations: radar charts, spectrum bars, emotional bank account meters (Recharts)
- Actionable section per dimension: what you scored, why it matters, what to do
- Conversation scripts tailored to your specific weak spots
- PDF export via html2canvas + jsPDF

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4, custom warm-luxury design system |
| Animation | Framer Motion |
| Charts | Recharts |
| AI | Claude API (`@anthropic-ai/sdk`) — streaming narrative generation |
| PDF | html2canvas + jsPDF |
| Deploy | Vercel |

---

## Architecture

```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── assess/
│   │   │   ├── page.tsx              # Mode selection (relationship / solo)
│   │   │   ├── depth/page.tsx        # Quick vs. deep assessment
│   │   │   ├── pre-knowledge/page.tsx # Self-reported context (attachment, love language)
│   │   │   ├── [mode]/page.tsx       # Adaptive question flow
│   │   │   └── processing/page.tsx   # Scoring + Claude API call + animation
│   │   ├── report/
│   │   │   └── [id]/page.tsx         # Dynamic report viewer
│   │   └── api/
│   │       └── generate-report/      # Claude API route (server-side)
│   ├── components/
│   │   ├── report-section-card.tsx   # Shareable report card component
│   │   └── visualizations.tsx        # Recharts visualization components
│   └── lib/
│       ├── types.ts                  # Full TypeScript interface definitions
│       ├── scoring.ts                # Client-side scoring engine (V1 + V2 weighted)
│       ├── questions.ts              # Question bank loader
│       ├── report-transformer.ts     # Converts Claude JSON → Report type
│       └── pdf-export.ts             # html2canvas + jsPDF export
```

**Key design decisions:**
- Scoring runs entirely client-side — no raw answers leave the browser
- Claude only receives computed dimension scores (not individual answers)
- Session storage for state; no database required
- Adaptive branching: follow-up questions trigger when dimension scores cross clinical thresholds

---

## Running Locally

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Setup

```bash
# Clone the repo
git clone https://github.com/upneja/pairscope.git
cd pairscope/app

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Add your key: ANTHROPIC_API_KEY=sk-ant-...

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key for report generation |

---

## Design System

Pairscope uses a bespoke warm-luxury palette built on Tailwind v4's `@theme`:

- **Typography:** Fraunces (display/italic logo), DM Sans (body)
- **Colors:** Cream `#faf8f5`, Terra `#c47a5a`, Sage `#7a9a8a`, Warm Black `#2d2a26`
- **Aesthetic direction:** editorial warmth — deliberate grain texture, organic blob animations, no purple gradients

---

## Disclaimer

Pairscope is an educational and self-reflection tool, not a substitute for licensed therapy or clinical diagnosis. Assessment adapts from validated instruments but has not itself been independently validated as a consumer product. If you are experiencing a relationship crisis, domestic violence, or mental health emergency, please contact appropriate professional resources.

---

## License

MIT
