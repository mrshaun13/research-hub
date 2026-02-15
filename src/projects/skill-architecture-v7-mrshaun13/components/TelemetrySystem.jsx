import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Zap, Clock, Brain, GraduationCap, Eye, BookOpen, BarChart3, FileText, Search, Timer, ChevronDown, ChevronRight } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { telemetryCategories, totalTelemetryFields } from '../data/researchData';

const categoryChartData = telemetryCategories.map(c => ({ name: c.category, fields: c.fieldCount, color: c.color }));

const hoursSavedFormulas = [
  { format: 'Interactive Dashboard', formula: '(sections × 6) + (charts × 3) + (files × 0.5)', example: '(8 × 6) + (12 × 3) + (14 × 0.5) = 91h' },
  { format: 'White Paper', formula: '(sections × 4) + (sources × 0.5) + (dataPoints × 0.01)', example: '(8 × 4) + (18 × 0.5) + (216 × 0.01) = 43h' },
  { format: 'Blog Post', formula: '(sections × 2.5) + (charts × 1)', example: '(8 × 2.5) + (12 × 1) = 32h' },
  { format: 'Technical Doc', formula: '(sections × 3) + (sources × 0.3)', example: '(8 × 3) + (18 × 0.3) = 29h' },
  { format: 'Presentation', formula: '(sections × 1.5) + (charts × 0.5)', example: '(8 × 1.5) + (12 × 0.5) = 18h' },
  { format: 'GitHub Repo', formula: '(sections × 3) + (charts × 2) + (files × 0.5)', example: '(8 × 3) + (12 × 2) + (14 × 0.5) = 55h' },
];

const consumptionFormulas = [
  { component: 'Reading Time', formula: 'totalWords / WPM', note: 'WPM = 120 (college+) or 150 (standard)' },
  { component: 'Chart Exploration', formula: 'chartsBuilt × 0.75 min', note: '~45 seconds per chart' },
  { component: 'Interactive Overhead', formula: '(reading + charts) × 0.2', note: 'Filtering, drilling down' },
];

const bloomsLevels = [
  { level: 1, name: 'Remember', color: '#6b7280', content: 'Data tables, raw stats, timelines' },
  { level: 2, name: 'Understand', color: '#3b82f6', content: 'Explanatory text, definitions' },
  { level: 3, name: 'Apply', color: '#10b981', content: 'Interactive filtering, pattern discovery' },
  { level: 4, name: 'Analyze', color: '#f59e0b', content: 'Comparative charts, trend analysis, insight callouts' },
  { level: 5, name: 'Evaluate', color: '#f97316', content: 'Recommendations, decision frameworks, verdicts' },
  { level: 6, name: 'Create', color: '#ef4444', content: 'User-driven synthesis from interactive exploration' },
];

