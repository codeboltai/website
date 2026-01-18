---
title: "Task System Overview"
description: "Understanding tasks, threads, and their relationship in CodeBolt"
tags: ["tasks", "threads", "architecture", "overview"]
---

# Task System Overview

## Executive Summary
CodeBolt's task system provides a unified framework for managing work across interactive AI sessions and scheduled automated jobs. Tasks represent discrete units of work that can be executed immediately by agents or scheduled for future execution, while threads provide the conversational context and execution history for task work.

## What is the Task System?

The task system is CodeBolt's core abstraction for organizing, tracking, and executing AI-powered work. It bridges the gap between freeform chat interactions with AI agents and structured job execution, enabling both real-time interactive tasks and automated scheduled workflows.

### Key Concepts

**Tasks**
- Discrete work units with defined objectives, priorities, and execution parameters
- Can be interactive (requiring user collaboration) or scheduled (automated execution)
- Support hierarchical relationships through parent-child task nesting
- Track status through their lifecycle from creation to completion
- Contain metadata about execution environment, assigned agents, and dependencies

**Threads**
- Conversational contexts that capture the dialogue between users and agents
- Provide execution history and message exchange for task work
- Store steps, instructions, and agent responses
- Enable review and audit of task execution
- Can be associated with multiple related tasks over time

**Jobs**
- Scheduled or automated task executions that run independently
- Support cron-based scheduling, interval-based execution, or one-time execution
- Can be triggered by task completion events or external schedules
- Maintain their own execution context separate from interactive threads

## Why It Matters

The task system serves several critical purposes in CodeBolt:

### Work Organization
- Breaks complex objectives into manageable, trackable units
- Enables parallel execution of independent tasks
- Supports dependency management between related tasks
- Provides visibility into progress across multiple work streams

### Execution Flexibility
- Handles both real-time interactive AI sessions and automated background jobs
- Allows tasks to run in different environments (local, remote providers)
- Supports immediate, manual, scheduled, or conditional execution triggers
- Enables switching between interactive and automated modes as needed

### Context Management
- Maintains conversation history through threads
- Preserves execution context across task lifecycle
- Enables review and auditing of work
- Supports resumption of interrupted tasks

### Collaboration Support
- Allows task assignment to specific agents or team members
- Enables sharing of task context through thread access
- Supports real-time status updates and notifications
- Provides multiple visualization modes for different workflows

## Key Capabilities

### Task Types
- **Interactive Tasks**: Real-time collaboration with AI agents through chat interfaces
- **Scheduled Tasks**: Automated execution based on schedules, intervals, or triggers
- **Conditional Tasks**: Execution based on dependency completion or external events
- **Manual Tasks**: User-initiated execution on-demand

### Status Tracking
Tasks progress through defined states:
- **Created**: Initial task creation
- **Planned**: Task scheduled with execution parameters
- **Pending**: Waiting for execution trigger
- **In Progress**: actively being executed by an agent
- **Waiting User**: Requires user input or confirmation
- **Review**: Completed work awaiting user review
- **Completed**: Successfully finished
- **Cancelled**: Terminated before completion
- **Failed**: Errored during execution

### Environment Management
- Local environment execution using default or custom environments
- Remote environment execution through provider integrations
- Environment isolation for different task contexts
- Environment switching and migration support

### Dependency Management
- Parent-child task relationships for hierarchical work breakdown
- Task dependencies for sequential execution
- Dependency chain visualization and tracking
- Circular dependency detection and prevention

### Metadata and Context
- File and folder references for task context
- Agent mentions and assignments
- Documentation references
- Control file selections for targeted operations
- Link references to external resources

## Architecture Relationships

### Tasks to Threads
- Tasks can be associated with threads for context
- Threads contain the conversational history of task execution
- Multiple tasks can share a thread for related work
- Thread-less tasks exist for pure automation scenarios

### Tasks to Jobs
- Scheduled tasks become jobs when execution is automated
- Jobs maintain task metadata but operate independently
- Job execution updates task status through the task manager
- Jobs can create new tasks as part of their execution

### Tasks to Agents
- Tasks can be assigned to specific agents
- Agents execute tasks within their thread contexts
- Agent capabilities influence task completion
- Multi-agent coordination through task dependencies

### Tasks to Environments
- Tasks execute within specific environments (local or remote)
- Environment configuration affects task execution
- Tasks can migrate between environments
- Environment status impacts task availability

## User Interaction Patterns

### Task Creation
- Direct creation through task input interfaces
- Generation from chat conversations
- Creation from task templates
- Bulk import from structured definitions

### Task Execution
- Immediate execution for interactive tasks
- Scheduled execution for automated tasks
- Manual triggering for on-demand tasks
- Conditional execution based on dependencies

### Task Monitoring
- Real-time status updates through notifications
- Progress tracking through task detail views
- Execution history through thread access
- Visualization through Kanban and Flow views

### Task Management
- Status updates and state transitions
- Priority adjustment and reordering
- Dependency management
- Completion and archival

## Related Concepts

- **[Task Lifecycle](./task-lifecycle.md)**: Detailed task state transitions and lifecycle management
- **[Task Detail](./task-detail.md)**: Individual task views and information architecture
- **[Task View - Kanban](./task-view-kanban.md)**: Kanban-style task visualization
- **[Task Flow](./task-flow.md)**: Workflow and dependency visualization
- **[Task Use Cases](./task-use-cases.md)**: Real-world task management scenarios
