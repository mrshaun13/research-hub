import React, { useState, useCallback, useRef, useEffect } from 'react';
import { STYLES, TOPICS, TOPIC_GROUPS, AGE_GROUPS, GENERATIONS } from '../data';

const FADER_COLORS = [
  { bg: '#3b82f6', glow: '#3b82f680' },
  { bg: '#10b981', glow: '#10b98180' },
  { bg: '#f59e0b', glow: '#f59e0b80' },
  { bg: '#a855f7', glow: '#a855f780' },
  { bg: '#f43f5e', glow: '#f43f5e80' },
  { bg: '#ef4444', glow: '#ef444480' },
  { bg: '#06b6d4', glow: '#06b6d480' },
  { bg: '#ec4899', glow: '#ec489980' },
];

const PRESETS = [
  { id: 'all', label: '🎲', title: 'Everything', styles: {}, groups: {}, ageGroups: [], generations: [] },
  {
    id: 'dad-night', label: '👨', title: 'Dad Night',
    styles: { 'dad-joke': 100, 'pun': 90, 'one-liner': 70, 'story': 40, 'knock-knock': 0, 'riddle': 10, 'tongue-twister': 0, 'would-you-rather': 0 },
    groups: { 'Everyday': 100, 'STEM': 60, 'Nature': 50, 'Movies & Pop Culture': 40, 'Fantasy & Fun': 10, 'Holidays': 30, 'Learning': 20, 'Silly': 20 },
    ageGroups: [], generations: ['millennial', 'gen-x', 'boomer'],
  },
  {
    id: 'kid-friendly', label: '🧒', title: 'Kid Mode',
    styles: { 'knock-knock': 100, 'riddle': 90, 'tongue-twister': 80, 'would-you-rather': 80, 'dad-joke': 60, 'pun': 40, 'one-liner': 20, 'story': 30 },
    groups: { 'Nature': 100, 'Fantasy & Fun': 100, 'Silly': 100, 'Holidays': 90, 'Everyday': 60, 'STEM': 40, 'Learning': 50, 'Movies & Pop Culture': 30 },
    ageGroups: ['4-6', '7-9', '10-12'], generations: [],
  },
  {
    id: 'halloween', label: '🎃', title: 'Spooky',
    styles: { 'riddle': 90, 'story': 100, 'knock-knock': 60, 'pun': 50, 'dad-joke': 20, 'one-liner': 30, 'tongue-twister': 10, 'would-you-rather': 20 },
    groups: { 'Fantasy & Fun': 100, 'Holidays': 100, 'Silly': 40, 'Nature': 20, 'STEM': 0, 'Everyday': 10, 'Learning': 10, 'Movies & Pop Culture': 30 },
    ageGroups: [], generations: [],
  },
  {
    id: 'nerd', label: '🧪', title: 'Nerd',
    styles: { 'pun': 100, 'riddle': 90, 'one-liner': 80, 'dad-joke': 60, 'story': 40, 'knock-knock': 20, 'tongue-twister': 10, 'would-you-rather': 10 },
    groups: { 'STEM': 100, 'Learning': 90, 'Movies & Pop Culture': 50, 'Nature': 30, 'Everyday': 20, 'Fantasy & Fun': 30, 'Holidays': 0, 'Silly': 10 },
    ageGroups: ['10-12', '13-15', '16+'], generations: [],
  },
  {
    id: 'road-trip', label: '🚗', title: 'Road Trip',
    styles: { 'knock-knock': 100, 'would-you-rather': 100, 'tongue-twister': 90, 'riddle': 70, 'dad-joke': 60, 'pun': 40, 'one-liner': 30, 'story': 20 },
    groups: { 'Everyday': 100, 'Nature': 80, 'Silly': 90, 'Fantasy & Fun': 60, 'STEM': 30, 'Movies & Pop Culture': 50, 'Holidays': 20, 'Learning': 30 },
    ageGroups: ['4-6', '7-9', '10-12', '13-15'], generations: [],
  },
  {
    id: 'bedtime', label: '🌙', title: 'Bedtime',
    styles: { 'riddle': 100, 'story': 90, 'would-you-rather': 60, 'dad-joke': 40, 'pun': 30, 'knock-knock': 20, 'one-liner': 10, 'tongue-twister': 0 },
    groups: { 'Nature': 100, 'Fantasy & Fun': 100, 'Everyday': 40, 'Silly': 30, 'Learning': 50, 'STEM': 20, 'Holidays': 20, 'Movies & Pop Culture': 10 },
    ageGroups: ['4-6', '7-9'], generations: [],
  },
  {
    id: 'party', label: '🎉', title: 'Party',
    styles: { 'knock-knock': 100, 'tongue-twister': 100, 'would-you-rather': 100, 'one-liner': 80, 'dad-joke': 60, 'pun': 50, 'riddle': 30, 'story': 10 },
    groups: { 'Silly': 100, 'Everyday': 90, 'Movies & Pop Culture': 80, 'Fantasy & Fun': 70, 'Holidays': 60, 'Nature': 40, 'STEM': 20, 'Learning': 10 },
    ageGroups: [], generations: ['gen-alpha', 'gen-z'],
  },
];

