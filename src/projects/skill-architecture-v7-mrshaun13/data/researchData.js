// Research Visualizer Skill v7.0 — Architecture Deep Dive
// All structured data for the interactive dashboard

// ─── Pipeline Phases ───────────────────────────────────────────────
export const pipelinePhases = [
  {
    id: 0,
    name: 'ENVIRONMENT CHECK',
    shortName: 'ENV CHECK',
    description: 'Detect or set up the Research Hub. Read pointer config, sync git repos, check dev server.',
    userExperience: 'You just type a topic. Behind the scenes, the skill finds your hub in under 2 seconds — or walks you through a one-time setup if it\'s your first run. You never think about servers, installs, or config.',
    keyActions: ['Read pointer config', 'Read hub-config.json', 'Git pull (personal)', 'Library sync', 'Check dev server'],
    decisionPoints: ['Hub exists?', 'First-time setup needed?', 'Topic provided?'],
    avgMinutes: 2,
    filesAccessed: ['config.json', 'hub-config.json', '.local-config.json'],
    color: '#6366f1',
  },
  {
    id: 1,
    name: 'INTERPRET',
    shortName: 'INTERPRET',
    description: 'Parse natural language into research parameters. Detect extensions. No structured input required.',
    userExperience: 'You write a sentence like "I\'m looking to buy an espresso machine." The skill extracts your topic, populations, time scope, intent, and research lenses — and auto-detects if a specialized extension should activate.',
    keyActions: ['Extract core topic', 'Extract populations', 'Extract time scope', 'Classify research lenses', 'Scan extension triggers'],
    decisionPoints: ['Extension match?', 'Which lenses apply?'],
    avgMinutes: 5,
    filesAccessed: ['extensions/registry.md'],
    color: '#8b5cf6',
  },
  {
    id: 2,
    name: 'SURVEY',
    shortName: 'SURVEY',
    description: 'Broad landscape scan — find major studies, datasets, known dimensions, temporal inflection points.',
    userExperience: 'The agent performs 3-5 broad web searches to map the research landscape before diving deep. It discovers what data exists, what\'s been studied, and where the interesting story inflection points are.',
    keyActions: ['3-5 broad searches', 'Identify major studies', 'Find commonly measured dimensions', 'Determine temporal segmentation'],
    decisionPoints: ['Which segmentation reveals the best story?'],
    avgMinutes: 15,
    filesAccessed: [],
    color: '#06b6d4',
  },
  {
    id: 3,
    name: 'DISCOVER',
    shortName: 'DISCOVER',
    description: 'Autonomous dimension discovery — subgroups, core metrics, taxonomies. User checkpoint.',
    userExperience: 'This is the "magic" phase. The skill discovers what you would have had to specify manually — meaningful subgroups, the right metrics, domain taxonomies of 25-30 items. Then it presents a research plan for your lightweight approval.',
    keyActions: ['Subgroup discovery (split test)', 'Core metric identification', 'Taxonomy discovery', 'User checkpoint'],
    decisionPoints: ['Split or merge subgroups?', 'User approves plan?'],
    avgMinutes: 20,
    filesAccessed: ['subgroup-discovery.md', 'research-dimensions.md'],
    color: '#10b981',
  },
  {
    id: 4,
    name: 'RESEARCH',
    shortName: 'RESEARCH',
    description: 'Deep data gathering for every cell in the dimension matrix. Source triangulation. Quality tiers.',
    userExperience: 'The agent searches for every metric × group × time period combination, tags data quality (T1 Gold → T4 Estimate), and triangulates across 2-3 independent sources. You wait while it does hours of research in minutes.',
    keyActions: ['Metric × group × period searches', 'Quality tier tagging', 'Source triangulation', 'Gap filling (T4)', 'Taxonomy prevalence gathering'],
    decisionPoints: [],
    avgMinutes: 45,
    filesAccessed: ['subgroup-discovery.md'],
    color: '#f59e0b',
  },
  {
    id: 5,
    name: 'ANALYZE',
    shortName: 'ANALYZE',
    description: 'Data-driven story and visualization selection. Chart types chosen AFTER seeing data, not before.',
    userExperience: 'Visualization decisions are made after data collection — the same data shape always produces the same chart type. The agent identifies key findings, surprising results, and organizes everything into a narrative flow.',
    keyActions: ['Key findings extraction', 'Auto-select chart types', 'Dashboard structure planning', 'Narrative flow organization'],
    decisionPoints: ['Which chart type for each dataset?'],
    avgMinutes: 10,
    filesAccessed: ['visualization-rules.md'],
    color: '#ef4444',
  },
  {
    id: 6,
    name: 'BUILD',
    shortName: 'BUILD',
    description: 'Build project into the Research Hub. Write React components, data files, update registry.',
    userExperience: 'Your dashboard materializes inside the hub — no new servers, no new installs. The agent writes App.jsx, section components, data files, and updates the project registry. Vite HMR picks it up instantly.',
    keyActions: ['Create project directory', 'Write App.jsx + components', 'Write data files', 'Update projects/index.js', 'Update hub-config.json'],
    decisionPoints: ['Bespoke or template mode?', 'Visibility tier?'],
    avgMinutes: 40,
    filesAccessed: ['hub-architecture.md', 'build-templates.md', 'hub-scaffold-templates.md'],
    color: '#ec4899',
  },
  {
    id: 7,
    name: 'PRESENT',
    shortName: 'PRESENT',
    description: 'Build test, QA, telemetry finalization, git sync, library share, deliver.',
    userExperience: 'The agent runs a production build test, performs QA checks, computes telemetry (hours saved, readability, cognitive depth), syncs to git, optionally shares to the public library, and opens your browser to the finished dashboard.',
    keyActions: ['vite build test', 'QA checks', 'Finalize telemetry → meta.json', 'Git sync', 'Library share (if public)', 'Open browser preview'],
    decisionPoints: ['Build passes?', 'Share to library?'],
    avgMinutes: 13,
    filesAccessed: ['hub-architecture.md', 'hub-contribution.md'],
    color: '#84cc16',
  },
];

