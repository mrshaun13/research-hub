import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { payVsStressData, stressTiers, costOfLiving } from '../data/researchData';
import InsightCallout from './InsightCallout';

const tierColors = { chill: '#22c55e', comfortable: '#eab308', leveraged: '#f97316', ambitious: '#ef4444' };
const tierLabels = { chill: 'Chill Zone', comfortable: 'Comfortable Middle', leveraged: 'Leveraged Pivot', ambitious: 'Ambitious Stretch' };

function SpectrumTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-xs max-w-[220px]">
      <p className="text-white font-semibold mb-1">{d.title}</p>
      <p className="text-gray-400">Salary (mid): <span className="text-white font-medium">${(d.y / 1000).toFixed(0)}K</span></p>
      <p className="text-gray-400">Stress Score: <span className="text-white font-medium">{d.x}/100</span></p>
      <p className="text-gray-400">Skill Match: <span className="text-white font-medium">{d.skillMatch}%</span></p>
      <p className="text-gray-400">Take-Home Drama: <span className="text-white font-medium">{d.dramaFactor}/5</span></p>
      <div className="mt-1 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColors[d.tier] }} />
        <span className="text-gray-500 text-[10px]">{tierLabels[d.tier]}</span>
      </div>
    </div>
  );
}

export default function Spectrum() {
  const [highlightTier, setHighlightTier] = useState(null);

  const filteredData = highlightTier
    ? payVsStressData.filter(d => d.tier === highlightTier)
    : payVsStressData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Spectrum</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          Every job plotted by stress level vs. pay. The sweet spot is upper-left — high pay, low stress. 
          The green zone shows jobs above your comfort threshold ($48K) with manageable stress.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setHighlightTier(null)}
          className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
            !highlightTier ? 'bg-white/10 border-white/20 text-white' : 'border-gray-700 text-gray-500 hover:text-gray-300'
          }`}
        >
          All Tiers
        </button>
        {stressTiers.map(tier => (
          <button
            key={tier.id}
            onClick={() => setHighlightTier(highlightTier === tier.id ? null : tier.id)}
            className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              highlightTier === tier.id ? 'bg-white/10 border-white/20 text-white' : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
            {tier.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              type="number"
              dataKey="x"
              name="Stress"
              domain={[30, 80]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              label={{ value: 'Stress Score (O*NET) →', position: 'bottom', fill: '#6b7280', fontSize: 11, offset: 0 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Salary"
              domain={[25000, 100000]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              label={{ value: 'Mid Salary →', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11, offset: 10 }}
            />
            <ReferenceLine y={costOfLiving.monthlyBudgetEstimate.comfortableAnnual} stroke="#eab308" strokeDasharray="6 3" label={{ value: '$48K comfort line', fill: '#eab308', fontSize: 10, position: 'right' }} />
            <ReferenceArea x1={30} x2={60} y1={48000} y2={100000} fill="#22c55e" fillOpacity={0.04} />
            <Tooltip content={<SpectrumTooltip />} />
            {Object.keys(tierColors).map(tier => (
              <Scatter
                key={tier}
                name={tierLabels[tier]}
                data={filteredData.filter(d => d.tier === tier)}
                fill={tierColors[tier]}
                opacity={highlightTier && highlightTier !== tier ? 0.15 : 0.85}
                r={highlightTier === tier ? 8 : 6}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 text-center mt-1">
          Bubble position = mid-range salary vs. O*NET stress tolerance score. Green shaded area = sweet spot (high pay, low stress).
        </p>
      </div>

      <InsightCallout color="green" title="Your Sweet Spot">
        The upper-left quadrant is your goldilocks zone — jobs that pay above your $48K comfort line with 
        stress scores under 65. Office Manager, Project Coordinator, and Event Planner all land here. 
        Virtual Assistant is the wildcard — lowest stress of the professional roles but requires building your own client base.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Quick Reference: All 18 Roles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-2 text-gray-500 font-medium">Role</th>
                <th className="text-center py-2 px-2 text-gray-500 font-medium">Salary (Mid)</th>
                <th className="text-center py-2 px-2 text-gray-500 font-medium">Stress</th>
                <th className="text-center py-2 px-2 text-gray-500 font-medium">Drama</th>
                <th className="text-center py-2 px-2 text-gray-500 font-medium">Skill Match</th>
                <th className="text-center py-2 px-2 text-gray-500 font-medium">Entry</th>
              </tr>
            </thead>
            <tbody>
              {payVsStressData.sort((a, b) => b.y - a.y).map(job => (
                <tr key={job.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-1.5 px-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tierColors[job.tier] }} />
                    <span className="text-gray-300">{job.title}</span>
                  </td>
                  <td className="text-center py-1.5 px-2 text-white font-medium">${(job.y / 1000).toFixed(0)}K</td>
                  <td className="text-center py-1.5 px-2">
                    <span className={`${job.x < 55 ? 'text-green-400' : job.x < 68 ? 'text-amber-400' : 'text-red-400'}`}>{job.x}</span>
                  </td>
                  <td className="text-center py-1.5 px-2">
                    <span className={`${job.dramaFactor <= 2 ? 'text-green-400' : job.dramaFactor <= 3 ? 'text-amber-400' : 'text-red-400'}`}>{job.dramaFactor}/5</span>
                  </td>
                  <td className="text-center py-1.5 px-2 text-violet-400">{job.skillMatch}%</td>
                  <td className="text-center py-1.5 px-2 text-gray-500">
                    {job.id === 'retail-costco' || job.id === 'hotel-front-desk' || job.id === 'customer-service-rep' || job.id === 'virtual-assistant' || job.id === 'senior-ea-new' ? '⚡' : job.id === 'real-estate-agent' || job.id === 'bookkeeper' || job.id === 'hr-coordinator' || job.id === 'property-manager' || job.id === 'wedding-planner' ? '📋' : '✅'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-600 mt-1">⚡ = start immediately, ✅ = low barrier, 📋 = certification/license needed</p>
        </div>
      </div>
    </div>
  );
}
