import React from 'react';
import { MapPin, Briefcase, Clock, TrendingUp, DollarSign, Heart } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { userProfile, costOfLiving, jobData, stressTiers } from '../data/researchData';

const stats = [
  { label: 'Your Experience', value: '25+ yrs', sub: 'Executive Assistant / Admin', icon: Briefcase, color: 'text-violet-400' },
  { label: 'Location', value: 'Hendersonville', sub: 'Nashville Metro (#2 job growth)', icon: MapPin, color: 'text-emerald-400' },
  { label: 'Jobs Researched', value: '18', sub: 'across 4 stress tiers', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Salary Range', value: '$28K–$144K', sub: 'library assistant → real estate', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Comfort Threshold', value: '$48K/yr', sub: 'comfortable living in Hendersonville', icon: Heart, color: 'text-pink-400' },
  { label: 'No State Income Tax', value: 'TN', sub: 'your paycheck goes further', icon: Clock, color: 'text-cyan-400' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Career Pivot Explorer
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          A personalized analysis of realistic career options for a 25-year Executive Assistant veteran 
          in Hendersonville, TN — ranging from low-stress "clock out and forget it" roles to leveraged 
          professional pivots that use your superpowers in new ways.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{stat.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <InsightCallout color="purple">
        You're not starting over — you're redirecting 25 years of professional skills. The Nashville metro 
        is the #2 US market for job growth, Tennessee has no state income tax, and Hendersonville's cost of 
        living is 5% below the national average. The math is in your favor.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Four Tiers of Career Options</h2>
        <div className="space-y-2">
          {stressTiers.map((tier) => {
            const tierJobs = jobData.filter(j => j.tier === tier.id);
            const salaryRange = `$${Math.min(...tierJobs.map(j => j.salaryLow)).toLocaleString()} – $${Math.max(...tierJobs.map(j => j.salaryHigh)).toLocaleString()}`;
            return (
              <div key={tier.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: tier.color }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{tier.label}</p>
                    <span className="text-[10px] text-gray-500 font-mono">{salaryRange}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{tier.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {tierJobs.map((job) => (
                      <span key={job.id} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{job.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Your Skill Arsenal</h2>
        <div className="flex flex-wrap gap-1.5">
          {userProfile.coreSkills.map((skill) => (
            <span key={skill} className="text-[11px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
              {skill}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Based on LinkedIn profile analysis — {userProfile.recentEmployers.join(', ')}
        </p>
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-2">The Money Math</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-red-400">${(costOfLiving.monthlyBudgetEstimate.annualMinimum / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 uppercase">Minimum Annual</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-400">${(costOfLiving.monthlyBudgetEstimate.comfortableAnnual / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 uppercase">Comfortable</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">${(costOfLiving.medianHouseholdIncome / 1000).toFixed(1)}K</p>
            <p className="text-[10px] text-gray-500 uppercase">Area Median</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cyan-400">{costOfLiving.colIndex}</p>
            <p className="text-[10px] text-gray-500 uppercase">COL Index (100=avg)</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          Monthly estimate: ${costOfLiving.monthlyBudgetEstimate.total.toLocaleString()}/mo 
          (housing ${costOfLiving.monthlyBudgetEstimate.housing}, groceries ${costOfLiving.monthlyBudgetEstimate.groceries}, 
          transport ${costOfLiving.monthlyBudgetEstimate.transportation}, insurance ${costOfLiving.monthlyBudgetEstimate.insurance}, misc ${costOfLiving.monthlyBudgetEstimate.misc})
        </p>
      </div>
    </div>
  );
}
