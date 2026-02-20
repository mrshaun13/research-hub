import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { Factory, Globe, Gem, TrendingUp, MapPin, ShieldCheck, AlertTriangle } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const MFG_TIERS = {
  factory: { label: 'Mass Factory', desc: 'China, Vietnam, India — large-scale production', color: '#6b7280', icon: Factory },
  'overseas-quality': { label: 'Quality Overseas', desc: 'Made in India/Turkey but with premium QC (e.g., Bellroy, Cuyana)', color: '#f59e0b', icon: ShieldCheck },
  artisan: { label: 'Artisan / Heritage', desc: 'Made in Japan, USA, France, Italy — small-batch or own-factory', color: '#10b981', icon: Gem },
};

const originCountries = [...new Set(products.map(p => p.madeIn.split(' (')[0].split(',')[0].trim()))];

const artisanProducts = products.filter(p => p.manufacturingTier === 'artisan');
const factoryProducts = products.filter(p => p.manufacturingTier === 'factory');
const overseasQuality = products.filter(p => p.manufacturingTier === 'overseas-quality');

const avgPriceByTier = {
  factory: Math.round(factoryProducts.reduce((s, p) => s + p.price, 0) / factoryProducts.length),
  'overseas-quality': Math.round(overseasQuality.reduce((s, p) => s + p.price, 0) / overseasQuality.length),
  artisan: Math.round(artisanProducts.reduce((s, p) => s + p.price, 0) / artisanProducts.length),
};

const avgQualityByTier = {
  factory: +(factoryProducts.reduce((s, p) => s + p.qualityScore, 0) / factoryProducts.length).toFixed(1),
  'overseas-quality': +(overseasQuality.reduce((s, p) => s + p.qualityScore, 0) / overseasQuality.length).toFixed(1),
  artisan: +(artisanProducts.reduce((s, p) => s + p.qualityScore, 0) / artisanProducts.length).toFixed(1),
};

const premiumOverFactory = Math.round(((avgPriceByTier.artisan - avgPriceByTier.factory) / avgPriceByTier.factory) * 100);
const qualityGain = +(avgQualityByTier.artisan - avgQualityByTier.factory).toFixed(1);

const scatterData = products.map(p => ({
  name: p.name,
  brand: p.brand,
  price: p.price,
  quality: p.qualityScore,
  fill: BRAND_COLORS[p.brand] || '#888',
  mfgTier: p.manufacturingTier,
  madeIn: p.madeIn,
  tierLabel: MFG_TIERS[p.manufacturingTier]?.label || p.manufacturingTier,
}));

const tierBarData = [
  { tier: 'Mass Factory', avgPrice: avgPriceByTier.factory, avgQuality: avgQualityByTier.factory, fill: MFG_TIERS.factory.color },
  { tier: 'Quality Overseas', avgPrice: avgPriceByTier['overseas-quality'], avgQuality: avgQualityByTier['overseas-quality'], fill: MFG_TIERS['overseas-quality'].color },
  { tier: 'Artisan / Heritage', avgPrice: avgPriceByTier.artisan, avgQuality: avgQualityByTier.artisan, fill: MFG_TIERS.artisan.color },
];

const japanExclusives = products.filter(p => p.availableInJapan && !p.availableInCanada);

const valuePerQualityPoint = products.map(p => ({
  name: p.brand + ' ' + p.model,
  brand: p.brand,
  valuePerQP: +(p.price / p.qualityScore).toFixed(0),
  quality: p.qualityScore,
  price: p.price,
  madeIn: p.madeIn,
  fill: BRAND_COLORS[p.brand] || '#888',
  mfgTier: p.manufacturingTier,
})).sort((a, b) => a.valuePerQP - b.valuePerQP);

function ScatterTooltipContent({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-gray-200">{d.name}</p>
      <p className="text-[11px] text-gray-400">Price: <span className="text-emerald-400">${d.price} CAD</span></p>
      <p className="text-[11px] text-gray-400">Quality: <span className="text-blue-400">{d.quality}/10</span></p>
      <p className="text-[11px] text-gray-400">Made in: <span className="text-amber-400">{d.madeIn}</span></p>
      <p className="text-[11px] text-gray-400">Tier: <span className="text-gray-300">{d.tierLabel}</span></p>
    </div>
  );
}

