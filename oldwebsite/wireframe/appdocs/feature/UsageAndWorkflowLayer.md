# Usage and Workflow Layer

## Table of Contents

1. [Core Workflows](#core-workflows)
2. [Getting Started Workflows](#getting-started-workflows)
3. [Daily Development Workflows](#daily-development-workflows)
4. [Multi-Agent Workflows](#multi-agent-workflows)
5. [Advanced Workflows](#advanced-workflows)
6. [Integration Workflows](#integration-workflows)

---

## Core Workflows

### Workflow Categories

| Category | Description | Primary Users |
|----------|-------------|---------------|
| **Getting Started** | Initial setup and first runs | New users |
| **Daily Development** | Routine development tasks | All users |
| **Multi-Agent** | Swarm and coordination | Power users |
| **Advanced** | Custom agents, complex coordination | Experts |
| **Integration** | External system connections | DevOps, Architects |

---

## Getting Started Workflows

### 1. First Project Setup

```
┌─────────────────────────────────────────────────────────┐
│                  First Project Setup                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Step 1: Install Codebolt                                │
│  ├── Download desktop application                        │
│  └── Complete initial configuration                      │
│                                                          │
│  Step 2: Open/Import Project                             │
│  ├── Open existing codebase                              │
│  └── Or create new project                               │
│                                                          │
│  Step 3: Create First Agent                              │
│  ├── Use template from Agent List Panel                  │
│  ├── Or use Agent Flow Creator for visual design         │
│  └── Configure agent parameters                          │
│                                                          │
│  Step 4: Run First Agent Session                         │
│  ├── Open Chat Panel                                     │
│  ├── Start agent with task prompt                        │
│  └── Observe agent execution                             │
│                                                          │
│  Step 5: Review Results                                  │
│  ├── Check code changes                                  │
│  ├── Review agent debug log                              │
│  └── Merge or iterate                                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2. First Swarm Setup

```
┌─────────────────────────────────────────────────────────┐
│                   First Swarm Setup                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Step 1: Create Swarm                                    │
│  ├── Navigate to Swarm Panel                             │
│  ├── Click "Create Swarm"                                │
│  ├── Name and configure swarm                            │
│  └── Set agent limits and policies                       │
│                                                          │
│  Step 2: Define Roles                                    │
│  ├── Create role definitions                             │
│  ├── Specify required capabilities                       │
│  └── Set permissions                                     │
│                                                          │
│  Step 3: Add Agents                                      │
│  ├── Add agents to swarm                                 │
│  ├── Assign roles                                        │
│  └── Configure agent settings                            │
│                                                          │
│  Step 4: Start Swarm                                     │
│  ├── Open Start Swarm Dialog                             │
│  ├── Select agents to start                              │
│  ├── Provide initial prompt                              │
│  └── Launch swarm execution                              │
│                                                          │
│  Step 5: Monitor Swarm                                   │
│  ├── View Swarm Detail Panel                             │
│  ├── Monitor agent activities                            │
│  └── Use pill bar for different views                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Daily Development Workflows

### 3. Single Agent Task Execution

**Use Case**: Quick coding assistance for specific task

```
User Action                    Agent Response
─────────────────────────────────────────────────────
1. Open Chat Panel         →   Agent ready
2. Describe task           →   Agent analyzes codebase
3. Wait for execution      →   Agent codes, tests, commits
4. Review in Code Panel    →   Changes highlighted
5. Accept or request edits →   Agent iterates if needed
6. Merge changes           →   Task complete
```

### 4. Parallel Feature Development

**Use Case**: Develop multiple features simultaneously

```
                          ┌──► Agent 1: Feature A
                          │    └──► Code + Tests
User: Set Tasks     ──────┼──► Agent 2: Feature B
                          │    └──► Code + Tests
                          └──► Agent 3: Feature C
                               └──► Code + Tests
                                        │
                                        ▼
                          Review in ReviewMergeRequestPanel
                                        │
                                        ▼
                          Merge approved changes
```

### 5. Test-Driven Development with Agents

**Use Case**: Agent writes tests first, then implementation

```
Step 1: User specifies feature requirements
          │
Step 2: Agent 1 writes comprehensive tests
          │
Step 3: Tests committed (failing)
          │
Step 4: Agent 2 implements to pass tests
          │
Step 5: Cycle until all tests pass
          │
Step 6: Review and merge
```

### 6. Documentation Generation

**Use Case**: Generate documentation for existing code

```
┌─────────────────────────────────────────────────────────┐
│             Documentation Generation Workflow            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Input: Codebase without documentation                   │
│                                                          │
│  Step 1: Agent analyzes code structure                   │
│  Step 2: Agent generates README files                    │
│  Step 3: Agent creates API documentation                 │
│  Step 4: Agent writes inline comments                    │
│  Step 5: Agent updates existing docs                     │
│                                                          │
│  Output: Fully documented codebase                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Multi-Agent Workflows

### 7. Overnight Development

**Use Case**: Agents work while team sleeps

```
Evening Setup (Human)              Overnight (Agents)         Morning (Human)
───────────────────────────────────────────────────────────────────────────────

5:30 PM                            Throughout Night           9:00 AM
├── Define jobs in Jobs Panel      ├── Agent 1: Feature A     ├── Review PRs
├── Set priorities                 ├── Agent 2: Feature B     ├── Check tests
├── Configure swarm                ├── Agent 3: Bug fixes     ├── Merge approved
└── Start swarm                    ├── Agent 4: Tests         └── Set new tasks
                                   └── Agent 5: Docs
                                          │
                                          ▼
                            Automatic PR creation via
                            Review Merge Request Panel
```

### 8. Stigmergy-Based Task Coordination

**Use Case**: Agents self-coordinate without orchestrator

```
┌──────────────────────────────────────────────────────────────────┐
│                 Stigmergy Coordination Flow                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. User deposits 'importance' pheromone on Job-X                 │
│                                                                   │
│  2. Agent A senses high importance, claims Job-X (lock)           │
│                                                                   │
│  3. Agent A deposits 'saturation' pheromone                       │
│                                                                   │
│  4. Agent B sees Job-X saturated, moves to Job-Y                  │
│                                                                   │
│  5. Agent A finds Job-X complex, deposits 'request_split'         │
│                                                                   │
│  6. Agent C responds to split signal, proposes split              │
│                                                                   │
│  7. Deliberation: Agents vote on split proposal                   │
│                                                                   │
│  8. Approved split creates Job-X1, Job-X2, Job-X3                 │
│                                                                   │
│  9. New jobs get 'job_available' pheromone                        │
│                                                                   │
│  10. Agents naturally distribute to new jobs                      │
│                                                                   │
│  Result: Complex task decomposed and executed without             │
│          central coordination                                     │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 9. Deliberation Workflow

**Use Case**: Agents make consensus decisions

```
Deliberation Types:
───────────────────

VOTING DELIBERATION
├── Agent A creates deliberation: "Best approach for refactor?"
├── Agents B, C, D submit responses with proposals
├── Agents vote on responses
├── Winner determined by vote count
└── Winner's approach is implemented

FEEDBACK DELIBERATION
├── Agent proposes: "Here's my implementation plan"
├── Other agents provide feedback
├── Original agent incorporates feedback
└── Final plan is refined collaboratively

QA DELIBERATION
├── Agent asks: "Is this edge case handled correctly?"
├── Other agents answer with analysis
├── Questioner gets complete answer
└── Decision made with full information

SHARED-LIST DELIBERATION
├── Topic: "All test cases for payment module"
├── Each agent adds test cases they identify
├── Deduplication of similar contributions
└── Comprehensive list emerges collectively
```

### 10. Review and Merge Workflow

**Use Case**: Agent code review process

```
┌─────────────────────────────────────────────────────────┐
│               Agent Review Workflow                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Stage 1: Development Agent creates PR                   │
│  ├── Changes in Review Merge Request Panel               │
│  ├── Linked to jobs for traceability                     │
│  └── Description of changes included                     │
│                                                          │
│  Stage 2: Review Agents assigned                         │
│  ├── Automatic or manual assignment                      │
│  └── Reviewers notified                                  │
│                                                          │
│  Stage 3: Feedback provided                              │
│  ├── Line-by-line comments                               │
│  ├── Overall assessment                                  │
│  └── Request changes or approve                          │
│                                                          │
│  Stage 4: Iteration                                      │
│  ├── Author addresses feedback                           │
│  └── Re-review if needed                                 │
│                                                          │
│  Stage 5: Merge                                          │
│  ├── Approval threshold met                              │
│  ├── Merge executed                                      │
│  └── Related jobs updated                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Advanced Workflows

### 11. Custom Agent Development (Code)

```typescript
// Custom Agent Development Workflow

// Step 1: Create codeboltagent.yaml
name: "CustomReviewAgent"
description: "Reviews code for security issues"
capabilities:
  - security_analysis
  - code_review

// Step 2: Implement agent logic
import { codebolt } from 'codebolt-sdk';

async function run() {
  // Access same SDK as UI
  const files = await codebolt.fs.listFiles('src/');
  
  for (const file of files) {
    const content = await codebolt.fs.readFile(file);
    const issues = analyzeSecurityIssues(content);
    
    if (issues.length > 0) {
      await codebolt.jobs.create({
        type: 'bug',
        name: `Security issue in ${file}`,
        description: issues.join('\n')
      });
    }
  }
}

// Step 3: Test locally
// Step 4: Deploy to swarm
// Step 5: Monitor in Running Agents Panel
```

### 12. Custom Agent Development (Visual)

```
┌─────────────────────────────────────────────────────────┐
│          Visual Agent Creation Workflow                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Open Agent Flow Creator                              │
│                                                          │
│  2. Drag nodes onto canvas:                              │
│     ├── Trigger node (e.g., "On Job Assigned")           │
│     ├── Action nodes (e.g., "Read File", "Code Review")  │
│     ├── Condition nodes (e.g., "If Issues Found")        │
│     └── Output nodes (e.g., "Create PR", "Update Job")   │
│                                                          │
│  3. Connect nodes with flow lines                        │
│                                                          │
│  4. Configure each node's parameters                     │
│                                                          │
│  5. Test flow with sample input                          │
│                                                          │
│  6. Save and deploy                                      │
│                                                          │
│  7. Agent now runs as configured flow                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 13. Knowledge Graph Workflow

**Use Case**: Building persistent knowledge about codebase

```
Phase 1: Schema Definition
├── Create Instance Template
├── Define record kinds (Entity, Function, Module, etc.)
├── Define edge types (calls, imports, extends)
└── Save template

Phase 2: Knowledge Population
├── Agents analyze codebase
├── Create records for each entity
├── Create edges for relationships
└── Knowledge graph grows

Phase 3: Knowledge Query
├── Create View Templates (Cypher-like queries)
├── Execute views for insights
├── Use in agent decision making
└── Continuous updates

Example View: "All functions that call deprecated API"
MATCH (f:Function)
WHERE f.callsApi CONTAINS 'deprecated_'
RETURN f.name, f.file, f.line
```

### 14. Long-Horizon Feature Development

**Use Case**: Multi-week feature with persistent context

```
Week 1: Planning
├── Define feature in Roadmap Panel
├── Create specifications in Specs Panel
├── Break into jobs in Jobs Panel
├── Set up episodic memory for feature
└── Agents begin research phase

Week 2-3: Implementation
├── Multiple agents work on different components
├── Progress tracked in Jobs Panel
├── Deliberations resolve design questions
├── Memory accumulates learnings
└── Daily progress without context loss

Week 4: Integration & Polish
├── Agents integrate components
├── Auto-testing validates functionality
├── Documentation generated
├── Review workflow for final merge
└── Feature complete with full history
```

---

## Integration Workflows

### 15. CI/CD Integration

```
┌─────────────────────────────────────────────────────────┐
│                 CI/CD Integration                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  GitHub Actions / CI Pipeline                            │
│        │                                                 │
│        ▼                                                 │
│  Codebolt CLI trigger                                    │
│        │                                                 │
│        ▼                                                 │
│  ┌──────────────────┐                                    │
│  │ Codebolt Agents  │                                    │
│  ├──────────────────┤                                    │
│  │ - Run tests      │                                    │
│  │ - Fix failures   │                                    │
│  │ - Update docs    │                                    │
│  │ - Security scan  │                                    │
│  └──────────────────┘                                    │
│        │                                                 │
│        ▼                                                 │
│  Results back to CI                                      │
│        │                                                 │
│        ▼                                                 │
│  Pipeline continues or reports                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 16. MCP Server Integration

```
MCP Server Workflow:
────────────────────

Step 1: Configure MCP server in MCP Panel
├── Server name and description
├── Connection details
└── Capability mapping

Step 2: Server registers tools/resources
├── Tools become available to agents
├── Resources accessible for context
└── Prompts can be invoked

Step 3: Agents use MCP capabilities
├── Tool calls routed to MCP server
├── Responses integrated into workflow
└── Transparent to agent logic

Example: Database MCP Server
├── Agents can query production databases
├── Agents can analyze schemas
└── All via MCP protocol abstraction
```

### 17. External Agent Integration

```
┌─────────────────────────────────────────────────────────┐
│            External Agent Integration                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Codebolt IDE                    External System         │
│  ───────────                     ───────────────         │
│                                                          │
│  Swarm Manager ◄──── WebSocket ───► External Agent       │
│                                                          │
│  Communication:                                          │
│  ├── Agent registration                                  │
│  ├── Task assignment                                     │
│  ├── Status updates                                      │
│  └── Result reporting                                    │
│                                                          │
│  External agents can:                                    │
│  ├── Join swarms                                         │
│  ├── Participate in deliberations                        │
│  ├── Access job coordination                             │
│  └── Use pheromone signaling                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Workflow Quick Reference

| Workflow | Complexity | Time | Agents |
|----------|------------|------|--------|
| Single Agent Task | Low | Minutes | 1 |
| Parallel Development | Medium | Hours | 2-5 |
| Overnight Development | Medium | 8-12 hours | 10-50 |
| Stigmergy Coordination | High | Varies | 5-100+ |
| Deliberation | Medium | 15-60 min | 3-10 |
| Review & Merge | Medium | 30-120 min | 2-5 |
| Custom Agent (Code) | High | Days | 1 |
| Custom Agent (Visual) | Medium | Hours | 1 |
| Knowledge Graph | High | Ongoing | 1-10 |
| Long-Horizon Feature | High | Weeks | 10-50 |

---

*Document Version: 1.0*  
*Last Updated: January 2026*
