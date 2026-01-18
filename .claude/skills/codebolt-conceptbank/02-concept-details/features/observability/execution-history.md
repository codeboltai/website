---
title: "Execution History"
description: "Historical records and analysis of past agent executions"
tags: ["observability", "agent-execution", "history", "analysis", "persistence"]
---

## Execution History

### Executive Summary

The Execution History system maintains comprehensive records of all agent executions within CodeBolt, enabling retrospective analysis, performance tracking, and historical debugging. Unlike the real-time focus of the Running Agents panel, Execution History provides a persistent archive of completed agent runs with full execution context, logs, error details, and temporal relationships. This historical perspective is essential for understanding long-term patterns, optimizing agent performance, and conducting post-mortem analyses.

### What is Execution History?

Execution History represents the complete archival record of agent executions in CodeBolt. Every agent execution—whether successful, failed, or cancelled—is captured with rich metadata including start time, end time, duration, status, error messages, parent-child relationships, and execution logs. This data is persisted in a structured format that enables efficient querying, filtering, and analysis long after the original execution has completed.

The system maintains both an index for quick lookups and individual execution files for detailed inspection. This dual-layer approach balances query performance with detailed information retrieval. Execution history serves multiple purposes: debugging past issues, analyzing performance trends, auditing agent activity, and providing training data for improving agent behavior.

### Key Capabilities

**Comprehensive Execution Records**

- **Full Execution Context**: Capture all relevant execution metadata
- **Status Tracking**: Record final execution status (completed, failed, cancelled)
- **Duration Measurement**: Track execution time from start to completion
- **Error Details**: Preserve error messages and stack traces
- **Execution Logs**: Store agent-generated log entries
- **Relationship Metadata**: Maintain parent-child agent relationships

**Index-Based Queries**

- **Fast Lookups**: Quick access to execution summary data
- **Filterable Index**: Query by status, swarm, source, thread
- **Sorted Results**: View executions chronologically
- **Minimal Data Overhead**: Index contains only essential fields
- **Incremental Updates**: Index updates as executions complete

**Detailed Execution Inspection**

- **Full Execution Data**: Access complete execution records
- **Log Review**: Read agent-generated logs
- **Error Analysis**: Examine detailed error information
- **Context Understanding**: View execution relationships and context
- **Comparison**: Compare multiple executions side-by-side

**Multi-Dimensional Filtering**

- **Status Filter**: View completed, failed, or running executions
- **Swarm Filter**: Focus on agents within specific swarms
- **Source Filter**: Distinguish direct, background, and agent-initiated runs
- **Thread Filter**: View executions within conversation contexts
- **Background Filter**: Separate foreground and background agents

**Hierarchical Relationships**

- **Parent-Child Links**: Track which agents spawned which
- **Execution Trees**: View complete agent call hierarchies
- **Ancestry Traces**: Follow execution chains from root to leaf
- **Cluster Analysis**: Group related executions
- **Impact Analysis**: Understand cascading effects

**Persistence and Recovery**

- **Automatic Persistence**: All executions saved automatically
- **Crash Recovery**: Detect and mark interrupted executions
- **Data Migration**: Upgrade data format across versions
- **Index Rebuilding**: Reconstruct index from execution files
- **Cleanup**: Optional removal of old execution records

### How It Works Conceptually

**Execution Lifecycle**

```
Agent Start
    ↓
Create Execution Record
    ↓
Track Status Changes
    ↓
Agent Completion (Success/Failure/Cancel)
    ↓
Finalize Execution Record
    ↓
Update Index
    ↓
Persist to Storage
```

**Storage Architecture**

The execution history system uses a dual-layer storage model:

1. **Index File** (Quick lookup)
   - Location: `{projectPath}/.codebolt/agentExecutions/index.json`
   - Format: JSON array of execution summary entries
   - Content: Agent instance ID, name, status, times, metadata
   - Purpose: Fast filtering and sorting without loading all details

2. **Execution Files** (Detailed records)
   - Location: `{projectPath}/.codebolt/agentExecutions/{instanceId}.json`
   - Format: Individual JSON file per execution
   - Content: Complete execution data with logs and relationships
   - Purpose: Detailed inspection of specific executions

**Execution Record Structure**

Each execution record contains:
- **Agent Instance ID**: Unique identifier for this execution
- **Agent ID**: Template or agent definition executed
- **Agent Name**: Human-readable agent name
- **Thread ID**: Conversation or session context
- **Parent ID**: If spawned by another agent
- **Parent Agent Instance ID**: Direct parent's instance ID
- **Task**: Description of what the agent was doing
- **Status**: Final execution state
- **Start Time**: When execution began
- **End Time**: When execution completed (if finished)
- **Duration**: Execution length in milliseconds
- **Call Time**: When this agent was invoked
- **Logs**: Array of log messages generated during execution
- **Error**: Error message if execution failed
- **Is Background**: Whether this was a background agent
- **Swarm ID**: If part of a coordinated swarm
- **Orchestrator ID**: If managed by an orchestrator
- **Start Source**: How the agent was initiated
- **Children**: Array of child agent executions

**Status Evolution**

Agents progress through status states:
1. **Starting**: Agent is initializing (record created)
2. **Running**: Agent is actively processing (status updated)
3. **Terminal State**: One of:
   - **Completed**: Agent finished successfully
   - **Failed**: Agent encountered an error
   - **Cancelled**: Agent was intentionally stopped

**Crash Recovery**

