---
title: "Job Lifecycle"
description: "Understanding the complete journey of a job from creation to completion and archiving"
tags: ["job-coordination", "jobs", "lifecycle", "workflow"]
---

## Job Lifecycle

### Executive Summary

Every job in CodeBolt follows a structured lifecycle from creation through completion, with all changes tracked as timeline events. Understanding this lifecycle is essential for managing work effectively, coordinating between agents, and maintaining complete audit trails. The job lifecycle supports multiple workflows including linear progression, blocking and unblocking, splitting, and archiving.

### Lifecycle States

**Primary States**

1. **Open**
   - Initial state when a job is created
   - Ready to be assigned or worked on
   - Visible in all job lists and queries
   - Can be filtered by priority, type, or labels

2. **Working**
   - Indicates active work is in progress
   - Typically set when someone locks the job
   - Signals to others that this job is being handled
   - Can transition back to open if work is paused

3. **Closed**
   - Job is completed and verified
   - No further work required
   - Appears in completed job queries
   - Can be reopened if necessary (becomes open again)

4. **Hold**
   - Job is paused or blocked
   - Not ready to be worked on
   - May have unresolved blockers or dependencies
   - Can be moved back to open when ready

5. **Archived**
   - Historical record of a job
   - No longer active in workflows
   - Preserved for reference and audit
   - Typically not shown in default views

**State Transitions**

```
                    ┌─────────┐
                    │  Open   │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐      ┌────────┐    ┌────────┐
    │  Hold  │      │Working │    │ Closed │
    └────┬───┘      └───┬────┘    └───┬────┘
         │              │             │
         └──────────────┴─────────────┘
                        │
                        ▼
                   ┌─────────┐
                   │Archived │
                   └─────────┘
```

### Creation Phase

**1. Job Creation**

Jobs are created through several mechanisms:

- **User Creation**: Manual creation via UI or CLI
- **Agent Creation**: Agents create jobs during task decomposition
- **Splitting**: Jobs created from split proposals
- **Import**: Jobs imported from other systems

**Creation Process**

1. Select or create a job group
2. Provide job name and description
3. Set initial properties (type, priority, labels)
4. Assign to agents (optional)
5. Add dependencies (if needed)
6. Job receives unique ID: `{GroupShortName}-{SequenceNumber}`

**Initial State**

- Status: `open` (default)
- Priority: `3` (high, if not specified)
- Assignees: `[]` (empty, if not specified)
- Dependencies: `[]` (empty, if not specified)
- Timeline event: `created` logged with actor and timestamp

**Example Timeline Event**

```json
{
  "id": "evt_123",
  "jobId": "FEAT-5",
  "eventType": "created",
  "timestamp": "2025-01-18T10:30:00Z",
  "actor": "user_456",
  "actorName": "Alice",
  "data": {
    "name": "Implement user authentication",
    "status": "open",
    "priority": 3
  },
  "description": "Job created: Implement user authentication"
}
```

### Active Phase

**2. Assignment and Locking**

Once created, jobs can be assigned and locked:

- **Assignment**: Adding agents to the assignees list
- **Locking**: An agent claims exclusive access to work on the job
- **Status Change**: Often transitions to `working` when locked

**Assignment Workflow**

1. Agent or user reviews available jobs
2. Job is selected based on priority, skills, or availability
3. Agent is added to assignees list
4. Agent locks the job to signal active work
5. Status changes to `working`
6. Timeline events: `assignee_added`, `locked`, `status_changed`

**3. Active Work**

While in `working` state:

- **Progress Updates**: Notes added, descriptions updated
- **Pheromone Deposits**: Signals deposited for coordination
- **Blocker Management**: Blockers added or resolved
- **Bid Withdrawal**: If bidding was used, other bids withdrawn
- **Status Changes**: May move to `hold` if blocked

**Typical Events During Work**

- `description_changed`: Requirements clarified
- `notes_changed`: Progress notes added
- `pheromone_deposited`: Coordination signals
- `blocker_added`: New blocker discovered
- `blocker_resolved`: Blocker removed
- `label_added`: Categorization updated

### Blocking and Waiting

**4. Hold State**

Jobs enter `hold` state when:

- **Dependencies**: Waiting for other jobs to complete
- **Blockers**: External issues prevent progress
- **Resource Constraints**: Required resources unavailable
- **Decision Needed**: Awaiting human input or approval

**Hold Workflow**

1. Blocker or dependency identified
2. Status changed to `hold`
3. Blocker details recorded
4. Job appears in blocked jobs list
5. When ready, status changed back to `open`

