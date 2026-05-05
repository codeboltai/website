---
title: "Action Plan System"
description: "Detailed execution plans with conditional logic, parallel execution, and loop structures"
tags: ["action-plans", "execution", "workflow", "conditional-logic", "automation"]
---

# Action Plan System

## Executive Summary

CodeBolt's action plan system provides a sophisticated framework for creating detailed execution plans with support for conditional logic, parallel execution, loop structures, and synchronization points. Action plans bridge the gap between static planning documents and executable workflows, enabling precise control over task execution while maintaining flexibility for dynamic runtime behavior.

## What is an Action Plan?

An action plan is an ordered collection of tasks and task groups that defines how work should be executed. Unlike simple task lists, action plans support complex execution patterns including conditional branches, parallel tracks, iterative loops, and wait conditions.

### Plan Structure

```
Action Plan
├── Task 1: "Initialize Project"
├── Parallel Group: "Setup Infrastructure"
│   ├── Track 1: [Task 2a, Task 2b]
│   └── Track 2: [Task 2c, Task 2d]
├── If Group: "Check Environment"
│   ├── Condition: "is_production == true"
│   └── If Tasks: [Task 3a, Task 3b]
├── Loop Group: "Process Files"
│   ├── Iteration List: "file_list"
│   └── Loop Tasks: [Task 4a, Task 4b]
└── Wait Until Group: "Verify Deployment"
    ├── Wait Steps: ["Health Check", "Smoke Tests"]
    └── Wait Tasks: [Task 5]
```

### Core Concepts

**Tasks**
- Atomic units of executable work
- Can be assigned to specific agents
- Have defined status and completion criteria
- Support dependencies and prerequisites
- Carry metadata for execution context

**Task Groups**
- Logical containers for tasks
- Define execution semantics (parallel, sequential, conditional)
- Can be nested for complex workflows
- Enable reusable execution patterns

**Execution Flow**
- Sequential execution of plan items
- Group-specific execution semantics
- Status tracking at task and group level
- Progress reporting and visualization

## Why It Matters

### Precision and Control
- Define exact execution order
- Specify conditions for branching
- Control parallel execution tracks
- Implement synchronization points

### Reusability
- Create templates for common patterns
- Share execution strategies across projects
- Standardize workflow approaches
- Enable consistency in execution

### Visibility
- Visual representation of execution plan
- Progress tracking at multiple levels
- Clear understanding of workflow structure
- Easy identification of bottlenecks

### Flexibility
- Adapt plans based on runtime conditions
- Handle errors and retries gracefully
- Support manual intervention points
- Enable dynamic task generation

## Key Capabilities

### Task Types

**Atomic Tasks**
- Single executable units
- Assigned to specific agents
- Track individual status
- Support completion callbacks
- Carry execution context

**Task References**
- Reference tasks within groups
- Include full task objects
- Enable task metadata access
- Support task status queries
- Maintain task relationships

### Group Types

**Parallel Groups**
- Execute multiple tracks concurrently
- Each track runs independently
- All tracks must complete before proceeding
- Useful for independent work streams
- Enable concurrent execution

**Structure**
```typescript
{
  type: 'parallelGroup',
  name: 'Parallel Processing',
  groupItems: {
    track1: [{ type: 'task', task: task1 }, { type: 'task', task: task2 }],
    track2: [{ type: 'task', task: task3 }],
    track3: [{ type: 'task', task: task4 }]
  }
}
```

**Use Cases**
- Independent backend services deployment
- Concurrent data processing
- Parallel testing across environments
- Multi-region deployment
- Simultaneous quality checks

**Loop Groups**
- Iterate over a list of items
- Execute tasks for each iteration
- Sequential processing by default
- Support nested loops
- Track iteration progress

**Structure**
```typescript
{
  type: 'loopGroup',
  name: 'Process Files',
  iterationListId: 'files_to_process',
  loopTasks: [
    { type: 'task', task: validateTask },
    { type: 'task', task: processTask }
  ]
}
```

**Use Cases**
- Batch processing of files
- Multi-environment deployments
- Bulk data updates
- Sequential API calls
- Repeated validation steps

**If Groups**
- Conditional execution based on expression
- Execute tasks only if condition is true
- Support complex boolean expressions
- Enable branching logic
- Runtime condition evaluation

**Structure**
```typescript
{
  type: 'ifGroup',
  name: 'Check Deployment',
  condition: 'last_command_status == "success"',
  ifTasks: [
    { type: 'task', task: notifyTask },
    { type: 'task', task: updateStatusTask }
  ]
}
```

