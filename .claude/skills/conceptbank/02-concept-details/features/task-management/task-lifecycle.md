---
title: "Task Lifecycle"
description: "Understanding task creation, execution, and completion states"
tags: ["tasks", "lifecycle", "states", "execution"]
---

# Task Lifecycle

## Executive Summary
Tasks in CodeBolt progress through a well-defined lifecycle from creation through completion, with states that reflect their execution status, dependencies, and user interaction requirements. This lifecycle ensures predictable task behavior and enables effective monitoring and management.

## What is the Task Lifecycle?

The task lifecycle defines the sequence of states a task transitions through from its initial creation to final completion or termination. Each state represents a specific phase in the task's existence, with defined entry and exit conditions, valid transitions, and associated behaviors.

### Lifecycle States

**Created**
- Initial state when a task is first defined
- Task exists but has not been scheduled or planned for execution
- Can be edited, configured, or deleted without impact
- Transitions to: Planned, Pending, or Cancelled

**Planned**
- Task has been configured with execution parameters
- Schedule, dependencies, and environment are defined
- Ready to be queued for execution
- Transitions to: Pending, Cancelled

**Pending**
- Task is queued and waiting for execution trigger
- All prerequisites are met (dependencies resolved, resources available)
- Awaiting execution slot or trigger condition
- Transitions to: In Progress, Cancelled

**In Progress**
- Task is actively being executed by an agent or job
- Resources are allocated and work is underway
- Status updates and progress tracking active
- Transitions to: Waiting User, Review, Completed, Failed, Cancelled

**Waiting User**
- Task execution is paused requiring user input
- Awaiting confirmation, clarification, or decision
- Can resume when user responds
- Transitions to: In Progress, Cancelled, Failed

**Review**
- Task execution is complete pending user review
- Results are available for inspection
- Awaiting user acceptance or rejection
- Transitions to: Completed, Failed (if rejected)

**Completed**
- Task has successfully finished
- Results accepted and archived
- Dependent tasks may be triggered
- Terminal state (no further transitions)

**Cancelled**
- Task was terminated before completion
- May be user-initiated or system-triggered
- Resources released and cleanup performed
- Terminal state (no further transitions)

**Failed**
- Task execution encountered an error
- May be retried or require manual intervention
- Error details captured for diagnostics
- Terminal state (no further transitions)

## Why It Matters

Understanding the task lifecycle is essential for:

### Predictable Execution
- Clear expectations for task behavior at each stage
- Defined validation and transition rules
- Consistent state management across the system

### Effective Monitoring
- Real-time visibility into task progress
- Early detection of stuck or failing tasks
- Accurate status reporting to users

### Resource Management
- Efficient allocation of execution resources
- Proper cleanup of completed or cancelled tasks
- Prevention of resource leaks from abandoned tasks

### Dependency Coordination
- Reliable triggering of dependent tasks
- Accurate calculation of completion timelines
- Prevention of circular dependency issues

## State Transitions

### Normal Execution Flow

```
Created → Planned → Pending → In Progress → Review → Completed
```

This is the typical path for a successfully executed task:

1. **Created**: Task is defined with basic parameters
2. **Planned**: Execution parameters are configured (schedule, environment, dependencies)
3. **Pending**: Task is queued awaiting execution trigger
4. **In Progress**: Agent actively works on the task
5. **Review**: Results available for user inspection
6. **Completed**: Task finished and accepted

### Interactive Execution Flow

```
Created → Planned → Pending → In Progress ↔ Waiting User → In Progress → Review → Completed
```

Interactive tasks may cycle through **Waiting User** multiple times:

1. Task starts execution (**In Progress**)
2. Requires user input (transitions to **Waiting User**)
3. User provides input (transitions back to **In Progress**)
4. Cycle repeats as needed
5. Eventually moves to **Review** and **Completed**

### Failure Termination Flow

```
Created → Planned → Pending → In Progress → Failed
```

Tasks that encounter errors transition to **Failed**:

1. Task begins execution normally
2. Encounters unrecoverable error during execution
3. Transitions to **Failed** with error details
4. May be retried by creating a new task

### Cancellation Flows

Tasks can be cancelled from most non-terminal states:

```
Created → Cancelled
Planned → Cancelled
Pending → Cancelled
In Progress → Cancelled
Waiting User → Cancelled
```

Cancellation can occur at any point before completion:
- User-initiated cancellation
- System-initiated cancellation (resource constraints, timeout)
- Dependency failure causing cascade cancellation

