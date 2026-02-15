import React, { useState } from 'react';
import { particles } from '../data/researchData';
import InsightCallout from './InsightCallout';

const LEVEL_COLORS = {
  N5: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  N4: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  N3: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export default function Particles() {
  const [filter, setFilter] = useState('All');
  const [expandedParticle, setExpandedParticle] = useState(null);

  const levels = ['All', 'N5', 'N4', 'N3'];
  const filtered = filter === 'All' ? particles : particles.filter((p) => p.level === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Particles Reference</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Japanese particles are small words that mark the grammatical role of each word in a sentence.
          They are the backbone of Japanese grammar. Each particle can have multiple usages.
        </p>
      </div>

      <div className="flex gap-2">
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              filter === l ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'text-gray-400 border-gray-800 hover:border-gray-700'
            }`}
          >
            {l}
          </button>
        ))}
        <span className="text-[10px] text-gray-600 ml-auto self-center">{filtered.length} particles</span>
      </div>

      <InsightCallout color="cyan">
        Particles are the #1 thing that makes Japanese sentences make sense. Unlike English word order,
        Japanese relies on particles to show who does what to whom. Master は, が, を, に, で first — they cover 90% of sentences.
      </InsightCallout>

      <div className="space-y-2">
        {filtered.map((p, i) => {
          const isOpen = expandedParticle === i;
          return (
            <div key={i} className={`rounded-xl border transition-all ${isOpen ? 'border-rose-500/20 bg-rose-500/5' : 'border-gray-800 bg-gray-900/50'}`}>
              <button onClick={() => setExpandedParticle(isOpen ? null : i)} className="w-full flex items-center gap-3 p-3 text-left">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[p.level] || LEVEL_COLORS.N5}`}>{p.level}</span>
                <span className="text-sm font-bold text-white">{p.particle}</span>
                <span className="text-[11px] text-gray-400">{p.name}</span>
                <span className="text-[10px] text-gray-600 ml-auto">{p.usages.length} usage{p.usages.length > 1 ? 's' : ''}</span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 space-y-3">
                  {p.usages.map((u, j) => (
                    <div key={j} className="p-3 rounded-lg bg-gray-800/30">
                      <p className="text-xs text-white font-medium mb-1">{u.meaning}</p>
                      <p className="text-[10px] text-rose-400/70 font-mono mb-2">{u.structure}</p>
                      {u.examples.map((ex, k) => (
                        <div key={k} className="mt-1.5 p-2 rounded-md bg-gray-800/40">
                          <p className="text-[11px] text-white">{ex.jp}</p>
                          <p className="text-[10px] text-rose-400/60 mt-0.5">{ex.romaji}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{ex.en}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
