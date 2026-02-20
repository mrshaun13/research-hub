import React, { useState } from 'react';
import {
  ShoppingBag, BarChart3, Grid3X3, Target, Award, BookOpen, Globe,
  ChevronRight,
} from 'lucide-react';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import FeaturesMatrix from './components/FeaturesMatrix';
import UseCaseFit from './components/UseCaseFit';
import Recommendations from './components/Recommendations';
import OriginAnalysis from './components/OriginAnalysis';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: ShoppingBag, color: 'text-teal-400' },
  { id: 'comparison', label: 'Spec Comparison', icon: BarChart3, color: 'text-blue-400' },
  { id: 'features', label: 'Features Matrix', icon: Grid3X3, color: 'text-emerald-400' },
  { id: 'usecase', label: 'Use Case Fit', icon: Target, color: 'text-amber-400' },
  { id: 'origin', label: 'Origin & Value', icon: Globe, color: 'text-violet-400' },
  { id: 'recommendations', label: 'Recommendations', icon: Award, color: 'text-rose-400' },
  { id: 'sources', label: 'Sources', icon: BookOpen, color: 'text-gray-400' },
];

const sectionComponents = {
  overview: Overview,
  comparison: ComparisonTable,
  features: FeaturesMatrix,
  usecase: UseCaseFit,
  origin: OriginAnalysis,
  recommendations: Recommendations,
  sources: Sources,
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      <aside className="w-56 flex-shrink-0 bg-gray-900/80 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <ShoppingBag className="w-4.5 h-4.5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Tote Bag Finder</h1>
              <p className="text-[10px] text-gray-500">14&quot; Laptop · Petite · Zipper</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-teal-500/10 text-teal-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <s.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? s.color : 'text-gray-500 group-hover:text-gray-400'}`} />
                <span className="truncate font-medium">{s.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-teal-500/50" />}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <div className="text-[10px] text-gray-600 space-y-0.5">
            <p>25 bags · 22 brands</p>
            <p>Data: Feb 2026</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}
