---
title: AI Debug
category: Additional Features
related:
  - agent-management/agents.md
  - observability/monitoring.md
  - development-tools/code-editor.md
---

# AI Debug

## Executive Summary
AI Debug is a comprehensive debugging interface that provides real-time visibility into AI agent operations, LLM requests, and token usage. It captures, displays, and analyzes all AI interactions with detailed request/response data, cost tracking, and error diagnostics.

## What It Is and Why It Matters

AI Debug provides:

- **Real-Time Monitoring**: Live WebSocket connection to debug server
- **Request/Response Inspection**: Full visibility into AI agent communications
- **Token Usage Tracking**: Detailed token counting and cost analysis
- **Error Diagnostics**: Comprehensive error information and troubleshooting

This feature is essential for:
- **Development**: Debug AI agent behavior and responses
- **Cost Optimization**: Monitor and control LLM API costs
- **Performance Tuning**: Identify bottlenecks in AI operations
- **Troubleshooting**: Diagnose and resolve AI-related issues

## Key Capabilities

### Real-Time Monitoring

#### WebSocket Integration
- **Live Connection**: Persistent WebSocket to debug server
- **Thread Filtering**: View messages by conversation thread
- **Request Tracking**: Follow specific request IDs
- **Auto-Refresh**: Automatic history loading and updates

#### Message Grouping
- **Agent Messages**: Outgoing requests to AI agents
- **AI Responses**: Incoming responses from LLM providers
- **Error Handling**: Captured failures and exceptions
- **Orphan Detection**: Unmatched responses and requests

### Detailed Inspection

#### Request Analysis
- **Full Payload**: Complete request data inspection
- **Model Information**: LLM model and version details
- **Provider Tracking**: Which provider handled the request
- **Timestamp**: Precise timing of each interaction

#### Response Analysis
- **Completion Data**: Full response content
- **Usage Metrics**: Token counts for input/output
- **Cached Tokens**: Breakdown of cached vs. new tokens
- **Pricing**: Cost calculation for each request

#### Error Diagnostics
- **Error Types**: Classification of error categories
- **Error Messages**: Detailed error descriptions
- **Parameters**: Request parameters that caused errors
- **Error Codes**: Provider-specific error codes

### Token and Cost Tracking

#### Token Metrics
- **Input Tokens**: Prompt token counts
- **Output Tokens**: Completion token counts
- **Cached Tokens**: Context caching utilization
- **Total Tokens**: Aggregate usage across session

#### Cost Analysis
- **Input Cost**: Cost for prompt tokens
- **Output Cost**: Cost for completion tokens
- **Total Cost**: Combined cost per request
- **Session Cost**: Running total for thread

#### Model Information
- **Provider Identification**: OpenAI, Anthropic, etc.
- **Model Name**: Specific model used (GPT-4, Claude, etc.)
- **Pricing Tier**: Model cost category
- **Performance**: Response time metrics

## How It Works Conceptually

### Data Flow Architecture

```
┌─────────────────────────────────────────┐
│         AI Agent / Code                 │
│  (Makes LLM request)                    │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│         Debug WebSocket Server          │
│  (Captures all AI traffic)              │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      AI Debug Panel                     │
│  • Real-time message stream             │
│  • Token counting                       │
│  • Cost calculation                     │
│  • Error capture                        │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      Message Display                    │
│  • Grouped request/response pairs       │
│  • Collapsible detail views             │
│  • JSON inspection                      │
│  • Error diagnostics                    │
└─────────────────────────────────────────┘
```

### Message Processing

1. **Capture Phase**
   - Intercept all LLM requests and responses
   - Extract metadata (model, provider, tokens)
   - Calculate costs based on pricing
   - Detect and categorize errors

2. **Grouping Phase**
   - Match agent messages with AI responses
   - Identify orphaned messages
   - Group by request ID
   - Preserve chronological order

3. **Display Phase**
   - Render grouped messages
   - Apply collapsible formatting
   - Enable interactive inspection
   - Update token and cost totals

### View Modes

#### Accordion Mode
- Collapsible message groups
- Inline detail expansion
- Compact vertical layout
- Sequential scrolling

#### Side Panel Mode
- Split view with details panel
- Message list on left
- Detail inspection on right
- Resizable panel widths

## Use Cases

### 1. Debugging Agent Responses
**Scenario**: Agent giving incorrect or unexpected answers

