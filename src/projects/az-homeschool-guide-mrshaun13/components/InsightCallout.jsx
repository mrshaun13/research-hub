import React from 'react';
import { Sparkles } from 'lucide-react';

const colorMap = {
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-200',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
  violet: 'bg-violet-500/10 border-violet-500/30 text-violet-200',
  red: 'bg-red-500/10 border-red-500/30 text-red-200',
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200',
};

export default function InsightCallout({ color = 'amber', children }) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${colorMap[color] || colorMap.amber}`}>
      <div className="flex items-start gap-2">
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>{children}</div>
      </div>
    </div>
  );
}
