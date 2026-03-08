"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.9,
      ease: "easeOut" as const,
    },
  }),
};

const frameworks = [
  {
    name: "Gottman\u2019s Research",
    stat: "50+ years",
    desc: "John Gottman\u2019s lab has studied thousands of couples. His \u2018Four Horsemen\u2019 model predicts relationship outcomes with roughly 90% accuracy. Pairscope identifies which patterns you default to.",
  },
  {
    name: "Attachment Theory",
    stat: "Predicts 22% of conflict behavior",
    desc: "Your attachment style doesn\u2019t just affect how you feel \u2014 it predicts how you fight. Pairscope maps your attachment orientation and shows you what it means in practice.",
  },
  {
    name: "Big Five Personality",
    stat: "9-year longitudinal study",
    desc: "Research on 972 couples found that your own personality predicts your relationship satisfaction more than your partner\u2019s. Pairscope focuses on the three traits that matter most.",
  },
  {
    name: "Couples Satisfaction Index",
    stat: "5,315 participants validated",
    desc: "The CSI is the gold standard for measuring relationship satisfaction, developed using Item Response Theory across eight prior validated scales.",
  },
  {
    name: "Love Languages",
    stat: "High consumer recognition",
    desc: "Combined with Gottman\u2019s emotional bank account concept, Pairscope identifies where your giving and receiving styles diverge \u2014 and what to do about it.",
  },
];

const steps = [
  {
    number: "01",
    title: "Answer honestly",
    desc: "40 questions designed by relationship researchers. Scenario-based, not clinical. You\u2019ll recognize yourself in every answer option.",
  },
  {
    number: "02",
    title: "AI synthesizes your results",
    desc: "Your responses are scored across five scientific frameworks \u2014 Gottman, attachment theory, Big Five personality, and more \u2014 then woven into a single narrative by AI.",
  },
  {
    number: "03",
    title: "Get your report",
    desc: "A personalized Relationship Health Report with real insights, specific conversation scripts, and a clear picture of your strengths and blind spots.",
  },
];

const faqItems = [
  {
    question: "Is this just another personality quiz?",
    answer:
      "No. Personality quizzes are designed to be fun and shareable. Pairscope is designed to be accurate. Every question maps to a validated scientific instrument \u2014 Gottman\u2019s Four Horsemen Questionnaire, the ECR-R attachment scale, the Big Five Inventory, and the Couples Satisfaction Index. We adapted the wording to be conversational, but the psychometric structure is preserved.",
  },
  {
    question: "Can AI really understand my relationship?",
    answer:
      "The AI doesn\u2019t diagnose your relationship \u2014 the science does. Your answers are scored against validated research frameworks with established clinical thresholds. The AI\u2019s role is synthesis: it takes your scored dimensions and weaves them into a coherent, personalized narrative. Think of it as a brilliant research assistant writing up your results.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. You don\u2019t need to create an account to take the assessment or view your report. If you choose to save your report via email, that\u2019s the only personal data we store. We never sell data. We never share individual responses. Full privacy policy available in the footer.",
  },
  {
    question: "I\u2019m single. Is this still useful for me?",
    answer:
      "Absolutely \u2014 it might even be more useful. The solo mode analyzes your patterns across past relationships and your personality tendencies. Research shows your own traits predict relationship satisfaction more than your partner\u2019s. Understanding yourself before your next relationship is one of the highest-leverage things you can do.",
  },
  {
    question: "Is this a replacement for therapy?",
    answer:
      "No, and it\u2019s not trying to be. Pairscope is an educational and self-awareness tool. Think of it like a blood panel for your relationship health \u2014 it can reveal patterns and give you language for what you\u2019re experiencing, but it\u2019s not treatment. If your report surfaces something serious, we include resources for finding professional support.",
  },
  {
    question: "How long does it take?",
    answer:
      "About 10 minutes for the assessment. Your report is generated in under 30 seconds. Reading and digesting it \u2014 that might take longer.",
  },
  {
    question: "Can my partner take it too?",
    answer:
      "Yes. After you get your report, you can invite your partner to take their own independent assessment. Each person gets their own report. A combined couples analysis is on our roadmap.",
  },
];

const stats = [
  { value: "50+", label: "Years of research synthesized" },
  { value: "5", label: "Validated frameworks" },
  { value: "6,000+", label: "Participants in source studies" },
  { value: "90%", label: "Gottman\u2019s prediction accuracy" },
];