// ─── Config Architecture ───────────────────────────────────────────
export const configLayers = [
  {
    layer: 1,
    name: 'Pointer Config',
    location: '~/.codeium/windsurf/skills/research-visualizer/config.json',
    scope: 'Machine-local',
    gitTracked: false,
    purpose: 'Installation detection marker. Contains ONLY personalHubPath.',
    fieldCount: 1,
    userExperience: 'This is why the skill finds your hub in under 2 seconds. One file, one field, instant detection.',
    fields: ['personalHubPath'],
    color: '#f59e0b',
  },
  {
    layer: 2,
    name: 'Portable Config',
    location: '<hubPath>/hub-config.json',
    scope: 'Git-synced',
    gitTracked: true,
    purpose: 'Everything else: port, gitRepo, libraries, projects, collections. Syncs across machines via git.',
    fieldCount: 18,
    userExperience: 'Clone your hub on a new machine and everything is there — all projects, library connections, settings. Zero re-configuration.',
    fields: ['version', 'created', 'port', 'gitRepo', 'libraries[]', 'projects[]', 'collections[]'],
    color: '#6366f1',
  },
  {
    layer: 3,
    name: 'Machine-Local Vite Config',
    location: '<hubPath>/.local-config.json',
    scope: 'Gitignored',
    gitTracked: false,
    purpose: 'Machine-specific library paths for Vite aliases. Created during Phase 0 setup.',
    fieldCount: 3,
    userExperience: 'Your library paths differ per machine (home vs work). This file handles that silently — vite.config.js reads it dynamically.',
    fields: ['libraries[].name', 'libraries[].alias', 'libraries[].localPath'],
    color: '#10b981',
  },
];

// ─── Extension System ──────────────────────────────────────────────
export const extensionModes = [
  {
    mode: 'Bespoke',
    description: 'Each run produces a unique React component tree — full project with App.jsx, components/, data/, meta.json.',
    scale: '~50-100 projects',
    hubDisplay: 'Individual sidebar entries + full project cards',
    bestFor: 'Diverse research topics, product comparisons, exploratory analysis',
    userExperience: 'Every dashboard is unique — custom sections, custom charts, custom data. Like getting a bespoke research report built just for your question.',
    installed: ['Product/Purchase Comparison'],
    color: '#8b5cf6',
  },
  {
    mode: 'Template',
    description: 'Each run produces a JSON data file feeding a shared React template. Template installed once; subsequent runs add data only.',
    scale: '10,000+ items per collection',
    hubDisplay: 'Collapsible collection groups + sortable/filterable table views',
    bestFor: 'Incident reviews, sprint analyses, log pattern reports — same shape, different data',
    userExperience: 'Run 347 incident reviews and they all live in one searchable, filterable collection. No 347 separate projects cluttering your sidebar.',
    installed: [],
    planned: ['Incident Review Analyzer', 'Sprint Analyzer'],
    color: '#06b6d4',
  },
];

