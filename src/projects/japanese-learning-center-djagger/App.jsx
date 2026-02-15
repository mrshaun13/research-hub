import React, { useState } from 'react';
import {
  Languages, Route, Type, BookOpen, Library, Zap, Circle, BookMarked,
  ChevronRight,
} from 'lucide-react';
import Overview from './components/Overview';
import LearningPath from './components/LearningPath';
import WritingSystems from './components/WritingSystems';
import Grammar from './components/Grammar';
import Vocabulary from './components/Vocabulary';
import Verbs from './components/Verbs';
import Particles from './components/Particles';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: Languages, color: 'text-rose-400' },
  { id: 'path', label: 'Learning Path', icon: Route, color: 'text-emerald-400' },
  { id: 'writing', label: 'Writing Systems', icon: Type, color: 'text-cyan-400' },
  { id: 'grammar', label: 'Grammar', icon: BookOpen, color: 'text-violet-400' },
  { id: 'vocabulary', label: 'Vocabulary', icon: Library, color: 'text-amber-400' },
  { id: 'verbs', label: 'Verbs', icon: Zap, color: 'text-blue-400' },
  { id: 'particles', label: 'Particles', icon: Circle, color: 'text-orange-400' },
  { id: 'sources', label: 'Sources', icon: BookMarked, color: 'text-gray-400' },
];

const sectionComponents = {
  overview: Overview,
  path: LearningPath,
  writing: WritingSystems,
  grammar: Grammar,
  vocabulary: Vocabulary,
  verbs: Verbs,
  particles: Particles,
  sources: Sources,
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900/80 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <Languages className="w-4.5 h-4.5 text-rose-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Japanese</h1>
              <p className="text-[10px] text-gray-500">Learning Center</p>
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
                    ? 'bg-rose-500/10 text-rose-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <s.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? s.color : 'text-gray-500 group-hover:text-gray-400'}`} />
                <span className="truncate font-medium">{s.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-rose-500/50" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}