The system handles unexpected terminations:
- **Startup Scan**: Check for running/starting agents on app launch
- **Stale Detection**: Mark agents still in running state as cancelled
- **Error Annotation**: Add note about crash/interruption
- **Data Preservation**: Keep partial execution data for analysis
- **Automatic Recovery**: Transparent recovery on next startup

**Index Management**

The execution index is maintained for efficient queries:
- **Incremental Updates**: Add new executions as they complete
- **Atomic Writes**: Use temporary files for safe updates
- **Rebuild Capability**: Reconstruct from execution files if needed
- **Sorted Storage**: Maintain chronological order
- **Filter Optimization**: Index common query fields

### Use Cases

**Post-Mortem Analysis**

Investigate failures after the fact:
- Review complete execution timeline
- Examine error messages and context
- Trace execution path leading to failure
- Identify contributing factors
- Document lessons learned

**Performance Trend Analysis**

Track agent performance over time:
- Measure execution duration trends
- Identify performance degradation
- Compare agent template versions
- Track resource usage patterns
- Optimize based on historical data

**Debugging Complex Issues**

Understand multi-agent interactions:
- Reconstruct complete agent call chains
- Analyze parent-child agent relationships
- Trace data flow through agent hierarchies
- Identify race conditions or timing issues
- Reproduce complex scenarios

**Audit and Compliance**

Maintain comprehensive activity logs:
- Track all agent executions for audit trails
- Verify agent actions comply with policies
- Generate compliance reports
- Investigate suspicious activity
- Demonstrate system behavior

**Training and Improvement**

Learn from historical executions:
- Identify common failure patterns
- Collect successful execution examples
- Train new team members on agent behavior
- Improve agent templates based on history
- Build knowledge base from real executions

### Advanced Features

**Execution Tree Reconstruction**

Build complete agent hierarchies:
- **Root Identification**: Find top-level agents
- **Tree Building**: Link parents and children
- **Multi-Level Nesting**: Handle deep agent hierarchies
- **Cross-Thread Relationships**: Track agents across threads
- **Visualization Support**: Enable tree visualizations

**Temporal Analysis**

Analyze executions over time:
- **Time Series Queries**: Find executions in time windows
- **Pattern Detection**: Identify recurring execution patterns
- **Seasonal Trends**: Discover time-based usage patterns
- **Correlation Analysis**: Correlate executions with events
- **Forecasting**: Predict future execution needs

**Comparative Analysis**

Compare multiple executions:
- **Side-by-Side Comparison**: View executions together
- **Difference Highlighting**: Spot variations between runs
- **Performance Comparison**: Compare duration and resource usage
- **Success Rate Analysis**: Track improvement over time
- **A/B Testing**: Compare different agent configurations

**Historical Querying**

Powerful search capabilities:
- **Status Queries**: Find all failed executions
- **Time Range Queries**: Executions within specific periods
- **Agent-Specific Queries**: All runs of a particular agent
- **Thread Queries**: Executions within conversation contexts
- **Swarm Queries**: All agents in a coordinated swarm

**Data Export and Sharing**

Extract execution data for external use:
- **Export to JSON**: Extract execution records
- **Generate Reports**: Create summary reports
- **Share Executions**: Share interesting cases with team
- **Archive Data**: Move old executions to storage
- **Import Executions**: Restore from backup

### Best Practices

**Record Management**

- Regularly review and clean up old executions
- Archive important executions before cleanup
- Document reasons for unusual executions
- Use descriptive task names for context
- Maintain consistent naming conventions

**Query Optimization**

- Use filters to reduce result sets
- Query index before loading full records
- Cache frequently accessed executions
- Use time range filters for large datasets
- Batch queries when possible

**Data Analysis**

- Look for patterns in failed executions
- Track performance metrics over time
- Compare executions before and after changes
- Correlate failures with system events
- Use historical data for capacity planning

**Retention Policies**

- Define retention periods for different execution types
- Archive important executions before deletion
- Compress old execution data to save space
- Maintain index for archived data
- Document retention and archival processes

### Related Concepts

- **[Running Agents Panel](./running-agents-panel.md)**: Monitor active executions
- **[Agent Debug Panel](./agent-debug-panel.md)**: Real-time execution visibility
- **[Event Logs](./event-logs.md)**: Detailed event-level history
- **[Agent Lifecycle](../agent-management/agent-lifecycle.md)**: Understanding agent execution phases
- **[Observability Overview](./observability-overview.md)**: Complete observability system guide

### Troubleshooting

**Execution Missing from History**

- Check if execution completed successfully
- Verify agent execution tracking was enabled
- Look for execution in different thread or swarm
- Check filters aren't excluding the execution
- Review agent execution manager logs

**Incorrect Execution Status**

- Verify execution actually completed
- Check for crash recovery annotations
- Review execution logs for status changes
- Confirm no conflicting status updates
- Rebuild index from execution files

**Large Index File Size**

- Implement regular cleanup of old executions
- Archive old executions to external storage
- Compress historical execution data
- Reduce logging verbosity for active agents
- Implement time-based retention policies

**Cannot Find Parent Agent**

- Check if parent agent execution exists
- Verify parent agent instance ID is correct
- Look for parent in different context (thread/swarm)
- Check if parent was cleaned up or archived
- Review execution for stale references

**Execution File Corruption**

- Restore from index if file is damaged
- Reconstruct execution from event logs
- Check for disk errors or filesystem issues
- Validate execution file format on write
- Implement backup and recovery procedures
