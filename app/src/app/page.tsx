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
    name: "Gottman Method",
    desc: "50 years of research on what makes relationships work — or fall apart.",
    citation: "Gottman & Silver, 1999",
  },
  {
    name: "Attachment Theory",
    desc: "How your early bonds shape the way you connect, fight, and love.",
    citation: "Fraley et al., 2000 (ECR-R)",
  },
  {
    name: "Big Five Personality",
    desc: "Your own personality predicts your relationship satisfaction more than your partner's.",
    citation: "Dyrenforth et al., 2010 (N=972, 9-year study)",
  },
  {
    name: "Couples Satisfaction Index",
    desc: "The gold-standard measure of relationship satisfaction, used in clinical research worldwide.",
    citation: "Funk & Rogge, 2007 (N=5,315)",
  },
  {
    name: "Love Languages",
    desc: "Understanding how you give and receive love — and where the wires get crossed.",
    citation: "Chapman, 1992",
  },
];

const steps = [
  {
    number: "01",
    title: "Take the Assessment",
    desc: "Answer 35-45 research-backed questions. About 10 minutes. No signup required.",
  },
  {
    number: "02",
    title: "AI Synthesizes Your Results",
    desc: "Your answers are scored across five validated frameworks, then synthesized by AI into a personalized narrative.",
  },
  {
    number: "03",
    title: "Get Your Report",
    desc: "A detailed, beautiful report with insights, visualizations, and conversation scripts you can use today.",
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
            Understand yourself
            <br />
            <span className="text-coral">as a partner.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-slate-light max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            A free, research-backed diagnostic grounded in 50 years of
            relationship science. Not a quiz. Not a vibe check.
            A real assessment.
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
              Free. No signup. 10 minutes.
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
            How it works
          </motion.h2>
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
              Built on real science
            </h2>
            <p className="mt-4 text-slate-light max-w-2xl mx-auto">
              Not horoscopes. Not personality quizzes. Five validated research
              frameworks, adapted for accessibility without losing scientific
              rigor.
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
                <h3 className="text-lg font-semibold text-white mb-2">
                  {fw.name}
                </h3>
                <p className="text-slate-light text-sm leading-relaxed mb-3">
                  {fw.desc}
                </p>
                <p className="text-xs text-slate-mid italic">{fw.citation}</p>
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
              In a relationship or single.
              <br />
              <span className="text-coral">It works either way.</span>
            </h2>
            <p className="text-slate-light text-lg leading-relaxed max-w-xl mx-auto">
              Your own personality predicts your relationship satisfaction more
              than your partner&apos;s. Whether you&apos;re in a relationship or
              between them, understanding yourself as a partner is the most
              valuable thing you can do.
            </p>
            <Link
              href="/assess"
              className="inline-block mt-10 px-8 py-4 bg-coral text-white font-semibold rounded-xl text-lg hover:bg-coral-light transition-colors shadow-lg shadow-coral/20"
            >
              Start Your Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-lg font-semibold text-white">Pairscope</span>
            <p className="text-xs text-slate-mid max-w-md text-center sm:text-right">
              Pairscope is an educational and self-reflection tool, not a
              substitute for licensed therapy or clinical diagnosis. For
              emergencies, call the National Domestic Violence Hotline:
              1-800-799-7233.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
