import React from 'react';
import { Award, Trophy, Zap, DollarSign, Battery, Feather, Monitor, Cpu, ShoppingCart, ExternalLink } from 'lucide-react';
import { productsWithDerived, BRAND_COLORS } from '../data/products';
import { productDetails } from '../data/productDetails';
import InsightCallout from './InsightCallout';

const awards = [
  { icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-700/30', title: 'Best Overall 2-in-1', id: 'lenovo-yoga-9i-gen10', reason: 'Best balance of display, battery, build, and features. The gold standard.' },
  { icon: Cpu, color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700/30', title: 'Best for AI/ML Development', id: 'asus-proart-px13', reason: 'Only 2-in-1 with a dedicated GPU (RTX 4060). No contest for GPU workloads.' },
  { icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-700/30', title: 'Best Value', id: 'hp-omnibook-x-flip-14', reason: '3K OLED + 32GB RAM + stylus for ~$1,100. Unbeatable price-to-feature ratio.' },
  { icon: Battery, color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700/30', title: 'Best Battery Life', id: 'lenovo-thinkpad-x1-2in1-gen10', reason: '22.5 hours tested. Leave the charger at home for days.' },
  { icon: Feather, color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30', title: 'Best Portability', id: 'microsoft-surface-pro-11', reason: 'Under 2 lbs with the best tablet mode experience.' },
  { icon: Monitor, color: 'text-teal-400', bg: 'bg-teal-900/20', border: 'border-teal-700/30', title: 'Best Big Screen', id: 'lg-gram-pro-2in1-16', reason: '16-inch OLED at only 3 lbs. Physics-defying screen-to-weight ratio.' },
];

const quickDecision = [
  { question: 'I need a dedicated GPU for AI/ML work', answer: 'ASUS ProArt PX13', id: 'asus-proart-px13', price: '$1,900' },
  { question: 'I want the best all-around 2-in-1', answer: 'Lenovo Yoga 9i Gen 10', id: 'lenovo-yoga-9i-gen10', price: '$1,350–1,800' },
  { question: 'I want OLED but don\'t want to overspend', answer: 'HP OmniBook X Flip 14', id: 'hp-omnibook-x-flip-14', price: '$760–1,100' },
  { question: 'Battery life is my #1 priority', answer: 'ThinkPad X1 2-in-1 Gen 10', id: 'lenovo-thinkpad-x1-2in1-gen10', price: '$2,200' },
  { question: 'I want the biggest screen possible', answer: 'LG Gram Pro 2-in-1 16', id: 'lg-gram-pro-2in1-16', price: '$2,400' },
  { question: 'I want the lightest possible device', answer: 'Microsoft Surface Pro 11', id: 'microsoft-surface-pro-11', price: '$1,150–1,400' },
  { question: 'I\'m on a tight budget', answer: 'Dell Inspiron 14 2-in-1', id: 'dell-inspiron-14-2in1-7445', price: '$530–750' },
  { question: 'I type code all day and need the best keyboard', answer: 'ThinkPad X1 2-in-1 Gen 10', id: 'lenovo-thinkpad-x1-2in1-gen10', price: '$2,200' },
];

const Recommendations = ({ onSelectProduct }) => {
  const tiers = [
    {
      label: 'Option A — Best Overall',
      id: 'lenovo-yoga-9i-gen10',
      tagline: 'The safe, excellent choice for 95% of developers',
      color: 'border-amber-500/50',
    },
    {
      label: 'Option B — Best for AI Dev',
      id: 'asus-proart-px13',
      tagline: 'The only choice if you need GPU compute in a 2-in-1',
      color: 'border-red-500/50',
    },
    {
      label: 'Option C — Best Value',
      id: 'hp-omnibook-x-flip-14',
      tagline: 'Premium features at a mid-range price',
      color: 'border-emerald-500/50',
    },
    {
      label: 'Option D — Budget Pick',
      id: 'dell-inspiron-14-2in1-7445',
      tagline: 'Gets the job done without breaking the bank',
      color: 'border-gray-500/50',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Recommendations</h2>
      <p className="text-gray-400 text-sm mb-6">Award winners, quick decision guide, and multi-tier purchase options</p>

      <InsightCallout variant="recommendation" title="For Your Specific Needs">
        Based on your profile (IDE + AI development, web/email, family room tablet use, 13-15 inch preference), here is my recommendation:
        <br /><br />
        <strong>If AI/ML is a serious use case:</strong> Get the <strong>ASUS ProArt PX13</strong> ($1,900). It is the only 2-in-1 with a dedicated GPU.
        Nothing else on this list can run CUDA workloads or train models locally.
        <br /><br />
        <strong>If AI/ML is occasional/cloud-based:</strong> Get the <strong>Lenovo Yoga 9i Gen 10</strong> ($1,350-1,800). Best overall package with
        stunning OLED, 22-hour battery, included stylus, and premium build. Perfect for IDE work, web, email, and tablet mode.
        <br /><br />
        <strong>If budget matters:</strong> The <strong>HP OmniBook X Flip 14</strong> ($760-1,100 on sale) gives you 3K OLED + 32GB RAM + stylus
        at nearly half the price of the premium options. Incredible value.
      </InsightCallout>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {awards.map((a) => {
          const p = productsWithDerived.find(pr => pr.id === a.id);
          if (!p) return null;
          return (
            <div
              key={a.title}
              className={`${a.bg} ${a.border} border rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition-transform`}
              onClick={() => onSelectProduct(a.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <a.icon className={`w-5 h-5 ${a.color}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${a.color}`}>{a.title}</span>
              </div>
              <p className="text-white font-bold text-sm">{p.name}</p>
              <p className="text-emerald-400 text-sm font-semibold">${p.price.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">{a.reason}</p>
            </div>
          );
        })}
      </div>

      <h3 className="text-white font-semibold text-lg mb-3">Quick Decision Guide</h3>
      <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden mb-8">
        {quickDecision.map((q, i) => {
          const p = productsWithDerived.find(pr => pr.id === q.id);
          return (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-gray-800/50' : ''} hover:bg-gray-800/40 cursor-pointer transition-colors`}
              onClick={() => onSelectProduct(q.id)}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{q.question}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{q.answer}</p>
                  <p className="text-emerald-400 text-xs">{q.price}</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p ? BRAND_COLORS[p.brand] : '#6b7280' }} />
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-white font-semibold text-lg mb-3">Multi-Tier Purchase Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {tiers.map((t) => {
          const p = productsWithDerived.find(pr => pr.id === t.id);
          const detail = productDetails[t.id];
          if (!p || !detail) return null;
          const bestPrice = detail.purchaseLinks.reduce((min, l) => l.price < min ? l.price : min, Infinity);
          const bestRetailer = detail.purchaseLinks.find(l => l.price === bestPrice);
          return (
            <div key={t.id} className={`bg-gray-800/40 rounded-xl p-4 border-2 ${t.color}`}>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold mb-1">{t.label}</p>
              <p className="text-white font-bold text-sm mb-0.5">{p.name}</p>
              <p className="text-gray-500 text-xs mb-2">{t.tagline}</p>
              <p className="text-3xl font-bold text-emerald-400 mb-2">${bestPrice.toLocaleString()}</p>
              <div className="space-y-1.5 mb-3">
                <p className="text-gray-400 text-xs">{p.ram}GB RAM &middot; {p.storage >= 1000 ? `${p.storage/1000}TB` : `${p.storage}GB`} SSD</p>
                <p className="text-gray-400 text-xs">{p.displaySize}" {p.displayType} &middot; {p.batteryLifeHrs}hr battery</p>
                <p className="text-gray-400 text-xs">{p.cpu.split(' ').slice(-3).join(' ')}</p>
              </div>
              {bestRetailer && (
                <a
                  href={bestRetailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Buy at {bestRetailer.retailer}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => onSelectProduct(t.id)}
                className="w-full mt-2 py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
              >
                View Full Details
              </button>
            </div>
          );
        })}
      </div>

      <InsightCallout variant="info" title="Sources & Methodology">
        Recommendations based on cross-referencing reviews from PCMag, CNET, TechRadar, Tom's Hardware, NotebookCheck,
        Laptop Mag, WIRED, and XDA Developers, combined with user reviews from Amazon and Best Buy.
        Benchmark data from Geekbench 6, Cinebench R23, and community benchmarks.
        Prices reflect February 2026 street prices and may vary. All models meet the 16GB RAM minimum.
      </InsightCallout>
    </div>
  );
};

export default Recommendations;
