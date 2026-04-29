---
id: "context-assembly"
title: Context Assembly
category: Context Assembly
status: Active
tags: [context, retrieval, memory, orchestration]
---

# Context Assembly

## Executive Summary
Context Assembly is the orchestration layer that dynamically retrieves, combines, and prioritizes relevant information from multiple memory systems. It transforms scattered data sources into coherent, contextually relevant packages that enable agents to make informed decisions without overwhelming context windows.

## What It Is and Why It Matters

**The Challenge**: Modern AI systems have access to vast amounts of persistent memory, but LLMs can only process limited context at once. Naive approaches either miss critical information or exceed token limits with irrelevant data.

**The Solution**: Context Assembly intelligently:
1. **Selects** which memories to retrieve based on context
2. **Prioritizes** information by relevance and importance
3. **Combines** multiple memory types into coherent sections
4. **Optimizes** for token budgets without losing critical data
5. **Traces** decisions for debugging and optimization

**Why this matters**:
- **Intelligent Retrieval**: Get the right information, not just more information
- **Cost Efficiency**: Reduce token usage by retrieving only what's relevant
- **Better Decisions**: Agents access comprehensive, contextually appropriate information
- **Scalability**: Handle unlimited memory with fixed context windows
- **Transparency**: Full traceability of how context was assembled

## Key Capabilities

### Dynamic Memory Selection
- **Explicit Inclusion**: Directly specify required memory types
- **Rule-Based Selection**: Automatically include memories based on conditions
- **Multi-Engine Support**: Apply multiple rule engines simultaneously
- **Priority Ordering**: Respect memory priority levels (critical, high, medium, low)
- **Scope Awareness**: Select memories based on execution context

### Intelligent Retrieval
- **Parallel Execution**: Query multiple memory types concurrently
- **Pipeline Integration**: Reuse memory pipelines for consistent processing
- **Variable Resolution**: Inject context variables into queries
- **Relevance Scoring**: Rank results by semantic similarity and relevance
- **Deduplication**: Remove redundant information across sources

### Context Organization
- **Section-Based Structure**: Group related information (state, knowledge, history, etc.)
- **Contribution Rules**: Define how memories contribute to context
- **Priority Enforcement**: Ensure critical information appears first
- **Format Control**: Specify output format (bullet list, paragraph, code, etc.)
- **Token Budgeting**: Respect context window limits

### Real-Time Assembly
- **WebSocket Updates**: Progress tracking during assembly
- **Incremental Results**: Stream context as it becomes available
- **Error Handling**: Graceful degradation when memories fail
- **Performance Metrics**: Track assembly time and token counts

### Full Observability
- **Assembly Traces**: Complete record of decisions made
- **Rule Evaluation**: See which rules matched and why
- **Memory Calls**: Track which memories were queried
- **Variable Usage**: Verify all required variables were provided
- **Missing Data**: Identify gaps in available information

## How It Works Conceptually

### The Assembly Pipeline

```
1. Request Validation
   ↓
   - Validate scope variables
   - Check memory types exist
   - Verify rule engines
   - Check required variables

2. Memory Resolution
   ↓
   - Add explicit memories
   - Evaluate rule engines
   - Match conditions against variables
   - Collect all matched memories

3. Variable Validation
   ↓
   - Check memory requirements
   - Validate required variables present
   - Report missing variables

4. Pipeline Execution
   ↓
   - Execute memory pipelines in parallel
   - Inject context variables
   - Apply retrieval strategies
   - Collect results with scores

5. Result Merging
   ↓
   - Deduplicate across sources
   - Merge by semantic similarity
   - Preserve source provenance

6. Contribution Rules
   ↓
   - Group by section
   - Sort by priority within sections
   - Apply format transformations
   - Order sections by importance

7. Budget Enforcement
   ↓
   - Calculate token estimates
   - Enforce max token limits
   - Truncate low-priority items
   - Mark if truncated

8. Context Assembly
   ↓
   - Build final context object
   - Generate complete trace
   - Calculate metadata
   - Return assembled context
```

### Section Ordering and Priority

Sections are ordered by importance:
- **state** (critical): Current system state
- **warnings** (critical): Active warnings and errors
- **constraints** (high): Active constraints and limitations
- **knowledge** (high): Retrieved knowledge and documentation
- **history** (medium): Historical context and events
- **suggestions** (medium): Action suggestions and recommendations
- **working_memory** (low): Current conversation context

Within sections, items are ordered by priority weight:
- **critical** (4): System-critical information
- **high** (3): Important but not critical
- **medium** (2): Standard priority
- **low** (1): Optional information

## Use Cases

### Debugging Failures
Assemble comprehensive debugging context with error logs, stack traces, recent changes, related bugs, and fix history.

### Project Onboarding
Provide context for new agents including project overview, architecture, coding standards, and recent changes.

### Cross-Agent Coordination
Share context between agents including shared state, active tasks, coordination messages, and deployment status.

### Continuous Learning
Maintain context across sessions including previous session context, learning progress, recommendations, and next steps.

## Best Practices

### Rule Design
- Keep rules simple and focused
- Use specific conditions for better matching
- Set appropriate priorities
- Document rule intent
- Test rules with sample data

### Memory Selection
- Start with explicit memories for critical data
- Use rules for contextual inclusion
- Avoid over-fetching (reduces performance)
- Consider token costs
- Validate memory requirements

### Context Organization
- Group related information in sections
- Use priorities for ordering
- Specify appropriate formats
- Consider downstream consumers
- Maintain consistency

## Related Concepts

- **[Rule Engine](./rule-engine.md)**: Dynamic memory inclusion
- **[Context Viewer](./context-viewer.md)**: Visualizing assembled context
- **[Context Strategies](./context-strategies.md)**: Assembly approaches
- **[Infinite Context](../memory-systems/infinite-context.md)**: Solving context limits
- **[Memory Integration](../memory-systems/memory-integration.md)**: Combining memory types
- **[Persistent Memory](../memory-systems/memory-architecture.md)**: Memory type system

## Technical Implementation

**Core Service:** `contextAssemblyService.ts`
**Rule Engine:** `contextRuleEngineService.ts`
**UI Components:** `ContextAssemblyPanel/`
**Type Definitions:** `contextAssembly.ts`
