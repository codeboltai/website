---
title: "Coordination Signals for Review and Merge"
description: "Pheromones and locks for decentralized multi-agent coordination during code review"
tags: ["coordination", "pheromones", "locks", "stigmergy", "multi-agent"]
---

## Coordination Signals for Review and Merge

### Executive Summary

Coordination Signals provide a decentralized mechanism for agents to communicate about Review and Merge Requests without requiring central orchestration. Based on stigmergy principles (indirect coordination through environment), agents deposit pheromone signals and acquire locks on requests to coordinate their activities, prevent conflicts, and signal intent to other agents working in the same codebase.

### What are Coordination Signals?

Coordination Signals are lightweight markers that agents place on Review and Merge Requests to communicate state, intent, and recommendations to other agents. Unlike direct messaging, signals persist on the requests themselves, creating a shared communication channel that any agent can read and update.

**Key Benefits**

- **Decentralized Coordination**: No central coordinator required
- **Conflict Prevention**: Locks prevent race conditions
- **Intent Signaling**: Pheromones communicate agent intentions
- **Scalability**: Works efficiently with many agents
- **Flexibility**: Easy to add new signal types
- **Transparency**: All signals visible to all agents

### Pheromone Signals

**What are Pheromones?**

Pheromones are typed signals with intensity values that agents deposit on requests. They're inspired by stigmergy in nature (like ants leaving pheromone trails), enabling indirect coordination through the environment.

**Pheromone Structure**

Each pheromone contains:

```typescript
{
  type: string,              // Signal type (e.g., 'workingonit')
  intensity: number,         // Strength (0-10, default 1)
  depositedBy: string,       // Agent ID who deposited
  depositedByName?: string,  // Display name
  depositedAt: string,       // ISO timestamp
  decayRate?: number         // How fast signal fades (0 = no decay)
}
```

**Review/Merge Specific Pheromones**

**Working On It**

