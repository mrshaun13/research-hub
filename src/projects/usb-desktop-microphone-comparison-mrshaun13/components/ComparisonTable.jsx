import React, { useState } from 'react';
import { mics, tiers } from '../data/micData';

const tierColors = { budget: "emerald", mid: "indigo", "upper-mid": "amber", premium: "red" };
const tierBg = { budget: "bg-emerald-900/40 text-emerald-300 border-emerald-500/40", mid: "bg-indigo-900/40 text-indigo-300 border-indigo-500/40", "upper-mid": "bg-amber-900/40 text-amber-300 border-amber-500/40", premium: "bg-red-900/40 text-red-300 border-red-500/40" };

function Check({ val }) {
  return val
    ? <span className="text-green-400 font-bold">✓</span>
    : <span className="text-gray-600">—</span>;
}

export default function ComparisonTable() {
  const [sortKey, setSortKey] = useState('price');
  const [filterTier, setFilterTier] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const sorted = [...mics]
    .filter(m => filterTier === 'all' || m.tier === filterTier)
    .filter(m => filterType === 'all' || m.type === filterType)
    .sort((a, b) => sortKey === 'price' ? a.price - b.price : sortKey === 'rating' ? b.rating - a.rating : b.valueScore - a.valueScore);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 text-sm">Sort:</span>
          {['price', 'rating', 'valueScore'].map(k => (
            <button key={k} onClick={() => setSortKey(k)}
              className={`px-3 py-1 rounded text-sm border ${sortKey === k ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}>
              {k === 'valueScore' ? 'Value' : k.charAt(0).toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 text-sm">Tier:</span>
          {['all', ...tiers.map(t => t.id)].map(t => (
            <button key={t} onClick={() => setFilterTier(t)}
              className={`px-3 py-1 rounded text-sm border ${filterTier === t ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}>
              {t === 'all' ? 'All' : tiers.find(x => x.id === t)?.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 text-sm">Type:</span>
          {['all', 'condenser', 'dynamic'].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded text-sm border ${filterType === t ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left text-gray-400 font-semibold px-4 py-3">Microphone</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Price</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Type</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Bit/kHz</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Rating</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Value</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">🎧 Jack</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">🔇 Mute</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">DSP</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">Stand</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3">XLR</th>
              <th className="text-center text-gray-400 font-semibold px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((mic) => (
              <React.Fragment key={mic.id}>
                <tr className="border-b border-gray-700 hover:bg-gray-750 bg-gray-800/60 cursor-pointer" onClick={() => setExpanded(expanded === mic.id ? null : mic.id)}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{mic.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded border ${tierBg[mic.tier]}`}>{tiers.find(t => t.id === mic.tier)?.label}</span>
                      <span className="text-xs text-gray-500">{mic.brand}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="font-bold text-white">${mic.price.toFixed(2)}</div>
                    {mic.price < mic.msrp && <div className="text-xs text-gray-500 line-through">${mic.msrp.toFixed(2)}</div>}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded ${mic.type === 'condenser' ? 'bg-blue-900/40 text-blue-300' : 'bg-orange-900/40 text-orange-300'}`}>
                      {mic.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-gray-300 text-xs">{mic.sampleRate.split('/')[0].trim()} / {mic.sampleRate.split('/')[1].trim()}</td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-semibold">{mic.rating}</span>
                      <span className="text-gray-500 text-xs">({mic.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <div className="relative w-12 h-2 bg-gray-700 rounded-full">
                        <div className="absolute left-0 top-0 h-2 rounded-full bg-indigo-500" style={{ width: `${(mic.valueScore / 10) * 100}%` }} />
                      </div>
                      <span className="ml-2 text-xs text-gray-300">{mic.valueScore}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center"><Check val={mic.headphoneJack} /></td>
                  <td className="px-3 py-3 text-center"><Check val={mic.muteButton} /></td>
                  <td className="px-3 py-3 text-center"><Check val={mic.onboardDSP} /></td>
                  <td className="px-3 py-3 text-center"><Check val={mic.standIncluded} /></td>
                  <td className="px-3 py-3 text-center"><Check val={mic.xlrOption} /></td>
                  <td className="px-3 py-3 text-center text-gray-400">{expanded === mic.id ? '▲' : '▼'}</td>
                </tr>
                {expanded === mic.id && (
                  <tr className="bg-gray-900/60 border-b border-gray-700">
                    <td colSpan={12} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="text-indigo-300 font-semibold mb-2">Verdict</div>
                          <p className="text-gray-300 text-sm">{mic.verdict}</p>
                        </div>
                        <div>
                          <div className="text-green-400 font-semibold mb-2">Pros</div>
                          <ul className="space-y-1">
                            {mic.pros.map((p, i) => <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-green-400 mt-0.5">+</span>{p}</li>)}
                          </ul>
                        </div>
                        <div>
                          <div className="text-red-400 font-semibold mb-2">Cons</div>
                          <ul className="space-y-1 mb-4">
                            {mic.cons.map((c, i) => <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-red-400 mt-0.5">−</span>{c}</li>)}
                          </ul>
                          <div className="flex gap-3 mt-2">
                            <a href={mic.amazonUrl} target="_blank" rel="noopener noreferrer"
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-sm font-semibold transition-colors">
                              Amazon →
                            </a>
                            <a href={mic.officialUrl} target="_blank" rel="noopener noreferrer"
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors">
                              Official Site →
                            </a>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Sources: {mic.sources.join(' · ')}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-500 text-xs">Click any row to expand details and purchase links. Prices verified March 2026 from official retailer and manufacturer sites.</p>
    </div>
  );
}
