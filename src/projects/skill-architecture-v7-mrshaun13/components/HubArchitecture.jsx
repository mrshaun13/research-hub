import React from 'react';
import { PanelLeft, Zap, Shield, Library, BarChart3, Globe, Database, Layers, Search, Eye, ArrowRight } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { hubFeatures } from '../data/researchData';

const CATEGORY_COLORS = {
  Architecture: '#6366f1', Navigation: '#8b5cf6', Performance: '#06b6d4', Privacy: '#10b981',
  Community: '#f59e0b', Insights: '#ec4899', Portability: '#3b82f6', Scale: '#ef4444',
};

const ICONS = { Layers, PanelLeft, Zap, Shield, Library, BarChart3, Globe, Database };

const directoryTree = [
  { indent: 0, name: '<hubPath>/', note: 'e.g., ~/git/personal-research-hub/', type: 'dir' },
  { indent: 1, name: 'hub-config.json', note: 'Portable config (git-synced)', type: 'config' },
  { indent: 1, name: '.local-config.json', note: 'Machine-local (gitignored)', type: 'local' },
  { indent: 1, name: 'package.json', note: 'Dependencies (shared by all projects)', type: 'file' },
  { indent: 1, name: 'vite.config.js', note: 'Dynamic aliases + visibility API', type: 'file' },
  { indent: 1, name: 'src/', note: '', type: 'dir' },
  { indent: 2, name: 'App.jsx', note: 'Hub shell: sidebar + routing', type: 'file' },
  { indent: 2, name: 'components/HubHome.jsx', note: 'Landing page with project cards', type: 'file' },
  { indent: 2, name: 'projects/', note: 'Personal + public projects', type: 'dir' },
  { indent: 3, name: 'index.js', note: 'Registry: metadata + lazy imports', type: 'file' },
  { indent: 3, name: '<slug>/', note: 'Each project directory', type: 'dir' },
  { indent: 4, name: 'App.jsx', note: 'Project\'s own App with internal nav', type: 'file' },
  { indent: 4, name: 'meta.json', note: 'Telemetry (lazy-loaded)', type: 'config' },
  { indent: 4, name: 'components/', note: 'Section components', type: 'dir' },
  { indent: 4, name: 'data/', note: 'Research data as ES modules', type: 'dir' },
  { indent: 2, name: 'local-projects/', note: 'Local-only (gitignored)', type: 'local' },
  { indent: 2, name: 'collections/', note: 'Template-mode collections', type: 'dir' },
  { indent: 3, name: '<ext-slug>/', note: 'e.g., incident-review/', type: 'dir' },
  { indent: 4, name: 'Template.jsx', note: 'Shared component (copied once)', type: 'file' },
  { indent: 4, name: 'manifest.json', note: 'Item registry', type: 'config' },
  { indent: 4, name: 'items/', note: 'JSON data files (scales to 10K+)', type: 'dir' },
];

const TYPE_COLORS = { dir: 'text-blue-400', file: 'text-gray-400', config: 'text-amber-400', local: 'text-gray-600' };

