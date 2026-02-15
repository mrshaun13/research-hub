import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HardDrive, GitBranch, Eye, ArrowDown, Check, X } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { configLayers, compatibilityMatrix } from '../data/researchData';

const fieldCountData = configLayers.map(l => ({ name: `Layer ${l.layer}`, fields: l.fieldCount, color: l.color }));

export default function ConfigArchitecture() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Config Architecture — Three Layers</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          The skill uses a three-layer config to make the entire setup portable across machines.
          The personal hub repo IS the portable unit — clone it on a new machine, point the skill at it, done.
        </p>
      </div>

      <InsightCallout color="cyan">
        <strong>For the end user:</strong> You never think about config. On your first run, the skill asks where to put your hub.
        After that, it finds it in under 2 seconds every time. Move to a new machine? Clone your repo, run the skill once —
        all your research, settings, and library connections are instantly there.
      </InsightCallout>

      {/* Layer Cards — Vertical Flow */}
      <div className="space-y-3">
        {configLayers.map((layer, i) => (
          <React.Fragment key={layer.layer}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5" style={{ borderLeftColor: layer.color, borderLeftWidth: 3 }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: layer.color + '20' }}>
                  <span className="text-sm font-bold" style={{ color: layer.color }}>{layer.layer}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-white">{layer.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      layer.gitTracked
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-gray-800 text-gray-500 border border-gray-700/50'
                    }`}>
                      {layer.scope}
                    </span>
                    {layer.gitTracked ? (
                      <span className="flex items-center gap-1 text-[10px] text-blue-400"><GitBranch className="w-3 h-3" />git-tracked</span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-gray-500"><HardDrive className="w-3 h-3" />machine-local</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{layer.purpose}</p>

                  {/* User Experience */}
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg px-3 py-2 mb-3">
                    <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-0.5">What You Experience</p>
                    <p className="text-xs text-indigo-200 leading-relaxed">{layer.userExperience}</p>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-800/50 rounded-lg px-3 py-2 mb-3">
                    <p className="text-[10px] text-gray-500 mb-1">Location</p>
                    <code className="text-xs text-cyan-400 font-mono">{layer.location}</code>
                  </div>

                  {/* Fields */}
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1.5">Fields ({layer.fieldCount})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.fields.map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-gray-400 border border-gray-700/50">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {i < configLayers.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Field Count Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Fields per Config Layer</h3>
        <p className="text-xs text-gray-500 mb-4">Layer 1 has exactly 1 field — that's the point. It's a pointer, not a config file.</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={fieldCountData}>
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="fields" name="Fields" radius={[4, 4, 0, 0]}>
              {fieldCountData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Flow Diagram */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Config Read Flow — Phase 0 Detection</h3>
        <p className="text-xs text-gray-500 mb-4">The 2-second startup path when the hub already exists</p>
        <div className="flex flex-wrap items-center gap-2 justify-center text-xs">
          {[
            { text: 'Read config.json', sub: 'get personalHubPath', color: '#f59e0b' },
            { text: 'Read hub-config.json', sub: 'port, projects, libraries', color: '#6366f1' },
            { text: 'Git pull (personal)', sub: 'sync latest research', color: '#3b82f6' },
            { text: 'Git pull (libraries)', sub: 'fetch community updates', color: '#10b981' },
            { text: 'Check port 5180', sub: 'dev server running?', color: '#ef4444' },
            { text: 'Ready', sub: 'proceed to Phase 1', color: '#84cc16' },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-center min-w-[120px]" style={{ borderTopColor: step.color, borderTopWidth: 2 }}>
                <p className="font-medium text-gray-200">{step.text}</p>
                <p className="text-[9px] text-gray-500 mt-0.5">{step.sub}</p>
              </div>
              {i < arr.length - 1 && <span className="text-gray-600">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Backwards Compatibility Matrix */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Backwards Compatibility Matrix</h3>
        <p className="text-xs text-gray-500 mb-4">No feature depends on another. A user with zero GitHub setup gets a fully functional local research hub.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Personal Git</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Libraries</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Contribution</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">What Works</th>
              </tr>
            </thead>
            <tbody>
              {compatibilityMatrix.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                  <td className="py-2 px-3">{row.personalGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}</td>
                  <td className="py-2 px-3">{row.libraries ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}</td>
                  <td className="py-2 px-3">{row.contribution ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}</td>
                  <td className="py-2 px-3 text-gray-300">{row.whatWorks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout color="emerald">
        <strong>For the end user:</strong> The three-layer config means you can use this skill on a locked-down work machine with
        no GitHub account (local-only), on your personal laptop with full git sync, or on a shared team setup with library
        contributions — all with the same skill, same pipeline, same experience. Nothing breaks when features are missing.
      </InsightCallout>
    </div>
  );
}
