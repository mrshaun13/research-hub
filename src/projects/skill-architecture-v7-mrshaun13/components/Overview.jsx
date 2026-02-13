import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Sparkles, FileText, Code2, Puzzle, Layers, GitBranch, Zap, Shield } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { skillFileStructure, totalSkillLines, techStack, guardrails } from '../data/researchData';

const CATEGORY_COLORS = { Core: '#6366f1', Reference: '#06b6d4', Extension: '#f59e0b', Config: '#10b981' };

const filesByCategory = Object.entries(
  skillFileStructure.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + f.lines;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const statCards = [
  { label: 'Skill Version', value: '7.0', icon: Sparkles, color: 'text-indigo-400' },
  { label: 'Total Lines', value: totalSkillLines.toLocaleString(), icon: FileText, color: 'text-cyan-400' },
  { label: 'Source Files', value: skillFileStructure.length, icon: Code2, color: 'text-emerald-400' },
  { label: 'Pipeline Phases', value: 8, icon: Layers, color: 'text-amber-400' },
  { label: 'Extensions', value: '1 installed + 2 planned', icon: Puzzle, color: 'text-violet-400' },
  { label: 'Telemetry Fields', value: '36+', icon: Zap, color: 'text-rose-400' },
  { label: 'Config Layers', value: 3, icon: GitBranch, color: 'text-blue-400' },
  { label: 'Guardrails', value: 5, icon: Shield, color: 'text-orange-400' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Skill Overview</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          The Research Visualizer is an agentic AI skill that takes a simple research topic in natural language and autonomously
          produces an interactive web dashboard — discovering dimensions, metrics, subgroups, and taxonomies along the way.
          Version 7.0 represents a full architecture uplift with a portable hub, pluggable extensions, 3-tier visibility,
          community library sharing, and template-mode collections.
        </p>
      </div>

      <InsightCallout color="violet" icon={Sparkles}>
        <strong>What makes this different:</strong> Traditional research visualization requires you to already know what subgroups exist,
        what metrics matter, and what chart types to use. That's asking you to do the research before doing the research.
        This skill flips that — you give it a topic in plain English, it figures out the rest.
      </InsightCallout>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-lg font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* File Structure Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Skill File Structure — Lines by File</h3>
          <p className="text-xs text-gray-500 mb-4">Progressive disclosure: SKILL.md stays under 500 lines; reference files loaded on demand</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={skillFileStructure} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis type="category" dataKey="file" tick={{ fill: '#9ca3af', fontSize: 9 }} width={200} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="lines" radius={[0, 4, 4, 0]}>
                {skillFileStructure.map((entry, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Lines by Category</h3>
          <p className="text-xs text-gray-500 mb-4">Reference files hold 80%+ of the detail — loaded only when needed</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={filesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                {filesByCategory.map((entry, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
              <span key={name} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Tech Stack</h3>
        <p className="text-xs text-gray-500 mb-4">Every dashboard uses the same stack — installed once in the hub, shared by all projects</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {techStack.map((t) => (
            <div key={t.name} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-[10px] text-gray-500 mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardrails */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Anti-Randomness Guardrails</h3>
        <p className="text-xs text-gray-500 mb-4">Five mechanisms prevent inconsistent output — same input always produces structurally similar results</p>
        <div className="space-y-2">
          {guardrails.map((g, i) => (
            <div key={i} className="flex items-center gap-4 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <span className="text-xs font-mono font-bold text-indigo-400 w-6">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-200">{g.name}</p>
                <p className="text-[10px] text-gray-500">{g.description}</p>
              </div>
              <span className="text-[10px] text-gray-600 bg-gray-800 px-2 py-0.5 rounded font-mono flex-shrink-0">{g.metric}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="emerald">
        <strong>For the end user:</strong> You type one sentence. The skill reads 3,800+ lines of instructions across 14 files,
        runs an 8-phase pipeline, discovers what you didn't know to ask for, builds a React dashboard with charts and filters,
        and drops it into your hub — all in one conversation. The guardrails ensure that two people asking similar questions
        get structurally consistent, high-quality results every time.
      </InsightCallout>
    </div>
  );
}
