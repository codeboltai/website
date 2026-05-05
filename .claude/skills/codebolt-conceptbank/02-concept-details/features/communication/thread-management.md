---
title: "Thread Management"
description: "Structured conversations for task execution and agent coordination"
---

## Thread Management

The Thread Management system provides structured conversation tracking for task execution, agent coordination, and workflow management. Unlike the mail system's free-form messaging, threads are purpose-driven with defined execution types, status tracking, and step-by-step progress monitoring.

### What It Is

A hierarchical conversation framework where threads represent tasks or workflows, containing steps (actions) and messages (communication). Threads track execution state, progress, dependencies, and metadata throughout their lifecycle. They support both interactive user-initiated workflows and scheduled automated tasks.

### Why It Matters

Threads provide:
- **Execution Context**: Messages tied to specific tasks with clear purpose
- **Progress Tracking**: Visual progress bars with completion percentages
- **Dependency Management**: Threads can depend on other threads
- **Hierarchical Organization**: Parent-child relationships for complex workflows
- **Multi-Agent Coordination**: Assigned agents with role-based participation
- **Observability**: Timeline events and status changes for monitoring

### Key Capabilities

**Thread Types:**
- **Interactive**: User-initiated conversations and tasks
- **Scheduled**: Time-based or recurring automated workflows

**Execution Types:**
- `scheduled`: Runs on predefined schedule
- `immediate`: Executes right away
- `manual`: Requires manual trigger
- `conditional`: Executes based on conditions

**Status Lifecycle:**
- `created`: Thread initialized, not started
- `planned`: Steps defined, ready to execute
- `pending`: Waiting for dependencies or conditions
- `in_progress` / `active`: Currently executing
- `waiting_user`: Awaiting user input or decision
- `review`: Under review or validation
- `completed`: Finished successfully
- `cancelled`: Terminated before completion
- `failed`: Encountered unrecoverable error

**Progress Tracking:**
- Total steps vs completed steps
- Percentage completion (0-100)
- Active step tracking
- Automatic completion when all steps finish

**Dependencies:**
- `dependsOnThreadId`: This thread waits for another
- `dependsOnThreadName`: Human-readable dependency reference
- Dependency graph visualization
- Circular dependency detection

**Hierarchical Structure:**
- Parent-child thread relationships
- `parentThreadAgentId`: Which agent created child thread
- Recursive tree views for complex workflows
- Child thread aggregation in parent status

**Metadata & Context:**
- Mentioned files, folders, multi-file selections
- Referenced MCP tools and agents
- Linked knowledge base documents
- Environment configuration (local vs remote)
- LLM provider and model selection
- Remote task flags
- Kanban task integration

### How It Works

**Thread Creation:**
1. User or agent creates thread with name and description
2. Thread assigned to specific agent or left unassigned
3. Optional dependencies on other threads specified
4. Metadata captured (files, agents, tools, environment)
5. Status set to `created` or `planned`

**Step Execution:**
1. Steps created within thread (sequential or parallel)
2. Each step has type, user message, metadata
3. Steps can be assigned to specific agents
4. Thread tracks active step and overall progress
5. Messages added for logging and communication

**Status Transitions:**
```
created → planned → pending → in_progress → [completed | failed | cancelled]
                ↓
           waiting_user → in_progress
```

**Progress Calculation:**
- `totalSteps`: Count of steps in thread
- `completedSteps`: Steps with status `completed`
- `percentage`: (completed / total) × 100
- Auto-complete when percentage reaches 100%

**Timeline & Observability:**
- Events emitted for status changes
- `THREAD_STARTED` / `THREAD_FINISHED` for root threads
- `SUBTHREAD_STARTED` / `SUBTHREAD_FINISHED` for children
- `AGENT_STARTED` / `AGENT_FINISHED` when agents join/complete
- Events stored in chatManager for persistence

### Use Cases

**Interactive Workflows:**
- User-guided development tasks
- Code review processes
- Debugging sessions with step-by-step progress

**Scheduled Automation:**
- Nightly build processes
- Regular maintenance tasks
- Recurring data processing

**Conditional Execution:**
- Wait-for-depends workflows
- Event-driven processing
- Multi-stage pipelines

**Remote Task Coordination:**
- Distributed system operations
- Cross-environment deployments
- Multi-agent orchestration

**Kanban Integration:**
- Task cards with thread references
- Drag-and-drop status updates
- Board view organization

### Related Concepts

- **[Mail/Inbox System](./mail-inbox.md)**: Free-form messaging without execution context
- **[Deliberation System](./deliberation-system.md)**: Decision-making conversations
- **[Message Composer](./message-composer.md)**: Creating thread messages
- **[Communication Patterns](./communication-patterns.md)**: Choosing between threads and mail

### Technical Details

**Storage:** PostgreSQL database with TypeORM
- `Thread` entity: Main thread records
- `ThreadStep` entity: Individual steps
- `ThreadMessage` entity: Communication within thread
- `ThreadMemory` entity: Attached context/knowledge
- `ThreadMetaData` entity: Extended metadata

**Thread Grouping:**
- `groupId`: Organize related threads
- `tags`: Flexible categorization
- Filter and search by group/tags

**Priority Levels:**
- `low`, `medium`, `high`, `urgent`

**Start Options:**
- `immediately`: Auto-start on creation
- `manual`: Wait for explicit start
- `based_on_group`: Start when group ready
- `ontaskfinish`: Start after dependency completes

**ApplicationEventBus Events:**
- `thread:created`: New thread initialized
- `thread:completed`: Thread finished successfully
- `conversation:started`: Alias for thread creation
- `conversation:ended`: Alias for thread completion
- `conversation:message:added`: New message in thread

**Query Capabilities:**
- Advanced filtering by status, priority, type, agent
- Date range queries
- Full-text search in name and description
- Pagination support
- Relationship loading (steps, messages, memories)
