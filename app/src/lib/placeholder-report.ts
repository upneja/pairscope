import { Report } from "./types";

export const placeholderReportRelationship: Report = {
  id: "rpt_demo_001",
  mode: "relationship",
  createdAt: new Date().toISOString(),
  overallSummary:
    "You're in a relationship that has real strengths — particularly in the fondness and admiration you hold for each other. But there are patterns worth paying attention to, especially around how you handle conflict and the emotional distance that can creep in when stress runs high.",
  disclaimerText:
    "Pairscope is an educational and self-reflection tool, not a substitute for licensed therapy or clinical diagnosis. This assessment adapts from validated instruments, but the consumer adaptation has not itself been independently validated. This report is for informational and self-awareness purposes only. If you are experiencing relationship crisis, domestic violence, or mental health emergencies, please contact a licensed professional or call the National Domestic Violence Hotline at 1-800-799-7233.",
  sections: [
    {
      id: "snapshot",
      title: "Your Relationship Snapshot",
      subtitle: "A bird's-eye view of where things stand",
      narrative:
        "Your overall satisfaction score puts you in a solid but not complacent place. You scored a 15 out of 21 on the Couples Satisfaction Index, which places you above the clinical cutoff for relationship distress (13.5). You're generally happy, but there's an undercurrent of unaddressed tension. Think of it like a house with strong bones that needs some interior work — the foundation is good, but a few rooms need attention.",
      visualization: {
        type: "meter",
        data: {
          value: 15,
          max: 21,
          threshold: 13.5,
          label: "Relationship Satisfaction",
        },
      },
      actionItems: [
        "Schedule a weekly 20-minute check-in with your partner — no screens, no logistics, just how you're each feeling.",
        "Notice and name one positive thing your partner does each day. Text it to them.",
      ],
      shareText:
        "My relationship satisfaction score is above the clinical threshold. Solid foundation, room to grow.",
    },
    {
      id: "conflict",
      title: "Your Conflict Signature",
      subtitle: "How you fight matters more than how often",
      narrative:
        "Your dominant conflict pattern is defensiveness, with a secondary tendency toward stonewalling. When your partner brings up an issue, your instinct is to protect yourself — explaining, justifying, counter-attacking. This is deeply human, but Gottman's research shows defensiveness is one of the four behaviors that predict relationship dissolution with roughly 90% accuracy. The good news: of the four patterns, defensiveness is the most responsive to conscious effort. You can learn to hear feedback without treating it as an attack.",
      visualization: {
        type: "radar",
        data: {
          criticism: 3,
          contempt: 2,
          defensiveness: 7,
          stonewalling: 5,
        },
        labels: ["Criticism", "Contempt", "Defensiveness", "Stonewalling"],
      },
      actionItems: [
        "When you feel the urge to defend, pause. Take one breath. Then say: \"Tell me more about that.\"",
        "Practice the Gottman repair attempt: \"I think I'm getting defensive. Can we slow down?\"",
        "Notice your body: jaw clenching, crossed arms, or a racing heart are early signals you're shifting into defense mode.",
      ],
      shareText:
        "Turns out my go-to in conflict is defensiveness. Working on hearing feedback without treating it as an attack.",
    },
    {
      id: "emotional_bank",
      title: "Emotional Bank Account",
      subtitle: "Your deposit-to-withdrawal ratio",
      narrative:
        "Gottman's research shows that stable relationships maintain a 5:1 ratio of positive to negative interactions. Based on your responses, your ratio sits around 3:1 — you're making deposits, but not quite enough to weather the withdrawals comfortably. The biggest drain appears to be \"turning away\" moments — times when your partner reaches out for connection and you're distracted or dismissive. These micro-moments add up more than big romantic gestures.",
      visualization: {
        type: "meter",
        data: {
          value: 3,
          max: 7,
          threshold: 5,
          label: "Positive-to-Negative Ratio",
        },
      },
      actionItems: [
        "When your partner shares something — even small — put down your phone and make eye contact.",
        "Add one intentional \"deposit\" daily: a compliment, a hug held for 6 seconds, or asking about their day with genuine curiosity.",
        "Track your ratio for one week. You'll be surprised what you notice.",
      ],
      shareText:
        "The magic ratio is 5:1 positive to negative interactions. I'm at 3:1. Time to make more deposits.",
    },
    {
      id: "attachment",
      title: "Attachment Dynamic Map",
      subtitle: "How your wiring shapes your connection",
      narrative:
        "You show a moderately anxious attachment style — you tend to seek reassurance, worry about the relationship, and sometimes interpret neutral signals as negative ones. This doesn't mean something is wrong with you. Attachment patterns form early and serve a purpose. But in adult relationships, anxious attachment can create a push-pull dynamic: the more you seek reassurance, the more an avoidant partner may withdraw, which increases your anxiety. Understanding this cycle is the first step to interrupting it.",
      visualization: {
        type: "spectrum",
        data: {
          anxiety: 5.2,
          avoidance: 2.1,
          maxValue: 7,
        },
      },
      actionItems: [
        "Before seeking reassurance, pause and ask: \"Is this anxiety talking, or is there a real issue?\"",
        "Develop self-soothing practices for moments of relationship anxiety.",
        "Communicate your needs directly rather than testing your partner to see if they'll notice.",
      ],
      shareText:
        "Learning about my attachment style — moderately anxious. Understanding the pattern is the first step.",
    },
    {
      id: "personality",
      title: "Personality & Your Relationship",
      subtitle: "What the research says about you as a partner",
      narrative:
        "A landmark 9-year study found that your own personality predicts your relationship satisfaction more than your partner's traits. Your profile shows moderately high neuroticism (68th percentile) and high conscientiousness (78th percentile). This is a common and interesting combination: you're reliable and follow through, but you also tend to worry and catastrophize. Your conscientiousness is a major asset — it means you show up. The neuroticism is your growth edge: learning to let small things go rather than spinning them into relationship-threatening narratives.",
      visualization: {
        type: "radar",
        data: {
          neuroticism: 3.4,
          conscientiousness: 3.9,
          agreeableness: 3.2,
        },
        labels: ["Neuroticism", "Conscientiousness", "Agreeableness"],
      },
      actionItems: [
        "When you notice catastrophic thinking, write down the thought. Then write the most realistic outcome. Compare.",
        "Lean into your conscientiousness: set relationship goals the way you set work goals.",
        "Practice the \"Is this a big deal in 5 years?\" test before raising an issue.",
      ],
      shareText:
        "Your own personality predicts relationship satisfaction more than your partner's. Here's what that means for me.",
    },
    {
      id: "love_languages",
      title: "Love Language Analysis",
      subtitle: "How you give and receive love",
      narrative:
        "Your primary love language is Quality Time, followed closely by Words of Affirmation. You feel most loved when someone is fully present with you — phones down, eyes up, genuinely engaged. The risk? If your partner's primary language is different (say, Acts of Service), they might be showing love by doing the dishes while you're craving a conversation. Neither of you is wrong — you're just speaking different dialects.",
      visualization: {
        type: "bar_chart",
        data: {
          quality_time: 8,
          words_of_affirmation: 7,
          physical_touch: 5,
          acts_of_service: 4,
          gifts: 2,
        },
        labels: [
          "Quality Time",
          "Words of Affirmation",
          "Physical Touch",
          "Acts of Service",
          "Gifts",
        ],
      },
      actionItems: [
        "Tell your partner your top love language — and ask about theirs.",
        "Try \"speaking\" their language for a week, even if it doesn't come naturally.",
        "Notice when your partner is showing love in their language, not yours.",
      ],
      shareText:
        "My top love language is Quality Time. Understanding this changes how I see my relationship.",
    },
    {
      id: "scripts",
      title: "Conversation Scripts",
      subtitle: "Words for your hardest moments",
      narrative:
        "Based on your patterns — defensiveness under criticism, anxious attachment, and a tendency to catastrophize — here are scripts designed for your specific growth edges. These aren't magic words. They're pattern interrupts: ways to break the cycle in the moment and create space for something better.",
      conversationScripts: [
        {
          situation:
            "When your partner criticizes you and you feel yourself getting defensive",
          script:
            "\"I can feel myself wanting to defend, but I want to hear you. Can you say that again? I'm listening this time.\"",
          explanation:
            "This acknowledges your pattern without letting it drive. It also signals safety to your partner.",
        },
        {
          situation:
            "When you're spiraling about the relationship and want reassurance",
          script:
            "\"I'm having one of those anxious moments. I don't need you to fix it — I just need to know we're okay.\"",
          explanation:
            "Naming the anxiety takes away its power. It also gives your partner a clear, doable request instead of a vague emotional test.",
        },
        {
          situation: "When you've been stonewalling and want to reconnect",
          script:
            "\"I shut down earlier and I'm sorry. I wasn't walking away from us — I was overwhelmed. Can we try again?\"",
          explanation:
            "This repairs the stonewalling rupture. Gottman's research shows that repair attempts are the #1 predictor of relationship stability.",
        },
      ],
      shareText:
        "Got personalized conversation scripts for my relationship patterns. This one hit home.",
    },
    {
      id: "retake",
      title: "Your Relationship Is a Living Thing",
      subtitle: "Come back in 90 days",
      narrative:
        "Relationships aren't static — they evolve, shift, and grow. This report is a snapshot of where you are right now. In 90 days, try the assessment again and see how your patterns have changed. Growth isn't always dramatic. Sometimes it's noticing that you paused before getting defensive, or that you asked for what you needed instead of testing whether your partner would figure it out.",
      actionItems: [
        "Set a calendar reminder for 90 days from now to retake the assessment.",
        "Pick one insight from this report to focus on this week.",
        "Share this report with your partner if it feels right — vulnerability is a strength.",
      ],
      shareText:
        "Just took a deep dive into my relationship patterns with Pairscope. Highly recommend.",
    },
  ],
};