export const hookTypes = [
  { type: 'Augment', description: 'Add instructions alongside standard phase behavior. Standard steps still run.', icon: '＋', color: '#10b981' },
  { type: 'Override', description: 'Replace standard phase behavior entirely. Standard steps do NOT run.', icon: '⟳', color: '#f59e0b' },
  { type: 'Inject', description: 'Add an entirely new phase that doesn\'t exist in the standard pipeline.', icon: '⤵', color: '#ef4444' },
];

export const extensionRegistry = [
  {
    name: 'Product/Purchase Comparison',
    slug: 'product-purchase',
    mode: 'bespoke',
    status: 'installed',
    dataSource: 'internet',
    triggers: ['buy', 'purchase', 'looking for', 'which should I get', 'help me choose', 'best * for'],
    hooks: ['1B (inject)', '2 (augment)', '3 (override)', '4 (augment)', '5 (augment)', '6 (augment)', '7 (augment)'],
    features: ['Product lifecycle classification', 'Market tier discovery', 'Spec comparison tables', 'TCO analysis', 'Recommendation engine', 'Purchase links'],
  },
  {
    name: 'Incident Review Analyzer',
    slug: 'incident-review',
    mode: 'template',
    status: 'planned',
    dataSource: 'mcp-servicenow, mcp-splunk, pcc-analyst, webex-messaging',
    triggers: ['analyze incident', 'INC review', 'incident summary', 'post-incident'],
    hooks: ['1B (inject)', '2-7 (various)'],
    features: ['Timeline reconstruction', 'Root cause analysis', 'Impact assessment', 'Remediation tracking'],
  },
  {
    name: 'Jira Sprint Analyzer',
    slug: 'sprint-analyzer',
    mode: 'template',
    status: 'planned',
    dataSource: 'mcp-atlassian',
    triggers: ['analyze sprint', 'sprint report', 'sprint review'],
    hooks: ['1B (inject)', '2-7 (various)'],
    features: ['Velocity tracking', 'Burndown analysis', 'Carry-over detection', 'Team metrics'],
  },
];