export default function TelemetrySystem() {
  const [expandedCat, setExpandedCat] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Telemetry & Metrics — {totalTelemetryFields}+ Fields</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Every project captures telemetry about its creation process — not about the research content, but about the research
          <em> process</em>. This metadata is stored in per-project meta.json files and lazy-loaded by the hub UI on demand.
        </p>
      </div>

      <InsightCallout color="emerald" icon={Zap}>
        <strong>For the end user:</strong> Every project card shows hours saved, readability level, cognitive depth, and build metrics
        at a glance. The hero section aggregates these across all projects — "You've saved 240 hours across 8 projects."
        It's a running scorecard of the AI's cumulative impact on your research productivity.
      </InsightCallout>

      {/* Category Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Telemetry Fields by Category</h3>
          <p className="text-xs text-gray-500 mb-4">7 categories covering the full lifecycle from prompt to consumption</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryChartData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="fields" name="Fields" radius={[0, 4, 4, 0]}>
                {categoryChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Field Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Phase Timing has the most fields — one per pipeline phase</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryChartData} dataKey="fields" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={3}
                label={({ name, fields }) => `${name}: ${fields}`}>
                {categoryChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Detail Cards */}
      <div className="space-y-2">
        {telemetryCategories.map((cat) => {
          const isExpanded = expandedCat === cat.category;
          return (
            <div key={cat.category} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedCat(isExpanded ? null : cat.category)}
                className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-gray-800/30 transition-colors"
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-white">{cat.category}</span>
                  <span className="text-[10px] text-gray-500 ml-2">({cat.fieldCount} fields)</span>
                </div>
                <span className="text-xs text-gray-500 max-w-xs truncate hidden sm:block">{cat.userExperience}</span>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-800/50 pt-4 space-y-3">
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-0.5">What You Experience</p>
                    <p className="text-xs text-indigo-200 leading-relaxed">{cat.userExperience}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-1.5 px-2 text-gray-500 font-medium">Field</th>
                          <th className="text-left py-1.5 px-2 text-gray-500 font-medium">Type</th>
                          <th className="text-left py-1.5 px-2 text-gray-500 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.fields.map((f) => (
                          <tr key={f.name} className="border-b border-gray-800/30">
                            <td className="py-1.5 px-2 font-mono text-cyan-400">{f.name}</td>
                            <td className="py-1.5 px-2 text-gray-500">{f.type}</td>
                            <td className="py-1.5 px-2 text-gray-400">{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hours Saved Formulas */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Hours Saved Estimation — 6 Output Formats</h3>
        <p className="text-xs text-gray-500 mb-4">
          Estimates the equivalent manual effort for each output format. The headline metric (totalHoursSaved) = research + interactive dashboard.
        </p>
        <div className="space-y-1.5">
          {hoursSavedFormulas.map((f) => (
            <div key={f.format} className="flex items-start gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <span className="text-xs font-medium text-white w-40 flex-shrink-0">{f.format}</span>
              <code className="text-[10px] text-amber-400 font-mono flex-1">{f.formula}</code>
              <span className="text-[10px] text-gray-500 flex-shrink-0">{f.example}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-2">
          <p className="text-xs text-emerald-300">
            <strong>Research hours</strong> = (sources × 0.75) + (dataPoints × 0.02) + (searches × 0.25)
          </p>
        </div>
      </div>

      {/* Bloom's Taxonomy */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Bloom's Taxonomy — Cognitive Depth Assessment</h3>
        <p className="text-xs text-gray-500 mb-4">Each dashboard is assessed for cognitive depth. Most research dashboards land at Level 4 (Analyze) with a range from Understand to Evaluate.</p>
        <div className="space-y-1.5">
          {bloomsLevels.map((b) => (
            <div key={b.level} className="flex items-center gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: b.color + '20' }}>
                <span className="text-sm font-bold" style={{ color: b.color }}>{b.level}</span>
              </div>
              <span className="text-xs font-semibold text-white w-24">{b.name}</span>
              <span className="text-xs text-gray-400 flex-1">{b.content}</span>
              {b.level === 4 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Most common</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Consumption Time */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Consumption Time Estimation</h3>
        <p className="text-xs text-gray-500 mb-4">How long a human reader would need to fully absorb the dashboard — adjusted for readability level and chart count</p>
        <div className="space-y-1.5">
          {consumptionFormulas.map((f) => (
            <div key={f.component} className="flex items-center gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <span className="text-xs font-medium text-white w-40 flex-shrink-0">{f.component}</span>
              <code className="text-[10px] text-cyan-400 font-mono flex-1">{f.formula}</code>
              <span className="text-[10px] text-gray-500 flex-shrink-0">{f.note}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="rose">
        <strong>For the end user:</strong> Telemetry isn't just metadata — it's accountability. You can see exactly how the AI spent its time,
        how many sources it cited, what reading level it wrote at, and how many hours of manual work it replaced.
        The Bloom's assessment tells you whether you're getting a data dump (Level 1-2) or genuine analytical insight (Level 4-5).
        And the consumption time estimate helps you plan — "This is a 45-minute deep read, not a 5-minute skim."
      </InsightCallout>
    </div>
  );
}
