import React from 'react';
import InsightCallout from './InsightCallout';

const LEVEL_CARDS = [
  { level: 'N5 — Beginner', color: 'emerald', hours: '~350', desc: 'Basic grammar, hiragana, katakana, 800 words. Survive daily life.' },
  { level: 'N4 — Elementary', color: 'blue', hours: '~600', desc: 'Te-form, conditionals, potential. Hold simple conversations.' },
  { level: 'N3 — Intermediate', color: 'violet', hours: '~950', desc: 'Passive, causative, keigo basics. Understand everyday Japanese.' },
  { level: 'N2 — Upper-Intermediate', color: 'orange', hours: '~1,600', desc: 'Nuanced grammar, business Japanese. Read newspapers.' },
  { level: 'N1 — Advanced', color: 'rose', hours: '~3,000', desc: 'Literary forms, full keigo, near-native comprehension.' },
];

const COLORS = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function Overview() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Japanese Learning Center</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          A comprehensive, self-contained guide to Japanese — from absolute beginner to advanced fluency.
          All content uses romaji, hiragana, and katakana only. Every lesson, example, and reference is built right here.
        </p>
      </div>

      <InsightCallout color="rose">
        Japanese has three writing systems: hiragana (native words), katakana (foreign words), and kanji (Chinese characters).
        This learning center focuses on hiragana and katakana with romaji support — giving you everything you need to read, write, and speak Japanese fluently.
      </InsightCallout>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3">How to Use This Learning Center</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Learning Path', desc: 'Follow the guided curriculum from beginner to advanced. Each lesson builds on the last with in-depth examples.', icon: '📖' },
            { title: 'Reference Pages', desc: 'Use Grammar, Vocabulary, Verbs, and Particles pages for quick lookup while studying or practicing.', icon: '📋' },
            { title: 'Writing Systems', desc: 'Master hiragana and katakana with complete charts, dakuten, and combination sounds.', icon: '✍️' },
          ].map((c) => (
            <div key={c.title} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
              <p className="text-lg mb-2">{c.icon}</p>
              <h4 className="text-xs font-semibold text-white mb-1">{c.title}</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3">JLPT Levels — Your Roadmap to Fluency</h3>
        <p className="text-xs text-gray-500 mb-4">The JLPT (Japanese Language Proficiency Test) has 5 levels. Study hours are cumulative estimates for English speakers.</p>
        <div className="space-y-2">
          {LEVEL_CARDS.map((l) => (
            <div key={l.level} className={`flex items-center gap-4 p-3 rounded-xl border ${COLORS[l.color]}`}>
              <div className="w-16 text-center flex-shrink-0">
                <p className="text-xs font-bold">{l.hours}</p>
                <p className="text-[9px] opacity-60">hours</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">{l.level}</p>
                <p className="text-[10px] text-gray-400">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Japanese Sentence Structure</h3>
        <p className="text-xs text-gray-400 mb-3">
          Japanese follows Subject-Object-Verb (SOV) order, unlike English (SVO). Particles mark each word's role.
        </p>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gray-800/30">
            <p className="text-[10px] text-gray-500 mb-1">English (SVO):</p>
            <p className="text-xs text-white">I <span className="text-rose-400">eat</span> <span className="text-cyan-400">sushi</span>.</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800/30">
            <p className="text-[10px] text-gray-500 mb-1">Japanese (SOV):</p>
            <p className="text-xs text-white">
              <span className="text-emerald-400">わたし は</span>{' '}
              <span className="text-cyan-400">すし を</span>{' '}
              <span className="text-rose-400">たべます</span>。
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              <span className="text-emerald-400">Watashi wa</span>{' '}
              <span className="text-cyan-400">sushi wo</span>{' '}
              <span className="text-rose-400">tabemasu</span>.
            </p>
            <p className="text-[10px] text-gray-600 mt-1">
              I [topic] sushi [object] eat [polite].
            </p>
          </div>
        </div>
      </div>

      <InsightCallout color="emerald">
        Japanese pronunciation is very consistent — each character always makes the same sound. Once you learn hiragana and katakana,
        you can pronounce any word correctly. There are only 5 vowel sounds (a, i, u, e, o) and no silent letters.
      </InsightCallout>
    </div>
  );
}
