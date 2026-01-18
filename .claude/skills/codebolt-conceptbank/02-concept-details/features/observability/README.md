---
title: "Observability Features"
description: "Overview of CodeBolt's observability and monitoring capabilities"
tags: ["observability", "monitoring", "debugging", "overview"]
---

# Observability Features

CodeBolt's observability system provides comprehensive visibility into agent executions, system events, and operational metrics. This directory contains conceptual documentation for each observability component, explaining how they work together to provide real-time monitoring, historical analysis, and deep debugging capabilities.

## Overview

The observability system is built around four core components that operate across different time dimensions and analytical needs:

1. **Agent Debug Panel** - Real-time agent communication visibility
2. **Running Agents Panel** - Live agent execution monitoring and control
3. **Event Logs** - Persistent event storage and querying
4. **Execution History** - Historical agent execution records

## Key Concepts

### Multi-Dimensional Visibility

CodeBolt's observability provides visibility across multiple dimensions:
- **Temporal**: Real-time monitoring, recent events, and historical analysis
- **Hierarchical**: Individual agents, agent swarms, and system-wide views
- **Functional**: Communication logs, lifecycle events, and execution outcomes
- **Relational**: Parent-child hierarchies, causal links, and correlations

### Real-Time vs. Historical

The observability system distinguishes between:
- **Real-Time**: What's happening right now (Debug Panel, Running Agents)
- **Historical**: What happened in the past (Event Logs, Execution History)
- **Transitional**: Events bridge the gap by capturing the present for future analysis

### Contextual Understanding

Beyond raw data collection, CodeBolt emphasizes:
- **Why** things happen, not just **what** happened
- Relationships between events and executions
- Causal chains from symptoms to root causes
- Temporal patterns and trends over time

## Components

### [Agent Debug Panel](./agent-debug-panel.md)

**Purpose**: Real-time visibility into agent request/response cycles

**Key Features**:
- Terminal-based interface for live agent communication
- Captures prompts, responses, errors, and system messages
- Built on xterm.js for professional terminal emulation
- Real-time streaming via WebSocket events
- Copy/paste support, scrollback history, customizable theming

**Best For**:
- Live debugging agent behavior
- Prompt engineering and optimization
- Integration troubleshooting
- Understanding agent decision-making in context

**Time Dimension**: Now (live streaming)

---

### [Running Agents Panel](./running-agents-panel.md)

**Purpose**: Monitor and control active agent executions

**Key Features**:
- Multiple visualization modes (grid, hierarchy, timeline, heatmap, icon)
- Real-time status tracking for all agent instances
- Agent control actions (stop, start, view details)
- Advanced filtering by status, source, and swarm
- Context navigation to related threads, swarms, and orchestrators

**Best For**:
- Production monitoring of agent health
- Identifying stuck or long-running agents
- Understanding agent hierarchies and relationships
- Real-time intervention and control

**Time Dimension**: Now (current state)

---

### [Event Logs](./event-logs.md)

**Purpose**: Persistent append-only event storage and querying

**Key Features**:
- SQLite-based event storage with WAL mode
- Organized into logical instances for different event streams
- Powerful query DSL with filters and time ranges
- Reduce operations for deriving state from events
- Real-time event streaming via WebSocket

**Best For**:
- Audit trails and compliance
- Debugging complex event sequences
- State reconstruction from event history
- Temporal pattern analysis

**Time Dimension**: Past to Present (append-only log)

---

### [Execution History](./execution-history.md)

**Purpose**: Historical records of past agent executions

**Key Features**:
- Comprehensive execution records with full context
- Index-based queries for fast lookups
- Detailed execution inspection with logs and errors
- Hierarchical relationship tracking
- Multi-dimensional filtering and search

**Best For**:
- Post-mortem analysis of failures
- Performance trend analysis over time
- Audit and compliance reporting
- Training and improvement from historical data

**Time Dimension**: Past (historical record)

---

## Common Workflows

### Live Debugging Workflow

When an agent is misbehaving in real-time:

1. **Start**: Running Agents Panel → Find the problematic agent
2. **Inspect**: Check agent status, hierarchy, and relationships
3. **Debug**: Open Agent Debug Panel → See live communication
4. **Iterate**: Review prompts/responses, stop agent, fix configuration
5. **Verify**: Restart agent and monitor for improvement

### Post-Mortem Workflow

After a failure has occurred:

1. **Identify**: Running Agents Panel → Find failed execution
2. **Investigate**: Execution History → Review error details and logs
3. **Correlate**: Event Logs → Find related system events
4. **Analyze**: Trace agent hierarchy for cascading failures
5. **Document**: Record findings and preventive measures

### Performance Optimization Workflow

When improving agent performance:

1. **Baseline**: Execution History → Identify slow agents
2. **Compare**: Analyze execution times across runs
3. **Correlate**: Event Logs → Check timing patterns
4. **Optimize**: Review Debug Panel → Improve communication efficiency
5. **Monitor**: Running Agents Panel → Verify improvements

### Trend Analysis Workflow

For understanding long-term patterns:

1. **Query**: Execution History → Filter by time period and criteria
2. **Analyze**: Calculate success rates and performance trends
3. **Correlate**: Event Logs → Cross-reference with system events
4. **Identify**: Find patterns, correlations, and anomalies
5. **Act**: Generate insights for planning and optimization

## Integration Points

The observability system integrates with multiple CodeBolt components:

- **Agent Management**: Tracks agent lifecycle and execution state
- **Swarm Management**: Monitors coordinated agent groups
- **Task Management**: Records task state changes
- **Error Handling**: Captures and categorizes errors
- **WebSocket System**: Real-time event broadcasting
- **Storage System**: Persistent data storage (SQLite, JSON)
- **Query System**: Powerful search and filtering

## Best Practices

### Effective Monitoring

- Use multiple observability tools together for complete picture
- Set up filters to focus on relevant data
- Check observability panels regularly during development
- Respond quickly to anomalies and errors
- Document findings for future reference

### Debugging Strategy

- Start with real-time tools (Debug Panel, Running Agents)
- Move to historical tools for post-mortem analysis
- Use correlations to link related events
- Trace causal chains from symptom to root cause
- Verify fixes by reproducing and monitoring

### Data Management

- Implement retention policies for historical data
- Archive important data before cleanup
- Compress old data to save space
- Backup critical execution records
- Document data management procedures

## Production Considerations

Running observability in production requires planning:

- **Performance**: Monitor overhead of observability features
- **Retention**: Define data retention policies
- **Privacy**: Ensure sensitive data is handled appropriately
- **Access Control**: Restrict access to observability data
- **Alerting**: Set up proactive monitoring for critical metrics
- **Scaling**: Ensure observability scales with system load

## Related Documentation

- **[Observability Overview](./observability-overview.md)**: Complete system guide
- **[Agent Management](../agent-management/)**: Agent lifecycle and execution
- **[Swarm Management](../swarm-management/)**: Coordinating agent groups
- **[Task Management](../task-management/)**: Task execution tracking

## Quick Links

- [Agent Debug Panel](./agent-debug-panel.md) - Real-time communication visibility
- [Running Agents Panel](./running-agents-panel.md) - Active execution monitoring
- [Event Logs](./event-logs.md) - Persistent event storage
- [Execution History](./execution-history.md) - Historical execution records
- [Observability Overview](./observability-overview.md) - System architecture and philosophy
