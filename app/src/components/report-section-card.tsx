"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ReportSection } from "@/lib/types";
import { ReportVisualization } from "./visualizations";

interface Props {
  section: ReportSection;
  index: number;
}

export function ReportSectionCard({ section, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    const text = section.shareText || `Check out my ${section.title} on Pairscope`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pairscope — ${section.title}`,
          text,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  }, [section]);

  return (
    <motion.div
      ref={cardRef}
      className="report-section bg-card rounded-2xl border border-card-border p-8 sm:p-10 shadow-sm shadow-warm-black/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-display text-2xl text-warm-black">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-sm text-text-tertiary mt-1">{section.subtitle}</p>
          )}
        </div>
        <button
          onClick={handleShare}
          className="p-2 rounded-lg hover:bg-cream-dark transition-colors duration-300 text-text-muted hover:text-terra shrink-0"
          title="Share this section"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
      </div>

      {/* Narrative */}
      <p className="text-text-secondary text-base leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
        {section.narrative}
      </p>

      {/* Visualization */}
      {section.visualization && (
        <div className="mb-6 bg-warm-dark rounded-xl p-6">
          <ReportVisualization visualization={section.visualization} />
        </div>
      )}

      {/* Conversation Scripts */}
      {section.conversationScripts && section.conversationScripts.length > 0 && (
        <div className="space-y-4 mb-6">
          {section.conversationScripts.map((script, i) => (
            <div key={i} className="bg-cream-dark rounded-xl p-6">
              <p className="text-xs font-medium text-terra uppercase tracking-wide mb-2">
                {script.situation}
              </p>
              <blockquote className="text-warm-black italic border-l-2 border-terra pl-4 mb-3">
                {script.script}
              </blockquote>
              <p className="text-sm text-text-secondary">{script.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Action Items */}
      {section.actionItems && section.actionItems.length > 0 && (
        <div className="bg-sage-muted rounded-xl p-6">
          <h3 className="text-sm font-semibold text-sage-dark mb-3 uppercase tracking-wide">
            {section.conversationScripts ? "Try this" : "What to do about it"}
          </h3>
          <ul className="space-y-2">
            {section.actionItems.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-secondary">
                <span className="text-sage mt-0.5 shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
