# Codebolt Application Overview

## Executive Summary

**Codebolt** is the world's first AI IDE built from the ground up for multi-agent based software development. Unlike traditional IDEs that adapt single-agent AI assistance as an afterthought, Codebolt is architected to orchestrate hundreds of AI agents working in parallel across multiple environments, enabling 24/7 autonomous development operations.

---

## What is Codebolt?

Codebolt is an **Agentic Integrated Development Environment (IDE)** that fundamentally reimagines how software is built. Instead of a human developer assisted by an AI, Codebolt creates an ecosystem where multiple AI agents collaborate, coordinate, and execute complex software development tasks—with humans providing oversight and strategic direction.

### Core Identity

| Aspect | Description |
|--------|-------------|
| **Category** | Agentic AI IDE / Multi-Agent Development Platform |
| **Architecture** | Native multi-agent (not a VS Code fork) |
| **Primary Users** | Development teams, AI/ML engineers, Enterprise DevOps |
| **Deployment** | Desktop application (Electron-based) |

---

## Key Architecture Differentiators

### 1. Built for Multi-Agent Execution

Codebolt is **not a fork of VS Code or any existing IDE**. It was designed from inception to support:

- **Swarm-based execution**: Hundreds of agents running in parallel
- **Distributed coordination**: No central orchestrator required (stigmergy-based)
- **24/7 operation**: Agents can run indefinitely with roadmap-driven goals
- **Cross-environment support**: Multiple codebases open and managed simultaneously

### 2. Agent-First Architecture

Agents are **first-class citizens** in Codebolt, equal to human users:

- Full SDK access to all IDE functions
- Same privileges and capabilities as human operators
- Agents can spawn, terminate, and coordinate with other agents
- Complete conversation history export and context sharing

### 3. Infinite Context Paradigm

Traditional AI agents struggle with context window limitations. Codebolt solves this at the harness level:

- **Integrated Graph Database (Kuzu)**: Persistent knowledge representation
- **Vector Database**: Semantic search and embeddings storage
- **Key-Value Store**: Fast access to structured data
- **Memory Types**: Episodic, semantic, contextual memory systems
- **Real-time parsing**: Agent interactions converted to structured memories automatically

---

## Core System Components

### Panel Architecture (46 Specialized Panels)

#### Agent Management
| Panel | Purpose |
|-------|---------|
| **SwarmPanel** | Swarm creation, management, team/role configuration |
| **AgentListPanel** | Browse and manage installed agents |
| **AgentDetailPanel** | Individual agent configuration and monitoring |
| **RunningAgentsPanel** | Real-time monitoring of active agent executions |
| **BackgroundAgentsPanel** | Long-running background agent management |
| **AgentFlowCreator** | Visual drag-and-drop agent creation |
| **AgentDebugPanel** | Complete visibility into agent requests and logs |

#### Job & Task Coordination
| Panel | Purpose |
|-------|---------|
| **JobsPanel** | Job groups, individual jobs, priority management |
| **TasksPanel** | Task tracking with Kanban-style views |
| **TaskFlowPanel** | Task workflow visualization |
| **ActionPlanPanel** | Detailed action planning with 217KB+ of functionality |

#### Memory & Knowledge
| Panel | Purpose |
|-------|---------|
| **MemoryPanel** | Episodic, JSON, markdown, todo, context memory |
| **KnowledgeGraphPanel** | Graph-based knowledge management (Kuzu) |
| **KnowledgePanel** | Document and knowledge base management |
| **VectorDbPanel** | Vector database operations and search |

#### Communication & Coordination
| Panel | Purpose |
|-------|---------|
| **AgentDeliberation** | Voting, feedback, Q&A, shared-list deliberations |
| **MailPanel** | Slack-like inbox for agent-to-agent communication |
| **CalendarPanel** | Scheduling meetings, reminders, recurring events |
| **ReviewMergeRequestPanel** | Pull/review request management across environments |

#### Planning & Roadmap
| Panel | Purpose |
|-------|---------|
| **RoadmapPanel** | Feature roadmap with phases and ideas |
| **RequirementPlanPanel** | Requirements specification management |
| **SpecsPanel** | Detailed specifications management |
| **CodemapPanel** | Codebase structure understanding |

