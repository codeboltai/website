---
title: "Event Logs"
description: "Append-only event logging system for persistent system event tracking"
tags: ["observability", "logging", "event-tracking", "persistence", "querying"]
---

## Event Logs

### Executive Summary

The Event Logs system provides a persistent, append-only event storage mechanism for tracking all significant events within CodeBolt. Built on SQLite with WAL mode for performance, it offers efficient event storage, powerful query capabilities, and real-time event streaming. Events are organized into logical instances, making it easy to track different aspects of the system separately while maintaining a unified query interface.

### What are Event Logs?

Event Logs represent a time-ordered sequence of significant occurrences within the CodeBolt system. Unlike traditional logging systems that mix different types of messages, Event Logs provide structured event storage with rich metadata, enabling powerful querying and analysis. Each event captures a specific occurrence with its type, payload, metadata, and timestamp, creating a comprehensive audit trail of system activity.

The system uses an append-only architecture, meaning events are never modified once written—only new events can be added. This ensures data integrity and enables reliable time-series analysis. Events are organized into "instances"—logical groupings that represent different event streams (e.g., "execution", "planning", "debugging")—making it easy to manage and query related events together.

### Key Capabilities

**Event Storage**

- **Append-Only Architecture**: Events are never modified, only appended
- **SQLite Backend**: Efficient, reliable storage with WAL mode
- **Structured Events**: Rich payload and metadata for each event
- **Automatic Indexing**: Fast queries on common fields
- **Batch Operations**: Efficiently append multiple events at once

**Event Instances**

- **Logical Grouping**: Organize events into named instances
- **Instance Metadata**: Track creation time, event counts, descriptions
- **Instance Management**: Create, list, update, and delete instances
- **Dynamic Instances**: Create new instances on-demand
- **Instance Isolation**: Query events within specific contexts

**Query and Filtering**

- **Query DSL**: Powerful domain-specific language for event queries
- **Filter Operators**: Support for =, !=, >, <, >=, <=, IN, NOT IN, LIKE
- **Time Range Queries**: Filter events by time windows
- **Reduce Operations**: Aggregate events to derive entity state
- **Result Ordering**: Sort by timestamp or event type

**Real-Time Updates**

- **WebSocket Streaming**: Real-time event notifications
- **Event Emitters**: Backend emits events on append
- **Live UI Updates**: Frontend reacts to new events instantly
- **Connection Status**: Monitor WebSocket connectivity
- **Event Replay**: Catch up on missed events

**Event Types**

Common event types in CodeBolt:
- **Agent Lifecycle**: Agent start, stop, status changes
- **Task Events**: Task creation, updates, completion
- **Error Events**: Exceptions, failures, warnings
- **System Events**: Configuration changes, resource allocation
- **User Actions**: Commands, interactions, decisions
- **Integration Events**: API calls, external service interactions

**Metadata and Payloads**

- **Flexible Payloads**: JSON payload for event-specific data
- **Rich Metadata**: Key-value pairs for filtering and correlation
- **Correlation IDs**: Track related events across instances
- **Severity Levels**: Categorize events by importance
- **Custom Fields**: Extend events with domain-specific data

### How It Works Conceptually

**Event Flow Architecture**

```
Event Source
    ↓
Event Append Request
    ↓
Event Data Service
    ↓
SQLite Database (Append-Only)
    ↓
Event Emitter
    ↓
WebSocket Broadcast
    ↓
Event Log Panel (Real-time Update)
```

**Storage Architecture**

The event log system uses a dual-layer architecture:

1. **Instance Metadata** (JSON files)
   - Location: `{projectPath}/.codebolt/eventlog/instances/`
   - Format: One JSON file per instance
   - Content: Instance name, description, event count, timestamps
   - Purpose: Fast instance listing and metadata queries

2. **Event Data** (SQLite database)
   - Location: `{projectPath}/.codebolt/db/project.db`
   - Schema: Events table with generated columns
   - Features: WAL mode, key-value index, migrations
   - Purpose: Efficient event storage and querying

**Event Structure**

Each event contains:
- **Event ID**: Unique auto-incrementing identifier
- **Project ID**: Project the event belongs to
- **Instance ID**: Logical grouping the event belongs to
- **Stream ID**: Optional sub-grouping within instance
- **Event Type**: Categorization of the event
- **Payload**: JSON data with event-specific information
- **Metadata**: Key-value pairs for filtering and correlation
- **Created At**: Epoch millisecond timestamp

**Query Execution**

The query system transforms high-level queries into SQL:

1. **Query Definition**: User specifies filters, time range, ordering
2. **Query Compilation**: DSL compiled to parameterized SQL
3. **SQL Execution**: Run against SQLite database
4. **Result Transformation**: Convert rows to event objects
5. **Response Delivery**: Return events to caller

**Reduce Operations**

For deriving state from events:
- **Strategy**: Last, first, count, exists
- **Entity Matching**: Filter events by entity identifier
- **Field Extraction**: Pull specific field from event data
- **Aggregation**: Apply reduce strategy to matching events
- **State Derivation**: Return current entity state