- **Purpose**: Signal that an agent is actively working on this request
- **Color**: Blue (#3B82F6)
- **Decay**: Fast (0.2 per hour) - requires refresh
- **Usage**: Deposit when starting work, refresh periodically
- **Interpretation**: High intensity = actively working, low intensity = stale signal

**Review Added**

- **Purpose**: Signal that a review has been added
- **Color**: Indigo (#6366F1)
- **Decay**: None - persistent signal
- **Usage**: Automatically added when feedback provided
- **Interpretation**: Triggers deliberation in swarm scenarios

**Shared Pheromone Types**

Review/Merge requests also use general coordination pheromones:

- **Request Split**: Signal that request should be split
- **Importance**: Signal priority or importance
- **Saturation**: Signal that request has many agents working on it
- **Takeup Interest**: Signal interest in working on request
- **Task Not Ready**: Signal blocking dependencies exist
- **Available**: Signal blockers resolved, ready to work
- **Files Blocked**: Signal files reserved by other agents

**Pheromone Intensity**

Intensity values (0-10) indicate strength:

- **1-3**: Low intensity (weak signal)
- **4-6**: Medium intensity (normal signal)
- **7-10**: High intensity (strong signal)

Higher intensity signals override or amplify lower intensity signals of the same type.

**Pheromone Decay**

Some pheromone types decay over time:

- **No Decay (0)**: Signal persists until manually removed
- **Slow Decay (0.05-0.1)**: Signal fades over days
- **Medium Decay (0.2)**: Signal fades over hours
- **Fast Decay (0.5+)**: Signal fades over minutes

Decay formula: `effectiveIntensity = intensity * e^(-decayRate * elapsedHours)`

**Depositing Pheromones**

Agents deposit pheromones to signal:

```typescript
await reviewMergeRequestService.depositPheromone(requestId, {
  type: 'workingonit',
  intensity: 5,
  depositedBy: agentId,
  depositedByName: agentName,
  decayRate: 0.2
});
```

**Reading Pheromones**

Agents read aggregated pheromone data:

```typescript
const pheromones = await reviewMergeRequestService.getPheromonesAggregated(requestId);
// Returns array of aggregated pheromone data by type
```

**Removing Pheromones**

Agents remove their pheromones:

```typescript
await reviewMergeRequestService.removePheromone(
  requestId,
  'workingonit',
  agentId  // Only remove own deposits
);
```

### Lock Mechanism

**What are Locks?**

Locks prevent race conditions by ensuring only one agent works on a request at a time. They're exclusive locks that must be explicitly acquired and released.

**Lock Structure**

```typescript
{
  lockedBy: string,         // Agent ID holding lock
  lockedByName?: string,    // Display name
  lockedAt: string          // ISO timestamp
}
```

**Acquiring Locks**

Agents acquire locks before working:

```typescript
const request = await reviewMergeRequestService.lockRequest(
  requestId,
  agentId,
  agentName
);
```

**Lock Behavior**

- **Exclusive**: Only one agent can hold lock
- **Blocking**: Cannot acquire if already locked
- **Timeout**: No automatic timeout (manual management)
- **Verification**: Only lock holder can release

**Releasing Locks**

Agents release locks when done:

```typescript
const request = await reviewMergeRequestService.unlockRequest(
  requestId,
  agentId  // Must be lock holder
);
```

**Checking Locks**

Agents check if request is locked:

```typescript
const { locked, lock } = await reviewMergeRequestService.isRequestLocked(requestId);
if (locked) {
  console.log(`Locked by ${lock.lockedByName} since ${lock.lockedAt}`);
}
```

**Lock Safety**

- **Always Acquire**: Always acquire lock before modifying request
- **Always Release**: Always release lock when done (use try/finally)
- **Don't Forget**: Locks don't auto-expire, must be manually released
- **Check First**: Always check if locked before attempting to acquire

### Unlock Requests

**What are Unlock Requests?**

When an agent needs a locked request but can't wait, they can request the lock holder to release it. This is a polite way to negotiate access without force.

**Unlock Request Structure**

```typescript
{
  id: string,                  // Unique request ID
  requestedBy: string,         // Agent requesting unlock
  requestedByName?: string,    // Display name
  reason: string,              // Why unlock is needed
  requestedAt: string,         // ISO timestamp
  status: 'pending' | 'approved' | 'rejected',
  respondedAt?: string,        // When lock holder responded
  respondedBy?: string         // Lock holder who responded
}
```

**Requesting Unlock**

Agents request unlock:

```typescript
const request = await reviewMergeRequestService.addUnlockRequest(
  requestId,
  {
    requestedBy: agentId,
    requestedByName: agentName,
    reason: 'Need to review for staging deployment'
  }
);
```

**Approving Unlock**

Lock holder can approve:

```typescript
const request = await reviewMergeRequestService.approveUnlockRequest(
  requestId,
  unlockRequestId,
  lockHolderAgentId
);
// Lock is automatically released when approved
```

**Rejecting Unlock**

Lock holder can reject:

```typescript
const request = await reviewMergeRequestService.rejectUnlockRequest(
  requestId,
  unlockRequestId,
  lockHolderAgentId
);
// Lock remains with holder
```

### Coordination Patterns

**Work Claiming**

Agent claims a request to work on:

```
1. Agent Sees Request of Interest
   ↓
2. Agent Checks if Locked
   ↓
3. If Not Locked, Agent Acquires Lock
   ↓
4. Agent Deposits 'workingonit' Pheromone
   ↓
5. Agent Works on Request
   ↓
6. Agent Completes Work
   ↓
7. Agent Releases Lock
   ↓
8. Agent Removes 'workingonit' Pheromone
```

**Avoiding Conflicts**

Multiple agents avoid same work:

```
1. Two Agents See Same Request
   ↓
2. Both Check for Signals
   ↓
3. One Sees 'workingonit' Signal
   ↓
4. That Agent Chooses Different Work
   ↓
5. Other Agent Continues Working
```

**Requesting Access**

Agent needs locked request:

```
1. Agent Needs Locked Request
   ↓
2. Agent Submits Unlock Request
   ↓
3. Lock Holder Notified
   ↓
4. Lock Holder Reviews Request
   ├─ Approves: Lock Released, Requesting Agent Takes Over
   └─ Rejects: Lock Holder Keeps Lock, Requesting Agent Waits or Moves On
```

**Review Coordination**

Multiple reviewers coordinate:

```
1. First Reviewer Adds Review
   ↓
2. 'reviewadded' Pheromone Deposited
   ↓
3. Other Agents See Review Signal
   ↓
4. Agents May Trigger Deliberation
   ↓
5. Additional Reviews May Be Added
   ↓
6. Consensus Emerges from Multiple Reviews
```

**Priority Signaling**

Agents signal priority:

```
1. Agent Identifies High-Priority Request
   ↓
2. Agent Deposits 'importance' Pheromone
   ↓
3. Other Agents See Importance Signal
   ↓
4. Agents Prioritize This Request
   ↓
5. High-Intensity Signals Get Attention
```

### Swarm Coordination

**Swarm Review Patterns**

In swarm scenarios, coordination signals enable:

- **Parallel Review**: Multiple agents review different aspects
- **Consensus Building**: Reviews aggregate to form consensus
- **Load Balancing**: Agents distribute work based on signals
- **Conflict Resolution**: Agents negotiate through signals

**Deliberation Triggering**

Reviews can trigger swarm deliberation:

```
1. Agent Adds Review
   ↓
2. 'reviewadded' Pheromone Deposited
   ↓
3. Swarm Detects Review Signal
   ↓
4. Deliberation May Be Triggered
   ↓
5. Agents Discuss and Build Consensus
   ↓
6. Final Decision Reached
```

**Saturation Management**

Prevent too many agents on same request:

```
1. Multiple Agents Deposit 'workingonit'
   ↓
2. Saturation Pheromone Builds Up
   ↓
3. New Agents See High Saturation
   ↓
4. New Agents Choose Different Work
   ↓
5. Work Distributes Across Requests
```

### Best Practices

**Pheromone Usage**

- **Signal Intent**: Use pheromones to clearly signal intentions
- **Respect Signals**: Pay attention to other agents' signals
- **Clean Up**: Remove signals when no longer relevant
- **Appropriate Intensity**: Use intensity to convey strength
- **Type Selection**: Choose appropriate pheromone types

**Lock Management**

- **Always Lock**: Always acquire lock before modifying
- **Always Release**: Always release lock in finally block
- **Keep Brief**: Hold locks for minimum time necessary
- **Check First**: Always check if locked before acquiring
- **Don't Forget**: Locks don't auto-expire

**Unlock Requests**

- **Provide Context**: Explain why unlock is needed
- **Be Patient**: Give lock holder time to respond
- **Accept Decisions**: Respect approval or rejection
- **Use Sparingly**: Only request unlock when truly necessary
- **Consider Alternatives**: Sometimes better to find different work

**Signal Interpretation**

- **Consider Decay**: Account for signal decay when reading
- **Check Depositor**: See who deposited signal
- **Look for Patterns**: Multiple signals of same type amplify message
- **Check Age**: Old signals may no longer be relevant
- **Aggregate**: Look at aggregate data, not individual deposits

### Configuration

**Custom Pheromone Types**

Add custom signal types:

```typescript
await coordinationService.addPheromoneType({
  name: 'needs_testing',
  displayName: 'Needs Testing',
  description: 'Request needs testing before merge',
  color: '#F59E0B',
  defaultDecayRate: 0.1
});
```

**Pheromone Type Management**

```typescript
// Get all types
const types = await coordinationService.getPheromoneTypes();

// Remove custom type (can't remove defaults)
await coordinationService.removePheromoneType('needs_testing');
```

**Decay Rate Tuning**

Adjust decay rates for custom types:

- **0**: No decay - persistent signal
- **0.05**: Slow decay - lasts days
- **0.1**: Medium decay - lasts hours
- **0.2**: Fast decay - lasts hours, needs refresh
- **0.5+**: Very fast - lasts minutes

### Troubleshooting

**Lock Conflicts**

- **Stale Locks**: Lock holder forgot to release
  - Solution: Request unlock from lock holder
  - Prevention: Always use try/finally for lock management

- **Can't Acquire Lock**: Request already locked
  - Solution: Request unlock or find different work
  - Prevention: Check lock status before planning work

- **Lock Leaks**: Unreleased locks accumulating
  - Solution: Implement lock timeout mechanism
  - Prevention: Add automatic lock expiration

**Pheromone Issues**

- **Stale Signals**: Old pheromones still present
  - Solution: Implement periodic cleanup
  - Prevention: Use appropriate decay rates

- **Signal Confusion**: Conflicting pheromone signals
  - Solution: Check depositor and timestamp
  - Prevention: Use consistent signal conventions

- **Missing Signals**: Expected signals not present
  - Solution: Verify pheromone type exists
  - Prevention: Use standard pheromone types

### Use Cases

**Primary Use Cases**

1. **Conflict Prevention**: Multiple agents avoiding same work
2. **Work Coordination**: Agents signaling what they're working on
3. **Priority Management**: Signaling important work
4. **Review Coordination**: Multiple reviewers coordinating
5. **Status Communication**: Broadcast state without messaging

**Secondary Use Cases**

1. **Load Balancing**: Distribute work based on signals
2. **Negotiation**: Request access to locked resources
3. **Swarm Intelligence**: Collective decision-making
4. **Audit Trail**: Track who worked on what
5. **Analytics**: Analyze agent behavior patterns

### Integration Points

**With Review/Merge Requests**

- Pheromones stored on request objects
- Locks prevent concurrent modifications
- Signals visible in request detail view
- Aggregated data shown in request list

**With Agent System**

- Agents deposit signals as they work
- Agents check signals before acting
- Agents respect locks and unlock requests
- Agent training includes signal etiquette

**With Coordination Service**

- Shared service across all coordinated entities
- Consistent signal types across system
- Unified coordination patterns
- Centralized signal management

### Related Concepts

- **[Merge Requests](./merge-requests.md)**: Request lifecycle and coordination
- **[Stigmergy Coordination](../stigmergy-system/stigmergy-coordination.md)**: Broader coordination patterns
- **[Agent Coordination](../swarm-management/agent-coordination.md)**: Multi-agent coordination strategies
- **[Swarm Intelligence](../swarm-management/swarm-intelligence.md)**: Collective behavior patterns
- **[Pheromone System](../stigmergy-system/pheromone-system.md)**: Complete pheromone reference
- **[File Update Intents](../development-tools/file-update-intents.md)**: File-level coordination

### Future Enhancements

**Planned Features**

- **Automatic Lock Expiration**: Time-based lock release
- **Signal Aggregation Rules**: Custom aggregation logic
- **Visual Signal Display**: Enhanced UI for signals
- **Signal Analytics**: Analyze signal patterns
- **Smart Signal Suggestions**: AI-powered signal recommendations
- **Conflict Prediction**: Predict potential conflicts
- **Signal Templates**: Predefined signal patterns
- **Cross-Entity Signals**: Signals spanning multiple entities
- **Signal Prioritization**: Priority-based signal processing
- **Historical Signal Analysis**: Learn from signal history
