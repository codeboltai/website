---
title: "Job Splitting"
description: "Decomposing large jobs into smaller, manageable pieces through proposals and acceptance workflow"
tags: ["job-coordination", "jobs", "splitting", "decomposition", "task-management"]
---

## Job Splitting

### Executive Summary

Job splitting enables agents and users to break down large, complex jobs into smaller, more manageable pieces. Through a proposal-based workflow, jobs can be decomposed into sub-jobs that inherit context from the parent while maintaining clear lineage. This systematic approach to task decomposition makes large projects approachable, allows parallel execution, and provides fine-grained tracking of progress.

### Why Split Jobs?

**Problems with Large Jobs**

- **Overwhelming**: Too much work for one agent or session
- **Blockers**: One blocker halts entire job
- **Parallelization**: Cannot work on multiple parts simultaneously
- **Tracking**: Difficult to measure partial progress
- **Assignment**: Hard to match expertise to specific subtasks

**Benefits of Splitting**

- **Manageability**: Smaller jobs are easier to complete
- **Parallelization**: Multiple agents can work on different parts
- **Specialization**: Different experts for different components
- **Progress Tracking**: See which parts are done
- **Risk Mitigation**: Failure in one part doesn't block others
- **Clarity**: Clear boundaries and responsibilities

### Split Status Tracking

Jobs track their split state:

```typescript
type SplitStatus = 'not_split' | 'partial_split' | 'split_up';

interface Job {
  splitStatus?: SplitStatus;
  discoveredFrom?: string;  // Parent job ID if split from another
}
```

**Split Status Values**

- **not_split**: Job is intact, hasn't been split
- **partial_split**: Some parts split off, but original remains
- **split_up**: Job completely decomposed, no longer active

### Split Proposals

**Proposal Structure**

```typescript
interface JobSplitProposal {
  id: string;              // UUID
  jobId: string;           // Job being split
  proposedBy: string;      // Agent or user proposing
  proposedAt: string;      // ISO timestamp
  description: string;     // Rationale for splitting
  proposedJobs: ProposedJob[];
  status: 'pending' | 'accepted' | 'rejected';
}

interface ProposedJob {
  name: string;
  description: string;
}
```

**Example Proposal**

```json
{
  "id": "prop_123",
  "jobId": "FEAT-5",
  "proposedBy": "agent_decomposer",
  "proposedAt": "2025-01-18T14:30:00Z",
  "description": "This feature is too large for a single implementation. I propose splitting it into three components: authentication UI, backend API, and database schema. This allows frontend, backend, and database specialists to work in parallel.",
  "proposedJobs": [
    {
      "name": "Implement authentication UI components",
      "description": "Create login form, registration form, and password reset UI using React. Include form validation and error handling."
    },
    {
      "name": "Build authentication API endpoints",
      "description": "Implement REST API endpoints for login, registration, password reset, and token refresh using Express.js and JWT."
    },
    {
      "name": "Design and implement user database schema",
      "description": "Create user table with authentication fields, indexes for email lookups, and migration scripts."
    }
  ],
  "status": "pending"
}
```

### Splitting Workflow

**1. Identify Split Opportunity**

Agent or user recognizes job is too large:
- Job has multiple distinct components
- Different skills needed for different parts
- Work can be done in parallel
- Estimated time is very long
- Multiple natural subtasks exist

**2. Create Split Proposal**

Propose how to decompose the job:
- Analyze job requirements
- Identify natural boundaries
- Create sub-job descriptions
- Provide rationale
- Submit proposal

**3. Review and Evaluate**

Others review the proposal:
- Check if splits make sense
- Verify descriptions are clear
- Assess if splits are independent
- Consider parallelization potential
- Decide acceptance

**4. Accept or Reject**

Decision on the proposal:

**Accept**
- Status changes to `accepted`
- Original job marked as `split_up`
- New jobs created from proposals
- New jobs linked to original via `discoveredFrom`
- Original job can be closed
- Timeline events logged

**Reject**
- Status changes to `rejected`
- Original job remains intact
- Job stays as `not_split`
- Reason for rejection recorded
- Alternative proposal can be made

**5. Execute Sub-Jobs**

After acceptance:
- Each sub-job is independent
- Can be assigned to different agents
- Work can proceed in parallel
- Each sub-job has its own lifecycle
- Progress tracked individually

**Timeline Events**

```json
// Split proposed
{
  "eventType": "split_proposed",
  "actor": "agent_decomposer",
  "data": {
    "proposalId": "prop_123",
    "proposedJobCount": 3
  },
  "description": "Split proposed with 3 jobs"
}

// Split accepted
{
  "eventType": "split_accepted",
  "actor": "user_456",
  "data": {
    "proposalId": "prop_123",
    "createdJobCount": 3
  },
  "description": "Split accepted, 3 jobs created"
}
```

### Job Lineage

**Discovery Tracking**

When jobs are split:
- Original job: `FEAT-5` (marked `split_up`)
- New jobs: `FEAT-6`, `FEAT-7`, `FEAT-8`
- Each new job has `discoveredFrom: "FEAT-5"`

**Visualizing Lineage**

```
FEAT-5 (User Authentication)
├── Status: split_up
├── Discovered children:
│   ├── FEAT-6 (Auth UI) [discoveredFrom: FEAT-5]
│   ├── FEAT-7 (Auth API) [discoveredFrom: FEAT-5]
│   └── FEAT-8 (User Schema) [discoveredFrom: FEAT-5]
```

**Benefits of Lineage**

- **Traceability**: See where a job came from
- **Context**: Understand original intent
- **Reconstruction**: Can see original scope
- **Learning**: Understand decomposition patterns
- **Audit**: Complete history of project structure

### Splitting Strategies

**1. Architectural Layers**

