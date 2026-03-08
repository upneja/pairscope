import { Report, ReportSection, ConversationScript } from "./types";

/**
 * Transforms Claude's API response (Agent 2 schema format) into the frontend's Report type.
 * Handles both Mode A (relationship) and Mode B (single) reports.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClaudeReport = any;

function formatLoveLanguage(lang: string): string {
  return lang
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function transformModeAReport(data: ClaudeReport): Report {
  const report = data.report;
  const sections: ReportSection[] = [];

  // 1. Relationship Snapshot
  if (report.relationship_snapshot) {
    const snap = report.relationship_snapshot;
    sections.push({
      id: "snapshot",
      title: "Your Relationship Snapshot",
      subtitle: snap.headline,
      narrative: snap.narrative,
      visualization: {
        type: "meter",
        data: {
          value: snap.csi_score,
          max: 21,
          threshold: 13.5,
          label: "Relationship Satisfaction",
        },
      },
      shareText: snap.headline,
    });
  }

  // 2. Conflict Signature
  if (report.conflict_signature) {
    const cs = report.conflict_signature;
    sections.push({
      id: "conflict",
      title: "Your Conflict Signature",
      subtitle: cs.headline,
      narrative: cs.narrative,
      visualization: {
        type: "radar",
        data: {
          criticism: cs.horseman_scores.criticism,
          contempt: cs.horseman_scores.contempt,
          defensiveness: cs.horseman_scores.defensiveness,
          stonewalling: cs.horseman_scores.stonewalling,
        },
        labels: ["Criticism", "Contempt", "Defensiveness", "Stonewalling"],
      },
      actionItems: [cs.what_to_do],
      shareText: cs.headline,
    });
  }

  // 3. Emotional Bank Account
  if (report.emotional_bank_account) {
    const eba = report.emotional_bank_account;
    const ratioNum = parseFloat(eba.positive_negative_ratio.split(":")[0]) || 3;
    sections.push({
      id: "emotional_bank",
      title: "Emotional Bank Account",
      subtitle: eba.headline,
      narrative: eba.narrative,
      visualization: {
        type: "meter",
        data: {
          value: ratioNum,
          max: 7,
          threshold: 5,
          label: "Positive-to-Negative Ratio",
        },
      },
      actionItems: [eba.what_to_do, ...eba.deposits.map((d: string) => `Deposit: ${d}`), ...eba.withdrawals.map((w: string) => `Watch out: ${w}`)],
      shareText: eba.headline,
    });
  }

  // 4. Attachment Dynamic Map
  if (report.attachment_dynamic) {
    const ad = report.attachment_dynamic;
    sections.push({
      id: "attachment",
      title: "Attachment Dynamic Map",
      subtitle: ad.headline,
      narrative: ad.narrative + (ad.partner_interaction_patterns ? "\n\n" + ad.partner_interaction_patterns : ""),
      visualization: {
        type: "spectrum",
        data: {
          anxiety: ad.anxiety_score,
          avoidance: ad.avoidance_score,
          maxValue: 7,
        },
      },
      actionItems: [ad.what_to_do],
      shareText: ad.headline,
    });
  }

  // 5. Personality Insights
  if (report.personality_insights) {
    const pi = report.personality_insights;
    sections.push({
      id: "personality",
      title: "Personality & Your Relationship",
      subtitle: pi.headline,
      narrative: pi.narrative,
      visualization: {
        type: "radar",
        data: {
          neuroticism: pi.big_five_scores.neuroticism,
          conscientiousness: pi.big_five_scores.conscientiousness,
          agreeableness: pi.big_five_scores.agreeableness,
        },
        labels: ["Neuroticism", "Conscientiousness", "Agreeableness"],
      },
      actionItems: [pi.what_to_do],
      shareText: pi.headline,
    });
  }

  // 6. Love Language Analysis
  if (report.love_language_analysis) {
    const lla = report.love_language_analysis;
    const langData: Record<string, number> = {};
    lla.full_ranking.forEach((lang: string, idx: number) => {
      langData[lang] = 10 - idx * 2; // Approximate scores from ranking
    });
    sections.push({
      id: "love_languages",
      title: "Love Language Analysis",
      subtitle: lla.headline,
      narrative: lla.narrative,
      visualization: {
        type: "bar_chart",
        data: langData,
        labels: lla.full_ranking.map(formatLoveLanguage),
      },
      actionItems: [lla.what_to_do],
      shareText: lla.headline,
    });
  }

  // 7. Conversation Scripts
  if (report.conversation_scripts) {
    const cs = report.conversation_scripts;
    const scripts: ConversationScript[] = cs.scripts.map(
      (s: { situation: string; your_typical_response: string; try_instead: string; why_it_works: string }) => ({
        situation: s.situation,
        script: s.try_instead,
        explanation: s.why_it_works,
      })
    );
    sections.push({
      id: "scripts",
      title: "Conversation Scripts",
      subtitle: cs.headline,
      narrative:
        "Based on your unique patterns, here are scripts designed for your specific growth edges. These are pattern interrupts: ways to break the cycle in the moment and create space for something better.",
      conversationScripts: scripts,
      shareText: cs.headline,
    });
  }

  // 8. Retake Prompt
  if (report.retake_prompt) {
    const rp = report.retake_prompt;
    sections.push({
      id: "retake",
      title: "Your Relationship Is a Living Thing",
      subtitle: "Come back in 90 days",
      narrative: rp.message,
      actionItems: [
        `Set a calendar reminder for ${rp.next_date} to retake the assessment.`,
        "Pick one insight from this report to focus on this week.",
        "Share this report with your partner if it feels right.",
      ],
      shareText:
        "Just took a deep dive into my relationship patterns with Pairscope.",
    });
  }

  return {
    id: `rpt_${Date.now()}`,
    mode: "relationship",
    createdAt: data.metadata?.generated_at || new Date().toISOString(),
    sections,
    overallSummary:
      report.relationship_snapshot?.narrative?.split("\n")[0] ||
      "Your personalized relationship health report is ready.",
    disclaimerText:
      data.metadata?.disclaimer ||
      "Pairscope is an educational self-reflection tool, not a substitute for licensed therapy or clinical diagnosis.",
  };
}

function transformModeBReport(data: ClaudeReport): Report {
  const report = data.report;
  const sections: ReportSection[] = [];

  // 1. Partner Personality Profile
  if (report.partner_personality_profile) {
    const pp = report.partner_personality_profile;
    sections.push({
      id: "personality_profile",
      title: "Your Partner Personality Profile",
      subtitle: pp.headline,
      narrative: pp.narrative,
      visualization: {
        type: "radar",
        data: {
          neuroticism: pp.big_five_scores.neuroticism,
          conscientiousness: pp.big_five_scores.conscientiousness,
          agreeableness: pp.big_five_scores.agreeableness,
        },
        labels: ["Neuroticism", "Conscientiousness", "Agreeableness"],
      },
      actionItems: [pp.what_to_do],
      shareText: pp.headline,
    });
  }

  // 2. Conflict Signature
  if (report.conflict_signature) {
    const cs = report.conflict_signature;
    sections.push({
      id: "conflict_single",
      title: "Your Conflict Signature",
      subtitle: cs.headline,
      narrative: cs.narrative,
      visualization: {
        type: "radar",
        data: {
          criticism: cs.horseman_scores.criticism,
          contempt: cs.horseman_scores.contempt,
          defensiveness: cs.horseman_scores.defensiveness,
          stonewalling: cs.horseman_scores.stonewalling,
        },
        labels: ["Criticism", "Contempt", "Defensiveness", "Stonewalling"],
      },
      actionItems: [cs.what_to_do],
      shareText: cs.headline,
    });
  }

  // 3. Attachment Blueprint
  if (report.attachment_blueprint) {
    const ab = report.attachment_blueprint;
    sections.push({
      id: "attachment_blueprint",
      title: "Your Attachment Blueprint",
      subtitle: ab.headline,
      narrative: ab.narrative,
      visualization: {
        type: "spectrum",
        data: {
          anxiety: ab.anxiety_score,
          avoidance: ab.avoidance_score,
          maxValue: 7,
        },
      },
      actionItems: [
        ab.what_to_do,
        ...ab.triggers.map((t: string) => `Trigger: ${t}`),
        ...ab.what_you_seek.map((s: string) => `You seek: ${s}`),
      ],
      shareText: ab.headline,
    });
  }

  // 4. Relationship Risk Factors
  if (report.relationship_risk_factors) {
    const rrf = report.relationship_risk_factors;
    const riskData: Record<string, number> = {};
    const riskLabels: string[] = [];
    rrf.risk_factors.forEach((rf: { factor: string; severity: string; explanation: string }) => {
      const score = rf.severity === "high" ? 8 : rf.severity === "moderate" ? 5 : 2;
      riskData[rf.factor.toLowerCase().replace(/\s+/g, "_")] = score;
      riskLabels.push(rf.factor);
    });
    sections.push({
      id: "risk_factors",
      title: "Your Relationship Risk Factors",
      subtitle: rrf.headline,
      narrative: rrf.narrative,
      visualization: {
        type: "bar_chart",
        data: riskData,
        labels: riskLabels,
      },
      actionItems: [
        rrf.what_to_do,
        ...rrf.risk_factors.map(
          (rf: { factor: string; severity: string; explanation: string }) =>
            `${rf.factor} (${rf.severity}): ${rf.explanation}`
        ),
      ],
      shareText: rrf.headline,
    });
  }

  // 5. What to Screen For
  if (report.what_to_screen_for) {
    const wtf = report.what_to_screen_for;
    sections.push({
      id: "screen_for",
      title: "What to Screen For",
      subtitle: wtf.headline,
      narrative: wtf.narrative,
      actionItems: [
        ...wtf.green_flags.map((f: string) => `Green flag: ${f}`),
        ...wtf.red_flags.map((f: string) => `Red flag: ${f}`),
      ],
      shareText: wtf.headline,
    });
  }

  // 6. Reflection Questions
  if (report.reflection_questions) {
    const rq = report.reflection_questions;
    sections.push({
      id: "reflection",
      title: "Questions to Ask Yourself",
      subtitle: rq.headline,
      narrative:
        "These reflection prompts are designed for your specific patterns. Sit with them. Journal about them. There are no right answers -- only honest ones.",
      actionItems: rq.questions.map(
        (q: { question: string; context: string }) =>
          `${q.question} -- ${q.context}`
      ),
      shareText: rq.headline,
    });
  }

  return {
    id: `rpt_${Date.now()}`,
    mode: "single",
    createdAt: data.metadata?.generated_at || new Date().toISOString(),
    sections,
    overallSummary:
      report.partner_personality_profile?.narrative?.split("\n")[0] ||
      "Your personalized relationship insights report is ready.",
    disclaimerText:
      data.metadata?.disclaimer ||
      "Pairscope is an educational self-reflection tool, not a substitute for licensed therapy or clinical diagnosis.",
  };
}

export function transformClaudeResponse(data: ClaudeReport): Report {
  if (data.mode === "b") {
    return transformModeBReport(data);
  }
  return transformModeAReport(data);
}
