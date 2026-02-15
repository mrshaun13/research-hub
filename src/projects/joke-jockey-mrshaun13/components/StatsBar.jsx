import React from 'react';
import { STYLES, TOPICS, TOPIC_GROUPS, AGE_GROUPS, GENERATIONS } from '../data';

function StatCard({ emoji, label, value, color = 'amber' }) {
  const colors = {
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/20',
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-4 text-center`}>
      <span className="text-2xl block mb-1">{emoji}</span>
      <div className="text-2xl font-black text-white">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

function BarChart({ data, maxVal }) {
  return (
    <div className="space-y-1.5">
      {data.map(item => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="text-xs w-6 text-center">{item.emoji}</span>
          <span className="text-[10px] text-gray-400 w-28 truncate">{item.label}</span>
          <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, (item.count / maxVal) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 w-8 text-right font-mono">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatsBar({ stats }) {
  const styleData = STYLES.map(s => ({
    label: s.label, emoji: s.emoji, count: stats.byStyle[s.id] || 0,
  })).sort((a, b) => b.count - a.count);

  const topicData = TOPICS.map(t => ({
    label: t.label, emoji: t.emoji, count: stats.byTopic[t.id] || 0,
  })).sort((a, b) => b.count - a.count).slice(0, 20);

  const genData = GENERATIONS.map(g => ({
    label: g.label, emoji: g.emoji, count: stats.byGeneration[g.id] || 0,
  })).sort((a, b) => b.count - a.count);

  const ageData = AGE_GROUPS.map(a => ({
    label: a.label, emoji: a.emoji, count: stats.byAge[a.id] || 0,
  }));

  const maxStyle = Math.max(...styleData.map(d => d.count));
  const maxTopic = Math.max(...topicData.map(d => d.count));
  const maxGen = Math.max(...genData.map(d => d.count));
  const maxAge = Math.max(...ageData.map(d => d.count));

  const topicGroupData = TOPIC_GROUPS.map(g => {
    const topics = TOPICS.filter(t => t.group === g.id);
    const count = topics.reduce((sum, t) => sum + (stats.byTopic[t.id] || 0), 0);
    return { label: g.label, emoji: g.emoji, count, topicCount: topics.length };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <span className="text-5xl block mb-3">📊</span>
        <h2 className="text-2xl font-black text-white mb-1">Collection Statistics</h2>
        <p className="text-sm text-gray-400">A breakdown of every joke in the repository</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard emoji="😂" label="Total Jokes" value={stats.total} color="amber" />
        <StatCard emoji="🎭" label="Joke Styles" value={Object.keys(stats.byStyle).length} color="purple" />
        <StatCard emoji="📂" label="Topics" value={Object.keys(stats.byTopic).length} color="cyan" />
        <StatCard emoji="🌍" label="Generations" value={Object.keys(stats.byGeneration).length} color="emerald" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Style */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>🎭</span> Jokes by Style
          </h3>
          <BarChart data={styleData} maxVal={maxStyle} />
        </div>

        {/* By Generation */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>🌍</span> Jokes by Generation
          </h3>
          <BarChart data={genData} maxVal={maxGen} />
        </div>

        {/* By Age */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>👶</span> Jokes by Age Group
          </h3>
          <BarChart data={ageData} maxVal={maxAge} />
          <p className="text-[9px] text-gray-600 mt-2 italic">Age groups are cumulative — a joke for ages 4+ also appears in 7+, 10+, etc.</p>
        </div>

        {/* By Topic Group */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>📂</span> Jokes by Category
          </h3>
          <BarChart data={topicGroupData} maxVal={Math.max(...topicGroupData.map(d => d.count))} />
        </div>
      </div>

      {/* Top Topics */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <span>🏆</span> Top 20 Topics
        </h3>
        <BarChart data={topicData} maxVal={maxTopic} />
      </div>
    </div>
  );
}
