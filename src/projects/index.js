import { lazy } from 'react';

export const projectRegistry = [
  {
    slug: "cisco-history-dashboard",
    title: "Cisco History Dashboard",
    subtitle: "40 Years of Innovation",
    query: "Research the history of Cisco Systems from founding to present day",
    lens: "standard",
    icon: "Building2",
    accentColor: "cyan",
    visibility: "public",
    createdAt: "2026-02-08T12:00:00Z"
  },
  {
    slug: "chainsaw-comparison",
    title: "Gas Chainsaw Comparison",
    subtitle: "Product Comparison Dashboard",
    query: "I'm looking to buy a gas chainsaw for property maintenance",
    lens: "product",
    icon: "Axe",
    accentColor: "orange",
    visibility: "public",
    createdAt: "2026-02-09T12:00:00Z"
  },
  {
    slug: "limelight-history",
    title: "Limelight Networks History",
    subtitle: "Rise & Fall of a CDN Pioneer",
    query: "Research the history of Limelight Networks the CDN",
    lens: "standard",
    icon: "Globe",
    accentColor: "cyan",
    visibility: "public",
    createdAt: "2026-02-10T05:53:00Z"
  },
  {
    slug: "generator-comparison",
    title: "Generator Comparison",
    subtitle: "Tri-Fuel & Dual-Fuel Home Backup",
    query: "Research generators for home backup — tri-fuel with natural gas support, 3,300W to 15,000W range",
    lens: "product",
    icon: "Zap",
    accentColor: "amber",
    visibility: "public",
    createdAt: "2026-02-10T06:16:00Z"
  },
  {
    slug: "homeschool-curriculum",
    title: "Homeschool Curriculum Guide",
    subtitle: "Curricula & Co-op Programs for Advanced Learners",
    query: "Research homeschool curricula and co-op programs near Hendersonville TN (37075) for an advanced child",
    lens: "standard",
    icon: "GraduationCap",
    accentColor: "violet",
    visibility: "public",
    createdAt: "2026-02-10T09:06:00Z"
  },
  {
    slug: "pixel-upgrade-analysis-mrshaun13",
    title: "Pixel 9 Pro Upgrade Analysis",
    subtitle: "Should you upgrade? Tick-tock innovation cycles, cost analysis & verdict",
    query: "Is it worth upgrading from the Pixel 9 Pro to a new Pixel phone right now?",
    lens: "product",
    icon: "Smartphone",
    accentColor: "emerald",
    visibility: "public",
    createdAt: "2026-02-10T18:23:00Z"
  },
  {
    slug: "ai-tooling-adoption-mrshaun13",
    title: "AI Developer Tooling Adoption",
    subtitle: "Hype vs Reality — Agents, MCP, Skills & the Adoption Paradox",
    query: "Research the adoption rate of modern AI developer tooling — agents, MCP servers, skills/workflows, AGENTS.md. Is it really on a huge climb or still slow? Include future projections.",
    lens: "standard",
    icon: "Brain",
    accentColor: "cyan",
    visibility: "public",
    createdAt: "2026-02-10T22:49:00Z"
  },
  {
    slug: "coffee-beans-deep-dive-djagger",
    title: "Coffee Beans Deep Dive",
    subtitle: "Species, varieties, caffeine, flavor, rarity & global production",
    query: "Research the different types of coffee beans — quality, flavor, caffeine, which keep you awake most, international varieties, rare beans",
    lens: "standard",
    icon: "Coffee",
    accentColor: "amber",
    visibility: "public",
    createdAt: "2026-02-10T22:57:00Z"
  },
  {
    slug: "solar-system-explorer-mrshaun13",
    title: "Solar System Explorer",
    subtitle: "An Interactive Space Adventure for Kids — All 8 Planets + Pluto!",
    query: "Build a cool learning experience for a seven-year-old advanced first grader to learn about our solar system with the ability to zoom in to all the planets and see every stat about their size and everything.",
    lens: "standard",
    icon: "Globe",
    accentColor: "blue",
    visibility: "public",
    createdAt: "2026-02-11T03:48:00Z"
  },
  {
    slug: "traitors-s3-analytics-mrshaun13",
    title: "The Traitors S3 Analytics",
    subtitle: "Spoiler-Free Game Intelligence Dashboard — Season 3 (US)",
    query: "Build an interactive analytics dashboard for The Traitors Season 3 (US) with episode-gated spoiler protection, player profiles, social game scores, deception tracking, alliance maps, and game statistics.",
    lens: "standard",
    icon: "Flame",
    accentColor: "red",
    visibility: "personal",
    createdAt: "2026-02-11T19:48:00Z"
  },
  {
    slug: "skill-showcase-mrshaun13",
    title: "Research Visualizer Showcase",
    subtitle: "How This Skill Works — Pipeline, Scaffold, Telemetry & Hub Architecture",
    query: "Build a showcase of the research-visualizer skill itself, demonstrating the diversity of projects it produces, its 8-phase pipeline, scaffold layer, telemetry system, and centralized research hub with public sharing.",
    lens: "standard",
    icon: "Sparkles",
    accentColor: "violet",
    visibility: "personal",
    createdAt: "2026-02-12T07:24:00Z"
  },
  {
    slug: "smart-telescope-finder-mrshaun13",
    title: "Smart Telescope Finder",
    subtitle: "Porch Stargazing & Nashville Skyline — 12 Models, 5 Brands, Your Perfect Scope",
    query: "Find me a telescope or similar device I can sit on my porch and control remotely from my phone with live image cast to my TV. Needs to do stargazing AND terrestrial viewing of the Nashville skyline 1-20 miles away.",
    lens: "product",
    icon: "Telescope",
    accentColor: "cyan",
    visibility: "public",
    createdAt: "2026-02-13T04:13:00Z",
    contributor: "mrshaun13"
  },
  {
    slug: "career-pivot-explorer-mrshaun13",
    title: "Career Pivot Explorer",
    subtitle: "From EA to What's Next — 18 Jobs, 4 Stress Tiers, Your Path Forward",
    query: "I'm 50, been an Executive Assistant for 25 years in Hendersonville TN. Help me explore career pivot options from low-stress retail/receptionist jobs to leveraged professional roles like event planning. Show pay ranges, stress levels, and how my skills transfer.",
    lens: "standard",
    icon: "Compass",
    accentColor: "violet",
    visibility: "public",
    createdAt: "2026-02-11T03:33:00Z",
    contributor: "mrshaun13"
  },
  {
    slug: "skill-architecture-v7-mrshaun13",
    title: "Research Visualizer v7 Architecture",
    subtitle: "Complete Architecture Deep Dive — Pipeline, Config, Extensions, Hub & Telemetry",
    query: "Deep research the research-visualizer skill v7.0 architecture — pipeline flow, config layers, extension system, hub architecture, telemetry, visibility, and community library. Present as a product demo showing both how it works and what the end user experiences.",
    lens: "standard",
    icon: "Sparkles",
    accentColor: "violet",
    visibility: "public",
    createdAt: "2026-02-13T17:16:00Z",
    contributor: "mrshaun13"
  },
  {
    slug: "az-homeschool-guide-mrshaun13",
    title: "AZ Homeschool Curriculum & Co-op Guide",
    subtitle: "85234 Gilbert — 13 Curricula, 7 Co-ops, ESA Funding & Advanced Learner Focus",
    query: "Homeschool Curriculum & Co-op Guide for a kid in zip code 85234. Advanced learner, grade acceleration, parent-chosen curriculum. 13 curricula, 7 co-op programs, cost analysis, AZ law & ESA, recommendations.",
    lens: "standard",
    icon: "GraduationCap",
    accentColor: "amber",
    visibility: "public",
    createdAt: "2026-02-13T18:10:00Z",
    contributor: "mrshaun13"
  }
];

