import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ChevronDown, ChevronRight, Clock, FileText, GitFork, User, ArrowRight } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { pipelinePhases, researchLenses, vizRules, dataQualityTiers } from '../data/researchData';

const timingData = pipelinePhases.map(p => ({ name: p.shortName, minutes: p.avgMinutes, color: p.color }));

const radarData = pipelinePhases.map(p => ({
  phase: p.shortName,
  decisions: p.decisionPoints.length,
  files: p.filesAccessed.length,
  actions: p.keyActions.length,
}));

export default function PipelineDeepDive() {
  const [expandedPhase, setExpandedPhase] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Pipeline Deep Dive — 8 Phases</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Every research project flows through the same 8-phase pipeline. The phases are sequential but the skill
          adapts at each stage — extensions can inject, augment, or override any phase. The only required user
          interaction is the lightweight checkpoint in Phase 3.
        </p>
      </div>

      <InsightCallout color="cyan">
        <strong>For the end user:</strong> You experience this as a single conversation. You type a topic, optionally approve a plan,
        and get a finished dashboard. Under the hood, 8 distinct phases are orchestrating research, analysis, and construction —
        each with its own decision logic, reference files, and quality checks.
      </InsightCallout>

      {/* Pipeline Flow Diagram */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Pipeline Flow</h3>
        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {pipelinePhases.map((phase, i) => (
            <React.Fragment key={phase.id}>
              <button
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                className="relative group"
              >
                <div
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    expandedPhase === phase.id
                      ? 'border-white/30 bg-white/5 text-white scale-105'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
                  }`}
                  style={{ borderColor: expandedPhase === phase.id ? phase.color : undefined }}
                >
                  <span className="text-[9px] font-mono opacity-50 mr-1">{phase.id}</span>
                  {phase.shortName}
                </div>
                {phase.id === 3 && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <User className="w-2.5 h-2.5 text-amber-400" />
                    <span className="text-[8px] text-amber-400 whitespace-nowrap">checkpoint</span>
                  </div>
                )}
                {phase.id === 0 && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <GitFork className="w-2.5 h-2.5 text-violet-400" />
                    <span className="text-[8px] text-violet-400 whitespace-nowrap">setup?</span>
                  </div>
                )}
                {phase.id === 1 && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <GitFork className="w-2.5 h-2.5 text-rose-400" />
                    <span className="text-[8px] text-rose-400 whitespace-nowrap">extension?</span>
                  </div>
                )}
              </button>
              {i < pipelinePhases.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Phase Detail Cards */}
      <div className="space-y-2">
        {pipelinePhases.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          return (
            <div key={phase.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-gray-800/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: phase.color + '20' }}>
                  <span className="text-xs font-bold" style={{ color: phase.color }}>{phase.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{phase.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{phase.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />~{phase.avgMinutes}m
                  </span>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-800/50 pt-4 space-y-4">
                  {/* User Experience */}
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg px-4 py-3">
                    <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-1">What You Experience</p>
                    <p className="text-xs text-indigo-200 leading-relaxed">{phase.userExperience}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Key Actions</p>
                      <ul className="space-y-1">
                        {phase.keyActions.map((a, i) => (
                          <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                            <span className="text-gray-600 mt-0.5">•</span>{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Decision Points</p>
                      {phase.decisionPoints.length > 0 ? (
                        <ul className="space-y-1">
                          {phase.decisionPoints.map((d, i) => (
                            <li key={i} className="text-xs text-amber-400/80 flex items-start gap-1.5">
                              <GitFork className="w-3 h-3 mt-0.5 flex-shrink-0" />{d}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-600 italic">No branching — linear execution</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Reference Files</p>
                      {phase.filesAccessed.length > 0 ? (
                        <ul className="space-y-1">
                          {phase.filesAccessed.map((f, i) => (
                            <li key={i} className="text-xs text-cyan-400/80 flex items-start gap-1.5">
                              <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />{f}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-600 italic">Web search only — no reference files</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timing Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Average Phase Duration (minutes)</h3>
          <p className="text-xs text-gray-500 mb-4">RESEARCH and BUILD dominate — that's where the real work happens</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={timingData}>
              <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 9 }} angle={-30} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="minutes" name="Minutes" radius={[4, 4, 0, 0]}>
                {timingData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Phase Complexity Radar</h3>
          <p className="text-xs text-gray-500 mb-4">Decision density, file dependencies, and action count per phase</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="phase" tick={{ fill: '#9ca3af', fontSize: 9 }} />
              <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 8 }} />
              <Radar name="Decisions" dataKey="decisions" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
              <Radar name="Files" dataKey="files" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
              <Radar name="Actions" dataKey="actions" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {[{ name: 'Decisions', color: '#f59e0b' }, { name: 'Files', color: '#06b6d4' }, { name: 'Actions', color: '#8b5cf6' }].map(l => (
              <span key={l.name} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />{l.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Research Lenses */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Research Lenses — Automatic Dimension Selection</h3>
        <p className="text-xs text-gray-500 mb-4">The skill classifies your topic into lenses, then auto-includes the right dimensions. You never specify these manually.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {researchLenses.map((l) => (
            <div key={l.lens} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-sm font-semibold text-white">{l.lens} Lens</span>
                <span className="text-[10px] text-gray-600 ml-auto">e.g., {l.example}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {l.dimensions.map((d) => (
                  <span key={d} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-400 border border-gray-700/50">{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualization Rules */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Deterministic Visualization Rules</h3>
        <p className="text-xs text-gray-500 mb-4">Same data shape → same chart type, always. Decided in Phase 5 AFTER seeing the data, not before.</p>
        <div className="space-y-1.5">
          {vizRules.map((r, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-800/30 rounded-lg px-4 py-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
              <span className="text-xs text-gray-300 flex-1">{r.dataShape}</span>
              <ArrowRight className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-medium text-white">{r.chartType}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Quality Tiers */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Data Quality Tiers</h3>
        <p className="text-xs text-gray-500 mb-4">Every data point is tagged with a confidence tier. T4 estimates are always clearly marked in the dashboard.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dataQualityTiers.map((t) => (
            <div key={t.tier} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-bold" style={{ color: t.color }}>{t.tier}</span>
                <span className="text-xs font-medium text-gray-300">{t.label}</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">{t.description}</p>
              <p className="text-[9px] text-gray-600 mt-1 italic">{t.example}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="amber">
        <strong>For the end user:</strong> The pipeline's 150 minutes of average execution replaces what would take a human researcher
        weeks. The checkpoint at Phase 3 is your one moment of control — approve the plan, tweak it, or redirect entirely.
        Everything else is autonomous. The data quality tiers mean you always know how trustworthy each number is.
      </InsightCallout>
    </div>
  );
}
