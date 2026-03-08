"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { Visualization } from "@/lib/types";

const TERRA = "#c47a5a";
const TERRA_LIGHT = "#d4967a";
const SAGE = "#7a9a8a";
const SAGE_LIGHT = "#95b3a3";
const SAND = "#d4c5a9";
const TEXT_MUTED = "#9a9490";

export function RadarVisualization({ viz }: { viz: Visualization }) {
  const data = Object.entries(viz.data)
    .filter(([, v]) => typeof v === "number")
    .map(([key, value]) => ({
      subject: key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      value: value as number,
      fullMark: 10,
    }));

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#3d3a36" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: TEXT_MUTED, fontSize: 11 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            stroke={TERRA}
            fill={TERRA}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpectrumVisualization({ viz }: { viz: Visualization }) {
  const anxiety = (viz.data.anxiety as number) || 0;
  const avoidance = (viz.data.avoidance as number) || 0;
  const maxValue = (viz.data.maxValue as number) || 7;

  return (
    <div className="space-y-6 py-4">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-on-dark-muted">Low Anxiety</span>
          <span className="text-on-dark-muted">High Anxiety</span>
        </div>
        <div className="h-3 bg-warm-dark-lighter rounded-full relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-terra/30 to-terra"
            style={{ width: `${(anxiety / maxValue) * 100}%` }}
          />
        </div>
        <p className="text-xs text-on-dark-muted mt-1">
          {anxiety.toFixed(1)} / {maxValue}
        </p>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-on-dark-muted">Low Avoidance</span>
          <span className="text-on-dark-muted">High Avoidance</span>
        </div>
        <div className="h-3 bg-warm-dark-lighter rounded-full relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sage/30 to-sage"
            style={{ width: `${(avoidance / maxValue) * 100}%` }}
          />
        </div>
        <p className="text-xs text-on-dark-muted mt-1">
          {avoidance.toFixed(1)} / {maxValue}
        </p>
      </div>
    </div>
  );
}

export function MeterVisualization({ viz }: { viz: Visualization }) {
  const value = (viz.data.value as number) || 0;
  const max = (viz.data.max as number) || 10;
  const threshold = (viz.data.threshold as number) || max * 0.7;
  const label = (viz.data.label as string) || "Score";
  const percentage = (value / max) * 100;
  const thresholdPercent = (threshold / max) * 100;
  const isAboveThreshold = value >= threshold;

  return (
    <div className="py-4">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm text-on-dark-muted">{label}</span>
        <span className="text-2xl font-bold text-on-dark">
          {value}
          <span className="text-sm text-on-dark-muted font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-4 bg-warm-dark-lighter rounded-full relative overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isAboveThreshold
              ? "bg-gradient-to-r from-sage to-sage-light"
              : "bg-gradient-to-r from-terra to-sand"
          }`}
          style={{ width: `${percentage}%` }}
        />
        {/* Threshold marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/30"
          style={{ left: `${thresholdPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-on-dark-muted">0</span>
        <span
          className="text-[10px] text-on-dark-muted"
          style={{ marginLeft: `${thresholdPercent - 5}%` }}
        >
          threshold: {threshold}
        </span>
        <span className="text-[10px] text-on-dark-muted">{max}</span>
      </div>
    </div>
  );
}

export function BarChartVisualization({ viz }: { viz: Visualization }) {
  const colors = [TERRA, TERRA_LIGHT, SAGE, SAND, TEXT_MUTED];
  const data = Object.entries(viz.data)
    .filter(([, v]) => typeof v === "number")
    .map(([key, value]) => ({
      name: key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      value: value as number,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2725" />
          <XAxis type="number" tick={{ fill: TEXT_MUTED, fontSize: 11 }} domain={[0, 10]} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: TEXT_MUTED, fontSize: 11 }}
            width={140}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ReportVisualization({ visualization }: { visualization: Visualization }) {
  switch (visualization.type) {
    case "radar":
      return <RadarVisualization viz={visualization} />;
    case "spectrum":
      return <SpectrumVisualization viz={visualization} />;
    case "meter":
      return <MeterVisualization viz={visualization} />;
    case "bar_chart":
      return <BarChartVisualization viz={visualization} />;
    default:
      return null;
  }
}