**Use Cases**
- Error handling and recovery
- Environment-specific logic
- Feature flag gating
- Status-based execution
- Conditional notifications

**Wait Until Groups**
- Synchronization points in workflows
- Wait for specific conditions or events
- Execute tasks after wait completes
- Support timeout handling
- Enable coordination between steps

**Structure**
```typescript
{
  type: 'waitUntilGroup',
  name: 'Wait for Server',
  waitSteps: ['Check port 8080', 'Verify health endpoint'],
  waitTasks: [
    { type: 'task', task: healthCheckTask }
  ]
}
```

**Use Cases**
- Service startup verification
- External dependency readiness
- Manual approval points
- Scheduled execution windows
- Cross-environment coordination

### Nesting and Composition

**Nested Groups**
- Groups can contain other groups
- Create complex execution hierarchies
- Mix different group types
- Maintain clear semantics
- Enable reusable patterns

**Example Structure**
```
ParallelGroup
├── Track 1: [Task, Task]
├── Track 2: LoopGroup
│   └── Loop Tasks: [Task, IfGroup]
└── Track 3: WaitUntilGroup
    └── Wait Tasks: [Task]
```

### Visual Flow Representation

**Flow Diagrams**
- Visual representation of plan structure
- Clear depiction of execution paths
- Group boundaries and relationships
- Task connections and dependencies
- Interactive navigation

**Progress Visualization**
- Real-time progress updates
- Status indicators at all levels
- Completion percentages
- Active task highlighting
- Error state display

## How It Works

### Plan Execution Model

**Sequential Processing**
1. Plan executes items in order
2. For each item:
   - Task: Execute task, wait for completion
   - Group: Execute group based on type semantics
3. Continue to next item after current completes
4. Report overall progress and status

**Group Execution**

**Parallel Groups**
- Spawn execution for all tracks simultaneously
- Each track processes independently
- Monitor all tracks for completion
- Proceed when all tracks complete
- Handle failures in any track

**Loop Groups**
- Get iteration list at runtime
- For each item in list:
  - Execute loop tasks with current item
  - Wait for tasks to complete
  - Move to next iteration
- Proceed after all iterations complete

**If Groups**
- Evaluate condition expression
- If true: Execute if tasks, wait for completion
- If false: Skip if tasks, proceed to next item
- Support complex boolean expressions
- Access runtime context in conditions

**Wait Until Groups**
- Execute wait steps to verify conditions
- Poll or wait for event signals
- Timeout handling for long waits
- Execute wait tasks after conditions met
- Proceed to next item after wait completes

### Status Tracking

**Task Status**
- `planned`: Scheduled but not started
- `pending`: Ready to execute
- `in_progress`: Actively executing
- `completed`: Finished successfully
- `failed`: Errored during execution
- `cancelled`: Stopped before completion

**Group Status**
- Derived from child task statuses
- `in_progress` if any child is active
- `completed` when all children complete
- `failed` if any child fails
- `waiting` for wait groups

**Plan Status**
- Overall plan health indicator
- Progress percentage calculation
- Task completion counts
- Active group tracking
- Error state aggregation

### Persistence

**Plan Storage**
- Plans stored in project database
- Versioned plan history
- Plan templates for reuse
- Import/export capabilities

**Execution State**
- Runtime state persistence
- Resume after interruption
- Execution history tracking
- Debug and audit support

## Use Cases

### Deployment Pipeline

**Scenario**: Multi-environment deployment with validation

```yaml
Plan: "Production Deployment"

1. Task: "Build Application"
2. ParallelGroup: "Parallel Testing"
   - Track 1: [Unit Tests, Integration Tests]
   - Track 2: [Security Scan, Performance Test]
   - Track 3: [Accessibility Audit, Linting]
3. IfGroup: "Test Results Check"
   - Condition: "all_tests_passed == true"
   - If Tasks:
     - Task: "Deploy to Staging"
     - Task: "Run Smoke Tests"
4. LoopGroup: "Multi-Region Deployment"
   - Iteration List: ["us-east-1", "eu-west-1", "ap-southeast-1"]
   - Loop Tasks:
     - Task: "Deploy to Region"
     - Task: "Verify Health Check"
5. WaitUntilGroup: "Production Readiness"
   - Wait Steps: ["DNS Propagation", "CDN Cache Update"]
   - Wait Tasks:
     - Task: "Final Health Check"
     - Task: "Send Success Notification"
```

