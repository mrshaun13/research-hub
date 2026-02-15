import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { jobData } from '../data/researchData';
import InsightCallout from './InsightCallout';

const compareColors = ['#8b5cf6', '#22c55e', '#f59e0b'];
const tierColors = { chill: '#22c55e', comfortable: '#eab308', leveraged: '#f97316', ambitious: '#ef4444' };

const radarMetrics = [
  { key: 'pay', label: 'Pay' },
  { key: 'lowStress', label: 'Low Stress' },
  { key: 'lowDrama', label: 'Low Drama' },
  { key: 'skillMatch', label: 'Skill Match' },
  { key: 'easyEntry', label: 'Easy Entry' },
  { key: 'benefits', label: 'Benefits' },
  { key: 'growth', label: 'Growth Path' },
];

const benefitsScore = { excellent: 95, good: 75, fair: 50, varies: 40, none: 10 };
const entryScore = { immediate: 95, low: 75, moderate: 45, high: 20 };

function buildRadar(job) {
  return {
    pay: Math.min(100, (job.salaryMid / 90000) * 100),
    lowStress: 100 - job.stressScore,
    lowDrama: (1 - (job.dramaFactor - 1) / 4) * 100,
    skillMatch: job.skillMatch,
    easyEntry: entryScore[job.entryBarrier] || 50,
    benefits: benefitsScore[job.benefits] || 50,
    growth: job.tier === 'chill' ? 40 : job.tier === 'comfortable' ? 60 : job.tier === 'leveraged' ? 80 : 70,
  };
}

const presets = [
  { label: 'Your Top 3 Interests', ids: ['event-planner', 'dental-receptionist', 'retail-costco'] },
  { label: 'Best Pay vs. Stress', ids: ['office-manager', 'project-coordinator', 'event-planner'] },
  { label: 'Easiest to Start', ids: ['retail-costco', 'hotel-front-desk', 'customer-service-rep'] },
  { label: 'Professional Pivots', ids: ['event-planner', 'hr-coordinator', 'nonprofit-coordinator'] },
];

export default function HeadToHead() {
  const [selected, setSelected] = useState(['event-planner', 'dental-receptionist', 'retail-costco']);

  const selectedJobs = selected.map(id => jobData.find(j => j.id === id)).filter(Boolean);

  const radarData = radarMetrics.map(metric => {
    const point = { metric: metric.label };
    selectedJobs.forEach((job, i) => {
      const radar = buildRadar(job);
      point[`job${i}`] = radar[metric.key];
    });
    return point;
  });

  const toggleJob = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Head-to-Head</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          Compare up to 3 roles side-by-side across 7 dimensions. Use presets or pick your own matchups.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => setSelected(p.ids)}
            className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
              JSON.stringify(selected.sort()) === JSON.stringify([...p.ids].sort())
                ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
                : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {jobData.map(job => (
          <button
            key={job.id}
            onClick={() => toggleJob(job.id)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-all ${
              selected.includes(job.id)
                ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                : 'border-gray-800 text-gray-600 hover:text-gray-400 hover:border-gray-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block mr-1" style={{ backgroundColor: tierColors[job.tier] }} />
            {job.title}
          </button>
        ))}
        <span className="text-[10px] text-gray-600 self-center ml-1">({selected.length}/3 selected)</span>
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            {selectedJobs.map((job, i) => (
              <Radar
                key={job.id}
                name={job.title}
                dataKey={`job${i}`}
                stroke={compareColors[i]}
                fill={compareColors[i]}
                fillOpacity={0.12}
                strokeWidth={2}
              />
            ))}
            <Legend
              wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {selectedJobs.map((job, i) => (
          <div key={job.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3" style={{ borderTopColor: compareColors[i], borderTopWidth: '2px' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: compareColors[i] }} />
              <h3 className="text-sm font-semibold text-white">{job.title}</h3>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Salary Range</span>
                <span className="text-white font-medium">${(job.salaryLow/1000).toFixed(0)}K – ${(job.salaryHigh/1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Median</span>
                <span className="text-white font-bold">${(job.salaryMid/1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stress Score</span>
                <span className={job.stressScore < 55 ? 'text-green-400' : job.stressScore < 68 ? 'text-amber-400' : 'text-red-400'}>{job.stressScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Take-Home Drama</span>
                <span className={job.dramaFactor <= 2 ? 'text-green-400' : job.dramaFactor <= 3 ? 'text-amber-400' : 'text-red-400'}>{job.dramaFactor}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Skill Match</span>
                <span className="text-violet-400 font-medium">{job.skillMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Benefits</span>
                <span className="text-gray-300">{job.benefits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Entry Barrier</span>
                <span className="text-gray-300">{job.entryBarrier}</span>
              </div>
            </div>
            <p className="text-[10px] text-violet-300/70 italic mt-2 leading-relaxed">{job.whyYou}</p>
          </div>
        ))}
      </div>

      <InsightCallout color="purple" title="The Comparison That Matters Most">
        Event Planner vs. Dental Receptionist is really the core decision: Do you want to lean into your 
        professional skills (higher pay, higher stress, more fulfillment) or downshift completely (lower pay, 
        near-zero drama, mental peace)? There's no wrong answer — it depends on what you need right now.
      </InsightCallout>
    </div>
  );
}
