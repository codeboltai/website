---
title: "Running Agents"
description: "Monitoring and managing active agent executions in real-time"
tags: ["agent-management", "monitoring", "observability", "execution"]
---

## Running Agents

### Executive Summary

The Running Agents panel provides comprehensive real-time visibility into all active agent executions within CodeBolt. Users can monitor agent status, track performance metrics, view execution hierarchies, debug issues, and control agent lifecycles through multiple visualization modes. This observability layer is essential for understanding agent behavior, diagnosing problems, and optimizing agent performance in production environments.

### What are Running Agents?

Running Agents are the live instances of agents actively executing tasks within the CodeBolt environment. Each agent instance represents a single execution of an agent template or a directly invoked agent. The Running Agents panel tracks all these instances, providing a unified view of agent activity across the system regardless of how the agents were started—whether by user request, by another agent, or as background processes.

The system captures rich metadata for each agent instance, including start time, current status, parent-child relationships, execution context (swarm ID, thread ID, orchestrator ID), and real-time updates. This information enables users to understand not just what agents are running, but how they relate to each other and the broader system context.

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

**Filtering and Search**

- Filter by status (running, completed, failed)
- Filter by start source (direct, background, agent-initiated)
- Filter by swarm ID to see agents in specific swarms
- Search agents by name or description
- View all agents or focus on specific contexts

**Agent Control Actions**

- **Stop Agent**: Gracefully terminate a running agent
- **Start Agent**: Restart a stopped or failed agent
- **View Logs**: Access detailed execution logs
- **Open Details**: Inspect agent configuration and context
- **Respond to Input**: Provide required input to waiting agents

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

### How It Works Conceptually

**Agent Lifecycle Tracking**

1. **Agent Registration**: When an agent starts, the system registers it with the execution manager
2. **Status Updates**: Agent status changes are captured in real-time via WebSocket events
3. **Hierarchy Building**: Parent-child relationships are established when agents spawn other agents
4. **Execution Persistence**: Agent execution data is persisted to storage for historical analysis
5. **Completion**: When agents finish, final status, duration, and results are recorded

**Data Flow**

```
Agent Execution
    ↓
Agent Execution Manager (Backend)
    ↓
WebSocket Events (Real-time updates)
    ↓
Running Agents Panel (UI)
    ↓
User Actions (Stop, Start, View)
    ↓
Agent Control API
    ↓
Agent Process Manager
```

**Execution Context**

Each agent instance tracks:
- **Agent Instance ID**: Unique identifier for this specific execution
- **Agent ID**: Template or agent definition being executed
- **Thread ID**: Conversation or session context
- **Parent Agent Instance ID**: If spawned by another agent
- **Swarm ID**: If part of a coordinated swarm
- **Orchestrator ID**: If managed by an orchestrator
- **Start Source**: How the agent was initiated (direct/background/agent)

**Hierarchy Representation**

The system builds execution trees by linking parent and child agents:
- Root agents have no parent (started by user or system)
- Child agents reference their parent's instance ID
- Hierarchical views show multi-level nesting
- Call chains trace the complete ancestry of an agent

**State Synchronization**

Real-time updates maintain consistency:
- WebSocket events push status changes immediately
- UI updates reactively without polling overhead
- Multiple views stay synchronized automatically
- Optimistic updates provide instant feedback
- Server reconciliation ensures accuracy

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

**Historical Analysis**

Learn from past executions:
- Query historical agent executions
- Analyze success rates over time
- Identify common failure modes
- Track agent performance trends
- Generate reports on agent utilization

### Related Concepts

- **[Agent Templates](./agent-templates.md)**: Create agent workflows that become running agents
- **[Background Agents](./background-agents.md)**: Long-running agents without user interaction
- **[Agent Use Cases](./agent-use-cases.md)**: Real-world scenarios for running agents
- **[Agent Execution Manager](../../internals/agent-execution.md)**: Internal system managing agent lifecycles
- **[WebSocket Events](../../internals/communication.md)**: Real-time event system for status updates

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
