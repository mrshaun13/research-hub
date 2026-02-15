import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { skillsRadarData, jobData } from '../data/researchData';
import InsightCallout from './InsightCallout';

const roleOptions = [
  { key: 'ea', label: 'Your EA Skills', color: '#8b5cf6' },
  { key: 'dental', label: 'Dental Receptionist', color: '#22c55e' },
  { key: 'eventPlanner', label: 'Event Planner', color: '#f59e0b' },
  { key: 'officeManager', label: 'Office Manager', color: '#3b82f6' },
  { key: 'projectCoord', label: 'Project Coordinator', color: '#ec4899' },
  { key: 'costco', label: 'Costco Retail', color: '#ef4444' },
  { key: 'va', label: 'Virtual Assistant', color: '#06b6d4' },
];

const skillTransferNarrative = [
  {
    from: 'C-Suite Calendar Management',
    to: ['Event Planner (venue scheduling)', 'Dental Receptionist (patient scheduling)', 'Office Manager (team scheduling)', 'Project Coordinator (timeline management)'],
  },
  {
    from: 'Complex Travel Arrangements',
    to: ['Event Planner (vendor logistics, venue scouting)', 'Virtual Assistant (premium service)', 'Wedding Planner (destination coordination)'],
  },
  {
    from: 'Event Coordination & Catering',
    to: ['Event Planner (this IS the job)', 'Wedding Planner (direct transfer)', 'Nonprofit Coordinator (fundraising events)', 'Hotel Front Desk (event support)'],
  },
  {
    from: 'Budget & Expense Tracking',
    to: ['Bookkeeper (direct transfer)', 'Office Manager (office budget)', 'Event Planner (event budgets)', 'Project Coordinator (project budgets)'],
  },
  {
    from: 'Board Communication & Stakeholder Mgmt',
    to: ['HR Coordinator (employee relations)', 'Nonprofit Coordinator (donor relations)', 'Property Manager (tenant/owner relations)', 'Real Estate Agent (client management)'],
  },
  {
    from: 'Microsoft Office Suite (Expert)',
    to: ['Every single role on this list — this is table stakes everywhere'],
  },
];

export default function Skills() {
  const [activeRoles, setActiveRoles] = useState(['ea', 'eventPlanner', 'dental']);

  const toggleRole = (key) => {
    if (key === 'ea') return; // always show EA baseline
    if (activeRoles.includes(key)) {
      setActiveRoles(activeRoles.filter(r => r !== key));
    } else if (activeRoles.length < 4) {
      setActiveRoles([...activeRoles, key]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Transferable Skills</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          How your 25 years of EA skills map to each career option. The purple shape is your current 
          skill profile — the closer another role's shape matches, the easier the transition.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {roleOptions.map(role => (
          <button
            key={role.key}
            onClick={() => toggleRole(role.key)}
            className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              activeRoles.includes(role.key)
                ? 'bg-white/10 border-white/20 text-white'
                : 'border-gray-700 text-gray-500 hover:text-gray-300'
            } ${role.key === 'ea' ? 'opacity-100 cursor-default' : ''}`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: role.color }} />
            {role.label}
            {role.key === 'ea' && <span className="text-[9px] text-violet-400 ml-1">(baseline)</span>}
          </button>
        ))}
      </div>

      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={skillsRadarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            {roleOptions
              .filter(r => activeRoles.includes(r.key))
              .map(role => (
                <Radar
                  key={role.key}
                  name={role.label}
                  dataKey={role.key}
                  stroke={role.color}
                  fill={role.color}
                  fillOpacity={role.key === 'ea' ? 0.15 : 0.08}
                  strokeWidth={role.key === 'ea' ? 2.5 : 1.5}
                  strokeDasharray={role.key === 'ea' ? '' : '4 2'}
                />
              ))}
            <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 text-center mt-1">
          Solid purple = your current EA skills. Dashed lines = skill requirements for each role. Overlap = easy transfer.
        </p>
      </div>

      <InsightCallout color="purple" title="The Skill Match Story">
        Event Planner (90% match) and Virtual Assistant (95% match) are essentially your current job 
        repackaged. Office Manager (85%) and Project Coordinator (80%) are close behind. Even Dental 
        Receptionist (65%) uses your scheduling and people skills heavily — the gap is mainly dental-specific 
        software, which takes 2-4 weeks to learn.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Skill Transfer Map</h2>
        <p className="text-xs text-gray-500 mb-3">How each of your core EA skills translates to new roles:</p>
        <div className="space-y-3">
          {skillTransferNarrative.map((item, i) => (
            <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3">
              <p className="text-sm font-medium text-violet-300 mb-1.5">{item.from}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.to.map((target, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                    → {target}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Skill Match Rankings</h2>
        <div className="space-y-1.5">
          {jobData
            .sort((a, b) => b.skillMatch - a.skillMatch)
            .map(job => (
              <div key={job.id} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-36 truncate">{job.title}</span>
                <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${job.skillMatch}%`,
                      background: `linear-gradient(to right, #8b5cf6, ${job.skillMatch > 80 ? '#22c55e' : job.skillMatch > 60 ? '#eab308' : '#ef4444'})`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-white w-10 text-right">{job.skillMatch}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
