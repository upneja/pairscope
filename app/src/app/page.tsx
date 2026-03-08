"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const frameworks = [
  {
    name: "Gottman's Research",
    stat: "50+ years",
    desc: "John Gottman's lab has studied thousands of couples. His 'Four Horsemen' model predicts relationship outcomes with roughly 90% accuracy. Pairscope identifies which patterns you default to.",
  },
  {
    name: "Attachment Theory",
    stat: "Predicts 22% of conflict behavior",
    desc: "Your attachment style doesn't just affect how you feel — it predicts how you fight. Pairscope maps your attachment orientation and shows you what it means in practice.",
  },
  {
    name: "Big Five Personality",
    stat: "9-year longitudinal study",
    desc: "Research on 972 couples found that your own personality predicts your relationship satisfaction more than your partner's. Pairscope focuses on the three traits that matter most.",
  },
  {
    name: "Couples Satisfaction Index",
    stat: "5,315 participants validated",
    desc: "The CSI is the gold standard for measuring relationship satisfaction, developed using Item Response Theory across eight prior validated scales.",
  },
  {
    name: "Love Languages",
    stat: "High consumer recognition",
    desc: "Combined with Gottman's emotional bank account concept, Pairscope identifies where your giving and receiving styles diverge — and what to do about it.",
  },
];