export const placeholderReportSingle: Report = {
  id: "rpt_demo_002",
  mode: "single",
  createdAt: new Date().toISOString(),
  overallSummary:
    "You bring real strengths to relationships — conscientiousness, self-awareness, and a genuine desire to understand yourself. But there are patterns worth examining, particularly around avoidance and a tendency to retreat when things get emotionally intense.",
  disclaimerText:
    "Pairscope is an educational and self-reflection tool, not a substitute for licensed therapy or clinical diagnosis. This assessment adapts from validated instruments, but the consumer adaptation has not itself been independently validated. This report is for informational and self-awareness purposes only. If you are experiencing relationship crisis, domestic violence, or mental health emergencies, please contact a licensed professional or call the National Domestic Violence Hotline at 1-800-799-7233.",
  sections: [
    {
      id: "personality_profile",
      title: "Your Partner Personality Profile",
      subtitle: "What you bring to the table",
      narrative:
        "Your Big Five profile tells an interesting story. High conscientiousness (82nd percentile) means you're the person who follows through — reliable, organized, present. That's rarer and more valuable in relationships than people realize. Your neuroticism is moderate (45th percentile), which means you have enough emotional sensitivity to be empathetic without being consumed by anxiety. Your agreeableness is on the lower side (35th percentile), which isn't a flaw — it means you have clear boundaries and don't people-please. The challenge is making sure those boundaries don't become walls.",
      visualization: {
        type: "radar",
        data: {
          neuroticism: 2.3,
          conscientiousness: 4.1,
          agreeableness: 1.8,
        },
        labels: ["Neuroticism", "Conscientiousness", "Agreeableness"],
      },
      actionItems: [
        "Lean into your reliability — it's a relationship superpower.",
        "Practice distinguishing between healthy boundaries and emotional walls.",
        "Notice when you're holding back warmth to protect yourself.",
      ],
      shareText:
        "Just got my partner personality profile. High conscientiousness, lower agreeableness. Learning what that means.",
    },
    {
      id: "conflict_single",
      title: "Your Conflict Signature",
      subtitle: "Your default patterns across relationships",
      narrative:
        "Looking across your relationship history, your dominant conflict pattern is stonewalling — withdrawing and going quiet when things get heated. This is often the result of emotional flooding: your nervous system gets overwhelmed and shuts down to protect itself. The problem is that to your partner, silence feels like abandonment. Gottman's research shows that stonewalling is particularly damaging because it removes the possibility of resolution.",
      visualization: {
        type: "radar",
        data: {
          criticism: 2,
          contempt: 1,
          defensiveness: 4,
          stonewalling: 7,
        },
        labels: ["Criticism", "Contempt", "Defensiveness", "Stonewalling"],
      },
      actionItems: [
        "Learn to recognize flooding: racing heart, tight chest, blank mind. These are your signals.",
        "Practice the 20-minute rule: \"I need a break, but I'll be back in 20 minutes.\"",
        "After a stonewalling episode, always circle back. Don't let it dissolve into silence.",
      ],
      shareText:
        "My conflict signature: stonewalling. Understanding why I go quiet is the first step to changing it.",
    },
    {
      id: "attachment_blueprint",
      title: "Your Attachment Blueprint",
      subtitle: "The pattern that shapes all your connections",
      narrative:
        "You have a dismissive-avoidant attachment style. You value independence highly, sometimes at the expense of intimacy. You're comfortable alone, which is a strength — but in relationships, you may unconsciously keep partners at a distance. The classic avoidant cycle: things get close, you feel engulfed, you pull back, your partner pursues, you pull back more. Recognizing this pattern is powerful, because once you see it, you can choose differently.",
      visualization: {
        type: "spectrum",
        data: {
          anxiety: 2.0,
          avoidance: 5.5,
          maxValue: 7,
        },
      },
      actionItems: [
        "Notice when you create distance after moments of closeness. It's automatic — make it conscious.",
        "Practice staying present during vulnerable moments, even when every instinct says to retreat.",
        "Share something personal with someone you trust this week. Start small.",
      ],
      shareText:
        "Dismissive-avoidant attachment. Understanding why I pull away is changing how I think about relationships.",
    },
    {
      id: "risk_factors",
      title: "Your Relationship Risk Factors",
      subtitle: "Patterns to watch out for",
      narrative:
        "Based on your profile, your primary risk factors in future relationships are: emotional unavailability (driven by avoidant attachment), conflict avoidance that lets issues fester (stonewalling pattern), and difficulty expressing needs directly (lower agreeableness combined with avoidance). These aren't character flaws — they're protective strategies you developed. But in adult relationships, they can prevent the depth of connection you may actually want.",
      visualization: {
        type: "bar_chart",
        data: {
          emotional_unavailability: 7,
          conflict_avoidance: 6,
          difficulty_expressing_needs: 5,
          catastrophizing: 2,
          people_pleasing: 1,
        },
        labels: [
          "Emotional Unavailability",
          "Conflict Avoidance",
          "Difficulty Expressing Needs",
          "Catastrophizing",
          "People-Pleasing",
        ],
      },
      actionItems: [
        "In your next relationship, practice naming your emotions in real time, even simple ones.",
        "Set a personal rule: address issues within 48 hours instead of letting them slide.",
        "Consider working with a therapist on attachment patterns — these respond well to focused work.",
      ],
      shareText:
        "Learning about my relationship risk factors. Self-awareness is the first step.",
    },
    {
      id: "screen_for",
      title: "What to Screen For",
      subtitle: "Traits that complement (and clash with) your style",
      narrative:
        "Given your avoidant tendencies, you might be drawn to anxious partners — it's the classic anxious-avoidant trap. It feels like chemistry but it's actually two incompatible coping strategies triggering each other. Instead, look for partners who are securely attached: comfortable with closeness without being clingy, good at giving space without withdrawing. Signs of secure attachment in a partner: they communicate needs clearly, don't play games, and can tolerate disagreement without catastrophizing.",
      actionItems: [
        "Watch for the \"anxiety = chemistry\" trap. Calm doesn't mean boring.",
        "Notice how potential partners handle small conflicts early on — it predicts everything.",
        "Look for someone who can say \"I need space\" and \"I want to be close\" in the same week.",
      ],
      shareText:
        "Learning what traits to look for (and avoid) in future partners based on my attachment style.",
    },
    {
      id: "reflection",
      title: "Questions to Ask Yourself",
      subtitle: "Before your next serious relationship",
      narrative:
        "These reflection prompts are designed for your specific patterns. Sit with them. Journal about them. Discuss them with a trusted friend or therapist. There are no right answers — just honest ones.",
      actionItems: [
        "\"When was the last time I let someone truly see me — not the capable, independent version, but the uncertain, needing-something version?\"",
        "\"What would it look like to stay present in a relationship instead of keeping one foot out the door?\"",
        "\"Am I choosing independence because it's what I want, or because intimacy feels too risky?\"",
        "\"What would I have done differently in my last relationship if I'd understood these patterns?\"",
      ],
      shareText:
        "Just took a deep dive into my relationship patterns with Pairscope. The reflection questions hit different.",
    },
  ],
};
