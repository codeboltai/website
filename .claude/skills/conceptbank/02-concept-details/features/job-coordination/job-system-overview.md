---
title: "Job System Overview"
description: "Understanding jobs, job groups, and the foundational concepts of CodeBolt's task coordination system"
tags: ["job-coordination", "jobs", "task-management", "overview"]
---

## Job System Overview

### Executive Summary

CodeBolt's Job System provides a structured approach to tracking, organizing, and coordinating work across multiple agents and users. Jobs represent discrete units of work that can be assigned, prioritized, split, and coordinated through various mechanisms including locking, bidding, and pheromone-based signaling. Job groups organize related work into collections, enabling hierarchical management and clear ownership boundaries.

### What is a Job?

A **Job** is the fundamental unit of trackable work in CodeBolt. Every job represents a specific task, feature, bug fix, or chore that needs to be completed. Jobs are designed to be:

- **Trackable**: Every job has a unique ID, creation timestamp, and complete history
- **Coordinated**: Multiple agents can work on jobs without conflicts through locking mechanisms
- **Observable**: All job changes are logged as timeline events for auditing and debugging
- **Flexible**: Jobs can be split, merged, and reorganized as work evolves
- **Prioritized**: Jobs have explicit priority levels to guide execution decisions

**Job Identifier Format**

Jobs use a structured ID format: `{GroupShortName}-{SequenceNumber}`

Examples:
- `COD2-5` (5th job in group "COD2")
- `FEAT-12` (12th job in group "FEAT")
- `BUG-1` (1st job in group "BUG")

This format makes jobs easy to reference in conversation and documentation while maintaining uniqueness.

### What is a Job Group?

A **Job Group** is a container for organizing related jobs. Groups provide:

- **Namespace**: Jobs belong to a group, preventing ID collisions
- **Organization**: Related work is grouped together (e.g., "Frontend", "Backend", "Documentation")
- **Ownership**: Groups can have parent groups, creating hierarchical structures
- **Short Names**: Each group has a 3-4 character short name for job IDs

**Group Structure**

```
Project (Root)
├── FEAT (Frontend Features)
│   ├── FEAT-1: Login page redesign
│   ├── FEAT-2: User profile component
│   └── FEAT-3: Dashboard widgets
├── BUG (Bug Fixes)
│   ├── BUG-1: Memory leak in worker
│   └── BUG-2: Race condition in state update
└── DOCS (Documentation)
    ├── DOCS-1: API documentation
    └── DOCS-2: User guide
```

### Job Properties

Every job contains the following core properties:

**Identity**
- `id`: Unique identifier (e.g., "COD2-5")
- `groupId`: Reference to the job group
- `sequenceNumber`: Auto-incrementing number within the group

**Content**
- `name`: Job title
- `description`: Detailed description of the work
- `type`: Category (bug, feature, task, epic, chore)
- `notes`: Additional contextual information

**State**
- `status`: Current state (open, working, hold, closed, archived)
- `priority`: Urgency level (1-4, with 4 being urgent)
- `assignees`: List of agents/users assigned to the job
- `labels`: Tags for categorization and filtering

**Relationships**
- `dependencies`: Jobs that must complete before this one
- `parentJobId`: If this is a sub-job, reference to parent
- `discoveredFrom`: If split from another job, reference to source

**Coordination**
- `lock`: Current lock state (who is working on it)
- `bids`: Active bids from agents wanting to work on it
- `blockers`: Issues preventing work from starting
- `pheromones`: Stigmergy signals for decentralized coordination

**Metadata**
- `createdAt`: When the job was created
- `updatedAt`: When the job was last modified
- `closedAt`: When the job was completed
- `archivedAt`: When the job was archived

### Job Types

Jobs can be categorized into five types:

1. **Bug**: Defects or issues that need fixing
   - High priority typically
   - Often have clear reproduction steps
   - May require investigation before solution

2. **Feature**: New functionality or enhancements
   - Larger scope than tasks
   - May require multiple jobs to complete
   - Often split into sub-jobs during implementation

3. **Task**: General work items
   - Default type for most work
   - Can be anything from refactoring to testing
   - Flexible and broadly applicable

4. **Epic**: Large initiatives that span multiple jobs
   - Often contain many related tasks
   - May represent complete features or projects
   - Useful for organizing and tracking progress

5. **Chore**: Maintenance or operational tasks
   - Lower priority typically
   - Includes cleanup, updates, documentation
   - Necessary but not urgent work

### Job Status Flow

Jobs progress through defined states:

```
open → working → closed
  ↓       ↓
hold   archived
```

- **Open**: Job is ready to be worked on
- **Working**: Someone is actively working on it
- **Hold**: Job is paused or blocked (backlog)
- **Closed**: Job is completed
- **Archived**: Job is historical and no longer active

### Priority Levels

Jobs have four priority levels (excluding "Not Set"):

- **4 - Urgent**: Immediate attention required
- **3 - High**: Important, should be done soon
- **2 - Medium**: Normal priority
- **1 - Low**: Can be deferred

Priority affects job ordering and helps agents decide what to work on next.

### Key Capabilities

**Organization**
- Group related jobs together
- Filter and sort by any property
- View jobs in list, tree, timeline, or heatmap views
- Collapse/expand groups for easier navigation

**Coordination**
- Lock jobs to prevent conflicts
- Bid on jobs for market-based allocation
- Track blockers and dependencies
- Use pheromones for decentralized signaling

**Decomposition**
- Split large jobs into smaller ones
- Track split proposals and acceptance
- Link sub-jobs back to parent
- Maintain discovery history

**Observability**
- Complete timeline of all changes
- Real-time updates via WebSocket
- Event filtering and time-range queries
- Actor tracking for all actions

**Flexibility**
- Add custom labels for categorization
- Configure display settings per view
- Create custom pheromone types
- Extend with additional metadata

### Use Cases

**Software Development**
- Track features and bug fixes
- Manage sprint backlogs
- Coordinate between teams
- Maintain release history

**Multi-Agent Coordination**
- Allocate work to specialized agents
- Prevent conflicts through locking
- Enable self-organization via bidding
- Coordinate without central orchestration

**Project Management**
- Organize work into groups
- Track progress and blockers
- Maintain audit trails
- Generate reports and metrics

### Related Concepts

- **[Job Lifecycle](./job-lifecycle.md)**: How jobs move from creation to completion
- **[Job Locking](./job-locking.md)**: Preventing conflicts with fast resource reservation
- **[Job Bidding](./job-bidding.md)**: Market-based job allocation system
- **[Job Splitting](./job-splitting.md)**: Breaking large jobs into manageable pieces
- **[Blockers](./blockers.md)**: Managing dependencies and what prevents execution
- **[Priority System](./priority-system.md)**: How priority affects job execution
- **[Stigmergy System](../stigmergy-system/)**: Pheromone-based decentralized coordination
- **[Agent Management](../agent-management/)**: How agents interact with jobs
