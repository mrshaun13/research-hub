import React, { useState } from 'react';
import { Laptop, BarChart3, Cpu, Layers, Grid3X3, Award, ChevronRight } from 'lucide-react';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import Performance from './components/Performance';
import UseCaseFit from './components/UseCaseFit';
import FeaturesMatrix from './components/FeaturesMatrix';
import Recommendations from './components/Recommendations';
import ProductDetail from './components/ProductDetail';

const sections = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'comparison', label: 'Spec Comparison', icon: Layers },
  { id: 'performance', label: 'Performance', icon: Cpu },
  { id: 'usecase', label: 'Use Case Fit', icon: Grid3X3 },
  { id: 'features', label: 'Features Matrix', icon: Grid3X3 },
  { id: 'recommendations', label: 'Recommendations', icon: Award },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  const renderSection = () => {
    if (selectedProduct) {
      return <ProductDetail productId={selectedProduct} onBack={handleBackFromProduct} />;
    }
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'comparison': return <ComparisonTable onSelectProduct={handleSelectProduct} />;
      case 'performance': return <Performance />;
      case 'usecase': return <UseCaseFit />;
      case 'features': return <FeaturesMatrix />;
      case 'recommendations': return <Recommendations onSelectProduct={handleSelectProduct} />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-full bg-gray-950 text-gray-100">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">2-in-1 Convertible Laptop Finder</h1>
              <p className="text-gray-500 text-xs">12 models compared &middot; 7 brands &middot; $750–$2,400 &middot; Feb 2026</p>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1 -mb-px">
            {sections.map(s => {
              const Icon = s.icon;
              const isActive = !selectedProduct && activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { setSelectedProduct(null); setActiveSection(s.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-teal-600/20 text-teal-400 border border-teal-600/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
            {selectedProduct && (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600/20 text-purple-400 border border-purple-600/30">
                <ChevronRight className="w-3 h-3" />
                Product Detail
              </span>
            )}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderSection()}
      </main>

      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-gray-600 text-xs">
            Research compiled February 2026 &middot; Sources: PCMag, CNET, TechRadar, Tom's Hardware, NotebookCheck, Laptop Mag, WIRED, XDA Developers, UserBenchmark
          </p>
          <p className="text-gray-700 text-xs mt-1">
            Prices and availability subject to change. All models meet 16GB RAM minimum.
          </p>
        </div>
      </footer>
    </div>
  );
}
