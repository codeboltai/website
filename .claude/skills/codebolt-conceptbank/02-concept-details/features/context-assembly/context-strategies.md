---
title: Context Strategies
category: Context Assembly
status: Active
tags: [strategies, patterns, optimization, approaches]
---

# Context Strategies

## Executive Summary
Context Strategies define different approaches to assembling context based on use case requirements, performance constraints, and quality goals. By selecting the right strategy, developers can optimize for speed, relevance, cost, or completeness depending on their needs.

## What It Is and Why It Matters

**The Challenge**: Different scenarios require different context assembly approaches:
- **Debugging** needs comprehensive error context, speed is secondary
- **Real-time chat** needs fast, relevant context, cost matters
- **Analysis** needs comprehensive context, completeness is key
- **Testing** needs predictable context, consistency is important

**The Solution**: Context Strategies provide pre-configured assembly approaches:
1. **Explicit Strategy**: Direct memory specification
2. **Rule-Based Strategy**: Automatic memory selection
3. **Hybrid Strategy**: Combine explicit and rule-based
4. **Progressive Strategy**: Incremental context loading
5. **Budget-Conscious Strategy**: Optimize for token limits

**Why this matters**:
- **Performance**: Choose strategy based on speed requirements
- **Cost**: Optimize token usage for efficiency
- **Quality**: Balance completeness with relevance
- **Flexibility**: Adapt strategy to use case
- **Predictability**: Consistent behavior across scenarios

## Key Strategies

### 1. Explicit Strategy
**When to use**: Critical contexts where you know exactly what you need

**Characteristics**:
- Direct memory specification
- No rule evaluation
- Predictable results
- Fast execution
- Higher token cost (may include unnecessary data)

**Example**:
```typescript
{
  explicit_memory: [
    "system_state",
    "active_errors",
    "recent_logs"
  ],
  rule_engine_ids: []  // No rules
}
```

**Best for**:
- System diagnostics
- Error recovery
- State inspection
- Testing scenarios

### 2. Rule-Based Strategy
**When to use**: Adaptive contexts based on execution state

**Characteristics**:
- Automatic memory selection
- Condition-based inclusion
- Contextually relevant
- Lower token cost (only relevant data)
- Requires rule maintenance

**Example**:
```typescript
{
  explicit_memory: [],
  rule_engine_ids: [
    "debug_context_rules",
    "error_recovery_rules"
  ]
}
```

**Best for**:
- General agent operation
- Dynamic environments
- Multi-agent scenarios
- Production systems

### 3. Hybrid Strategy
**When to use**: Balance predictability with adaptability

**Characteristics**:
- Critical memories explicit
- Contextual memories rule-based
- Best of both approaches
- Moderate token cost
- Flexible assembly

**Example**:
```typescript
{
  explicit_memory: [
    "system_state",  // Always include
    "active_errors"  // Critical info
  ],
  rule_engine_ids: [
    "contextual_rules"  // Add context-specific memories
  ]
}
```

**Best for**:
- Production agents
- Complex workflows
- Mixed requirements
- Most common use cases

### 4. Progressive Strategy
**When to use**: Large contexts with time constraints

**Characteristics**:
- Start with critical context
- Add more progressively
- Fast initial response
- Better user experience
- Multiple assembly phases

**Example**:
```typescript
// Phase 1: Critical context
{
  explicit_memory: ["system_state", "active_errors"],
  constraints: { max_tokens: 1000 }
}

// Phase 2: Add detail
{
  explicit_memory: ["recent_logs", "stack_traces"],
  constraints: { max_tokens: 2000 }
}

// Phase 3: Full context
{
  rule_engine_ids: ["all_context_rules"],
  constraints: { max_tokens: 4000 }
}
```

**Best for**:
- Interactive agents
- Chat interfaces
- Real-time assistance
- User-facing systems

### 5. Budget-Conscious Strategy
**When to use**: Strict token limits or cost constraints

**Characteristics**:
- Aggressive filtering
- Priority-based inclusion
- May omit useful context
- Lowest token cost
- Requires careful tuning

**Example**:
```typescript
{
  rule_engine_ids: ["high_priority_rules"],
  constraints: {
    max_tokens: 2000,  // Strict budget
    min_priority: "high"  // Only high priority
  }
}
```

**Best for**:
- High-volume operations
- Cost-sensitive applications
- Low-priority tasks
- Batch processing

## Strategy Selection Framework

### By Use Case

| Use Case | Recommended Strategy | Rationale |
|----------|---------------------|-----------|
| Error Recovery | Explicit | Need specific error context |
| General Operation | Rule-Based | Adaptive to situation |
| Production Agent | Hybrid | Balance predictability and adaptability |
| Interactive Chat | Progressive | Fast response, add detail as needed |
| Batch Analysis | Budget-Conscious | Optimize for cost |
| Debugging | Explicit | Comprehensive, predictable |
| Testing | Explicit | Reproducible results |
| Learning | Rule-Based | Explore different contexts |

### By Performance Requirements

| Priority | Strategy | Trade-offs |
|----------|----------|------------|
| Speed | Explicit | Skip rule evaluation |
| Relevance | Rule-Based | Automatic context selection |
| Cost | Budget-Conscious | Minimize token usage |
| Completeness | Hybrid | Ensure critical + add contextual |
| Predictability | Explicit | Same results every time |
| Adaptability | Rule-Based | Context changes with situation |

### By Token Budget

