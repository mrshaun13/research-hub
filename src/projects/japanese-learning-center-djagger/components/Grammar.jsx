import React, { useState } from 'react';
import { grammarPoints } from '../data/researchData';
import InsightCallout from './InsightCallout';

const LEVELS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];
const LEVEL_COLORS = {
  N5: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  N4: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  N3: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  N2: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  N1: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function Grammar() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = grammarPoints.filter((g) => {
    if (filter !== 'All' && g.level !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return g.grammar.toLowerCase().includes(s) || g.meaning.toLowerCase().includes(s) || g.structure.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Grammar Reference</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Quick-reference for all grammar points organized by JLPT level. Filter by level or search by keyword.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {LEVELS.map((l) => (
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
        <input
          type="text"
          placeholder="Search grammar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg text-[11px] bg-gray-900 border border-gray-800 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-rose-500/40 w-48"
        />
      </div>

      <InsightCallout color="violet">
        {filtered.length} grammar point{filtered.length !== 1 ? 's' : ''} shown.
        N5 and N4 cover ~80% of everyday conversation. N3 bridges to advanced. N2-N1 add nuance and formality.
      </InsightCallout>

      <div className="space-y-2">
        {filtered.map((g) => (
          <div key={g.id} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
            <div className="flex items-start gap-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${LEVEL_COLORS[g.level]}`}>{g.level}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-white">{g.grammar}</h4>
                  <span className="text-[11px] text-gray-400">— {g.meaning}</span>
                </div>
                <p className="text-[10px] text-rose-400/70 mt-1 font-mono">{g.structure}</p>
                {g.examples.map((ex, i) => (
                  <div key={i} className="mt-2 p-2 rounded-lg bg-gray-800/30">
                    <p className="text-[11px] text-white">{ex.jp}</p>
                    <p className="text-[10px] text-rose-400/60 mt-0.5">{ex.romaji}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{ex.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
