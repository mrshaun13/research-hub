import React from 'react';
import InsightCallout from '../../../components/InsightCallout';
import { GlossaryTerm } from '../../../components/GlossaryTerm';
import { keyFindings } from '../data/micData';
import glossaryTerms from '../data/glossaryTerms';

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">USB Desktop Microphone Finder</h2>
        <p className="text-gray-300 text-lg mb-4">
          9 plug-and-play USB mics across 4 price tiers — researched and verified for WebEx calls, voice recording, and streaming.
          All prices sourced from official retailer sites as of March 2026. No fabrications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-indigo-400">9</div>
            <div className="text-gray-300 text-sm mt-1">Mics Compared</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-indigo-400">6</div>
            <div className="text-gray-300 text-sm mt-1">Brands Covered</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-indigo-400">$49–$389</div>
            <div className="text-gray-300 text-sm mt-1">Price Range</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Condenser vs. Dynamic — Which Is Better for You?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4 border border-indigo-500/40">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎙️</span>
              <GlossaryTerm term="condenser" glossary={glossaryTerms}><span className="font-bold text-indigo-300 text-lg">Condenser</span></GlossaryTerm>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Highly sensitive capsule — captures a wide, detailed sound. Great for treated rooms, music recording,
              and crystal-clear voice. BUT: picks up everything — room echo, HVAC hum, keyboard clicks, background noise.
            </p>
            <div className="text-sm space-y-1">
              <div className="text-green-400">✓ Wider frequency range, airier sound</div>
              <div className="text-green-400">✓ Better for music and detailed recording</div>
              <div className="text-red-400">✗ Picks up room noise in untreated spaces</div>
              <div className="text-red-400">✗ Less forgiving in a home office</div>
            </div>
            <div className="mt-3 text-gray-400 text-xs">Examples here: HyperX SoloCast 2, Blue Yeti, Sennheiser Profile, Joby Wavo POD, Apogee HypeMiC</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 border border-emerald-500/40">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎤</span>
              <GlossaryTerm term="dynamic" glossary={glossaryTerms}><span className="font-bold text-emerald-300 text-lg">Dynamic</span></GlossaryTerm>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Less sensitive, more directional — captures what's directly in front of it and rejects everything else.
              The standard for broadcast and podcasting. Far more forgiving in a typical home office or living room.
            </p>
            <div className="text-sm space-y-1">
              <div className="text-green-400">✓ Natural noise rejection — ignores keyboard, fans, room echo</div>
              <div className="text-green-400">✓ Ideal for WebEx/video calls and podcasting</div>
              <div className="text-red-400">✗ Slightly less "airy" or detailed at the top end</div>
              <div className="text-red-400">✗ Usually heavier</div>
            </div>
            <div className="mt-3 text-gray-400 text-xs">Examples here: Fifine AM8, Rode PodMic USB, Shure MV7+, Shure MV7i</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyFindings.map((finding, i) => (
          <InsightCallout key={i} color={finding.color}>
            <strong>{finding.title}:</strong> {finding.body}
          </InsightCallout>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-3">How to Use This Dashboard</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex gap-2"><span className="text-indigo-400 font-bold">Comparison Table</span><span>— All 9 mics side by side. Sort by price, rating, or features.</span></li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold">Value Scatter</span><span>— Price vs. quality chart to spot the sweet-spot deals.</span></li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold">Feature Matrix</span><span>— Which mic has which features at a glance.</span></li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold">Use Case Fit</span><span>— Scored per mic for WebEx, recording, streaming, and portability.</span></li>
          <li className="flex gap-2"><span className="text-indigo-400 font-bold">Recommendations</span><span>— 4 tiers with a verdict and buy link for each.</span></li>
        </ul>
      </div>
    </div>
  );
}
