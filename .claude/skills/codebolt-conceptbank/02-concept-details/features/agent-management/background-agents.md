---
title: "Background Agents"
description: "Long-running autonomous agents that execute without user interaction"
tags: ["agent-management", "background-tasks", "automation", "async"]
---

## Background Agents

### Executive Summary

Background Agents in CodeBolt enable long-running autonomous tasks that execute independently of user interaction. Unlike interactive agents that require continuous user engagement, background agents operate silently in the background, performing monitoring, data processing, maintenance tasks, and scheduled operations. Users can start background agents with specific tasks, monitor their progress through real-time logs and status updates, and review historical executions, all while continuing to work on other activities within the system.

### What are Background Agents?

Background Agents are agent instances that run asynchronously without blocking the user interface or requiring active user participation. They are ideal for tasks that take minutes, hours, or even days to complete, as well as for ongoing monitoring and maintenance operations that need to run continuously.

When you start a background agent, you provide an initial task or objective. The agent then works autonomously to complete that task, executing its workflow, making decisions, calling other agents if needed, and handling errors according to its template design. Throughout its execution, the agent logs its activities and updates its status, allowing you to monitor progress without being actively involved.

**Key Characteristics**
- **Non-blocking**: Execution doesn't prevent you from doing other work
- **Autonomous**: Operates independently once started
- **Long-running**: Designed for extended execution periods
- **Observable**: Provides logs and status updates for monitoring
- **Persistent**: Maintains state across interruptions when properly designed

### Key Capabilities

**Agent Selection and Launch**

- Choose from installed agents, remix agents, or local agent flows
- Provide optional task descriptions to guide agent behavior
- Specify parameters and configuration at launch time
- Start multiple background agents concurrently
- Queue agents if system capacity is limited

**Real-Time Monitoring**

- **Live Status Tracking**: See current status (starting, running, completed, failed)
- **Execution Logs**: View timestamped log entries as agent executes
- **Progress Indicators**: Track completion percentage for multi-step tasks
- **Error Notifications**: Receive alerts when agents encounter errors
- **WebSocket Updates**: Real-time communication without polling

**Execution Management**

- **Stop Running Agents**: Gracefully terminate background agents
- **View Agent Details**: Inspect configuration and execution context
- **Access Historical Executions**: Review past background agent runs
- **Retry Failed Executions**: Restart agents that failed with same or modified parameters
- **Clean Up Completed Agents**: Remove finished agents from active list

**Log Management**

- **Expandable Log Entries**: Expand individual logs to see full details
- **Log Filtering**: Filter logs by severity or search by content
- **Log Export**: Download logs for external analysis or archiving
- **Log Persistence**: Logs stored with agent execution record
- **Timestamp Tracking**: Precise timing for each log entry

**Historical Tracking**

- **Execution History**: View all past background agent executions
- **Duration Tracking**: See how long each agent ran
- **Outcome Summary**: Quickly identify successful vs failed executions
- **Error Details**: Review error messages and stack traces
- **Performance Metrics**: Analyze execution times and resource usage

### How It Works Conceptually

**Background Agent Lifecycle**

1. **Initialization**
   - User selects agent and provides task description
   - System creates new agent instance with unique ID
   - Agent assigned to background execution context
   - Initial status set to "starting"

2. **Execution**
   - Agent loads its template and initializes
   - Begins processing according to workflow definition
   - Executes nodes in the agent flow graph
   - Generates log entries for significant actions
   - Updates status as it progresses through tasks

3. **Monitoring**
   - WebSocket connection streams real-time updates
   - UI displays current status and recent logs
   - Users can check progress at any time
   - System tracks resource usage and execution time

4. **Completion**
   - Agent finishes its workflow or encounters an error
   - Final status recorded (completed, failed, or cancelled)
   - End time and duration calculated
   - Agent moved from active to historical list
   - Full execution record persisted for later review

**Background Agent Store**

The system maintains a specialized store for background agents:
- **Active Agents**: Currently running background agent instances
- **Historical Agents**: Completed executions for reference
- **Event Emission**: Emits events for state changes (started, status-update, log, stopped)
- **Query Interface**: Retrieve agents by status, ID, or time range
- **Cleanup Operations**: Remove old historical data to manage storage

**Communication Flow**

```
User Request (Start Agent)
    ↓
Background Agent API
    ↓
Agent Process Manager (spawns agent)
    ↓
Agent Execution (running independently)
    ↓
Status/Log Events (WebSocket)
    ↓
Background Agent Store (state management)
    ↓
UI Updates (real-time display)
```

**Error Handling**

Background agents include robust error handling:
- **Node-Level Errors**: Individual nodes can fail without stopping entire agent
- **Retry Logic**: Nodes can be configured to retry on failure
- **Error Propagation**: Errors flow through the workflow to error handling nodes
- **Graceful Degradation**: Agents can continue with reduced functionality
- **Comprehensive Logging**: All errors logged with context for debugging

### Use Cases

**Scheduled Maintenance**

Automate periodic system maintenance tasks:
- Clean up temporary files and old logs
- Archive or compress historical data
- Update indexes and caches
- Verify data integrity
- Generate maintenance reports

**Data Processing Pipelines**

Process large datasets without blocking the UI:
- ETL operations (extract, transform, load)
- Batch data transformations
- File format conversions
- Data validation and cleansing
- Report generation

