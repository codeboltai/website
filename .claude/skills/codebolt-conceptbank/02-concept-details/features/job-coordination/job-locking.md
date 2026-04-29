---
title: "Job Locking"
description: "Fast resource reservation mechanism for preventing conflicts in multi-agent job coordination"
tags: ["job-coordination", "jobs", "locking", "coordination", "multi-agent"]
---

## Job Locking

### Executive Summary

Job locking provides a fast, lightweight mechanism for agents to reserve jobs and prevent conflicts when multiple agents work concurrently. By explicitly marking a job as "locked," agents signal their intent to work on a job, ensuring other agents know it's being handled. Locking is coordinated with unlock requests, allowing agents to negotiate access when needed, creating a cooperative rather than competitive coordination system.

### What is Job Locking?

**The Problem**

In multi-agent systems, race conditions occur when:
- Two agents start working on the same job simultaneously
- Work is duplicated, wasting resources
- Changes conflict, requiring reconciliation
- Agents interfere with each other's progress

**The Solution**

Job locking provides:
- **Exclusive Access**: Only one agent holds the lock at a time
- **Fast Reservation**: Quick check-and-set operation
- **Transparent Signaling**: All agents see who is working on what
- **Negotiation**: Unlock requests allow transfer of locks
- **Audit Trail**: All lock/unlock events are logged

### Lock Structure

A job lock contains:

```typescript
interface JobLock {
  lockedBy: string;        // Agent ID who holds the lock
  lockedByName?: string;   // Display name
  lockedAt: string;        // ISO timestamp when locked
}
```

**Example**

```json
{
  "lockedBy": "agent_frontend_dev_1",
  "lockedByName": "Frontend Developer Agent",
  "lockedAt": "2025-01-18T14:30:00Z"
}
```

### Locking Workflow

**1. Locking a Job**

When an agent wants to work on a job:

1. **Check Lock Status**: Query if job is already locked
2. **Attempt Lock**: Call `lockJob(jobId, agentId, agentName)`
3. **Success**: Lock granted, agent can proceed
4. **Failure**: Job already locked by another agent

**Lock Validation Rules**

- Job must not already be locked
- Agent must provide valid ID and name
- Lock timestamp set to current time
- Timeline event `locked` is generated

**Timeline Event**

```json
{
  "eventType": "locked",
  "actor": "agent_frontend_dev_1",
  "actorName": "Frontend Developer Agent",
  "data": {
    "lockedBy": "agent_frontend_dev_1",
    "lockedByName": "Frontend Developer Agent"
  },
  "description": "Job locked by Frontend Developer Agent"
}
```

**2. Working While Locked**

While holding a lock, the agent:
- Has exclusive access to modify the job
- Typically changes status to `working`
- Updates notes, description, and progress
- Deposits pheromones to signal activity
- Other agents see the lock and know to avoid this job

**3. Unlocking a Job**

When work is complete or paused:

1. **Call Unlock**: `unlockJob(jobId, agentId)`
2. **Validation**: System verifies the agent holds the lock
3. **Release**: Lock is removed from the job
4. **Event**: Timeline event `unlocked` is generated

**Unlock Validation**

- Only the lock holder can unlock
- Agent ID must match `lockedBy` field
- Lock is completely removed (not transferred)
- Job becomes available for others to lock

**Timeline Event**

```json
{
  "eventType": "unlocked",
  "actor": "agent_frontend_dev_1",
  "actorName": "Frontend Developer Agent",
  "data": {
    "unlockedBy": "agent_frontend_dev_1"
  },
  "description": "Job unlocked"
}
```

### Unlock Requests

**The Problem**

Sometimes an agent needs a locked job:
- Current holder is stuck or unavailable
- Higher priority agent needs to take over
- Emergency fix requires immediate access
- Original agent no longer available

**The Solution: Unlock Requests**

Unlock requests allow agents to politely request lock transfer:

```typescript
interface UnlockRequest {
  id: string;                  // UUID
  requestedBy: string;         // Agent ID requesting unlock
  requestedByName?: string;    // Display name
  reason: string;              // Why unlock is needed
  requestedAt: string;         // ISO timestamp
  status: 'pending' | 'approved' | 'rejected';
  respondedAt?: string;        // When lock holder responded
  respondedBy?: string;        // Lock holder who responded
}
```

**Unlock Request Workflow**

1. **Request**: Agent creates unlock request with reason
2. **Notification**: Lock holder sees the request
3. **Decision**: Lock holder approves or rejects
4. **Response**: Request status updated
5. **Action**: If approved, lock is released

**Creating a Request**

```typescript
await addUnlockRequest(jobId, {
  requestedBy: "agent_urgent_fix_1",
  requestedByName: "Urgent Fix Agent",
  reason: "Critical security issue requires immediate attention"
});
```

**Responding to a Request**

Lock holder can:

- **Approve**: Release the lock, allowing requester to claim it
- **Reject**: Deny the request, keep the lock
- **Ignore**: Request remains pending (not recommended)

**Timeline Events**

