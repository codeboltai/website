---
title: "Job Blockers and Dependencies"
description: "Managing what prevents job execution and coordinating work through dependency tracking"
tags: ["job-coordination", "jobs", "blockers", "dependencies", "workflow"]
---

## Job Blockers and Dependencies

### Executive Summary

Job blockers and dependencies provide two complementary mechanisms for managing work constraints and execution order. Blockers explicitly document what's preventing a job from starting, while dependencies define relationships between jobs that must complete in sequence. Together, they create a robust system for coordinating complex workflows, preventing agents from starting work prematurely, and maintaining clear visibility into what's blocking progress.

### Blockers vs Dependencies

**Blockers**

Explicit issues preventing work:
- Immediate problems that must be resolved
- Often discovered during work
- Can be added at any time
- Don't reference other jobs necessarily
- Focus on the problem, not the solution

**Dependencies**

Relationships between jobs:
- Job A must complete before Job B starts
- Planned execution order
- Typically known upfront
- Always reference other jobs
- Focus on the relationship, not the blocker

**Example**

- **Blocker**: "Cannot start because API endpoint doesn't exist yet"
- **Dependency**: "Job depends on API-5 (Create user endpoint) completing"

### Blockers

**Blocker Structure**

```typescript
interface JobBlocker {
  id: string;                  // UUID
  text: string;                // Blocker description
  addedBy: string;             // Agent/User ID
  addedByName?: string;        // Display name
  addedAt: string;             // ISO timestamp
  blockerJobIds?: string[];    // Jobs that must complete first
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}
```

**Example Blocker**

```json
{
  "id": "block_123",
  "text": "Database schema for user profiles not yet designed. Cannot implement API endpoints without knowing the table structure.",
  "addedBy": "agent_backend_dev",
  "addedByName": "Backend Developer Agent",
  "addedAt": "2025-01-18T14:30:00Z",
  "blockerJobIds": ["DB-1"],
  "resolved": false
}
```

### Blocker Workflow

**1. Identifying Blockers**

Agents discover blockers when:
- Starting to work on a job
- Reviewing requirements
- Attempting to complete a task
- Checking prerequisites
- Validating assumptions

**Common Blocker Types**

- **Technical**: Missing APIs, libraries, or infrastructure
- **Dependencies**: Other jobs not complete
- **Knowledge**: Information or documentation missing
- **Resources**: Hardware, access, or tools unavailable
- **Decisions**: Awaiting approval or choices

**2. Adding Blockers**

Document what's blocking work:

```typescript
await addBlocker(jobId, {
  text: "Clear description of what's blocking work",
  addedBy: "agent_id",
  addedByName: "Agent Name",
  blockerJobIds: ["JOB-1", "JOB-2"]  // Optional: related jobs
});
```

**Blocker with Job References**

When blockers relate to specific jobs:
- List job IDs in `blockerJobIds`
- Creates explicit link to those jobs
- Helps identify when blockers are resolved
- Supports automatic blocker resolution

**3. Blocked Jobs Query**

Find all jobs with unresolved blockers:

```typescript
const blockedJobs = await getBlockedJobs(filters);
```

Returns jobs that:
- Have at least one unresolved blocker
- Are not ready to be worked on
- Should be visible in "blocked" view
- May need attention or waiting

**4. Resolving Blockers**

When a blocker is removed:

```typescript
await resolveBlocker(jobId, blockerId, resolvedBy);
```

Changes:
- Blocker `resolved` set to `true`
- `resolvedAt` timestamp set
- `resolvedBy` recorded
- Timeline event logged

**Timeline Events**

```json
// Blocker added
{
  "eventType": "blocker_added",
  "actor": "agent_backend_dev",
  "actorName": "Backend Developer Agent",
  "data": {
    "text": "Database schema for user profiles not yet designed..."
  },
  "description": "Blocker added: Database schema for user profiles not yet designed. Cannot implement API endpoints without knowing the table structure."
}

// Blocker resolved
{
  "eventType": "blocker_resolved",
  "actor": "agent_db_admin",
  "data": {
    "blockerId": "block_123"
  },
  "description": "Blocker resolved"
}
```

### Dependencies

**Dependency Structure**

```typescript
interface JobDependency {
  targetJobId: string;  // Job this depends on
  type: DependencyType;
  createdAt: string;
}

type DependencyType = 'blocks' | 'related' | 'parent-child';
```

**Dependency Types**

1. **blocks**: Hard dependency
   - Target job MUST complete before this one
   - Checked when querying ready jobs
   - Prevents premature work

2. **related**: Soft dependency
   - Related work but not blocking
   - Informational only
   - Doesn't prevent starting

3. **parent-child**: Hierarchical
   - This job is part of parent
   - Parent completion may affect child
   - Organizational relationship

**Example Dependencies**

```json
{
  "dependencies": [
    {
      "targetJobId": "DB-1",
      "type": "blocks",
      "createdAt": "2025-01-18T14:30:00Z"
    },
    {
      "targetJobId": "API-3",
      "type": "related",
      "createdAt": "2025-01-18T14:30:00Z"
    }
  ]
}
```

### Dependency Workflow

**1. Adding Dependencies**

