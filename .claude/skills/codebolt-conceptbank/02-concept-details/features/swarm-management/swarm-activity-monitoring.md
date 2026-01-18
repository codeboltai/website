---
title: Swarm Activity Monitoring
description: Real-time event tracking and analysis for swarm operations
category: Swarm Management
tags: [swarm, monitoring, events, episodic-memory]
lastUpdated: 2026-01-18
---

# Swarm Activity Monitoring

## Executive Summary

Swarm Activity Monitoring provides real-time visibility into all events occurring within a swarm through integration with CodeBolt's Episodic Memory system. It enables filtering, searching, and analyzing swarm events by type, agent, tags, and time ranges, giving operators complete observability over swarm operations.

## What It Is

Swarm Activity Monitoring is a comprehensive event tracking system that:

- **Captures all swarm events** in real-time through Episodic Memory integration
- **Provides filtering capabilities** by event type, agent, tags, and time windows
- **Maintains event history** with timestamps, payloads, and metadata
- **Enables detailed inspection** of individual events with full payload visibility
- **Supports ad-hoc analysis** with flexible querying options

Each swarm automatically gets its own dedicated Episodic Memory thread, ensuring complete isolation and organization of activity data.

## Key Capabilities

### Real-Time Event Capture
- Automatic event logging from all swarm participants (agents, teams, roles)
- Event types include agent lifecycle, status changes, communications, and errors
- Payload preservation for both simple messages and complex structured data
- Automatic metadata capture (emitting agent, team, timestamp, tags)

### Flexible Filtering
- **By Event Type**: Filter to specific event categories
- **By Agent**: View events from specific agents only
- **By Tags**: Filter events tagged with specific keywords
- **By Time Window**: Show events from last N minutes or last N events
- **Combination Filters**: Apply multiple filters simultaneously

### Event Inspection
- Split-pane view with event list and detail panel
- Detailed event metadata (timestamp, emitting agent, team, tags)
- Full payload visibility with pretty-printed JSON for structured data
- Relative time display (e.g., "5m ago", "2h ago") for quick scanning

### Data Discovery
- Dynamic extraction of available event types, agents, and tags
- Automatic filter option population from actual event data
- Event counts and statistics at a glance
- Real-time refresh capabilities

## How It Works Conceptually

### Episodic Memory Integration

```
Swarm Activity Monitoring
         ↓
    Creates dedicated Episodic Memory thread
    (named: swarm-{swarmId})
         ↓
    All swarm events emitted to ApplicationEventBus
         ↓
    Events captured in Episodic Memory
         ↓
    Query and display through SwarmActivityTab
```

### Event Flow

1. **Event Generation**: Agents and swarm components emit events to the ApplicationEventBus
2. **Event Capture**: Episodic Memory service automatically captures swarm events with thread ID matching the swarm ID
3. **Event Storage**: Events stored in Episodic Memory with full metadata and timestamps
4. **Event Querying**: Activity monitoring panel queries Episodic Memory using filters
5. **Event Display**: Results rendered in split-pane interface with list and detail views

### Filter Execution

```
User applies filters (event type, agent, tags, time)
         ↓
Query constructed for Episodic Memory API
         ↓
Episodic Memory executes query on event stream
         ↓
Filtered events returned and displayed
         ↓
Event counts and metadata updated
```

## Use Cases

### Operational Monitoring
- **Track agent lifecycle events**: Monitor when agents spawn, terminate, or change status
- **Detect anomalies**: Identify error events or unusual patterns in real-time
- **Verify agent behavior**: Confirm agents are executing expected operations
- **Audit compliance**: Review historical event logs for compliance requirements

### Debugging and Troubleshooting
- **Investigate issues**: Trace sequence of events leading to errors
- **Analyze agent interactions**: Understand communication patterns between agents
- **Inspect payloads**: Review detailed data structures passed between components
- **Identify bottlenecks**: Find slow operations or frequent status changes

### Performance Analysis
- **Measure activity levels**: Count events per time period to gauge swarm activity
- **Identify active agents**: See which agents are generating most events
- **Track event patterns**: Discover recurring event sequences or cycles
- **Optimize swarm configuration**: Use event data to inform swarm tuning

### Security and Compliance
- **Audit trail**: Maintain complete history of swarm actions
- **Access monitoring**: Track who initiated what operations
- **Compliance reporting**: Generate event logs for regulatory requirements
- **Forensic analysis**: Investigate security incidents or policy violations

## Related Concepts

- **[Swarm Management](./swarm-management.md)**: Overview of swarm organization and control
- **[Episodic Memory](./episodic-memory.md)**: Event storage and query system underlying activity monitoring
- **[Agent Lifecycle](./agent-lifecycle.md)**: Events related to agent spawning, status changes, and termination
- **[Swarm Execution Control](./swarm-execution-control.md)**: Starting and stopping swarms and monitoring their status
- **[Application Event Bus](./application-event-bus.md)**: Event distribution system that carries swarm events

## Technical Notes

### Event Data Structure

Each event in the activity monitor contains:
- **Event Type**: Categorical identifier (e.g., `agent:spawned`, `task:completed`)
- **Emitting Agent**: ID and name of the agent that generated the event
- **Timestamp**: Precise time of event occurrence
- **Team ID**: Optional team association
- **Tags**: Optional list of searchable keywords
- **Payload**: Event-specific data (string or structured JSON)

### Query Performance

- Episodic Memory uses indexed time-series storage for efficient time-based queries
- Filter combinations use efficient intersection algorithms
- Real-time updates supported through WebSocket connections
- Large event sets handled with pagination and virtual scrolling

### Swarm Isolation

- Each swarm's events stored in separate Episodic Memory thread
- Cross-swarm queries not supported (by design for isolation)
- Swarm deletion automatically removes associated event history
- Thread naming convention: `swarm-{swarmId}` for easy identification
