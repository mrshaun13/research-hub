import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { jobData, costOfLiving } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const tierColors = { chill: '#22c55e', comfortable: '#eab308', leveraged: '#f97316', ambitious: '#ef4444' };

export default function MoneyMath() {
  const [scenario, setScenario] = useState('mid');

  const sortedJobs = [...jobData].sort((a, b) => {
    const aVal = scenario === 'low' ? a.salaryLow : scenario === 'mid' ? a.salaryMid : a.salaryHigh;
    const bVal = scenario === 'low' ? b.salaryLow : scenario === 'mid' ? b.salaryMid : b.salaryHigh;
    return bVal - aVal;
  });

  const chartData = sortedJobs.map(j => ({
    name: j.title.length > 22 ? j.title.substring(0, 20) + '…' : j.title,
    salary: scenario === 'low' ? j.salaryLow : scenario === 'mid' ? j.salaryMid : j.salaryHigh,
    tier: j.tier,
    monthly: Math.round((scenario === 'low' ? j.salaryLow : scenario === 'mid' ? j.salaryMid : j.salaryHigh) / 12),
    hourly: j.hourlyMid || Math.round((scenario === 'mid' ? j.salaryMid : j.salaryLow) / 2080 * 100) / 100,
  }));

  const { monthlyBudgetEstimate: budget } = costOfLiving;

  const budgetBreakdown = [
    { category: 'Housing', amount: budget.housing, color: '#3b82f6' },
    { category: 'Groceries', amount: budget.groceries, color: '#22c55e' },
    { category: 'Transportation', amount: budget.transportation, color: '#f59e0b' },
    { category: 'Insurance', amount: budget.insurance, color: '#ef4444' },
    { category: 'Utilities', amount: budget.utilities, color: '#8b5cf6' },
    { category: 'Misc/Savings', amount: budget.misc, color: '#6b7280' },
  ];

  const meetsComfort = sortedJobs.filter(j => {
    const sal = scenario === 'low' ? j.salaryLow : scenario === 'mid' ? j.salaryMid : j.salaryHigh;
    return sal >= budget.comfortableAnnual;
  });

  const meetsMinimum = sortedJobs.filter(j => {
    const sal = scenario === 'low' ? j.salaryLow : scenario === 'mid' ? j.salaryMid : j.salaryHigh;
    return sal >= budget.annualMinimum;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Money Math</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          What do you actually need to earn in Hendersonville? Tennessee has no state income tax, 
          and the cost of living is 5% below the national average. Let's see which jobs clear the bar.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">${(budget.annualMinimum / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-gray-500 uppercase mt-1">Survival Floor</p>
          <p className="text-[10px] text-gray-600">${(budget.annualMinimum / 12).toLocaleString()}/mo bare minimum</p>
        </div>
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">${(budget.comfortableAnnual / 1000).toFixed(0)}K</p>
          <p className="text-[10px] text-gray-500 uppercase mt-1">Comfortable</p>
          <p className="text-[10px] text-gray-600">${(budget.comfortableAnnual / 12).toLocaleString()}/mo with breathing room</p>
        </div>
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">${(costOfLiving.medianHouseholdIncome / 1000).toFixed(1)}K</p>
          <p className="text-[10px] text-gray-500 uppercase mt-1">Area Median</p>
          <p className="text-[10px] text-gray-600">Hendersonville household median</p>
        </div>
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-cyan-400">0%</p>
          <p className="text-[10px] text-gray-500 uppercase mt-1">State Income Tax</p>
          <p className="text-[10px] text-gray-600">TN has no income tax</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Show salary at:</span>
        {[
          { key: 'low', label: '25th %ile (starting)' },
          { key: 'mid', label: 'Median (typical)' },
          { key: 'high', label: '75th %ile (experienced)' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
              scenario === s.key ? 'bg-white/10 border-white/20 text-white' : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">All 18 Roles — Salary Comparison</h3>
          <span className="text-[10px] text-gray-500">
            {meetsComfort.length}/18 meet comfort | {meetsMinimum.length}/18 meet minimum
          </span>
        </div>
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 'auto']}
              tick={{ fill: '#6b7280', fontSize: 10 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <YAxis type="category" dataKey="name" width={140} tick={{ fill: '#d1d5db', fontSize: 10 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-xs">
                    <p className="text-white font-medium">{d.name}</p>
                    <p className="text-gray-400">Annual: <span className="text-white font-bold">${d.salary.toLocaleString()}</span></p>
                    <p className="text-gray-400">Monthly: <span className="text-white">${d.monthly.toLocaleString()}</span></p>
                    <p className="text-gray-400">Hourly: <span className="text-white">~${d.hourly}</span></p>
                  </div>
                );
              }}
            />
            <ReferenceLine x={budget.annualMinimum} stroke="#ef4444" strokeDasharray="6 3" label={{ value: '$36K min', fill: '#ef4444', fontSize: 9, position: 'top' }} />
            <ReferenceLine x={budget.comfortableAnnual} stroke="#eab308" strokeDasharray="6 3" label={{ value: '$48K comfort', fill: '#eab308', fontSize: 9, position: 'top' }} />
            <Bar dataKey="salary" name="Salary" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={tierColors[entry.tier]} opacity={entry.salary >= budget.comfortableAnnual ? 0.85 : 0.4} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 text-center mt-1">
          Red line = $36K survival floor | Yellow line = $48K comfortable threshold | Faded bars = below comfort line
        </p>
      </div>

      <InsightCallout color="amber" title="The Real Talk">
        At median pay, 11 of 18 roles clear your $48K comfort line. The "chill zone" jobs mostly fall 
        below it — Costco is the exception once you factor in their excellent benefits (health, dental, 
        vision, 401k match, free memberships). At the 75th percentile (achievable with your experience), 
        15 of 18 roles clear it. The math says: you have options.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Monthly Budget Breakdown</h2>
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-1 mb-3">
            {budgetBreakdown.map(item => (
              <div
                key={item.category}
                className="h-6 rounded-sm relative group cursor-default"
                style={{
                  width: `${(item.amount / budget.total) * 100}%`,
                  backgroundColor: item.color,
                  opacity: 0.7,
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded px-2 py-0.5 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {item.category}: ${item.amount}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {budgetBreakdown.map(item => (
              <div key={item.category} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.7 }} />
                <span className="text-[10px] text-gray-400">{item.category}</span>
                <span className="text-[10px] text-gray-300 font-medium">${item.amount}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Total: <span className="text-white font-medium">${budget.total.toLocaleString()}/mo</span> = 
            <span className="text-white font-medium"> ${(budget.total * 12).toLocaleString()}/yr</span> minimum comfortable
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Benefits Value Calculator</h2>
        <p className="text-xs text-gray-500 mb-3">
          Don't just compare salaries — compare total compensation. Benefits can add $5K-$15K in value.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-green-400 mb-2">Costco at $22/hr ($45,760)</h3>
            <div className="space-y-1 text-[11px] text-gray-400">
              <p>+ Health/dental/vision: ~$6,000 value</p>
              <p>+ 401k match: ~$1,800 value</p>
              <p>+ Free memberships (x4): ~$260 value</p>
              <p>+ Sunday premium pay: ~$1,500/yr</p>
              <p>+ Semi-annual bonus (tenured): ~$2,000</p>
              <p className="text-green-300 font-medium pt-1 border-t border-green-500/20">
                ≈ $57,300 total compensation
              </p>
            </div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">Dental Receptionist at $38K</h3>
            <div className="space-y-1 text-[11px] text-gray-400">
              <p>+ Health insurance: ~$5,000 value</p>
              <p>+ Free dental care: ~$1,500 value</p>
              <p>+ PTO: ~$2,200 value</p>
              <p>+ No weekends/holidays</p>
              <p>+ Predictable M-F schedule</p>
              <p className="text-amber-300 font-medium pt-1 border-t border-amber-500/20">
                ≈ $46,700 total compensation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
