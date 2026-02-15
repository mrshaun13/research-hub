import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { productsWithDerived, BRAND_COLORS, USE_CASES } from '../data/products';
import InsightCallout from './InsightCallout';

const UseCaseFit = () => {
  const topPicks = [
    'lenovo-yoga-9i-gen10',
    'asus-proart-px13',
    'hp-omnibook-x-flip-14',
    'microsoft-surface-pro-11',
    'lg-gram-pro-2in1-16',
  ];

  const radarProducts = productsWithDerived.filter(p => topPicks.includes(p.id));

  const radarData = USE_CASES.map(uc => {
    const entry = { useCase: uc.label };
    radarProducts.forEach(p => { entry[p.id] = p.useCaseRatings[uc.key] || 0; });
    return entry;
  });

  const allProducts = [...productsWithDerived].sort((a, b) => {
    const aTotal = Object.values(a.useCaseRatings).reduce((s, v) => s + v, 0);
    const bTotal = Object.values(b.useCaseRatings).reduce((s, v) => s + v, 0);
    return bTotal - aTotal;
  });

  const ucBest = USE_CASES.map(uc => {
    const best = [...productsWithDerived].sort((a, b) => (b.useCaseRatings[uc.key] || 0) - (a.useCaseRatings[uc.key] || 0))[0];
    return { ...uc, best };
  });

  const ratingColor = (r) => r >= 4 ? 'text-emerald-400 bg-emerald-900/30' : r >= 3 ? 'text-amber-400 bg-amber-900/30' : 'text-red-400 bg-red-900/30';

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Use Case Fit</h2>
      <p className="text-gray-400 text-sm mb-6">How well each laptop fits your specific needs, rated 1-5 per use case</p>

      <InsightCallout variant="recommendation" title="Your Use Cases">
        Based on your requirements: IDE development, AI development, web/email, tablet/media mode in the family room, and portability.
        The radar chart below shows how the top 5 contenders stack up across all five dimensions.
      </InsightCallout>

      <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 mb-6">
        <h3 className="text-white font-semibold text-sm mb-3">Top 5 Contenders — Radar Comparison</h3>
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="useCase" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {radarProducts.map(p => (
              <Radar
                key={p.id}
                name={p.brand + ' ' + p.model.split(' ').slice(0, 2).join(' ')}
                dataKey={p.id}
                stroke={BRAND_COLORS[p.brand]}
                fill={BRAND_COLORS[p.brand]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {radarProducts.map(p => (
            <div key={p.id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
              <span className="text-gray-400 text-xs">{p.brand} {p.model.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {ucBest.map(uc => (
          <div key={uc.key} className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Best for {uc.label}</p>
            <p className="text-white font-semibold text-sm">{uc.best.name}</p>
            <p className="text-gray-400 text-xs mt-0.5">{uc.best.useCaseRatings[uc.key]}/5 — {uc.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 mb-6">
        <h3 className="text-white font-semibold text-sm mb-3">Full Use Case Rating Grid</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-2 px-2 font-medium">Model</th>
                {USE_CASES.map(uc => (
                  <th key={uc.key} className="text-center text-gray-400 py-2 px-2 font-medium">{uc.label}</th>
                ))}
                <th className="text-center text-gray-400 py-2 px-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map(p => {
                const total = Object.values(p.useCaseRatings).reduce((s, v) => s + v, 0);
                return (
                  <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                        <span className="text-gray-300 text-xs">{p.model.length > 28 ? p.model.slice(0, 25) + '...' : p.model}</span>
                      </div>
                    </td>
                    {USE_CASES.map(uc => (
                      <td key={uc.key} className="py-2 px-2 text-center">
                        <span className={`inline-block w-7 py-0.5 rounded text-[10px] font-semibold ${ratingColor(p.useCaseRatings[uc.key])}`}>
                          {p.useCaseRatings[uc.key]}
                        </span>
                      </td>
                    ))}
                    <td className="py-2 px-2 text-center">
                      <span className={`font-semibold ${total >= 20 ? 'text-emerald-400' : total >= 15 ? 'text-amber-400' : 'text-gray-400'}`}>
                        {total}/25
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout variant="warning" title="The AI Development Gap">
        Only the ASUS ProArt PX13 scores 5/5 for AI development thanks to its RTX 4060 GPU. Every other model scores 2/5 or lower
        because integrated graphics cannot handle GPU-accelerated training, CUDA workloads, or running large local models efficiently.
        If AI/ML is a primary use case, the ProArt PX13 is the only viable 2-in-1 option — otherwise, consider a separate desktop/cloud setup for heavy AI work.
      </InsightCallout>
    </div>
  );
};

export default UseCaseFit;