| Budget | Strategy | Considerations |
|--------|----------|----------------|
| < 1K tokens | Explicit, high-priority only | May miss important context |
| 1-2K tokens | Hybrid, priority-filtered | Balance coverage and cost |
| 2-4K tokens | Rule-based | Good coverage for most cases |
| 4-8K tokens | Hybrid, comprehensive | Near-complete coverage |
| > 8K tokens | Explicit or Progressive | Maximum completeness |

## Strategy Patterns

### Critical-First Pattern
Start with critical memories, add detail progressively:

```typescript
// Critical (always included)
const critical = ["system_state", "active_errors"];

// Important (most scenarios)
const important = ["recent_logs", "config"];

// Useful (some scenarios)
const useful = ["historical_data", "related_docs"];

// Progressive assembly
const phase1 = assembleContext(critical);
const phase2 = assembleContext([...critical, ...important]);
const phase3 = assembleContext([...critical, ...important, ...useful]);
```

### Priority-Based Pattern
Use priorities to optimize within budget:

```typescript
// Define priority levels
const priorities = {
  critical: { memories: ["system_state"], must_have: true },
  high: { memories: ["active_errors", "recent_logs"] },
  medium: { memories: ["config", "stack_traces"] },
  low: { memories: ["historical_data"] }
};

// Assemble by priority
function assembleWithBudget(budget) {
  let context = [];
  let used = 0;

  for (const [level, data] of Object.entries(priorities)) {
    if (data.must_have || used < budget) {
      const items = assembleMemories(data.memories);
      if (used + items.tokens <= budget) {
        context.push(...items);
        used += items.tokens;
      }
    }
  }

  return context;
}
```

### Query-Driven Pattern
Select strategy based on query analysis:

```typescript
function selectStrategy(query) {
  // Detect query intent
  const intent = analyzeQuery(query);

  // Select strategy
  switch (intent.type) {
    case 'error':
      return { strategy: 'explicit', memories: ['error_logs', 'stack_traces'] };
    case 'debug':
      return { strategy: 'rule-based', engines: ['debug_rules'] };
    case 'general':
      return { strategy: 'hybrid', memories: ['state'], engines: ['context_rules'] };
    case 'chat':
      return { strategy: 'progressive', phases: 3 };
    default:
      return { strategy: 'rule-based', engines: ['default_rules'] };
  }
}
```

### Adaptive Pattern
Adjust strategy based on performance:

```typescript
function adaptiveStrategy(previousResults) {
  // Analyze previous performance
  const avgTokens = average(previousResults.map(r => r.tokens));
  const avgRelevance = average(previousResults.map(r => r.relevance));

  // Adjust strategy
  if (avgTokens > BUDGET) {
    // Reduce context
    return { strategy: 'budget-conscious', budget: BUDGET * 0.8 };
  } else if (avgRelevance < THRESHOLD) {
    // Improve relevance
    return { strategy: 'rule-based', engines: ['high_relevance_rules'] };
  } else {
    // Keep current strategy
    return { strategy: 'hybrid' };
  }
}
```

## Best Practices

### Strategy Selection
- **Start Simple**: Begin with rule-based strategy
- **Measure**: Track token usage and relevance
- **Iterate**: Adjust based on performance
- **Document**: Record why strategy was chosen
- **Review**: Re-evaluate strategy periodically

### Implementation Tips
- **Test Thoroughly**: Validate strategy with sample data
- **Monitor Performance**: Track metrics over time
- **Handle Errors**: Graceful degradation on failures
- **Cache Results**: Cache frequent assemblies
- **Set Timeouts**: Prevent runaway assemblies

### Common Pitfalls
- **Over-Engineering**: Complex strategies may not be worth it
- **Premature Optimization**: Measure before optimizing
- **Ignoring Context**: Strategy depends on use case
- **Forgetting Maintenance**: Rules and strategies need updates
- **One-Size-Fits-All**: Different scenarios need different strategies

## Performance Comparison

| Strategy | Speed | Token Efficiency | Relevance | Maintenance |
|----------|-------|------------------|-----------|-------------|
| Explicit | Fast | Low | High | Low |
| Rule-Based | Medium | High | Medium | High |
| Hybrid | Medium | Medium | High | Medium |
| Progressive | Fast* | Medium | Medium** | Medium |
| Budget-Conscious | Medium | High | Low | Medium |

*Initial response fast, full assembly slower
**Improves with each phase

## Metrics and Monitoring

### Key Metrics
- **Assembly Time**: How long assembly takes
- **Token Count**: Tokens in assembled context
- **Relevance Score**: Average relevance of items
- **Cache Hit Rate**: Percentage of cached results
- **Strategy Usage**: Which strategies are used most

### Optimization Targets
- **Reduce Assembly Time**: Faster responses
- **Minimize Token Usage**: Lower costs
- **Improve Relevance**: Better context quality
- **Increase Cache Hits**: Better performance
- **Balance Trade-offs**: Optimize overall system

## Related Concepts

- **[Context Assembly](./context-assembly.md)**: Assembly process
- **[Rule Engine](./rule-engine.md)**: Dynamic memory selection
- **[Context Viewer](./context-viewer.md)**: Visualizing results
- **[Infinite Context](../memory-systems/infinite-context.md)**: Context management
- **[Memory Integration](../memory-systems/memory-integration.md)**: Combining memories

## Technical Implementation

**Strategy Selection:** Application logic
**Request Building:** `AssemblyRequestBuilder.tsx`
**Assembly Execution:** `contextAssemblyService.ts`
**Configuration:** Rule engines and constraints

**Key Components:**
- Strategy selection logic
- Request builders
- Constraint management
- Performance monitoring
- Caching layer
