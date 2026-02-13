import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { learningPath } from '../data/learningPathData';
import InsightCallout from './InsightCallout';

const LEVEL_COLORS = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' },
};

function ExampleBlock({ examples }) {
  if (!examples?.length) return null;
  return (
    <div className="mt-3 space-y-1.5">
      {examples.map((ex, i) => (
        <div key={i} className="p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30">
          <p className="text-xs text-white font-medium">{ex.jp}</p>
          <p className="text-[10px] text-rose-400/80 mt-0.5">{ex.romaji}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{ex.en}</p>
        </div>
      ))}
    </div>
  );
}

function LessonCard({ lesson, isOpen, onToggle, color }) {
  const c = LEVEL_COLORS[color];
  return (
    <div className={`rounded-xl border ${isOpen ? c.border : 'border-gray-800'} ${isOpen ? c.bg : 'bg-gray-900/30'} transition-all`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-4 text-left">
        <BookOpen className={`w-4 h-4 flex-shrink-0 ${isOpen ? c.text : 'text-gray-500'}`} />
        <span className={`text-xs font-medium flex-1 ${isOpen ? 'text-white' : 'text-gray-300'}`}>{lesson.title}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{lesson.content}</div>
          <ExampleBlock examples={lesson.examples} />
        </div>
      )}
    </div>
  );
}

export default function LearningPath() {
  const [openLevel, setOpenLevel] = useState(0);
  const [openUnit, setOpenUnit] = useState(0);
  const [openLesson, setOpenLesson] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Learning Path</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          A guided curriculum from absolute beginner to advanced. Each lesson contains all the information you need — no external links required.
          Work through each unit in order for the best results.
        </p>
      </div>

      <InsightCallout color="rose">
        This learning path covers everything from your first hiragana character to advanced keigo and literary expressions.
        Each lesson builds on the previous one. Take your time — consistency beats speed.
      </InsightCallout>

      {/* Level selector */}
      <div className="flex flex-wrap gap-2">
        {learningPath.map((lp, li) => {
          const c = LEVEL_COLORS[lp.color];
          return (
            <button
              key={li}
              onClick={() => { setOpenLevel(li); setOpenUnit(0); setOpenLesson(0); }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                openLevel === li ? `${c.badge} ${c.border}` : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200'
              }`}
            >
              {lp.jlpt} — {lp.level}
            </button>
          );
        })}
      </div>

      {/* Active level */}
      {learningPath[openLevel] && (() => {
        const lp = learningPath[openLevel];
        const c = LEVEL_COLORS[lp.color];
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${c.border} ${c.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold ${c.text}`}>{lp.jlpt}</span>
                <span className="text-sm font-semibold text-white">{lp.level}</span>
              </div>
              <p className="text-xs text-gray-400">{lp.description}</p>
            </div>

            {/* Units */}
            {lp.units.map((unit, ui) => (
              <div key={ui} className="space-y-2">
                <button
                  onClick={() => { setOpenUnit(ui); setOpenLesson(0); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    openUnit === ui ? `${c.border} ${c.bg}` : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${openUnit === ui ? c.text : 'text-gray-600'}`} />
                  <span className={`text-xs font-semibold ${openUnit === ui ? 'text-white' : 'text-gray-300'}`}>{unit.title}</span>
                  <span className="text-[10px] text-gray-600 ml-auto">{unit.lessons.length} lessons</span>
                </button>

                {openUnit === ui && (
                  <div className="ml-4 space-y-2">
                    {unit.lessons.map((lesson, li) => (
                      <LessonCard
                        key={li}
                        lesson={lesson}
                        isOpen={openLesson === li}
                        onToggle={() => setOpenLesson(openLesson === li ? -1 : li)}
                        color={lp.color}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
