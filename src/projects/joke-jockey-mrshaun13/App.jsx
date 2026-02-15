import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ALL_JOKES, STYLES, TOPICS, TOPIC_GROUPS, AGE_GROUPS, GENERATIONS, weightedFilterJokes, shuffleJokes, getJokeStats, TOTAL_JOKE_COUNT } from './data';
import JokeCard from './components/JokeCard';
import MixerPanel from './components/MixerPanel';
import StatsBar from './components/StatsBar';
import FavoritesPanel from './components/FavoritesPanel';

const ACCENT = {
  from: 'from-amber-500',
  to: 'to-orange-600',
  bg: 'bg-amber-500',
  text: 'text-amber-400',
  border: 'border-amber-500/30',
  ring: 'ring-amber-500/20',
  hover: 'hover:bg-amber-500/10',
  badge: 'bg-amber-500/15 text-amber-300',
};

function useToggleSet(initial = []) {
  const [items, setItems] = useState(initial);
  const toggle = useCallback((id) => {
    setItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);
  const clear = useCallback(() => setItems([]), []);
  return [items, toggle, clear, setItems];
}

export default function JokeRepository() {
  const [styleWeights, setStyleWeights] = useState({});
  const [groupWeights, setGroupWeights] = useState({});
  const [ageGroups, toggleAge, clearAges, setAgeGroups] = useToggleSet();
  const [generations, toggleGen, clearGens, setGenerations] = useToggleSet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('joke-favorites') || '[]'); } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [view, setView] = useState('browse'); // 'browse' | 'stats'
  const [mixerOpen, setMixerOpen] = useState(true);

  const setStyleWeight = useCallback((id, value) => {
    setStyleWeights(prev => ({ ...prev, [id]: value }));
  }, []);

  const setGroupWeight = useCallback((id, value) => {
    setGroupWeights(prev => ({ ...prev, [id]: value }));
  }, []);

  const applyPreset = useCallback((preset) => {
    setStyleWeights(preset.styles || {});
    setGroupWeights(preset.groups || {});
    setAgeGroups(preset.ageGroups || []);
    setGenerations(preset.generations || []);
  }, [setAgeGroups, setGenerations]);

  const filtered = useMemo(() => {
    const result = weightedFilterJokes({ styleWeights, groupWeights, ageGroups, generations });
    return shuffled ? shuffleJokes(result) : result;
  }, [styleWeights, groupWeights, ageGroups, generations, shuffled]);

  const currentJoke = filtered[currentIndex] || null;
  const stats = useMemo(() => getJokeStats(), []);

  const filterKey = `${JSON.stringify(styleWeights)}-${JSON.stringify(groupWeights)}-${ageGroups.join()}-${generations.join()}`;
  useEffect(() => {
    setCurrentIndex(0);
    setShowPunchline(false);
  }, [filterKey]);

  useEffect(() => {
    try { localStorage.setItem('joke-favorites', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const handleNext = useCallback(() => {
    setShowPunchline(false);
    setCurrentIndex(prev => (prev + 1) % filtered.length);
  }, [filtered.length]);

  const handlePrev = useCallback(() => {
    setShowPunchline(false);
    setCurrentIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const handleRandom = useCallback(() => {
    setShowPunchline(false);
    setCurrentIndex(Math.floor(Math.random() * filtered.length));
  }, [filtered.length]);

  const handleReveal = useCallback(() => setShowPunchline(true), []);

  const toggleFavorite = useCallback((jokeId) => {
    setFavorites(prev =>
      prev.includes(jokeId) ? prev.filter(id => id !== jokeId) : [...prev, jokeId]
    );
  }, []);

  const isFavorite = currentJoke ? favorites.includes(currentJoke.id) : false;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (showPunchline) handleNext();
      else handleReveal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'r' || e.key === 'R') {
      handleRandom();
    }
  }, [showPunchline, handleNext, handlePrev, handleRandom, handleReveal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const clearFilters = useCallback(() => {
    setStyleWeights({});
    setGroupWeights({});
    clearAges();
    clearGens();
  }, [clearAges, clearGens]);

  const hasFilters = Object.keys(styleWeights).length > 0 || Object.keys(groupWeights).length > 0 || ageGroups.length > 0 || generations.length > 0;

  const isBrowse = view === 'browse' && !showFavorites;

  if (showFavorites) {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-gray-950">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50">
          <span className="text-sm font-bold text-white">⭐ Favorites</span>
          <button onClick={() => { setShowFavorites(false); setView('browse'); }} className="text-xs text-gray-400 hover:text-white">← Back to Mixer</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <FavoritesPanel
            favorites={favorites}
            allJokes={ALL_JOKES}
            onRemove={(id) => toggleFavorite(id)}
            onClose={() => { setShowFavorites(false); setView('browse'); }}
          />
        </div>
      </div>
    );
  }

  if (view === 'stats') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-gray-950">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50">
          <span className="text-sm font-bold text-white">📊 Stats</span>
          <button onClick={() => setView('browse')} className="text-xs text-gray-400 hover:text-white">← Back to Mixer</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <StatsBar stats={stats} />
        </div>
      </div>
    );
  }

  return (
    <MixerPanel
      styleWeights={styleWeights} setStyleWeight={setStyleWeight}
      groupWeights={groupWeights} setGroupWeight={setGroupWeight}
      ageGroups={ageGroups} toggleAge={toggleAge} clearAges={clearAges}
      generations={generations} toggleGen={toggleGen} clearGens={clearGens}
      filteredCount={filtered.length}
      totalCount={TOTAL_JOKE_COUNT}
      shuffled={shuffled}
      setShuffled={setShuffled}
      clearAll={clearFilters}
      hasFilters={hasFilters}
      favorites={favorites}
      showFavorites={showFavorites}
      setShowFavorites={setShowFavorites}
      view={view}
      setView={setView}
      applyPreset={applyPreset}
      mixerOpen={mixerOpen}
      setMixerOpen={setMixerOpen}
      joke={currentJoke}
      showPunchline={showPunchline}
      onReveal={handleReveal}
      onNext={handleNext}
      onPrev={handlePrev}
      onRandom={handleRandom}
      isFavorite={isFavorite}
      onToggleFavorite={() => currentJoke && toggleFavorite(currentJoke.id)}
      currentIndex={currentIndex}
    />
  );
}