// ─── Telemetry Schema ──────────────────────────────────────────────
export const telemetryCategories = [
  {
    category: 'Run Metadata',
    userExperience: 'See exactly when each project was built, how long it took, and what model powered it.',
    fields: [
      { name: 'runStartedAt', type: 'ISO 8601', description: 'When the skill invocation began' },
      { name: 'runCompletedAt', type: 'ISO 8601', description: 'When Phase 7 finished' },
      { name: 'durationMinutes', type: 'number', description: 'Total wall-clock minutes' },
      { name: 'includedSetup', type: 'boolean', description: 'Whether Phase 0B ran' },
      { name: 'skillVersion', type: 'string', description: 'Version from SKILL.md frontmatter' },
      { name: 'model', type: 'string', description: 'LLM model identifier' },
    ],
    color: '#6366f1',
    fieldCount: 6,
  },
  {
    category: 'Research Process',
    userExperience: 'Track the research effort — how many searches, sources, and data points went into your dashboard.',
    fields: [
      { name: 'userPrompt', type: 'string', description: 'Original user prompt' },
      { name: 'researchPlan', type: 'string', description: 'Full checkpoint text' },
      { name: 'checkpointModified', type: 'boolean', description: 'User requested changes?' },
      { name: 'searchesPerformed', type: 'number', description: 'Total web searches' },
      { name: 'sourcesCount', type: 'number', description: 'Unique sources cited' },
      { name: 'dataPointsCollected', type: 'number', description: 'Individual data values gathered' },
    ],
    color: '#06b6d4',
    fieldCount: 6,
  },
  {
    category: 'Build Output',
    userExperience: 'See what was produced — sections, charts, files, products compared.',
    fields: [
      { name: 'sectionsBuilt', type: 'number', description: 'Dashboard sections created' },
      { name: 'chartsBuilt', type: 'number', description: 'Individual visualizations' },
      { name: 'filesGenerated', type: 'number', description: 'Total files written' },
      { name: 'productsCompared', type: 'number|null', description: 'Product count (Product lens only)' },
    ],
    color: '#10b981',
    fieldCount: 4,
  },
  {
    category: 'Phase Timing',
    userExperience: 'Breakdown of where the AI spent its time — research-heavy topics show more time in Phase 4, complex builds in Phase 6.',
    fields: [
      { name: 'phaseTiming.environment', type: 'number', description: 'Minutes in Phase 0' },
      { name: 'phaseTiming.interpret', type: 'number', description: 'Minutes in Phase 1' },
      { name: 'phaseTiming.survey', type: 'number', description: 'Minutes in Phase 2' },
      { name: 'phaseTiming.discover', type: 'number', description: 'Minutes in Phase 3' },
      { name: 'phaseTiming.research', type: 'number', description: 'Minutes in Phase 4' },
      { name: 'phaseTiming.analyze', type: 'number', description: 'Minutes in Phase 5' },
      { name: 'phaseTiming.build', type: 'number', description: 'Minutes in Phase 6' },
      { name: 'phaseTiming.present', type: 'number', description: 'Minutes in Phase 7' },
    ],
    color: '#f59e0b',
    fieldCount: 8,
  },
  {
    category: 'Content Analysis',
    userExperience: 'Know the reading level and cognitive depth of your dashboard — is it a quick scan or a deep analytical read?',
    fields: [
      { name: 'fleschKincaidGrade', type: 'number', description: 'Readability grade level' },
      { name: 'bloomsLevel', type: 'number (1-6)', description: 'Dominant cognitive depth' },
      { name: 'bloomsRange', type: 'string', description: 'Range of cognitive levels' },
      { name: 'totalWords', type: 'number', description: 'Total word count' },
    ],
    color: '#ec4899',
    fieldCount: 4,
  },
  {
    category: 'Hours Saved',
    userExperience: 'The headline metric — how many hours of manual work the AI just saved you, broken down by output format.',
    fields: [
      { name: 'researchHours', type: 'number', description: 'Manual research equivalent' },
      { name: 'productionHours.*', type: 'object', description: '6 output format estimates' },
      { name: 'totalHoursSaved', type: 'number', description: 'Research + dashboard production' },
      { name: 'equivalentLabel', type: 'string', description: 'Human-readable (e.g., "~2 weeks")' },
    ],
    color: '#84cc16',
    fieldCount: 4,
  },
  {
    category: 'Consumption Time',
    userExperience: 'Know how long it will take to fully absorb the dashboard — reading time + chart exploration + interactive overhead.',
    fields: [
      { name: 'estimatedMinutes', type: 'number', description: 'Total consumption time' },
      { name: 'readingMinutes', type: 'number', description: 'Text reading time' },
      { name: 'chartExplorationMinutes', type: 'number', description: 'Chart interpretation time' },
      { name: 'interactiveOverheadMinutes', type: 'number', description: 'Filter/drill-down time' },
    ],
    color: '#8b5cf6',
    fieldCount: 4,
  },
];

export const totalTelemetryFields = telemetryCategories.reduce((sum, c) => sum + c.fieldCount, 0);

// ─── Visibility System ─────────────────────────────────────────────
export const visibilityTiers = [
  {
    tier: 'Local',
    visibility: 'local',
    icon: 'HardDrive',
    color: '#6b7280',
    filesLocation: 'src/local-projects/<slug>/',
    configLocation: '.local-config.json (gitignored)',
    gitSync: false,
    libraryShare: false,
    userExperience: 'Sensitive research stays on this machine only. Perfect for salary research, competitive analysis, or anything you don\'t want synced.',
    badgeColor: 'gray',
  },
  {
    tier: 'Personal',
    visibility: 'personal',
    icon: 'GitBranch',
    color: '#3b82f6',
    filesLocation: 'src/projects/<slug>/',
    configLocation: 'hub-config.json (committed)',
    gitSync: true,
    libraryShare: false,
    userExperience: 'Your research syncs across all your machines via git. Start a project at work, review it at home. The default for most research.',
    badgeColor: 'blue',
  },
  {
    tier: 'Public',
    visibility: 'public',
    icon: 'Globe',
    color: '#10b981',
    filesLocation: 'src/projects/<slug>/',
    configLocation: 'hub-config.json (committed)',
    gitSync: true,
    libraryShare: true,
    userExperience: 'Share your research with the community. Zero effort — the agent pushes via the GitHub API automatically after each build.',
    badgeColor: 'emerald',
  },
];

