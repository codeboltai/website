# Technical Architecture Overview

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Component Architecture](#component-architecture)
3. [Data Architecture](#data-architecture)
4. [Communication Architecture](#communication-architecture)
5. [Agent Execution Architecture](#agent-execution-architecture)
6. [Memory Architecture](#memory-architecture)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CODEBOLT SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        RENDERER PROCESS                              │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │    │
│  │  │ 46 Panels  │ │   Stores   │ │ Components │ │   Hooks    │       │    │
│  │  │ (React/TS) │ │  (Zustand) │ │ (UI Layer) │ │ (Business) │       │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                        │
│                              IPC Bridge                                      │
│                                     │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         MAIN PROCESS                                 │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │    │
│  │  │ 93 Services│ │ Controllers│ │   Routes   │ │  Sockets   │       │    │
│  │  │  (Logic)   │ │  (HTTP)    │ │  (REST)    │ │ (WebSocket)│       │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │    │
│  │                                                                     │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │    │
│  │  │  Database  │ │   Kuzu    │ │ Vector DB  │ │  File Sys  │       │    │
│  │  │  (SQLite)  │ │ (GraphDB) │ │ (Embeddings)│ │ (.codebolt)│       │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       AGENT RUNTIME (Workers)                        │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │    │
│  │  │  Agent 1   │ │  Agent 2   │ │  Agent N   │ │   ...      │       │    │
│  │  │  (Thread)  │ │  (Thread)  │ │  (Thread)  │ │            │       │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Desktop Shell** | Electron | Cross-platform desktop app |
| **Frontend** | React + TypeScript | UI components and logic |
| **State Management** | Zustand | Client-side state stores |
| **Code Editor** | Monaco Editor | Full-featured code editing |
| **Terminal** | xterm.js | Terminal emulation |
| **Backend** | Node.js | Server-side processing |
| **Database** | SQLite | Structured data persistence |
| **Graph Database** | Kuzu (embedded) | Knowledge graph storage |
| **Vector Storage** | Custom | Embedding/similarity search |
| **Build System** | Vite + electron-builder | Build and packaging |

---

## Component Architecture

### Frontend Architecture (Renderer)

```
src/renderer/
├── Pages/
│   └── Panels/                    # 46 Panel Components
│       ├── SwarmPanel/           
│       │   ├── SwarmDetailPanel.tsx
│       │   ├── SwarmManagementPanel.tsx
│       │   ├── TeamManagementPanel.tsx
│       │   └── ...
│       ├── JobsPanel/
│       ├── MemoryPanel/
│       ├── AgentDeliberation/
│       └── ...
├── stores/                        # Zustand State Stores
│   ├── swarmStore.ts
│   ├── jobStore.ts
│   ├── memoryStore.ts
│   └── ...
├── components/                    # Shared UI Components
│   ├── Dialog/
│   ├── Button/
│   └── ...
└── hooks/                         # Custom React Hooks
```

### Backend Architecture (Main)

```
src/main/server/
├── services/                      # 93 Service Modules
│   ├── swarmManager.ts           # Swarm coordination
│   ├── swarmDataService.ts       # Swarm persistence
│   ├── jobService.ts             # Job management (37KB)
│   ├── agentService.ts           # Agent lifecycle (46KB)
│   ├── environmentsServices.ts   # Multi-env (127KB)
│   ├── mcpService.ts             # MCP protocol (104KB)
│   └── ...
├── controllers/                   # HTTP Controllers
│   ├── swarmController.ts
│   ├── jobController.ts
│   └── ...
├── routes/                        # REST API Routes
│   ├── swarmRoutes.ts
│   ├── jobRoutes.ts
│   └── ...
├── sockets/                       # WebSocket Handlers
│   ├── swarmSocket.ts
│   ├── jobSocket.ts
│   └── ...
├── database/                      # Database Models
│   ├── migrations/
│   └── repositories/
├── cliLib/                        # CLI Tool Implementations
└── tools/                         # Agent Tools
```

---

## Data Architecture

### Storage Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE LAYERS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Application-Level (database.db - SQLite)                        │
│  ├── User preferences                                            │
│  ├── Global settings                                             │
│  ├── Application state                                           │
│  └── Agent registry                                              │
│                                                                  │
│  Project-Level (.codebolt/ directory)                            │
│  ├── agentExecutions/    # Agent run histories (JSON)            │
│  ├── calendar/           # Calendar events (JSON)                │
│  ├── deliberations/      # Deliberation documents (JSON)         │
│  ├── environments/       # Environment configs (JSON)            │
│  ├── jobs/               # Job definitions (JSON)                │
│  ├── knowledge/          # Knowledge docs                        │
│  ├── mail/               # Message threads (JSON)                │
│  ├── memory/             # Memory stores (JSON/MD)               │
│  ├── roadmap/            # Roadmap/ideation (JSON)               │
│  ├── specs/              # Specifications (JSON)                 │
│  ├── swarms/             # Swarm configs (JSON)                  │
│  ├── tasks/              # Task data (JSON)                      │
│  └── kg/                 # Knowledge graph (Kuzu files)          │
│                                                                  │
│  Graph Database (Kuzu)                                           │
│  ├── Instance templates                                          │
│  ├── Graph instances                                             │
│  ├── Nodes (records)                                             │
│  └── Edges (relationships)                                       │
│                                                                  │
│  Vector Database                                                 │
│  ├── Collections                                                 │
│  ├── Documents with embeddings                                   │
│  └── Metadata indices                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Models

#### Swarm Data Model
```typescript
interface SwarmData {
    id: string;
    name: string;
    description: string;
    configuration: SwarmConfiguration;
    createdAt: Date;
    lastActivity: Date;
    agentCount: number;
    teamCount: number;
    roleCount: number;
    vacancyCount: number;
    episodicMemoryId?: string;
}
```

#### Job Data Model
```typescript
interface Job {
    id: string;           // {GroupShortName}-{number}
    groupId: string;
    sequenceNumber: number;
    name: string;
    description?: string;
    type: JobType;
    status: JobStatus;
    priority?: JobPriority;
    assignees: string[];
    labels: string[];
    dependencies: JobDependency[];
    pheromones: Pheromone[];
    lock?: JobLock;
    bids?: JobBid[];
    blockers?: JobBlocker[];
    splitProposals?: JobSplitProposal[];
}
```

---

## Communication Architecture

### IPC Communication

```
┌─────────────┐     IPC Channels     ┌─────────────┐
│  Renderer   │◄─────────────────────►│    Main     │
│  Process    │                      │   Process   │
└─────────────┘                      └─────────────┘
      │                                    │
      │  • Window management               │
      │  • File dialogs                    │
      │  • System integration              │
      └────────────────────────────────────┘
```

### HTTP/REST API

```
Client Requests              Server Responses
─────────────────────────────────────────────
GET /api/swarms          →   List of swarms
POST /api/swarms         →   Created swarm
GET /api/jobs            →   List of jobs
POST /api/jobs           →   Created job
PATCH /api/jobs/:id      →   Updated job
DELETE /api/jobs/:id     →   Deleted confirmation
```

### WebSocket Events

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBSOCKET EVENT TYPES                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Swarm Events                                                    │
│  ├── swarm:created, swarm:updated, swarm:deleted                 │
│  ├── swarm:agent-joined, swarm:agent-left                        │
│  └── swarm:status-changed                                        │
│                                                                  │
│  Job Events                                                      │
│  ├── job:created, job:updated, job:deleted                       │
│  ├── job:locked, job:unlocked                                    │
│  └── job:pheromone-deposited                                     │
│                                                                  │
│  Agent Events                                                    │
│  ├── agent:started, agent:stopped, agent:error                   │
│  ├── agent:message, agent:tool-call                              │
│  └── agent:status-changed                                        │
│                                                                  │
│  Memory Events                                                   │
│  ├── memory:entry-added, memory:entry-updated                    │
│  └── memory:chunk-created                                        │
│                                                                  │
│  Calendar/Mail Events                                            │
│  ├── calendar:event-created, calendar:reminder                   │
│  └── mail:message-created, mail:thread-updated                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agent Execution Architecture

### Agent Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENT EXECUTION LIFECYCLE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. INITIALIZATION                                               │
│     ├── Load agent configuration                                 │
│     ├── Create thread context                                    │
│     ├── Initialize memory access                                 │
│     └── Register with swarm (if applicable)                      │
│                                                                  │
│  2. EXECUTION LOOP                                               │
│     ├── Receive task/message                                     │
│     ├── Query relevant memories                                  │
│     ├── Call LLM for reasoning                                   │
│     ├── Execute tool calls                                       │
│     ├── Update memories                                          │
│     └── Repeat until task complete                               │
│                                                                  │
│  3. COORDINATION                                                 │
│     ├── Check pheromone signals                                  │
│     ├── Participate in deliberations                             │
│     ├── Handle spawn/termination requests                        │
│     └── Communicate via mail/inbox                               │
│                                                                  │
│  4. TERMINATION                                                  │
│     ├── Complete current task                                    │
│     ├── Save conversation to memory                              │
│     ├── Update execution status                                  │
│     └── Deregister from swarm                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Execution Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        AGENT INSTANCE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐                                                 │
│  │   Agent     │ ← Configuration (codeboltagent.yaml)            │
│  │   Runtime   │                                                 │
│  └──────┬──────┘                                                 │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐        │
│  │    LLM      │◄────│   Message    │────►│   Tool      │        │
│  │  Provider   │     │   Handler    │     │  Executor   │        │
│  └─────────────┘     └─────────────┘     └─────────────┘        │
│         │                   │                   │                │
│         │                   │                   │                │
│         ▼                   ▼                   ▼                │
│  ┌──────────────────────────────────────────────────────┐       │
│  │                     SDK ACCESS                        │       │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │       │
│  │  │ Files  │ │Memory  │ │ Jobs   │ │Calendar│ ...    │       │
│  │  └────────┘ └────────┘ └────────┘ └────────┘        │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tool Ecosystem

| Category | Tools |
|----------|-------|
| **File System** | read, write, list, search, diff |
| **Code** | analyze, refactor, test, lint |
| **Git** | commit, branch, merge, diff |
| **Terminal** | execute, script, pipe |
| **Browser** | navigate, screenshot, interact |
| **Memory** | query, store, update, search |
| **Jobs** | create, update, lock, deposit_pheromone |
| **Communication** | mail, deliberate, calendar |

---

## Memory Architecture

### Memory System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                      MEMORY ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  EPISODIC MEMORY                                                 │
│  ├── Event-based storage                                         │
│  ├── Temporal indexing                                           │
│  ├── Actor tracking (who did what)                               │
│  └── Queryable by time range, actor, type                        │
│                                                                  │
│  SEMANTIC MEMORY (Knowledge Graph)                               │
│  ├── Entity definitions (record kinds)                           │
│  ├── Relationship types (edge types)                             │
│  ├── Cypher-like queries                                         │
│  └── View templates for common queries                           │
│                                                                  │
│  PROCEDURAL MEMORY (Agents)                                      │
│  ├── Agent configurations                                        │
│  ├── Flow definitions                                            │
│  └── Hook registrations                                          │
│                                                                  │
│  WORKING MEMORY (Context)                                        │
│  ├── Thread-specific context                                     │
│  ├── Message history                                             │
│  └── Active task state                                           │
│                                                                  │
│  VECTOR MEMORY                                                   │
│  ├── Document embeddings                                         │
│  ├── Semantic similarity search                                  │
│  └── Hybrid search (vector + keyword)                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Memory Access Pattern

```
Agent Query                    Memory System                Result
────────────────────────────────────────────────────────────────────
"What did I do last week?"  →  Episodic Memory   →  Event list
"How is auth implemented?"  →  Knowledge Graph   →  Entity graph
"Find security docs"        →  Vector DB         →  Relevant docs
"Current task context"      →  Working Memory    →  Thread state
```

---

## Performance Considerations

### Scalability Design

| Component | Strategy | Limit |
|-----------|----------|-------|
| **Concurrent Agents** | Worker threads | 100+ |
| **Memory Size** | Streaming, pagination | Unlimited |
| **Graph Queries** | Kuzu optimization | 1M+ nodes |
| **Vector Search** | HNSW indexing | 100K+ vectors |
| **WebSocket** | Connection pooling | 1000+ clients |

### Bottleneck Mitigation

| Bottleneck | Solution |
|------------|----------|
| LLM API latency | Parallel requests, caching |
| File I/O | Async operations, batching |
| Graph queries | Query optimization, caching |
| Memory | Streaming, lazy loading |

---

*Document Version: 1.0*  
*Last Updated: January 2026*
