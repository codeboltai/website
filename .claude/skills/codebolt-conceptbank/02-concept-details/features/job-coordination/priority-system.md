---
title: "Job Priority System"
description: "Understanding priority levels, how they affect job execution, and best practices for prioritization"
tags: ["job-coordination", "jobs", "priority", "workflow", "planning"]
---

## Job Priority System

### Executive Summary

The job priority system provides a structured way to indicate the urgency and importance of work, enabling agents and users to make informed decisions about what to work on first. With four clear priority levels (plus an optional "not set" state), jobs can be sorted, filtered, and displayed based on their importance. Priority affects job ordering in views, influences agent bidding decisions, and helps ensure critical work gets attention.

### Priority Levels

**The Four Levels**

Jobs can have priority 1-4:

- **4 - Urgent**: Immediate attention required
  - Critical bugs or security issues
  - Production outages
  - Deadline-driven work
  - Customer-impacting problems

- **3 - High**: Important, should be done soon
  - Important features
  - Significant bugs
  - Planned work for current sprint
  - Default priority for new jobs

- **2 - Medium**: Normal priority
  - Routine feature work
  - Standard bug fixes
  - Maintenance tasks
  - Documentation updates

- **1 - Low**: Can be deferred
  - Nice-to-have features
  - Minor improvements
  - Technical debt cleanup
  - Low-impact bugs

**Not Set (null)**

Jobs can also have no priority set:
- Indicates priority hasn't been considered
- Treated as lower than low priority in sorting
- Should be updated to explicit priority
- Useful for job creation before prioritization

### Priority in Job Structure

```typescript
interface Job {
  priority?: JobPriority | null;
  // JobPriority = 1 | 2 | 3 | 4
}
```

**Example**

```json
{
  "id": "BUG-1",
  "name": "Fix authentication bypass",
  "priority": 4,
  "status": "open"
}
```

### Priority and Job Ordering

**Sorting by Priority**

Jobs are typically sorted:
1. By priority (highest first)
2. Then by creation date or last updated
3. Within same priority, most recent first

**Sort Order**

```
Priority 4 (Urgent)
  ├─ BUG-1: Auth bypass (created 2h ago)
  └─ BUG-2: Data leak (created 1h ago)
Priority 3 (High)
  ├─ FEAT-1: User profiles (created yesterday)
  └─ FEAT-2: Search feature (created today)
Priority 2 (Medium)
  └─ TASK-1: Update docs (created last week)
Priority 1 (Low)
  └─ CHORE-1: Clean up code (created last month)
```

**Query Sorting**

```typescript
// Get jobs sorted by priority
await fetchJobs({
  sortBy: 'priority',
  sortOrder: 'desc'  // Highest priority first
});
```

### Priority and Filtering

**Filter by Priority**

Jobs can be filtered to specific levels:

```typescript
// Only urgent and high priority
await fetchJobs({
  priorityMin: 3
});

// Only low priority
await fetchJobs({
  priority: [1]
});

// Urgent only
await fetchJobs({
  priority: [4]
});
```

**Priority Views**

Different views for different needs:
- **Urgent View**: Only priority 4, for crisis management
- **Backlog**: Priority 1-2, for planning
- **Sprint**: Priority 3-4, for current work
- **All Jobs**: All priorities, full visibility

### Priority Visual Indicators

**Color Coding**

Jobs display priority with colors:
- **Priority 4**: Red (`--theme-terminalAnsiRed`)
- **Priority 3**: Magenta (`--theme-terminalAnsiMagenta`)
- **Priority 2**: Yellow (`--theme-terminalAnsiYellow`)
- **Priority 1**: Gray (`--theme-textSeparator`)
- **Not Set**: Gray (`--theme-textSeparator`)

**Icons and Labels**

```
🔴 Urgent (4) - Critical
🟣 High (3) - Important
🟡 Medium (2) - Normal
⚪ Low (1) - Deferred
⚪ Not Set (0) - Unprioritized
```

### Priority and Bidding

**Influence on Bids**

Priority affects agent bidding:
- Higher priority jobs attract more bids
- Agents bid higher priority scores on important jobs
- Urgent jobs may have expedited bidding
- Lower priority jobs may get fewer bids

**Bid Priority Calculation**

Agents may calculate bid priority based on:

```typescript
baseScore = 5
+ jobPriority (1-4)
+ expertiseMatch (0-3)
+ availability (0-2)
= bidPriority (0-10)
```

**Example**

Urgent job (priority 4):
- Expert agent: 5 + 4 + 3 + 1 = 13 (capped at 10)
- Learning agent: 5 + 4 + 0 + 2 = 11 (capped at 10)

Low priority job (priority 1):
- Expert agent: 5 + 1 + 3 + 1 = 10
- Learning agent: 5 + 1 + 0 + 2 = 8

### Priority and Dependencies

**Dependency Prioritization**

When jobs depend on each other:
- Dependencies often have higher priority
- Completing dependency enables dependent job
- Priority can cascade through dependency chain

**Example**

```
FEAT-5 (priority 3): Build user dashboard
  └─ Depends on: API-2 (priority 4) - Get user data

API-2 has higher priority because:
- It blocks FEAT-5
- FEAT-5 is important
- API-2 must complete first
```

**Priority Inheritance**

When splitting jobs:
- Sub-jobs inherit parent job priority
- Can be adjusted individually if needed
- Allows prioritizing important components

