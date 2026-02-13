import React from 'react';
import { ExternalLink, FileText, Globe, AlertTriangle, Info } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { sources } from '../data/researchData';

export default function Sources() {
  const primarySources = sources.filter(s => s.type === 'Primary');
  const externalSources = sources.filter(s => s.type === 'External');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Sources & Methodology</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          This dashboard was built by reading and analyzing the Research Visualizer skill's own source files —
          14 files totaling 3,800+ lines of instructions, templates, and reference documentation.
          The skill files ARE the primary sources.
        </p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Methodology</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-indigo-400">1</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">Deep Read of All Skill Files</p>
              <p className="text-[10px] text-gray-500">Read SKILL.md (477 lines), all 9 reference files, 2 extension files, README.md, and config files. Total: 3,800+ lines of source material.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-indigo-400">2</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">Subsystem Identification</p>
              <p className="text-[10px] text-gray-500">Identified 8 major subsystems with meaningful architectural differentiation: Pipeline, Config, Extensions, Hub, Telemetry, Visibility, Library, Collections.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-indigo-400">3</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">Data Extraction & Structuring</p>
              <p className="text-[10px] text-gray-500">Extracted all quantifiable data: field counts, line counts, phase timings, config schemas, API endpoints, formulas, decision matrices, and compatibility matrices.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-indigo-400">4</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">Dual-Lens Presentation</p>
              <p className="text-[10px] text-gray-500">Every architectural feature is paired with its end-user experience — explaining both how it works technically and what it means for the person using the skill.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-indigo-400">5</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">Self-Referential Build</p>
              <p className="text-[10px] text-gray-500">This dashboard was built using the very skill it documents — following the same 8-phase pipeline, using the same hub, the same tech stack, and the same telemetry system.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Sources */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Primary Sources — Skill Files</h3>
        <p className="text-xs text-gray-500 mb-4">All data in this dashboard comes directly from these files</p>
        <div className="space-y-1.5">
          {primarySources.map((s) => (
            <div key={s.name} className="flex items-start gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <FileText className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white">{s.name}</p>
                <p className="text-[10px] text-gray-500">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Sources */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">External References</h3>
        <p className="text-xs text-gray-500 mb-4">Standards and documentation referenced by the skill</p>
        <div className="space-y-1.5">
          {externalSources.map((s) => (
            <div key={s.name} className="flex items-start gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white">{s.name}</p>
                <p className="text-[10px] text-gray-500">{s.description}</p>
              </div>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex-shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Limitations & Notes
        </h3>
        <div className="space-y-2">
          {[
            'Phase timing averages are estimates based on typical runs — actual times vary significantly by topic complexity and data availability.',
            'Template-mode extensions (Incident Review, Sprint Analyzer) are planned but not yet installed. Their descriptions reflect the designed architecture.',
            'Hours saved estimates use fixed formulas that approximate manual effort — actual human productivity varies widely.',
            'This dashboard documents the v7.0 architecture as designed in SKILL.md. Implementation details in the hub codebase may have minor variations.',
            'Telemetry field counts include both required and optional fields. Not all fields are populated for every project.',
          ].map((note, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <Info className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="violet">
        <strong>Meta-note:</strong> This dashboard is itself a product of the skill it documents. It was built using the same
        8-phase pipeline, the same hub architecture, the same tech stack, and the same telemetry system described in its own sections.
        The skill version (7.0), the project registry entry, the meta.json telemetry — all of it is real, not simulated.
        This is the skill explaining itself, built by itself.
      </InsightCallout>
    </div>
  );
}
