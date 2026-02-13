import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Puzzle, Check, Clock, ArrowRight, Layers, Database, ChevronDown, ChevronRight } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { extensionModes, hookTypes, extensionRegistry } from '../data/researchData';

const hookData = [
  { phase: '1B', type: 'Inject', description: 'Product classification step', color: '#ef4444' },
  { phase: '2', type: 'Augment', description: 'Product-specific searches', color: '#10b981' },
  { phase: '3', type: 'Override', description: 'Product discovery replaces standard', color: '#f59e0b' },
  { phase: '4', type: 'Augment', description: 'Per-product data gathering', color: '#10b981' },
  { phase: '5', type: 'Augment', description: 'Product analysis + recommendations', color: '#10b981' },
  { phase: '6', type: 'Augment', description: 'Product file structure', color: '#10b981' },
  { phase: '7', type: 'Augment', description: 'Product QA checks', color: '#10b981' },
];

export default function ExtensionSystem() {
  const [expandedExt, setExpandedExt] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Extension System — Pluggable Specializations</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Extensions auto-detect from user prompts and augment the pipeline with domain-specific logic.
          They support two output modes (bespoke and template) and three hook types (augment, override, inject).
          The system is designed so new extensions can be added without modifying the core pipeline.
        </p>
      </div>

      <InsightCallout color="violet">
        <strong>For the end user:</strong> You don't choose extensions — they choose you. Say "I'm looking to buy an espresso machine"
        and the product comparison extension activates automatically. Say "analyze the last 5 incidents" and (when installed)
        the incident review extension kicks in. Your prompt is the only trigger needed.
      </InsightCallout>

      {/* Two Output Modes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {extensionModes.map((m) => (
          <div key={m.mode} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5" style={{ borderTopColor: m.color, borderTopWidth: 2 }}>
            <div className="flex items-center gap-3 mb-3">
              {m.mode === 'Bespoke' ? <Layers className="w-5 h-5" style={{ color: m.color }} /> : <Database className="w-5 h-5" style={{ color: m.color }} />}
              <h3 className="text-sm font-semibold text-white">{m.mode} Mode</h3>
              <span className="text-[10px] text-gray-500 ml-auto">Scale: {m.scale}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">{m.description}</p>

            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg px-3 py-2 mb-3">
              <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-0.5">What You Experience</p>
              <p className="text-xs text-indigo-200 leading-relaxed">{m.userExperience}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Best for:</span>
                <span className="text-xs text-gray-400">{m.bestFor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Hub display:</span>
                <span className="text-xs text-gray-400">{m.hubDisplay}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Installed:</span>
                {m.installed.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {m.installed.map((e) => (
                      <span key={e} className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{e}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-600 ml-2">None yet</span>
                )}
              </div>
              {m.planned && m.planned.length > 0 && (
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase">Planned:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {m.planned.map((e) => (
                      <span key={e} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-500 border border-gray-700/50">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Three Hook Types */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Three Hook Types</h3>
        <p className="text-xs text-gray-500 mb-4">Extensions modify the pipeline through three strategies — each with different implications for the standard behavior</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {hookTypes.map((h) => (
            <div key={h.type} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-center">
              <span className="text-2xl" style={{ color: h.color }}>{h.icon}</span>
              <p className="text-sm font-semibold text-white mt-2">{h.type}</p>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Extension Hook Map */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Product/Purchase Extension — Phase Hook Map</h3>
        <p className="text-xs text-gray-500 mb-4">This extension hooks into 7 phases — injecting a new Phase 1B and overriding Phase 3 discovery entirely</p>
        <div className="space-y-1.5">
          {hookData.map((h, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <span className="text-xs font-mono font-bold w-8" style={{ color: h.color }}>P{h.phase}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                h.type === 'Inject' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                h.type === 'Override' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>{h.type}</span>
              <span className="text-xs text-gray-400 flex-1">{h.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Extension Registry */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Extension Registry</h3>
        <p className="text-xs text-gray-500 mb-4">All extensions — installed and planned. Each has trigger patterns, data sources, and phase hooks.</p>
        <div className="space-y-3">
          {extensionRegistry.map((ext) => {
            const isExpanded = expandedExt === ext.slug;
            return (
              <div key={ext.slug} className="bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedExt(isExpanded ? null : ext.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
                >
                  <Puzzle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-white">{ext.name}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-medium ${
                      ext.mode === 'bespoke' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>{ext.mode}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    ext.status === 'installed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-500 border border-gray-700/50'
                  }`}>{ext.status}</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-700/30 pt-3 space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Data Source</p>
                      <code className="text-xs text-cyan-400 font-mono">{ext.dataSource}</code>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Trigger Keywords</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ext.triggers.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-amber-400 border border-gray-700/50">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Features</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ext.features.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-400 border border-gray-700/50">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout color="rose">
        <strong>For the end user:</strong> Extensions are the skill's growth mechanism. Today you get product comparisons out of the box.
        Tomorrow, incident reviews from ServiceNow, sprint analyses from Jira, or any domain-specific workflow — all using the same
        hub, same pipeline, same experience. Template mode means high-volume reports (hundreds of incidents) don't clutter your
        sidebar — they live in searchable, filterable collections.
      </InsightCallout>
    </div>
  );
}
