import React from 'react';
import { STYLES, TOPICS, GENERATIONS } from '../data';

export default function JokeCard({
  joke, showPunchline, onReveal, onNext, onPrev, onRandom,
  isFavorite, onToggleFavorite, currentIndex, totalCount
}) {
  if (!joke) return null;

  const styleInfo = STYLES.find(s => s.id === joke.style);
  const topicInfos = joke.topics.map(t => TOPICS.find(tp => tp.id === t)).filter(Boolean);
  const genInfo = GENERATIONS.find(g => g.id === joke.generation);

  const isKnockKnock = joke.style === 'knock-knock';
  const isTongueTwister = joke.style === 'tongue-twister';
  const isWouldYouRather = joke.style === 'would-you-rather';
  const isRiddle = joke.style === 'riddle';

  return (
    <div className="space-y-4">
      {/* Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Joke <span className="text-amber-400 font-bold">{currentIndex + 1}</span> of <span className="text-white font-medium">{totalCount.toLocaleString()}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {styleInfo && (
            <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full font-medium">
              {styleInfo.emoji} {styleInfo.label}
            </span>
          )}
          {genInfo && genInfo.id !== 'universal' && (
            <span className="text-[10px] bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full font-medium">
              {genInfo.emoji} {genInfo.label}
            </span>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Accent bar */}
        <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />

        <div className="p-8">
          {/* Setup */}
          <div className="text-center mb-6">
            <span className="text-4xl block mb-4">{styleInfo?.emoji || '😄'}</span>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              {joke.text}
            </p>
          </div>

          {/* Punchline area */}
          {showPunchline ? (
            <div className="text-center animate-fade-in">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-4">
                <p className="text-lg md:text-xl text-amber-300 font-bold leading-relaxed">
                  {joke.punchline}
                </p>
              </div>
              {isTongueTwister && (
                <p className="text-xs text-gray-500 italic">Try saying it 3 times fast! 👅</p>
              )}
              {isWouldYouRather && (
                <p className="text-xs text-gray-500 italic">What would YOU choose? 🤔</p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={onReveal}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black rounded-xl text-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:scale-105 active:scale-95"
              >
                {isKnockKnock ? '🚪 Who\'s There?' : isRiddle ? '🧩 Reveal Answer' : isTongueTwister ? '👅 Show It!' : isWouldYouRather ? '🤔 See Option B' : '😂 Show Punchline'}
              </button>
            </div>
          )}
        </div>

        {/* Topic tags */}
        <div className="px-8 pb-4 flex flex-wrap gap-1.5 justify-center">
          {topicInfos.slice(0, 4).map(t => (
            <span key={t.id} className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700/50">
              {t.emoji} {t.label}
            </span>
          ))}
          <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700/50">
            Ages {joke.ageMin}+
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onPrev}
          className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-150 active:scale-95"
          title="Previous joke"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={onRandom}
          className="px-5 py-3 rounded-xl bg-gray-800 text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all duration-150 font-medium text-sm active:scale-95"
          title="Random joke"
        >
          🎲 Random
        </button>

        <button
          onClick={onToggleFavorite}
          className={`p-3 rounded-xl transition-all duration-150 active:scale-95 ${isFavorite ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-800 text-gray-400 hover:text-amber-400 hover:bg-gray-700'}`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>

        <button
          onClick={showPunchline ? onNext : onReveal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-500 transition-all duration-150 active:scale-95"
          title={showPunchline ? 'Next joke' : 'Show punchline'}
        >
          {showPunchline ? 'Next →' : 'Reveal'}
        </button>

        <button
          onClick={onNext}
          className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-150 active:scale-95"
          title="Next joke"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
