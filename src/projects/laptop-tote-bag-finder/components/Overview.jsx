import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ShoppingBag, DollarSign, Weight, Ruler, Star } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const stats = [
  { label: 'Products Compared', value: products.length, icon: ShoppingBag, color: 'text-teal-400' },
  { label: 'Brands', value: [...new Set(products.map(p => p.brand))].length, icon: Star, color: 'text-amber-400' },
  { label: 'Price Range', value: `$${Math.min(...products.map(p => p.price))}–$${Math.max(...products.map(p => p.price))}`, icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Weight Range', value: `${Math.min(...products.map(p => p.weight_lbs))}–${Math.max(...products.map(p => p.weight_lbs))} lbs`, icon: Weight, color: 'text-blue-400' },
];

const scatterData = products.map(p => ({
  name: p.name,
  brand: p.brand,
  price: p.price,
  capacity: p.capacity_L,
  weight: p.weight_lbs,
  fill: BRAND_COLORS[p.brand] || '#888',
  tier: p.tier,
  fits14: p.maxLaptop >= 14,
}));

const weightData = [...products].sort((a, b) => a.weight_lbs - b.weight_lbs).map(p => ({
  name: p.brand,
  model: p.model,
  weight: p.weight_lbs,
  fill: BRAND_COLORS[p.brand] || '#888',
}));

function ScatterTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-gray-200">{d.name}</p>
      <p className="text-[11px] text-gray-400">Price: <span className="text-emerald-400">${d.price} CAD</span></p>
      <p className="text-[11px] text-gray-400">Capacity: <span className="text-blue-400">{d.capacity}L</span></p>
      <p className="text-[11px] text-gray-400">Fits 14" laptop: <span className={d.fits14 ? 'text-emerald-400' : 'text-red-400'}>{d.fits14 ? 'Yes' : 'No'}</span></p>
    </div>
  );
}

function WeightTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-gray-200">{d.model}</p>
      <p className="text-[11px] text-gray-400">Weight: <span className="text-blue-400">{d.weight} lbs</span></p>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Overview</h2>
        <p className="text-xs text-gray-500 mt-1">Laptop tote bags for a 160cm woman — 14" laptop, zipper closure, not too bulky</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-sm font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <InsightCallout variant="recommendation" title="Your Profile">
        At 160cm, you'll want a bag that doesn't overwhelm your frame. Bags under 15L with compact dimensions work best.
        Your must-haves: zipper closure, 14" laptop fit, water bottle space, and multiple carry options.
        Sweet spot: $150–$250 CAD for the best quality-to-value ratio.
      </InsightCallout>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Price vs. Capacity</h3>
        <p className="text-[10px] text-gray-500 mb-3">Upper-left = more capacity for less money (best value). Circle color = brand.</p>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="price" name="Price (CAD)" unit=" CAD" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Price (CAD $)', position: 'bottom', offset: 0, style: { fontSize: 10, fill: '#6b7280' } }} />
            <YAxis dataKey="capacity" name="Capacity" unit="L" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Capacity (L)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }} />
            <Tooltip content={<ScatterTooltip />} />
            <Scatter data={scatterData} dataKey="capacity">
              {scatterData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={entry.fits14 ? 1 : 0.35} stroke={entry.fits14 ? '#fff' : 'transparent'} strokeWidth={entry.fits14 ? 1.5 : 0} r={6} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 mt-1 text-center">Bright circles = fits 14" laptop · Faded = 13" max</p>
      </div>

      <InsightCallout variant="highlight" title="Key Finding">
        Only 5 of 12 bags actually fit a 14" laptop: Bellroy Wonder Tote 12L, BÉIS Work Tote, Longchamp Le Pliage L, MZ Wallace Metro Tote Deluxe, and Porter Yoshida Force 2Way.
        The Bellroy Wonder Tote 12L is the most compact option that still fits your laptop.
      </InsightCallout>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Weight Comparison</h3>
        <p className="text-[10px] text-gray-500 mb-3">Lighter bags are easier on the shoulder — especially important for petite frames</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weightData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} unit=" lbs" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#9ca3af' }} width={65} />
            <Tooltip content={<WeightTooltip />} />
            <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={14}>
              {weightData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="info" title="Size Guide for 160cm / 5′3″">
        {"At your height, bags wider than 17\" or taller than 14\" can look oversized. The Bellroy Wonder Tote 12L (13.8\" wide) and BÉIS Work Tote (14.25\" wide) are the most proportional options. The Moment Tech Tote (18.7\" wide) and MZ Wallace (23L) may feel bulky."}
      </InsightCallout>
    </div>
  );
}