**Workflow**:
1. Open AI Debug for relevant thread
2. Locate the problematic request
3. Inspect full request payload
4. Review response content
5. Identify prompt or context issues
6. Adjust agent configuration or prompts

### 2. Cost Optimization
**Scenario**: Reducing LLM API expenses

**Workflow**:
1. Monitor token usage in AI Debug
2. Identify high-cost requests
3. Analyze token breakdown (input vs. output)
4. Look for caching opportunities
5. Optimize prompts and context
6. Track cost reduction over time

### 3. Performance Debugging
**Scenario**: Slow AI response times

**Workflow**:
1. Check timestamps for slow requests
2. Identify which provider/model is slow
3. Review request complexity
4. Check for rate limiting
5. Consider model alternatives
6. Implement caching strategies

### 4. Error Resolution
**Scenario**: Frequent AI request failures

**Workflow**:
1. Filter for error messages in debug view
2. Review error types and messages
3. Identify common error patterns
4. Check parameters causing failures
5. Implement error handling
6. Add retry logic where appropriate

## Message Structure

### Agent Message
```json
{
  "type": "agentMessage",
  "timestamp": "2024-01-18T10:00:00Z",
  "requestId": "claude-12345",
  "message": {
    "model": "claude-3-opus",
    "messages": [...],
    "maxTokens": 4096,
    "temperature": 0.7
  }
}
```

### AI Response
```json
{
  "type": "aiResponse",
  "timestamp": "2024-01-18T10:00:02Z",
  "requestId": "claude-12345",
  "model": "claude-3-opus",
  "provider": "anthropic",
  "message": {
    "usage": {
      "prompt_tokens": 1000,
      "completion_tokens": 500,
      "total_tokens": 1500
    }
  },
  "pricing": {
    "inputCost": 0.003,
    "outputCost": 0.015,
    "totalCost": 0.018
  }
}
```

### Error Response
```json
{
  "type": "aiResponse",
  "message": {
    "error": {
      "type": "invalid_request_error",
      "message": "Invalid API key",
      "param": "authorization",
      "code": "invalid_api_key"
    }
  },
  "provider": "openai",
  "status": "error"
}
```

## Integration Points

### With Agent Management
- Monitor specific agent performance
- Compare agent token usage
- Debug agent behavior issues
- Track agent-specific costs

### With Code Editor
- Navigate from debug to code
- Inspect code making requests
- Debug prompts in context
- View agent implementations

### With Observability
- Correlate with system metrics
- Cross-reference error logs
- Performance analysis
- Resource utilization tracking

## Best Practices

### Debugging Workflow
- **Start Broad**: Begin with high-level message overview
- **Filter Down**: Use thread and request ID filters
- **Inspect Details**: Expand relevant messages
- **Cross-Reference**: Check code and configuration
- **Document Findings**: Note patterns and solutions

### Cost Monitoring
- **Regular Reviews**: Check costs weekly or per sprint
- **Set Thresholds**: Alert on high-cost operations
- **Optimize Prompts**: Reduce token usage where possible
- **Use Caching**: Leverage context caching
- **Model Selection**: Choose appropriate models

### Error Handling
- **Monitor Patterns**: Track recurring errors
- **Implement Retries**: Add retry logic for transient errors
- **Validate Inputs**: Check parameters before requests
- **Handle Timeouts**: Set appropriate timeouts
- **Log Context**: Capture request context for debugging

## Advanced Features

### Token Cost Details
- **Input Token Breakdown**: Regular vs. cached tokens
- **Output Token Breakdown**: Reasoning vs. regular tokens
- **Provider Pricing**: Current pricing per model
- **Cost Projection**: Estimate future costs

### Message Search
- **Content Search**: Find messages by content
- **Model Filter**: View by model used
- **Provider Filter**: View by provider
- **Date Range**: Filter by time period

### Export and Analysis
- **Export History**: Download debug data
- **Cost Reports**: Generate cost summaries
- **Usage Analytics**: Token usage trends
- **Performance Metrics**: Response time analysis

## Related Concepts

- **[Agents](agent-management/agents.md)**: AI agents being debugged
- **[Observability](observability/monitoring.md)**: System-wide monitoring
- **[Code Editor](development-tools/code-editor.md)**: Code inspection and navigation
- **[LLM Providers](integrations/llm-providers.md)**: Provider configuration and management
