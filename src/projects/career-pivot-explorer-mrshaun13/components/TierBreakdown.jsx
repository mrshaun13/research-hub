import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { jobData, stressTiers, costOfLiving } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const tierColors = { chill: '#22c55e', comfortable: '#eab308', leveraged: '#f97316', ambitious: '#ef4444' };
const tierInsightColors = { chill: 'green', comfortable: 'amber', leveraged: 'orange', ambitious: 'red' };

const tierInsights = {
  chill: 'These roles won\'t make you rich, but they\'ll give you something money can\'t buy: mental peace. Costco stands out with benefits that rival corporate America. The trade-off is physical work and lower pay ceilings.',
  comfortable: 'The sweet spot for many career changers. Dental receptionist is the role you specifically mentioned — and it\'s a great fit. Office Manager is the sleeper pick here: 85% skill match with solid pay.',
  leveraged: 'This is where your 25 years of EA experience becomes a superpower, not just a resume line. Event Planner is your dream job and you\'re already 60% qualified. Project Coordinator is essentially what you\'ve been doing with a different title.',
  ambitious: 'Higher risk, higher reward. These roles either have no income floor (commission/freelance) or recreate the same corporate pressure you\'re trying to escape. Proceed with eyes open.',
};

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-3 hover:bg-gray-800/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tierColors[job.tier] }} />
            <span className="text-sm font-medium text-white">{job.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">
              ${(job.salaryLow / 1000).toFixed(0)}K–${(job.salaryHigh / 1000).toFixed(0)}K
            </span>
            <span className="text-[10px] text-gray-600">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-1.5">
          <span className="text-[10px] text-gray-500">Stress: <span className={job.stressScore < 55 ? 'text-green-400' : job.stressScore < 68 ? 'text-amber-400' : 'text-red-400'}>{job.stressScore}/100</span></span>
          <span className="text-[10px] text-gray-500">Drama: <span className={job.dramaFactor <= 2 ? 'text-green-400' : job.dramaFactor <= 3 ? 'text-amber-400' : 'text-red-400'}>{job.dramaFactor}/5</span></span>
          <span className="text-[10px] text-gray-500">Skill Match: <span className="text-violet-400">{job.skillMatch}%</span></span>
          <span className="text-[10px] text-gray-500">Benefits: <span className="text-gray-300">{job.benefits}</span></span>
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-gray-800/50 pt-2 space-y-2">
          <p className="text-xs text-violet-300 italic">{job.whyYou}</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] uppercase text-green-500 font-bold mb-1">Pros</p>
              {job.pros.map((p, i) => (
                <p key={i} className="text-[11px] text-gray-400 leading-relaxed">+ {p}</p>
              ))}
            </div>
            <div>
              <p className="text-[10px] uppercase text-red-500 font-bold mb-1">Cons</p>
              {job.cons.map((c, i) => (
                <p key={i} className="text-[11px] text-gray-400 leading-relaxed">− {c}</p>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/40 rounded p-2 mt-1">
            <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Benefits Detail</p>
            <p className="text-[11px] text-gray-400">{job.benefitsDetail}</p>
          </div>
          <div className="bg-gray-800/40 rounded p-2">
            <p className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">Growth Path</p>
            <p className="text-[11px] text-gray-300">{job.growthPath}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TierBreakdown() {
  const [activeTier, setActiveTier] = useState('chill');
  const tierJobs = jobData.filter(j => j.tier === activeTier);
  const tier = stressTiers.find(t => t.id === activeTier);

  const chartData = tierJobs.map(j => ({
    name: j.title.length > 20 ? j.title.substring(0, 18) + '…' : j.title,
    low: j.salaryLow,
    mid: j.salaryMid,
    high: j.salaryHigh,
    tier: j.tier,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Tier Breakdown</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          Deep dive into each stress tier. Click any job card to expand pros, cons, benefits, 
          growth path, and a personalized "why you" assessment.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {stressTiers.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTier(t.id)}
            className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTier === t.id ? 'bg-white/10 border-white/20 text-white' : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            {t.label} ({jobData.filter(j => j.tier === t.id).length})
          </button>
        ))}
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Salary Ranges — {tier?.label}</h3>
        <ResponsiveContainer width="100%" height={Math.max(200, tierJobs.length * 55)}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 'auto']}
              tick={{ fill: '#6b7280', fontSize: 10 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <YAxis type="category" dataKey="name" width={130} tick={{ fill: '#d1d5db', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={costOfLiving.monthlyBudgetEstimate.comfortableAnnual} stroke="#eab308" strokeDasharray="6 3" label={{ value: '$48K', fill: '#eab308', fontSize: 10, position: 'top' }} />
            <Bar dataKey="low" name="25th %ile" stackId="a" fill="#374151" radius={[4, 0, 0, 4]} />
            <Bar dataKey="mid" name="Median" fill={tierColors[activeTier]} opacity={0.7} />
            <Bar dataKey="high" name="75th %ile" fill={tierColors[activeTier]} opacity={0.3} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 text-center mt-1">Yellow dashed line = $48K comfortable living threshold for Hendersonville, TN</p>
      </div>

      <InsightCallout color={tierInsightColors[activeTier]}>
        {tierInsights[activeTier]}
      </InsightCallout>

      <div className="space-y-2">
        {tierJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
