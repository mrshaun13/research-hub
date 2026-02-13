import React, { useState } from 'react';
import {
  Sparkles, Layers, Settings, Puzzle, LayoutDashboard, BarChart3,
  Shield, BookOpen, ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import Overview from './components/Overview';
import PipelineDeepDive from './components/PipelineDeepDive';
import ConfigArchitecture from './components/ConfigArchitecture';
import ExtensionSystem from './components/ExtensionSystem';
import HubArchitecture from './components/HubArchitecture';
import TelemetrySystem from './components/TelemetrySystem';
import VisibilityAndSync from './components/VisibilityAndSync';
import Sources from './components/Sources';

const SECTIONS = [
  { id: 'overview', label: 'Skill Overview', icon: Sparkles, component: Overview },
  { id: 'pipeline', label: 'Pipeline Deep Dive', icon: Layers, component: PipelineDeepDive },
  { id: 'config', label: 'Config Architecture', icon: Settings, component: ConfigArchitecture },
  { id: 'extensions', label: 'Extension System', icon: Puzzle, component: ExtensionSystem },
  { id: 'hub', label: 'Hub Architecture', icon: LayoutDashboard, component: HubArchitecture },
  { id: 'telemetry', label: 'Telemetry & Metrics', icon: BarChart3, component: TelemetrySystem },
  { id: 'visibility', label: 'Visibility & Sync', icon: Shield, component: VisibilityAndSync },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

const ACCENT = {
  bg: 'bg-violet-500/10',
  text: 'text-violet-400',
  border: 'border-violet-500',
  ring: 'ring-violet-500/20',
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800/90 backdrop-blur p-2 rounded-lg border border-gray-700 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-64' : 'w-14'}
          fixed lg:static inset-y-0 left-0 z-40
          bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          flex flex-col transition-all duration-300 flex-shrink-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white tracking-tight truncate">Skill Architecture v7</h1>
                <p className="text-[10px] text-gray-500 truncate">Research Visualizer Deep Dive</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  isActive
                    ? `${ACCENT.bg} ${ACCENT.text}`
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
                title={section.label}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? ACCENT.text : 'text-gray-500 group-hover:text-gray-400'}`} />
                {sidebarOpen && (
                  <span className="truncate font-medium text-[13px]">{section.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-3 border-t border-gray-800 text-gray-500 hover:text-gray-300 transition-colors items-center justify-center flex-shrink-0"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
