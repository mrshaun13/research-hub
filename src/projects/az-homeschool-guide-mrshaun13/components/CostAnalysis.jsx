import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, ComposedChart, Line } from 'recharts';
import { DollarSign } from 'lucide-react';
import { costComparisonData, fundingComparison } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const ESA_AVERAGE = 7700;

export default function CostAnalysis() {
  const [showESALine, setShowESALine] = useState(true);

  const fundingChartData = fundingComparison.map(f => ({
    name: f.scenario,
    curriculum: f.curriculumCost,
    coop: f.coopCost,
    total: f.totalCost,
    esaRemaining: f.esaRemaining,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Cost Analysis</h1>
        <p className="text-gray-400 text-sm mt-1">Curriculum costs, co-op fees, and ESA funding scenarios</p>
      </div>

      <InsightCallout color="emerald">
        <strong>Arizona's ESA program is a game-changer.</strong> With ~$7,700/year per student, every single curriculum 
        and co-op combination in this guide is fully covered — most with thousands left over for tutoring, enrichment, 
        educational technology, or savings.
      </InsightCallout>

      {/* Curriculum Cost Range Chart */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-100">Curriculum Cost Range (per year)</h3>
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={showESALine}
              onChange={() => setShowESALine(!showESALine)}
              className="rounded border-gray-600"
            />
            Show ESA line
          </label>
        </div>
        <p className="text-xs text-gray-500 mb-3">Low to high cost range, sorted cheapest first</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={costComparisonData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${v.toLocaleString()}`} />
            <YAxis dataKey="name" type="category" width={130} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
            <Bar dataKey="lowCost" name="Low Estimate" fill="#10b981" radius={[0, 0, 0, 0]} barSize={12} />
            <Bar dataKey="highCost" name="High Estimate" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={12} />
            {showESALine && (
              <ReferenceLine x={ESA_AVERAGE} stroke="#06b6d4" strokeDasharray="5 5" label={{ value: `ESA ~$${ESA_AVERAGE.toLocaleString()}`, fill: '#06b6d4', fontSize: 10, position: 'top' }} />
            )}
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Funding Scenarios */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-1">Funding Scenarios — Curriculum + Co-op</h3>
        <p className="text-xs text-gray-500 mb-3">Total annual cost vs ESA remaining funds</p>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={fundingChartData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${v.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
            <Bar dataKey="curriculum" name="Curriculum" fill="#6366f1" stackId="cost" barSize={35} />
            <Bar dataKey="coop" name="Co-op" fill="#8b5cf6" stackId="cost" radius={[4, 4, 0, 0]} barSize={35} />
            <Line dataKey="esaRemaining" name="ESA Remaining" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
            <ReferenceLine y={ESA_AVERAGE} stroke="#06b6d4" strokeDasharray="5 5" label={{ value: 'ESA Budget', fill: '#06b6d4', fontSize: 10 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fundingComparison.map((f, i) => (
          <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-100">{f.scenario}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                {f.esaCovered ? 'ESA Covered ✓' : 'Partial Coverage'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{f.curriculum}</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2">
              <div className="bg-gray-800/50 rounded-lg py-1.5">
                <p className="text-amber-400 font-bold">${f.totalCost.toLocaleString()}</p>
                <p className="text-gray-600">Total Cost</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg py-1.5">
                <p className="text-emerald-400 font-bold">${f.esaRemaining.toLocaleString()}</p>
                <p className="text-gray-600">ESA Left</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg py-1.5">
                <p className="text-cyan-400 font-bold">{Math.round((f.esaRemaining / ESA_AVERAGE) * 100)}%</p>
                <p className="text-gray-600">ESA Unused</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{f.notes}</p>
          </div>
        ))}
      </div>

      <InsightCallout color="amber">
        <strong>Bottom line:</strong> Even the most expensive combination (Classical Conversations at $3,500/yr) 
        is fully covered by the ESA. Budget-conscious families can spend under $300/year and bank the rest for 
        enrichment, dual enrollment, or educational technology.
      </InsightCallout>
    </div>
  );
}
