import React from 'react';
import { Laptop, Building2, DollarSign, Battery, Weight, Cpu } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { productsWithDerived, summaryStats, BRAND_COLORS, TIER_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const StatCard = ({ icon: Icon, label, value, sub, color = 'text-teal-400' }) => (
  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-gray-400 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
  </div>
);

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className={`bg-gray-900 border rounded-lg px-3 py-2 shadow-xl text-sm max-w-xs ${d.isReference ? 'border-amber-500' : 'border-gray-700'}`}>
      {d.isReference && <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">YOUR CURRENT DEVICE</p>}
      <p className="text-white font-semibold text-xs">{d.isReference ? 'ThinkPad P1 Gen 7' : d.name}</p>
      <p className="text-gray-400 text-xs">{d.brand} &middot; {d.tier}{!d.isConvertible && d.isConvertible !== undefined ? ' · NOT a 2-in-1' : ''}</p>
      <p className="text-teal-400 text-xs mt-1">Price: ${d.price.toLocaleString()}</p>
      <p className="text-blue-400 text-xs">Geekbench 6 Multi: {d.geekbench6Multi.toLocaleString()}</p>
      <p className="text-amber-400 text-xs">Battery: {d.batteryLifeHrs}hrs</p>
      {d.isReference && <p className="text-gray-500 text-[10px] mt-1 italic">Reference point — not a convertible</p>}
    </div>
  );
};

