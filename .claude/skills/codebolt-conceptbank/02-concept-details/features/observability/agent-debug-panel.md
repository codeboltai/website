---
title: "Agent Debug Panel"
description: "Real-time request/response visibility for agent interactions"
tags: ["observability", "debugging", "agent-monitoring", "communication"]
---

## Agent Debug Panel

### Executive Summary

The Agent Debug Panel provides a terminal-like interface for real-time visibility into agent request/response cycles. It captures and displays agent communications, including prompts, responses, errors, and system messages, enabling developers to understand exactly what agents are sending and receiving. This debugging capability is essential for troubleshooting agent behavior, optimizing prompts, and diagnosing integration issues.

### What is the Agent Debug Panel?

The Agent Debug Panel is an interactive terminal component integrated into CodeBolt that streams agent debug messages in real-time. Built on top of the xterm.js terminal emulator, it provides a familiar console-like experience with features like syntax highlighting, scrollback history, copy/paste support, and customizable theming. The panel receives debug messages through event emitters and displays them as they occur during agent execution.

Unlike static log files or post-execution analysis, the debug panel shows live agent activity as it happens. This immediate feedback loop allows developers to spot issues the moment they occur, understand agent decision-making in context, and iterate rapidly on agent configurations.

### Key Capabilities

**Real-Time Message Streaming**

- **Live Agent Output**: See agent messages as they're generated
- **Request/Response Pairs**: View complete agent communication cycles
- **Error Messages**: Catch errors as they occur with full context
- **System Events**: Monitor agent lifecycle events (start, stop, status changes)
- **Multi-Agent Support**: Track multiple agents simultaneously in one view

**Terminal Features**

- **xterm.js Integration**: Professional-grade terminal emulator
- **Scrollback History**: Access up to 1000 lines of historical messages
- **Copy/Paste Support**: Easily extract information from debug output
- **Web Link Detection**: Clickable URLs in agent responses
- **Clipboard Integration**: Seamless copying of debug content
- **Customizable Theming**: Adapts to CodeBolt's theme system

**Message Types Displayed**

- **Agent Prompts**: Input sent to LLMs or agent systems
- **Agent Responses**: Raw outputs from agent processing
- **Error Messages**: Exception details and failure notifications
- **Status Updates**: Agent state changes and progress indicators
- **Debug Output**: Developer-defined debug statements
- **System Notifications**: Framework-level events and warnings

**Interactive Features**

- **Clear Terminal**: Reset the debug view to start fresh
- **Resize Handling**: Terminal automatically adjusts to panel size
- **Focus Management**: Terminal focus for keyboard interaction
- **Search Support**: Find specific messages within output
- **Export Capability**: Save debug output for analysis or sharing

### How It Works Conceptually

**Message Flow Architecture**

```
Agent Execution
    ↓
Agent Debug Events (Backend)
    ↓
Event Emitter System
    ↓
Agent Debug Panel (Frontend)
    ↓
Terminal Display (xterm.js)
```

**Event Registration**

1. **Agent Initialization**: When an agent starts, it registers with the debug system
2. **Message Generation**: Agent generates messages during execution
3. **Event Emission**: Messages are emitted as debug events
4. **Panel Subscription**: Debug panel subscribes to agent debug events
5. **Real-Time Display**: Messages appear in terminal as they're received

**Message Transformation**

Raw agent messages are transformed for optimal display:
- **Line Ending Normalization**: Converts `\n` to `\r\n` for terminal display
- **Timestamp Addition**: Optional timestamps for message sequencing
- **Severity Highlighting**: Color-coding based on message type
- **Formatting Preservation**: Maintains whitespace and structure
- **Special Character Handling**: Escapes terminal control characters

**State Management**

The debug panel maintains state across sessions:
- **Message History**: Retains messages during panel lifetime
- **Scroll Position**: Preserves scroll position across updates
- **Selection State**: Maintains text selection for copying
- **Focus State**: Tracks terminal focus for keyboard events
- **Theme State**: Adapts display to current theme settings

**Integration Points**

The debug panel integrates with several CodeBolt systems:
- **Agent Execution Manager**: Receives execution events
- **Chat Event Emitter**: Subscribes to agent lifecycle events
- **Theme Provider**: Adapts to user theme preferences
- **Workspace Context**: Associates messages with workspace context
- **Panel Management**: Integrates with dockview panel system

