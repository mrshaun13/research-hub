import React from 'react';
import { ExternalLink, Shield, BookOpen, Globe, Building2, FileText } from 'lucide-react';
import { sources } from '../data/researchData';
import InsightCallout from './InsightCallout';

const tierColors = {
  T1: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Primary' },
  T2: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Secondary' },
  T3: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Supplementary' },
  T4: { bg: 'bg-gray-700/50', text: 'text-gray-400', label: 'Estimate' },
};

const typeIcons = {
  'Organization': Shield,
  'Legal Resource': FileText,
  'State Law': FileText,
  'Government': Building2,
  'Research': BookOpen,
  'Review Site': BookOpen,
  'Directory': Globe,
  'Co-op': Globe,
  'Vendor': Building2,
  'Vendor/Co-op': Building2,
  'Platform': Globe,
  'Guide': BookOpen,
  'Public School': Building2,
  'Retailer': Building2,
};

export default function Sources() {
  const t1Sources = sources.filter(s => s.tier === 'T1');
  const t2Sources = sources.filter(s => s.tier === 'T2');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Sources & Methodology</h1>
        <p className="text-gray-400 text-sm mt-1">{sources.length} sources consulted across government, educational, and vendor resources</p>
      </div>

      <InsightCallout color="blue">
        All data in this guide was gathered from official state sources, established homeschool organizations, 
        and vendor websites. Cost estimates reflect 2025-2026 pricing. Co-op costs are approximate and vary by 
        semester, family size, and class selections.
      </InsightCallout>

      {/* Methodology */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">Methodology</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p><strong className="text-gray-300">Curriculum Selection:</strong> 13 curricula were selected based on popularity among Arizona homeschool families, availability of advanced/acceleration options, and representation across worldviews (Christian, secular) and formats (print, digital, hybrid).</p>
          <p><strong className="text-gray-300">Co-op Selection:</strong> 7 programs were identified within a 10-mile radius of zip code 85234 (Gilbert, AZ) using AFHE's directory, TheHomeSchoolMom, and HomeschoolingInArizona.com.</p>
          <p><strong className="text-gray-300">Rating System:</strong> Each curriculum was rated 1-5 on four dimensions: Advanced-Friendliness, Self-Pacing, Rigor, and Parent Involvement. Ratings are based on vendor documentation, parent reviews, and expert analysis from Cathy Duffy Reviews and the Davidson Institute.</p>
          <p><strong className="text-gray-300">Cost Data:</strong> Ranges reflect 2025-2026 pricing from vendor websites. Low estimates assume minimal purchases; high estimates assume full packages with all options. ESA award amount ($7,000-$8,000) is from the Arizona Department of Education.</p>
          <p><strong className="text-gray-300">Limitations:</strong> Co-op costs are estimates based on publicly available information and may vary. Some co-ops require membership applications. ESA rules and funding amounts may change year to year.</p>
        </div>
      </div>

      {/* Data Quality */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">Data Quality Tiers</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(tierColors).map(([tier, colors]) => (
            <div key={tier} className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.bg} ${colors.text}`}>
                {tier}
              </span>
              <span className="text-sm text-gray-400">{colors.label}</span>
              <span className="text-xs text-gray-600">
                ({sources.filter(s => s.tier === tier).length} sources)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Sources */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">
          Primary Sources ({t1Sources.length})
        </h3>
        <div className="space-y-2">
          {t1Sources.map(s => {
            const Icon = typeIcons[s.type] || Globe;
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-200 group-hover:text-emerald-300 transition-colors">{s.title}</p>
                  <p className="text-xs text-gray-600">{s.type}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0 mt-0.5" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Secondary Sources */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h3 className="text-base font-semibold text-gray-100 mb-3">
          Secondary Sources ({t2Sources.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {t2Sources.map(s => {
            const Icon = typeIcons[s.type] || Globe;
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group text-sm"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-blue-300 transition-colors truncate">{s.title}</span>
                <ExternalLink className="w-3 h-3 text-gray-700 group-hover:text-gray-500 flex-shrink-0 ml-auto" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-800/30 rounded-xl border border-gray-800/50 p-4 text-xs text-gray-500">
        <p><strong className="text-gray-400">Disclaimer:</strong> This guide is for informational purposes only and does not constitute legal or educational advice. 
        Homeschool laws and ESA program details may change. Always verify current requirements with the Arizona Department of Education 
        and consult AFHE or HSLDA for the latest legal guidance. Curriculum ratings reflect the author's assessment based on available 
        information and may differ from individual family experiences.</p>
      </div>
    </div>
  );
}