**Real-Time Synchronization**

WebSocket events keep UI in sync:
- **Instance Created**: New instance notification
- **Instance Updated**: Instance metadata changes
- **Instance Deleted**: Instance removal notification
- **Event Appended**: New event in instance
- **Events Appended**: Batch event notification

### Use Cases

**Audit Trail**

Maintain comprehensive system history:
- Track all user actions and decisions
- Record agent lifecycle events
- Monitor system configuration changes
- Comply with audit requirements
- Investigate incidents with complete history

**Debugging and Troubleshooting**

Understand system behavior:
- Trace event sequences leading to errors
- Correlate events across system components
- Identify root causes of failures
- Reproduce issues from event logs
- Verify system behavior matches expectations

**Performance Analysis**

Optimize system performance:
- Measure event processing times
- Identify bottlenecks through event timing
- Track resource usage patterns
- Analyze event frequency and distribution
- Optimize based on real usage patterns

**State Reconstruction**

Rebuild system state from events:
- Replay events to understand system evolution
- Debug state inconsistencies
- Test event replay for disaster recovery
- Validate event sourcing patterns
- Implement event-driven features

**Monitoring and Alerting**

Proactive system monitoring:
- Track error rates and patterns
- Monitor event frequency for anomalies
- Set up alerts on specific event types
- Track system health through events
- Generate metrics from event data

### Advanced Features

**Query DSL**

Powerful event querying capabilities:
- **Filter Combinations**: Multiple filters with AND logic
- **Time Windows**: Precise time range queries
- **Field Selection**: Query specific event fields
- **Ordering Control**: Sort by timestamp or type
- **Pagination**: Limit and offset for large result sets
- **Reduce Queries**: Derive state from event streams

**Correlation and Tracing**

Track related events across instances:
- **Correlation IDs**: Link events from different sources
- **Causal Relationships**: Trace event dependencies
- **Request Tracing**: Follow requests through the system
- **Cross-Instance Queries**: Query across logical boundaries
- **Event Chains**: Reconstruct complete workflows

**Event Enrichment**

Add context to events post-capture:
- **Metadata Injection**: Add derived metadata to events
- **Event Tagging**: Label events for later filtering
- **Relationship Linking**: Connect related events
- **Classification**: Auto-categorize events by type
- **Anomaly Detection**: Flag unusual event patterns

**Data Retention**

Manage event log growth:
- **Time-Based Retention**: Auto-delete old events
- **Event Type Retention**: Keep important events longer
- **Archival**: Move old events to cold storage
- **Compression**: Reduce storage for historical events
- **Export**: Extract events for external analysis

**Integration Points**

Event logs integrate with CodeBolt systems:
- **Agent Execution**: Track agent lifecycle events
- **Task Management**: Log task state changes
- **Error Handling**: Capture and categorize errors
- **User Actions**: Record user interactions
- **System Events**: Monitor configuration changes

### Best Practices

**Event Design**

- Use descriptive event type names
- Include all relevant context in payload
- Add metadata for efficient filtering
- Use correlation IDs for related events
- Document event schemas for consistency

**Query Optimization**

- Use time range filters to reduce scan size
- Create indexes on frequently queried fields
- Use reduce operations instead of client aggregation
- Limit result sets for large queries
- Cache frequently used query results

**Instance Management**

- Group related events in same instance
- Use descriptive instance names
- Document instance purpose and contents
- Clean up unused instances
- Monitor instance sizes for growth

**Performance Considerations**

- Batch event appends when possible
- Use read-only connections for queries
- Enable WAL mode for concurrent access
- Monitor database size and growth
- Archive old events periodically

### Related Concepts

- **[Agent Debug Panel](./agent-debug-panel.md)**: Real-time agent event streaming
- **[Running Agents Panel](./running-agents-panel.md)**: Monitor agent executions
- **[Execution History](./execution-history.md)**: Historical agent execution records
- **[Observability Overview](./observability-overview.md)**: Complete observability system guide

### Troubleshooting

**Events Not Appearing**

- Verify instance exists and is correct
- Check event append succeeded without errors
- Confirm database is writable
- Check WebSocket connection for real-time updates
- Review browser console for JavaScript errors

**Slow Query Performance**

- Add time range filters to reduce scan size
- Create indexes on filtered fields
- Use reduce operations for aggregations
- Limit result set size
- Consider archiving old events

**Database Size Growing Too Fast**

- Implement time-based retention policies
- Archive old events to external storage
- Compress historical event data
- Reduce event payload sizes
- Clean up unused instances

**Query Returns No Results**

- Verify instance ID is correct
- Check filter conditions aren't too restrictive
- Confirm time range includes events
- Test with broader filters first
- Check event type matches expected values

**WebSocket Connection Issues**

- Verify backend WebSocket server is running
- Check network connectivity to backend
- Confirm correct WebSocket URL
- Review browser console for connection errors
- Test WebSocket connection manually