### Rejection from Review Flow

```
In Progress → Review → Failed
```

Tasks can be rejected during review:
1. Task completes and moves to **Review**
2. User inspects results and finds issues
3. Task is rejected, transitioning to **Failed**
4. New task may be created to address issues

## Transition Triggers

### Automatic Transitions

**Creation Completion**
- Trigger: Task object is fully initialized
- Transition: Created → Planned
- Logic: System validates required fields and advances task

**Dependency Resolution**
- Trigger: All dependent tasks complete
- Transition: Pending → In Progress
- Logic: Execution manager detects dependencies satisfied

**Schedule Trigger**
- Trigger: Scheduled time reached
- Transition: Pending → In Progress
- Logic: Scheduler detects task ready for execution

**Agent Assignment**
- Trigger: Agent available and assigned
- Transition: Pending → In Progress
- Logic: Agent pool manager assigns task to available agent

**Execution Completion**
- Trigger: Agent reports completion
- Transition: In Progress → Review
- Logic: Task manager receives completion signal

**Error Detection**
- Trigger: Unhandled exception or timeout
- Transition: In Progress → Failed
- Logic: Error handler catches exception

### User-Initiated Transitions

**Manual Start**
- Trigger: User clicks "Start" or "Execute"
- Transition: Planned/Pending → In Progress
- Logic: User request overrides schedule

**Cancellation**
- Trigger: User clicks "Cancel" or "Stop"
- Transition: Any non-terminal → Cancelled
- Logic: User request terminates execution

**Status Update**
- Trigger: User manually changes status
- Transition: Various (depending on action)
- Logic: Administrative override

**Review Decision**
- Trigger: User approves or rejects in review
- Transition: Review → Completed or Failed
- Logic: User accepts or rejects results

**Response to Input Request**
- Trigger: User provides requested input
- Transition: Waiting User → In Progress
- Logic: Resume execution with provided input

## State-Specific Behaviors

### Created State
- Task exists in system but not visible to execution manager
- Can be modified without restrictions
- No resources allocated
- No notifications sent

### Planned State
- Task visible to scheduler
- Execution parameters locked
- Dependencies validated
- Resources reserved but not allocated

### Pending State
- Task in execution queue
- Resources allocated
- Notifications sent for queued tasks
- Priority determines queue position

### In Progress State
- Agent actively working
- Real-time status updates
- Progress tracking active
- Thread captures execution context

### Waiting User State
- Execution paused
- User notification sent
- Timeout counter active
- Can auto-cancel if no response

### Review State
- Execution complete
- Results available for inspection
- Thread contains full execution history
- Awaiting user acceptance

### Completed State
- Final state reached
- Results archived
- Dependent tasks notified
- Statistics updated

### Cancelled State
- Execution terminated
- Partial results may be available
- Resources released
- Dependent tasks notified of cancellation

### Failed State
- Error details captured
- Partial results may be available
- Resources released
- May trigger alerts or notifications

## Lifecycle Management

### Task Creation
- Define task parameters (name, description, priority)
- Configure execution environment
- Set schedule or execution type
- Define dependencies
- Validate configuration

### Task Monitoring
- Real-time status tracking
- Progress percentage updates
- State change notifications
- Error alerts and warnings

### Task Recovery
- Retry failed tasks
- Resume interrupted tasks
- Recover from cancellation
- Handle partial completion

### Task Cleanup
- Archive completed tasks
- Purge old cancelled/failed tasks
- Release resources
- Update statistics

## Dependency Management

### Parent-Child Relationships
- Parent tasks must complete before children start
- Child task failure affects parent status
- Hierarchical progress tracking
- Cascading cancellation support

### Cross-Task Dependencies
- Tasks can depend on sibling or peer tasks
- Dependency graph validation
- Circular dependency detection
- Dependency chain visualization

### Dependency Resolution
- Automatic triggering when dependencies complete
- Manual override for dependency bypass
- Partial dependency support
- Conditional dependencies

## Related Concepts

- **[Task System Overview](./task-system-overview.md)**: Overall task system architecture
- **[Task Detail](./task-detail.md)**: Individual task information and views
- **[Task View - Kanban](./task-view-kanban.md)**: Visual task management
- **[Task Flow](./task-flow.md)**: Workflow and dependency visualization
- **[Task Use Cases](./task-use-cases.md)**: Real-world task scenarios