const steps = [
  {
    number: "01",
    title: "Answer honestly",
    desc: "40 questions designed by relationship researchers. Scenario-based, not clinical. You'll recognize yourself in every answer option.",
  },
  {
    number: "02",
    title: "AI synthesizes your results",
    desc: "Your responses are scored across five scientific frameworks — Gottman, attachment theory, Big Five personality, and more — then woven into a single narrative by AI.",
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
    answer: "No. Personality quizzes are designed to be fun and shareable. Pairscope is designed to be accurate. Every question maps to a validated scientific instrument — Gottman's Four Horsemen Questionnaire, the ECR-R attachment scale, the Big Five Inventory, and the Couples Satisfaction Index. We adapted the wording to be conversational, but the psychometric structure is preserved.",
  },
  {
    question: "Can AI really understand my relationship?",
    answer: "The AI doesn't diagnose your relationship — the science does. Your answers are scored against validated research frameworks with established clinical thresholds. The AI's role is synthesis: it takes your scored dimensions and weaves them into a coherent, personalized narrative. Think of it as a brilliant research assistant writing up your results.",
  },
  {
    question: "Is my data private?",
    answer: "Yes. You don't need to create an account to take the assessment or view your report. If you choose to save your report via email, that's the only personal data we store. We never sell data. We never share individual responses. Full privacy policy available in the footer.",
  },
  {
    question: "I'm single. Is this still useful for me?",
    answer: "Absolutely — it might even be more useful. The solo mode analyzes your patterns across past relationships and your personality tendencies. Research shows your own traits predict relationship satisfaction more than your partner's. Understanding yourself before your next relationship is one of the highest-leverage things you can do.",
  },
  {
    question: "Is this a replacement for therapy?",
    answer: "No, and it's not trying to be. Pairscope is an educational and self-awareness tool. Think of it like a blood panel for your relationship health — it can reveal patterns and give you language for what you're experiencing, but it's not treatment. If your report surfaces something serious, we include resources for finding professional support.",
  },
  {
    question: "How long does it take?",
    answer: "About 10 minutes for the assessment. Your report is generated in under 30 seconds. Reading and digesting it — that might take longer.",
  },
  {
    question: "Can my partner take it too?",
    answer: "Yes. After you get your report, you can invite your partner to take their own independent assessment. Each person gets their own report. A combined couples analysis is on our roadmap.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-tight text-white">
            Pairscope
          </span>
          <Link
            href="/assess"
            className="text-sm text-coral hover:text-coral-light transition-colors"
          >
            Take the Assessment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            See your relationship
            <br />
            <span className="text-coral">clearly.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-slate-light max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            A free, research-backed diagnostic that shows you how you show up
            in relationships — whether you&apos;re in one or not.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            <Link
              href="/assess"
              className="inline-block mt-10 px-8 py-4 bg-coral text-white font-semibold rounded-xl text-lg hover:bg-coral-light transition-colors shadow-lg shadow-coral/20"
            >
              Take the Assessment
            </Link>
            <p className="mt-4 text-sm text-slate-mid">
              Free. Private. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Research Strip */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-white">50+</p>
              <p className="text-sm text-slate-mid mt-1">
                Years of research synthesized
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-sm text-slate-mid mt-1">
                Validated frameworks
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">6,000+</p>
              <p className="text-sm text-slate-mid mt-1">
                Participants in source studies
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">90%</p>
              <p className="text-sm text-slate-mid mt-1">
                Gottman&apos;s prediction accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-white mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            How It Works
          </motion.h2>
          <p className="text-slate-light text-center max-w-2xl mx-auto -mt-8 mb-16">
            Three steps. Ten minutes. One report you&apos;ll actually want to read.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="bg-navy-light border border-white/5 rounded-2xl p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <span className="text-coral font-mono text-sm font-bold">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-white mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-24 px-6 bg-navy-light">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The Science
            </h2>
            <p className="mt-4 text-slate-light max-w-2xl mx-auto">
              This isn&apos;t a personality quiz. It&apos;s five decades of research, synthesized.
            </p>
            <p className="mt-4 text-slate-light max-w-2xl mx-auto text-sm">
              Pairscope draws from the same validated instruments used in clinical
              research — adapted into language that actually makes sense. Each question
              maps to a specific scientific dimension. Each insight in your report traces
              back to peer-reviewed findings.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                className="bg-navy border border-white/5 rounded-2xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {fw.name}
                </h3>
                <p className="text-xs text-coral font-semibold mb-3">
                  {fw.stat}
                </p>
                <p className="text-slate-light text-sm leading-relaxed">
                  {fw.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works for Everyone */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Built for You — Whether You&apos;re
              <br />
              <span className="text-coral">In a Relationship or Not</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mt-10 text-left">
              <div className="bg-navy-light border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">In a Relationship</h3>
                <p className="text-slate-light text-sm leading-relaxed mb-2">
                  Get a diagnostic of your current dynamic — your conflict patterns,
                  emotional bank account, attachment interplay, and specific conversation
                  scripts for your weak spots.
                </p>
                <p className="text-xs text-coral font-semibold">~45 questions</p>
              </div>
              <div className="bg-navy-light border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Flying Solo</h3>
                <p className="text-slate-light text-sm leading-relaxed mb-2">
                  Understand your patterns across past relationships. See your attachment
                  blueprint, risk factors, and what to look for (and screen for) next time.
                </p>
                <p className="text-xs text-coral font-semibold">~35 questions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-navy-light">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-white mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            Questions You&apos;re Already Asking
          </motion.h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.details
                key={i}
                className="group bg-navy border border-white/5 rounded-2xl overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <summary className="cursor-pointer px-6 py-5 text-white font-semibold text-lg flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="text-coral ml-4 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-slate-light text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              You already know something could be better.
            </h2>
            <p className="text-slate-light text-lg leading-relaxed max-w-xl mx-auto">
              Now find out what — and what to do about it.
            </p>
            <Link
              href="/assess"
              className="inline-block mt-10 px-8 py-4 bg-coral text-white font-semibold rounded-xl text-lg hover:bg-coral-light transition-colors shadow-lg shadow-coral/20"
            >
              Take the Assessment
            </Link>
            <p className="mt-4 text-sm text-slate-mid">
              Free. 10 minutes. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-lg font-semibold text-white">Pairscope</span>
            <p className="text-xs text-slate-mid max-w-md text-center sm:text-right">
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
