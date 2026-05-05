---
id: "rule-engine"
title: Rule Engine
category: Context Assembly
status: Active
tags: [rules, automation, context, conditions]
---

# Rule Engine

## Executive Summary
The Rule Engine enables declarative, condition-based memory inclusion in context assembly. By defining rules that evaluate scope variables and conditions, the system automatically selects relevant memories without manual specification, making context assembly adaptive and intelligent.

## What It Is and Why It Matters

**The Challenge**: Manually specifying which memories to include for every context assembly request is tedious, error-prone, and doesn't scale. Different situations require different context, and hard-coding memory selection logic is inflexible.

**The Solution**: Rule Engine provides a declarative way to define when certain memories should be included:
1. **Declare Conditions**: Specify when memories are relevant
2. **Automatic Evaluation**: Rules are evaluated against current context
3. **Dynamic Selection**: Memories are included based on runtime conditions
4. **Composability**: Multiple rules can work together
5. **Priority Control**: Rules fire in priority order

**Why this matters**:
- **Adaptive Context**: Context automatically adjusts to situation
- **Maintainability**: Rules are easier to understand than code
- **Reusability**: Rules can be shared across projects
- **Flexibility**: Easy to adjust context behavior
- **Transparency**: Clear visibility into why memories were included

## Key Capabilities

### Condition Operators
- **exists**: Field exists and is not null/undefined
- **not_exists**: Field does not exist or is null/undefined
- **eq**: Equals (exact match)
- **neq**: Not equals
- **in**: Value is in array
- **not_in**: Value is not in array
- **contains**: String/array contains value
- **starts_with**: String starts with value
- **ends_with**: String ends with value
- **gt/gte**: Greater than/greater than or equal (numbers)
- **lt/lte**: Less than/less than or equal (numbers)

### Field Sources
- **scope.\*.\***: Variables from execution scopes (swarm, project, agent, task, etc.)
- **addVar.\***: Additional user-defined variables
- **input.\***: Input data (e.g., search query)

### Rule Composition
- **AND Logic**: All conditions in a rule must match
- **OR Logic**: Multiple rules can achieve same outcome
- **Priority Ordering**: Rules fire in priority order
- **Memory Addition**: Matched rules add specified memories
- **Enable/Disable**: Rules can be toggled on/off

### Rule Engine Management
- **CRUD Operations**: Create, read, update, delete rule engines
- **Version Tracking**: Track changes over time
- **Enable/Disable**: Toggle entire engines on/off
- **Validation**: Check rule syntax and validity
- **Testing**: Evaluate rules without executing pipelines

## How It Works Conceptually

### Rule Structure

```typescript
{
  id: "debug_context_rule",
  name: "Include Debug Context",
  description: "When debugging, include error logs and traces",
  
  // All conditions must match (AND)
  when: [
    {
      field: "addVar.phase",
      operator: "eq",
      value: "debugging"
    },
    {
      field: "scope.agent.agent_type",
      operator: "contains",
      value: "debugger"
    }
  ],
  
  // Memories to include when rule matches
  add: [
    "error_logs",
    "stack_traces",
    "debug_history"
  ],
  
  // Higher priority fires first
  priority: 10,
  
  // Can be disabled without deleting
  enabled: true
}
```

### Rule Engine Structure

```typescript
{
  id: "debug_context_engine",
  name: "Debug Context Rules",
  description: "Rules for assembling debugging context",
  version: "1.0.0",
  
  // Multiple rules in one engine
  rules: [
    {
      id: "debug_context",
      when: [
        { field: "addVar.phase", operator: "eq", value: "debugging" }
      ],
      add: ["error_logs", "debug_history"],
      priority: 10
    },
    {
      id: "error_recovery",
      when: [
        { field: "scope.task.task_type", operator: "eq", value: "error_recovery" }
      ],
      add: ["error_patterns", "fix_history"],
      priority: 5
    }
  ],
  
  enabled: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### Evaluation Flow

```
1. Load Rule Engines
   ↓
   - Load all enabled engines
   - Or load specific engines by ID
   - Sort engines by priority

2. Build Variable Lookup
   ↓
   - Flatten scope_variables
   - Add additional_variables
   - Add input variables
   - Create lookup table

3. Evaluate Rules
   ↓
   - For each engine (in priority order)
   - For each rule (in priority order)
   - Check if all conditions match
   - If match: add memories to result

4. Collect Results
   ↓
   - Gather all matched memories
   - Remove duplicates
   - Return memory list with traces
```

### Condition Evaluation Examples

```typescript
// Example 1: Check execution phase
{
  field: "addVar.phase",
  operator: "eq",
  value: "debugging"
}
// Matches: { addVar: { phase: "debugging" } }
// Doesn't match: { addVar: { phase: "execution" } }

// Example 2: Check agent type
{
  field: "scope.agent.agent_type",
  operator: "contains",
  value: "debug"
}
// Matches: { scope: { agent: { agent_type: "error_debugger" } } }
// Matches: { scope: { agent: { agent_type: "debugger" } } }
// Doesn't match: { scope: { agent: { agent_type: "executor" } } }

// Example 3: Check project exists
{
  field: "scope.project.project_id",
  operator: "exists"
}
// Matches: { scope: { project: { project_id: "my-app" } } }
// Doesn't match: { scope: { project: {} } }
// Doesn't match: { scope: {} }

