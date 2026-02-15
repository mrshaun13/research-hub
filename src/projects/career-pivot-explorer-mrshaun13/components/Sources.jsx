import React from 'react';
import { ExternalLink, Shield, AlertTriangle, Info } from 'lucide-react';
import { sources } from '../data/researchData';
import InsightCallout from './InsightCallout';

const tierBadge = {
  T1: { label: 'T1 Gold', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  T2: { label: 'T2 Silver', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  T3: { label: 'T3 Community', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

export default function Sources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sources & Next Steps</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          Every data point in this dashboard is sourced from public salary databases, government labor 
          statistics, and employer data. Here's the full citation list plus your action plan.
        </p>
      </div>

      <InsightCallout color="blue" title="Methodology">
        Salary data is Nashville MSA-specific (2025-2026) from multiple aggregators, cross-referenced 
        for accuracy. Stress scores use O*NET's standardized stress tolerance ratings (0-100 scale). 
        "Take-home drama" is a custom metric based on on-call expectations, emotional labor, deadline 
        pressure, and work-life boundary clarity. Skill match percentages are assessed against your 
        LinkedIn profile skills.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Data Sources ({sources.length})</h2>
        <div className="space-y-2">
          {sources.map(source => {
            const badge = tierBadge[source.tier] || tierBadge.T2;
            return (
              <div key={source.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
                <span className="text-[10px] text-gray-600 font-mono mt-0.5 w-4 flex-shrink-0">{source.id}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      {source.title}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{source.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Limitations & Disclaimers</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p>Salary ranges are estimates based on aggregated data. Actual offers depend on employer, experience negotiation, and specific role requirements.</p>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p>O*NET stress scores measure occupation-level averages. Individual workplace culture varies significantly — a great boss at a "high stress" job beats a bad boss at a "low stress" one.</p>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p>"Take-home drama" is a subjective assessment based on typical role expectations, not a standardized metric.</p>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>Commission-based roles (real estate, independent wedding planner) have wide income variance. Median figures may not reflect first-year earnings.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Your Action Plan</h2>
        <div className="space-y-3">
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-violet-300 mb-2">🎯 If You Want: Low Stress + Decent Pay</h3>
            <div className="space-y-1.5 text-[11px] text-gray-400">
              <p><span className="text-white font-medium">Week 1:</span> Apply to Costco (costco.com/careers) and dental offices in Hendersonville/Gallatin area</p>
              <p><span className="text-white font-medium">Week 2:</span> Visit local dental offices in person — small practices often hire through walk-ins</p>
              <p><span className="text-white font-medium">Tip:</span> Mention your scheduling and patient/client management experience prominently</p>
            </div>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-orange-300 mb-2">🚀 If You Want: Professional Pivot + Growth</h3>
            <div className="space-y-1.5 text-[11px] text-gray-400">
              <p><span className="text-white font-medium">Week 1:</span> Update LinkedIn headline to "Executive Assistant → Event Professional" and start networking</p>
              <p><span className="text-white font-medium">Week 2-4:</span> Apply to corporate event coordinator roles at Nashville hotels, convention centers, and event companies</p>
              <p><span className="text-white font-medium">Month 2:</span> Consider CMP (Certified Meeting Professional) certification — your experience may qualify you for accelerated track</p>
              <p><span className="text-white font-medium">Tip:</span> Frame your EA experience as event management: "Planned and executed 50+ executive events, managed $X budgets, coordinated with 20+ vendors"</p>
            </div>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-300 mb-2">🧪 If You Want: Test the Waters First</h3>
            <div className="space-y-1.5 text-[11px] text-gray-400">
              <p><span className="text-white font-medium">Now:</span> Sign up on Belay or Time Etc as a Virtual Assistant — take 2-3 clients part-time while keeping your current job</p>
              <p><span className="text-white font-medium">Month 1-2:</span> Volunteer to coordinate a local event (church, community org, charity) to build your event portfolio</p>
              <p><span className="text-white font-medium">Month 3:</span> Evaluate: Did the VA work feel freeing? Did the event work feel exciting? Let the data decide.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-2">Quick-Start Certifications</h2>
        <p className="text-xs text-gray-500 mb-3">Optional but valuable — none are required to start applying:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { cert: 'QuickBooks Certified User', cost: '$150', time: '2-4 weeks self-paced', unlocks: 'Bookkeeper roles' },
            { cert: 'CMP (Certified Meeting Professional)', cost: '$400-600', time: '3-6 months', unlocks: 'Senior event roles' },
            { cert: 'SHRM-CP (HR Certification)', cost: '$300-475', time: '3-6 months', unlocks: 'HR Coordinator/Generalist' },
            { cert: 'TN Real Estate License', cost: '~$1,500 total', time: '90hrs coursework + exam', unlocks: 'Real estate agent' },
            { cert: 'PMP (Project Management)', cost: '$405-555', time: '3-6 months', unlocks: 'Project Manager roles ($70K+)' },
            { cert: 'Notary Public (TN)', cost: '$50', time: '1 week', unlocks: 'Add-on credential for any admin role' },
          ].map(c => (
            <div key={c.cert} className="bg-gray-800/40 rounded p-2">
              <p className="text-xs font-medium text-white">{c.cert}</p>
              <p className="text-[10px] text-gray-500">{c.cost} | {c.time}</p>
              <p className="text-[10px] text-violet-400">Unlocks: {c.unlocks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
