import React, { useState } from 'react';
import { commonVerbs, verbGroups, teFormRules, conjugationForms } from '../data/verbData';
import InsightCallout from './InsightCallout';

const GROUP_COLORS = {
  Godan: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Ichidan: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Irregular: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function Verbs() {
  const [tab, setTab] = useState('verbs');
  const [groupFilter, setGroupFilter] = useState('All');
  const [expandedVerb, setExpandedVerb] = useState(null);

  const filtered = groupFilter === 'All' ? commonVerbs : commonVerbs.filter((v) => v.group === groupFilter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Verb Reference</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Complete verb conjugation tables, te-form rules, and verb group explanations. Click any verb to see all conjugations.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { id: 'verbs', label: 'Common Verbs' },
          { id: 'groups', label: 'Verb Groups' },
          { id: 'teform', label: 'Te-form Rules' },
          { id: 'forms', label: 'All Forms' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              tab === t.id ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'text-gray-400 border-gray-800 hover:border-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'verbs' && (
        <>
          <div className="flex gap-2">
            {['All', 'Godan', 'Ichidan', 'Irregular'].map((g) => (
              <button
                key={g}
                onClick={() => setGroupFilter(g)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all border ${
                  groupFilter === g ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-500 border-gray-800 hover:border-gray-700'
                }`}
              >
                {g}
              </button>
            ))}
            <span className="text-[10px] text-gray-600 ml-auto self-center">{filtered.length} verbs</span>
          </div>

          <div className="space-y-2">
            {filtered.map((v, i) => {
              const isOpen = expandedVerb === i;
              return (
                <div key={i} className={`rounded-xl border transition-all ${isOpen ? 'border-rose-500/20 bg-rose-500/5' : 'border-gray-800 bg-gray-900/50'}`}>
                  <button onClick={() => setExpandedVerb(isOpen ? null : i)} className="w-full flex items-center gap-3 p-3 text-left">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${GROUP_COLORS[v.group]}`}>{v.group}</span>
                    <span className="text-sm font-medium text-white">{v.verb}</span>
                    <span className="text-[11px] text-rose-400/70">{v.romaji}</span>
                    <span className="text-[11px] text-gray-500 ml-auto">{v.en}</span>
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                        {Object.entries(v.conjugations).map(([form, val]) => (
                          <div key={form} className="p-2 rounded-lg bg-gray-800/40">
                            <p className="text-[9px] text-gray-500 uppercase tracking-wider">{form}</p>
                            <p className="text-[11px] text-white mt-0.5">{val}</p>
                          </div>
                        ))}
                      </div>
                      {v.examples?.length > 0 && (
                        <div className="space-y-1">
                          {v.examples.map((ex, j) => (
                            <div key={j} className="p-2 rounded-lg bg-gray-800/30">
                              <p className="text-[11px] text-white">{ex.jp}</p>
                              <p className="text-[10px] text-rose-400/60">{ex.romaji}</p>
                              <p className="text-[10px] text-gray-500">{ex.en}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 'groups' && (
        <div className="space-y-3">
          <InsightCallout color="blue">
            Japanese has only 3 verb groups. Once you know which group a verb belongs to, you can conjugate it into any form.
            The two irregular verbs (する and くる) are used constantly — memorize them early.
          </InsightCallout>
          {verbGroups.map((g, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
              <h4 className="text-sm font-semibold text-white mb-1">{g.group}</h4>
              <p className="text-xs text-gray-400 mb-2">{g.description}</p>
              <div className="p-2 rounded-lg bg-gray-800/30 mb-2">
                <p className="text-[10px] text-rose-400/70"><span className="text-white font-medium">Rule:</span> {g.rule}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.examples.map((ex, j) => (
                  <span key={j} className="text-[10px] px-2 py-1 rounded-md bg-gray-800/40 text-gray-300">{ex}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'teform' && (
        <div className="space-y-3">
          <InsightCallout color="emerald">
            The te-form is the most important conjugation to master. It's used for requests (～てください), ongoing actions (～ている),
            connecting sentences, and dozens of other grammar patterns. Learn these rules by heart.
          </InsightCallout>
          <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
            <h4 className="text-sm font-semibold text-white mb-3">Te-form Conjugation Rules</h4>
            <div className="space-y-2">
              {teFormRules.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-800/30">
                  <span className="text-[11px] font-mono text-rose-400 w-28 flex-shrink-0">{r.ending} → {r.teForm}</span>
                  <p className="text-[11px] text-gray-400">{r.example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'forms' && (
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
          <h4 className="text-sm font-semibold text-white mb-3">All Conjugation Forms</h4>
          <p className="text-xs text-gray-500 mb-3">Each form serves a specific grammatical purpose. Click a verb in the Common Verbs tab to see all forms applied.</p>
          <div className="space-y-2">
            {conjugationForms.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-800/30">
                <span className="text-[11px] font-semibold text-white w-36 flex-shrink-0">{f.form}</span>
                <p className="text-[11px] text-gray-400">{f.usage}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
