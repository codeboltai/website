---
title: "Agent Lifecycle and Execution Management"
description: "Understanding how agents are created, executed, monitored, and terminated"
tags: ["agent-management", "lifecycle", "execution", "internals"]
---

## Agent Lifecycle and Execution Management

### Executive Summary

Every agent in CodeBolt follows a well-defined lifecycle from creation to completion. Understanding this lifecycle is crucial for designing reliable agents, troubleshooting issues, and optimizing system performance. The agent execution management system tracks every agent instance, maintains execution history, manages parent-child relationships, and provides comprehensive observability throughout the agent's journey.

### Agent Lifecycle States

**Initialization Phase**

1. **Created**
   - Agent instance record created in execution manager
   - Unique agent instance ID assigned
   - Initial metadata recorded (agent ID, start time, context)
   - Status set to "starting"

2. **Starting**
   - Agent process spawned or workflow initialized
   - Template loaded and validated
   - Dependencies checked and initialized
   - Execution context established

**Execution Phase**

3. **Running**
   - Agent actively processing its workflow
   - Executing nodes in the agent flow graph
   - Making decisions and calling other agents
   - Generating logs and status updates
   - Normal state for active agent

4. **Waiting Input**
   - Agent paused awaiting user interaction
   - Cannot proceed without external input
   - Maintains state and context while waiting
   - Common in agents requiring human decisions

**Completion Phase**

5. **Completed**
   - Agent finished successfully
   - All workflow steps executed
   - Results captured and stored
   - End time and duration recorded

6. **Failed**
   - Agent encountered unrecoverable error
   - Error details logged for debugging
   - Partial results may be available
   - Execution terminated abnormally

7. **Cancelled**
   - Agent intentionally stopped by user or system
   - Graceful shutdown attempted
   - Current state preserved
   - Can often be resumed or restarted

**Terminated States**

8. **Stopped**
   - Agent halted by user action
   - Similar to cancelled but explicitly stopped
   - May have partial results
   - Can typically be restarted

### Execution Context and Metadata

**Unique Identifiers**

- **Agent Instance ID**: Unique identifier for this specific execution (UUID)
- **Agent ID**: Template or agent definition being executed
- **Thread ID**: Conversation or session context
- **Swarm ID**: Coordinated group this agent belongs to (optional)
- **Orchestrator ID**: Managing orchestrator (optional)

**Timing Information**

- **Start Time**: When agent began execution (ISO timestamp)
- **End Time**: When agent completed (if finished)
- **Duration**: Elapsed time in milliseconds
- **Last Activity**: Timestamp of most recent status update

**Relationship Tracking**

- **Parent Agent Instance ID**: Agent that spawned this agent (if any)
- **Level**: Depth in agent hierarchy (0 for root agents)
- **Children**: List of agent instances spawned by this agent
- **Call Time**: When this agent was called by parent

**Execution Source**

- **Direct**: Started by user action
- **Background**: Started as background task
- **Agent**: Started by another agent

**Task and Status**

- **Task Description**: Human-readable description of what agent is doing
- **Status**: Current lifecycle state
- **Error**: Error message if failed
- **Logs**: Array of timestamped log entries

### Agent Execution Manager

The Agent Execution Manager is the core system component that tracks and manages all agent executions:

**Core Responsibilities**

- **Instance Tracking**: Maintain registry of all active and historical agent executions
- **Status Management**: Track state transitions and update agent records
- **Hierarchy Building**: Establish and maintain parent-child relationships
- **Persistence**: Save execution records to storage for historical analysis
- **Querying**: Provide interfaces for filtering and retrieving execution data
- **Cleanup**: Remove old execution records to manage storage

**Data Storage Structure**

```
.codebolt/
└── agentExecutions/
    ├── index.json              # Index of all executions for fast filtering
    ├── {agentInstanceId}.json  # Individual execution files with full details
    └── ...
```

**Index Structure**

The index contains lightweight entries for quick filtering:
- Agent instance ID
- Agent ID and name
- Thread ID
- Status
- Start and end times
- Background flag
- Swarm and orchestrator IDs
- Start source
- Parent agent instance ID

**Individual Execution Files**

Full execution details stored separately:
- All metadata fields
- Complete log arrays
- Error details and stack traces
- Child agent relationships
- Performance metrics

### Agent Hierarchy and Relationships

**Parent-Child Relationships**

Agents can spawn other agents, creating execution hierarchies:

```
Root Agent (Level 0)
├── Child Agent 1 (Level 1)
│   ├── Grandchild Agent 1.1 (Level 2)
│   └── Grandchild Agent 1.2 (Level 2)
└── Child Agent 2 (Level 1)
    └── Grandchild Agent 2.1 (Level 2)
```

**Hierarchy Benefits**

- **Context Propagation**: Children inherit context from parents
- **Swarm Inheritance**: Children automatically belong to parent's swarm
- **Orchestrator Tracking**: Children link to parent's orchestrator
- **Collective Management**: Control entire agent tree as a unit
- **Debugging**: Trace execution flow through hierarchy

**Hierarchy Operations**

- **Tree Building**: Reconstruct full tree from parent-child references
- **Path Tracing**: Find execution path from root to any agent
- **Impact Analysis**: Identify all agents affected by a failure
- **Collective Actions**: Stop, restart, or query entire subtrees

### Real-Time Updates and Communication

**WebSocket Events**

The system pushes real-time updates via WebSocket:

- **processStarted**: New agent instance created
- **processStopped/processStoped**: Agent completed or stopped
- **CHILDAGENTSTARTED**: Child agent spawned
- **agentEvent**: General agent status update
- **threadStatusChange**: Thread-level status changed
- **statusNotification**: Status notification event

**Event Flow**

```
Agent Execution State Change
    ↓
Agent Execution Manager (Backend)
    ↓
Background Agent Store (State Management)
    ↓
WebSocket Server
    ↓
Client WebSocket Connection
    ↓
UI Update (React State)
    ↓
User Sees Updated Status
```

**Reconnection Handling**

- Automatic reconnection with backoff
- State resynchronization after reconnect
- Missed events recovered from server
- Graceful handling of network interruptions

### Persistence and Recovery

**Startup Synchronization**

On application startup, the system handles stale executions:
- Detects agents with "running" or "starting" status
- Marks them as "cancelled" with appropriate error messages
- Records end time and duration
- Prevents zombie agents from appearing active

**Execution Persistence**

All executions are persisted to storage:
- Individual files for each agent instance
- Index for fast querying and filtering
- Atomic writes using temporary files
- Automatic index rebuilding if corrupted

**Historical Queries**

Retrieving historical executions:
- Filter by status, time range, source, swarm
- Sort by start time, duration, or other fields
- Paginate results for large datasets
- Join with thread data for full context

**Cleanup Operations**

Manage storage usage with cleanup:
- Remove executions older than specified threshold
- Keep index synchronized with file system
- Preserve important executions (configurable)
- Log cleanup operations for audit trail

### Performance and Scalability

**Efficient Indexing**

- Index-only queries for filtering without loading full records
- Lazy loading of full execution details on demand
- Cached index data in memory for fast access
- Background index updates to avoid blocking

**Concurrent Execution**

- Support for hundreds of concurrent agent executions
- Lock-free data structures for high throughput
- Efficient memory usage with streaming operations
- Non-blocking I/O for all storage operations

**Resource Management**

- Memory limits on log arrays to prevent excessive growth
- Cleanup of completed agents from active tracking
- Efficient serialization of execution data
- Compression of historical execution data

### Monitoring and Observability

**Built-in Metrics**

- Total agent executions over time
- Success/failure rates by agent type
- Average execution duration
- Agent hierarchy depth statistics
- Background vs foreground agent ratios

**Debugging Support**

- Complete execution history for each agent
- Detailed error logging with stack traces
- Timing information for each lifecycle transition
- Parent-child relationship tracking
- Thread and swarm context

**Audit Trail**

All agent actions logged with:
- Timestamp of action
- Agent performing action
- Action parameters
- Action result
- Related system state

### Best Practices

**Agent Design**

- **Clear Lifecycle**: Design agents with predictable start and end points
- **Graceful Shutdown**: Handle cancellation signals cleanly
- **State Persistence**: Save state periodically for long-running agents
- **Error Handling**: Comprehensive error handling at every node
- **Resource Cleanup**: Release resources when completing or failing

**Monitoring Setup**

- **Meaningful Logs**: Write informative log messages at key points
- **Progress Updates**: Report progress for long-running operations
- **Status Updates**: Update status regularly for visibility
- **Error Context**: Include sufficient context in error messages
- **Completion Signals**: Clearly signal successful completion

**Resource Management**

- **Appropriate Lifetimes**: Design agents with suitable execution durations
- **Cleanup**: Remove old agent executions regularly
- **Memory Limits**: Set appropriate limits on log sizes
- **Timeout Handling**: Configure timeouts for external operations
- **Resource Release**: Explicitly release resources when done

**Testing Strategy**

- **Lifecycle Testing**: Test all lifecycle transitions
- **Error Scenarios**: Test failure modes and recovery
- **Concurrent Execution**: Test multiple agents running simultaneously
- **Hierarchy Testing**: Test parent-child agent relationships
- **Persistence Testing**: Verify execution data is saved correctly

### Related Concepts

- **[Agent Templates](./agent-templates.md)**: Design agents with proper lifecycle handling
- **[Running Agents](./running-agents.md)**: Monitor agents throughout their lifecycle
- **[Background Agents](./background-agents.md)**: Long-running agent lifecycle considerations
- **[Agent Execution Manager](../../internals/agent-execution.md)**: Deep dive into execution management system
- **[WebSocket Communication](../../internals/communication.md)**: Real-time update mechanism

### Troubleshooting Lifecycle Issues

**Agent Stuck in "Starting"**
- Check if agent process is actually running
- Verify agent template exists and is valid
- Review system logs for initialization errors
- Ensure required dependencies are available
- Check system resource availability

**Agent Not Transitioning to "Completed"**
- Review agent logs for last activity
- Check for infinite loops in agent workflow
- Verify agent has proper completion conditions
- Look for unhandled errors preventing completion
- Examine child agents that may not have finished

**Missing Parent-Child Relationships**
- Verify parent agent passed correct child agent ID
- Check if child agent registration succeeded
- Review execution logs for spawn events
- Ensure parent waited for child completion
- Rebuild hierarchy index if corrupted

**Stale Executions After Restart**
- Verify syncStaleExecutions ran on startup
- Check if agents were properly stopped before shutdown
- Review cleanup configuration
- Manually cancel stale executions if needed
- Investigate why graceful shutdown failed

**Excessive Memory Usage**
- Check for agents with very long log arrays
- Review cleanup configuration and frequency
- Identify agents creating excessive child agents
- Look for memory leaks in agent templates
- Adjust historical retention policies