// ─── Hub Features ──────────────────────────────────────────────────
export const hubFeatures = [
  {
    feature: 'Single-App Architecture',
    technical: 'All projects live under one Vite + React app. One port (5180), one npm install, one dev server.',
    userBenefit: 'No more juggling 8 dev servers on 8 ports. Bookmark localhost:5180 and every dashboard you\'ve ever built is right there.',
    category: 'Architecture',
    icon: 'Layers',
  },
  {
    feature: 'ChatGPT-Style Sidebar',
    technical: 'Collapsible sidebar with two sections (My Research + Public Library), independent search per section, accent-colored project icons.',
    userBenefit: 'Browse all your research like chat history. Search across titles and original queries. Click to dive into any project instantly.',
    category: 'Navigation',
    icon: 'PanelLeft',
  },
  {
    feature: 'Lazy-Loaded Projects',
    technical: 'React.lazy() imports per project. Registry contains only lightweight metadata. Telemetry loaded on demand from meta.json.',
    userBenefit: 'Hub loads instantly even with 100+ projects. Only the project you click on gets loaded — everything else stays dormant.',
    category: 'Performance',
    icon: 'Zap',
  },
  {
    feature: 'Visibility Controls',
    technical: 'VisibilitySelector dropdown on each card. Vite middleware API (/api/set-visibility) moves files between directories with rollback on failure.',
    userBenefit: 'Click a badge on any project card to change its visibility. Upgrade to public to share, downgrade to local to keep it private. Instant.',
    category: 'Privacy',
    icon: 'Shield',
  },
  {
    feature: 'Public Library Browse',
    technical: 'Separate git clone of community repo. Vite aliases resolve @public-library dynamically from .local-config.json. Dedup logic removes your own projects.',
    userBenefit: 'Browse community-contributed dashboards alongside your own. Read-only, no account needed. Like a research library you can walk through.',
    category: 'Community',
    icon: 'Library',
  },
  {
    feature: 'Aggregate Telemetry',
    technical: 'AggregateStats component sums hours saved, searches, sources, charts, data points across all projects. Displayed in hero section.',
    userBenefit: 'See at a glance: "I\'ve saved 240 hours across 8 projects." A running total of the AI\'s cumulative impact on your research productivity.',
    category: 'Insights',
    icon: 'BarChart3',
  },
  {
    feature: 'Cross-Machine Portability',
    technical: 'Two-layer config: machine-local pointer + git-synced portable config. Clone repo on new machine, point skill at it, done.',
    userBenefit: 'Move to a new laptop? Clone your hub repo, run the skill once, and all your research is there. Zero re-setup.',
    category: 'Portability',
    icon: 'Globe',
  },
  {
    feature: 'Collections (Template Mode)',
    technical: 'Shared Template.jsx + manifest.json + items/*.json. Fuse.js search, sortable/filterable table views, scales to 10,000+ items.',
    userBenefit: 'Run hundreds of incident reviews or sprint analyses — they all live in one searchable collection, not hundreds of separate projects.',
    category: 'Scale',
    icon: 'Database',
  },
];

// ─── Contribution Flow ─────────────────────────────────────────────
export const contributionSteps = [
  { step: 1, name: 'Get Branch HEAD', api: 'GET /repos/.../git/ref/heads/agent-contributions', description: 'Read current branch state' },
  { step: 2, name: 'Read Current index.js', api: 'GET /repos/.../contents/src/projects/index.js', description: 'Get existing registry' },
  { step: 3, name: 'Create Blobs', api: 'POST /repos/.../git/blobs', description: 'Upload all project files' },
  { step: 4, name: 'Create Tree', api: 'POST /repos/.../git/trees', description: 'Assemble file tree with blob SHAs' },
  { step: 5, name: 'Create Commit', api: 'POST /repos/.../git/commits', description: 'Create commit with message' },
  { step: 6, name: 'Update Ref', api: 'PATCH /repos/.../git/refs/heads/agent-contributions', description: 'Point branch to new commit' },
  { step: 7, name: 'Auto-Validate', api: 'GitHub Action triggers', description: 'Validate structure, build test, auto-merge' },
];

