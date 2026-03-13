import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mics, brands } from '../data/micData';
import InsightCallout from '../../../components/InsightCallout';

const useCases = [
  { key: 'webexFit', label: 'WebEx / Video Calls' },
  { key: 'recordingFit', label: 'Voice Recording' },
  { key: 'streamingFit', label: 'Streaming' },
  { key: 'portabilityFit', label: 'Portability' },
];

const tierOrder = ['budget', 'mid', 'upper-mid', 'premium'];

export default function UseCaseFit() {
  const [selected, setSelected] = useState(['hyperx-solocast-2', 'fifine-am8', 'sennheiser-profile', 'shure-mv7plus']);

  const toggleMic = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const radarData = useCases.map(uc => {
    const entry = { subject: uc.label };
    selected.forEach(id => {
      const mic = mics.find(m => m.id === id);
      if (mic) entry[mic.name] = mic[uc.key];
    });
    return entry;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-1">Use Case Fit Score</h3>
        <p className="text-gray-400 text-sm mb-4">
          Each mic scored 1–5 for WebEx calls, voice recording, streaming, and portability.
          Select up to 4 mics to compare on the radar chart.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {[...mics].sort((a, b) => a.price - b.price).map(mic => {
            const isSelected = selected.includes(mic.id);
            const color = brands[mic.brand] || '#6366f1';
            return (
              <button
                key={mic.id}
                onClick={() => toggleMic(mic.id)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${isSelected ? 'text-white font-semibold' : 'text-gray-400 border-gray-600 bg-gray-700 hover:bg-gray-600'}`}
                style={isSelected ? { backgroundColor: color + '33', borderColor: color, color } : {}}
              >
                {mic.name.replace(' (Logitech)', '')} <span className="text-xs opacity-70">${mic.price.toFixed(0)}</span>
              </button>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#d1d5db', fontSize: 12 }} />
            {selected.map((id) => {
              const mic = mics.find(m => m.id === id);
              if (!mic) return null;
              return (
                <Radar
                  key={id}
                  name={mic.name.replace(' (Logitech)', '')}
                  dataKey={mic.name}
                  stroke={brands[mic.brand] || '#6366f1'}
                  fill={brands[mic.brand] || '#6366f1'}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              );
            })}
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
              itemStyle={{ color: '#d1d5db' }}
            />
            <Legend wrapperStyle={{ color: '#d1d5db', fontSize: '12px', paddingTop: '16px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Scores by Use Case</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 px-3 py-2">Microphone</th>
                {useCases.map(uc => (
                  <th key={uc.key} className="text-center text-gray-400 px-3 py-2">{uc.label}</th>
                ))}
                <th className="text-center text-gray-400 px-3 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {[...mics].sort((a, b) => a.price - b.price).map((mic, i) => {
                const avg = (useCases.reduce((s, uc) => s + mic[uc.key], 0) / useCases.length).toFixed(1);
                return (
                  <tr key={mic.id} className={`border-b border-gray-700/50 ${i % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'}`}>
                    <td className="px-3 py-2.5">
                      <span className="text-white font-medium">{mic.name.replace(' (Logitech)', '')}</span>
                    </td>
                    {useCases.map(uc => (
                      <td key={uc.key} className="text-center px-3 py-2.5">
                        <div className="flex items-center justify-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={`w-2 h-2 rounded-full ${s <= mic[uc.key] ? 'bg-indigo-400' : 'bg-gray-600'}`} />
                          ))}
                          <span className="text-gray-400 text-xs ml-1">{mic[uc.key]}</span>
                        </div>
                      </td>
                    ))}
                    <td className="text-center px-3 py-2.5 font-semibold text-white">${mic.price.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout color="indigo">
        <strong>For your use case (WebEx + easy portability):</strong> The Fifine AM8 and Sennheiser Profile both score 4.5 for WebEx fit.
        The AM8 wins on portability and value; the Sennheiser wins on audio transparency and premium feel.
        If you move between devices or desks frequently, the AM8's USB-C + lightweight design is the clear winner.
      </InsightCallout>
    </div>
  );
}
