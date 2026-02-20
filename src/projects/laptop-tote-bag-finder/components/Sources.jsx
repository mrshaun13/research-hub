import React from 'react';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';

const sources = [
  { name: 'Wirecutter (NYT)', url: 'https://www.nytimes.com/wirecutter/reviews/best-laptop-tote-bags/', type: 'Expert Review', notes: 'Hands-on testing of 30+ tote bags, multi-panelist evaluation' },
  { name: 'WIRED', url: 'https://www.wired.com/gallery/best-laptop-totes-and-purses/', type: 'Expert Review', notes: 'Tested and reviewed by WIRED editors, focus on tech-friendly features' },
  { name: 'Forbes Personal Shopper', url: 'https://www.forbes.com/sites/forbes-personal-shopper/article/bellroy-tokyo-tote-second-edition-review/', type: 'Expert Review', notes: 'Detailed Bellroy Tokyo Tote review with specs and daily use testing' },
  { name: 'Pack Hacker', url: 'https://www.packhacker.com/', type: 'Expert Review', notes: 'In-depth travel gear reviews with standardized scoring methodology' },
  { name: 'Business Insider', url: 'https://www.businessinsider.com/guides/style/dagne-dover-allyn-tote-review', type: 'Expert Review', notes: 'Dagne Dover and work bag reviews with long-term testing' },
  { name: 'whatveewore', url: 'https://whatveewore.com/2024/02/19/bellroy-tokyo-wonder-tote-review/', type: 'User Review', notes: 'Detailed Bellroy Wonder Tote sizing and wear review from a petite woman' },
  { name: 'Reddit r/handbags', url: 'https://www.reddit.com/r/handbags/', type: 'Community', notes: 'Real-world user experiences, sizing discussions, durability reports' },
  { name: 'Reddit r/ManyBaggers', url: 'https://www.reddit.com/r/ManyBaggers/', type: 'Community', notes: 'Bag enthusiast community with detailed comparisons and reviews' },
  { name: 'Bellroy', url: 'https://bellroy.com/products/tokyo-wonder-tote-15l', type: 'Manufacturer', notes: 'Official specs, dimensions, materials, and warranty information' },
  { name: 'Lo & Sons', url: 'https://www.loandsons.com/', type: 'Manufacturer', notes: 'Official product details and sizing information' },
  { name: 'BÉIS Travel', url: 'https://ca.beistravel.com/', type: 'Manufacturer', notes: 'Canadian site with CAD pricing and product specs' },
  { name: 'Yoshida & Co.', url: 'https://www.yoshidakaban.com/en/', type: 'Manufacturer', notes: 'Official Porter Yoshida product catalog and heritage information' },
  { name: 'Longchamp', url: 'https://www.longchamp.com/ca/en/', type: 'Manufacturer', notes: 'Canadian site with official Le Pliage specs and pricing' },
  { name: 'MZ Wallace', url: 'https://www.mzwallace.com/', type: 'Manufacturer', notes: 'Official Metro Tote specs and materials information' },
  { name: 'Moment', url: 'https://www.shopmoment.com/products/mtw-tote', type: 'Manufacturer', notes: 'Official Everything Tech Tote specs and features' },
  { name: 'Master-Piece', url: 'https://shop.mspc.jp/en/', type: 'Manufacturer', notes: 'Official Japanese site — Progress 2Way tote specs, Osaka factory info' },
  { name: 'Briefing', url: 'https://www.briefing-us.com/', type: 'Manufacturer', notes: 'Official site — Fusion SQ Tote HD specs, MIL-SPEC heritage, made in Japan' },
  { name: 'Filson', url: 'https://www.filson.com/collections/tote-bags', type: 'Manufacturer', notes: 'Official site — Rugged Twill Zipper Tote specs, made in USA since 1897' },
  { name: 'Kaai', url: 'https://kaaibags.com/', type: 'Manufacturer', notes: 'Official North America site — Midi Pyramid specs, Italian leather, Belgian design' },
  { name: 'Carryology', url: 'https://www.carryology.com/liking/buyersguide/best-japanese-brands/', type: 'Expert Review', notes: 'In-depth coverage of Japanese bag brands including Porter, Master-Piece, Briefing' },
  { name: 'MR PORTER', url: 'https://www.mrporter.com/en-us/mens/designer/master-piece', type: 'Retailer', notes: 'Master-Piece brand profile and product details' },
  { name: 'Condé Nast Traveler', url: 'https://www.cntraveler.com/story/best-tote-bags', type: 'Expert Review', notes: 'Kaai Midi Pyramid recommendation and travel tote roundup' },
  { name: 'Tsuchiya Kaban', url: 'https://tsuchiya-kaban.com/', type: 'Manufacturer', notes: 'Japanese leather goods since 1965 — CORDURA 2Way and Diario tote specs, handcrafted in Japan' },
  { name: 'Harvest Label', url: 'https://en.harvestlabel.jp/', type: 'Manufacturer', notes: 'Founded by Koichi Yamaguchi (creator of Porter Tanker) — Vantage Tote specs, made in Japan' },
  { name: 'Troubadour', url: 'https://www.troubadourgoods.com/', type: 'Manufacturer', notes: 'UK-designed Apex Everyday Tote — waterproof FortiWeave, 5-year guarantee + lifetime repairs' },
  { name: 'Ghurka', url: 'https://ghurka.com/', type: 'Manufacturer', notes: 'American luxury leather goods since 1975 — Market Tote No. 294, handcrafted in Connecticut' },
  { name: 'Lotuff Leather', url: 'https://lotuffleather.com/', type: 'Manufacturer', notes: 'Handmade in Providence, RI — Zip-Top Medium Tote, full-grain vegetable-tanned leather' },
  { name: 'Gianni Chiarini', url: 'https://www.giannichiarini.com/en/', type: 'Manufacturer', notes: 'Florentine bag maker since 1999 — Dea Zip Tote, made in Italy' },
  { name: 'Mismo', url: 'https://www.mismo.dk/', type: 'Manufacturer', notes: 'Danish design, Italian fabrics — M/S Shopper specs, waterproof technical weave' },
  { name: 'Half Half Travel', url: 'https://www.halfhalftravel.com/', type: 'User Review', notes: 'Detailed Troubadour Apex Everyday Tote review with travel testing' },
  { name: 'Surface Magazine', url: 'https://www.surfacemag.com/', type: 'Expert Review', notes: 'Ghurka factory visit and craftsmanship deep dive' },
];