// ─── Research Lenses ───────────────────────────────────────────────
export const researchLenses = [
  { lens: 'Population', dimensions: ['Population size', 'Career/lifecycle', 'Health outcomes', 'Economic outcomes', 'Social outcomes'], color: '#10b981', example: 'Career Pivot Explorer' },
  { lens: 'Behavior', dimensions: ['Prevalence', 'Taxonomy', 'Frequency', 'Outcomes'], color: '#8b5cf6', example: 'AI Tooling Adoption' },
  { lens: 'Industry', dimensions: ['Market size', 'Revenue distribution', 'Worker conditions', 'Subindustry segments'], color: '#ef4444', example: 'Dashboard Architecture' },
  { lens: 'Culture', dimensions: ['Shifting attitudes', 'Media representation', 'Public opinion', 'Policy/legal'], color: '#06b6d4', example: 'Traitors S3 Analytics' },
];

// ─── Visualization Rules ───────────────────────────────────────────
export const vizRules = [
  { dataShape: 'Metric × 2-6 groups', chartType: 'Grouped Bar', color: '#6366f1' },
  { dataShape: 'Metric × >6 groups', chartType: 'Horizontal Bar', color: '#8b5cf6' },
  { dataShape: 'Metric over time (>8 pts)', chartType: 'Line Chart', color: '#06b6d4' },
  { dataShape: 'Metric over time × groups', chartType: 'Multi-line', color: '#10b981' },
  { dataShape: 'Categorical + continuous', chartType: 'Composed (Bar + Line)', color: '#f59e0b' },
  { dataShape: 'Large taxonomy × periods', chartType: 'Heatmap + Top-N', color: '#ef4444' },
  { dataShape: 'Small stat set per group', chartType: 'Info Cards Grid', color: '#ec4899' },
  { dataShape: 'Single long time series', chartType: 'Line or Area', color: '#84cc16' },
  { dataShape: 'Part-of-whole', chartType: 'Donut (sparingly)', color: '#f97316' },
];

// ─── Data Quality Tiers ────────────────────────────────────────────
export const dataQualityTiers = [
  { tier: 'T1', label: 'Gold', description: 'Peer-reviewed, large sample, nationally representative', example: 'GSS, Census, CDC NVSS', color: '#f59e0b' },
  { tier: 'T2', label: 'Silver', description: 'Institutional/industry report, moderate sample', example: 'Pew Research, platform reports', color: '#94a3b8' },
  { tier: 'T3', label: 'Bronze', description: 'Small study, self-selected sample, single source', example: 'Academic case study, survey of 200', color: '#b45309' },
  { tier: 'T4', label: 'Estimate', description: 'Interpolated, proxy-based, or expert judgment', example: 'Gap-filling between known data points', color: '#6b7280' },
];

// ─── Anti-Randomness Guardrails ────────────────────────────────────
export const guardrails = [
  { name: 'Standard Research Dimensions', description: 'Established methodology ensures consistent coverage across all topics', metric: '4 lens frameworks' },
  { name: 'Deterministic Chart Selection', description: 'Same data shape → same chart type, always. No random variation.', metric: '9 mapping rules' },
  { name: 'Bounded Discovery', description: 'Max 3 iterations, max 5 subgroups, max 30 taxonomy items', metric: '3 hard limits' },
  { name: 'User Checkpoint', description: 'Lightweight approval after discovery, before full build', metric: '1 required interaction' },
  { name: 'Narrative Structure', description: 'Sections always flow: broad → deep → compare → explore → context → sources', metric: '6-step flow' },
];

// ─── Backwards Compatibility Matrix ────────────────────────────────
export const compatibilityMatrix = [
  { personalGit: false, libraries: false, contribution: false, whatWorks: 'Local-only research. No sync, no browsing, no sharing. Fully functional.' },
  { personalGit: true, libraries: false, contribution: false, whatWorks: 'Personal research syncs across machines via git. No public library.' },
  { personalGit: false, libraries: true, contribution: false, whatWorks: 'Browse community research. Personal research is local-only.' },
  { personalGit: true, libraries: true, contribution: false, whatWorks: 'Full sync + browse community. No contributions.' },
  { personalGit: false, libraries: true, contribution: true, whatWorks: 'Browse + contribute. No personal git sync. Agent uses GitHub API.' },
  { personalGit: true, libraries: true, contribution: true, whatWorks: 'Full experience: sync, browse, contribute.' },
];

