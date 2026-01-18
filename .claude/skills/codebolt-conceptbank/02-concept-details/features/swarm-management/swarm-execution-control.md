---
title: Swarm Execution Control
description: Starting, stopping, and monitoring swarm execution lifecycle
category: Swarm Management
tags: [swarm, execution, lifecycle, monitoring, status]
lastUpdated: 2026-01-18
---

# Swarm Execution Control

## Executive Summary

Swarm Execution Control manages the complete lifecycle of running a swarm, from initialization through agent execution to completion. It provides configuration for agent selection, concurrency control, and real-time status tracking, enabling operators to start swarms with specific parameters and monitor their progress.

## What It Is

Execution Control is a swarm lifecycle management system that:

- **Separates configuration from execution**: Define swarm structure independently of running it
- **Controls agent selection**: Choose which agents to spawn and in what quantities
- **Manages concurrency**: Limit how many agents run simultaneously
- **Tracks execution status**: Monitor progress through idle, starting, running, finished, and error states
- **Provides real-time updates**: Live tracking of running, completed, and total agents

This system bridges the gap between static swarm configuration (agents, teams, roles) and dynamic swarm execution (running agents, tasks, progress).

## Key Capabilities

### Swarm Configuration
- **Agent selection**: Choose which agents to include in the execution
- **Instance counts**: Specify how many instances of each agent to spawn
- **Concurrency limits**: Set maximum number of agents running concurrently
- **Initial prompts**: Provide task description or context for the swarm
- **Job group integration**: Link swarms to job groups for task management

### Execution Lifecycle
- **Idle state**: Swarm configured but not started
- **Starting state**: Swarm initialization in progress
- **Running state**: Agents actively executing tasks
- **Finished state**: All agents completed successfully
- **Error state**: Swarm encountered unrecoverable error

### Status Tracking
- **Running agents**: Number of agents currently executing
- **Completed agents**: Number of agents that finished their tasks
- **Total agents**: Total agents in the execution plan
- **Progress indicators**: Visual representation of completion
- **Timestamps**: Track when execution started and finished

### Real-Time Updates
- **Live status**: WebSocket-based status updates
- **Progress tracking**: Monitor agent completion in real-time
- **Error notifications**: Immediate alert on execution errors
- **Completion events**: Notification when swarm finishes

## How It Works Conceptually

### Execution Flow

```
1. CONFIGURATION
   User selects agents and sets parameters
   → SwarmConfig created with agent list and counts
   → Max concurrency limit set
   → Initial prompt provided
   ↓
2. INITIALIZATION
   User clicks "Start Swarm"
   → Status changed to "starting"
   → Execution status file created
   → Initial prompt broadcast to agents
   ↓
3. AGENT SPAWNING
   Agents spawned according to configuration
   → Up to maxConcurrentAgents spawned at once
   → Each agent receives initial prompt
   → Agents register with swarm
   ↓
4. EXECUTION
   Agents execute tasks autonomously
   → Status changed to "running"
   → Progress tracked (running/completed/total)
   → Status updates persisted and broadcast
   ↓
5. COMPLETION
   All agents finish their tasks
   → Status changed to "finished"
   → Final statistics recorded
   → Swarm available for re-execution
```

### Configuration Data Structure

```typescript
SwarmConfig {
  agents: [
    {
      agentId: string,
      agentName: string,
      maxInstances: number,
      isEnabled: boolean
    }
  ],
  maxConcurrentAgents: number,
  initialPrompt: string,
  defaultJobGroupId?: string
}
```

### Status Data Structure

```typescript
SwarmStatusUpdate {
  swarmId: string,
  status: 'idle' | 'starting' | 'running' | 'finished' | 'error',
  runningAgents: number,
  completedAgents: number,
  totalAgents: number,
  startedAt?: Date,
  finishedAt?: Date,
  error?: string
}
```

### Storage Locations

```
<project>/.codebolt/swarm/<swarmId>/
  ├── swarm-config.json       # Agent configuration
  ├── execution-status.json   # Current execution status
  └── config.json             # Swarm metadata
```

## Use Cases

### Task Execution
- **Parallel processing**: Run multiple agents simultaneously to process tasks
- **Distributed work**: Divide large tasks across multiple agent instances
- **Ensemble decision**: Run multiple agents to vote on decisions
- **Batch processing**: Process multiple items concurrently with different agents

### Experimentation
- **A/B testing**: Run different agent configurations and compare results
- **Parameter tuning**: Adjust concurrency and instance counts for optimization
- **Prompt engineering**: Test different initial prompts with same agent set
- **Performance testing**: Measure swarm performance under different loads

### Workflow Automation
- **Pipeline execution**: Run swarms as part of larger automated workflows
- **Scheduled runs**: Execute swarms on schedules using job groups
- **Event-driven runs**: Trigger swarms based on external events
- **Chained swarms**: Use output of one swarm as input to another

### Resource Management
- **Capacity planning**: Control resource usage with concurrency limits
- **Cost optimization**: Balance performance with resource consumption
- **Priority management**: Give more agents to higher-priority tasks
- **Load balancing**: Distribute work across available agents

## Related Concepts

- **[Swarm Configuration](./swarm-configuration.md)**: Defining swarm structure and agents
- **[Agent Lifecycle](./agent-lifecycle.md)**: Individual agent life cycle within swarm
- **[Swarm Activity Monitoring](./swarm-activity-monitoring.md)**: Tracking events during execution
- **[Job Groups](./job-groups.md)**: Organizing swarm executions into jobs
- **[Application Event Bus](./application-event-bus.md)**: Status update distribution

## Technical Notes

### Concurrency Control

- **maxConcurrentAgents**: Hard limit on simultaneous running agents
- Agents spawn sequentially up to concurrency limit
- When one agent completes, next agent spawns
- Ensures system stability under load
- Prevents resource exhaustion

### Status Persistence

- Execution status persisted to `execution-status.json`
- Updated on every state change
- Survives application restarts
- Enables status recovery after crashes
- Supports audit trail of executions

### Status Broadcasting

- Status changes broadcast via WebSocket
- Connected clients receive real-time updates
- Status panel updates automatically
- Supports multiple concurrent viewers
- Efficient delta updates minimize bandwidth

### Error Handling

- Errors captured in status with error messages
- Swarm can enter "error" state if unrecoverable
- Partial completion tracked (some agents finish, others fail)
- Error details preserved for troubleshooting
- Swarm can be restarted after error

### Re-execution

- Swarms can be re-executed with same or different configuration
- Previous execution status preserved
- Registry entries accumulate across executions
- Episodic memory captures events from all executions
- No limit on number of executions per swarm

### Performance Considerations

- Concurrency limits should match system resources
- Too many concurrent agents can cause degradation
- Network latency affects agent coordination
- Status update frequency balances freshness vs overhead
- Large agent counts require careful capacity planning

### Integration Points

- **Job Groups**: Default job group links swarm to task management
- **Episodic Memory**: All execution events captured
- **Application Event Bus**: Status updates distributed via events
- **Swarm Manager**: Agent registration and lifecycle management
- **Agent Execution Manager**: Individual agent process management