const TOPIC_LOOKUP = {};
TOPICS.forEach(t => { TOPIC_LOOKUP[t.id] = t; });

/* ── Vertical Channel Fader ── */
function VerticalFader({ group, weight, onChange, color }) {
  const trackRef = useRef(null);
  const pct = weight;

  const handlePointerDown = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    const ratio = 1 - Math.max(0, Math.min(1, (y - rect.top) / rect.height));
    onChange(Math.round(ratio * 20) * 5);
    const move = (ev) => {
      ev.preventDefault();
      const r = trackRef.current?.getBoundingClientRect();
      if (!r) return;
      const yy = ev.clientY ?? ev.touches?.[0]?.clientY;
      const rat = 1 - Math.max(0, Math.min(1, (yy - r.top) / r.height));
      onChange(Math.round(rat * 20) * 5);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, [onChange]);

  return (
    <div className="flex flex-col items-center gap-1.5 select-none" style={{ width: 56 }}>
      <span className="text-sm leading-none" style={{ color: pct > 0 ? color.bg : '#6b7280' }}>
        {group.emoji}
      </span>

      <div
        ref={trackRef}
        className="relative cursor-pointer touch-none"
        style={{ width: 36, height: 140 }}
        onPointerDown={handlePointerDown}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full bg-gray-800" />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 rounded-full transition-all duration-100"
          style={{
            height: `${pct}%`,
            background: `linear-gradient(to top, ${color.bg}, ${color.bg}88)`,
            boxShadow: pct > 50 ? `0 0 8px ${color.glow}` : 'none',
          }}
        />
        {[0, 25, 50, 75, 100].map(tick => (
          <React.Fragment key={tick}>
            <div className="absolute w-2.5 h-px bg-gray-700" style={{ top: `${100 - tick}%`, left: 2 }} />
            <div className="absolute w-2.5 h-px bg-gray-700" style={{ top: `${100 - tick}%`, right: 2 }} />
          </React.Fragment>
        ))}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-100"
          style={{ bottom: `calc(${pct}% - 12px)` }}
        >
          <div
            className="w-9 h-6 rounded-sm border"
            style={{
              background: pct > 0 ? 'linear-gradient(180deg, #555, #333)' : '#2a2a2a',
              borderColor: pct > 0 ? '#666' : '#444',
              boxShadow: pct > 0 ? `0 0 8px ${color.glow}, inset 0 1px 0 #777` : 'inset 0 1px 0 #555',
            }}
          >
            <div className="w-6 h-px mx-auto mt-2.5 rounded-full" style={{ background: pct > 0 ? color.bg : '#555' }} />
          </div>
        </div>
      </div>

      <span className="text-xs font-mono font-bold" style={{ color: pct > 0 ? color.bg : '#555' }}>
        {pct > 0 ? pct : 'OFF'}
      </span>
      <span
        className="text-[10px] font-bold text-center leading-tight"
        style={{ color: pct > 0 ? '#d1d5db' : '#6b7280', whiteSpace: 'nowrap' }}
      >
        {group.label}
      </span>
    </div>
  );
}

