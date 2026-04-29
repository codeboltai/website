# Codebolt Website Structure

```
/wireframe/antigravity/
│
├── index.html (Home)
│   ├── Hero: 200+ AI Agents. One Coordinated Swarm.
│   ├── The Core Insight: Build Smarter Environments, Not Smarter Agents
│   ├── The Problem: Why Current Tools Hit a Ceiling
│   │   ├── Traditional AI Coding Tools (limitations)
│   │   └── Codebolt (advantages)
│   ├── Coordination Modes: Four Ways to Coordinate
│   │   ├── Parallel Agents
│   │   ├── Sub-Agents
│   │   ├── Orchestrator
│   │   └── Stigmergy Swarms
│   ├── Platform: Everything You Need
│   │   ├── Agent Management
│   │   ├── Job Coordination
│   │   ├── Planning
│   │   ├── Review & Merge
│   │   ├── Communication
│   │   └── Observability
│   ├── Scale: Linear Scaling to 200+ Agents
│   ├── Your Role: You're a Swarm Member, Not an Observer
│   ├── Use Case: Overnight Development
│   └── CTA: Experience the Paradigm Shift
│
├── features/
│   ├── index.html (Features Overview)
│   │   ├── Hero: 46 Panels. 93 Services.
│   │   ├── Feature Categories
│   │   │   ├── Agent Management
│   │   │   ├── Job Coordination
│   │   │   ├── Planning & Whiteboard
│   │   │   ├── Review & Merge
│   │   │   ├── Communication
│   │   │   └── Observability
│   │   └── Deep Dive: 46 Specialized Panels
│   │       ├── Agent Panels
│   │       ├── Coordination Panels
│   │       ├── Memory Panels
│   │       └── Communication Panels
│   │
│   ├── agent-management.html
│   │   ├── Hero: Agent Management
│   │   ├── Organization: Swarms, Teams, Roles
│   │   │   ├── Swarm Creation
│   │   │   ├── Teams
│   │   │   ├── Roles
│   │   │   └── Vacancies
│   │   ├── Creation: Visual Agent Builder
│   │   │   ├── Visual Flow Design
│   │   │   └── Code-Based Agents
│   │   ├── Monitoring: Real-Time Heatmaps
│   │   │   ├── Working (status)
│   │   │   ├── Idle (status)
│   │   │   ├── Error (status)
│   │   │   └── Blocked (status)
│   │   └── Lifecycle: Spawn & Termination
│   │
│   ├── job-coordination.html
│   │   ├── Hero: Job Coordination
│   │   ├── Jobs Panel: The Work Unit
│   │   │   └── Lifecycle: Created → Available → Claimed → In Review → Done
│   │   ├── Fair Distribution: Locking & Bidding
│   │   │   ├── Exclusive Locking
│   │   │   ├── Reputation-Based Bidding
│   │   │   └── Timeout & Reclaim
│   │   ├── Dependencies: Blockers & Task Not Ready
│   │   │   ├── Blockers
│   │   │   ├── Dependency Graph
│   │   │   └── task_not_ready Pheromone
│   │   ├── Decomposition: Split Proposals
│   │   └── Conflict Prevention: File Update Intents
│   │
│   ├── planning.html
│   │   ├── Hero: Planning & Whiteboard
│   │   ├── Roadmap Panel: Strategic Planning
│   │   │   ├── Milestones
│   │   │   ├── Epics
│   │   │   └── Linked to Memory
│   │   ├── Specs Panel: Detailed Specifications
│   │   │   ├── Rich Specifications
│   │   │   ├── Acceptance Criteria
│   │   │   └── Version History
│   │   ├── Execution: Action Plans
│   │   ├── Visual Planning: Integrated Whiteboard
│   │   │   ├── Freeform Canvas
│   │   │   ├── Linked Elements
│   │   │   └── Agent-Readable
│   │   └── Visualization: Codemap
│   │       ├── Dependency Graph
│   │       ├── Activity Heatmap
│   │       └── Agent Overlay
│   │
│   ├── review-merge.html
│   │   ├── Hero: Review & Merge
│   │   ├── Workflow: Merge Request Lifecycle
│   │   │   └── Draft → Review → Approved → Merged (or Rejected)
│   │   ├── Collective Review: Multi-Reviewer Deliberation
│   │   │   ├── Diff Analysis
│   │   │   ├── Inline Feedback
│   │   │   └── Reputation-Weighted Voting
│   │   ├── Merge Integration: Automatic Conflict Resolution
│   │   │   ├── Conflict Detection
│   │   │   ├── Resolution Proposals
│   │   │   └── Human Escalation
│   │   └── Multi-Environment: Cross-Environment Reviews
│   │       ├── Environment Isolation
│   │       ├── Environment Diff
│   │       └── Cross-Env Merge
│   │
│   ├── communication.html
│   │   ├── Hero: Communication
│   │   ├── Mail Panel: Slack-Like Messaging
│   │   │   ├── Direct Messages
│   │   │   ├── Threaded Conversations
│   │   │   └── Escalation Tiers
│   │   ├── Collective Decisions: Deliberations
│   │   │   ├── Voting
│   │   │   ├── Feedback
│   │   │   ├── Q&A
│   │   │   └── Shared List
│   │   └── Calendar Panel: Scheduling & Reminders
│   │       ├── Events
│   │       ├── Reminders
│   │       └── RSVP
│   │
│   └── observability.html
│       ├── Hero: No Black Boxes
│       ├── Debug Panel: See Everything
│       │   ├── Request Logs
│       │   ├── Response Logs
│       │   └── Timing Data
│       ├── Compliance: Complete Audit Trails
│       │   ├── Action Logs
│       │   ├── Causality Chains
│       │   └── Search & Filter
│       └── Time Travel: Execution Replay
│           ├── Session Recording
│           ├── Step-by-Step Replay
│           └── Branching
│
├── concepts/
│   ├── index.html (Concepts Overview)
│   │   ├── Hero: Think Different About Multi-Agent Systems
│   │   ├── Foundation: Three Paradigm Shifts
│   │   │   ├── Stigmergy Coordination
│   │   │   ├── Externalized Memory
│   │   │   └── Human Participation
│   │   ├── Advanced: Going Deeper
│   │   │   ├── Multi-Agent Modes
│   │   │   ├── Emergent Governance
│   │   │   └── Scaling Architecture
│   │   └── Quote: The Codebolt Philosophy
│   │
│   ├── stigmergy.html
│   │   ├── Hero: The Environment IS the Coordination
│   │   ├── The Concept: What is Stigmergy?
│   │   ├── The Problem with Alternatives: Why Not Direct Communication?
│   │   │   ├── O(n²) Overhead
│   │   │   ├── Meaningless Messages
│   │   │   └── Overwhelming
│   │   ├── Implementation: 9 Pheromone Types
│   │   │   ├── Permanent (available, request_split, files_blocked, reviewadded)
│   │   │   └── Temporal (importance, workingonit, task_not_ready, saturation, takeup_interest)
│   │   ├── Lifecycle: Pheromone Lifecycle
│   │   │   └── Deposit → Decay → Aggregate → Action
│   │   └── Parallels: Stigmergy in Nature and Society
│   │       ├── Ant Colonies
│   │       ├── Markets
│   │       ├── Institutions
│   │       └── Biology
│   │
│   ├── externalized-memory.html
│   │   ├── Hero: Memory Belongs to the Environment
│   │   ├── The Problem: Knowledge Death
│   │   ├── The Solution: Externalized Memory
│   │   │   └── 3-Layer Memoria Architecture
│   │   │       ├── Logical Storage Layer
│   │   │       ├── Memory Orchestration Layer
│   │   │       └── Context Assembly Layer
│   │   ├── Storage: 5 Memory Types
│   │   │   ├── Persistent
│   │   │   ├── Vector DB
│   │   │   ├── Knowledge Graph
│   │   │   ├── KV Store
│   │   │   └── Episodic
│   │   ├── Intelligence: Context Assembly Engine
│   │   └── Results: 87% Knowledge Survival
│   │
│   ├── multi-agent-modes.html
│   │   ├── Hero: Four Ways to Coordinate Agents
│   │   ├── Four Modes
│   │   │   ├── Parallel Agents
│   │   │   ├── Sub-Agents
│   │   │   ├── Orchestrator Mode
│   │   │   └── Stigmergy Swarms
│   │   ├── Comparison: When to Use What
│   │   └── Hybrid: Combine Modes
│   │
│   └── human-participation.html
│       ├── Hero: You're a Swarm Member, Not Just an Observer
│       ├── Participation: Same Tools, Same Influence
│       │   ├── Deposit Pheromones
│       │   ├── Send Mail
│       │   ├── Participate in Deliberations
│       │   └── Create and Claim Jobs
│       ├── Evolution: Your Role Evolves
│       │   ├── Phase 1: Coder
│       │   ├── Phase 2: Director
│       │   └── Phase 3: Governor
│       ├── Control: 6 Levels of Control
│       │   ├── Passive Surfacing
│       │   ├── Request Priority
│       │   ├── Direct Task
│       │   ├── Request Termination
│       │   ├── Direct Halt
│       │   └── Policy Change
│       └── Challenge: The Accountability Gap
│
├── use-cases.html
│   ├── Hero: What You Can Build With Swarms
│   ├── Use Cases Grid
│   │   ├── Overnight Development (featured)
│   │   ├── Parallel Feature Development
│   │   ├── Automated Code Review
│   │   ├── Documentation Generation
│   │   ├── Test Generation & Maintenance
│   │   ├── Large-Scale Refactoring
│   │   └── Long-Horizon Projects
│   └── Example: A Day With Codebolt
│       ├── 9:00 AM - Review overnight PRs
│       ├── 10:00 AM - Create new feature spec
│       ├── 11:00 AM - Pair with agents
│       ├── 3:00 PM - Handle escalations
│       └── 6:00 PM - Launch overnight swarm
│
├── pricing.html
│   ├── Hero: Free to Start. Scale as You Grow.
│   ├── Pricing Cards
│   │   ├── Free (10 agents, core features)
│   │   ├── Pro $49/mo (100 agents, advanced features)
│   │   └── Enterprise (200+ agents, self-hosted)
│   └── FAQ: Frequently Asked
│       ├── Do I need to pay for each agent?
│       ├── Can I use my own LLM API keys?
│       ├── What counts as a "concurrent agent"?
│       └── Can I self-host?
│
├── download.html
│   ├── Hero: Download Codebolt
│   ├── Download Options
│   │   ├── macOS (Apple Silicon & Intel)
│   │   ├── Windows (Windows 10/11)
│   │   └── Linux (Ubuntu, Debian, Fedora)
│   ├── Getting Started: Up and Running in 5 Minutes
│   │   └── Download → Install → Configure API → Launch Swarm
│   └── Requirements: System Requirements
│       ├── OS
│       ├── RAM
│       ├── Storage
│       └── Network
│
├── docs.html
│   ├── Hero: Documentation
│   ├── Doc Categories
│   │   ├── Getting Started (featured)
│   │   │   ├── Installation Guide
│   │   │   ├── Your First Swarm
│   │   │   ├── Basic Concepts
│   │   │   └── Configuration
│   │   ├── Agent Development
│   │   │   ├── Agent Architecture
│   │   │   ├── Visual Agent Builder
│   │   │   ├── SDK Reference
│   │   │   └── Custom Actions
│   │   ├── Coordination
│   │   │   ├── Pheromone Types
│   │   │   ├── Job Coordination
│   │   │   └── Deliberations
│   │   ├── Memory
│   │   │   ├── Memory Layers
│   │   │   ├── Context Assembly
│   │   │   └── Knowledge Graph
│   │   └── API Reference
│   │       ├── codebolt.fs
│   │       ├── codebolt.jobs
│   │       └── codebolt.memory
│   └── Community: Additional Resources
│       ├── Discord Community
│       ├── Video Tutorials
│       └── Example Projects
│
├── enterprise.html
│   ├── Hero: Scale Development Across Your Organization
│   ├── Enterprise Features
│   │   ├── Unlimited Scale
│   │   ├── Self-Hosted
│   │   ├── SSO / SAML
│   │   ├── Audit Logs
│   │   ├── RBAC
│   │   └── Custom Integrations
│   ├── Security: Enterprise-Grade Security
│   │   ├── SOC 2 Type II
│   │   ├── Data Encryption
│   │   └── VPC Deployment
│   └── Support: Dedicated Enterprise Support
│       ├── 24/7 Support
│       ├── Dedicated CSM
│       └── Custom Training
│
└── about.html
    ├── Hero: Building the Future of Software Development
    ├── Mission: Design Smarter Environments
    ├── Philosophy: Our Principles
    │   ├── Stigmergy Over Orchestration
    │   ├── Environment-First Memory
    │   ├── Humans as Participants
    │   ├── No Black Boxes
    │   ├── Emergent Governance
    │   └── Linear Scaling
    └── Contact: Get in Touch
        ├── Email
        ├── Discord
        └── Twitter
```

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      GLOBAL NAV                              │
│  Logo | Features ▼ | Concepts ▼ | Use Cases | Pricing | Download │
└─────────────────────────────────────────────────────────────┘

Features Dropdown:           Concepts Dropdown:
├── Agent Management        ├── Stigmergy
├── Job Coordination        ├── Externalized Memory
├── Planning & Whiteboard   ├── Multi-Agent Modes
├── Review & Merge          └── Human Participation
├── Communication
└── Observability
```

## Page Flow Summary

```
Home ──┬── Features Hub ──┬── Agent Management
       │                  ├── Job Coordination → Planning
       │                  ├── Planning → Review & Merge
       │                  ├── Review & Merge → Communication
       │                  ├── Communication → Observability
       │                  └── Observability → Scaling
       │
       ├── Concepts Hub ──┬── Stigmergy → Externalized Memory
       │                  ├── Externalized Memory → Human Participation
       │                  ├── Human Participation → Scaling
       │                  └── Multi-Agent Modes → Stigmergy
       │
       ├── Use Cases
       ├── Pricing ────────── Enterprise
       ├── Download ─────────── Docs
       ├── Docs
       ├── Enterprise
       └── About
```