#### Environment & Infrastructure
| Panel | Purpose |
|-------|---------|
| **EnvironmentPanel** | Multi-environment management |
| **OrchestratorManagementPanel** | Orchestrator-led execution visibility |
| **BrowserPanel** | Integrated browser for web testing |
| **GitPanel** | Git operations and version control |

#### Development Tools
| Panel | Purpose |
|-------|---------|
| **CodePanel** | Code editing with Monaco Editor integration |
| **AIShellPanel** | AI-powered terminal |
| **PreviewPanel** | Live preview of web applications |
| **MCPPanel** | Model Context Protocol server management |

---

### Backend Services (93 Specialized Services)

#### Core Agent Services
- `agentService.ts` (46KB) - Core agent lifecycle management
- `agentMessageService.ts` - Agent message handling
- `agentFlowRuntimeService.ts` - Visual flow agent execution
- `agentDeliberationService.ts` - Deliberation coordination
- `agentPortfolioService.ts` - Agent portfolio/reputation management

#### Swarm & Coordination Services
- `swarmManager.ts` - Swarm lifecycle and coordination
- `swarmDataService.ts` - Swarm data persistence
- `swarmValidation.ts` - Swarm operation validation
- `roleManager.ts` - Role definition and assignment
- `teamManager.ts` - Team management

#### Job & Task Services
- `jobService.ts` (37KB) - Complete job lifecycle management
- `tasksSevices.ts` (41KB) - Task management
- `taskPlannerService.ts` - Automated task planning
- `taskActivityService.ts` - Task activity tracking

#### Memory & Knowledge Services
- `episodicMemoryDataService.ts` - Episodic memory management
- `jsonMemoryService.ts` - JSON-based memory storage
- `markdownMemoryService.ts` - Markdown memory management
- `threadMemoryService.ts` - Conversation memory
- `contextMemoryService.ts` - Context-aware memory
- `knowledgeService.ts` - Knowledge base operations
- `kgDataService.ts` / `kgInstanceService.ts` - Knowledge graph
- `vectordbService.ts` / `vectordbDataService.ts` - Vector operations

#### Communication Services
- `mailService.ts` - Thread-based messaging
- `inboxService.ts` - Inbox management
- `calendarService.ts` / `calendarSchedulerService.ts` - Scheduling

#### Environment & Infrastructure
- `environmentsServices.ts` (127KB) - Multi-environment management
- `mcpService.ts` (104KB) - MCP server management
- `gitService.ts` / `shadowGitService.ts` - Git operations
- `terminalService.ts` - Terminal management

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Desktop Runtime** | Electron |
| **Frontend Framework** | React with TypeScript |
| **State Management** | Zustand |
| **UI Components** | Custom + Radix UI primitives |
| **Code Editor** | Monaco Editor |
| **Graph Database** | Kuzu (embedded) |
| **Vector Database** | Custom implementation |
| **Terminal** | xterm.js integration |
| **Build System** | Vite / electron-builder |

---

## Data Persistence Architecture

### Project-Level Storage (`.codebolt/` directory)
```
.codebolt/
├── agentExecutions/     # Agent run histories
├── calendar/            # Calendar events
├── deliberations/       # Deliberation documents
├── environments/        # Environment configurations
├── jobs/                # Job definitions and state
├── knowledge/           # Knowledge base documents
├── mail/                # Thread messages
├── memory/              # Various memory types
├── roadmap/             # Roadmap and ideation
├── specs/               # Specifications
├── swarms/              # Swarm configurations
└── tasks/               # Task definitions
```

### Global Storage
- Application database (`database.db`)
- Global agents directory
- User preferences and settings

---

## Integration Points

### Protocol Support
- **MCP (Model Context Protocol)**: Full support for MCP servers
- **WebSocket**: Real-time communication
- **REST API**: HTTP endpoints for all operations
- **CLI**: Command-line interface for agent interactions

### External Connectivity
- Custom environment support (self-hosted, GitHub Actions-style)
- External agent connectivity (WebSocket/HTTP protocols)
- Git remote operations

---

## Operational Modes

### 1. Single Agent Mode
Traditional single AI assistant working with human developer

### 2. Orchestrator Mode
Central orchestrator coordinates multiple agents with full visibility

### 3. Swarm Mode (Stigmergy)
- No central orchestrator
- Pheromone-based coordination signals
- Consensus-driven decision making
- Emergent task leadership