### Use Cases

**Prompt Engineering**

Debug and optimize agent prompts:
- See exact prompts sent to LLMs
- Compare prompt variations side-by-side
- Identify prompt patterns that yield better results
- Test prompt engineering techniques iteratively
- Document effective prompt templates

**Integration Troubleshooting**

Diagnose agent integration issues:
- Verify API requests are formatted correctly
- Check authentication headers and tokens
- Validate request/response payloads
- Identify network or timeout issues
- Test third-party service integrations

**Performance Analysis**

Understand agent performance characteristics:
- Measure response times for agent operations
- Identify slow or hanging agent calls
- Track token usage and costs
- Optimize agent workflows for speed
- Benchmark different agent configurations

**Error Diagnosis**

Quickly identify and resolve errors:
- See error messages in context of execution
- Trace error propagation through agent chains
- Identify root causes of agent failures
- Test error handling and recovery mechanisms
- Validate error messages are user-friendly

**Development Workflow**

Streamline agent development:
- Rapidly iterate on agent designs
- Test agent changes in real-time
- Compare behavior across agent versions
- Share debug output with team members
- Document agent behavior for specifications

### Advanced Features

**Multi-Agent Debugging**

Track multiple agents simultaneously:
- See interleaved output from concurrent agents
- Identify cross-agent communication issues
- Debug agent-to-agent message passing
- Trace distributed agent workflows
- Correlate events across agent boundaries

**Conditional Debugging**

Control debug output verbosity:
- Filter messages by severity level
- Enable debug for specific agents only
- Suppress noisy system messages
- Focus on specific message types
- Toggle debug output without restarting

**Message Annotation**

Add context to debug output:
- Tag messages with custom labels
- Add notes to important events
- Mark messages for follow-up investigation
- Link debug messages to code locations
- Attach screenshots or files to events

**Historical Analysis**

Review past debugging sessions:
- Save debug output to files for later review
- Compare debug sessions across time
- Identify recurring patterns in errors
- Track agent behavior changes over time
- Build knowledge base of common issues

**Collaborative Debugging**

Share debugging sessions with teams:
- Export debug output for team review
- Annotate shared logs with explanations
- Collaborate on troubleshooting in real-time
- Build debugging documentation from real sessions
- Train new team members on agent behavior

### Best Practices

**Effective Debugging**

- Start with clear debug goals
- Use timestamps to correlate events
- Filter messages to reduce noise
- Document findings as you debug
- Share reproducible cases with team

**Message Management**

- Clear terminal between test runs
- Save important debug sessions
- Use consistent message formatting
- Add context to custom debug messages
- Archive old debug output periodically

**Performance Considerations**

- Limit scrollback for long-running sessions
- Disable debug for production monitoring
- Use selective debugging for targeted issues
- Monitor memory usage with large outputs
- Archive old debug data to free resources

### Related Concepts

- **[Running Agents Panel](./running-agents-panel.md)**: Monitor agent status alongside debug output
- **[Event Logs](./event-logs.md)**: Persistent event logging for historical analysis
- **[Execution History](./execution-history.md)**: Review past agent executions
- **[Agent Lifecycle](../agent-management/agent-lifecycle.md)**: Understanding agent execution phases
- **[Observability Overview](./observability-overview.md)**: Complete observability system guide

### Troubleshooting

**No Messages Appearing**

- Verify agent is actually running
- Check WebSocket connection to backend
- Confirm debug events are being emitted
- Ensure agent has debug output enabled
- Check browser console for JavaScript errors

**Terminal Not Responsive**

- Refresh the debug panel
- Check for excessive message volume
- Verify xterm.js library is loaded
- Clear terminal and restart agent
- Inspect browser developer tools for errors

**Messages Appearing Garbled**

- Check line ending configuration
- Verify message encoding is UTF-8
- Look for control characters in output
- Ensure proper message formatting
- Test with simple text messages first

**High Memory Usage**

- Reduce scrollback buffer size
- Clear terminal periodically
- Archive old debug sessions
- Disable debug for inactive agents
- Monitor for memory leaks in extensions

**Theme Not Applying**

- Verify theme provider is initialized
- Check theme variables are defined
- Refresh panel after theme changes
- Clear browser cache if needed
- Test with different themes to isolate issue