const Overview = () => {
  const scatterData = productsWithDerived.map(p => ({
    ...p,
    x: p.price,
    y: p.geekbench6Multi,
    r: p.batteryLifeHrs,
  }));

  const convertibles = productsWithDerived.filter(p => !p.isReference);
  const yourDevice = productsWithDerived.find(p => p.isReference);
  const oledCount = convertibles.filter(p => p.oledDisplay).length;
  const avgRam = Math.round(convertibles.reduce((s, p) => s + p.ram, 0) / convertibles.length);
  const withGpu = convertibles.filter(p => p.dedicatedGPU).length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
      <p className="text-gray-400 text-sm mb-6">12 convertible 2-in-1 laptops across 7 brands, from $750 to $2,400 — plus your current device as a reference</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Laptop} label="Models Compared" value={summaryStats.totalProducts} sub={`${summaryStats.totalBrands} brands`} />
        <StatCard icon={DollarSign} label="Price Range" value={summaryStats.priceRange} sub={`Avg $${summaryStats.avgPrice.toLocaleString()}`} color="text-emerald-400" />
        <StatCard icon={Battery} label="Avg Battery" value={`${summaryStats.avgBattery}hrs`} sub="Range: 9.9–22.5 hrs" color="text-amber-400" />
        <StatCard icon={Weight} label="Avg Weight" value={`${summaryStats.avgWeight} lbs`} sub="Range: 1.97–4.19 lbs" color="text-purple-400" />
      </div>

      <InsightCallout variant="recommendation" title="Your Profile: Developer + Family Room + Tablet Mode">
        You want a high-powered 2-in-1 for IDE development, AI work, web browsing, and family room use with a yoga/flip feature.
        The sweet spot for your needs is a <strong>14-inch OLED convertible with 32GB RAM</strong> — big enough for coding, light enough for tablet mode,
        and powerful enough for development. If AI/ML training matters, only one model has a dedicated GPU: the ASUS ProArt PX13.
      </InsightCallout>

      <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 mb-6">
        <h3 className="text-white font-semibold text-sm mb-3">Price vs Performance (Geekbench 6 Multi-Core)</h3>
        <p className="text-gray-500 text-xs mb-3">Upper-left = best value. Dot size = battery life. Color = brand.</p>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="Price"
              domain={[600, 2600]}
              tickFormatter={v => `$${v.toLocaleString()}`}
              stroke="#6b7280"
              fontSize={11}
              label={{ value: 'Price ($)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Geekbench 6 Multi"
              domain={[9000, 15000]}
              stroke="#6b7280"
              fontSize={11}
              label={{ value: 'Geekbench 6 Multi', angle: -90, position: 'insideLeft', offset: 0, fill: '#9ca3af', fontSize: 11 }}
            />
            <Tooltip content={<ScatterTooltip />} />
            <Scatter data={scatterData}>
              {scatterData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.isReference ? '#f59e0b' : (BRAND_COLORS[entry.brand] || '#6b7280')}
                  fillOpacity={entry.isReference ? 1 : 0.85}
                  stroke={entry.isReference ? '#fbbf24' : 'none'}
                  strokeWidth={entry.isReference ? 3 : 0}
                  strokeDasharray={entry.isReference ? '4 2' : 'none'}
                  r={entry.isReference ? 10 : Math.max(6, entry.batteryLifeHrs / 2.5)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-amber-400 bg-amber-500" />
            <span className="text-amber-400 text-xs font-semibold">Your ThinkPad P1</span>
          </div>
          {Object.entries(BRAND_COLORS).map(([brand, color]) => (
            <div key={brand} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-gray-400 text-xs">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 text-center">
          <p className="text-3xl font-bold text-purple-400">{oledCount}/{summaryStats.totalProducts}</p>
          <p className="text-gray-400 text-xs mt-1">Have OLED/AMOLED displays</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 text-center">
          <p className="text-3xl font-bold text-teal-400">{avgRam}GB</p>
          <p className="text-gray-400 text-xs mt-1">Average RAM (all 16GB+)</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 text-center">
          <p className="text-3xl font-bold text-amber-400">{withGpu}</p>
          <p className="text-gray-400 text-xs mt-1">2-in-1s with dedicated GPU (your P1 has one too)</p>
        </div>
      </div>

      {yourDevice && (
        <InsightCallout variant="warning" title="How Your ThinkPad P1 Gen 7 Compares">
          Your current device sits at <strong>$2,500 / 12,300 GB6 Multi</strong> on the scatter chart above (the amber dot with dashed ring).
          Here is what you would gain and lose by switching to a 2-in-1:
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>You gain:</strong> Tablet/tent mode, touch screen, stylus support, lighter weight (most are 1-2 lbs lighter), longer battery life (up to 22 hrs vs your 8.5 hrs)</li>
            <li><strong>You lose:</strong> Dedicated GPU (RTX A1000) — only the ProArt PX13 has a dGPU, and it has RTX 4060 which is actually <em>faster</em> than your RTX A1000</li>
            <li><strong>CPU parity:</strong> Most 2-in-1s match or beat your Ultra 7 165H in single-core. The Ryzen AI 9 HX 370 (ProArt PX13) significantly beats it in multi-core (14,200 vs 12,300)</li>
            <li><strong>Display upgrade:</strong> 9 of 12 convertibles have OLED displays vs your IPS panel — a massive visual upgrade</li>
          </ul>
        </InsightCallout>
      )}

      <InsightCallout variant="highlight" title="The GPU Gap">
        Only 1 out of 12 convertible laptops has a dedicated GPU. If you need GPU-accelerated AI/ML workloads (CUDA, model training, Stable Diffusion),
        the <strong>ASUS ProArt PX13 with RTX 4060</strong> is your only option in the 2-in-1 form factor. Every other model relies on integrated graphics,
        which are fine for IDE work and web browsing but cannot handle serious GPU compute.
      </InsightCallout>

      <InsightCallout variant="info" title="Data Sources">
        Specs, prices, and benchmarks sourced from PCMag, CNET, TechRadar, Tom's Hardware, NotebookCheck, manufacturer sites,
        and user reviews from Amazon and Best Buy. Benchmark data cross-referenced with Geekbench 6, Cinebench R23, and
        UserBenchmark community results. Prices reflect February 2026 street prices.
      </InsightCallout>
    </div>
  );
};

export default Overview;