When creating or updating a job:

```typescript
await addDependency(jobId, targetJobId, dependencyType);
```

**When to Add**

- During job creation (if known)
- After decomposition (sub-jobs depend on parent)
- During planning (identify prerequisites)
- When dependencies discovered

**2. Checking Dependencies**

Query jobs that are ready to work on:

```typescript
const readyJobs = await getReadyJobs(filters);
```

Returns jobs where:
- All `blocks`-type dependencies are closed
- No unresolved blockers
- Ready to be locked and worked on

**3. Dependency Resolution**

Dependencies resolve when:
- Target job status changes to `closed`
- Dependency automatically satisfied
- Job becomes "ready"
- Can be picked up by agents

**4. Removing Dependencies**

If dependency no longer needed:

```typescript
await removeDependency(jobId, targetJobId);
```

Use cases:
- Requirements changed
- Dependency determined unnecessary
- Work restructured
- Dependencies corrected

### Coordination with Status

**Ready Jobs**

A job is "ready" when:
- Status is `open` or `hold`
- All `blocks` dependencies resolved (target jobs closed)
- No unresolved blockers
- Not currently locked

**Blocked Jobs**

A job is "blocked" when:
- Has unresolved blockers, OR
- Has unresolved `blocks` dependencies
- Cannot be worked on currently
- Appears in blocked jobs query

**Status Transitions**

```
Created (open)
  ↓
Have blockers or dependencies?
  YES → status: hold
  NO → stay: open
  ↓
Blockers/dependencies resolved?
  YES → status: open
  NO → stay: hold
```

### Best Practices

**For Blockers**

1. **Be Specific**: Clearly describe what's blocking
2. **Include Context**: Why is this blocking? What's needed?
3. **Link Jobs**: If blocker relates to other jobs, reference them
4. **Resolve Promptly**: Don't leave blockers dangling
5. **Communicate**: Let others know about blockers

**For Dependencies**

1. **Use Sparingly**: Only add real dependencies
2. **Choose Right Type**: Use `blocks` for hard dependencies
3. **Plan Ahead**: Identify dependencies during job creation
4. **Keep Updated**: Remove dependencies if no longer needed
5. **Avoid Cycles**: Don't create circular dependencies

**Anti-Patterns**

1. **Vague Blockers**: "Cannot start" (why?)
2. **Permanent Blockers**: Blockers that never get resolved
3. **Over-Dependencies**: Everything depends on everything
4. **Circular Dependencies**: A depends on B, B depends on A
5. **Forgotten Blockers**: Old blockers not cleaned up

### Visualizing Dependencies

**Dependency Graph**

```
DB-1 (Design Schema)
  ↓ blocks
API-1 (Create Endpoints)
  ↓ blocks
FEAT-1 (Build UI)
  ↓ blocks
TEST-1 (Integration Tests)
```

**Blocked Jobs View**

```
Blocked Jobs (3):
├─ API-2: Blocked by "Missing authentication endpoint"
├─ FEAT-3: Blocked by DB-2 (Design User Schema)
└─ TEST-1: Blocked by API-1, API-2
```

### Use Cases

**Sequential Work**

Build API before UI:
- API-1: Create endpoints (no dependencies)
- FEAT-1: Build UI (depends on API-1)
- UI waits for API to complete

**Multi-Agent Coordination**

Prevent conflicts:
- Agent A working on shared component
- Agent B's job depends on A's job
- Agent B waits for A to finish
- Clean handoff between agents

**Complex Features**

Large feature with prerequisites:
- Database schema must exist first
- Then API endpoints can be built
- Then UI can consume the API
- Then tests can validate the flow

**External Dependencies**

Work that requires external factors:
- Blocked by "Waiting for third-party API access"
- Blocked by "Need approval from security team"
- Blocked by "Hardware not available until Monday"

### Integration with Pheromones

**Task Not Ready Pheromone**

Agents can deposit `task_not_ready` pheromone:
- Signals job has blockers
- Provides visual indicator
- Complements explicit blockers
- Decentralized signaling

**Available Pheromone**

When blockers resolved:
- Deposit `available` pheromone
- Signals job is ready
- Attracts agents looking for work
- Coordinates without central coordination

### Key Capabilities

**Explicit Documentation**
- Blockers clearly described
- Dependencies tracked
- Context preserved
- Audit trail maintained

**Query Support**
- Find blocked jobs
- Find ready jobs
- Filter by status
- Understand what's waiting

**Automatic Resolution**
- Dependencies resolve when target jobs close
- No manual intervention needed
- Jobs become ready automatically
- Reduces coordination overhead

**Flexibility**
- Add blockers anytime
- Remove dependencies if needed
- Update blocker details
- Change dependency types

### Related Concepts

- **[Job Lifecycle](./job-lifecycle.md)**: How blockers affect job state
- **[Job System Overview](./job-system-overview.md)**: Job properties and structure
- **[Priority System](./priority-system.md)**: Prioritizing despite blockers
- **[Stigmergy System](../stigmergy-system/)**: Pheromone signals for blocker coordination
- **[Agent Collaboration](../agent-management/agent-collaboration.md)**: Agents managing dependencies together