// Example 4: Check task type in list
{
  field: "scope.task.task_type",
  operator: "in",
  value: ["error_recovery", "debugging", "testing"]
}
// Matches: { scope: { task: { task_type: "error_recovery" } } }
// Doesn't match: { scope: { task: { task_type: "execution" } } }
```

## Use Cases

### Debugging Context
Include error-related memories when debugging:

```typescript
{
  when: [
    { field: "addVar.phase", operator: "eq", value: "debugging" }
  ],
  add: ["error_logs", "stack_traces", "debug_history"]
}
```

### Error Recovery
Include fix patterns when recovering from errors:

```typescript
{
  when: [
    { field: "scope.task.task_type", operator: "eq", value: "error_recovery" }
  ],
  add: ["error_patterns", "fix_history", "related_bugs"]
}
```

### Project-Specific Context
Include project docs when working on a project:

```typescript
{
  when: [
    { field: "scope.project.project_id", operator: "exists" }
  ],
  add: ["project_readme", "architecture_docs", "api_reference"]
}
```

### Agent Type Context
Include different memories based on agent type:

```typescript
// For developer agents
{
  when: [
    { field: "scope.agent.agent_type", operator: "eq", value: "developer" }
  ],
  add: ["coding_standards", "design_patterns", "code_examples"]
}

// For tester agents
{
  when: [
    { field: "scope.agent.agent_type", operator: "eq", value: "tester" }
  ],
  add: ["test_strategies", "test_cases", "bug_reports"]
}
```

### Swarm Coordination
Include coordination context in swarms:

```typescript
{
  when: [
    { field: "scope.swarm.swarm_id", operator: "exists" }
  ],
  add: ["swarm_state", "agent_roles", "coordination_rules"]
}
```

### Query-Based Context
Include relevant docs based on search query:

```typescript
{
  when: [
    { field: "input.text", operator: "contains", value: "authentication" }
  ],
  add: ["auth_docs", "security_policies", "oauth_guide"]
}
```

## Best Practices

### Rule Design
- **Keep Focused**: Each rule should have one clear purpose
- **Be Specific**: Use specific conditions for better matching
- **Set Priorities**: Higher priority rules fire first
- **Document Intent**: Use clear names and descriptions
- **Test Thoroughly**: Validate rules with sample data

### Condition Selection
- **Use exists** for checking presence
- **Use eq** for exact matches
- **Use contains** for partial matches
- **Use in** for multiple valid values
- **Combine Conditions**: Use AND logic within rules

### Memory Selection
- **Group Related Memories**: Add coherent memory sets
- **Avoid Overlap**: Minimize duplicate memories across rules
- **Consider Cost**: More memories = more processing
- **Validate Requirements**: Ensure memories exist

### Engine Organization
- **Theme-Based**: Group related rules in engines
- **Priority Layers**: Use multiple engines for priority tiers
- **Enable/Disable**: Toggle engines for different scenarios
- **Version Control**: Track engine changes

## Advanced Patterns

### Fallback Rules
Provide default context:

```typescript
// High priority: specific context
{
  when: [
    { field: "scope.task.task_type", operator: "eq", value: "debugging" }
  ],
  add: ["debug_context"],
  priority: 10
}

// Low priority: fallback context
{
  when: [],  // Always matches
  add: ["general_context"],
  priority: 1
}
```

### Composite Conditions
Combine multiple conditions:

```typescript
{
  when: [
    { field: "addVar.phase", operator: "eq", value: "debugging" },
    { field: "scope.agent.agent_type", operator: "contains", value: "debug" },
    { field: "scope.project.project_id", operator: "exists" }
  ],
  add: ["project_debug_context"]
}
```

### Negative Conditions
Exclude certain scenarios:

```typescript
{
  when: [
    { field: "addVar.phase", operator: "not_exists" }  // No phase set
  ],
  add: ["startup_context"]
}
```

### Numeric Conditions
Range-based matching:

```typescript
{
  when: [
    { field: "addVar.retry_count", operator: "gte", value: 3 }
  ],
  add: ["escalation_policies", "advanced_troubleshooting"]
}
```

## Metrics and Monitoring

### Rule Effectiveness
- **Match Rate**: How often rules fire
- **Memory Usage**: Which memories are most frequently added
- **False Positives**: Rules that fire when they shouldn't
- **False Negatives**: Rules that don't fire when they should

### Performance
- **Evaluation Time**: Time to evaluate rules
- **Engine Size**: Number of rules per engine
- **Condition Complexity**: Number of conditions per rule
- **Priority Efficiency**: Effectiveness of priority ordering

## Related Concepts

- **[Context Assembly](./context-assembly.md)**: Overall orchestration
- **[Context Viewer](./context-viewer.md)**: Visualizing rule results
- **[Context Strategies](./context-strategies.md)**: Assembly approaches
- **[Infinite Context](../memory-systems/infinite-context.md)**: Solving context limits
- **[Persistent Memory](../memory-systems/memory-architecture.md)**: Memory types

## Technical Implementation

**Service:** `contextRuleEngineService.ts`
**Data Service:** `contextRuleEngineDataService.ts`
**UI Components:** `RuleEngineBuilder.tsx`, `RuleEngineViewer.tsx`
**Type Definitions:** `contextRuleEngine.ts`

**Key Operations:**
- `evaluateRules()`: Evaluate rules against variables
- `evaluateRuleEngine()`: Evaluate all rules in an engine
- `buildVariableLookup()`: Create variable lookup table
- `extractPossibleVariables()`: Get variables used in rules
- `validateRequiredVariables()`: Check memory requirements
