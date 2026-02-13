import React, { useState } from 'react';
import { hiraganaChart, hiraganaDakuten, hiraganaCombos, katakanaChart, katakanaDakuten, katakanaCombos } from '../data/writingData';
import InsightCallout from './InsightCallout';

function CharGrid({ chars, cols = 5, label }) {
  return (
    <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
      <h4 className="text-xs font-semibold text-white mb-3">{label}</h4>
      <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {chars.map((c, i) => (
          c.char ? (
            <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-800/40 hover:bg-rose-500/10 transition-colors cursor-default group">
              <span className="text-lg font-medium text-white group-hover:text-rose-300 transition-colors">{c.char}</span>
              <span className="text-[9px] text-gray-500 group-hover:text-rose-400/70 mt-0.5">{c.romaji}</span>
            </div>
          ) : (
            <div key={i} className="p-2 rounded-lg" />
          )
        ))}
      </div>
    </div>
  );
}

export default function WritingSystems() {
  const [tab, setTab] = useState('hiragana');

  const isH = tab === 'hiragana';
  const baseChart = isH ? hiraganaChart : katakanaChart;
  const dakuten = isH ? hiraganaDakuten : katakanaDakuten;
  const combos = isH ? hiraganaCombos : katakanaCombos;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Writing Systems</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Complete hiragana and katakana charts with romaji. Hover over any character to highlight it.
        </p>
      </div>

      <div className="flex gap-2">
        {['hiragana', 'katakana'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === t ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-gray-400 hover:text-gray-200 border border-gray-800 hover:border-gray-700'
            }`}
          >
            {t === 'hiragana' ? 'ひらがな Hiragana' : 'カタカナ Katakana'}
          </button>
        ))}
      </div>

      <InsightCallout color={isH ? 'rose' : 'cyan'}>
        {isH
          ? 'Hiragana is the first writing system to learn. It\'s used for native Japanese words, grammatical particles, and verb endings. Master these 46 characters and you can read basic Japanese.'
          : 'Katakana represents the same sounds as hiragana but is used for foreign loanwords (コーヒー koohii = coffee), foreign names, onomatopoeia, and emphasis. The characters are more angular.'}
      </InsightCallout>

      <CharGrid chars={baseChart} cols={5} label={`Basic ${isH ? 'Hiragana' : 'Katakana'} (46 characters)`} />

      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
        <h4 className="text-xs font-semibold text-white mb-2">Reading Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-gray-400">
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">Vowels:</span> a (ah), i (ee), u (oo), e (eh), o (oh)
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">し = shi</span> (not "si"), <span className="text-white font-medium">ち = chi</span> (not "ti"), <span className="text-white font-medium">つ = tsu</span> (not "tu")
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">ふ = fu</span> — lips close but don't touch (not English "f")
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">ら行 = r-row</span> — a light tongue tap, between English "r" and "l"
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">は = wa</span> when used as topic particle; <span className="text-white font-medium">へ = e</span> when used as direction particle
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">を = wo/o</span> — almost exclusively used as the object particle
          </div>
        </div>
      </div>

      <CharGrid chars={dakuten} cols={5} label="Dakuten (゛) & Handakuten (゜) — Voiced Sounds" />

      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
        <h4 className="text-xs font-semibold text-white mb-2">How Dakuten Works</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-gray-400">
          <div className="p-2 rounded-lg bg-gray-800/30 text-center">
            <span className="text-white">K → G</span><br />か→が
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30 text-center">
            <span className="text-white">S → Z</span><br />さ→ざ
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30 text-center">
            <span className="text-white">T → D</span><br />た→だ
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30 text-center">
            <span className="text-white">H → B / P</span><br />は→ば / ぱ
          </div>
        </div>
      </div>

      <CharGrid chars={combos} cols={3} label="Combination Sounds (Youon) — Small や, ゆ, よ" />

      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
        <h4 className="text-xs font-semibold text-white mb-2">Special Sounds</h4>
        <div className="space-y-2 text-[11px] text-gray-400">
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">Small っ/ッ (double consonant):</span> Pause briefly before the next consonant.
            きって (kitte) = stamp, がっこう (gakkou) = school, にっぽん (nippon) = Japan
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">Long vowels:</span> Hold the vowel sound longer.
            Hiragana: おかあさん (okaasan), おにいさん (oniisan), くうこう (kuukou).
            Katakana uses ー: コーヒー (koohii), ケーキ (keeki), ビール (biiru).
          </div>
          <div className="p-2 rounded-lg bg-gray-800/30">
            <span className="text-white font-medium">ん/ン (n):</span> The only standalone consonant. Pronounced differently before different sounds:
            "m" before b/p/m, "ng" before k/g, "n" elsewhere. Example: せんぱい (senpai), にほん (nihon).
          </div>
        </div>
      </div>
    </div>
  );
}
