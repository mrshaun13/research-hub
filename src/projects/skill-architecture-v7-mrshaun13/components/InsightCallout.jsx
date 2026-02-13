import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightCallout({ children, color = 'indigo', icon: Icon = Lightbulb }) {
  const colors = {
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
  };
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${colors[color] || colors.indigo}`}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );
}
