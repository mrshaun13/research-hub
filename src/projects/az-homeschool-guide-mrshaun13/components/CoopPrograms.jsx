import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { MapPin, Users, Filter, ExternalLink } from 'lucide-react';
import { coopPrograms, coopComparisonData } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const emphasisColors = {
  'Christian': 'bg-violet-500/20 text-violet-400',
  'Christian (Classical)': 'bg-purple-500/20 text-purple-400',
  'Secular': 'bg-emerald-500/20 text-emerald-400',
  'Inclusive (All faiths)': 'bg-blue-500/20 text-blue-400',
};

export default function CoopPrograms() {
  const [filter, setFilter] = useState('all');
  const [selectedCoop, setSelectedCoop] = useState(null);

  const filtered = filter === 'all' ? coopPrograms :
    filter === 'christian' ? coopPrograms.filter(c => c.emphasis.includes('Christian')) :
    filter === 'secular' ? coopPrograms.filter(c => c.emphasis === 'Secular' || c.emphasis.includes('Inclusive')) :
    filter === 'coop' ? coopPrograms.filter(c => c.type.includes('Co-op')) :
    coopPrograms;

  const radarData = [
    { metric: 'Advanced-Friendly' },
    { metric: 'Social Score' },
    { metric: 'Flexibility' },
  ];

  const topCoops = coopPrograms.filter(c => c.socialScore >= 4).slice(0, 4);
  const radarChartData = radarData.map(d => {
    const obj = { metric: d.metric };
    topCoops.forEach(c => {
      const shortName = c.name.length > 20 ? c.name.substring(0, 20) + '…' : c.name;
      if (d.metric === 'Advanced-Friendly') obj[shortName] = c.advancedFriendly;
      else if (d.metric === 'Social Score') obj[shortName] = c.socialScore;
      else if (d.metric === 'Flexibility') obj[shortName] = c.flexibility;
    });
    return obj;
  });

  const radarColors = ['#f59e0b', '#10b981', '#6366f1', '#06b6d4'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Co-op Programs Near 85234</h1>
        <p className="text-gray-400 text-sm mt-1">7 programs within 10 miles of Gilbert — co-ops, support groups, and PE</p>
      </div>

      <InsightCallout color="emerald">
        <strong>Gilbert is a homeschool hotspot.</strong> The East Valley has one of the densest concentrations of 
        homeschool co-ops in Arizona. You have both Christian and secular options within minutes of 85234, 
        plus <strong>Fit For Service</strong> meets right at Freestone Park for twice-weekly PE.
      </InsightCallout>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Filter className="w-4 h-4 text-gray-500 mt-1.5" />
        {[
          { id: 'all', label: 'All Programs' },
          { id: 'coop', label: 'Co-ops Only' },
          { id: 'christian', label: 'Christian' },
          { id: 'secular', label: 'Secular / Inclusive' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filter === f.id
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cost Comparison Chart */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-1">Annual Cost Comparison</h3>
        <p className="text-xs text-gray-500 mb-3">Low to high cost range by program</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={coopComparisonData.sort((a, b) => a.midCost - b.midCost)} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${v.toLocaleString()}`} />
            <YAxis dataKey="name" type="category" width={140} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
            <Bar dataKey="lowCost" name="Low Estimate" fill="#10b981" barSize={10} />
            <Bar dataKey="highCost" name="High Estimate" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={10} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-1">Program Comparison Radar</h3>
        <p className="text-xs text-gray-500 mb-3">Advanced-friendliness, social opportunities, and scheduling flexibility</p>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarChartData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {topCoops.map((c, i) => {
              const shortName = c.name.length > 20 ? c.name.substring(0, 20) + '…' : c.name;
              return (
                <Radar
                  key={c.id}
                  name={shortName}
                  dataKey={shortName}
                  stroke={radarColors[i]}
                  fill={radarColors[i]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              );
            })}
            <Legend wrapperStyle={{ fontSize: 10, color: '#9ca3af' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Co-op Cards */}
      <div className="space-y-4">
        {filtered.map(c => (
          <div
            key={c.id}
            className={`bg-gray-900 rounded-xl border p-4 cursor-pointer transition-all ${
              selectedCoop === c.id ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-gray-800 hover:border-gray-700'
            }`}
            onClick={() => setSelectedCoop(selectedCoop === c.id ? null : c.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-100">{c.name}</h3>
                <p className="text-xs text-gray-500">{c.type} · {c.frequency}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${emphasisColors[c.emphasis] || 'bg-gray-700 text-gray-400'}`}>
                {c.emphasis}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span className="text-gray-400">{c.distance}</span>
              </div>
              <div>
                <span className="text-gray-500">Ages:</span>
                <span className="text-gray-300 ml-1">{c.ageRange}</span>
              </div>
              <div>
                <span className="text-gray-500">Cost:</span>
                <span className="text-amber-400 ml-1 font-medium">{c.costEstimate.label}</span>
              </div>
              <div>
                <span className="text-gray-500">Parent Teaching:</span>
                <span className={`ml-1 ${c.parentTeaching ? 'text-amber-400' : 'text-gray-600'}`}>
                  {c.parentTeaching ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400">{c.format}</p>

            {selectedCoop === c.id && (
              <div className="mt-3 pt-3 border-t border-gray-800 space-y-2 text-xs">
                <div>
                  <p className="text-gray-300 font-medium mb-1">Highlights</p>
                  <ul className="text-gray-400 space-y-0.5">
                    {c.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500 mt-0.5">•</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3">
                  {c.website && (
                    <a
                      href={`https://${c.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" /> {c.website}
                    </a>
                  )}
                  {c.contact && !c.contact.includes('http') && (
                    <span className="text-gray-500">Contact: {c.contact}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