function ValueTooltipContent({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-gray-200">{d.name}</p>
      <p className="text-[11px] text-gray-400">Cost per quality point: <span className="text-emerald-400">${d.valuePerQP}</span></p>
      <p className="text-[11px] text-gray-400">Quality: {d.quality}/10 · Price: ${d.price}</p>
      <p className="text-[11px] text-gray-400">Made in: {d.madeIn}</p>
    </div>
  );
}

export default function OriginAnalysis() {
  const [highlightTier, setHighlightTier] = useState(null);

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Manufacturing &amp; Origin Analysis</h2>
        <p className="text-xs text-gray-500 mt-1">Value vs. quality premium for artisan-origin bags — is the extra cost worth it?</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {Object.entries(MFG_TIERS).map(([key, tier]) => {
          const count = products.filter(p => p.manufacturingTier === key).length;
          const Icon = tier.icon;
          return (
            <button
              key={key}
              onClick={() => setHighlightTier(highlightTier === key ? null : key)}
              className={`bg-gray-900/60 border rounded-xl p-3 text-left transition-all ${
                highlightTier === key ? 'border-teal-500/50 bg-teal-500/5' : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-3.5 h-3.5" style={{ color: tier.color }} />
                <span className="text-xs font-semibold text-white">{tier.label}</span>
                <span className="text-[10px] text-gray-600 ml-auto">{count} bags</span>
              </div>
              <p className="text-[10px] text-gray-500">{tier.desc}</p>
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-800">
                <span className="text-[10px] text-gray-500">Avg price: <span className="text-gray-300 font-medium">${avgPriceByTier[key]}</span></span>
                <span className="text-[10px] text-gray-500">Avg quality: <span className="text-gray-300 font-medium">{avgQualityByTier[key]}/10</span></span>
              </div>
            </button>
          );
        })}
      </div>

      <InsightCallout variant="highlight" title="The Artisan Premium">
        Artisan/heritage bags cost <strong>{premiumOverFactory}% more</strong> than mass-factory bags on average (${avgPriceByTier.artisan} vs ${avgPriceByTier.factory} CAD), but score <strong>{qualityGain} points higher</strong> on quality ({avgQualityByTier.artisan} vs {avgQualityByTier.factory}/10). The quality-per-dollar sweet spot is in the &quot;Quality Overseas&quot; tier — brands like Bellroy that design in-house but manufacture with strict QC overseas.
      </InsightCallout>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Price vs. Quality by Manufacturing Origin</h3>
        <p className="text-[10px] text-gray-500 mb-3">Upper-left = best value (high quality, lower price). Click tier cards above to highlight.</p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="price" name="Price (CAD)" unit=" CAD" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Price (CAD $)', position: 'bottom', offset: 0, style: { fontSize: 10, fill: '#6b7280' } }} />
            <YAxis dataKey="quality" name="Quality" domain={[0, 10]} tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Quality Score (/10)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }} />
            <Tooltip content={<ScatterTooltipContent />} />
            <Scatter data={scatterData} dataKey="quality">
              {scatterData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={highlightTier ? (entry.mfgTier === highlightTier ? entry.fill : '#374151') : entry.fill}
                  fillOpacity={highlightTier ? (entry.mfgTier === highlightTier ? 1 : 0.15) : 0.85}
                  stroke={MFG_TIERS[entry.mfgTier]?.color || '#888'}
                  strokeWidth={1.5}
                  r={6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {Object.entries(MFG_TIERS).map(([key, tier]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: tier.color, backgroundColor: 'transparent' }} />
              <span className="text-[10px] text-gray-400">{tier.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Cost per Quality Point</h3>
        <p className="text-[10px] text-gray-500 mb-3">Lower = better value for the quality you get. This normalizes price by quality score.</p>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={valuePerQualityPoint} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} unit=" CAD" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#9ca3af' }} width={95} />
            <Tooltip content={<ValueTooltipContent />} />
            <Bar dataKey="valuePerQP" radius={[0, 4, 4, 0]} barSize={12}>
              {valuePerQualityPoint.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="recommendation" title="Best Value for Artisan Quality">
        The <strong>Longchamp Le Pliage</strong> (made in France, $185 CAD) and <strong>Tom Bihn Nomad</strong> (made in USA, $260 CAD) offer the best cost-per-quality-point among artisan-origin bags. For Japanese craftsmanship, the <strong>Master-Piece Progress 2Way</strong> ($380 CAD) is the best value — it&apos;s factory-direct from Osaka with 3 carry options and a laptop sleeve.
      </InsightCallout>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-rose-400" />
          Japan-Exclusive Bags (Buy When You Travel)
        </h3>
        <p className="text-[10px] text-gray-500 mb-3">These bags are only available in Japan — perfect souvenirs when you visit</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {japanExclusives.map(p => (
            <div key={p.id} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                <span className="text-xs font-semibold text-white">{p.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                <span className="text-gray-500">Price:</span>
                <span className="text-gray-300 font-medium">${p.price} CAD</span>
                <span className="text-gray-500">Quality:</span>
                <span className="text-emerald-400 font-medium">{p.qualityScore}/10</span>
                <span className="text-gray-500">Made in:</span>
                <span className="text-amber-400">{p.madeIn}</span>
                <span className="text-gray-500">Material:</span>
                <span className="text-gray-400">{p.material}</span>
                <span className="text-gray-500">Laptop:</span>
                <span className={p.maxLaptop >= 14 ? 'text-emerald-400' : 'text-gray-500'}>{p.maxLaptop}&quot;</span>
                <span className="text-gray-500">Warranty:</span>
                <span className="text-gray-400">{p.warranty}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 italic">{p.verdict}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-400" />
          Is the Artisan Premium Worth It?
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-900/80">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider text-gray-500">Factor</th>
                <th className="px-3 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">Mass Factory</th>
                <th className="px-3 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">Quality Overseas</th>
                <th className="px-3 py-2 text-center text-[10px] uppercase tracking-wider text-gray-500">Artisan / Heritage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {[
                { factor: 'Avg Price', factory: `$${avgPriceByTier.factory}`, overseas: `$${avgPriceByTier['overseas-quality']}`, artisan: `$${avgPriceByTier.artisan}` },
                { factor: 'Avg Quality', factory: `${avgQualityByTier.factory}/10`, overseas: `${avgQualityByTier['overseas-quality']}/10`, artisan: `${avgQualityByTier.artisan}/10` },
                { factor: 'Cost / Quality Pt', factory: `$${Math.round(avgPriceByTier.factory / avgQualityByTier.factory)}`, overseas: `$${Math.round(avgPriceByTier['overseas-quality'] / avgQualityByTier['overseas-quality'])}`, artisan: `$${Math.round(avgPriceByTier.artisan / avgQualityByTier.artisan)}` },
                { factor: 'Expected Lifespan', factory: '1–3 years', overseas: '3–5 years', artisan: '5–20+ years' },
                { factor: 'Repair Service', factory: 'None', overseas: 'Limited', artisan: 'Lifetime (most)' },
                { factor: 'Resale Value', factory: 'Minimal', overseas: 'Moderate', artisan: 'High' },
                { factor: 'Materials', factory: 'Faux/synthetic', overseas: 'Recycled/premium synthetic', artisan: 'Mil-spec nylon, leather, waxed cotton' },
                { factor: 'Ethical Production', factory: 'Variable', overseas: 'Audited', artisan: 'Transparent / own factory' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-800/20">
                  <td className="px-3 py-1.5 text-gray-300 font-medium">{row.factor}</td>
                  <td className="px-3 py-1.5 text-center text-gray-500">{row.factory}</td>
                  <td className="px-3 py-1.5 text-center text-amber-400/80">{row.overseas}</td>
                  <td className="px-3 py-1.5 text-center text-emerald-400/80">{row.artisan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout variant="info" title="The Long-Term Math">
        A $200 factory bag lasting 2 years = $100/year. A $400 artisan bag lasting 10 years = $40/year. Over a decade, the artisan bag costs <strong>60% less</strong> and generates less waste. Add lifetime repair service (Porter, Tom Bihn, Filson, Briefing) and the artisan bag may never need replacing.
      </InsightCallout>

      <InsightCallout variant="warning" title="When Factory-Made Is Fine">
        If your needs change frequently (style preferences, laptop size, use case), a mid-range factory bag like the Bellroy Wonder Tote ($215 CAD, made in India with premium QC) is the smarter choice. You get 90% of the quality at 50% of the artisan price, with the flexibility to upgrade in 3-5 years.
      </InsightCallout>
    </div>
  );
}
