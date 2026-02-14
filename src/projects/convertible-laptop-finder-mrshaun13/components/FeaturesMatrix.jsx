import React from 'react';
import { Check, X } from 'lucide-react';
import { productsWithDerived, BRAND_COLORS, FEATURE_DEFINITIONS } from '../data/products';
import InsightCallout from './InsightCallout';

const FeaturesMatrix = () => {
  const sorted = [...productsWithDerived].sort((a, b) => b.featureScore - a.featureScore);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Features Matrix</h2>
      <p className="text-gray-400 text-sm mb-6">Side-by-side feature comparison across all 12 models. Green = has feature, red = missing.</p>

      <div className="overflow-x-auto rounded-xl border border-gray-700/50 mb-6">
        <table className="w-full text-xs">
          <thead className="bg-gray-800/80">
            <tr>
              <th className="text-left text-gray-400 py-2 px-3 font-medium sticky left-0 bg-gray-800/80 z-10 min-w-[180px]">Model</th>
              {FEATURE_DEFINITIONS.map(f => (
                <th key={f.key} className="text-center text-gray-400 py-2 px-1.5 font-medium min-w-[60px]" title={f.description}>
                  <span className="block text-[9px] leading-tight">{f.label}</span>
                </th>
              ))}
              <th className="text-center text-gray-400 py-2 px-2 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id} className="border-t border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-2 px-3 sticky left-0 bg-gray-900/90 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                    <div>
                      <p className="text-gray-200 text-xs font-medium leading-tight">{p.model.length > 28 ? p.model.slice(0, 25) + '...' : p.model}</p>
                      <p className="text-gray-500 text-[9px]">${p.price.toLocaleString()}</p>
                    </div>
                  </div>
                </td>
                {FEATURE_DEFINITIONS.map(f => (
                  <td key={f.key} className="text-center py-2 px-1.5">
                    {p[f.key] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-red-500/40 mx-auto" />
                    )}
                  </td>
                ))}
                <td className="text-center py-2 px-2">
                  <span className={`font-bold ${p.featureScore >= 10 ? 'text-emerald-400' : p.featureScore >= 7 ? 'text-amber-400' : 'text-gray-400'}`}>
                    {p.featureScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightCallout variant="info" title="Feature Score Breakdown">
        The feature score counts how many of the 13 tracked features each model has. The <strong>ThinkPad X1 2-in-1</strong> and
        <strong> LG Gram Pro 16</strong> lead with the most features, while the <strong>Surface Pro 11</strong> trails due to its
        detachable design sacrificing ports and keyboard (sold separately). Note that feature count alone does not determine the best laptop —
        a model with fewer features but the right ones for your needs may be the better choice.
      </InsightCallout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-white font-semibold text-sm mb-3">OLED vs IPS Display Breakdown</h3>
          <div className="space-y-2">
            {productsWithDerived.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{p.model.length > 25 ? p.model.slice(0, 22) + '...' : p.model}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    p.displayType === 'OLED' || p.displayType === 'AMOLED'
                      ? 'bg-purple-900/50 text-purple-300'
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {p.displayType}
                  </span>
                  <span className="text-gray-500 text-[10px]">{p.displayRes} {p.displayRefresh}Hz</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-white font-semibold text-sm mb-3">Port Comparison</h3>
          <div className="space-y-2">
            {[...productsWithDerived].sort((a, b) => (b.portsUsbc + b.portsUsba + (b.hdmiPort ? 1 : 0)) - (a.portsUsbc + a.portsUsba + (a.hdmiPort ? 1 : 0))).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{p.model.length > 22 ? p.model.slice(0, 19) + '...' : p.model}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-400 text-[10px]">{p.portsUsbc}x USB-C</span>
                  {p.portsUsba > 0 && <span className="text-gray-400 text-[10px]">{p.portsUsba}x USB-A</span>}
                  {p.hdmiPort && <span className="text-amber-400 text-[10px]">HDMI</span>}
                  {p.sdCardSlot && <span className="text-emerald-400 text-[10px]">SD</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesMatrix;
