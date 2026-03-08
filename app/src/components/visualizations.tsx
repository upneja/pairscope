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

const CORAL = "#f97066";
const CORAL_LIGHT = "#fca5a1";
const AMBER = "#f59e0b";
const SLATE = "#94a3b8";

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
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: SLATE, fontSize: 11 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            stroke={CORAL}
            fill={CORAL}
            fillOpacity={0.2}
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
          <span className="text-slate-light">Low Anxiety</span>
          <span className="text-slate-light">High Anxiety</span>
        </div>
        <div className="h-3 bg-navy-lighter rounded-full relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-coral/30 to-coral"
            style={{ width: `${(anxiety / maxValue) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-mid mt-1">
          {anxiety.toFixed(1)} / {maxValue}
        </p>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-light">Low Avoidance</span>
          <span className="text-slate-light">High Avoidance</span>
        </div>
        <div className="h-3 bg-navy-lighter rounded-full relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber/30 to-amber"
            style={{ width: `${(avoidance / maxValue) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-mid mt-1">
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
        <span className="text-sm text-slate-light">{label}</span>
        <span className="text-2xl font-bold text-white">
          {value}
          <span className="text-sm text-slate-mid font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-4 bg-navy-lighter rounded-full relative overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isAboveThreshold
              ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
              : "bg-gradient-to-r from-coral to-amber"
          }`}
          style={{ width: `${percentage}%` }}
        />
        {/* Threshold marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/40"
          style={{ left: `${thresholdPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-mid">0</span>
        <span
          className="text-[10px] text-slate-mid"
          style={{ marginLeft: `${thresholdPercent - 5}%` }}
        >
          threshold: {threshold}
        </span>
        <span className="text-[10px] text-slate-mid">{max}</span>
      </div>
    </div>
  );
}

export function BarChartVisualization({ viz }: { viz: Visualization }) {
  const colors = [CORAL, CORAL_LIGHT, AMBER, SLATE, "#64748b"];
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
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis type="number" tick={{ fill: SLATE, fontSize: 11 }} domain={[0, 10]} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: SLATE, fontSize: 11 }}
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
