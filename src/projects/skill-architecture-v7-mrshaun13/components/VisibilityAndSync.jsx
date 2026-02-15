import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HardDrive, GitBranch, Globe, ArrowRight, Shield, Upload, Check, X, AlertTriangle } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { visibilityTiers, contributionSteps } from '../data/researchData';

const TIER_ICONS = { HardDrive, GitBranch, Globe };

const syncFlow = [
  { phase: 'Startup (Phase 0)', steps: ['Read pointer config', 'Git pull personal hub', 'Git pull each library', 'Check dev server'] },
  { phase: 'After Build (Phase 7)', steps: ['Update hub-config.json', 'Git add + commit + push', 'GitHub API share (if public)', 'Pull library updates'] },
  { phase: 'New Machine (Phase 0B)', steps: ['Clone personal hub repo', 'npm install', 'Create pointer config', 'Create .local-config.json'] },
];

const securityLayers = [
  { layer: 'Contributor PAT', protection: 'Fine-grained, scoped to one repo, Contents: write only. Can only push to agent-contributions branch.', color: '#f59e0b' },
  { layer: 'Branch Protection', protection: 'Repository ruleset requires PRs for main. Only admin + ADMIN_PAT can write to main.', color: '#ef4444' },
  { layer: 'Validation Script', protection: 'Lives on main — contributors cannot modify it. Checks structure, telemetry, content quality, build integrity.', color: '#6366f1' },
  { layer: 'Auto-Merge', protection: 'Uses ADMIN_PAT (repo secret, invisible to contributors). Only executes after ALL validation checks pass.', color: '#10b981' },
];

export default function VisibilityAndSync() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Visibility, Sync & Community Library</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Every project has a visibility tier that controls where files live, whether they sync via git,
          and whether they're shared to public libraries. The contribution model uses the GitHub API directly —
          no local clone of the library needed.
        </p>
      </div>

      <InsightCallout color="cyan">
        <strong>For the end user:</strong> Click a badge on any project card to change its visibility. Keep sensitive research local,
        sync work research across machines, or share your best work with the community — all from the same UI.
        Contributing is zero-effort: the agent pushes via the GitHub API after each build. You don't need to understand git.
      </InsightCallout>

      {/* Three Visibility Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibilityTiers.map((tier) => {
          const Icon = TIER_ICONS[tier.icon] || HardDrive;
          return (
            <div key={tier.tier} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5" style={{ borderTopColor: tier.color, borderTopWidth: 2 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: tier.color + '20' }}>
                  <Icon className="w-5 h-5" style={{ color: tier.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{tier.tier}</h3>
                  <code className="text-[10px] text-gray-500 font-mono">{tier.visibility}</code>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-20 flex-shrink-0">Files:</span>
                  <code className="text-cyan-400 font-mono text-[10px]">{tier.filesLocation}</code>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-20 flex-shrink-0">Config:</span>
                  <code className="text-amber-400 font-mono text-[10px]">{tier.configLocation}</code>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-20 flex-shrink-0">Git sync:</span>
                  {tier.gitSync ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-20 flex-shrink-0">Library:</span>
                  {tier.libraryShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}
                </div>
              </div>

              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg px-3 py-2">
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-0.5">What You Experience</p>
                <p className="text-xs text-indigo-200 leading-relaxed">{tier.userExperience}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade/Downgrade Flow */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Visibility Transitions</h3>
        <p className="text-xs text-gray-500 mb-4">No mixed states — sharing always upgrades to public first. Downgrades are instant (safe direction).</p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-center">
              <HardDrive className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Local</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-blue-400" />
                <span className="text-[9px] text-blue-400">confirm</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-amber-400">warn</span>
                <ArrowRight className="w-3 h-3 text-amber-400 rotate-180" />
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 text-center">
              <GitBranch className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-xs text-blue-400">Personal</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] text-emerald-400">confirm</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-gray-500">instant</span>
                <ArrowRight className="w-3 h-3 text-gray-500 rotate-180" />
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 text-center">
              <Globe className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-xs text-emerald-400">Public</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-2">Upgrades require confirmation dialogs · Downgrade to personal is instant · Downgrade to local warns about git removal</p>
        </div>
      </div>

      {/* Git Sync Workflow */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Git Sync Workflow</h3>
        <p className="text-xs text-gray-500 mb-4">Three sync scenarios — startup, after build, and new machine setup</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {syncFlow.map((flow) => (
            <div key={flow.phase} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-white mb-3">{flow.phase}</h4>
              <ol className="space-y-1.5">
                {flow.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-[10px] font-mono text-gray-600 mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub API Contribution Flow */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Community Contribution — GitHub API Flow</h3>
        <p className="text-xs text-gray-500 mb-4">
          The agent pushes directly via the GitHub REST API (Git Data endpoints). No local clone of the library needed.
          7 steps from your hub to the public library.
        </p>
        <div className="space-y-1.5">
          {contributionSteps.map((s) => (
            <div key={s.step} className="flex items-center gap-3 bg-gray-800/30 rounded-lg px-4 py-2.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-indigo-400">{s.step}</span>
              </div>
              <span className="text-xs font-medium text-white w-36 flex-shrink-0">{s.name}</span>
              <code className="text-[10px] text-cyan-400 font-mono flex-1 truncate">{s.api}</code>
              <span className="text-[10px] text-gray-500 hidden sm:block flex-shrink-0">{s.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Model */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Security Model — 4 Layers</h3>
        <p className="text-xs text-gray-500 mb-4">Contributors can only push to agent-contributions. Validation runs server-side. Auto-merge uses a secret admin PAT.</p>
        <div className="space-y-2">
          {securityLayers.map((l, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-800/30 rounded-lg px-4 py-3" style={{ borderLeftColor: l.color, borderLeftWidth: 3 }}>
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: l.color }} />
              <div>
                <p className="text-xs font-semibold text-white">{l.layer}</p>
                <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">{l.protection}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="amber" icon={AlertTriangle}>
        <strong>For the end user:</strong> The security model means you can contribute with confidence. Your PAT can only write to one branch
        in one repo. A validation script you can't modify checks your contribution server-side. If it passes, it auto-merges.
        If it fails, a GitHub Issue is created with details. You never need to understand git, branches, or PRs —
        the agent handles everything. And if you never want to share, that's fine too — the skill works identically without it.
      </InsightCallout>
    </div>
  );
}