// ─── File Structure ────────────────────────────────────────────────
export const skillFileStructure = [
  { file: 'SKILL.md', lines: 477, purpose: 'Core pipeline instructions (v7.0)', category: 'Core' },
  { file: 'README.md', lines: 239, purpose: 'Documentation and examples', category: 'Core' },
  { file: 'config.json', lines: 4, purpose: 'Machine-local pointer', category: 'Config' },
  { file: 'references/hub-architecture.md', lines: 726, purpose: 'Config schema, directory structure, telemetry', category: 'Reference' },
  { file: 'references/hub-scaffold-templates.md', lines: 1257, purpose: 'Hub React component templates', category: 'Reference' },
  { file: 'references/hub-contribution.md', lines: 179, purpose: 'Library contribution flow, GitHub API', category: 'Reference' },
  { file: 'references/hub-visibility.md', lines: 208, purpose: 'Visibility tiers, set-visibility API', category: 'Reference' },
  { file: 'references/collections-architecture.md', lines: 293, purpose: 'Template mode: collections, manifest, schema', category: 'Reference' },
  { file: 'references/build-templates.md', lines: 93, purpose: 'Tech stack, file structures, data schemas', category: 'Reference' },
  { file: 'references/research-dimensions.md', lines: 57, purpose: 'Standard Research Dimensions Framework', category: 'Reference' },
  { file: 'references/visualization-rules.md', lines: 50, purpose: 'Chart type auto-selection rules', category: 'Reference' },
  { file: 'references/subgroup-discovery.md', lines: 44, purpose: 'Split decision matrix, taxonomy search', category: 'Reference' },
  { file: 'extensions/registry.md', lines: 247, purpose: 'Extension catalog + builder guide', category: 'Extension' },
  { file: 'extensions/product-purchase/EXTENSION.md', lines: 140, purpose: 'Product comparison pipeline logic', category: 'Extension' },
];

export const totalSkillLines = skillFileStructure.reduce((sum, f) => sum + f.lines, 0);

// ─── Tech Stack ────────────────────────────────────────────────────
export const techStack = [
  { name: 'React 18', role: 'Component framework', icon: 'Code2' },
  { name: 'Vite 5', role: 'Build tool + dev server + HMR', icon: 'Zap' },
  { name: 'Recharts', role: 'Charts (bar, line, area, composed, radar, pie)', icon: 'BarChart3' },
  { name: 'Tailwind CSS 3', role: 'Utility-first styling (dark theme)', icon: 'Palette' },
  { name: 'Lucide React', role: 'Icon library', icon: 'Sparkles' },
];

// ─── Sources ───────────────────────────────────────────────────────
export const sources = [
  { name: 'SKILL.md v7.0', type: 'Primary', description: 'Core pipeline specification — 477 lines, 8 phases, extension hooks', url: null },
  { name: 'hub-architecture.md', type: 'Primary', description: 'Config schema, telemetry (36 fields), directory structure, hub UI design', url: null },
  { name: 'hub-scaffold-templates.md', type: 'Primary', description: 'Complete React templates — App.jsx (446 lines), HubHome.jsx (510 lines), all scaffold files', url: null },
  { name: 'hub-contribution.md', type: 'Primary', description: 'GitHub API contribution flow (7 steps), security model, validation pipeline', url: null },
  { name: 'hub-visibility.md', type: 'Primary', description: '3-tier visibility system, set-visibility API with rollback, UI components', url: null },
  { name: 'collections-architecture.md', type: 'Primary', description: 'Template mode: manifest, schema, Template.jsx contract, scale characteristics', url: null },
  { name: 'extensions/registry.md', type: 'Primary', description: 'Extension manifest format, 2 output modes, 3 hook types, builder guide', url: null },
  { name: 'extensions/product-purchase/EXTENSION.md', type: 'Primary', description: 'Product comparison extension — lifecycle classification, 7 phase hooks', url: null },
  { name: 'agentskills.io specification', type: 'External', description: 'Cross-platform agent skill format standard', url: 'https://agentskills.io/specification' },
  { name: 'Windsurf Cascade Skills Docs', type: 'External', description: 'Official Windsurf documentation on skill system', url: 'https://docs.windsurf.com/windsurf/cascade/skills' },
];