/* ── Style Knob (rotary) ── */
function StyleKnob({ style, weight, onChange }) {
  const startRef = useRef({ y: 0, startVal: 0 });
  const isActive = weight > 0;

  const handlePointerDown = useCallback((e) => {
    startRef.current = { y: e.clientY, startVal: weight };
    const move = (ev) => {
      ev.preventDefault();
      const dy = startRef.current.y - ev.clientY;
      const newVal = Math.max(0, Math.min(100, startRef.current.startVal + Math.round(dy / 1.5)));
      onChange(Math.round(newVal / 5) * 5);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, [weight, onChange]);

  const rotation = -135 + (weight / 100) * 270;

  return (
    <div className="flex flex-col items-center gap-1 select-none" style={{ minWidth: 52 }}>
      <div
        className="relative cursor-pointer touch-none active:scale-95 transition-transform"
        style={{ width: 44, height: 44 }}
        onPointerDown={handlePointerDown}
        onDoubleClick={() => onChange(weight > 0 ? 0 : 100)}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActive
              ? `conic-gradient(from 202.5deg, #f59e0b ${(weight / 100) * 75}%, #333 0%)`
              : '#333',
            padding: 3,
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #555, #2a2a2a)',
              boxShadow: isActive ? '0 0 10px #f59e0b40, inset 0 1px 0 #777' : 'inset 0 1px 0 #555',
            }}
          >
            <div
              className="absolute w-0.5 h-3.5 rounded-full"
              style={{
                background: isActive ? '#f59e0b' : '#666',
                transformOrigin: 'bottom center',
                transform: `rotate(${rotation}deg) translateY(-6px)`,
              }}
            />
          </div>
        </div>
      </div>
      <span className="text-xs leading-none" style={{ color: isActive ? '#f59e0b' : '#666' }}>
        {style.emoji}
      </span>
      <span className={`text-[10px] font-bold text-center leading-tight ${isActive ? 'text-gray-300' : 'text-gray-600'}`} style={{ whiteSpace: 'nowrap' }}>
        {style.label}
      </span>
    </div>
  );
}

/* ── Mixer Board Lever Switch ── */
function LeverSwitch({ active, onClick, children, color = '#10b981' }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 select-none active:scale-95 transition-transform"
    >
      <div
        className="relative rounded-sm border transition-all duration-200"
        style={{
          width: 18,
          height: 32,
          background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
          borderColor: active ? color : '#444',
          boxShadow: active ? `0 0 8px ${color}60` : 'inset 0 1px 0 #333',
        }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-px bg-gray-700" />
        <div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-3 rounded-sm border transition-all duration-200"
          style={{
            top: active ? 3 : 'auto',
            bottom: active ? 'auto' : 3,
            background: active
              ? `linear-gradient(180deg, ${color}, ${color}cc)`
              : 'linear-gradient(180deg, #555, #333)',
            borderColor: active ? color : '#666',
            boxShadow: active ? `0 0 6px ${color}80, inset 0 1px 0 #ffffff30` : 'inset 0 1px 0 #777',
          }}
        />
        <div
          className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full transition-all duration-200"
          style={{ background: active ? color : '#333', boxShadow: active ? `0 0 4px ${color}` : 'none' }}
        />
      </div>
      <span className={`text-[10px] font-bold text-center leading-tight ${active ? 'text-gray-200' : 'text-gray-500'}`}>
        {children}
      </span>
    </button>
  );
}

