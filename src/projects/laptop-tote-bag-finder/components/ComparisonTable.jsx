import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Check, X, MapPin, Building2, ArrowUpDown } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';

const TIER_OPTIONS = ['All', 'Budget', 'Mid', 'Premium', 'Japanese Premium', 'Artisan Origin'];

export default function ComparisonTable({ onSelectProduct }) {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [tierFilter, setTierFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [fits14Only, setFits14Only] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (tierFilter !== 'All') list = list.filter(p => p.tier === tierFilter);
    if (fits14Only) list = list.filter(p => p.maxLaptop >= 14);
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [sortKey, sortDir, tierFilter, fits14Only]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortHeader = ({ k, label, className = '' }) => (
    <th
      className={`px-2 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500 cursor-pointer hover:text-gray-300 select-none whitespace-nowrap ${className}`}
      onClick={() => toggleSort(k)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === k ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-2.5 h-2.5 opacity-30" />}
      </span>
    </th>
  );

  return (
    <div className="p-6 space-y-4 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Spec Comparison</h2>
        <p className="text-xs text-gray-500 mt-1">Click any column header to sort. Click a row to expand details.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-500 uppercase">Tier:</span>
          {TIER_OPTIONS.map(t => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                tierFilter === t ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-gray-500 hover:text-gray-300 border border-gray-800'
              }`}
            >{t}</button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={fits14Only} onChange={e => setFits14Only(e.target.checked)} className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 w-3 h-3" />
          <span className="text-[10px] text-gray-400">Fits 14&quot; laptop only</span>
        </label>
        <span className="text-[10px] text-gray-600 ml-auto">{filtered.length} of {products.length} bags</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-xs">
          <thead className="bg-gray-900/80">
            <tr>
              <SortHeader k="name" label="Bag" className="sticky left-0 bg-gray-900/80 z-10 min-w-[140px]" />
              <SortHeader k="tier" label="Tier" />
              <SortHeader k="price" label="Price (CAD)" />
              <SortHeader k="weight_lbs" label="Weight" />
              <SortHeader k="capacity_L" label="Capacity" />
              <SortHeader k="maxLaptop" label="Laptop" />
              <SortHeader k="numCarryOptions" label="Carry" />
              <SortHeader k="featureScore" label="Features" />
              <th className="px-2 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500 whitespace-nowrap">Made In</th>
              <th className="px-2 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500 whitespace-nowrap">Canada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filtered.map(p => {
              const isExpanded = expandedId === p.id;
              return (
                <React.Fragment key={p.id}>
                  <tr
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-gray-800/40' : 'hover:bg-gray-800/20'}`}
                    onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  >
                    <td className="px-2 py-2 sticky left-0 bg-gray-950/90 z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                        <div>
                          <p className="text-xs font-medium text-gray-200 leading-tight">{p.brand}</p>
                          <p className="text-[10px] text-gray-500 leading-tight">{p.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                        p.tier === 'Budget' ? 'bg-gray-700/50 text-gray-300' :
                        p.tier === 'Mid' ? 'bg-amber-500/10 text-amber-400' :
                        p.tier === 'Premium' ? 'bg-violet-500/10 text-violet-400' :
                        p.tier === 'Artisan Origin' ? 'bg-emerald-900/30 text-emerald-300' :
                        'bg-blue-900/30 text-blue-300'
                      }`}>{p.tier}</span>
                    </td>
                    <td className="px-2 py-2 text-gray-300 font-medium">${p.price}</td>
                    <td className="px-2 py-2 text-gray-400">{p.weight_lbs} lbs</td>
                    <td className="px-2 py-2 text-gray-400">{p.capacity_L}L</td>
                    <td className="px-2 py-2">
                      <span className={p.maxLaptop >= 14 ? 'text-emerald-400' : 'text-gray-500'}>{p.maxLaptop}&quot;</span>
                    </td>
                    <td className="px-2 py-2 text-gray-400">{p.numCarryOptions}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-teal-500" style={{ width: `${(p.featureScore / 9) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500">{p.featureScore}/9</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-gray-600" />
                        <span className="text-[10px] text-gray-400">{p.madeIn}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      {p.availableInCanada ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-red-400/50" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-gray-800/20">
                      <td colSpan={10} className="px-4 py-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Best For</p>
                            <p className="text-xs text-gray-300">{p.bestFor}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-2">Pros</p>
                            <p className="text-xs text-emerald-400/80">{p.prosText}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-2">Cons</p>
                            <p className="text-xs text-red-400/80">{p.consText}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Verdict</p>
                            <p className="text-xs text-gray-300 italic">{p.verdict}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span className="text-[10px] text-gray-400">Made in: <span className="text-gray-300">{p.madeIn}</span></span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-gray-500" />
                                <span className="text-[10px] text-gray-400">HQ: <span className="text-gray-300">{p.companyHQ}</span></span>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Material: <span className="text-gray-400">{p.material}</span></p>
                            <p className="text-[10px] text-gray-500">Warranty: <span className="text-gray-400">{p.warranty}</span></p>
                            <p className="text-[10px] text-gray-500">Dimensions: <span className="text-gray-400">{p.dimensions}</span></p>
                            {p.canadaPurchaseUrl && (
                              <a href={p.canadaPurchaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-teal-400 hover:text-teal-300 mt-1">
                                <ExternalLink className="w-3 h-3" /> Buy in Canada
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