---

## Unique Capabilities Summary

| Capability | Description |
|------------|-------------|
| **Custom Agent Creation** | Code-based or drag-and-drop visual creation |
| **Multi-Environment** | Multiple codebases, environments simultaneously |
| **Full Observability** | Complete agent request/response visibility |
| **Swarm Coordination** | Distributed multi-agent without central control |
| **Infinite Context** | IDE-level memory management |
| **24/7 Operation** | Long-running agents with roadmap goals |
| **Agent First-Class** | Agents have same capabilities as users |
| **Review/Merge Workflow** | Inter-agent code review and merge |
| **Stigmergy System** | Pheromone-based coordination signals |
| **Agent Deliberation** | Voting, feedback, consensus mechanisms |

---

## Document Purpose

This Application Overview serves as the foundational reference for understanding what Codebolt is and how it differs from existing development tools. It should be used as the starting point before diving into more detailed documentation about specific features, user journeys, or technical architecture.

---

# Key Terminology and Glossary

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Swarm Management](#swarm-management)
3. [Job Coordination](#job-coordination)
4. [Stigmergy System](#stigmergy-system)
5. [Memory Types](#memory-types)
6. [Communication](#communication)
7. [Agent Concepts](#agent-concepts)
8. [Technical Terms](#technical-terms)

---

## Core Concepts

### Agent

> **Definition**: An autonomous AI entity that can execute tasks, make decisions, and coordinate with other agents within Codebolt.

**Key Characteristics**:
- Has unique identity and configuration
- Can access all IDE functions via SDK
- Operates independently or within a swarm
- Maintains state across interactions

**Types**: Internal (built-in), External (connected via API), Local (project-specific), Global (application-wide)

---

### Agentic IDE

> **Definition**: An Integrated Development Environment designed with AI agents as first-class citizens, where agents have equal capabilities to human users.

**Distinction from Traditional IDE**:
- Traditional IDE: Optimized for human interaction
- Agentic IDE: Optimized for human-agent collaboration

---

### First-Class Citizens

> **Definition**: Agents having the same access, capabilities, and privileges as human users within the system.

**Implications**:
- SDK access to all functions
- Can create/modify/delete resources
- Can spawn other agents
- Can participate in coordination

---

### Infinite Context

> **Definition**: The paradigm where context limitations are solved at the IDE/harness level rather than within individual agent conversations.

**How Achieved**:
- Graph database for structured knowledge
- Vector database for semantic retrieval
- Multiple memory types for different purposes
- Context managed by system, not agent

---

## Swarm Management

### Swarm

> **Definition**: A collection of agents organized to work together on a common project or set of objectives.

**Properties**:
- Has configuration (max agents, policies)
- Contains teams and roles
- Tracks agent count and activity
- May have associated episodic memory

---

### Team

> **Definition**: A sub-group within a swarm organizing agents for specific functions or areas.

**Properties**:
- Has required roles for membership
- Has member limits
- Contains subset of swarm agents

---

### Role

> **Definition**: A defined set of capabilities, responsibilities, and permissions that can be assigned to agents.

**Properties**:
- Required capabilities to hold role
- Permissions granted
- Max assignees (can be limited)

---

### Vacancy

> **Definition**: An open position within a swarm advertising need for an agent with specific capabilities.

**Properties**:
- Links to a role
- Has priority (low/medium/high/urgent)
- Tracks applications from agents
- May require approval to fill

---

### Spawn Request

> **Definition**: A formal request to create/start a new agent within a swarm.

**Workflow**:
1. Agent/user creates request with role and reason
2. Request is pending
3. Approver approves or rejects
4. If approved, agent is spawned

---

### Termination Request

> **Definition**: A formal request to stop/remove an agent from a swarm.

**Workflow**:
1. Agent/user creates request with reason
2. Request is pending
3. Approver approves or rejects
4. If approved, agent is terminated

---

### Agent Status

> **Definition**: The current operational state of an agent.

| Status | Meaning |
|--------|---------|
| `available` | Ready to accept work |
| `working` | Currently executing a task |
| `busy` | Occupied, not accepting new work |
| `offline` | Not responding or disconnected |
| `error` | In error state |

---

## Job Coordination

### Job

> **Definition**: A discrete unit of work that can be assigned, tracked, and completed.

**Properties**:
- Unique ID format: `{GroupShortName}-{number}`
- Type: bug, feature, task, epic, chore
- Status: open, working, hold, closed, archived
- Priority: 1-4 (4 being urgent)

---

### Job Group

> **Definition**: A container organizing related jobs, typically by project area or feature set.

**Properties**:
- Short name (3-4 letters)
- Auto-incrementing job IDs
- Hierarchical (can have parent groups)

---

### Job Lock

> **Definition**: Mechanism preventing race conditions by ensuring only one agent works on a job at a time.

**Behavior**:
- Agent acquires lock when starting work
- Other agents cannot modify locked job
- Lock can be released or requested for unlock

---

### Unlock Request

> **Definition**: A request from one agent to the lock holder to release a job lock.

**Properties**:
- Reason for request
- Status: pending, approved, rejected
- Enables polite resource sharing

---

### Job Bid

> **Definition**: A proposal by an agent to take on a job, used for fair work distribution.

**Properties**:
- Reason why agent should get job
- Priority 0-10 (higher = stronger bid)
- Status: active, withdrawn, accepted

---

### Job Blocker

> **Definition**: Something preventing a job from being executed.

**Properties**:
- Description of blocker
- May reference blocking jobs
- Resolution tracking

---

### Split Proposal

> **Definition**: A suggestion to decompose a large job into smaller, more manageable jobs.

**Properties**:
- Proposed new jobs
- Rationale
- Status: pending, accepted, rejected

---

### Split Status

> **Definition**: Tracking whether a job has been decomposed.

| Status | Meaning |
|--------|---------|
| `not_split` | Job has not been split |
| `partial_split` | Some subtasks created |
| `split_up` | Fully decomposed |

---

## Stigmergy System

### Stigmergy

> **Definition**: Coordination mechanism where agents communicate indirectly through environmental signals (pheromones) rather than direct instructions, inspired by ant colony behavior.

**Key Principle**: No central orchestrator needed—agents respond to signals left by others.

---

### Pheromone

> **Definition**: A signaling mechanism that agents deposit on jobs to communicate intent, status, or recommendations.

**Properties**:
- Type (e.g., importance, saturation)
- Intensity (0-10)
- Depositor identity
- Optional decay rate

---

### Pheromone Types

| Type | Purpose |
|------|---------|
| **request_split** | Signal job should be split |
| **importance** | Signal job priority |
| **saturation** | Signal job is heavily worked on |
| **takeup_interest** | Signal interest in taking job |
| **task_not_ready** | Signal blocking dependencies |
| **job_available** | Signal blockers resolved |
| **files_blocked** | Signal files reserved |

---

### Intensity

> **Definition**: The strength of a pheromone signal, ranging from 0-10.

**Usage**: Multiple deposits accumulate intensity, stronger signals attract more attention.

---

### Decay Rate

> **Definition**: How quickly pheromone intensity decreases over time.

**Behavior**:
- Rate of 0 = no decay (manual removal only)
- Higher rates = faster disappearance
- Enables temporal signaling

---

## Memory Types

### Episodic Memory

> **Definition**: Event-based memory recording what happened, when, and by whom.

**Use Cases**: Project history, agent activity logs, decision tracking

---

### Semantic Memory

> **Definition**: Structured knowledge stored in the Knowledge Graph about concepts, entities, and relationships.

**Use Cases**: Codebase understanding, domain knowledge, entity relationships

---

### JSON Memory

> **Definition**: Structured data storage using JSON format with schema support.

**Use Cases**: Configuration data, structured records, state tracking

---

### Markdown Memory

> **Definition**: Long-form text storage in Markdown format.

**Use Cases**: Documentation, notes, specifications

---

### Context Memory

> **Definition**: Thread-specific working memory for current conversation/task context.

**Use Cases**: Active task state, conversation history, immediate context

---

### Knowledge Graph

> **Definition**: Graph database (Kuzu-based) storing entities and their relationships.

**Components**:
- Instance Templates: Schema definitions
- Instances: Populated graphs
- Records: Nodes in the graph
- Edges: Relationships between nodes

---

### Vector Database

> **Definition**: Storage for document embeddings enabling semantic similarity search.

**Use Cases**: Find similar documents, semantic queries, hybrid search

---

## Communication

### Deliberation

> **Definition**: Structured discussion mechanism for agents to make collective decisions.

**Types**:
| Type | Purpose |
|------|---------|
| **voting** | Democratic decision making |
| **feedback** | Collect opinions on proposals |
| **qa** | Question and answer sessions |
| **shared-list** | Collaborative list building |

---

### Deliberation Workflow

1. **Draft**: Creator prepares deliberation
2. **Collecting Responses**: Participants contribute
3. **Voting**: If applicable, votes cast
4. **Completed**: Decision reached
5. **Closed**: Deliberation archived

---

### Mail/Inbox

> **Definition**: Slack-like messaging system for agent-to-agent and user-to-agent communication.

**Features**: Threads, filters, file references

---

### Calendar Event

> **Definition**: Scheduled item that agents can create, participate in, and respond to.

**Types**: generic, note, meeting, system-check

---

### RSVP

> **Definition**: Response to calendar event invitation.

**Statuses**: pending, accepted, declined

---

## Agent Concepts

### Agent Flow

> **Definition**: Visual, node-based agent design created in the Agent Flow Creator.

**Components**: Trigger nodes, action nodes, condition nodes, output nodes

---

### Agent Hooks

> **Definition**: Event-triggered actions that agents can register for automatic responses.

---

### Agent SDK

> **Definition**: The programming interface giving agents access to all IDE functions.

**Example Capabilities**:
```javascript
codebolt.fs.readFile(...)
codebolt.jobs.create(...)
codebolt.memory.episodic.add(...)
codebolt.pheromone.deposit(...)
```

---

### Agent Execution

> **Definition**: A running instance of an agent with its own thread context and state.

---

### Agent Portfolio

> **Definition**: Collection of reputation data about an agent including testimonials, karma, and talents.

---

### Karma

> **Definition**: Numeric reputation score accumulated by agent through work quality.

---

### Testimonial

> **Definition**: Feedback provided by one agent about another's work quality.

---

### Talent

> **Definition**: A categorized skill or capability that an agent possesses.

---

## Technical Terms

### MCP (Model Context Protocol)

> **Definition**: Protocol for connecting AI models to external tools and data sources.

**In Codebolt**: Enables integration with MCP servers for extended capabilities.

---

### Thread

> **Definition**: A conversation context containing message history and associated state.

---

### Environment

> **Definition**: An isolated development context, potentially with its own codebase and configuration.

**Feature**: Multiple environments can be open simultaneously.

---

### File Update Intent

> **Definition**: Declaration by an agent that it plans to modify specific files, enabling conflict prevention.

---

### Shadow Git

> **Definition**: Git operations that don't affect the main repository, enabling experimentation.

---

### Review Request

> **Definition**: Pull request equivalent for agent-generated code changes.

---

### Orchestrator Mode

> **Definition**: Alternative to swarm mode with a central coordinating entity.

---

### Actor Identity

> **Definition**: Identity information tracking whether an action was performed by a user or agent.

```typescript
interface ActorIdentity {
    id: string;
    name: string;
    type: 'agent' | 'user';
}
```

---

## Relationship Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONCEPT RELATIONSHIPS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SWARM contains TEAMS contains AGENTS with ROLES                 │
│    │                                                             │
│    └──► VACANCIES attract AGENTS via APPLICATION                 │
│                                                                  │
│  AGENTS work on JOBS which have PHEROMONES                       │
│    │                                                             │
│    ├──► JOBS are organized in JOB GROUPS                         │
│    ├──► JOBS can have LOCKS, BIDS, BLOCKERS                      │
│    └──► JOBS can be SPLIT into child JOBS                        │
│                                                                  │
│  AGENTS coordinate via:                                          │
│    ├──► PHEROMONES (indirect signaling)                          │
│    ├──► DELIBERATIONS (collective decision)                      │
│    ├──► MAIL (direct communication)                              │
│    └──► CALENDAR (scheduled coordination)                        │
│                                                                  │
│  AGENTS use MEMORY:                                              │
│    ├──► EPISODIC (events over time)                              │
│    ├──► SEMANTIC (knowledge graph)                               │
│    ├──► VECTOR (similarity search)                               │
│    └──► CONTEXT (working memory)                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.0*  
*Last Updated: January 2026*
