import React from 'react';
import { STYLES, TOPICS, TOPIC_GROUPS, AGE_GROUPS, GENERATIONS } from '../data';

function Chip({ active, onClick, children, color = 'amber' }) {
  const colors = {
    amber: active
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10 shadow-sm'
      : 'bg-gray-800/60 text-gray-400 border-gray-700/40 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-600',
    purple: active
      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/10 shadow-sm'
      : 'bg-gray-800/60 text-gray-400 border-gray-700/40 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-600',
    cyan: active
      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-cyan-500/10 shadow-sm'
      : 'bg-gray-800/60 text-gray-400 border-gray-700/40 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-600',
    emerald: active
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10 shadow-sm'
      : 'bg-gray-800/60 text-gray-400 border-gray-700/40 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-600',
  };
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all duration-150 cursor-pointer select-none active:scale-95 ${colors[color]}`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ emoji, label, count, onClear, color = 'amber' }) {
  const textColors = { amber: 'text-amber-400', purple: 'text-purple-400', cyan: 'text-cyan-400', emerald: 'text-emerald-400' };
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{emoji}</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        {count > 0 && (
          <span className={`text-[9px] font-bold ${textColors[color]} bg-gray-800 px-1.5 py-0.5 rounded-full`}>
            {count} selected
          </span>
        )}
      </div>
      {count > 0 && (
        <button onClick={onClear} className="text-[9px] text-gray-500 hover:text-white transition-colors">
          clear
        </button>
      )}
    </div>
  );
}

export default function FilterPanel({
  styles, toggleStyle, clearStyles,
  topics, toggleTopic, clearTopics,
  ageGroups, toggleAge, clearAges,
  generations, toggleGen, clearGens,
  filteredCount, totalCount,
  shuffled, setShuffled,
  clearAll, hasFilters, totalActiveFilters,
  filtersOpen, setFiltersOpen,
  favorites, showFavorites, setShowFavorites,
  view, setView, stats,
}) {
  return (
    <div className="border-b border-gray-800/50 bg-gray-900/40">
      {/* Top bar: match count + controls */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Match count badge */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-black text-xs font-black px-3 py-1 rounded-lg">
              {filteredCount.toLocaleString()} jokes
            </div>
            {hasFilters && (
              <span className="text-[10px] text-gray-500">
                of {totalCount.toLocaleString()} • {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''} active
              </span>
            )}
            {!hasFilters && (
              <span className="text-[10px] text-gray-500">total — select filters below</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setView('browse'); setShowFavorites(false); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${view === 'browse' && !showFavorites ? 'bg-amber-500/15 text-amber-300' : 'text-gray-500 hover:text-white'}`}
          >
            🎲 Browse
          </button>
          <button
            onClick={() => { setShowFavorites(true); setView('browse'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${showFavorites ? 'bg-amber-500/15 text-amber-300' : 'text-gray-500 hover:text-white'}`}
          >
            ⭐ {favorites.length}
          </button>
          <button
            onClick={() => { setView('stats'); setShowFavorites(false); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${view === 'stats' ? 'bg-amber-500/15 text-amber-300' : 'text-gray-500 hover:text-white'}`}
          >
            📊 Stats
          </button>

          <div className="w-px h-4 bg-gray-800 mx-1" />

          <button
            onClick={() => setShuffled(!shuffled)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${shuffled ? 'bg-amber-500/15 text-amber-300' : 'text-gray-500 hover:text-white'}`}
          >
            🔀 {shuffled ? 'Shuffled' : 'Shuffle'}
          </button>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              ✕ Clear all
            </button>
          )}

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="px-2 py-1 rounded-lg text-[11px] font-medium text-gray-500 hover:text-white transition-colors"
          >
            {filtersOpen ? '▲ Hide filters' : '▼ Show filters'}
          </button>
        </div>
      </div>

      {/* Expanded filter area */}
      {filtersOpen && (
        <div className="px-4 pb-3 space-y-3">
          {/* Style */}
          <div>
            <SectionHeader emoji="🎭" label="Joke Style" count={styles.length} onClear={clearStyles} color="amber" />
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map(s => (
                <Chip key={s.id} active={styles.includes(s.id)} onClick={() => toggleStyle(s.id)} color="amber">
                  {s.emoji} {s.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Topics — grouped */}
          <div>
            <SectionHeader emoji="📂" label="Topic" count={topics.length} onClear={clearTopics} color="cyan" />
            <div className="space-y-2">
              {TOPIC_GROUPS.map(group => {
                const groupTopics = TOPICS.filter(t => t.group === group.id);
                const activeInGroup = groupTopics.filter(t => topics.includes(t.id)).length;
                return (
                  <div key={group.id}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] text-gray-500 font-medium">{group.emoji} {group.label}</span>
                      {activeInGroup > 0 && (
                        <span className="text-[8px] text-cyan-400 font-bold">({activeInGroup})</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {groupTopics.map(t => (
                        <Chip key={t.id} active={topics.includes(t.id)} onClick={() => toggleTopic(t.id)} color="cyan">
                          {t.emoji} {t.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age + Generation side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionHeader emoji="👶" label="Age Group" count={ageGroups.length} onClear={clearAges} color="emerald" />
              <div className="flex flex-wrap gap-1.5">
                {AGE_GROUPS.map(a => (
                  <Chip key={a.id} active={ageGroups.includes(a.id)} onClick={() => toggleAge(a.id)} color="emerald">
                    {a.emoji} {a.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader emoji="🌍" label="Generation" count={generations.length} onClear={clearGens} color="purple" />
              <div className="flex flex-wrap gap-1.5">
                {GENERATIONS.map(g => (
                  <Chip key={g.id} active={generations.includes(g.id)} onClick={() => toggleGen(g.id)} color="purple">
                    {g.emoji} {g.label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
