# SITE MANIFEST: Codebolt v1.0
Last updated: 2026-02-19
Brand Kit Reference: codebolt-brand-kit/
Voice: Confident, technical, spare. Precision-engineering tone. No hype words. See voice-core.md.

## 🗺️ GLOBAL SITE INDEX
- / (Home)
  - /features
  - /architecture
  - /pricing
  - /docs (external link → docs.codebolt.ai)
  - /blog
- /about
- /careers
- /changelog
- /legal/privacy (footer-only)
- /legal/terms (footer-only)

---

## 🌐 GLOBAL COMPONENTS

### Navbar
- Style: Transparent on hero, solid #0F172A on scroll
- Logo: Codebolt wordmark, left-aligned
- Links: Features, Architecture, Pricing, Docs, Blog
- CTA: "Get Started" → /pricing (small, ghost button style)
- Mobile: Hamburger menu, same links

### Footer
- Style: Minimal, dark (#0F172A), single-row on desktop
- Columns:
  - Col 1: Codebolt logo + one-liner: "The High-Performance Environment for AI Agents."
  - Col 2: Product — Features, Architecture, Pricing, Changelog
  - Col 3: Resources — Docs, Blog, GitHub, Research Papers
  - Col 4: Company — About, Careers, Contact (email link)
- Bottom row: © 2026 Codebolt · Privacy · Terms
- No social media icons unless accounts are active

---

## 🏗️ PAGE: Home (/)
[layout: landing-page | theme: dark (#0F172A base) | nav: transparent | footer: minimal]

### Section 1: Hero
- Component: Centered-Text-Hero (no image, no split-screen — let the words land)
- Eyebrow: None (clean entry)
- Heading: "The High-Performance Environment for AI Agents."
- Subheading: "Precision-engineered so agents align better, conflict less, and scale further."
- CTA: [Primary: "Get Started" → /pricing] [Secondary: "Read the Architecture" → /architecture]
- Background: Subtle animated grid or node graph (very restrained, no flashy particles). Dark. Conveys precision, not chaos.
- Note: No product screenshot in hero. The statement IS the product identity.

### Section 2: Thesis Statement
- Component: Centered-Text-Block (generous whitespace above and below)
- Text: "Scaling agents is an engineering problem, not a prompting problem. Agents don't need better models — they need a better environment."
- Style: Larger font (20-24px), slate-400 color, monospace or italic feel. Let it breathe. This is the contrarian insight that separates Codebolt from everything else.
- No CTA. No link. Just the idea.

### Section 3: The Problem → Solution Frame
- Component: Two-Column-Comparison (left = problem, right = solution)
- Left Column ("Without a proper environment"):
  - "Agents conflict over shared files"
  - "Changes drift from original intent"
  - "Multi-environment work creates merge chaos"
  - "Scaling past 2-3 agents breaks everything"
  - "You spend more time debugging agents than building"
- Right Column ("With Codebolt"):
  - "Conflicts resolve at the system level"
  - "Drift tracking catches misalignment early"
  - "Cross-environment coordination is built in"
  - "The architecture handles hundreds of agents"
  - "You direct the vision. Agents build the system."
- Style: Clean, no icons. Left column in muted text, right in white/bright. No check marks or X marks — just clear statements.

### Section 4: Core Capabilities
- Component: 3-Column-Card-Grid
- Card 1:
  - Title: "Multi-Agent Coordination"
  - Description: "Agents work as a coordinated team, not independent processes fighting over shared state. The environment manages communication, sequencing, and dependencies."
  - Visual: Minimal diagram showing coordinated agents vs chaotic agents
- Card 2:
  - Title: "Drift Tracking"
  - Description: "The system evaluates structural, scope, and coverage drift continuously. When agents deviate from intent, you know before the damage compounds."
  - Visual: Minimal diagram showing intent → execution with drift detection point
- Card 3:
  - Title: "Cross-Environment Execution"
  - Description: "Agents operate across branches, staging, local, and production environments simultaneously. The system reconciles their work automatically."
  - Visual: Minimal diagram showing environments converging
- Card 4:
  - Title: "Conflict Resolution"
  - Description: "When agents make incompatible changes, the environment resolves it. Not the user. Conflicts are handled as a system-level primitive."
  - Visual: Minimal diagram showing merge resolution
- Card 5:
  - Title: "Ground-Up Architecture"
  - Description: "Not a VS Code fork. Not a wrapper. Built from scratch with agent coordination as the foundation, not a feature bolted on later."
  - Visual: Minimal architecture layer diagram
- Card 6:
  - Title: "Model-Agnostic"
  - Description: "The environment amplifies whatever model you put in it. As models improve, your agents improve automatically. No vendor lock-in."
  - Visual: Minimal diagram showing multiple model logos feeding into one environment

### Section 5: The Architecture Preview
- Component: Full-Width-Diagram
- Content: A clear, technical architecture diagram showing the layer stack:
  - Layer 1 — Editor Interface (surface)
  - Layer 2 — Agent Runtime
  - Layer 3 — Drift Engine
  - Layer 4 — Narrative Versioning
  - Layer 5 — Governance & Coordination Loop
- Annotation: "Most tools stop at Layer 2. Codebolt is Layers 3–5."
- CTA: "Explore the full architecture" → /architecture
- Style: Technical, clean, dark background. This is the credibility anchor.

### Section 6: The Analogy
- Component: Centered-Text-Block-With-Border
- Text: "A brilliant engineer in a company with no version control, no CI/CD, and no communication tools would be ineffective. Not because they lack skill — because the environment doesn't support good work. The same is true for AI agents today."
- Style: Blockquote feel. Slight indent or left border. Monospace or serif for contrast. No attribution (it's the brand speaking).

### Section 7: Who It's For
- Component: 3-Column-Persona-Cards (compact)
- Card 1:
  - Label: "Infrastructure Engineers"
  - Line: "You've hit the coordination wall. You know the problem isn't the model — it's the environment. This is what you've been looking for."
- Card 2:
  - Label: "Teams Scaling AI"
  - Line: "Moving from 2 agents to 50. You need a system that handles the complexity so you can focus on the product."
- Card 3:
  - Label: "Enterprise & Production"
  - Line: "You won't put agents in production without governance, traceability, and deterministic replay. Neither would we."

### Section 8: Identity Line
- Component: Centered-Statement (large, bold)
- Text: "Designed for engineers who treat AI as infrastructure — not just assistance."
- Style: White text, large (28-32px), generous whitespace. This is the brand identity line. Let it close the page with weight.

### Section 9: Final CTA
- Component: CTA-Block
- Heading: "Ready to scale your agents."
- Note: Statement, not question. No question mark. Confident.
- CTA: [Primary: "Get Started" → /pricing] [Secondary: "Read the Docs" → /docs]

---

## 🏗️ PAGE: Features (/features)
[layout: long-scroll | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "What the environment handles."
- Subheading: "Every capability exists because it solves a real problem at scale."

### Section 2: Feature Deep-Dives
- Component: Alternating-Left-Right-Feature-Blocks (text + diagram alternating sides)
- Feature 1: Multi-Agent Coordination
  - Heading: "Agents coordinate. They don't collide."
  - Body: "Traditional multi-agent setups are parallel LLM calls sharing a context buffer. Codebolt uses stigmergy-based coordination — agents communicate through structured shared state, not fragile message passing. The environment manages sequencing, dependencies, and resource allocation."
  - Diagram: Agent coordination flow
- Feature 2: Drift Tracking
  - Heading: "Drift tracking catches what code review can't."
  - Body: "The drift engine evaluates structural, scope, constraint, and coverage drift at two levels: local assessment within Rust engine instances and global coordination in JavaScript. When agents deviate from the original intent, the system flags it before the deviation compounds."
  - Diagram: Intent → plan → code pipeline with drift detection overlay
- Feature 3: Cross-Environment Reconciliation
  - Heading: "One codebase. Multiple environments. Zero manual merging."
  - Body: "Agents operate across local, staging, feature branches, and production contexts simultaneously. The narrative versioning system tracks what changed, why, and by which agent — then reconciles across environments automatically."
  - Diagram: Environment tree with reconciliation arrows
- Feature 4: Conflict Resolution
  - Heading: "Agent conflicts are a system problem. The system solves them."
  - Body: "When two agents make incompatible changes to the same file, the environment resolves it using structured arbitration. No merge conflicts in your terminal. No manual intervention. The system handles disagreements the way a well-run engineering team would — with clear rules and traceable decisions."
  - Diagram: Conflict detection → arbitration → resolution flow
- Feature 5: Execution Trace & Replay
  - Heading: "Every agent decision is traceable and replayable."
  - Body: "The execution trace graph captures the full reasoning chain for every agent action. You can replay any decision, audit any change, and understand exactly why your codebase looks the way it does. This is what makes enterprise deployment possible."
  - Diagram: Execution trace timeline
- Feature 6: AI Playbooks
  - Heading: "Structured intelligence modules. Not prompt templates."
  - Body: "AI Playbooks encode domain knowledge, architectural constraints, and decision patterns into structured modules that agents consume. They're how you give agents context without giving them your entire codebase. Reusable, composable, versionable."
  - Diagram: Playbook structure breakdown

### Section 3: Bottom CTA
- Heading: "See how it's built."
- CTA: [Primary: "Explore Architecture" → /architecture] [Secondary: "Get Started" → /pricing]

---

## 🏗️ PAGE: Architecture (/architecture)
[layout: technical-document | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "Architecture"
- Subheading: "Codebolt is built from the ground up. Here's how."

### Section 2: Layer Diagram
- Component: Full-Width-Interactive-Diagram
- The 5-layer stack (clickable, each layer expands):
  - Layer 1 — Editor Interface
  - Layer 2 — Agent Runtime
  - Layer 3 — Drift Engine (Rust-based)
  - Layer 4 — Narrative Versioning (Git tree-based)
  - Layer 5 — Governance & Coordination Loop
- Annotation: "Most competitors stop at Layer 2."

### Section 3: Technical Deep-Dives
- Component: Expandable-Accordion-Sections
- Section: Stigmergy-Based Coordination
  - What it is, how it differs from message-passing, why it scales better
- Section: The Narrative Engine
  - Rust-based system: agent attribution, snapshot versioning, cross-environment coordination using git trees
- Section: Drift Tracking Architecture
  - Two-level system: local Rust assessment + global JS coordination
  - Drift types: structural, scope, constraint, coverage
- Section: SCAAB Bundles
  - What they are, how they structure agent knowledge
- Section: IntentGraph & PlanGraph
  - How intent flows through planning to execution

### Section 4: Research
- Heading: "Published Research"
- List of papers with links:
  - Swarm Versioning
  - IntentGraph
  - StigmergySwarm
- Style: Academic citation format. Links to full papers.

### Section 5: CTA
- Heading: "Convinced by the engineering."
- CTA: [Primary: "Get Started" → /pricing] [Secondary: "Read the Docs" → /docs]

---

## 🏗️ PAGE: Pricing (/pricing)
[layout: centered-grid | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "Pricing"
- Subheading: "Start building. Scale when you're ready."
- Note: No "Simple, transparent pricing" — too generic. The subheading matches our voice: direct, practical.

### Section 2: Pricing Cards
- Component: 3-Column-Pricing-Cards
- Tier 1: Community
  - Price: Free
  - For: "Individual engineers exploring multi-agent workflows"
  - Includes: Core IDE, up to 3 concurrent agents, basic drift tracking, community support
  - CTA: "Start Free"
- Tier 2: Pro
  - Price: $[TBD]/mo
  - For: "Engineers and teams scaling agent coordination"
  - Includes: Everything in Community + unlimited agents, full drift engine, cross-environment coordination, AI Playbooks, priority support
  - CTA: "Start Pro"
  - Badge: "Most popular" (only if true by usage data)
- Tier 3: Enterprise
  - Price: "Contact us"
  - For: "Organizations deploying agents in production"
  - Includes: Everything in Pro + deterministic replay, full audit trails, SSO/SAML, dedicated support, SLA, custom governance rules
  - CTA: "Talk to Engineering"
  - Note: CTA says "Talk to Engineering" not "Contact Sales" — matches our audience.

### Section 3: FAQ
- Component: Expandable-Accordion
- Q: "Is Codebolt a VS Code fork?"
  A: "No. Codebolt is built from the ground up. The architecture starts with agent coordination, not an editor."
- Q: "Which AI models does Codebolt support?"
  A: "Codebolt is model-agnostic. The environment amplifies whatever model you connect. As models improve, your agents improve."
- Q: "I'm currently using one agent. Is this for me?"
  A: "If you're planning to scale, yes. Codebolt is built for where AI development is going. Start with one agent and grow."
- Q: "Can I use this for non-coding agents?"
  A: "The architecture supports general agent coordination. We're focused on software development first, with broader applications coming."

---

## 🏗️ PAGE: Blog (/blog)
[layout: blog-index | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "Blog"
- Subheading: "Engineering decisions, architecture deep-dives, and what we're learning."

### Section 2: Post Grid
- Component: 2-Column-Post-Cards
- Card format: Title, date, 2-line excerpt, category tag
- Categories: Engineering, Architecture, Research, Product Updates
- Style: Clean, no feature images on cards (title-first). Monospace dates.

### Section 3: Suggested Launch Posts (Content Plan)
- Post 1: "Why We Built a New IDE From Scratch" — origin story, architecture decision
- Post 2: "Scaling Agents Is an Engineering Problem" — the core thesis, expanded
- Post 3: "How Drift Tracking Works Under the Hood" — technical deep-dive
- Post 4: "Stigmergy vs Message Passing for Agent Coordination" — research-backed comparison
- Post 5: "What Breaks When You Run 50 Agents on One Repo" — real problems, real solutions

---

## 🏗️ PAGE: About (/about)
[layout: narrative | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Opening Statement
- Component: Centered-Text-Block
- Text: "We saw the gap between what AI agents promise and what they can actually deliver. The bottleneck isn't intelligence. It's infrastructure. We built the infrastructure."

### Section 2: The Thesis
- Component: Two-Column-Text
- Left: "What everyone is building"
  - "Smarter models. Better prompts. Faster autocomplete. More agents running in parallel."
- Right: "What's actually missing"
  - "An environment where agents can coordinate, resolve conflicts, track drift, and scale without collapsing into chaos."
- Separator line, then:
- Centered: "Codebolt is the environment."

### Section 3: What We Believe
- Component: Value-Statement-List (no bullets — one value per line, large text)
- "The environment is the multiplier, not the model."
- "Depth over breadth. Solve the hard problem well."
- "Honesty over hype. Show benchmarks, not adjectives."
- "Earned complexity. The system grows with your ambition."

### Section 4: The Engineering
- Brief paragraph: Reference to ground-up architecture, research background (stigmergy, narrative versioning, drift tracking). Link to /architecture for details.
- Tone: Factual, not boastful.

### Section 5: Team (Optional — include only if team members want to be public)
- Component: Simple name + role + one-line list. No headshots required. No bios. Clean.

### Section 6: CTA
- "We're building the infrastructure for the AI agent era."
- CTA: [Primary: "See Open Roles" → /careers] [Secondary: "Read the Architecture" → /architecture]

---

## 🏗️ PAGE: Careers (/careers)
[layout: simple | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "Build with us."
- Subheading: "We're solving the hardest coordination problems in AI. If that excites you, we should talk."

### Section 2: What It's Like
- Short paragraph: Engineering-first culture. Small team. Hard problems. Real impact on how AI development works. Remote-friendly.

### Section 3: Open Roles
- Component: Simple-List-With-Links
- Format: Role title — Location — Link to apply
- Placeholder: "No open roles right now. But if you think you should be here, email eng@codebolt.ai."

---

## 🏗️ PAGE: Changelog (/changelog)
[layout: timeline | theme: dark (#0F172A base) | nav: solid | footer: standard]

### Section 1: Header
- Heading: "Changelog"
- Subheading: "What shipped, when."

### Section 2: Timeline
- Component: Reverse-Chronological-List
- Entry format: Date (bold) — Version — One-line summary — Expandable details
- Style: Monospace dates. Clean. No marketing spin on updates. Just what changed.

---

## 📋 DESIGN SYSTEM NOTES (For Export)

### Color Tokens
- Background primary: #0F172A (Bolt Dark)
- Text primary: #FFFFFF on dark
- Text secondary: #94A3B8 (Slate 400)
- Accent primary: #2563EB (Bolt Blue)
- Success: #10B981 (Signal Green)
- Warning: #F59E0B (Alert Amber)
- Error: #EF4444 (Error Red)
- Borders: #E2E8F0 (Slate 200) at 10% opacity on dark

### Typography
- Primary: Inter (400, 600, 700)
- Monospace: JetBrains Mono (400, 500)
- Hero heading: 48px / 700 / -0.02em tracking
- Section headings: 32px / 700 / -0.01em
- Body: 16px / 400 / 1.6 line-height
- Captions/labels: 12px / 500 / 0.02em tracking

### Spacing
- Section padding: 80px top/bottom (desktop), 48px (mobile)
- Content max-width: 1200px
- Card gap: 24px
- Generous whitespace everywhere — confidence through space

### Motion
- Page transitions: Subtle fade (200ms ease)
- Scroll animations: None. Content is static. No parallax, no reveal animations.
- Interactive elements: Hover state transitions (150ms)
- Diagrams: Can have subtle, purposeful animation (agent flow, coordination visualization)

### Responsive
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Mobile-first approach
- Cards stack vertically below 768px
- Navigation collapses to hamburger below 768px
- Hero heading scales: 48px → 32px on mobile