Split by technical layer:
- Frontend/UI work
- Backend/API work
- Database/schema work
- Infrastructure/DevOps work

**Example**
```
"Implement user profile feature" →
  - "Design user profile database schema"
  - "Build user profile REST API"
  - "Create user profile UI components"
```

**2. Functional Components**

Split by feature components:
- Each component becomes a job
- Independent functionality
- Clear interfaces between components

**Example**
```
"Build e-commerce checkout" →
  - "Implement shopping cart"
  - "Build payment processing"
  - "Create order confirmation"
  - "Add email notifications"
```

**3. Sequential Steps**

Split by workflow steps:
- Each step is a job
- Dependencies between steps
- Cannot parallelize easily

**Example**
```
"Deploy application to production" →
  - "Set up production infrastructure"
  - "Configure CI/CD pipeline"
  - "Deploy application"
  - "Run smoke tests"
```

**4. User Stories**

Split by user value:
- Each user story is a job
- Independent value delivery
- Can prioritize individually

**Example**
```
"Improve user onboarding" →
  - "Add welcome tutorial"
  - "Implement progress tracking"
  - "Create achievement system"
  - "Build user profile completion"
```

**5. Risk-Based**

Split by risk level:
- High-risk parts separate from low-risk
- Can test risky parts early
- Low-risk parts can proceed faster

**Example**
```
"Migrate to new database" →
  - "Build migration script"
  - "Test migration on staging"
  - "Run production migration"
  - "Validate data integrity"
```

### Partial Splitting

**What is Partial Splitting?**

Job split but original remains:
- Some components extracted
- Original job continues with remaining work
- Status set to `partial_split`
- Both original and new jobs active

**When to Use**

- Job has clear separable concerns
- Want to start work on one part immediately
- Other parts need more planning
- Incremental decomposition preferred

**Example**

```
Original: "Build user authentication system"
Partial split: "Implement OAuth integration" (FEAT-6)
Remaining: "Build local username/password auth" (FEAT-5, status: partial_split)
```

### Managing Proposals

**Creating Proposals**

```typescript
await addSplitProposal(jobId, {
  proposedBy: "agent_decomposer",
  description: "Rationale for splitting...",
  proposedJobs: [
    { name: "Sub-job 1", description: "..." },
    { name: "Sub-job 2", description: "..." }
  ]
});
```

**Deleting Proposals**

Remove proposal before acceptance:
```typescript
await deleteSplitProposal(jobId, proposalId);
```

**Accepting Proposals**

Execute the split:
```typescript
await acceptSplitProposal(jobId, proposalId);
// Creates new jobs, updates original job status
```

### Best Practices

**When to Split**

1. **Jobs estimated > 8 hours**: Likely too large
2. **Multiple skill areas needed**: Different specialists
3. **Clear natural boundaries**: Distinct components
4. **Parallelization possible**: Independent parts
5. **Risk mitigation needed**: Don't want all-or-nothing

**How to Split Well**

1. **Keep sub-jobs independent**: Minimize dependencies
2. **Make descriptions clear**: Each job should be self-contained
3. **Estimate sizes**: Aim for 2-4 hours per sub-job
4. **Maintain context**: Each job should reference the original
5. **Test the split**: Verify each sub-job makes sense alone

**Anti-Patterns**

1. **Over-splitting**: Creating too many tiny jobs
2. **Coupled splits**: Sub-jobs that depend heavily on each other
3. **Vague descriptions**: Unclear what each sub-job does
4. **Forgetting lineage**: Not tracking where jobs came from
5. **Splitting too early**: Before understanding the problem

### Coordination with Other Features

**Dependencies**

- Sub-jobs can have dependencies on each other
- Original job doesn't automatically have dependencies
- Must explicitly add dependencies if needed

**Blockers**

- Each sub-job has its own blockers
- Blocker in one sub-job doesn't block others
- Clear isolation of concerns

**Priority**

- Sub-jobs inherit parent job priority by default
- Can be adjusted individually if needed
- Allows prioritizing important components first

**Labels**

- Sub-jobs inherit parent labels
- Additional labels can be added for specificity
- Helps with filtering and organization

### Key Capabilities

**Systematic Decomposition**
- Proposal-based workflow
- Review before acceptance
- Clear rationale required
- Trackable decisions

**Lineage Tracking**
- DiscoveredFrom links
- Complete history
- Reconstruction possible
- Pattern learning

**Flexible Splitting**
- Full or partial splits
- Multiple strategies
- Independent sub-jobs
- Maintains context

**Parallel Execution**
- Independent sub-jobs
- Multiple agents
- Faster completion
- Specialized work

### Use Cases

**Large Features**

Epic feature → Multiple implementable jobs:
- "Build notification system" → UI, API, Scheduler, Templates
- Each component can be worked on independently
- Faster overall completion

**Multi-Disciplinary Work**

Jobs requiring different expertise:
- "Implement machine learning pipeline"
- Split into: Data collection, Training, Inference API, UI
- Right specialist for each component

**Risk Mitigation**

Uncertain or risky work:
- "Migrate legacy system"
- Split into: Prototype, Partial migration, Full migration, Validation
- Can stop or adjust after each step

**Parallel Development**

Time-critical work:
- "Build MVP for demo"
- Split into: Auth, Core features, UI, Data import
- Multiple agents work simultaneously
- Meet tight deadline

### Related Concepts

- **[Job System Overview](./job-system-overview.md)**: Jobs and their structure
- **[Job Lifecycle](./job-lifecycle.md)**: How split jobs progress
- **[Blockers](./blockers.md)**: Managing dependencies in sub-jobs
- **[Priority System](./priority-system.md)**: Prioritizing sub-jobs
- **[Agent Collaboration](../agent-management/agent-collaboration.md)**: Agents working on split jobs
