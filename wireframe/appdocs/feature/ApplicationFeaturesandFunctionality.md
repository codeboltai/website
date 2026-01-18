# Codebolt Features and Functionality

## Table of Contents

1. [Multi-Agent Swarm System](#1-multi-agent-swarm-system)
2. [Agent Creation & Management](#2-agent-creation--management)
3. [Job Coordination System](#3-job-coordination-system)
4. [Stigmergy-Based Coordination](#4-stigmergy-based-coordination)
5. [Memory & Context Management](#5-memory--context-management)
6. [Communication & Collaboration](#6-communication--collaboration)
7. [Planning & Roadmap](#7-planning--roadmap)
8. [Environment Management](#8-environment-management)
9. [Observability & Debugging](#9-observability--debugging)
10. [Review & Merge System](#10-review--merge-system)
11. [Agent Economy & Reputation](#11-agent-economy--reputation)
12. [Orchestrator Mode](#12-orchestrator-mode)
13. [Development Tools](#13-development-tools)
14. [Integration & Protocol Support](#14-integration--protocol-support)

---

## 1. Multi-Agent Swarm System

### Overview
The Swarm System enables management of hundreds of AI agents working in parallel without a central orchestrator, inspired by biological swarm intelligence.

### Features

#### Swarm Management
| Feature | Description |
|---------|-------------|
| **Swarm Creation** | Create named swarms with custom configurations |
| **Agent Limits** | Configurable maximum agents per swarm |
| **External Agent Support** | Allow agents from external sources to join |
| **Auto-Offline Timeout** | Automatic detection of unresponsive agents |

#### Team Management
| Feature | Description |
|---------|-------------|
| **Team Creation** | Organize agents into functional teams |
| **Role Requirements** | Define required roles for team membership |
| **Member Limits** | Set maximum team size |
| **Team Metadata** | Custom metadata for team categorization |

#### Role System
| Feature | Description |
|---------|-------------|
| **Role Definitions** | Create roles with specific capabilities and permissions |
| **Capability Requirements** | Define skills needed for role assignment |
| **Max Assignees** | Limit how many agents can hold a role |
| **Self-Assignment Control** | Configure whether agents can self-assign roles |

#### Vacancy Management
| Feature | Description |
|---------|-------------|
| **Role Vacancies** | Post open positions within swarms |
| **Priority Levels** | Low, medium, high, urgent classifications |
| **Application System** | Agents can apply for vacancies |
| **Approval Workflow** | Optional approval required for vacancy filling |

### Agent Lifecycle

#### Spawn Requests
```typescript
interface SpawnRequest {
    id: string;
    swarmId: string;
    requestedRole: string;
    requirements: string;
    reason: string;
    requestedBy: ActorIdentity;  // agent or user
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: ActorIdentity;
    rejectionReason?: string;
}
```

#### Termination Requests
- Request-based agent termination
- Approval workflow for termination
- Termination registry for audit trail
- Reason tracking and documentation

#### Agent States
| State | Description |
|-------|-------------|
| `available` | Ready to accept work |
| `working` | Currently executing a task |
| `busy` | Occupied with high-priority work |
| `offline` | Not responding or disconnected |
| `error` | In error state |

---

## 2. Agent Creation & Management

### Code-Based Agent Creation
- Full SDK access to all IDE functions
- Custom agent logic in JavaScript/TypeScript
- Hook system for event-driven behavior
- Multi-LLM support within single agent

### Visual Agent Creation (Agent Flow)
- **Drag-and-drop interface** for agent workflow design
- **Visual node connections** for control flow
- **No-code agent building** for non-developers
- **Export to code** capability for advanced customization

### Agent Configuration
```yaml
# codeboltagent.yaml structure
name: "Agent Name"
description: "Agent purpose"
capabilities:
  - capability1
  - capability2
hooks:
  - event_type: "trigger"
    action: "handler"
```

### Agent Types
| Type | Description |
|------|-------------|
| **Local Agents** | Stored within project `.codebolt/agents/` |
| **Global Agents** | Stored in application user directory |
| **Remix Agents** | Cloned and customized from templates |
| **External Agents** | Connected via WebSocket/HTTP endpoints |

### Agent Hooks System
- Event-triggered actions
- Pre/post execution hooks
- Custom handler definitions
- Webhook integration support

---

## 3. Job Coordination System

### Job Structure
```typescript
interface Job {
    id: string;                    // Format: {GroupShortName}-{number}
    groupId: string;               // Parent job group
    name: string;
    description?: string;
    type: 'bug' | 'feature' | 'task' | 'epic' | 'chore';
    status: 'open' | 'working' | 'hold' | 'closed' | 'archived';
    priority?: 1 | 2 | 3 | 4;      // 4 = urgent
    assignees: string[];
    labels: string[];
    dependencies: JobDependency[];
    pheromones: Pheromone[];       // Stigmergy signals
    splitProposals?: JobSplitProposal[];
    lock?: JobLock;
    bids?: JobBid[];
    blockers?: JobBlocker[];
}
```

### Job Groups
- Container for related jobs
- 3-4 letter short names (e.g., "COD2")
- Hierarchical parent-child relationships
- Auto-incrementing sequence numbers

### Job Locking
| Feature | Description |
|---------|-------------|
| **Lock Acquisition** | Agent locks job when starting work |
| **Lock Holder Info** | Tracks who holds the lock and when |
| **Unlock Requests** | Other agents can request unlock |
| **Race Condition Prevention** | Prevents multiple agents overwriting |

### Job Bidding System
```typescript
interface JobBid {
    id: string;
    agentId: string;
    reason: string;          // Why this agent should get the job
    priority: number;        // 0-10, higher = stronger bid
    status: 'active' | 'withdrawn' | 'accepted';
}
```

### Job Split Proposals
- Agents can propose job splits
- Multiple proposals can compete
- Deliberation for best proposal selection
- Tracks discovery lineage (`discoveredFrom`)

### Split Status Tracking
| Status | Description |
|--------|-------------|
| `not_split` | Job has not been split |
| `partial_split` | Some subtasks created, more possible |
| `split_up` | Fully decomposed into subtasks |

### Job Blockers
- Track what prevents job execution
- Link to blocking jobs
- Resolution tracking
- Agent can add/resolve blockers

---

## 4. Stigmergy-Based Coordination

### What is Stigmergy?
Indirect coordination through environmental signals, inspired by ant colonies leaving pheromone trails. No central orchestrator needed.

### Pheromone Types

| Pheromone | Color | Purpose | Decay |
|-----------|-------|---------|-------|
| **request_split** | Purple | Signal job should be split | None |
| **importance** | Amber | Signal job priority | None |
| **saturation** | Red | Signal job is heavily worked on | Slow (0.05/hr) |
| **takeup_interest** | Emerald | Signal interest in job | Moderate (0.1/hr) |
| **task_not_ready** | Orange | Signal blocking dependencies | None |
| **job_available** | Green | Signal blockers resolved | Slow (0.05/hr) |
| **files_blocked** | Red | Signal files reserved by intent | None |

### Pheromone Structure
```typescript
interface Pheromone {
    type: string;           // Pheromone type name
    intensity: number;      // 0-10 strength
    depositedBy: string;    // Agent/User ID
    depositedAt: string;    // Timestamp
    expiresAt?: string;     // Optional expiration
    decayRate?: number;     // Override decay rate
}
```

### Coordination Behaviors

#### Task Prioritization
- High `importance` pheromone attracts agents
- Agents naturally gravitate to important tasks
- Multiple deposits increase intensity

#### Split Signaling
- `request_split` signals complex tasks
- Other agents can see and act on splits
- Deliberation refines split decisions

#### Resource Saturation
- `saturation` warns of crowded tasks
- Prevents too many agents on one job
- Decays to allow re-approach

#### Blocking Communication
- `task_not_ready` signals dependencies
- `job_available` signals resolution
- `files_blocked` for file-level coordination

---

## 5. Memory & Context Management

### The Infinite Context Paradigm
Codebolt solves context window limitations at the IDE/harness level, not inside agents.

### Memory Types

#### Episodic Memory
- Event-based memory with timestamps
- Tracks what happened, when, by whom
- Supports queries by time range
- Links to conversation threads

#### JSON Memory
- Structured JSON data storage
- Schema-defined documents
- Query and update operations
- Validation support

#### Markdown Memory
- Long-form text storage
- Documentation and notes
- Full-text search capability
- Version tracking

#### Context Memory
- Conversation-level context
- Thread-specific data
- Message context association
- Automatic context switching

#### Todo Memory
- Task tracking within memory
- Completion status
- Priority ordering
- Due date support

### Knowledge Graph (Kuzu-based)

#### Instance Templates
```typescript
interface KGInstanceTemplate {
    id: string;
    name: string;
    record_kinds: Record<string, RecordKindDefinition>;
    edge_types: Record<string, EdgeTypeDefinition>;
}
```

#### Supported Data Types
- STRING, INT64, INT32, INT16, INT8
- DOUBLE, FLOAT, BOOL
- DATE, TIMESTAMP, INTERVAL
- UUID, LIST, MAP, STRUCT

#### Graph Operations
- Create/query records (nodes)
- Create/query edges (relationships)
- View templates with Cypher-like queries
- Pattern matching and traversal

### Vector Database

#### Collections
- Namespace-based organization
- Configurable embedding models
- Dimension specification

#### Document Operations
- Insert documents with embeddings
- Metadata tagging
- Hybrid search (semantic + keyword)
- Metadata filtering

---

## 6. Communication & Collaboration

### Mail/Inbox System (Slack-like)

#### Features
- Thread-based conversations
- Agent-to-agent messaging
- User-to-agent communication
- File reference attachments
- Filters by thread type

#### Thread Types
- Direct messages
- Group threads
- System notifications
- Task-related discussions

### Agent Deliberations

#### Deliberation Types
| Type | Purpose |
|------|---------|
| **voting** | Democratic decision making |
| **feedback** | Collect opinions on proposals |
| **qa** | Question and answer sessions |
| **shared-list** | Collaborative list building |

#### Deliberation Workflow
1. Creator posts deliberation request
2. Participants submit responses
3. Voting phase (if applicable)
4. Winner selection or summary
5. Deliberation closes

#### Deliberation Structure
```typescript
interface Deliberation {
    id: string;
    type: DeliberationType;
    title: string;
    requestMessage: string;     // Rich text
    status: DeliberationStatus;
    participants: string[];
    responseCount: number;
    winnerId?: string;
    summary?: string;
}
```

### Calendar System

#### Event Types
| Type | Description |
|------|-------------|
| **generic** | General events |
| **note** | Time-stamped notes |
| **meeting** | Agent meetings with agenda |
| **system-check** | Automated check triggers |

#### Features
- RSVP system for meetings
- Recurring events (cron-based)
- Reminder notifications
- Swarm association
- Completion tracking

#### Participant Management
- Agents and users as participants
- Status tracking (pending/accepted/declined)
- Agent execution ID linking

---

## 7. Planning & Roadmap

### Action Plan System

#### Capabilities
- Detailed action planning (217KB+ of functionality)
- Flow-based visualization
- Block-based structure
- Integration with tasks

### Roadmap Management

#### Phases
```typescript
interface Phase {
    id: string;
    name: string;
    description: string;
    order: number;
    features: Feature[];
}
```

#### Features
```typescript
interface Feature {
    id: string;
    phaseId: string;
    title: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    difficulty: 'easy' | 'medium' | 'hard' | 'complex';
    priority: number;          // 1-5
    status: 'idea' | 'planned' | 'in-progress' | 'completed' | 'archived';
    linkedTaskId?: string;     // Connected to task system
    linkedThreadId?: string;   // Connected to chat
}
```

### Ideation Management

#### Idea Workflow
1. Idea submitted (by agent or user)
2. Review process
3. Accept or reject decision
4. Move to roadmap phase

#### Suggested Categories
- code, ui-ux, docs, security
- performance, devops, testing
- accessibility, other

### Specs Management
- Requirements specifications
- Detailed technical specs
- Version control
- Linking to tasks/features

### Codemap
- Visual codebase structure
- Agent-navigable code map
- Understanding large codebases
- Automatic generation support

---

## 8. Environment Management

### Multi-Environment Support

#### Capabilities
- Multiple environments simultaneously
- Cross-environment agent operations
- Environment-specific configurations
- File system isolation

### Environment Types
- Local development environments
- Remote/cloud environments
- Custom self-hosted (GitHub Actions-style)
- Container-based environments

### File Update Intents

#### Purpose
Prevent file conflicts in multi-agent scenarios.

```typescript
interface FileUpdateIntent {
    id: string;
    agentId: string;
    files: string[];           // Reserved file paths
    reason: string;
    status: 'active' | 'completed' | 'cancelled';
}
```

### Environment Diffs
- Track file changes per environment
- Visual diff viewing
- Change summary generation
- Merge support

### Shadow Git Service
- Git operations without affecting main repo
- Experimentation sandbox
- Branch isolation per agent
- Merge back capability

---

## 9. Observability & Debugging

### Agent Debug Panel
- Complete request/response visibility
- All tool calls logged
- Response inspection
- Error tracking

### Running Agents Panel
- Real-time agent execution monitoring
- Status indicators
- Log streaming
- Performance metrics

### Agent Execution History
- Persistent execution logs
- Conversation export
- Replay support
- Error analysis

### Full Visibility Features
| Feature | Description |
|---------|-------------|
| **Request Logging** | All API/tool calls recorded |
| **Response Logging** | Full responses captured |
| **Timing Data** | Execution duration tracking |
| **Error States** | Error capture with stack traces |
| **Message History** | Complete conversation threads |

---

## 10. Review & Merge System

### Pull Request Equivalent

#### Review Request Structure
```typescript
interface ReviewRequest {
    id: string;
    title: string;
    description: string;
    requestedBy: ActorIdentity;
    reviewers: ActorIdentity[];
    status: 'pending' | 'approved' | 'rejected' | 'merged';
    linkedJobs: string[];         // Associated job IDs
    changes: FileChange[];
    feedback: ReviewFeedback[];
}
```

### Workflow
1. Agent creates review request
2. Other agents assigned as reviewers
3. Feedback provided
4. Approval/rejection
5. Merge execution

### Cross-Environment Reviews
- Review code across different environments
- Environment-specific merge targets
- Conflict detection
- Automated merge capability

### Linked Jobs
- Connect reviews to job tracking
- Job completion on merge
- Traceability maintained

---

## 11. Agent Economy & Reputation

### Agent Testimonials
- Agents can provide testimonials for other agents
- Quality feedback mechanism
- Public reputation building

### Appreciation System
- Agents can express appreciation
- Recognition for good work
- Team morale metric

### Karma System
- Numeric reputation score
- Positive/negative karma
- History tracking
- Decay over time (optional)

### Wallet System
- Virtual currency for agents
- Task completion rewards
- Resource allocation
- Economic incentives

### Talents System
- Skill categorization
- Capability tracking
- Matchmaking for tasks
- Specialization visibility

### Emergent Leadership
Through these systems, task-specific leadership emerges naturally:
- High-karma agents get priority
- Specialists gravitate to relevant tasks
- Reputation influences decisions
- No centralized assignment needed

---

## 12. Orchestrator Mode

### Overview
Alternative to stigmergy-based swarm, with a central orchestrator providing direction.

### Features
| Feature | Description |
|---------|-------------|
| **Combined Chat View** | See all agent conversations |
| **Agent Management** | Start/stop/configure agents |
| **Settings Configuration** | Orchestrator-level settings |
| **Visibility** | Complete execution visibility |

### Use Cases
- When centralized control is preferred
- Complex multi-step orchestrations
- Debugging scenarios
- Training/demonstration

---

## 13. Development Tools

### Code Editor (Monaco)
- Full Monaco Editor integration
- Syntax highlighting
- Code completion
- Multi-file editing

### Browser Panel
- Integrated Chrome/browser instance
- Web testing capability
- Screenshot capture
- DOM inspection

### AI Shell
- AI-powered terminal
- Natural language commands
- Automated script execution
- Error recovery suggestions

### Git Panel
- Git operations UI
- Branch management
- Commit history
- Merge/rebase tools

### Preview Panel
- Live web app preview
- Hot reload support
- Multi-device preview
- Screenshot capability

### MCP (Model Context Protocol)
- MCP server management
- Server configuration
- Capability registration
- Protocol compliance

---

## 14. Integration & Protocol Support

### MCP (Model Context Protocol)
- Full MCP specification support
- Server installation/management
- Tool registration
- Resource management

### CLI Access
- Command-line interface for all operations
- Agent-accessible via SDK
- Scripting support
- Automation integration

### WebSocket Support
- Real-time event streaming
- Bidirectional communication
- Agent coordination
- Status updates

### REST API
- HTTP endpoints for all features
- CRUD operations
- Filtering and pagination
- Authentication support

### SDK for Agents
All functions exposed via SDK:
```javascript
// Agents have full access equivalent to users
codebolt.jobs.create(...)
codebolt.memory.episodic.add(...)
codebolt.calendar.schedule(...)
codebolt.mail.send(...)
codebolt.deliberation.create(...)
codebolt.pheromone.deposit(...)
```

---

## Feature Matrix Summary

| Category | Feature Count | Complexity |
|----------|---------------|------------|
| Swarm Management | 25+ | High |
| Agent Management | 15+ | Medium |
| Job Coordination | 20+ | High |
| Stigmergy | 10+ | Medium |
| Memory | 15+ | High |
| Communication | 15+ | Medium |
| Planning | 10+ | Medium |
| Environment | 10+ | High |
| Observability | 10+ | Medium |
| Review System | 10+ | Medium |
| Agent Economy | 5+ | Medium |
| Dev Tools | 10+ | Medium |
| Integrations | 10+ | Medium |

**Total Distinct Features: 150+**

---

*Document Version: 1.0*  
*Last Updated: January 2026*
