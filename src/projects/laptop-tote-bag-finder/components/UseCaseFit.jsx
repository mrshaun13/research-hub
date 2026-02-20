import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Briefcase, Plane, Building } from 'lucide-react';
import { products, useCases, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const USE_CASE_ICONS = { commute: Briefcase, travel: Plane, workMeetings: Building };
const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent' };
const RATING_COLORS = { 1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400', 4: 'text-emerald-400', 5: 'text-teal-300' };

const topPicks = useCases.map(uc => {
  const best = [...products].sort((a, b) => b.useCaseRatings[uc.key] - a.useCaseRatings[uc.key])[0];
  return { ...uc, best };
});

const radarProducts = products.filter(p => p.maxLaptop >= 14).slice(0, 5);
const radarData = useCases.map(uc => {
  const entry = { useCase: uc.label };
  radarProducts.forEach(p => { entry[p.brand + ' ' + p.model] = p.useCaseRatings[uc.key]; });
  return entry;
});

export default function UseCaseFit() {
  const [fits14Only, setFits14Only] = useState(true);
  const filtered = fits14Only ? products.filter(p => p.maxLaptop >= 14) : products;
  const sorted = [...filtered].sort((a, b) => {
    const aTotal = Object.values(a.useCaseRatings).reduce((s, v) => s + v, 0);
    const bTotal = Object.values(b.useCaseRatings).reduce((s, v) => s + v, 0);
    return bTotal - aTotal;
  });

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Use Case Fit</h2>
        <p className="text-xs text-gray-500 mt-1">How well each bag fits your three main scenarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {topPicks.map(tp => {
          const Icon = USE_CASE_ICONS[tp.key];
          return (
            <div key={tp.key} className="bg-gray-900/60 border border-gray-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{tp.label}</p>
                  <p className="text-xs text-gray-400">{tp.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[tp.best.brand] }} />
                <p className="text-xs font-medium text-white">{tp.best.name}</p>
                <span className="text-[10px] text-teal-400 ml-auto">{tp.best.useCaseRatings[tp.key]}/5</span>
              </div>
            </div>
          );
        })}
      </div>

      <InsightCallout variant="recommendation" title="Best All-Rounder">
        The Bellroy Tokyo Wonder Tote 12L scores highest across all three use cases combined (14/15) among bags that fit a 14&quot; laptop. It excels at commuting and work meetings while still being travel-friendly with its luggage pass-through.
      </InsightCallout>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Radar: Top Contenders (14&quot; laptop compatible)</h3>
        <p className="text-[10px] text-gray-500 mb-3">Larger area = better all-around fit</p>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#1f2937" />
            <PolarAngleAxis dataKey="useCase" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9, fill: '#6b7280' }} />
            {radarProducts.map((p, i) => (
              <Radar
                key={p.id}
                name={p.brand}
                dataKey={p.brand + ' ' + p.model}
                stroke={BRAND_COLORS[p.brand]}
                fill={BRAND_COLORS[p.brand]}
                fillOpacity={0.08}
                strokeWidth={1.5}
              />
            ))}
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px' }}
              itemStyle={{ color: '#d1d5db', fontSize: '10px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {radarProducts.map(p => (
            <div key={p.id} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
              <span className="text-[10px] text-gray-400">{p.brand}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={fits14Only} onChange={e => setFits14Only(e.target.checked)} className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 w-3 h-3" />
          <span className="text-[10px] text-gray-400">Show only bags that fit 14&quot; laptop</span>
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-xs">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500 min-w-[130px]">Bag</th>
              {useCases.map(uc => (
                <th key={uc.key} className="px-3 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">{uc.label}</th>
              ))}
              <th className="px-3 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {sorted.map(p => {
              const total = Object.values(p.useCaseRatings).reduce((s, v) => s + v, 0);
              return (
                <tr key={p.id} className="hover:bg-gray-800/20">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                      <div>
                        <p className="text-xs font-medium text-gray-200">{p.brand}</p>
                        <p className="text-[10px] text-gray-500">{p.model}</p>
                      </div>
                    </div>
                  </td>
                  {useCases.map(uc => {
                    const r = p.useCaseRatings[uc.key];
                    return (
                      <td key={uc.key} className="px-3 py-2 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(n => (
                              <div key={n} className={`w-1.5 h-1.5 rounded-full ${n <= r ? 'bg-teal-400' : 'bg-gray-800'}`} />
                            ))}
                          </div>
                          <span className={`text-[9px] ${RATING_COLORS[r]}`}>{RATING_LABELS[r]}</span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-center">
                    <span className={`text-xs font-bold ${total >= 13 ? 'text-teal-300' : total >= 10 ? 'text-amber-400' : 'text-gray-500'}`}>{total}/15</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