```json
// Request created
{
  "eventType": "unlock_requested",
  "actor": "agent_urgent_fix_1",
  "actorName": "Urgent Fix Agent",
  "data": {
    "reason": "Critical security issue requires immediate attention"
  },
  "description": "Unlock requested: Critical security issue requires immediate attention"
}

// Approved
{
  "eventType": "unlock_approved",
  "actor": "agent_frontend_dev_1",
  "data": {
    "requestId": "req_123",
    "requestedBy": "agent_urgent_fix_1"
  },
  "description": "Unlock request approved"
}

// Rejected
{
  "eventType": "unlock_rejected",
  "actor": "agent_frontend_dev_1",
  "data": {
    "requestId": "req_123",
    "reason": "Almost done, will finish in 5 minutes"
  },
  "description": "Unlock request rejected"
}
```

### Coordination Patterns

**1. First-Come-First-Served**

Most common pattern:
- Agents scan for unlocked jobs
- First to lock gets the job
- Others skip locked jobs
- Simple and effective

**2. Priority-Based**

Higher priority agents can:
- Request unlock from lower priority agents
- Provide reason for priority
- Expect approval based on priority
- Used for urgent fixes or critical issues

**3. Time-Based**

Locks can have implicit timeouts:
- Long-held locks trigger review
- Stale locks automatically released
- Agents must refresh locks periodically
- Prevents indefinite holds

**4. Handoff**

Cooperative transfer:
- Agent completes part of work
- Requests unlock for specific agent
- New agent locks and continues
- Smooth transition between agents

### Locking and Bidding

Locking and bidding work together:

**Before Bidding**
- Jobs may be locked by current workers
- Bids only accepted on unlocked jobs
- Lock status visible in job listings

**After Bidding**
- Winning bidder automatically assigned
- Bid winner can then lock the job
- Other bids marked as withdrawn
- Clear handoff from bidding to locking

**Workflow**

```
1. Job is open and unlocked
2. Multiple agents bid
3. Bid accepted for Agent A
4. Agent A assigned to job
5. Agent A locks job
6. Agent A works exclusively
7. Agent A unlocks when done
```

### Checking Lock Status

**Query API**

```typescript
// Check if job is locked
const { locked, lock } = await checkLock(jobId);

if (locked) {
  console.log(`Locked by ${lock.lockedByName} since ${lock.lockedAt}`);
} else {
  console.log("Job is available");
}
```

**Visual Indicators**

In the UI, locked jobs show:
- Lock icon
- Name of locking agent
- Time since locked
- Warning if locked for long time

### Best Practices

**For Agents**

1. **Always check lock status before starting work**
2. **Lock immediately when deciding to work on a job**
3. **Unlock when done or if cannot continue**
4. **Respond to unlock requests promptly**
5. **Use unlock requests instead of force**

**For Users**

1. **Respect locks - don't manually modify locked jobs**
2. **Check timeline to see locking history**
3. **Use unlock requests for urgent needs**
4. **Monitor lock duration for stalled jobs**
5. **Coordinate with lock holders for handoffs**

### Anti-Patterns

**Avoid These**

1. **Lock Hoarding**: Locking multiple jobs at once
2. **Long Locks**: Holding locks for extended periods
3. **Silent Locking**: Locking without communicating intent
4. **Ignoring Requests**: Not responding to unlock requests
5. **Force Unlocking**: Bypassing the unlock request system

### Key Capabilities

**Fast Coordination**
- Millisecond-level lock operations
- No complex negotiation required
- Simple check-and-set semantics
- Minimal overhead

**Transparency**
- All agents see lock status
- Lock history in timeline
- Clear ownership indication
- Audit trail for all changes

**Cooperative**
- Unlock requests for negotiation
- Agents can coordinate handoffs
- Priority-based escalation
- Reason tracking for decisions

**Safety**
- Validation prevents conflicts
- Only lock holder can unlock
- Events logged for debugging
- Rollback capability if needed

### Use Cases

**Multi-Agent Development**
- Agent locks job when starting implementation
- Other agents skip locked jobs
- Lock released when code is committed
- Prevents duplicate work

**Priority Escalation**
- Urgent fix agent requests unlock
- Current agent approves and unlocks
- Urgent agent locks and fixes issue
- Original agent can resume later

**Collaborative Work**
- Agent A locks for frontend work
- Completes UI, unlocks
- Agent B locks for backend work
- Completes API, unlocks
- Smooth handoff between specialists

**Human-Agent Coordination**
- Human locks job for review
- Agent sees lock and waits
- Human unlocks after approval
- Agent locks and continues work

### Related Concepts

- **[Job System Overview](./job-system-overview.md)**: Jobs and their properties
- **[Job Bidding](./job-bidding.md)**: Market-based allocation before locking
- **[Blockers](./blockers.md)**: Other reasons jobs can't be worked on
- **[Stigmergy System](../stigmergy-system/)**: Pheromone-based coordination
- **[Agent Collaboration](../agent-management/agent-collaboration.md)**: How agents work together
