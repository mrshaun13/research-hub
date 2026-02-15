import React, { useState } from 'react';
import { BookOpen, Scale, DollarSign, Users, GraduationCap, Star, FileText, MapPin, Shield } from 'lucide-react';
import Overview from './components/Overview';
import CurriculumComparison from './components/CurriculumComparison';
import CostAnalysis from './components/CostAnalysis';
import CoopPrograms from './components/CoopPrograms';
import AZLawESA from './components/AZLawESA';
import Recommendations from './components/Recommendations';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'curriculum', label: 'Curricula', icon: GraduationCap },
  { id: 'cost', label: 'Cost Analysis', icon: DollarSign },
  { id: 'coops', label: 'Co-op Programs', icon: Users },
  { id: 'law-esa', label: 'AZ Law & ESA', icon: Shield },
  { id: 'recommendations', label: 'Recommendations', icon: Star },
  { id: 'sources', label: 'Sources', icon: FileText },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'curriculum': return <CurriculumComparison />;
      case 'cost': return <CostAnalysis />;
      case 'coops': return <CoopPrograms />;
      case 'law-esa': return <AZLawESA />;
      case 'recommendations': return <Recommendations />;
      case 'sources': return <Sources />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <nav className="w-56 flex-shrink-0 bg-gray-900/50 border-r border-gray-800 p-4 flex flex-col gap-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 px-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-sm font-bold text-amber-400">85234 Guide</h2>
            <p className="text-[10px] text-gray-500">Gilbert, AZ</p>
          </div>
        </div>
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
              activeSection === id
                ? 'bg-amber-500/20 text-amber-400 font-medium'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {renderSection()}
      </main>
    </div>
  );
}
