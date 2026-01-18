---
id: "agent-debugging"
title: "Agent Debugging and Monitoring"
category: "features"
subcategory: "agent-management"
tags: ["debugging", "monitoring", "logging", "troubleshooting", "observability"]
audience: ["technical"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-types", "agent-creation-code", "agent-hooks"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Debugging and Monitoring

## Executive Summary

Agent debugging provides comprehensive visibility into agent execution through real-time terminal output, execution logs, performance metrics, and state inspection. This observability layer ensures that autonomous agent behavior remains transparent, debuggable, and trustworthy.

## Overview

Unlike traditional debugging where you step through code, agent debugging requires observing autonomous decision-making, multi-step workflows, and AI reasoning. CodeBolt's debugging system provides:

- **Real-Time Output**: Live terminal stream of agent operations
- **Execution Traces**: Step-by-step workflow execution
- **State Inspection**: View agent memory and context
- **Performance Metrics**: Timing and resource usage
- **Error Tracking**: Detailed error information and stack traces

This comprehensive debugging capability transforms "black box" AI agents into transparent, observable systems that can be trusted with critical development tasks.

## Debugging Components

### 1. Agent Debug Terminal

**Purpose**: Real-time output stream from running agents

**Access**: Agent Debug Panel (integrated terminal)

**Features**:
- **Live Stream**: Real-time agent output
- **Syntax Highlighting**: Color-coded messages
- **Searchable**: Filter and find in logs
- **Scrollable**: Full history with scrollback
- **Copy/Paste**: Export log segments
- **Clear**: Reset terminal view

**Output Types**:

**Info Messages** (Blue/Gray):
```
[INFO] Starting agent: Code Reviewer
[INFO] Loading file: src/components/Button.tsx
[INFO] Analyzing code structure...
```

**Warning Messages** (Yellow):
```
[WARN] File size exceeds recommended limit
[WARN] Missing type annotations in 3 locations
```

**Error Messages** (Red):
```
[ERROR] Failed to read file: Permission denied
[ERROR] LLM API timeout after 30s
```

**Success Messages** (Green):
```
[SUCCESS] Code review completed
[SUCCESS] Generated 5 test cases
```

**Debug Messages** (Gray, debug mode only):
```
[DEBUG] Agent step 1 starting
[DEBUG] Context window: 45000 / 200000 tokens
[DEBUG] Selected model: claude-sonnet
```

### 2. Execution Tracing

**Purpose**: Track workflow execution through agent flow nodes

**Trace Levels**:

**Node Level**:
- Which nodes executed
- Input/output data
- Execution time
- Success/failure status

**Workflow Level**:
- Execution path through flow
- Branch decisions
- Loop iterations
- Parallel executions

**Agent Level**:
- Agent spawn/completion
- Sub-agent calls
- Inter-agent communication
- Resource usage

**Trace Output**:
```json
{
  "traceId": "trace_12345",
  "agentId": "code-reviewer",
  "startTime": "2026-01-18T10:30:00Z",
  "nodes": [
    {
      "nodeId": 1,
      "type": "Events/OnMessage",
      "status": "success",
      "duration": 5,
      "inputs": {},
      "outputs": {"message": "Review this code"}
    },
    {
      "nodeId": 2,
      "type": "FS/ReadFile",
      "status": "success",
      "duration": 45,
      "inputs": {"filePath": "src/Button.tsx"},
      "outputs": {"content": "// file content..."}
    },
    {
      "nodeId": 3,
      "type": "Agent/AgentStep",
      "status": "success",
      "duration": 3500,
      "inputs": {"instruction": "Review for bugs"},
      "outputs": {"review": "Found 3 issues..."}
    }
  ],
  "totalDuration": 3550
}
```

### 3. State Inspection

**Purpose**: View agent internal state and context

**Inspectable States**:

**Memory State**:
- Short-term context
- Long-term knowledge
- Project-specific data
- User preferences

**Execution State**:
- Current position in workflow
- Active nodes
- Pending operations
- Completed steps

**LLM State**:
- Model in use
- Token usage
- Context window utilization
- Cost tracking

**Example State View**:
```json
{
  "agentId": "code-reviewer",
  "state": {
    "memory": {
      "projectContext": "React e-commerce app",
      "userPreferences": {
        "styleGuide": "airbnb",
        "framework": "react"
      }
    },
    "execution": {
      "currentNode": 3,
      "workflowProgress": "60%",
      "activeOperations": ["LLM inference"]
    },
    "llm": {
      "model": "claude-sonnet",
      "tokensUsed": 45000,
      "tokensRemaining": 155000,
      "estimatedCost": "$0.27"
    }
  }
}
```

### 4. Performance Metrics

**Purpose**: Track agent efficiency and resource usage

**Metrics Collected**:

**Execution Time**:
- Total duration
- Per-node timing
- LLM response time
- I/O operations time

**Resource Usage**:
- Token consumption
- API calls count
- Memory usage
- CPU utilization

**Cost Tracking**:
- Per-operation cost
- Total session cost
- Cost by model
- Cost optimization suggestions

**Example Metrics**:
```json
{
  "agentId": "code-reviewer",
  "metrics": {
    "execution": {
      "totalTime": "5.2s",
      "llmTime": "3.8s",
      "ioTime": "1.4s"
    },
    "resources": {
      "tokensUsed": 45000,
      "apiCalls": 5,
      "memoryUsed": "256MB"
    },
    "cost": {
      "total": "$0.27",
      "byModel": {
        "claude-sonnet": "$0.27"
      }
    }
  }
}
```

### 5. Error Tracking

**Purpose**: Capture and analyze errors and exceptions

**Error Information**:
- Error type and message
- Stack trace
- Node/operation where error occurred
- Input data that caused error
- Suggested fixes

**Error Categories**:

**LLM Errors**:
- API timeout
- Rate limiting
- Invalid response
- Context overflow

**File System Errors**:
- File not found
- Permission denied
- Invalid path
- Disk full

**Workflow Errors**:
- Invalid node connection
- Missing required input
- Type mismatch
- Circular dependency

**Error Log Example**:
```json
{
  "errorId": "err_67890",
  "timestamp": "2026-01-18T10:30:15Z",
  "type": "LLMTimeout",
  "message": "LLM API timeout after 30s",
  "location": {
    "nodeId": 3,
    "nodeType": "Agent/AgentStep",
    "workflow": "code-review.agentflow"
  },
  "context": {
    "model": "claude-sonnet",
    "promptLength": 45000,
    "timeout": 30
  },
  "suggestions": [
    "Reduce prompt length",
    "Increase timeout value",
    "Use faster model (claude-haiku)"
  ]
}
```

## Debugging Workflow

### Step 1: Enable Debug Mode

**Via Agent Settings**:
1. Open agent configuration
2. Enable "Debug Mode"
3. Set logging level (info, debug, trace)

**Via Code**:
```yaml
# agent.yaml
metadata:
  debug:
    enabled: true
    logLevel: "debug"
```

### Step 2: Open Debug Terminal

1. Navigate to Agent Debug Panel
2. Select agent to debug
3. Terminal opens automatically
4. Real-time output streams in

### Step 3: Execute Agent

1. Trigger agent execution (chat, hook, API)
2. Watch debug output in real-time
3. Note any warnings or errors
4. Monitor performance metrics

### Step 4: Analyze Results

**Success Path**:
- Review execution trace
- Check performance metrics
- Verify output quality
- Document any issues

**Error Path**:
- Examine error details
- Check context at error point
- Review suggestions
- Apply fixes

### Step 5: Iterate

1. Make configuration changes
2. Re-run agent
3. Compare results
4. Optimize based on metrics

## Common Debugging Scenarios

### Scenario 1: Agent Not Responding

**Symptoms**:
- No output in debug terminal
- Agent appears stuck
- No completion message

**Debugging Steps**:
1. Check if agent started (look for "[INFO] Starting agent")
2. Verify LLM connectivity (check network)
3. Examine execution trace (where did it stop?)
4. Review error logs (any silent failures?)

**Common Causes**:
- LLM API timeout
- Infinite loop in workflow
- Missing input validation
- Unhandled exception

**Solutions**:
- Increase timeout value
- Add loop detection
- Validate inputs early
- Add error handling nodes

### Scenario 2: Incorrect Output

**Symptoms**:
- Agent completes but produces wrong results
- Output doesn't match expectations
- Quality is poor

**Debugging Steps**:
1. Review execution trace (which path was taken?)
2. Check LLM prompts (what was actually sent?)
3. Examine context (was relevant data included?)
4. Analyze metrics (was context window exceeded?)

**Common Causes**:
- Insufficient context
- Wrong model selected
- Poor prompt engineering
- Missing tool access

**Solutions**:
- Increase context window
- Switch to more capable model
- Improve agent instructions
- Add required tools

### Scenario 3: Slow Performance

**Symptoms**:
- Agent takes too long to complete
- LLM calls are slow
- User experiences delays

**Debugging Steps**:
1. Check performance metrics (where is time spent?)
2. Review LLM timing (which models are slowest?)
3. Examine token usage (are you processing too much?)
4. Analyze node execution (which nodes are slowest?)

**Common Causes**:
- Large context windows
- Slow model choices
- Redundant operations
- Inefficient workflows

**Solutions**:
- Reduce context size
- Use faster models
- Remove redundant nodes
- Optimize workflow paths

### Scenario 4: Agent Crashes

**Symptoms**:
- Agent terminates unexpectedly
- Error message displayed
- Partial output only

**Debugging Steps**:
1. Check error logs (what crashed?)
2. Examine stack trace (where did it crash?)
3. Review crash context (what data caused crash?)
4. Identify error type (LLM, file system, workflow?)

**Common Causes**:
- Unhandled exceptions
- Invalid input data
- Resource exhaustion
- API failures

**Solutions**:
- Add try-catch nodes
- Validate inputs
- Implement rate limiting
- Add retry logic

## Debugging Tools

### 1. Log Filtering

**Purpose**: Find specific information in large log streams

**Filter Types**:
- **Level Filter**: Show only errors, warnings, or info
- **Component Filter**: Show only specific nodes or operations
- **Time Filter**: Show logs within time range
- **Search Filter**: Find specific text patterns

**Usage**:
```
# Show only errors
filter:level=error

# Show only LLM operations
filter:component=llm

# Search for specific file
filter:text="Button.tsx"

# Combine filters
filter:level=error&component=llm
```

### 2. Breakpoints

**Purpose**: Pause execution at specific points

**Setting Breakpoints**:
1. Open workflow in Flow Creator
2. Right-click node
3. Select "Set Breakpoint"
4. Choose condition (optional)

**Breakpoint Types**:
- **Always**: Stop every time
- **Conditional**: Stop when condition met
- **Once**: Stop first time only

**Debugging with Breakpoints**:
1. Set breakpoints on nodes of interest
2. Execute agent
3. Execution pauses at breakpoint
4. Inspect state and variables
5. Resume or step through

### 3. Variable Inspection

**Purpose**: View data at specific execution points

**Inspectable Variables**:
- Node inputs
- Node outputs
- Workflow variables
- Agent memory
- LLM context

**Inspection Methods**:
- Hover over node to see variables
- Click node for detailed view
- Use debug panel for state dump
- Export variables to file

### 4. Replay Mode

**Purpose**: Re-execute agent with same inputs

**How It Works**:
1. Capture execution inputs
2. Store in debug log
3. Replay with identical data
4. Compare results

**Use Cases**:
- Reproduce bugs
- Test fixes
- Compare model outputs
- Benchmark performance

## Monitoring Dashboards

### Real-Time Dashboard

**Purpose**: Live view of agent execution

**Components**:

**Active Agents Panel**:
- Currently running agents
- Execution progress
- Current status
- Quick actions (pause, stop)

**Performance Panel**:
- Execution time charts
- Token usage graphs
- Cost tracking
- Resource utilization

**Error Panel**:
- Recent errors
- Error types distribution
- Error trends
- Critical issues

**Log Stream**:
- Tail of recent logs
- Auto-scrolling
- Color-coded levels
- Quick filters

### Historical Dashboard

**Purpose**: Analyze past executions

**Features**:
- Execution history timeline
- Performance trends over time
- Error patterns and frequency
- Cost analysis and optimization

**Time Ranges**:
- Last hour
- Last 24 hours
- Last 7 days
- Last 30 days
- Custom range

## Debugging Best Practices

### 1. Enable Logging Early

- Turn on debug mode during development
- Use appropriate log levels
- Log important decisions and data
- Include context in log messages

### 2. Use Descriptive Messages

- Good: "Failed to read file src/Button.tsx: Permission denied"
- Poor: "Error reading file"

### 3. Monitor Performance

- Track execution time
- Monitor token usage
- Watch costs
- Identify bottlenecks

### 4. Handle Errors Gracefully

- Catch exceptions
- Log error details
- Provide recovery options
- Don't crash silently

### 5. Test Debugging Workflows

- Verify debug output is useful
- Test error scenarios
- Check log readability
- Ensure metrics are accurate

## Use Cases

### 1. Development Workflow

**Scenario**: Developing new code reviewer agent

**Debugging Approach**:
1. Enable debug mode
2. Test with sample code
3. Review execution trace
4. Check LLM prompts
5. Verify output quality
6. Optimize based on metrics

### 2. Production Monitoring

**Scenario**: Monitoring deployed agents in production

**Debugging Approach**:
1. Set up monitoring dashboard
2. Configure alerts for errors
3. Track performance metrics
4. Review error logs
5. Analyze trends
6. Optimize proactively

### 3. Troubleshooting Issues

**Scenario**: Agent reported as buggy by user

**Debugging Approach**:
1. Reproduce issue locally
2. Enable detailed logging
3. Capture execution trace
4. Analyze error context
5. Identify root cause
6. Implement fix
7. Verify solution

### 4. Performance Optimization

**Scenario**: Agent running too slowly

**Debugging Approach**:
1. Review performance metrics
2. Identify bottlenecks
3. Analyze token usage
4. Check model choices
5. Optimize workflows
6. Benchmark improvements

## Related Concepts

- **[Agent Types](/conceptbank/features/agent-management/agent-types.md)**: Different agent sources and behaviors
- **[Agent Creation (Code)](/conceptbank/features/agent-management/agent-creation-code.md)**: Building debuggable workflows
- **[Agent Hooks](/conceptbank/features/agent-management/agent-hooks.md)**: Debugging hook execution
- **[Agent SDK](/conceptbank/features/agent-management/agent-sdk.md)**: Tool-specific debugging
