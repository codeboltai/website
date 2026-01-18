---
title: "Merge Requests"
description: "CodeBolt's pull-request equivalent for agent-generated changes"
tags: ["merge", "pull-request", "agent-workflow", "version-control"]
---

## Merge Requests

### Executive Summary

Merge Requests are CodeBolt's equivalent of pull requests, designed specifically for AI agent workflows. They provide a structured mechanism for agents to propose larger changesets, track review progress, manage approvals, and execute merges with configurable strategies. Unlike simple code reviews, Merge Requests support full diff patches, multi-file changes, linked issues, and coordination signals for multi-agent environments.

### What are Merge Requests?

Merge Requests (MRs) are comprehensive proposals for code changes that include:

- **Complete Diff Representation**: Full unified diff patches showing all changes
- **Multi-File Scope**: Track changes across multiple files in one request
- **Review Workflow**: Structured review process with multiple reviewers
- **Merge Strategies**: Configurable merge approaches (patch or git worktree)
- **Linkage System**: Connect to jobs, issues, and other requests
- **Coordination Signals**: Pheromones and locks for multi-agent coordination
- **Scope Awareness**: Context of agent, swarm, or orchestrator operations

**Key Benefits**

- **Structured Review**: Formal review process with clear approval requirements
- **Change Tracking**: Complete audit trail of proposed and merged changes
- **Multi-Agent Coordination**: Built-in support for swarm and orchestrator contexts
- **Flexible Merging**: Choose between patch-based or git worktree merge strategies
- **Issue Linkage**: Connect changes to related work items and dependencies
- **Decentralized Signaling**: Use pheromones to coordinate without central orchestration

### Key Capabilities

**Request Types**

- **Review Only**: Request feedback without intent to merge immediately
- **Review & Merge**: Full workflow from review through merge execution

**Request Lifecycle**

Merge Requests progress through these states:

1. **Draft**: Initial state, not yet submitted for review
2. **Pending Review**: Submitted, waiting for reviewers
3. **In Review**: Currently being reviewed
4. **Changes Requested**: Reviewer requested modifications
5. **Approved**: Approved by required reviewers
6. **Review Completed**: Review finished, ready for merge decision
7. **Merged**: Successfully merged into target
8. **Rejected**: Rejected by reviewer
9. **Closed**: Closed without merge

**Merge Strategies**

- **Patch Strategy**: Apply diff patch directly to files
  - Simple and fast
  - No git operations required
  - Good for small changes
  - May have conflicts with concurrent changes

- **Git Worktree Strategy**: Use git worktrees for isolated merging
  - Full git history preservation
  - Supports conflict resolution
  - Branch-based workflow
  - Better for large, complex changes

**Scope Context**

Merge Requests can be created in different contexts:

- **Agent**: Single agent working independently
- **Swarm**: Coordinated group of agents working together
- **Orchestrator**: Managed by an orchestrator agent

### Merge Request Structure

**Core Request Data**

Each Merge Request contains:

- **Request ID**: Unique identifier (e.g., "rmr-a1b2c3d4")
- **Type**: review or review_merge
- **Status**: Current lifecycle state
- **Title**: Short descriptive title
- **Description**: Detailed description of changes
- **Initial Task**: Original task that prompted the request

**Task Context**

- **Agent ID**: Agent that created the request
- **Agent Name**: Display name of agent
- **Scope**: agent, swarm, or orchestrator
- **Scope Instance ID**: ID of swarm or orchestrator
- **Swarm ID**: Legacy field for swarm reference

**Change Details**

- **Major Files Changed**: List of primary files modified
- **Diff Patch**: Unified diff format of all changes
- **Changes File Path**: Link to detailed changes summary
- **Merge Configuration**: Strategy and merge details

**Merge Configuration**

For review_merge type requests:

```typescript
{
  strategy: 'patch' | 'git_worktree',
  worktreeDetails?: {
    worktreePath: string,
    branchName: string,
    baseBranch?: string,
    commitHash?: string
  },
  patchContent?: string
}
```

**Additional Metadata**

- **Issues Faced**: Problems encountered during work
- **Remaining Tasks**: Outstanding work items
- **Linked Job IDs**: Jobs/issues created from review
- **Proposed Jobs**: Jobs proposed during review
- **Pheromones**: Coordination signals
- **Lock**: Agent lock on the request
- **Unlock Requests**: Requests to release lock

**Timestamps**

- **Created At**: When request was created
- **Updated At**: Last modification time
- **Merged At**: When merge was completed
- **Closed At**: When request was closed

### How Merge Requests Work

**Creation Flow**

```
1. Agent Completes Work
   ↓
2. Agent Generates Diff Patch
   ↓
3. Agent Creates Merge Request
   ↓
4. Request Stored in .codebolt/review_merge_requests/
   ↓
5. WebSocket Event Broadcast to All Clients
   ↓
6. Request Appears in Merge Request Board
   ↓
7. Reviewers Can See and Interact with Request
```

**Review Process**