export const projectComponents = {
  'cisco-history-dashboard': lazy(() => import('./cisco-history-dashboard/App')),
  'chainsaw-comparison': lazy(() => import('./chainsaw-comparison/App')),
  'limelight-history': lazy(() => import('./limelight-history/App')),
  'generator-comparison': lazy(() => import('./generator-comparison/App')),
  'homeschool-curriculum': lazy(() => import('./homeschool-curriculum/App')),
  'pixel-upgrade-analysis-mrshaun13': lazy(() => import('./pixel-upgrade-analysis-mrshaun13/App')),
  'ai-tooling-adoption-mrshaun13': lazy(() => import('./ai-tooling-adoption-mrshaun13/App')),
  'coffee-beans-deep-dive-djagger': lazy(() => import('./coffee-beans-deep-dive-djagger/App')),
  'solar-system-explorer-mrshaun13': lazy(() => import('./solar-system-explorer-mrshaun13/App')),
  'traitors-s3-analytics-mrshaun13': lazy(() => import('./traitors-s3-analytics-mrshaun13/App')),
  'skill-showcase-mrshaun13': lazy(() => import('./skill-showcase-mrshaun13/App')),
  'smart-telescope-finder-mrshaun13': lazy(() => import('./smart-telescope-finder-mrshaun13/App')),
  'career-pivot-explorer-mrshaun13': lazy(() => import('./career-pivot-explorer-mrshaun13/App')),
  'skill-architecture-v7-mrshaun13': lazy(() => import('./skill-architecture-v7-mrshaun13/App')),
  'az-homeschool-guide-mrshaun13': lazy(() => import('./az-homeschool-guide-mrshaun13/App')),
};
