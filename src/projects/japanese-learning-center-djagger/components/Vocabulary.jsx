import React, { useState } from 'react';
import { vocabularyCategories } from '../data/researchData';
import InsightCallout from './InsightCallout';

export default function Vocabulary() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const cat = vocabularyCategories[activeCategory];
  const filteredWords = search
    ? cat.words.filter((w) => w.jp.includes(search) || w.romaji.toLowerCase().includes(search.toLowerCase()) || w.en.toLowerCase().includes(search.toLowerCase()))
    : cat.words;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Vocabulary Reference</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Essential Japanese vocabulary organized by topic. Each word includes hiragana/katakana, romaji, and English meaning.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {vocabularyCategories.map((c, i) => (
          <button
            key={i}
            onClick={() => { setActiveCategory(i); setSearch(''); }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              activeCategory === i ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'text-gray-400 border-gray-800 hover:border-gray-700'
            }`}
          >
            {c.category}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder={`Search in ${cat.category}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-[11px] bg-gray-900 border border-gray-800 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-rose-500/40 w-64"
        />
        <span className="text-[10px] text-gray-600">{filteredWords.length} words</span>
      </div>

      <InsightCallout color="emerald">
        Tip: Learn vocabulary in context, not in isolation. For each word, try making a sentence using grammar you already know.
        The most common 1,000 words cover ~80% of everyday Japanese conversation.
      </InsightCallout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredWords.map((w, i) => (
          <div key={i} className="p-3 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-white">{w.jp}</span>
              <span className="text-[10px] text-rose-400/70">{w.romaji}</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{w.en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
