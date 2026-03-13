import React, { useState } from 'react';
import { mics, tiers } from '../data/micData';
import InsightCallout from '../../../components/InsightCallout';
import { GlossaryTerm } from '../../../components/GlossaryTerm';
import glossaryTerms from '../data/glossaryTerms';

const picks = [
  {
    tier: "budget",
    title: "Best Budget Pick",
    range: "~$50",
    micId: "hyperx-solocast-2",
    altMicId: "fifine-am8",
    recommendation: "If you mostly do WebEx/voice calls and want zero fuss, start here. The SoloCast 2 has a built-in pop filter, shock mount, 24-bit audio, and tap-to-mute — everything you need, nothing you don't. If your office is noisy (fans, keyboard, background chatter), get the Fifine AM8 instead — its dynamic capsule rejects background noise naturally.",
    icon: "💚",
    color: "emerald",
    borderColor: "border-emerald-500/40",
    headerBg: "bg-emerald-900/30",
  },
  {
    tier: "mid",
    title: "Best Mid-Range Pick",
    range: "$99–$139",
    micId: "sennheiser-profile",
    altMicId: "joby-wavo-pod",
    recommendation: "The Sennheiser Profile at $139 is the standout here — premium condenser capsule with a broadcast-quality pedigree, 3 onboard controls, metal build, and dead-simple USB-C plug-in. If portability is a priority (moving between laptop/desktop), the Joby Wavo POD at $99 is lighter, smaller, and has two polar patterns including omni for conference-room use.",
    icon: "💙",
    color: "indigo",
    borderColor: "border-indigo-500/40",
    headerBg: "bg-indigo-900/30",
  },
  {
    tier: "upper-mid",
    title: "Best Upper-Mid Pick",
    range: "$190–$280",
    micId: "rode-podmic-usb",
    altMicId: "shure-mv7plus",
    recommendation: "The Rode PodMic USB at ~$194 (on sale) delivers broadcast-grade audio with APHEX DSP and Rode's Revolution Preamp — this is what radio presenters use. If you also stream or record podcasts seriously, the Shure MV7+ at $279 adds auto-level mode, real-time denoiser, and an LED touch panel. Note: neither includes a stand — budget $30–50 extra for a boom arm.",
    icon: "🟡",
    color: "amber",
    borderColor: "border-amber-500/40",
    headerBg: "bg-amber-900/30",
  },
  {
    tier: "premium",
    title: "Premium / Specialist Pick",
    range: "$349–$389",
    micId: "apogee-hypemic",
    altMicId: "shure-mv7i",
    recommendation: "For most WebEx users, this tier is overkill. The Apogee HypeMiC is the only USB mic with analog hardware compression — a genuine differentiator for voice talent and audiobook narrators. The Shure MV7i adds a second analog input over the MV7+ for two-person recording. Only upgrade here if you know you need these specific capabilities.",
    icon: "🔴",
    color: "rose",
    borderColor: "border-red-500/40",
    headerBg: "bg-red-900/30",
  }
];

export default function Recommendations() {
  const [expanded, setExpanded] = useState('budget');

  return (
    <div className="space-y-6">
      <InsightCallout color="indigo">
        <strong>Our top recommendation for your use case (WebEx calls + plug-and-play + portable):</strong>{' '}
        The <strong>Fifine AM8 ($54.99)</strong> for noisy offices, or the <strong>HyperX SoloCast 2 ($49.99)</strong> for quiet offices.
        Both are 24-bit, plug-and-play, USB-C, and will make a dramatic difference over any built-in laptop mic.
        If you want to step up and have a bit more budget, the <strong>Sennheiser Profile ($139)</strong> is the clear next tier.
      </InsightCallout>

      <div className="space-y-4">
        {picks.map(pick => {
          const mic = mics.find(m => m.id === pick.micId);
          const alt = mics.find(m => m.id === pick.altMicId);
          const isOpen = expanded === pick.tier;

          return (
            <div key={pick.tier} className={`bg-gray-800 rounded-xl border ${pick.borderColor} overflow-hidden`}>
              <button
                className={`w-full text-left px-6 py-4 ${pick.headerBg} flex items-center justify-between`}
                onClick={() => setExpanded(isOpen ? null : pick.tier)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pick.icon}</span>
                  <div>
                    <div className="font-bold text-white text-lg">{pick.title}</div>
                    <div className="text-gray-400 text-sm">{pick.range} · {tiers.find(t => t.id === pick.tier)?.description}</div>
                  </div>
                </div>
                <span className="text-gray-400 text-lg">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Primary Pick</div>
                      <div className="text-xl font-bold text-white">{mic?.name}</div>
                      <div className="text-2xl font-bold text-green-400 mt-1">${mic?.price.toFixed(2)}</div>
                      {mic?.price < mic?.msrp && (
                        <div className="text-xs text-gray-500">MSRP: ${mic?.msrp.toFixed(2)}</div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-400">★ {mic?.rating}</span>
                        <span className="text-gray-400 text-sm">({mic?.reviewCount} reviews)</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <a href={mic?.amazonUrl} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-sm font-semibold transition-colors">
                          Buy on Amazon →
                        </a>
                        <a href={mic?.officialUrl} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-gray-200 rounded text-sm transition-colors">
                          Official Site →
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/40">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Alternative</div>
                      <div className="text-lg font-bold text-gray-200">{alt?.name}</div>
                      <div className="text-xl font-bold text-gray-300 mt-1">${alt?.price.toFixed(2)}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-400">★ {alt?.rating}</span>
                        <span className="text-gray-400 text-sm">({alt?.reviewCount} reviews)</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <a href={alt?.amazonUrl} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-gray-200 rounded text-sm transition-colors">
                          Buy on Amazon →
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">{pick.recommendation}</p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-700/40 rounded p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">WebEx Fit</div>
                      <div className="text-lg font-bold text-white">{mic?.webexFit}/5</div>
                    </div>
                    <div className="bg-gray-700/40 rounded p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Recording</div>
                      <div className="text-lg font-bold text-white">{mic?.recordingFit}/5</div>
                    </div>
                    <div className="bg-gray-700/40 rounded p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Streaming</div>
                      <div className="text-lg font-bold text-white">{mic?.streamingFit}/5</div>
                    </div>
                    <div className="bg-gray-700/40 rounded p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Portable</div>
                      <div className="text-lg font-bold text-white">{mic?.portabilityFit}/5</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Price verified: {mic?.sources.join(' · ')}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-3">Quick Decision Guide</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-indigo-400 font-bold w-44 flex-shrink-0">Just need WebEx calls?</span>
            <span className="text-gray-300">HyperX SoloCast 2 ($49.99) — done. It will blow away your laptop mic. (<GlossaryTerm term="cardioid" glossary={glossaryTerms}>cardioid condenser</GlossaryTerm>)</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-indigo-400 font-bold w-44 flex-shrink-0">Noisy home office?</span>
            <span className="text-gray-300">Fifine AM8 ($54.99) — dynamic capsule ignores background noise naturally.</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-indigo-400 font-bold w-44 flex-shrink-0">Quiet office + quality?</span>
            <span className="text-gray-300">Sennheiser Profile ($139) — premium condenser clarity, metal build, 3 controls.</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-indigo-400 font-bold w-44 flex-shrink-0">Also recording/streaming?</span>
            <span className="text-gray-300">Rode PodMic USB (~$194) — broadcast DSP + APHEX processing, professional grade.</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-indigo-400 font-bold w-44 flex-shrink-0">The best available?</span>
            <span className="text-gray-300">Shure MV7+ ($279) — auto-level, denoiser, LED panel. Overkill for calls, perfect for creators.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