**Monitoring and Alerting**

Continuously monitor systems and conditions:
- Watch for system events or thresholds
- Check external service availability
- Monitor resource usage (disk, memory, CPU)
- Parse logs for errors or anomalies
- Send notifications when conditions met

**Long-Running Computations**

Execute tasks that take significant time:
- Machine learning model training
- Complex data analysis
- Large-scale code refactoring
- Test suite execution
- Build and deployment processes

**Periodic Synchronization**

Keep systems in sync automatically:
- Sync data with external APIs
- Pull updates from remote repositories
- Aggregate data from multiple sources
- Refresh cached information
- Mirror content across systems

**Research and Analysis**

Conduct autonomous research tasks:
- Web scraping and data collection
- Content aggregation from multiple sources
- Trend analysis over time periods
- Competitive monitoring
- Market research and data gathering

### Advanced Patterns

**Multi-Stage Workflows**

Background agents can orchestrate complex multi-stage processes:
- Stage 1: Data collection from multiple sources
- Stage 2: Data validation and cleansing
- Stage 3: Analysis and computation
- Stage 4: Report generation and distribution
- Each stage logs progress independently
- Errors in one stage don't prevent others from running

**Agent Chaining**

Background agents can spawn other agents:
- Coordinator agent manages overall task
- Spawns specialist agents for sub-tasks
- Aggregates results from child agents
- Handles errors and retries at coordination level
- Child agents can also be background agents

**Conditional Execution**

Background agents make decisions based on conditions:
- Check prerequisites before proceeding
- Branch execution based on data or environment
- Skip unnecessary steps when conditions not met
- Implement complex logic within workflow
- Adapt behavior based on intermediate results

**Resource-Aware Execution**

Smart background agents manage resource usage:
- Throttle operations during high system load
- Pause execution when resources constrained
- Resume when system capacity available
- Scale processing based on data volume
- Clean up intermediate resources to minimize footprint

**Fault Tolerance**

Robust background agents handle failures gracefully:
- Checkpoint progress at key points
- Resume from last checkpoint after interruption
- Retry failed operations with exponential backoff
- Fall back to alternative approaches
- Notify administrators of unrecoverable errors

### Best Practices

**Background Agent Design**

- **Idempotency**: Design agents that can safely retry operations
- **Checkpoints**: Save progress at key stages for recovery
- **Resource Limits**: Set timeouts and memory limits to prevent runaway agents
- **Logging**: Log extensively for debugging and audit trails
- **Testing**: Test thoroughly before running in production

**Task Specification**

- **Clear Objectives**: Provide unambiguous task descriptions
- **Context**: Include relevant background and context
- **Constraints**: Specify limits and constraints explicitly
- **Success Criteria**: Define what constitutes successful completion
- **Error Handling**: Specify how to handle expected error conditions

**Monitoring Setup**

- **Meaningful Logs**: Write log messages that convey useful information
- **Progress Updates**: Log progress at regular intervals
- **Milestones**: Mark significant completion points
- **Metrics**: Track performance metrics for optimization
- **Alerts**: Configure alerts for critical failures

**Resource Management**

- **Appropriate Tasks**: Use background agents for suitable long-running tasks
- **Concurrency**: Avoid starting too many concurrent agents
- **Clean Up**: Remove completed agents from active list regularly
- **Storage**: Archive old execution records to manage disk usage
- **System Load**: Schedule resource-intensive tasks during off-hours

**Security Considerations**

- **Permissions**: Background agents run with user's permissions
- **Credentials**: Store sensitive credentials securely, don't embed in tasks
- **Data Access**: Ensure agents only access appropriate data
- **External Calls**: Validate and sanitize all external inputs
- **Audit Trail**: Maintain logs of all agent actions for compliance

### Related Concepts

- **[Agent Templates](./agent-templates.md)**: Design workflows for background execution
- **[Running Agents](./running-agents.md)**: Monitor background agents alongside active agents
- **[Agent Use Cases](./agent-use-cases.md)**: Real-world examples of background agent scenarios
- **[Agent Execution Manager](../../internals/agent-execution.md)**: System managing background agent lifecycles
- **[WebSocket Communication](../../internals/communication.md)**: Real-time updates for background agents

### Troubleshooting

**Agent Stuck in "Starting" Status**

- Check agent template exists and is valid
- Verify required dependencies are installed
- Review system logs for initialization errors
- Ensure system has sufficient resources
- Try stopping and restarting the agent

**Agent Failed Without Clear Error**

- Check detailed logs for failure context
- Review agent template for error handling nodes
- Verify all required inputs and parameters were provided
- Test agent template in isolation
- Check external dependencies (APIs, files, databases)

**Agent Running Longer Than Expected**

- Review logs to identify current activity
- Check if agent is waiting for external dependency
- Verify agent isn't stuck in retry loop
- Consider stopping and investigating before restarting
- Analyze template for potential infinite loops

**Cannot Stop Background Agent**

- Wait a moment for stop command to process
- Check if agent is in critical section that can't be interrupted
- Review agent template for proper shutdown handling
- Force-kill through system process manager if necessary
- Contact administrator for system-level intervention

**Logs Not Appearing in Real-Time**

- Verify WebSocket connection is active
- Check browser console for connection errors
- Refresh the background agents panel
- Ensure backend server is running
- Review network connectivity and firewall settings