**Blocked Jobs Query**

The system provides a `getBlockedJobs()` query that returns:
- Jobs with unresolved dependencies
- Jobs with active blockers
- Jobs waiting on external conditions

### Completion Phase

**5. Closing Jobs**

Jobs transition to `closed` when:

- **Work Complete**: All tasks finished
- **Verified**: Testing or review passed
- **Documentation**: Documentation updated
- **Clean Up**: No loose ends remain

**Closing Process**

1. Verify all requirements met
2. Resolve all blockers
3. Update description with final state
4. Add completion notes
5. Change status to `closed`
6. Set `closedAt` timestamp
7. Timeline events logged

**Completion Timeline Events**

```json
{
  "eventType": "status_changed",
  "data": {
    "from": "working",
    "to": "closed"
  },
  "description": "Status changed from working to closed"
}
```

### Post-Completion

**6. Archiving**

Closed jobs can be archived to:

- **Clean Up Views**: Remove from active job lists
- **Preserve History**: Maintain complete record
- **Improve Performance**: Reduce active dataset size
- **Compliance**: Meet retention requirements

**Archive Process**

1. Job is already closed
2. Status changed to `archived`
3. `archivedAt` timestamp set
4. Job removed from default views
5. Still accessible via explicit queries

**Reopening**

Archived or closed jobs can be reopened:

1. Status changed to `open`
2. Assignees updated if needed
3. Blockers and dependencies reviewed
4. Job appears in active lists again

### Job Events and Timeline

**Event Tracking**

Every job state change generates a timeline event:

**Event Types**

- `created`: Job was created
- `status_changed`: Status field updated
- `priority_changed`: Priority level changed
- `type_changed`: Job type updated
- `assignee_added`: Agent assigned to job
- `assignee_removed`: Agent unassigned
- `label_added`: Tag added to job
- `label_removed`: Tag removed from job
- `description_changed`: Description updated
- `notes_changed`: Notes updated
- `locked`: Job was locked by agent
- `unlocked`: Job was unlocked
- `blocker_added`: New blocker recorded
- `blocker_resolved`: Blocker resolved
- `dependency_added`: New dependency added
- `dependency_removed`: Dependency removed
- `split_proposed`: Job split proposed
- `split_accepted`: Job split accepted

**Timeline Features**

- **Complete History**: All changes recorded
- **Actor Tracking**: Who made each change
- **Timestamps**: When changes occurred
- **Data Payload**: Details of the change
- **Filtering**: Query by event type, time range, actor
- **Real-time**: WebSocket updates for live monitoring

### Lifecycle Use Cases

**Standard Workflow**

```
Create → Open → Working → Closed → (optionally) Archived
```

**Blocked Workflow**

```
Create → Open → Working → Hold → Open → Working → Closed
```

**Split Workflow**

```
Create → Open → Split Proposed → Split Accepted
├─ Original: Open → Closed (split_up)
└─ New Jobs: Open → Working → Closed
```

**Reopened Workflow**

```
Create → Open → Working → Closed → Open → Working → Closed
```

### Key Capabilities

**State Management**
- Five well-defined states
- Clear transition rules
- State change validation
- Complete state history

**Event Tracking**
- All changes logged
- Actor attribution
- Timestamped events
- Queryable timeline

**Blocking and Dependencies**
- Blocker tracking
- Dependency resolution
- Blocked job queries
- Ready job queries

**Flexibility**
- Reopen closed jobs
- Archive old jobs
- Split during any active state
- Add blockers at any time

### Use Cases

**Software Development**
- Features move from open to working to closed
- Bugs often go open → working → closed (verified)
- Epics may be open → working → hold → working → closed

**Multi-Agent Coordination**
- Agents lock jobs when starting work
- Status signals availability to other agents
- Timeline shows who did what and when

**Project Management**
- Track progress through status changes
- Identify blocked work quickly
- Maintain complete audit trail
- Generate reports from timeline data

### Related Concepts

- **[Job System Overview](./job-system-overview.md)**: Jobs and job groups fundamentals
- **[Job Locking](./job-locking.md)**: How locking prevents conflicts
- **[Blockers](./blockers.md)**: Managing dependencies and blockers
- **[Job Splitting](./job-splitting.md)**: Decomposing jobs during lifecycle
- **[Stigmergy System](../stigmergy-system/)**: Pheromone-based coordination during active work
- **[Agent Management](../agent-management/)**: How agents interact with job lifecycle