```
1. Reviewer Opens Request
   ↓
2. Reviewer Examines Changes (Diff, Files, Description)
   ↓
3. Reviewer Adds Feedback (Approve, Request Changes, Comment)
   ↓
4. Request Status Updates Based on Feedback
   ↓
5. If Changes Requested, Agent Modifies and Updates
   ↓
6. Review Continues Until Approved or Rejected
   ↓
7. If Approved, Request Ready for Merge
```

**Merge Process**

```
1. Merge Request Approved
   ↓
2. User or Agent Initiates Merge
   ↓
3. System Executes Merge Strategy
   ├─ Patch: Applies diff to files
   └─ Git Worktree: Merges branch in worktree
   ↓
4. Merge Result Recorded
   ↓
5. Request Status Set to "Merged"
   ↓
6. WebSocket Event Broadcasts Merge
   ↓
7. Linked Jobs Updated
```

### Review Feedback System

**Feedback Types**

Reviewers can provide three types of feedback:

1. **Approve**: Request changes are satisfactory
   - Updates status to "approved"
   - Enables merge for review_merge type
   - Signals completion for review type

2. **Request Changes**: Changes needed before approval
   - Updates status to "changes_requested"
   - Agent should address feedback
   - Requires new review cycle

3. **Comment**: General feedback without status change
   - Informational comments
   - Questions or suggestions
   - Does not change request status

**Multiple Reviewers**

- Each review is tracked separately with unique ID
- All reviews visible to subsequent reviewers
- Reviewer sees previous feedback before adding theirs
- No voting system - all feedback visible and considered

**Feedback Tracking**

Each feedback entry contains:

- **Feedback ID**: Unique identifier
- **Agent ID**: Reviewer's agent ID
- **Agent Name**: Reviewer's display name
- **Type**: approve, request_changes, or comment
- **Comment**: Text of the feedback
- **Created At**: Timestamp of feedback

### Merge Execution

**Patch Merge Strategy**

The patch strategy applies changes directly:

1. Parse the diff patch
2. Apply changes to target files
3. Handle conflicts if they arise
4. Record success or failure
5. Update request with merge result

**Git Worktree Merge Strategy**

The git worktree strategy uses git operations:

1. Create or update git worktree
2. Checkout source branch in worktree
3. Merge source branch into target
4. Resolve any conflicts (manual or automated)
5. Push merged changes if successful
6. Clean up worktree
7. Record merge result

**Merge Results**

Merge operations return:

```typescript
{
  success: boolean,
  message?: string,
  conflictFiles?: string[],
  appliedAt?: string
}
```

**Conflict Handling**

- **Patch Strategy**: Lists conflict files, requires manual resolution
- **Git Worktree Strategy**: Uses git's conflict resolution mechanisms
- **Retry Mechanism**: Can retry merge after conflicts resolved
- **Rollback Support**: Can revert failed merge attempts

### Coordination and Multi-Agent Support

**Pheromone Signals**

Agents can deposit pheromones on requests:

- **workingonit**: Agent is actively working on this request
- **reviewadded**: Review has been added, may trigger deliberation
- **importance**: Priority or importance signal
- **takeup_interest**: Agent interested in taking up this request
- **saturation**: Request has many agents working on it
- **task_not_ready**: Blocking dependencies exist
- **available**: Blockers resolved, ready to work on

**Lock Mechanism**

Prevent race conditions:

- **Acquire Lock**: Agent can lock request to work on it exclusively
- **Release Lock**: Agent releases lock when done
- **Unlock Request**: Other agents can request unlock from lock holder
- **Lock Approval**: Lock holder can approve unlock requests

**Proposed Jobs**

Agents can propose new jobs during review:

- Jobs linked to specific requests
- Approval workflow for proposed jobs
- Can convert to actual jobs
- Track proposal status (pending, approved, rejected, converted)

**Scope-Based Organization**

Requests organized by scope:

- **Agent Scope**: Single agent's independent work
- **Swarm Scope**: Coordinated work within a swarm
- **Orchestrator Scope**: Managed by orchestrator agent

### Query and Filtering

**Filter Options**

Merge Requests can be filtered by:

- **Status**: One or more status values
- **Type**: review or review_merge
- **Agent ID**: Specific agent's requests
- **Swarm ID**: Requests within a swarm
- **Time Range**: Created or updated within dates
- **Title Search**: Text search in titles
- **Scope**: agent, swarm, or orchestrator
- **Scope Instance ID**: Specific swarm or orchestrator

**Sorting Options**

- **Created At**: Sort by creation time
- **Updated At**: Sort by last update
- **Status**: Sort by status

**Pagination**

- **Offset**: Skip first N results
- **Limit**: Return maximum N results

**Special Queries**

- **Pending Reviews**: Requests awaiting review (pending_review, in_review)
- **Ready to Merge**: Approved review_merge requests
- **By Agent**: All requests from specific agent
- **By Swarm**: All requests within specific swarm

### Storage and Persistence

**File System Structure**

```
.codebolt/
└── review_merge_requests/
    ├── requests.json        # All requests
    └── config.json          # Display settings
```

**Atomic Updates**

- Write to temporary file first
- Rename to actual file (atomic operation)
- Prevents corruption from concurrent writes
- Safe for multi-process access

