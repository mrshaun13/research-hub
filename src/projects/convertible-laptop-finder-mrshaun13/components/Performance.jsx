import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { productsWithDerived, BRAND_COLORS } from '../data/products';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const Performance = () => {
  const mapEntry = p => ({ name: p.isReference ? '⭐ Your P1 Gen 7' : (p.model.length > 25 ? p.model.slice(0, 22) + '...' : p.model), value: null, brand: p.brand, full: p.name, isReference: p.isReference });

  const gbMulti = [...productsWithDerived]
    .sort((a, b) => b.geekbench6Multi - a.geekbench6Multi)
    .map(p => ({ ...mapEntry(p), value: p.geekbench6Multi }));

  const gbSingle = [...productsWithDerived]
    .sort((a, b) => b.geekbench6Single - a.geekbench6Single)
    .map(p => ({ ...mapEntry(p), value: p.geekbench6Single }));

  const perfPerDollar = [...productsWithDerived]
    .sort((a, b) => b.perfPerDollar - a.perfPerDollar)
    .map(p => ({ ...mapEntry(p), value: p.perfPerDollar }));

  const ChartBlock = ({ title, subtitle, data, formatter, domain }) => (
    <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 mb-4">
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mb-3">{subtitle}</p>}
      <ResponsiveContainer width="100%" height={Math.max(280, data.length * 32)}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
          <XAxis type="number" stroke="#6b7280" fontSize={10} domain={domain} tickFormatter={formatter} />
          <YAxis type="category" dataKey="name" width={160} stroke="#6b7280" fontSize={10} tick={{ fill: '#d1d5db' }} />
          <Tooltip content={<CustomTooltip formatter={formatter} />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isReference ? '#f59e0b' : (BRAND_COLORS[entry.brand] || '#6b7280')} fillOpacity={entry.isReference ? 1 : 0.8} stroke={entry.isReference ? '#fbbf24' : 'none'} strokeWidth={entry.isReference ? 2 : 0} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Performance Deep Dive</h2>
      <p className="text-gray-400 text-sm mb-6">CPU benchmarks, multi-core vs single-core, and performance-per-dollar analysis</p>

      <InsightCallout variant="warning" title="Your ThinkPad P1 Gen 7 Benchmark Position">
        Your Core Ultra 7 165H scores <strong>~2,350 single / ~12,300 multi</strong> in Geekbench 6.
        Look for the <strong className="text-amber-400">⭐ amber bar</strong> in each chart below.
        The ProArt PX13 (Ryzen AI 9 HX 370) beats your P1 in both single-core (+18%) and multi-core (+15%).
        Most Lunar Lake (258V) machines trade ~5% multi-core for dramatically better battery life.
        Bottom line: you won't lose meaningful CPU performance switching to any of the top 2-in-1 options.
      </InsightCallout>

      <InsightCallout variant="critical" title="The CPU Landscape">
        Three CPU architectures compete here: Intel Lunar Lake (Core Ultra 258V) prioritizes efficiency over raw power,
        AMD Zen 5 (Ryzen AI 9 HX 370) delivers the most raw multi-threaded performance, and Qualcomm Snapdragon X Elite
        offers strong multi-core with ARM compatibility trade-offs. For IDE development, single-core speed matters most.
        For compilation and AI workloads, multi-core is king.
      </InsightCallout>

      <ChartBlock
        title="Geekbench 6 Multi-Core Score"
        subtitle="Higher = faster compilation, Docker builds, multi-threaded workloads"
        data={gbMulti}
        formatter={v => v.toLocaleString()}
        domain={[0, 'auto']}
      />

      <ChartBlock
        title="Geekbench 6 Single-Core Score"
        subtitle="Higher = snappier IDE responsiveness, faster code completion, smoother UI"
        data={gbSingle}
        formatter={v => v.toLocaleString()}
        domain={[0, 'auto']}
      />

      <InsightCallout variant="highlight" title="The ProArt PX13 Dominates">
        The ASUS ProArt PX13 leads in both multi-core (14,200) and single-core (2,780) thanks to its 12-core Zen 5 CPU.
        It also has the only dedicated GPU (RTX 4060) for CUDA and AI workloads. The trade-off: shorter battery life and a 60Hz display.
      </InsightCallout>

      <ChartBlock
        title="Performance Per Dollar (Geekbench 6 Multi / Price)"
        subtitle="Higher = more compute per dollar spent. The best value machines are at the top."
        data={perfPerDollar}
        formatter={v => v.toFixed(1)}
        domain={[0, 'auto']}
      />

      <InsightCallout variant="info" title="What These Benchmarks Mean for Development">
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li><strong>IDE Work (VS Code, IntelliJ):</strong> Single-core speed matters most. All models here are fast enough — you won't notice a difference in daily coding.</li>
          <li><strong>Compilation (npm build, cargo build, gradle):</strong> Multi-core matters. The Ryzen AI 9 HX 370 and Snapdragon X Elite lead here.</li>
          <li><strong>AI/ML Training:</strong> Only the ProArt PX13 with RTX 4060 can do meaningful local GPU training. All others are limited to CPU inference or cloud-based training.</li>
          <li><strong>Docker / VMs:</strong> RAM and multi-core both matter. 32GB models have a clear advantage for running containers alongside your IDE.</li>
        </ul>
      </InsightCallout>
    </div>
  );
};

export default Performance;
