import React from 'react';
import { MapPin, BookOpen, Users, DollarSign, GraduationCap, Shield, Sparkles } from 'lucide-react';
import { curricula, coopPrograms, azLawSummary } from '../data/researchData';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-start gap-3">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-100">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const InsightCallout = ({ color, children }) => (
  <div className={`rounded-xl border px-4 py-3 text-sm ${color}`}>
    <div className="flex items-start gap-2">
      <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  </div>
);

export default function Overview() {
  const freeCount = curricula.filter(c => c.costPerYear.high === 0).length;
  const accreditedCount = curricula.filter(c => c.accredited).length;
  const secularCount = curricula.filter(c => c.worldview === 'Secular' || c.worldview === 'Secular (Public School)').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400">Homeschool Curriculum & Co-op Guide</h1>
        <p className="text-gray-400 mt-1">
          For an advanced learner in <span className="text-amber-300 font-medium">Gilbert, AZ (85234)</span> — grade acceleration, parent-chosen curriculum
        </p>
      </div>

      <InsightCallout color="bg-amber-500/10 border-amber-500/30 text-amber-200">
        <strong>Arizona is one of the best states for homeschooling.</strong> No testing requirements, no reporting, 
        no teacher qualifications needed — plus the ESA program provides <strong>$7,000–$8,000/year</strong> per student 
        that can be used for curriculum, tutoring, and enrichment. Your child can accelerate freely with zero bureaucratic friction.
      </InsightCallout>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Curricula Compared" value={curricula.length} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon={Users} label="Co-ops Near 85234" value={coopPrograms.length} color="bg-emerald-500/20 text-emerald-400" />
        <StatCard icon={DollarSign} label="ESA Award (avg)" value="~$7,700" color="bg-amber-500/20 text-amber-400" />
        <StatCard icon={Shield} label="Required Subjects" value={azLawSummary.requiredSubjects.length} color="bg-violet-500/20 text-violet-400" />
      </div>

      {/* What This Guide Covers */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-lg font-semibold text-gray-100 mb-3">What This Guide Covers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">{curricula.length} Curricula Compared</p>
              <p className="text-gray-500">All-in-one packages, single subjects, free & paid options</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">{coopPrograms.length} Co-op Programs</p>
              <p className="text-gray-500">Christian, secular, classical — all within 10 mi of 85234</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">Cost Analysis & ESA Funding</p>
              <p className="text-gray-500">Side-by-side cost comparison with ESA coverage scenarios</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-200 font-medium">Arizona Law & Compliance</p>
              <p className="text-gray-500">Affidavit requirements, ESA rules, public school re-entry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Learner Focus */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Advanced Learner Focus
        </h2>
        <p className="text-sm text-gray-400 mb-3">
          Every curriculum and co-op in this guide is rated on how well it supports <strong className="text-gray-200">grade acceleration</strong> and <strong className="text-gray-200">advanced learners</strong>. Key factors:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {[
            { label: "Self-Pacing", desc: "Can the child move faster than grade level?" },
            { label: "Advanced-Friendliness", desc: "Does it support working above grade level?" },
            { label: "Rigor", desc: "Is the content challenging enough for gifted learners?" },
            { label: "Parent Involvement", desc: "How much daily teaching is required from the parent?" },
          ].map(item => (
            <div key={item.label} className="bg-gray-800/50 rounded-lg px-3 py-2">
              <p className="text-amber-300 font-medium">{item.label}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Snapshot */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <h2 className="text-lg font-semibold text-gray-100 mb-3">Quick Snapshot</h2>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-3xl font-bold text-blue-400">{freeCount}</p>
            <p className="text-gray-500">Free Options</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">{accreditedCount}</p>
            <p className="text-gray-500">Accredited</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-violet-400">{secularCount}</p>
            <p className="text-gray-500">Secular</p>
          </div>
        </div>
      </div>
    </div>
  );
}