**Display Settings**

Persistent UI configuration:

```typescript
{
  grouping: 'status' | 'type' | 'agent' | 'swarm' | 'none',
  ordering: 'createdAt' | 'updatedAt' | 'status',
  orderDirection: 'asc' | 'desc',
  showClosedRequests: boolean,
  showMergedRequests: boolean
}
```

### Statistics and Metrics

**Request Statistics**

Track counts by:

- **Total**: All requests
- **By Status**: draft, pending_review, in_review, etc.
- **By Type**: review_only vs review_merge

**Aggregation Metrics**

- Total requests created
- Average time to approval
- Merge success rate
- Changes requested rate
- Agent productivity by request count

### Use Cases

**Primary Use Cases**

1. **Agent Code Changes**: Agents propose larger changesets for review
2. **Swarm Coordination**: Multiple agents contribute to coordinated changes
3. **Feature Development**: Track feature implementation across multiple files
4. **Bug Fixes**: Review and merge bug fix proposals
5. **Refactoring**: Manage large-scale refactoring efforts

**Secondary Use Cases**

1. **Code Review Board**: Centralized view of all proposed changes
2. **Change Auditing**: Complete history of all changes applied
3. **Agent Training**: Learn from approved/rejected patterns
4. **Workflow Integration**: Connect to CI/CD pipelines
5. **Documentation**: Changes self-document through requests

**Integration Scenarios**

- **Orchestrator Management**: Orchestrators create and track child agent work
- **Swarm Development**: Swarm members contribute to shared requests
- **Multi-Stage Workflows**: Create requests from completed jobs
- **External Systems**: Sync with external issue trackers
- **Code Review Policies**: Enforce review requirements

### Best Practices

**For Agents**

- **Clear Descriptions**: Explain what changes do and why
- **Logical Grouping**: Group related changes in single request
- **Manageable Size**: Keep requests focused and reviewable
- **Test Before Submit**: Ensure changes work before creating request
- **Address Feedback**: Respond promptly to change requests

**For Reviewers**

- **Thorough Review**: Check all files and changes
- **Constructive Feedback**: Provide clear, actionable comments
- **Timely Response**: Review requests promptly
- **Context Awareness**: Understand task and scope
- **Follow Through**: Ensure re-reviews after changes

**For Team Leads**

- **Clear Policies**: Define approval requirements
- **Scope Guidelines**: When to use different scopes
- **Merge Strategies**: Guidelines for choosing strategies
- **Review SLAs**: Set expectations for review times
- **Quality Metrics**: Track and review merge statistics

### Configuration

**Service Initialization**

```typescript
await reviewMergeRequestService.initialize(projectPath);
```

**Custom Pheromone Types**

Add custom pheromone types for coordination:

```typescript
coordinationService.addPheromoneType({
  name: 'custom_signal',
  displayName: 'Custom Signal',
  description: 'Team-specific coordination signal',
  color: '#FF0000',
  defaultDecayRate: 0.1
});
```

**Display Settings**

Configure default display:

```typescript
await reviewMergeRequestService.updateDisplaySettings({
  grouping: 'status',
  ordering: 'updatedAt',
  orderDirection: 'desc',
  showClosedRequests: false,
  showMergedRequests: true
});
```

### Troubleshooting

**Request Not Appearing**

- Check service is initialized
- Verify WebSocket connection active
- Look for errors in server logs
- Confirm filters aren't excluding request
- Check request status isn't filtered out

**Merge Failing**

- Verify merge strategy matches request type
- Check for conflicts in target files
- Review merge error messages
- Ensure file permissions are correct
- Try alternative merge strategy

**Lock Conflicts**

- Check who holds the lock
- Request unlock from lock holder
- Wait for lock to be released
- Verify lock acquisition logic
- Check for orphaned locks

**Pheromone Not Appearing**

- Verify pheromone type exists
- Check deposit parameters
- Refresh pheromone display
- Check for decay removing signal
- Verify agent has permission

### Related Concepts

- **[Code Review System](./review-system.md)**: File-level review workflow
- **[Approval Workflow](./approval-workflow.md)**: Multi-stage approval process
- **[Feedback System](./feedback-system.md)**: Collecting and using review feedback
- **[Coordination Signals](./coordination-signals.md)**: Pheromones and locks for coordination
- **[Agent Coordination](../stigmergy-system/stigmergy-coordination.md)**: Broader coordination patterns
- **[Job System](../job-coordination/job-system.md)**: Jobs and their relationship to requests

### Future Enhancements

**Planned Features**

- **Diff Visualization**: Enhanced diff viewer with syntax highlighting
- **Inline Comments**: Comment on specific lines of diff
- **Review Assignment**: Assign reviewers to specific requests
- **Approval Rules**: Configure required reviewers based on file paths
- **Merge Queue**: Queue multiple approved requests for batch merging
- **Conflict Prediction**: Predict potential conflicts before merge
- **Review Analytics**: Dashboards showing review patterns and metrics
- **External Integration**: Sync with GitHub/GitLab PRs
- **Template Support**: Request templates for common change types
- **Auto-Merge**: Configurable auto-merge for certain request types
