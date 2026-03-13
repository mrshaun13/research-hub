import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import InsightCallout from '../../../components/InsightCallout';
import { mics, brands } from '../data/micData';

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const color = brands[payload.brand] || '#6366f1';
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={color} fillOpacity={0.85} stroke="#1f2937" strokeWidth={2} />
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#e5e7eb" fontSize={10} fontWeight="600">
        {payload.shortName}
      </text>
    </g>
  );
};

export default function ValueScatter() {
  const data = mics.map(m => ({
    ...m,
    shortName: m.name.split(' ').slice(-2).join(' ').replace('SoloCast', 'SoloCast').replace('PodMic', 'PodMic'),
    x: m.price,
    y: m.valueScore
  }));

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-1">Price vs. Value Score</h3>
        <p className="text-gray-400 text-sm mb-6">
          Value Score = audio quality × feature set ÷ price. Mics in the upper-left quadrant deliver the best value.
          Mics in the lower-right are paying a premium for marginal gains.
        </p>
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 30, right: 30, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[30, 420]}
              tickFormatter={v => `$${v}`}
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              name="Price"
            >
              <Label value="Price (USD)" offset={-10} position="insideBottom" fill="#9ca3af" fontSize={12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={[3, 10]}
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              name="Value Score"
            >
              <Label value="Value Score" angle={-90} position="insideLeft" fill="#9ca3af" fontSize={12} offset={10} />
            </YAxis>
            <ReferenceLine x={150} stroke="#6366f1" strokeDasharray="4 4" opacity={0.5} label={{ value: 'Sweet spot ←', position: 'insideTopRight', fill: '#818cf8', fontSize: 11 }} />
            <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm shadow-xl">
                    <div className="font-bold text-white">{d.name}</div>
                    <div className="text-gray-300">${d.price.toFixed(2)} · {d.type}</div>
                    <div className="text-indigo-300">Value Score: {d.valueScore}</div>
                    <div className="text-yellow-400">★ {d.rating} ({d.reviewCount})</div>
                  </div>
                );
              }
              return null;
            }} />
            <Scatter data={data} shape={<CustomDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Value Score Ranked</h3>
        <div className="space-y-3">
          {[...mics].sort((a, b) => b.valueScore - a.valueScore).map((mic, i) => (
            <div key={mic.id} className="flex items-center gap-3">
              <div className="w-6 text-center text-gray-500 font-mono text-sm">{i + 1}</div>
              <div className="w-44 text-sm text-white truncate">{mic.name}</div>
              <div className="flex-1 relative h-4 bg-gray-700 rounded-full">
                <div
                  className="absolute left-0 top-0 h-4 rounded-full transition-all"
                  style={{
                    width: `${(mic.valueScore / 10) * 100}%`,
                    backgroundColor: brands[mic.brand] || '#6366f1'
                  }}
                />
              </div>
              <div className="w-16 text-right text-sm text-gray-300">{mic.valueScore}/10</div>
              <div className="w-20 text-right text-sm font-semibold text-white">${mic.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="emerald">
        <strong>The sweet spot is $50–100:</strong> The HyperX SoloCast 2 (8.6) and Fifine AM8 (8.2) lead on value by a wide margin.
        Beyond $200, you are paying for features — onboard DSP, XLR dual-output, professional preamps — that most WebEx users will never use.
      </InsightCallout>
    </div>
  );
}
