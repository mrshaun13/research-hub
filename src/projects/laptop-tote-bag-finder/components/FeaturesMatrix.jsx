import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import { products, featureList, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

export default function FeaturesMatrix() {
  const [fits14Only, setFits14Only] = useState(false);
  const filtered = fits14Only ? products.filter(p => p.maxLaptop >= 14) : products;

  const sorted = [...filtered].sort((a, b) => b.featureScore - a.featureScore);

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Features &amp; Organization</h2>
        <p className="text-xs text-gray-500 mt-1">Boolean feature comparison across all bags</p>
      </div>

      <InsightCallout variant="info" title="What matters most for your needs">
        Your must-haves are zipper closure and laptop sleeve. High-value extras: water bottle pocket, crossbody strap, and luggage pass-through for travel. The Lo &amp; Sons O.G. 2 and Moment Tech Tote score highest overall, but only the Moment fits a 14&quot; laptop.
      </InsightCallout>

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
              <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500 sticky left-0 bg-gray-900/80 z-10 min-w-[130px]">Bag</th>
              {featureList.map(f => (
                <th key={f.key} className="px-2 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500 whitespace-nowrap" title={f.description}>
                  <div className="flex flex-col items-center gap-0.5">
                    <span>{f.label}</span>
                  </div>
                </th>
              ))}
              <th className="px-2 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {sorted.map(p => (
              <tr key={p.id} className="hover:bg-gray-800/20">
                <td className="px-3 py-2 sticky left-0 bg-gray-950/90 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                    <div>
                      <p className="text-xs font-medium text-gray-200 leading-tight">{p.brand}</p>
                      <p className="text-[10px] text-gray-500 leading-tight">{p.model}</p>
                    </div>
                  </div>
                </td>
                {featureList.map(f => (
                  <td key={f.key} className="px-2 py-2 text-center">
                    {p[f.key] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-700 mx-auto" />
                    )}
                  </td>
                ))}
                <td className="px-2 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-10 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${p.featureScore >= 8 ? 'bg-emerald-500' : p.featureScore >= 6 ? 'bg-amber-500' : 'bg-gray-600'}`}
                        style={{ width: `${(p.featureScore / 9) * 100}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${p.featureScore >= 8 ? 'text-emerald-400' : p.featureScore >= 6 ? 'text-amber-400' : 'text-gray-500'}`}>
                      {p.featureScore}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {featureList.map(f => (
          <div key={f.key} className="bg-gray-900/40 border border-gray-800 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Info className="w-3 h-3 text-gray-600" />
              <span className="text-[10px] font-semibold text-gray-300">{f.label}</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">{f.description}</p>
            <p className="text-[10px] text-teal-400/70 mt-1">
              {products.filter(p => p[f.key]).length} of {products.length} bags
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