export default function Sources() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-lg font-bold text-white">Sources &amp; Methodology</h2>
        <p className="text-xs text-gray-500 mt-1">How this research was conducted</p>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">Methodology</h3>
        <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
          <p>This comparison was built by cross-referencing expert reviews (Wirecutter, WIRED, Forbes, Pack Hacker, Carryology), manufacturer specifications, retailer listings, and community feedback (Reddit). All prices are in CAD and were checked in February 2026.</p>
          <p><strong className="text-gray-300">Product selection criteria:</strong> Tote bags with laptop compatibility (13-16&quot;), available from reputable brands, with a focus on bags suitable for a petite (160cm) woman. 25 bags across 22 brands were shortlisted from an initial pool of 50+. Includes Japan-exclusive bags (buy when you travel) and artisan-origin bags not made in major factories.</p>
          <p><strong className="text-gray-300">Feature scoring:</strong> Each bag receives 1 point for each of 9 boolean features (zipper, laptop sleeve, water bottle pocket, luggage pass-through, crossbody strap, key clip, shoe compartment, water resistance). Maximum score: 9.</p>
          <p><strong className="text-gray-300">Quality scoring:</strong> Each bag is rated 1-10 for build quality based on materials, construction method, brand heritage, warranty, and expected lifespan. Artisan/heritage bags (Japan, USA, France, Italy) score highest.</p>
          <p><strong className="text-gray-300">Manufacturing tiers:</strong> Bags are classified as Mass Factory (China/Vietnam/India), Quality Overseas (premium QC in developing countries), or Artisan/Heritage (Japan, USA, France, Italy — small-batch or own-factory production).</p>
          <p><strong className="text-gray-300">Use case ratings:</strong> Each bag is rated 1-5 for three scenarios (daily commute, travel, work/meetings) based on expert reviews, feature set, and community feedback.</p>
          <p><strong className="text-gray-300">Availability:</strong> Canada and Japan availability verified through manufacturer websites and retailers. Japan-exclusive bags are flagged as travel purchases.</p>
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5 border-b border-gray-800/50 last:border-0">
              <BookOpen className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1">
                    {s.name} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                    s.type === 'Expert Review' ? 'bg-blue-500/10 text-blue-400' :
                    s.type === 'Community' ? 'bg-violet-500/10 text-violet-400' :
                    'bg-gray-700/50 text-gray-400'
                  }`}>{s.type}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-300 mb-1">Disclaimers</p>
            <ul className="text-[11px] text-amber-300/70 space-y-1 leading-relaxed">
              <li>Prices are approximate and may vary. All prices shown in CAD (converted from USD where applicable at ~1.35 exchange rate).</li>
              <li>Product availability and specifications may change. Always verify on the manufacturer or retailer website before purchasing.</li>
              <li>Feature scores and use case ratings are editorial assessments based on available data, not standardized lab tests.</li>
              <li>This research is not sponsored. No affiliate links are used.</li>
              <li>The Porter Yoshida bag is included as a Japanese premium alternative per the user&apos;s request, despite not being available in Canada.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