### Priority Lifecycle

**Initial Priority**

Set when job is created:
- Default is 3 (high) if not specified
- Can be set to any level 1-4
- Can be left null (not set)
- Should reflect current understanding

**Priority Changes**

Priority can change over time:
- **Increase**: Situation becomes more urgent
- **Decrease**: Less important than initially thought
- **Review**: Regular priority assessment
- **Adjust**: As context changes

**Timeline Events**

```json
{
  "eventType": "priority_changed",
  "actor": "user_456",
  "actorName": "Alice",
  "data": {
    "from": 2,
    "to": 4,
    "reason": "Customer reported production issue"
  },
  "description": "Priority changed from Medium to Urgent"
}
```

### Priority Assignment Guidelines

**When to Use Priority 4 (Urgent)**

- Production is down or severely degraded
- Security vulnerability being exploited
- Data loss or corruption occurring
- Critical deadline within hours
- Major customer impact

**When to Use Priority 3 (High)**

- Important features for current sprint
- Significant bugs affecting users
- Planned work with deadlines
- Dependencies for other important work

**When to Use Priority 2 (Medium)**

- Standard feature development
- Routine bug fixes
- Regular maintenance
- Documentation improvements

**When to Use Priority 1 (Low)**

- Nice-to-have enhancements
- Minor optimizations
- Backlog items
- Technical debt (when no urgent issues)

### Priority Management

**Regular Review**

Priority should be reviewed:
- **Daily**: Urgent jobs (still urgent?)
- **Weekly**: High priority jobs
- **Sprint Planning**: All active jobs
- **As Needed**: When context changes

**Priority Creep**

Avoid these problems:
- Everything becoming urgent
- Priority inflation over time
- Losing meaning of levels
- Agents ignoring priorities

**Anti-Patterns**

1. **Always Urgent**: Every job marked priority 4
2. **Never Set**: Leaving priority as null
3. **Static Priority**: Never updating priorities
4. **Priority Ignored**: Sorting by date instead
5. **Conflicting Priorities**: Dependencies with lower priority

### Priority in Multi-Agent Context

**Agent Decision Making**

Agents use priority to:
- Choose which jobs to bid on
- Decide what to work on first
- Determine if they should interrupt current work
- Select from multiple available jobs

**Priority vs Availability**

Agents balance:
- Job priority (how important)
- Agent availability (am I free)
- Agent expertise (am I qualified)
- Current workload (can I take this)

**Example Agent Logic**

```
IF job.priority == 4 AND I.amExpert():
  interrupt current work
  bid on urgent job
ELSE IF job.priority == 3 AND I.amAvailable():
  bid on high priority job
ELSE IF job.priority == 2 AND I.haveCapacity():
  bid on medium priority job
```

### Priority and Pheromones

**Importance Pheromone**

Agents deposit `importance` pheromone:
- Reinforces priority signals
- Decentralized urgency communication
- Complements explicit priority
- Attracts attention to important jobs

**Saturation Pheromone**

Indicates job is being handled:
- High priority jobs may have many deposits
- Signals work is in progress
- Prevents too many agents on same job
- Coordinates despite high priority

### Best Practices

**For Users**

1. **Set priority when creating jobs**: Don't leave as null
2. **Review priorities regularly**: Keep them current
3. **Use sparingly**: Not everything should be urgent
4. **Communicate changes**: Explain why priority changed
5. **Align with team**: Ensure priority agreement

**For Agents**

1. **Respect priority**: Work on urgent jobs first
2. **Bid appropriately**: Higher bids for higher priority
3. **Consider expertise**: Don't bid on urgent jobs if unqualified
4. **Communicate**: Let others know about priority concerns
5. **Suggest changes**: Propose priority adjustments if needed

### Key Capabilities

**Structured Urgency**
- Four clear levels
- Optional "not set" state
- Easy to understand
- Consistent interpretation

**Influences Execution**
- Affects job ordering
- Guides agent decisions
- Impacts bidding
- Prioritizes resource allocation

**Flexible Adjustment**
- Can change over time
- Timeline tracks changes
- Reason for change recorded
- Responds to context

**Visual Indicators**
- Color coding
- Clear labels
- Sortable and filterable
- Easy to scan

### Use Cases

**Production Incident**

Critical bug discovered:
- Job created with priority 4
- Appears at top of all lists
- Agents interrupted and notified
- Bidding expedited
- Fast resolution

**Sprint Planning**

Team plans upcoming work:
- Important features marked priority 3
- Backlog items marked priority 2
- Nice-to-haves marked priority 1
- Clear focus for sprint

**Triage**

Reviewing incoming work:
- Assess each new job
- Assign appropriate priority
- Schedule accordingly
- Maintain balance

**Resource Allocation**

Limited agent capacity:
- High priority jobs get attention first
- Medium priority when capacity available
- Low priority deferred until quiet time
- Optimal use of resources

### Related Concepts

- **[Job System Overview](./job-system-overview.md)**: Job properties including priority
- **[Job Lifecycle](./job-lifecycle.md)**: How priority affects job state
- **[Blockers](./blockers.md)**: Balancing priority with dependencies
- **[Job Bidding](./job-bidding.md)**: How priority influences agent bidding
- **[Stigmergy System](../stigmergy-system/)**: Pheromone signals for importance