/* ── Performance Pad ── */
function Pad({ preset, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-lg border transition-all duration-150 active:scale-90 select-none"
      style={{
        background: isActive
          ? 'linear-gradient(180deg, #f59e0b33, #ea580c22)'
          : 'linear-gradient(180deg, #3a3a3a, #222)',
        borderColor: isActive ? '#f59e0b88' : '#555',
        boxShadow: isActive
          ? '0 0 12px #f59e0b30, inset 0 1px 0 #f59e0b44'
          : 'inset 0 1px 0 #4a4a4a, 0 2px 4px #00000060',
        padding: '8px 6px',
        minHeight: 48,
      }}
    >
      <span className="text-base leading-none">{preset.label}</span>
      <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-amber-300' : 'text-gray-400'}`}>{preset.title}</span>
    </button>
  );
}

/* ── Vinyl Record (joke display) ── */
function VinylRecord({ joke, showPunchline, onReveal, onNext, onPrev, onRandom, isFavorite, onToggleFavorite, spinning }) {
  const styleInfo = joke ? STYLES.find(s => s.id === joke.style) : null;
  const genInfo = joke ? GENERATIONS.find(g => g.id === joke.generation) : null;
  const topicInfos = joke ? joke.topics.map(t => TOPIC_LOOKUP[t]).filter(Boolean) : [];

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div
          className={`relative rounded-full flex items-center justify-center transition-transform ${spinning ? 'animate-spin-record' : ''}`}
          style={{
            width: 'min(320px, 55vw)',
            height: 'min(320px, 55vw)',
            background: 'radial-gradient(circle, #1a1a1a 30%, #111 50%, #1a1a1a 51%, #0d0d0d 70%, #1a1a1a 71%, #111 100%)',
            boxShadow: '0 0 40px #00000080, inset 0 0 20px #00000060',
            animationDuration: '0.6s',
          }}
        >
          {[38, 46, 54, 62, 70, 78, 86, 93].map(r => (
            <div key={r} className="absolute rounded-full border border-gray-800/20" style={{ width: `${r}%`, height: `${r}%` }} />
          ))}

          <div
            className="absolute rounded-full flex flex-col items-center justify-center text-center"
            style={{
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, #2a2520, #1a1510)',
              border: '2px solid #f59e0b30',
              boxShadow: '0 0 15px #f59e0b15',
              overflow: 'hidden',
            }}
          >
            {joke ? (
              <div className="px-4 py-3 flex flex-col items-center gap-1.5 max-h-full overflow-y-auto w-full">
                <p className="text-sm sm:text-base font-bold text-white leading-snug">
                  {joke.text}
                </p>
                {showPunchline ? (
                  <p className="text-sm sm:text-base text-amber-300 font-bold leading-snug">
                    {joke.punchline}
                  </p>
                ) : (
                  <button
                    onClick={onReveal}
                    className="mt-1 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 active:scale-95 transition-all"
                  >
                    DROP THE BEAT
                  </button>
                )}
              </div>
            ) : (
              <span className="text-gray-600 text-sm">No jokes match</span>
            )}
            <div
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ background: '#111', border: '1px solid #333', top: 4, left: '50%', transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {joke && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center justify-center active:scale-90 transition-all"
              style={{ boxShadow: '0 2px 8px #00000060' }}
              title="Previous joke"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={showPunchline ? onNext : onReveal}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full border flex items-center justify-center font-bold active:scale-90 transition-all"
              style={{
                background: showPunchline ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : 'linear-gradient(135deg, #f59e0b44, #ea580c44)',
                borderColor: '#f59e0b88',
                color: showPunchline ? '#000' : '#f59e0b',
                boxShadow: '0 2px 8px #f59e0b40',
              }}
              title={showPunchline ? 'Next joke' : 'Reveal punchline'}
            >
              {showPunchline ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              )}
            </button>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={onRandom}
                className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:text-amber-400 flex items-center justify-center active:scale-90 transition-all text-sm"
                style={{ boxShadow: '0 2px 6px #00000060' }}
                title="Random joke"
              >
                🎲
              </button>
              <button
                onClick={onToggleFavorite}
                className="w-9 h-9 rounded-full border flex items-center justify-center active:scale-90 transition-all text-sm"
                style={{
                  background: isFavorite ? '#f59e0b20' : '#1f2937',
                  borderColor: isFavorite ? '#f59e0b60' : '#374151',
                  boxShadow: isFavorite ? '0 0 8px #f59e0b40' : '0 2px 6px #00000060',
                }}
                title={isFavorite ? 'Remove favorite' : 'Add favorite'}
              >
                {isFavorite ? '⭐' : '☆'}
              </button>
            </div>
          </>
        )}
      </div>

      {joke && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 max-w-xs">
          {styleInfo && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              style={{ background: '#f59e0b15', borderColor: '#f59e0b40', color: '#f59e0b' }}>
              {styleInfo.emoji} {styleInfo.label}
            </span>
          )}
          {topicInfos.slice(0, 3).map(t => (
            <span key={t.id} className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              style={{ background: '#3b82f615', borderColor: '#3b82f640', color: '#60a5fa' }}>
              {t.emoji} {t.label}
            </span>
          ))}
          {joke.ageMin != null && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              style={{ background: '#10b98115', borderColor: '#10b98140', color: '#34d399' }}>
              {joke.ageMin}+
            </span>
          )}
          {genInfo && genInfo.id !== 'universal' && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
              style={{ background: '#a855f715', borderColor: '#a855f740', color: '#c084fc' }}>
              {genInfo.emoji} {genInfo.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN DJ BOARD EXPORT
   ══════════════════════════════════════════ */
export default function MixerPanel({
  styleWeights, setStyleWeight,
  groupWeights, setGroupWeight,
  ageGroups, toggleAge, clearAges,
  generations, toggleGen, clearGens,
  filteredCount, totalCount,
  shuffled, setShuffled,
  clearAll, hasFilters,
  favorites, showFavorites, setShowFavorites,
  view, setView,
  applyPreset,
  mixerOpen, setMixerOpen,
  joke, showPunchline, onReveal, onNext, onPrev, onRandom,
  isFavorite, onToggleFavorite, currentIndex,
}) {
  const leftGroups = TOPIC_GROUPS.slice(0, 4);
  const rightGroups = TOPIC_GROUPS.slice(4, 8);

  const [spinning, setSpinning] = useState(false);
  const prevJokeRef = useRef(joke?.id);
  const [activePreset, setActivePreset] = useState('all');

  useEffect(() => {
    if (joke && joke.id !== prevJokeRef.current) {
      prevJokeRef.current = joke.id;
      setSpinning(true);
      const t = setTimeout(() => setSpinning(false), 600);
      return () => clearTimeout(t);
    }
  }, [joke]);

  const handlePreset = useCallback((p) => {
    setActivePreset(p.id);
    applyPreset(p);
  }, [applyPreset]);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #111 30%, #0a0a0a 100%)',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes spin-record {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-record {
          animation: spin-record 0.6s ease-out;
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800/50 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black tracking-wider text-gray-500 uppercase">Joke Mixer</span>
          <div
            className="text-xs font-black px-3 py-1 rounded-md"
            style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c)', color: '#000' }}
          >
            {filteredCount.toLocaleString()}
          </div>
          <span className="text-xs text-gray-600">/ {totalCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setView('browse'); setShowFavorites(false); }}
            className={`px-2.5 py-1.5 rounded text-sm font-bold transition-colors ${view === 'browse' && !showFavorites ? 'text-amber-400' : 'text-gray-600 hover:text-gray-300'}`}
          >🎲</button>
          <button
            onClick={() => { setShowFavorites(true); setView('browse'); }}
            className={`px-2.5 py-1.5 rounded text-sm font-bold transition-colors ${showFavorites ? 'text-amber-400' : 'text-gray-600 hover:text-gray-300'}`}
          >⭐{favorites.length > 0 ? ` ${favorites.length}` : ''}</button>
          <button
            onClick={() => { setView('stats'); setShowFavorites(false); }}
            className={`px-2.5 py-1.5 rounded text-sm font-bold transition-colors ${view === 'stats' ? 'text-amber-400' : 'text-gray-600 hover:text-gray-300'}`}
          >📊</button>
          {hasFilters && (
            <button onClick={() => { clearAll(); setActivePreset('all'); }} className="px-2.5 py-1.5 rounded text-sm font-bold text-red-500/70 hover:text-red-400">✕</button>
          )}
        </div>
      </div>

      {/* ── STYLE KNOBS ROW ── */}
      <div className="px-3 py-3 border-b border-gray-800/30 shrink-0">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Style</span>
          <span className="text-[10px] text-gray-600">drag ↕ · double-click toggle</span>
        </div>
        <div className="flex justify-around gap-1">
          {STYLES.map(s => (
            <StyleKnob
              key={s.id}
              style={s}
              weight={styleWeights[s.id] ?? 100}
              onChange={(v) => { setStyleWeight(s.id, v); setActivePreset(null); }}
            />
          ))}
        </div>
      </div>

      {/* ── MAIN DECK: Faders + Vinyl ── */}
      <div className="flex-1 flex items-center justify-center px-2 py-4 min-h-0">
        <div className="flex items-start gap-1 sm:gap-3 w-full max-w-3xl justify-center">
          <div className="flex gap-0.5 sm:gap-1 shrink-0">
            {leftGroups.map((g, i) => (
              <VerticalFader
                key={g.id}
                group={g}
                weight={groupWeights[g.id] ?? 100}
                onChange={(v) => { setGroupWeight(g.id, v); setActivePreset(null); }}
                color={FADER_COLORS[i]}
              />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center min-w-0 py-2">
            <VinylRecord
              joke={joke}
              showPunchline={showPunchline}
              onReveal={onReveal}
              onNext={onNext}
              onPrev={onPrev}
              onRandom={onRandom}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
              spinning={spinning}
            />
          </div>

          <div className="flex gap-0.5 sm:gap-1 shrink-0">
            {rightGroups.map((g, i) => (
              <VerticalFader
                key={g.id}
                group={g}
                weight={groupWeights[g.id] ?? 100}
                onChange={(v) => { setGroupWeight(g.id, v); setActivePreset(null); }}
                color={FADER_COLORS[i + 4]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── SWITCHES: Age + Generation ── */}
      <div className="px-4 py-3 border-t border-gray-800/30 shrink-0">
        <div className="flex gap-6 justify-center flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Age</span>
            {AGE_GROUPS.map(a => (
              <LeverSwitch
                key={a.id}
                active={ageGroups.includes(a.id)}
                onClick={() => toggleAge(a.id)}
                color="#10b981"
              >
                {a.label.replace('Ages ', '')}
              </LeverSwitch>
            ))}
          </div>

          <div className="w-px h-10 bg-gray-800 self-center" />

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gen</span>
            {GENERATIONS.filter(g => g.id !== 'universal').map(g => (
              <LeverSwitch
                key={g.id}
                active={generations.includes(g.id)}
                onClick={() => toggleGen(g.id)}
                color="#a855f7"
              >
                {g.label.replace('Gen ', '')}
              </LeverSwitch>
            ))}
          </div>
        </div>
      </div>

      {/* ── PERFORMANCE PADS ── */}
      <div className="px-4 py-3 border-t border-gray-800/30 shrink-0">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Presets</span>
          <button
            onClick={() => setShuffled(!shuffled)}
            className={`px-3 py-1 rounded-md text-xs font-bold border transition-all ${shuffled ? 'text-amber-300 border-amber-500/50 bg-amber-500/10' : 'text-gray-500 border-gray-700 hover:text-gray-300'}`}
          >
            🔀 Shuffle {shuffled ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {PRESETS.map(p => (
            <Pad key={p.id} preset={p} isActive={activePreset === p.id} onClick={() => handlePreset(p)} />
          ))}
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="px-4 pb-3 flex justify-center gap-4 text-[10px] text-gray-600 shrink-0">
        <span>← Prev</span>
        <span>→/Space: {showPunchline ? 'Next' : 'Reveal'}</span>
        <span>R: Random</span>
      </div>
    </div>
  );
}
