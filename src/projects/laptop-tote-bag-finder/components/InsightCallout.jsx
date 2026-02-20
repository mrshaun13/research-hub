import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const VARIANTS = {
  info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-300', Icon: Lightbulb },
  warning: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-300', Icon: AlertTriangle },
  recommendation: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-300', Icon: CheckCircle },
  critical: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-300', Icon: AlertCircle },
  highlight: { bg: 'bg-violet-500/5', border: 'border-violet-500/20', text: 'text-violet-300', Icon: Sparkles },
};

export default function InsightCallout({ children, variant = 'info', title }) {
  const v = VARIANTS[variant] || VARIANTS.info;
  const { Icon } = v;
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${v.bg} ${v.border} ${v.text}`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-70" />
      <div>
        {title && <p className="text-xs font-semibold mb-1">{title}</p>}
        <p className="text-xs leading-relaxed opacity-90">{children}</p>
      </div>
    </div>
  );
}
