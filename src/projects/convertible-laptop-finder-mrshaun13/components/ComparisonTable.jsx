import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ArrowUpDown } from 'lucide-react';
import { productsWithDerived, BRAND_COLORS, TIER_COLORS } from '../data/products';

const ComparisonTable = ({ onSelectProduct }) => {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [filterTier, setFilterTier] = useState('All');
  const [filterBrand, setFilterBrand] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const tiers = ['All', ...new Set(productsWithDerived.map(p => p.tier))];
  const brands = ['All', ...new Set(productsWithDerived.map(p => p.brand))].sort();

  const sorted = useMemo(() => {
    let list = [...productsWithDerived];
    if (filterTier !== 'All') list = list.filter(p => p.tier === filterTier);
    if (filterBrand !== 'All') list = list.filter(p => p.brand === filterBrand);
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return list;
  }, [sortKey, sortDir, filterTier, filterBrand]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortHeader = ({ k, label, className = '' }) => (
    <th
      className={`px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white select-none ${className}`}
      onClick={() => toggleSort(k)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortKey === k ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
      </div>
    </th>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Spec Comparison</h2>
      <p className="text-gray-400 text-sm mb-4">Click any column header to sort. Click a row to expand details.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">Tier:</span>
          {tiers.map(t => (
            <button
              key={t}
              onClick={() => setFilterTier(t)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterTier === t ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {t} {t !== 'All' && `(${productsWithDerived.filter(p => p.tier === t).length})`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">Brand:</span>
          <select
            value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            className="bg-gray-800 text-gray-300 text-xs rounded-lg px-2 py-1 border border-gray-700"
          >
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <span className="text-gray-600 text-xs self-center ml-auto">{sorted.length} of {productsWithDerived.length} models</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80">
            <tr>
              <SortHeader k="name" label="Model" className="min-w-[180px] sticky left-0 bg-gray-800/80 z-10" />
              <SortHeader k="price" label="Price" />
              <SortHeader k="ram" label="RAM" />
              <SortHeader k="cpu" label="CPU" className="min-w-[140px]" />
              <SortHeader k="displaySize" label="Screen" />
              <SortHeader k="displayType" label="Panel" />
              <SortHeader k="batteryLifeHrs" label="Battery" />
              <SortHeader k="weightLbs" label="Weight" />
              <SortHeader k="geekbench6Multi" label="GB6 Multi" />
              <SortHeader k="featureScore" label="Features" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <React.Fragment key={p.id}>
                <tr
                  className={`border-t cursor-pointer transition-colors ${p.isReference ? 'border-amber-600/50 bg-amber-950/20' : 'border-gray-800'} ${expanded === p.id ? 'bg-gray-800/60' : 'hover:bg-gray-800/40'}`}
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <td className="px-2 py-2.5 sticky left-0 bg-gray-900/90 z-10">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.isReference ? 'ring-2 ring-amber-400/50' : ''}`} style={{ backgroundColor: p.isReference ? '#f59e0b' : BRAND_COLORS[p.brand] }} />
                      <div>
                        <p className={`font-medium text-xs leading-tight ${p.isReference ? 'text-amber-300' : 'text-white'}`}>{p.isReference ? '⭐ ' : ''}{p.model}</p>
                        <p className="text-gray-500 text-[10px]">{p.brand}{p.isReference ? ' · YOUR DEVICE' : ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-emerald-400 font-semibold text-xs">${p.price.toLocaleString()}</td>
                  <td className="px-2 py-2.5 text-xs">
                    <span className={p.ram >= 32 ? 'text-emerald-400' : 'text-amber-400'}>{p.ram}GB</span>
                  </td>
                  <td className="px-2 py-2.5 text-gray-300 text-xs">{p.cpu.split(' ').slice(-2).join(' ')}</td>
                  <td className="px-2 py-2.5 text-gray-300 text-xs">{p.displaySize}"</td>
                  <td className="px-2 py-2.5 text-xs">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${p.displayType === 'OLED' || p.displayType === 'AMOLED' ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-700/50 text-gray-400'}`}>
                      {p.displayType}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-xs">
                    <span className={p.batteryLifeHrs >= 18 ? 'text-emerald-400' : p.batteryLifeHrs >= 13 ? 'text-amber-400' : 'text-red-400'}>
                      {p.batteryLifeHrs}hrs
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-gray-300 text-xs">{p.weightLbs} lbs</td>
                  <td className="px-2 py-2.5 text-xs">
                    <span className={p.geekbench6Multi >= 13000 ? 'text-emerald-400' : 'text-gray-300'}>
                      {p.geekbench6Multi.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-xs">
                    <span className={`font-medium ${p.featureScore >= 10 ? 'text-emerald-400' : p.featureScore >= 7 ? 'text-amber-400' : 'text-gray-400'}`}>
                      {p.featureScore}/13
                    </span>
                  </td>
                </tr>
                {expanded === p.id && (
                  <tr className="bg-gray-800/40">
                    <td colSpan={10} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-teal-400 text-xs font-semibold mb-1">Best For</p>
                          <p className="text-gray-300 text-xs">{p.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-emerald-400 text-xs font-semibold mb-1">Pros</p>
                          <p className="text-gray-300 text-xs">{p.prosText}</p>
                        </div>
                        <div>
                          <p className="text-red-400 text-xs font-semibold mb-1">Cons</p>
                          <p className="text-gray-300 text-xs">{p.consText}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: TIER_COLORS[p.tier] + '30', color: TIER_COLORS[p.tier] }}>
                          {p.tier}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-700/50 text-gray-400">
                          {p.gpuType} GPU
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-700/50 text-gray-400">
                          {p.storage >= 1000 ? `${p.storage / 1000}TB` : `${p.storage}GB`} SSD
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectProduct(p.id); }}
                          className="ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-teal-600/20 text-teal-400 hover:bg-teal-600/40 transition-colors"
                        >
                          Full Details <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