### Data Processing Pipeline

**Scenario**: ETL process with multiple stages

```yaml
Plan: "Daily Data Import"

1. Task: "Validate Source Data"
2. IfGroup: "Data Quality Check"
   - Condition: "validation_errors == 0"
   - If Tasks:
     - Task: "Start Import Job"
   - Else Tasks:
     - Task: "Send Error Report"
     - Task: "Abort Import"
3. LoopGroup: "Process Data Batches"
   - Iteration List: "batch_ids"
   - Loop Tasks:
     - Task: "Load Batch"
     - Task: "Transform Data"
     - Task: "Validate Transform"
     - Task: "Write to Database"
4. ParallelGroup: "Post-Processing"
   - Track 1: [Update Indexes, Refresh Cache]
   - Track 2: [Generate Reports, Send Notifications]
5. Task: "Archive Raw Data"
```

### Feature Development Workflow

**Scenario**: Standard feature development process

```yaml
Plan: "Feature Implementation"

1. Task: "Create Feature Branch"
2. Task: "Write Technical Specification"
3. ParallelGroup: "Parallel Development"
   - Track 1: [Backend API, Database Schema]
   - Track 2: [Frontend Components, Unit Tests]
   - Track 3: [Documentation, Examples]
4. LoopGroup: "Code Review Cycles"
   - Iteration List: ["reviewer1", "reviewer2", "reviewer3"]
   - Loop Tasks:
     - Task: "Assign Review"
     - WaitUntilGroup: "Review Completion"
       - Wait Steps: ["Review Submitted"]
       - Wait Tasks:
         - Task: "Address Feedback"
5. IfGroup: "Approval Check"
   - Condition: "all_reviews_approved == true"
   - If Tasks:
     - Task: "Merge to Main"
     - Task: "Deploy to Staging"
6. Task: "Create Release Notes"
```

## Best Practices

### Plan Design

**Start Simple**
- Begin with linear task sequences
- Add groups as complexity grows
- Test plan structure before execution
- Iterate based on execution results

**Clear Group Boundaries**
- Give groups descriptive names
- Keep group responsibilities focused
- Avoid excessive nesting (max 3 levels)
- Document group purpose and behavior

**Error Handling**
- Include error handling tasks
- Use if groups for error branches
- Set appropriate timeouts
- Define failure recovery strategies

### Task Definition

**Atomic Tasks**
- Keep tasks focused and single-purpose
- Define clear completion criteria
- Specify expected outputs
- Include success/failure indicators

**Task Dependencies**
- Use group order for dependencies
- Avoid circular dependencies
- Document prerequisite conditions
- Handle dependency failures gracefully

### Performance

**Parallel Execution**
- Identify independent work for parallel tracks
- Balance track complexity
- Consider resource constraints
- Monitor parallel execution performance

**Loop Optimization**
- Minimize tasks inside loops
- Pre-compute values outside loops when possible
- Use appropriate iteration list sizes
- Handle loop failures appropriately

### Maintainability

**Documentation**
- Document plan purpose and flow
- Explain complex conditions
- Provide examples for custom patterns
- Keep comments up to date

**Version Control**
- Track plan changes over time
- Tag plan versions for releases
- Maintain plan templates
- Document breaking changes

## Related Concepts

- **[Requirements Planning](./requirement-planning.md)**: Action plans linked from requirements
- **[Technical Specifications](./specs-management.md)**: Detailed specs informing action plans
- **[Feature Roadmap](./roadmap-system.md)**: High-level feature organization
- **[Planning Workflows](./planning-workflows.md)**: End-to-end planning processes
- **[Task Management](../task-management/task-system-overview.md)**: Individual task execution

## Troubleshooting

**Plan Not Executing**
- Verify plan structure is valid
- Check all tasks have required fields
- Ensure group syntax is correct
- Validate nested group structures

**Parallel Group Issues**
- Check for shared state conflicts
- Verify track independence
- Monitor resource utilization
- Consider reducing parallelism

**Loop Not Iterating**
- Verify iteration list exists and is not empty
- Check iteration list ID is correct
- Ensure loop tasks are valid
- Add logging for debugging

**If Group Always Skipping**
- Test condition expression separately
- Verify context variables are available
- Check condition syntax
- Add debug logging for condition evaluation

**Wait Group Timing Out**
- Adjust timeout values
- Verify wait conditions are achievable
- Check for race conditions
- Implement retry logic
