import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { Filter, BookOpen, Sparkles } from 'lucide-react';
import { curricula, advancedMetrics } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const COLORS = {
  advancedFriendly: '#f59e0b',
  selfPacing: '#10b981',
  rigor: '#6366f1',
  parentInvolvement: '#ec4899',
};

const worldviewColors = {
  'Christian': '#8b5cf6',
  'Secular': '#10b981',
  'Christian (LDS-influenced)': '#a78bfa',
  'Secular (Public School)': '#06b6d4',
  'Christian (Classical)': '#7c3aed',
};

const RatingDots = ({ value, max = 5, color = 'amber' }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < value ? `bg-${color}-400` : 'bg-gray-700'
        }`}
        style={i < value ? { backgroundColor: color === 'amber' ? '#f59e0b' : color === 'emerald' ? '#10b981' : color === 'indigo' ? '#6366f1' : color === 'pink' ? '#ec4899' : '#f59e0b' } : {}}
      />
    ))}
  </div>
);

export default function CurriculumComparison() {
  const [filter, setFilter] = useState('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  const filtered = filter === 'all' ? curricula :
    filter === 'christian' ? curricula.filter(c => c.worldview.includes('Christian')) :
    filter === 'secular' ? curricula.filter(c => c.worldview.includes('Secular')) :
    filter === 'allinone' ? curricula.filter(c => c.type.includes('All-in-One')) :
    filter === 'advanced' ? curricula.filter(c => c.advancedFriendly >= 4) :
    curricula;

  const radarData = [
    { metric: 'Advanced-Friendly', fullMark: 5 },
    { metric: 'Self-Pacing', fullMark: 5 },
    { metric: 'Rigor', fullMark: 5 },
    { metric: 'Low Parent Load', fullMark: 5 },
  ];

  const topAdvanced = [...curricula].sort((a, b) => (b.advancedFriendly + b.selfPacing) - (a.advancedFriendly + a.selfPacing)).slice(0, 5);

  const radarChartData = radarData.map(d => {
    const obj = { metric: d.metric };
    topAdvanced.forEach(c => {
      if (d.metric === 'Advanced-Friendly') obj[c.name] = c.advancedFriendly;
      else if (d.metric === 'Self-Pacing') obj[c.name] = c.selfPacing;
      else if (d.metric === 'Rigor') obj[c.name] = c.rigor;
      else if (d.metric === 'Low Parent Load') obj[c.name] = 6 - c.parentInvolvement;
    });
    return obj;
  });

  const radarColors = ['#f59e0b', '#10b981', '#6366f1', '#06b6d4', '#ec4899'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Curriculum Comparison</h1>
        <p className="text-gray-400 text-sm mt-1">13 curricula rated for advanced learners — filter by worldview, type, or acceleration-friendliness</p>
      </div>

      <InsightCallout color="amber">
        <strong>For grade acceleration,</strong> look for curricula with high Self-Pacing and Advanced-Friendly scores. 
        <strong> Math-U-See</strong> and <strong>Khan Academy</strong> are the standouts — both are level-based (not grade-based), 
        letting your child move as fast as they can handle.
      </InsightCallout>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Filter className="w-4 h-4 text-gray-500 mt-1.5" />
        {[
          { id: 'all', label: 'All' },
          { id: 'advanced', label: '★ Best for Advanced' },
          { id: 'allinone', label: 'All-in-One' },
          { id: 'christian', label: 'Christian' },
          { id: 'secular', label: 'Secular' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filter === f.id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Radar Chart — Top 5 for Advanced Learners */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-1">Top 5 for Advanced Learners</h3>
        <p className="text-xs text-gray-500 mb-3">Radar comparison of key metrics (higher = better, parent load inverted)</p>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarChartData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {topAdvanced.map((c, i) => (
              <Radar
                key={c.name}
                name={c.name}
                dataKey={c.name}
                stroke={radarColors[i]}
                fill={radarColors[i]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
            <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Curriculum Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <div
            key={c.id}
            className={`bg-gray-900 rounded-xl border p-4 cursor-pointer transition-all ${
              selectedCurriculum === c.id ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-gray-800 hover:border-gray-700'
            }`}
            onClick={() => setSelectedCurriculum(selectedCurriculum === c.id ? null : c.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base font-semibold text-gray-100">{c.name}</h3>
                <p className="text-xs text-gray-500">{c.type} · {c.approach}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                c.worldview.includes('Secular') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'
              }`}>
                {c.worldview.includes('Secular') ? 'Secular' : 'Christian'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-gray-500">Grade Range:</span>
                <span className="text-gray-300 ml-1">{c.gradeRange}</span>
              </div>
              <div>
                <span className="text-gray-500">Cost/yr:</span>
                <span className="text-amber-400 ml-1 font-medium">{c.costPerYear.label}</span>
              </div>
              <div>
                <span className="text-gray-500">Format:</span>
                <span className="text-gray-300 ml-1">{c.format}</span>
              </div>
              <div>
                <span className="text-gray-500">Accredited:</span>
                <span className={`ml-1 font-medium ${c.accredited ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {c.accredited ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {/* Rating bars */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-28">Advanced-Friendly</span>
                <RatingDots value={c.advancedFriendly} color="amber" />
                <span className="text-gray-600 ml-1">{c.advancedLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-28">Self-Pacing</span>
                <RatingDots value={c.selfPacing} color="emerald" />
                <span className="text-gray-600 ml-1">{c.selfPacingLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-28">Rigor</span>
                <RatingDots value={c.rigor} color="indigo" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-28">Parent Involvement</span>
                <RatingDots value={c.parentInvolvement} color="pink" />
                <span className="text-gray-600 ml-1">{c.parentLabel}</span>
              </div>
            </div>

            {/* Expanded detail */}
            {selectedCurriculum === c.id && (
              <div className="mt-3 pt-3 border-t border-gray-800 space-y-2 text-xs">
                <div>
                  <p className="text-amber-400 font-medium mb-1">Advanced Learner Notes</p>
                  <p className="text-gray-400">{c.advancedNotes}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Best For</p>
                  <p className="text-gray-400">{c.bestFor}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Highlights</p>
                  <ul className="text-gray-400 space-y-0.5">
                    {c.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-500 mt-0.5">•</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`https://${c.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-amber-400 hover:text-amber-300 underline"
                >
                  Visit {c.website} →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
