---
id: context-assembly-features
title: Context Assembly Features
category: features
subcategory: context-assembly
tags: ["readme", "overview", "context", "orchestration", "memory-systems", "rule-engine"]
audience: ["technical", "business", "user"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-systems", "infinite-context"]
content_type: "overview"
status: "published"
---

# Context Assembly Features

This directory contains conceptual documentation for CodeBolt's Context Assembly system, which enables dynamic, intelligent retrieval and combination of information from multiple memory systems.

## Overview

Context Assembly is the orchestration layer that transforms scattered memory systems into coherent, contextually relevant packages for AI agents. It solves the fundamental challenge of providing agents with the right information at the right time without overwhelming context windows.

## Core Concepts

### [Context Assembly](./context-assembly.md)
The orchestration engine that dynamically retrieves, combines, and prioritizes relevant information from multiple memory systems. Learn how context is assembled from multiple sources with intelligent selection and prioritization.

### [Rule Engine](./rule-engine.md)
Declarative, condition-based memory inclusion system. Understand how to define rules that automatically select relevant memories based on execution context and conditions.

### [Context Viewer](./context-viewer.md)
Visualization and inspection tools for assembled context. See how to debug, optimize, and understand what information was retrieved and why.

### [Context Strategies](./context-strategies.md)
Different approaches to assembling context based on use case requirements. Learn when to use explicit, rule-based, hybrid, progressive, or budget-conscious strategies.

## How It Works

```
1. Request Building
   ↓
   - Define scope variables
   - Select rule engines or explicit memories
   - Set constraints and budgets

2. Rule Evaluation
   ↓
   - Match conditions against variables
   - Collect memories from matched rules
   - Add explicitly specified memories

3. Memory Retrieval
   ↓
   - Execute pipelines in parallel
   - Inject context variables
   - Apply retrieval strategies
   - Score and rank results

4. Context Assembly
   ↓
   - Merge and deduplicate results
   - Apply contribution rules
   - Enforce token budgets
   - Organize into sections

5. Result Delivery
   ↓
   - Return assembled context
   - Provide execution trace
   - Support real-time updates
```

## Key Capabilities

- **Dynamic Memory Selection**: Automatic memory inclusion based on rules
- **Intelligent Retrieval**: Parallel execution with relevance scoring
- **Context Organization**: Section-based structure with priority ordering
- **Token Budgeting**: Respect context window limits intelligently
- **Full Observability**: Complete traces for debugging and optimization

## Use Cases

### Debugging Failures
Assemble comprehensive debugging context with error logs, stack traces, recent changes, and fix history.

### Project Onboarding
Provide context for new agents including project overview, architecture, and coding standards.

### Cross-Agent Coordination
Share context between agents including shared state, active tasks, and coordination messages.

### Continuous Learning
Maintain context across sessions including previous context, learning progress, and recommendations.

## Related Systems

- **[Memory Systems](../memory-systems/)**: Persistent storage and retrieval
- **[Infinite Context](../memory-systems/infinite-context.md)**: Solving context window limits
- **[Memory Integration](../memory-systems/memory-integration.md)**: Combining memory types
- **[Persistent Memory](../memory-systems/memory-architecture.md)**: Memory type system

## Technical Implementation

**Core Services:**
- `contextAssemblyService.ts`: Main assembly orchestration
- `contextRuleEngineService.ts`: Rule evaluation logic
- `contextRuleEngineDataService.ts`: Rule persistence

**UI Components:**
- `ContextAssemblyPanel/`: Main UI panel
- `AssemblyRequestBuilder.tsx`: Request building UI
- `AssembledContextViewer.tsx`: Result visualization
- `RuleEngineBuilder.tsx`: Rule creation UI
- `RuleEngineViewer.tsx`: Rule inspection UI

**Type Definitions:**
- `contextAssembly.ts`: Assembly types
- `contextRuleEngine.ts`: Rule engine types

## Getting Started

1. **Understand the Basics**: Read [Context Assembly](./context-assembly.md)
2. **Define Rules**: Learn about [Rule Engine](./rule-engine.md)
3. **Build Requests**: Use [Context Strategies](./context-strategies.md)
4. **Inspect Results**: Use [Context Viewer](./context-viewer.md)

## Best Practices

1. **Start Simple**: Begin with rule-based strategy
2. **Measure Performance**: Track tokens and relevance
3. **Iterate Rules**: Adjust based on actual usage
4. **Use Hybrid Approach**: Combine explicit and rule-based
5. **Monitor Traces**: Debug using context viewer

## Metrics to Track

- **Assembly Time**: How long assembly takes
- **Token Count**: Tokens in assembled context
- **Relevance Score**: Average relevance of items
- **Rule Match Rate**: How often rules fire
- **Cache Hit Rate**: Percentage of cached results
