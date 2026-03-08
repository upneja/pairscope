# Pairscope Landing Page Copy

All copy below is JSON-structured for direct frontend import.

---

## Taglines (Ranked)

1. **"See your relationship clearly."** -- Simple, active, implies the diagnostic lens without being clinical. Works for singles and couples.
2. **"Understand yourself as a partner."** -- The current working tagline. Strong, direct, and correctly positions the product as self-focused.
3. **"The research says more than your gut does."** -- Provocative, hooks the skeptic/data crowd, differentiates from vibes-based tools.
4. **"What 50 years of relationship science reveals about you."** -- Credibility-forward. Strong for SEO and authority positioning.
5. **"Your relationship patterns, decoded."** -- Clean and contemporary. Works across both modes.

---

## Landing Page JSON

```json
{
  "hero": {
    "headlines": [
      "See your relationship clearly.",
      "What 50 years of science reveals about how you love.",
      "Your relationship patterns, decoded."
    ],
    "subheadlines": [
      "A free, research-backed diagnostic that shows you how you show up in relationships — whether you're in one or not.",
      "Pairscope synthesizes five validated psychology frameworks into a single personalized report. No account required. Takes 10 minutes.",
      "Not a quiz. Not therapy. A diagnostic grounded in decades of relationship research, powered by AI, and built for real self-knowledge."
    ],
    "cta_text": "Take the Assessment",
    "cta_subtext": "Free. Private. No signup required."
  },

  "social_proof_bar": {
    "items": [
      "Based on 5 validated research frameworks",
      "Grounded in 50+ years of relationship science",
      "Works for singles and couples"
    ]
  },

  "how_it_works": {
    "section_title": "How It Works",
    "section_subtitle": "Three steps. Ten minutes. One report you'll actually want to read.",
    "steps": [
      {
        "step_number": 1,
        "title": "Answer honestly",
        "description": "40 questions designed by relationship researchers. Scenario-based, not clinical. You'll recognize yourself in every answer option.",
        "icon_suggestion": "chat-bubble"
      },
      {
        "step_number": 2,
        "title": "AI synthesizes your results",
        "description": "Your responses are scored across five scientific frameworks — Gottman, attachment theory, Big Five personality, and more — then woven into a single narrative by AI.",
        "icon_suggestion": "brain-circuit"
      },
      {
        "step_number": 3,
        "title": "Get your report",
        "description": "A personalized Relationship Health Report with real insights, specific conversation scripts, and a clear picture of your strengths and blind spots.",
        "icon_suggestion": "document-chart"
      }
    ]
  },

  "science": {
    "section_title": "The Science",
    "section_subtitle": "This isn't a personality quiz. It's five decades of research, synthesized.",
    "intro_text": "Pairscope draws from the same validated instruments used in clinical research — adapted into language that actually makes sense. Each question maps to a specific scientific dimension. Each insight in your report traces back to peer-reviewed findings.",
    "frameworks": [
      {
        "name": "Gottman's Research",
        "stat": "50+ years",
        "description": "John Gottman's lab has studied thousands of couples. His 'Four Horsemen' model predicts relationship outcomes with roughly 90% accuracy. Pairscope identifies which patterns you default to."
      },
      {
        "name": "Attachment Theory",
        "stat": "Predicts 22% of conflict behavior",
        "description": "Your attachment style doesn't just affect how you feel — it predicts how you fight. Pairscope maps your attachment orientation and shows you what it means in practice."
      },
      {
        "name": "Big Five Personality",
        "stat": "9-year longitudinal study",
        "description": "Research on 972 couples found that your own personality predicts your relationship satisfaction more than your partner's. Pairscope focuses on the three traits that matter most."
      },
      {
        "name": "Couples Satisfaction Index",
        "stat": "5,315 participants validated",
        "description": "The CSI is the gold standard for measuring relationship satisfaction, developed using Item Response Theory across eight prior validated scales."
      },
      {
        "name": "Love Languages",
        "stat": "High consumer recognition",
        "description": "Combined with Gottman's emotional bank account concept, Pairscope identifies where your giving and receiving styles diverge — and what to do about it."
      }
    ],
    "closing_text": "Every number in your report connects to real research. Every recommendation is grounded in evidence. We just made it readable."
  },

  "modes": {
    "section_title": "Built for You — Whether You're In a Relationship or Not",
    "options": [
      {
        "mode": "in_relationship",
        "title": "In a Relationship",
        "description": "Get a diagnostic of your current dynamic — your conflict patterns, emotional bank account, attachment interplay, and specific conversation scripts for your weak spots.",
        "question_count": "~45 questions"
      },
      {
        "mode": "single",
        "title": "Flying Solo",
        "description": "Understand your patterns across past relationships. See your attachment blueprint, risk factors, and what to look for (and screen for) next time.",
        "question_count": "~35 questions"
      }
    ]
  },

  "faq": {
    "section_title": "Questions You're Already Asking",
    "items": [
      {
        "question": "Is this just another personality quiz?",
        "answer": "No. Personality quizzes are designed to be fun and shareable. Pairscope is designed to be accurate. Every question maps to a validated scientific instrument — Gottman's Four Horsemen Questionnaire, the ECR-R attachment scale, the Big Five Inventory, and the Couples Satisfaction Index. We adapted the wording to be conversational, but the psychometric structure is preserved."
      },
      {
        "question": "Can AI really understand my relationship?",
        "answer": "The AI doesn't diagnose your relationship — the science does. Your answers are scored against validated research frameworks with established clinical thresholds. The AI's role is synthesis: it takes your scored dimensions and weaves them into a coherent, personalized narrative. Think of it as a brilliant research assistant writing up your results."
      },
      {
        "question": "Is my data private?",
        "answer": "Yes. You don't need to create an account to take the assessment or view your report. If you choose to save your report via email, that's the only personal data we store. We never sell data. We never share individual responses. Full privacy policy available in the footer."
      },
      {
        "question": "I'm single. Is this still useful for me?",
        "answer": "Absolutely — it might even be more useful. The solo mode analyzes your patterns across past relationships and your personality tendencies. Research shows your own traits predict relationship satisfaction more than your partner's. Understanding yourself before your next relationship is one of the highest-leverage things you can do."
      },
      {
        "question": "Is this a replacement for therapy?",
        "answer": "No, and it's not trying to be. Pairscope is an educational and self-awareness tool. Think of it like a blood panel for your relationship health — it can reveal patterns and give you language for what you're experiencing, but it's not treatment. If your report surfaces something serious, we include resources for finding professional support."
      },
      {
        "question": "How long does it take?",
        "answer": "About 10 minutes for the assessment. Your report is generated in under 30 seconds. Reading and digesting it — that might take longer."
      },
      {
        "question": "Can my partner take it too?",
        "answer": "Yes. After you get your report, you can invite your partner to take their own independent assessment. Each person gets their own report. A combined couples analysis is on our roadmap."
      }
    ]
  },

  "footer_cta": {
    "headline": "You already know something could be better.",
    "subheadline": "Now find out what — and what to do about it.",
    "cta_text": "Take the Assessment",
    "cta_subtext": "Free. 10 minutes. No signup required.",
    "disclaimer": "Pairscope is an educational self-awareness tool, not a substitute for licensed therapy or clinical diagnosis. If you are experiencing a relationship crisis or mental health emergency, please contact a professional."
  }
}
```