export default function HubArchitecture() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Hub Architecture & UI</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          The Research Hub is a single web application that hosts ALL research dashboards. One port, one server,
          one npm install. It uses a ChatGPT-style layout with a collapsible sidebar, project cards with telemetry,
          and optional public library integration.
        </p>
      </div>

      <InsightCallout color="indigo">
        <strong>For the end user:</strong> Bookmark localhost:5180 and every dashboard you've ever built is right there.
        No more juggling 8 dev servers on 8 ports. Search across all your research, browse community dashboards,
        and click to dive into any project instantly. The hub is your research home base.
      </InsightCallout>

      {/* Hub Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {hubFeatures.map((f) => {
          const Icon = ICONS[f.icon] || Layers;
          const color = CATEGORY_COLORS[f.category] || '#6366f1';
          return (
            <div key={f.feature} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{f.feature}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-500">{f.category}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">How It Works</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{f.technical}</p>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">What You Get</p>
                  <p className="text-xs text-emerald-200 leading-relaxed">{f.userBenefit}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directory Structure */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Hub Directory Structure</h3>
        <p className="text-xs text-gray-500 mb-4">Everything lives under one directory. Projects are lazy-loaded, collections scale independently, local projects are gitignored.</p>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs space-y-0.5 overflow-x-auto">
          {directoryTree.map((item, i) => (
            <div key={i} className="flex items-start gap-2" style={{ paddingLeft: item.indent * 20 }}>
              <span className={TYPE_COLORS[item.type]}>{item.type === 'dir' ? '📁' : item.type === 'config' ? '⚙️' : item.type === 'local' ? '🔒' : '📄'}</span>
              <span className={`${TYPE_COLORS[item.type]} ${item.type === 'dir' ? 'font-semibold' : ''}`}>{item.name}</span>
              {item.note && <span className="text-gray-600 ml-2">— {item.note}</span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {[
            { emoji: '📁', label: 'Directory', color: 'text-blue-400' },
            { emoji: '📄', label: 'Source file', color: 'text-gray-400' },
            { emoji: '⚙️', label: 'Config', color: 'text-amber-400' },
            { emoji: '🔒', label: 'Gitignored', color: 'text-gray-600' },
          ].map(l => (
            <span key={l.label} className={`flex items-center gap-1.5 text-[10px] ${l.color}`}>
              {l.emoji} {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* UI Layout Diagram */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Hub UI Layout — ChatGPT-Style</h3>
        <p className="text-xs text-gray-500 mb-4">Two-section sidebar with independent search, project cards with telemetry, and seamless project switching</p>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex min-h-[300px]">
            {/* Sidebar mock */}
            <div className="w-56 bg-gray-900 border-r border-gray-700 p-3 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-[8px] text-white">🔬</span>
                </div>
                <span className="text-xs font-bold text-white">Research Hub</span>
              </div>

              <div className="mb-3">
                <span className="text-[8px] text-gray-500 uppercase tracking-wider flex items-center gap-1">✨ My Research</span>
                <div className="mt-1.5 space-y-0.5">
                  <div className="bg-gray-800/50 rounded px-2 py-1 flex items-center gap-1.5">
                    <Search className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-[8px] text-gray-600">Search my research...</span>
                  </div>
                  {['🧠 AI Tooling Adoption', '📱 Pixel 9 Pro Analysis', '🧭 Career Pivot Explorer'].map((p, i) => (
                    <div key={i} className={`rounded px-2 py-1 text-[9px] ${i === 0 ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-500'}`}>{p}</div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[8px] text-gray-500 uppercase tracking-wider flex items-center gap-1">📚 Public Library</span>
                <div className="mt-1.5 space-y-0.5">
                  <div className="bg-gray-800/50 rounded px-2 py-1 flex items-center gap-1.5">
                    <Search className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-[8px] text-gray-600">Search library...</span>
                  </div>
                  {['🌐 Community Project 1', '🌐 Community Project 2'].map((p, i) => (
                    <div key={i} className="rounded px-2 py-1 text-[9px] text-gray-600">{p}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content mock */}
            <div className="flex-1 p-4 bg-gray-950">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm">🔬</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Research Hub</h4>
                  <p className="text-[9px] text-gray-500">Your AI-powered research dashboards</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'AI Tooling Adoption', badge: 'Research', color: 'cyan', saved: '62h' },
                  { title: 'Pixel 9 Pro Analysis', badge: 'Product', color: 'emerald', saved: '45h' },
                  { title: 'Career Pivot Explorer', badge: 'Research', color: 'violet', saved: '78h' },
                  { title: 'Solar System Explorer', badge: 'Research', color: 'blue', saved: '35h' },
                ].map((p, i) => (
                  <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-2.5">
                    <p className="text-[10px] font-semibold text-white truncate">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[8px] px-1 py-0.5 rounded bg-${p.color}-500/10 text-${p.color}-400 border border-${p.color}-500/20`}>{p.badge}</span>
                      <span className="text-[8px] text-emerald-400">⚡ {p.saved} saved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InsightCallout color="amber">
        <strong>For the end user:</strong> The hub isn't just a viewer — it's a launchpad. Since every project's data and components
        live in a structured directory, you can ask your AI agent to add sections, update data, cross-reference between projects,
        or extend analysis with new dimensions. The agent knows where everything lives because hub-config.json tracks it all.
      </InsightCallout>
    </div>
  );
}
