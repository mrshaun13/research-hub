import React from 'react';
import { Award, Trophy, Gem, Heart, Plane, Shield, Star, DollarSign, ExternalLink, MapPin, Building2, Globe } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const awards = [
  {
    title: 'Best Overall Pick',
    icon: Trophy,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    productId: 'bellroy-tokyo-wonder-tote-12l',
    reason: 'Fits 14" laptop in the most compact form factor. Exceptional organization, ultra-light at 1.32 lbs, luggage pass-through, and full zip closure. Perfect proportions for a 160cm frame.',
  },
  {
    title: 'Best Value',
    icon: DollarSign,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    productId: 'moment-everything-tech-tote',
    reason: 'Most features per dollar: 3 carry options, weatherproof, water bottle pockets, 16" laptop fit, lifetime warranty — all for $200 CAD. Only downside: may be too large for petite frames.',
  },
  {
    title: 'Best for Travel',
    icon: Plane,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    productId: 'longchamp-le-pliage-original-l',
    reason: 'Weighs just 0.66 lbs and folds flat. Made in France with iconic design. Fits 14" laptop. The ultimate packable travel tote — pair with a laptop sleeve for protection.',
  },
  {
    title: 'Best Budget Pick',
    icon: Star,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    productId: 'beis-work-tote',
    reason: 'At $118 CAD, it offers zipper closure, water bottle pocket, laptop sleeve for 14", and a polished vegan leather look. Great organization for the price.',
  },
  {
    title: 'Best Versatility',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    productId: 'mz-wallace-metro-tote-deluxe-medium',
    reason: '3 carry options, waterproof quilted nylon, luggage pass-through, Italian leather trim. The "Mary Poppins bag" that fits everything. Premium but worth it.',
  },
  {
    title: 'Japanese Heritage Pick',
    icon: Gem,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    productId: 'porter-yoshida-force-2way',
    reason: 'Handmade in Japan since 1962. Military-spec nylon, 2-way carry, lifetime repair service. A true heritage piece for quality connoisseurs. Import from Japan.',
  },
  {
    title: 'Best Japan Travel Buy',
    icon: Globe,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    productId: 'master-piece-progress-2way',
    reason: 'Factory-direct from Osaka. 3 carry options, laptop sleeve, luggage pass-through, YKK water-repellent zippers, real cow leather. The best value among Japan-exclusive bags at $380 CAD.',
  },
  {
    title: 'Buy It For Life',
    icon: Shield,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    productId: 'filson-rugged-twill-zipper-tote',
    reason: 'Made in Seattle since 1897. Waxed Rugged Twill + Bridle Leather + brass hardware. Lifetime guarantee. This bag will outlast you. Available in Canada.',
  },
];

const quickDecisions = [
  { q: 'Budget under $120 CAD?', a: 'beis-work-tote', note: 'BÉIS Work Tote — $118, zipper, 14" laptop' },
  { q: 'Lightest possible?', a: 'longchamp-le-pliage-original-l', note: 'Longchamp Le Pliage L — 0.66 lbs, folds flat' },
  { q: 'Best all-rounder for 14" laptop?', a: 'bellroy-tokyo-wonder-tote-12l', note: 'Bellroy Wonder Tote 12L — compact, organized, travel-ready' },
  { q: 'Maximum features & carry options?', a: 'moment-everything-tech-tote', note: 'Moment Tech Tote — 3 carry options, weatherproof, lifetime warranty' },
  { q: 'Want a crossbody option?', a: 'mz-wallace-metro-tote-deluxe-medium', note: 'MZ Wallace Metro Tote Deluxe — shoulder, hand, crossbody' },
  { q: 'Japanese craftsmanship?', a: 'porter-yoshida-force-2way', note: 'Porter Yoshida Force 2Way — handmade in Japan, military nylon' },
  { q: 'Buying a bag in Japan?', a: 'master-piece-progress-2way', note: 'Master-Piece Progress 2Way — Osaka factory, 14" laptop, 3 carry options' },
  { q: 'Indestructible MIL-SPEC?', a: 'briefing-fusion-sq-tote-hd', note: 'Briefing Fusion SQ Tote HD — 1690D nylon, made in Japan, $715' },
  { q: 'Heritage American-made?', a: 'filson-rugged-twill-zipper-tote', note: 'Filson Rugged Twill — waxed cotton, Seattle since 1897, lifetime guarantee' },
  { q: 'Italian leather with zipper?', a: 'kaai-midi-pyramid', note: 'Kaai Midi Pyramid — made in Italy, scratch-resistant leather, $490' },
  { q: 'Ultra-light Japan-made?', a: 'tsuchiya-kaban-cordura-2way', note: 'Tsuchiya Kaban CORDURA 2Way — 1.08 lbs, 14" laptop, ships to Canada' },
  { q: 'Leather that develops patina?', a: 'tsuchiya-kaban-diario-2way', note: 'Tsuchiya Kaban Diario — oil-tanned Italian leather, handmade in Japan' },
  { q: 'Cheapest Japan-made?', a: 'harvest-label-vantage-tote', note: 'Harvest Label Vantage — $220, by the creator of Porter Tanker' },
  { q: 'Best waterproof + eco?', a: 'troubadour-apex-everyday-tote', note: 'Troubadour Apex — waterproof everything, recycled, $215, 5-yr guarantee' },
  { q: 'American heirloom leather?', a: 'lotuff-zip-top-medium-tote', note: 'Lotuff Zip-Top — handmade in Providence, full-grain leather, lifetime guarantee' },
  { q: 'Scandinavian minimalism?', a: 'mismo-ms-shopper', note: 'Mismo M/S Shopper — Danish design, Italian waterproof fabric, crossbody' },
  { q: 'Florentine leather under $550?', a: 'gianni-chiarini-dea-zip-tote', note: 'Gianni Chiarini Dea — made in Florence, pebbled leather, $530' },
];