export default function LandingPage() {
  return (
    <div className="grain min-h-screen bg-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-card-border/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <span className="font-display italic text-2xl text-warm-black">
            Pairscope
          </span>
          <Link
            href="/assess"
            className="text-sm text-terra hover:text-terra-light transition-colors duration-700"
          >
            Take the Assessment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Decorative organic blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-br from-terra/15 to-sage/10 opacity-20 blur-3xl animate-[morph_8s_ease-in-out_infinite] animate-[breathe_6s_ease-in-out_infinite]"
          aria-hidden="true"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animation:
              "morph 8s ease-in-out infinite, breathe 6s ease-in-out infinite",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl text-warm-black leading-tight"
            style={{ letterSpacing: "-0.02em" }}
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            See your relationship clearly.
          </motion.h1>
          <motion.p
            className="mt-8 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            A free, research-backed diagnostic that shows you how you show up in
            relationships &mdash; whether you&apos;re in one or not.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            <Link
              href="/assess"
              className="inline-block mt-12 px-10 py-4 bg-terra text-warm-white font-medium rounded-full text-lg hover:bg-terra-light transition-all duration-700 shadow-lg shadow-terra/15"
            >
              Take the Assessment
            </Link>
            <p className="mt-5 text-sm text-text-muted">
              Free. Private. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 bg-warm-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <p className="font-display text-3xl sm:text-4xl text-text-on-dark">
                  {stat.value}
                </p>
                <p className="text-sm text-text-on-dark-muted mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-black"
              style={{ letterSpacing: "-0.02em" }}
            >
              How It Works
            </h2>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Three steps. Ten minutes. One report you&apos;ll actually want to
              read.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="bg-cream-dark/50 border border-card-border/50 rounded-2xl p-8 transition-all duration-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
              >
                <span className="text-terra text-sm font-semibold tracking-wide">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-warm-black mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-32 px-6 bg-warm-dark">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl text-text-on-dark"
              style={{ letterSpacing: "-0.02em" }}
            >
              The Science
            </h2>
            <p className="mt-6 text-lg text-text-on-dark-muted max-w-2xl mx-auto leading-relaxed">
              This isn&apos;t a personality quiz. It&apos;s five decades of
              research, synthesized.
            </p>
            <p className="mt-4 text-text-on-dark-muted max-w-2xl mx-auto text-sm leading-relaxed">
              Pairscope draws from the same validated instruments used in
              clinical research &mdash; adapted into language that actually makes
              sense. Each question maps to a specific scientific dimension. Each
              insight in your report traces back to peer-reviewed findings.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                className="bg-warm-dark-light border border-warm-dark-lighter/30 rounded-2xl p-7 transition-all duration-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
              >
                <h3 className="text-lg font-semibold text-text-on-dark mb-2">
                  {fw.name}
                </h3>
                <p className="text-sm text-terra font-semibold mb-3">
                  {fw.stat}
                </p>
                <p className="text-text-on-dark-muted text-sm leading-relaxed">
                  {fw.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-black"
              style={{ letterSpacing: "-0.02em" }}
            >
              Built for you
            </h2>
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re navigating a relationship or preparing for
              your next one.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div
              className="bg-card border border-card-border rounded-2xl p-8 border-l-4 border-l-terra hover:shadow-lg hover:-translate-y-1 transition-all duration-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
            >
              <h3
                className="font-display text-2xl text-warm-black mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                In a Relationship
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Get a diagnostic of your current dynamic &mdash; your conflict
                patterns, emotional bank account, attachment interplay, and
                specific conversation scripts for your weak spots.
              </p>
              <p className="text-sm text-terra font-semibold">~45 questions</p>
            </motion.div>
            <motion.div
              className="bg-card border border-card-border rounded-2xl p-8 border-l-4 border-l-sage hover:shadow-lg hover:-translate-y-1 transition-all duration-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
            >
              <h3
                className="font-display text-2xl text-warm-black mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                Flying Solo
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Understand your patterns across past relationships. See your
                attachment blueprint, risk factors, and what to look for (and
                screen for) next time.
              </p>
              <p className="text-sm text-sage-dark font-semibold">
                ~35 questions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl text-center text-warm-black mb-20"
            style={{ letterSpacing: "-0.02em" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            Questions you&apos;re already asking
          </motion.h2>
          <div className="space-y-0">
            {faqItems.map((item, i) => (
              <motion.details
                key={i}
                className="group border-b border-card-border overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <summary className="cursor-pointer py-6 text-warm-black font-semibold text-lg flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="text-terra ml-4 text-xl group-open:rotate-45 transition-transform duration-700 flex-shrink-0">
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <p className="text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-warm-dark">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl text-text-on-dark mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              You already know something could be better.
            </h2>
            <p className="text-lg text-text-on-dark-muted leading-relaxed max-w-xl mx-auto">
              Now find out what &mdash; and what to do about it.
            </p>
            <Link
              href="/assess"
              className="inline-block mt-12 px-10 py-4 bg-terra text-warm-white font-medium rounded-full text-lg hover:bg-terra-light transition-all duration-700 shadow-lg shadow-terra/15"
            >
              Take the Assessment
            </Link>
            <p className="mt-5 text-sm text-text-on-dark-muted">
              Free. 10 minutes. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-warm-dark border-t border-warm-dark-lighter/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <span className="font-display italic text-xl text-text-on-dark">
              Pairscope
            </span>
            <p className="text-xs text-text-on-dark-muted max-w-md text-center sm:text-right leading-relaxed">
              Pairscope is an educational self-awareness tool, not a substitute
              for licensed therapy or clinical diagnosis. If you are experiencing
              a relationship crisis or mental health emergency, please contact a
              professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
