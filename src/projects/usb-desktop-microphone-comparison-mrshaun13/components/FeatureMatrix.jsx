import React from 'react';
import { mics } from '../data/micData';
import InsightCallout from '../../../components/InsightCallout';
import { GlossaryTerm } from '../../../components/GlossaryTerm';
import glossaryTerms from '../data/glossaryTerms';

const features = [
  { key: 'headphoneJack', label: 'Headphone Jack', desc: 'Zero-latency monitoring' },
  { key: 'muteButton', label: 'Mute Button', desc: 'One-touch mute with LED' },
  { key: 'gainControl', label: 'Gain Knob', desc: 'Physical input level control' },
  { key: 'onboardDSP', label: 'Onboard DSP', desc: 'Built-in noise reduction / auto-level', glossaryKey: 'DSP' },
  { key: 'softwareEQ', label: 'Software EQ', desc: 'Companion app for EQ / effects' },
  { key: 'popFilterIncluded', label: 'Pop Filter Included', desc: 'Reduces plosive sounds' },
  { key: 'standIncluded', label: 'Stand Included', desc: 'Desktop stand in the box' },
  { key: 'xlrOption', label: 'XLR Output', desc: 'Also works with audio interfaces', glossaryKey: 'XLR' },
];

const tierBorder = {
  budget: 'border-emerald-500/30',
  mid: 'border-indigo-500/30',
  'upper-mid': 'border-amber-500/30',
  premium: 'border-red-500/30',
};

const tierHeader = {
  budget: 'text-emerald-400',
  mid: 'text-indigo-400',
  'upper-mid': 'text-amber-400',
  premium: 'text-red-400',
};

export default function FeatureMatrix() {
  const sorted = [...mics].sort((a, b) => a.price - b.price);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-1">Feature Matrix</h3>
        <p className="text-gray-400 text-sm mb-5">Which mic includes which features — sorted by price. Green = included, dash = not included.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold px-3 py-2 w-48">Feature</th>
                {sorted.map(mic => (
                  <th key={mic.id} className={`text-center px-2 py-2 border-l ${tierBorder[mic.tier]}`}>
                    <div className={`font-semibold text-xs ${tierHeader[mic.tier]}`}>
                      {mic.name.replace('Blue Yeti (Logitech)', 'Blue Yeti').replace('Apogee HypeMiC', 'Apogee').replace('Sennheiser Profile', 'Sennheiser').replace('Joby Wavo POD', 'Joby Wavo')}
                    </div>
                    <div className="text-gray-500 text-xs font-normal">${mic.price.toFixed(0)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, fi) => (
                <tr key={f.key} className={`border-b border-gray-700/50 ${fi % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'}`}>
                  <td className="px-3 py-2.5">
                    <div className="text-white text-sm font-medium">{f.glossaryKey ? <GlossaryTerm term={f.glossaryKey} glossary={glossaryTerms}>{f.label}</GlossaryTerm> : f.label}</div>
                    <div className="text-gray-500 text-xs">{f.desc}</div>
                  </td>
                  {sorted.map(mic => (
                    <td key={mic.id} className={`text-center px-2 py-2.5 border-l ${tierBorder[mic.tier]}`}>
                      {mic[f.key]
                        ? <span className="text-green-400 text-lg">✓</span>
                        : <span className="text-gray-600 text-base">—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-gray-900/50 border-t border-gray-600">
                <td className="px-3 py-3 text-gray-400 font-semibold text-sm">Features Total</td>
                {sorted.map(mic => {
                  const count = features.filter(f => mic[f.key]).length;
                  return (
                    <td key={mic.id} className={`text-center px-2 py-3 border-l ${tierBorder[mic.tier]}`}>
                      <span className="font-bold text-white">{count}</span>
                      <span className="text-gray-500 text-xs">/{features.length}</span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightCallout color="amber">
          <strong>No stand = extra cost:</strong> The Rode PodMic USB, Shure MV7+, and Shure MV7i don't include a stand.
          You'll need a boom arm (~$30–80) which adds to the total cost. Factor this in when comparing prices.
        </InsightCallout>
        <InsightCallout color="blue">
          <strong>DSP is the differentiator above $190:</strong> Below $150, none of these mics have onboard noise reduction or auto-level.
          At $190+, the Rode and Shure mics gain APHEX or Shure DSP processing that handles noisy rooms automatically — a meaningful upgrade
          if your workspace is loud.
        </InsightCallout>
      </div>
    </div>
  );
}
