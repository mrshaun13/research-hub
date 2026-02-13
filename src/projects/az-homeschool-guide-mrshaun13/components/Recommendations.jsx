import React, { useState } from 'react';
import { Star, Trophy, Wallet, Brain, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { recommendations } from '../data/researchData';
import InsightCallout from './InsightCallout';

const recIcons = {
  topPick: Trophy,
  budgetPick: Wallet,
  rigorPick: Brain,
  independentPick: Zap,
};

const recColors = {
  topPick: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20' },
  budgetPick: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500/20' },
  rigorPick: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', badge: 'bg-violet-500/20' },
  independentPick: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500/20' },
};

const RecCard = ({ recKey, rec, isExpanded, onToggle }) => {
  const Icon = recIcons[recKey];
  const colors = recColors[recKey];

  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-5 transition-all`}>
      <div className="flex items-start justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${colors.badge}`}>
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-100">{rec.title}</h3>
            <p className={`text-sm font-medium ${colors.text} mt-0.5`}>{rec.estimatedCost}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Curriculum</p>
          <p className="text-sm text-gray-200">{rec.curriculum}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Co-op / Social</p>
          <p className="text-sm text-gray-200">{rec.coop}</p>
        </div>
        <div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} ${colors.text} font-medium`}>
            {rec.esaVerdict}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 font-medium mb-2">Why This Combination Works</p>
          <ul className="space-y-1.5">
            {rec.reasoning.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <Star className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Recommendations() {
  const [expanded, setExpanded] = useState('topPick');

  const recEntries = [
    { key: 'topPick', rec: recommendations.topPick },
    { key: 'budgetPick', rec: recommendations.budgetPick },
    { key: 'rigorPick', rec: recommendations.rigorPick },
    { key: 'independentPick', rec: recommendations.independentPick },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Recommendations</h1>
        <p className="text-gray-400 text-sm mt-1">Four curated combinations for different family priorities — all optimized for an advanced learner in 85234</p>
      </div>

      <InsightCallout color="amber">
        <strong>No single "best" curriculum exists</strong> — it depends on your family's priorities. 
        Below are four optimized combinations covering different needs: overall best for acceleration, 
        budget-friendly, maximum rigor, and most independent. All are ESA-eligible.
      </InsightCallout>

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {recEntries.map(({ key, rec }) => (
          <RecCard
            key={key}
            recKey={key}
            rec={rec}
            isExpanded={expanded === key}
            onToggle={() => setExpanded(expanded === key ? null : key)}
          />
        ))}
      </div>

      {/* Quick Decision Matrix */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">Quick Decision Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 text-gray-500 font-medium">If you want…</th>
                <th className="text-left py-2 text-gray-500 font-medium">Choose…</th>
                <th className="text-left py-2 text-gray-500 font-medium">Cost</th>
                <th className="text-left py-2 text-gray-500 font-medium">Parent Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 text-amber-400">Best overall for acceleration</td>
                <td className="py-2 text-gray-300">Sonlight + Math-U-See + Khan</td>
                <td className="py-2 text-gray-400">$1,200–$1,800</td>
                <td className="py-2 text-gray-400">High (3-4 hrs/day)</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 text-emerald-400">Maximum savings</td>
                <td className="py-2 text-gray-300">TGTB + Khan + Library</td>
                <td className="py-2 text-gray-400">$100–$300</td>
                <td className="py-2 text-gray-400">Moderate (2-3 hrs/day)</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 text-violet-400">Hardest academics</td>
                <td className="py-2 text-gray-300">BJU Press + Saxon + CC Challenge</td>
                <td className="py-2 text-gray-400">$2,500–$4,000</td>
                <td className="py-2 text-gray-400">Very High (4-5 hrs/day)</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400">Least parent involvement</td>
                <td className="py-2 text-gray-300">Teaching Textbooks + Time4Learning</td>
                <td className="py-2 text-gray-400">$350–$550</td>
                <td className="py-2 text-gray-400">Low (1-2 hrs/day)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Learner Tips */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-amber-400" />
          Tips for Accelerating an Advanced Learner
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            { title: "Use placement tests", desc: "Most curricula offer free placement tests. Start where your child actually is, not where their age says they should be." },
            { title: "Mix & match subjects", desc: "Your child doesn't have to be at the same level in every subject. It's common to be 2 grades ahead in math but at grade level in writing." },
            { title: "Supplement with Khan Academy", desc: "It's free, goes to college level, and lets your child explore any subject at any depth. Use it alongside your core curriculum." },
            { title: "Don't skip the co-op", desc: "Advanced learners need social interaction with peers. Co-ops provide this without the social pressure of traditional school." },
            { title: "Consider dual enrollment later", desc: "Arizona community colleges allow dual enrollment for homeschool students. ESA funds can cover tuition. Great for high school age." },
            { title: "Keep records for college", desc: "Even though AZ doesn't require it, maintain a portfolio and transcript. Colleges want to see what your child has accomplished." },
          ].map((tip, i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-amber-300 font-medium text-sm">{tip.title}</p>
              <p className="text-gray-400 text-xs mt-1">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
