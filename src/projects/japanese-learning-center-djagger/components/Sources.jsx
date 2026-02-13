import React from 'react';
import { ExternalLink } from 'lucide-react';
import { sources } from '../data/researchData';

const TIER_BADGES = {
  T1: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  T2: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  T3: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function Sources() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sources & Further Study</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          All content in this learning center was compiled from authoritative Japanese language education sources.
          These external links are provided for further study beyond what's covered here.
        </p>
      </div>

      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">About This Learning Center</h3>
        <div className="space-y-3 text-xs text-gray-400">
          <p>
            <span className="text-white font-medium">Scope:</span> This learning center covers Japanese from absolute beginner (N5) through
            advanced (N1) proficiency. All content uses romaji, hiragana, and katakana — no kanji is used.
          </p>
          <p>
            <span className="text-white font-medium">Writing systems:</span> Hiragana and katakana are presented with complete charts including
            dakuten, handakuten, and combination sounds. Romaji is provided alongside all Japanese text for accessibility.
          </p>
          <p>
            <span className="text-white font-medium">Grammar:</span> Grammar points are organized by JLPT level and include structure patterns,
            meanings, and example sentences. The learning path teaches these in a logical progression.
          </p>
          <p>
            <span className="text-white font-medium">Vocabulary:</span> Essential vocabulary is organized by topic category. Words include
            hiragana/katakana, romaji, and English translations.
          </p>
          <p>
            <span className="text-white font-medium">Verbs:</span> Complete conjugation tables for 16 common verbs across all three verb groups,
            covering 11 conjugation forms each. Te-form rules are provided as a dedicated reference.
          </p>
          <p>
            <span className="text-white font-medium">Limitations:</span> This is a reference and self-study tool. For full fluency, supplement with
            listening practice, conversation partners, and immersion. Kanji study (not covered here) becomes essential at intermediate level and above.
          </p>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Recommended Study Path</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30">
            <span className="text-emerald-400 font-bold w-4 flex-shrink-0">1.</span>
            <p><span className="text-white font-medium">Master hiragana & katakana</span> — Use the Writing Systems page. Aim for 1-2 weeks.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30">
            <span className="text-emerald-400 font-bold w-4 flex-shrink-0">2.</span>
            <p><span className="text-white font-medium">Follow the Learning Path</span> — Work through each unit in order, starting with Beginner.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30">
            <span className="text-emerald-400 font-bold w-4 flex-shrink-0">3.</span>
            <p><span className="text-white font-medium">Use reference pages</span> — Grammar, Vocabulary, Verbs, and Particles for quick lookup.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30">
            <span className="text-emerald-400 font-bold w-4 flex-shrink-0">4.</span>
            <p><span className="text-white font-medium">Practice daily</span> — Even 15 minutes/day is more effective than occasional long sessions.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30">
            <span className="text-emerald-400 font-bold w-4 flex-shrink-0">5.</span>
            <p><span className="text-white font-medium">Supplement with external resources</span> — Use the sources below for listening, reading, and conversation practice.</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">All Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((s) => (
            <div key={s.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/20 hover:bg-gray-800/40 transition-colors">
              <span className="text-[10px] text-gray-600 font-mono w-5 flex-shrink-0 mt-0.5">{s.id}.</span>
              <div className="flex-1 min-w-0">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  {s.title}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500">{s.type}</span>
                  <span className={`text-[10px] px-1.5 py-0 rounded-full border ${TIER_BADGES[s.tier]}`}>{s.tier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