const purchaseTiers = [
  {
    label: 'Premium Pick',
    price: '$215 CAD',
    productId: 'bellroy-tokyo-wonder-tote-12l',
    description: 'The best balance of size, features, and quality for your specific needs.',
  },
  {
    label: 'Best Value',
    price: '$200 CAD',
    productId: 'moment-everything-tech-tote',
    description: 'Most features per dollar. Slightly larger but incredibly versatile.',
  },
  {
    label: 'Budget Smart',
    price: '$118 CAD',
    productId: 'beis-work-tote',
    description: 'Meets all core needs at the lowest price. Stylish vegan leather.',
  },
  {
    label: 'Travel Companion',
    price: '$185 CAD',
    productId: 'longchamp-le-pliage-original-l',
    description: 'The foldable icon. Add a $30 laptop sleeve and you have the lightest setup.',
  },
];

export default function Recommendations() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Recommendations</h2>
        <p className="text-xs text-gray-500 mt-1">Curated picks based on your requirements</p>
      </div>

      <InsightCallout variant="recommendation" title="Bottom Line">
        For a 160cm woman carrying a 14&quot; laptop who wants zipper closure, good organization, and a bag that isn&apos;t too bulky — the <strong>Bellroy Tokyo Wonder Tote 12L ($215 CAD)</strong> is the top recommendation. It checks every box: compact proportions, full zip, 14&quot; laptop sleeve, luggage pass-through, and weighs just 1.32 lbs.
      </InsightCallout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {awards.map(award => {
          const p = products.find(x => x.id === award.productId);
          if (!p) return null;
          return (
            <div key={award.title} className={`${award.bg} border ${award.border} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <award.icon className={`w-4 h-4 ${award.color}`} />
                <span className={`text-xs font-bold ${award.color}`}>{award.title}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                <span className="text-sm font-semibold text-white">{p.name}</span>
                <span className="text-xs text-gray-400 ml-auto">${p.price} CAD</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{award.reason}</p>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {p.madeIn}</span>
                <span className="flex items-center gap-1"><Building2 className="w-2.5 h-2.5" /> {p.companyHQ}</span>
                <span>{p.weight_lbs} lbs</span>
                <span>{p.capacity_L}L</span>
              </div>
              {p.canadaPurchaseUrl && (
                <a href={p.canadaPurchaseUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[10px] ${award.color} hover:opacity-80 mt-2`}>
                  <ExternalLink className="w-3 h-3" /> Buy in Canada
                </a>
              )}
              {!p.availableInCanada && (
                <p className="text-[10px] text-red-400/60 mt-2">Not directly available in Canada — import required</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Quick Decision Guide</h3>
        <div className="space-y-2">
          {quickDecisions.map((qd, i) => {
            const p = products.find(x => x.id === qd.a);
            return (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-800/50 last:border-0">
                <span className="text-xs text-gray-400 min-w-[200px]">{qd.q}</span>
                <span className="text-[10px] text-gray-600">→</span>
                <div className="flex items-center gap-1.5">
                  {p && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />}
                  <span className="text-xs text-teal-400 font-medium">{qd.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Purchase Options by Budget</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {purchaseTiers.map((tier, i) => {
            const p = products.find(x => x.id === tier.productId);
            if (!p) return null;
            return (
              <div key={i} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{tier.label}</span>
                  <span className="text-xs font-bold text-white">{tier.price}</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-1">{p.name}</p>
                <p className="text-[10px] text-gray-500">{tier.description}</p>
                {p.canadaPurchaseUrl && (
                  <a href={p.canadaPurchaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-teal-400 hover:text-teal-300 mt-1.5">
                    <ExternalLink className="w-3 h-3" /> Purchase
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="warning" title="Think Twice">
        The Cuyana System Tote ($480 CAD) is beautiful Italian leather but has NO zipper (snap only), no built-in pockets, and isn&apos;t available in Canada. Each add-on organizer costs $78-$128 extra. Total system cost can exceed $700 CAD. Only consider if aesthetics trump functionality.
      </InsightCallout>
    </div>
  );
}
