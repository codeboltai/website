---
title: "Running Agents Panel"
description: "Real-time monitoring and management of active agent executions"
tags: ["observability", "agent-monitoring", "execution-tracking", "real-time"]
---

## Running Agents Panel

### Executive Summary

The Running Agents Panel provides comprehensive real-time visibility into all active agent executions within CodeBolt. Users can monitor agent status, track performance metrics, view execution hierarchies, debug issues, and control agent lifecycles through multiple visualization modes. This observability layer is essential for understanding agent behavior, diagnosing problems, and optimizing agent performance in production environments.

### What is the Running Agents Panel?

The Running Agents Panel is the central monitoring interface for all agent activity in CodeBolt. It displays every agent instance currently executing or recently completed, regardless of how the agent was initiated—whether by direct user request, spawned by another agent, running as a background process, or part of a coordinated swarm. The panel provides a unified view of agent activity across the entire system.

Beyond simple status display, the panel captures rich execution context including start times, duration, parent-child relationships, error details, and system associations (thread ID, swarm ID, orchestrator ID). This contextual information enables users to understand not just what agents are running, but how they relate to each other and fit into the broader system workflow.

### Key Capabilities

**Multi-View Visualization**

1. **Grid View**
   - Compact list of all agents with status indicators
   - Quick scanning of agent states at a glance
   - One-click access to agent details
   - Minimal information density for overview

2. **Hierarchy View**
   - Tree structure showing parent-child agent relationships
   - Visual representation of agent invocation chains
   - Indentation and arrows showing call hierarchy
   - Identify which agents spawned which child agents

3. **Flow/Timeline View**
   - Temporal visualization of agent executions
   - Timeline bars showing start, duration, and overlap
   - Identify concurrent and sequential agent activity
   - Spot long-running or stuck agents

4. **Heatmap View**
   - Color-coded grid representing agent activity patterns
   - Identify clusters of related agent activity
   - Spot temporal patterns and usage trends
   - Visual density representation of agent execution

5. **Icon Timeline View**
   - Compact visual representation with status icons
   - Time-based layout showing agent lifecycle
   - Quick identification of agent transitions
   - Minimal footprint for high-volume monitoring

**Real-Time Status Tracking**

Agent statuses include:
- **Starting**: Agent is initializing and preparing to execute
- **Running**: Agent is actively processing its task
- **Waiting Input**: Agent requires user interaction to continue
- **Completed**: Agent finished successfully
- **Failed**: Agent encountered an error and terminated
- **Cancelled**: Agent was intentionally stopped
- **Stopped**: Agent was halted by user request

**Advanced Filtering**

- Filter by status (running, completed, failed, all)
- Filter by start source (direct, background, agent-initiated)
- Filter by swarm ID to see agents in specific swarms
- Combine multiple filters for precise queries
- View all agents or focus on specific contexts

**Agent Control Actions**

- **Stop Agent**: Gracefully terminate a running agent
- **Start Agent**: Restart a stopped or failed agent
- **View Details**: Inspect agent configuration and context
- **Respond to Input**: Provide required input to waiting agents
- **Navigate Context**: Jump to related threads, swarms, or orchestrators

**Detail Views**

Each agent instance provides detailed information:
- **Overview Tab**: Agent metadata, runtime metrics, relationships
- **Logs Tab**: Execution logs with timestamps and severity levels
- **Hierarchy Tab**: Parent-child relationships and call chains

**Context Navigation**

Agents link to related system contexts:
- Navigate to thread details for conversation history
- Jump to swarm management for coordinated agent groups
- Access orchestrator details for managed executions
- Open related agents in the hierarchy
- Cross-reference with event logs and debug output

### How It Works Conceptually

**Agent Lifecycle Tracking**

```
Agent Start Request
    ↓
Agent Execution Manager (Backend)
    ↓
Create Execution Record
    ↓
Emit WebSocket Event
    ↓
Running Agents Panel Update
    ↓
Real-Time Status Changes
    ↓
Execution Completion
    ↓
Persist Historical Record
```

**Execution Context Model**

Each agent instance tracks comprehensive context:
- **Agent Instance ID**: Unique identifier for this specific execution
- **Agent ID**: Template or agent definition being executed
- **Agent Name**: Human-readable agent identifier
- **Thread ID**: Conversation or session context
- **Parent Agent Instance ID**: If spawned by another agent
- **Swarm ID**: If part of a coordinated swarm
- **Orchestrator ID**: If managed by an orchestrator
- **Start Source**: How the agent was initiated (direct/background/agent)
- **Start Time**: When execution began
- **End Time**: When execution completed (if finished)
- **Duration**: Execution length in milliseconds
- **Status**: Current execution state
- **Task**: Description of what the agent is doing
- **Error Details**: Error message if execution failed

**Hierarchy Representation**

The system builds execution trees by linking parent and child agents:
- **Root Agents**: Have no parent (started by user or system)
- **Child Agents**: Reference their parent's instance ID
- **Multi-Level Nesting**: Agents can spawn agents that spawn agents
- **Call Chains**: Complete ancestry trace from root to leaf
- **Tree Visualization**: Hierarchical views show relationships visually

**State Synchronization**

