import React, { useState } from 'react';
import { STYLES, TOPICS, GENERATIONS } from '../data';

export default function FavoritesPanel({ favorites, allJokes, onRemove, onClose }) {
  const [revealedIds, setRevealedIds] = useState(new Set());

  const favoriteJokes = favorites
    .map(id => allJokes.find(j => j.id === id))
    .filter(Boolean);

  const toggleReveal = (id) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>⭐</span> Your Favorites
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {favoriteJokes.length} saved joke{favoriteJokes.length !== 1 ? 's' : ''} — stored in your browser
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-gray-800 text-gray-400 hover:text-white rounded-lg text-xs font-medium transition-colors"
        >
          ← Back to Browse
        </button>
      </div>

      {favoriteJokes.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">☆</span>
          <h3 className="text-lg font-bold text-white mb-2">No favorites yet</h3>
          <p className="text-sm text-gray-400 mb-4">
            Click the ⭐ button on any joke to save it here
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm"
          >
            Start Browsing
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteJokes.map(joke => {
            const styleInfo = STYLES.find(s => s.id === joke.style);
            const topicInfos = joke.topics.map(t => TOPICS.find(tp => tp.id === t)).filter(Boolean);
            const genInfo = GENERATIONS.find(g => g.id === joke.generation);
            const isRevealed = revealedIds.has(joke.id);

            return (
              <div
                key={joke.id}
                className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 hover:border-amber-500/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      {styleInfo && (
                        <span className="text-[9px] bg-amber-500/15 text-amber-300 px-1.5 py-0.5 rounded-full font-medium">
                          {styleInfo.emoji} {styleInfo.label}
                        </span>
                      )}
                      {topicInfos.slice(0, 3).map(t => (
                        <span key={t.id} className="text-[9px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full">
                          {t.emoji} {t.label}
                        </span>
                      ))}
                      {genInfo && genInfo.id !== 'universal' && (
                        <span className="text-[9px] bg-purple-500/15 text-purple-300 px-1.5 py-0.5 rounded-full font-medium">
                          {genInfo.emoji} {genInfo.label}
                        </span>
                      )}
                      <span className="text-[9px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-full">
                        Ages {joke.ageMin}+
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white mb-1">{joke.text}</p>

                    {isRevealed ? (
                      <p className="text-sm text-amber-300 font-medium">{joke.punchline}</p>
                    ) : (
                      <button
                        onClick={() => toggleReveal(joke.id)}
                        className="text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors"
                      >
                        Tap to reveal punchline →
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onRemove(joke.id)}
                    className="p-1.5 text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                    title="Remove from favorites"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