Real-time updates maintain consistency across views:
- **WebSocket Events**: Status changes pushed immediately
- **Reactive UI**: Updates without polling overhead
- **Optimistic Updates**: Instant feedback for user actions
- **Server Reconciliation**: Ensures accuracy with server state
- **Multi-View Sync**: All views stay synchronized

**Data Persistence**

Agent execution data is persisted for historical analysis:
- **Execution Records**: Individual files per agent instance
- **Index File**: Quick lookup of all executions
- **Automatic Migration**: Upgrades data format as needed
- **Stale Detection**: Marks interrupted executions as cancelled
- **Cleanup**: Optional removal of old execution records

### Use Cases

**Production Monitoring**

Monitor agent health in production environments:
- Track success/failure rates for agent operations
- Identify agents running longer than expected
- Spot performance degradation before it impacts users
- Correlate agent failures with system events
- Maintain service level agreements (SLAs)

**Debugging Failed Executions**

Investigate and resolve agent failures:
- Examine error messages and stack traces
- Review execution logs leading to failure
- Check parent agent context and parameters
- Identify cascading failures in agent chains
- Test fixes by re-running failed agents

**Performance Optimization**

Improve agent efficiency:
- Identify bottlenecks in agent workflows
- Find agents consuming excessive resources
- Optimize frequently used agent templates
- Parallelize independent operations
- Cache expensive computations

**Resource Management**

Control system resource usage:
- Stop stuck or hung agents
- Prevent agent resource exhaustion
- Balance load across available agents
- Schedule resource-intensive tasks appropriately
- Clean up completed agent instances

**Development and Testing**

Streamline agent development workflow:
- Test agent templates in isolated environments
- Iterate on agent designs with rapid feedback
- Compare multiple agent execution strategies
- A/B test different agent configurations
- Validate agent behavior before production deployment

### Advanced Features

**Execution Tree Analysis**

Understand complex agent interactions:
- Visualize multi-level agent hierarchies
- Trace agent spawn chains from root to leaves
- Identify parallel execution branches
- Analyze agent communication patterns
- Detect circular dependencies or infinite loops

**Temporal Patterns**

Discover usage and performance patterns:
- Time-based analysis of agent execution frequency
- Identify peak usage periods and plan capacity
- Correlate agent activity with business metrics
- Schedule resource-intensive tasks during low-demand periods
- Track agent adoption and usage trends

**Cross-Context Visibility**

See agent activity across system boundaries:
- Agents spawned by users vs. other agents
- Agents participating in swarms vs. standalone
- Background agents vs. interactive agents
- Cross-thread agent communication
- Agent instances across multiple projects

**Swarm Context**

Monitor agents within swarm coordination:
- View all agents in a swarm together
- Understand swarm-level agent interactions
- Identify swarm coordination issues
- Track swarm member status
- Correlate swarm events with agent executions

**Historical Analysis**

Learn from past executions:
- Query historical agent executions
- Analyze success rates over time
- Identify common failure modes
- Track agent performance trends
- Generate reports on agent utilization

### Best Practices

**Effective Monitoring**

- Use appropriate view for your monitoring goal
- Set up filters to focus on relevant agents
- Check panel regularly during development
- Respond quickly to failed or stuck agents
- Document recurring issues for investigation

**Resource Management**

- Stop agents that are no longer needed
- Clean up completed executions periodically
- Monitor system resources during high agent activity
- Balance concurrent agent executions
- Plan agent resource usage strategically

**Debugging Strategy**

- Start with hierarchy view to understand relationships
- Use timeline view to identify timing issues
- Check logs for detailed error information
- Correlate failures with parent agent context
- Test fixes with isolated agent runs

### Related Concepts

- **[Agent Debug Panel](./agent-debug-panel.md)**: Real-time agent communication visibility
- **[Event Logs](./event-logs.md)**: Persistent event logging for historical analysis
- **[Execution History](./execution-history.md)**: Review past agent executions
- **[Agent Lifecycle](../agent-management/agent-lifecycle.md)**: Understanding agent execution phases
- **[Swarm Management](../swarm-management/)**: Coordinating multiple agents as a group

### Troubleshooting

**Agent Shows "Starting" Status**

- Check if the agent process is actually running
- Verify agent template exists and is valid
- Check system logs for initialization errors
- Ensure required resources (files, APIs) are accessible
- Restart the agent if it appears stuck

**Agent Not Appearing in List**

- Verify the agent was successfully started
- Check filters aren't excluding the agent
- Refresh the panel to sync with server
- Confirm WebSocket connection is active
- Check for client-side console errors

**Cannot Stop Agent**

- Verify you have permissions to control the agent
- Check if agent is managed by an orchestrator
- Review agent logs for unresponsive operations
- Force-stop through system process manager if needed
- Contact administrator if agent is critical system process

**Hierarchy View Shows Incorrect Relationships**

- Check for stale parent agent references
- Verify agent instance IDs are correctly linked
- Refresh to rebuild hierarchy from latest data
- Check for orphaned agents from crashed executions
- Review execution logs for spawn events

**High Memory Usage**

- Identify agents with memory leaks
- Check for cached data not being released
- Review agents processing large files or datasets
- Restart agents consuming excessive memory
- Optimize templates to reduce memory footprint
