---
title: Context Viewer
category: Context Assembly
status: Active
tags: [visualization, debugging, inspection, tracing]
---

# Context Viewer

## Executive Summary
The Context Viewer provides comprehensive visualization and inspection of assembled context, enabling developers to understand exactly what information was retrieved, why it was included, and how it was prioritized. This transparency is essential for debugging, optimization, and understanding system behavior.

## What It Is and Why It Matters

**The Challenge**: When context assembly retrieves information from multiple sources using complex rules, it's difficult to understand:
- What information was included?
- Why was it included?
- What was the relevance score?
- Were any rules matched?
- Was anything truncated due to token limits?

**The Solution**: Context Viewer provides multiple views:
1. **Context View**: See the assembled context grouped by sections
2. **Trace View**: Understand decisions and rule matches
3. **Raw View**: Inspect the complete data structure
4. **Real-Time Updates**: Watch assembly progress via WebSocket

**Why this matters**:
- **Debugging**: Understand why context is missing or incorrect
- **Optimization**: Identify low-relevance items to exclude
- **Trust**: Verify system is making good decisions
- **Learning**: Understand how rules affect assembly
- **Quality Assurance**: Ensure context meets requirements

## Key Capabilities

### Multiple View Modes
- **Context Tab**: Assembled context organized by sections
- **Trace Tab**: Complete execution trace with rule matches
- **Raw Tab**: JSON representation of full response

### Context Visualization
- **Section Grouping**: View context by section (state, knowledge, history, etc.)
- **Expandable Sections**: Drill down into specific sections
- **Item Details**: See content, score, and source for each item
- **Color Coding**: Visual distinction between sections
- **Item Counts**: Quick overview of items per section

### Trace Inspection
- **Memory Calls**: See which memories were queried and why
- **Rule Evaluation**: View which rules matched and why
- **Condition Results**: See individual condition match results
- **Variables Used**: Verify which variables were accessed
- **Missing Variables**: Identify gaps in provided data

### Metadata Display
- **Token Estimate**: Total tokens in assembled context
- **Item Count**: Number of items included
- **Duration**: Assembly time in milliseconds
- **Truncation Flag**: Warning if context was truncated

### Real-Time Progress
- **WebSocket Updates**: Live progress during assembly
- **Pipeline Completion**: Track individual memory retrievals
- **Rule Matching**: See rules as they're evaluated
- **Error Messages**: Real-time error reporting

## How It Works Conceptually

### View Modes

#### Context View
Shows the final assembled context organized by sections:

```
┌─────────────────────────────────────┐
│ State (2 items)                     │
│ ┌─ Project State                    │
│ │ Status: active                    │
│ │ Phase: execution                  │
│ └─ Agent State                      │
│    Status: running                  │
├─────────────────────────────────────┤
│ Knowledge (5 items)                 │
│ ┌─ Architecture Docs (score: 0.94)  │
│ │ Microservices pattern...          │
│ └─ API Reference (score: 0.89)      │
│    REST endpoints...                │
├─────────────────────────────────────┤
│ History (3 items)                   │
│ └─ Recent Events...                 │
└─────────────────────────────────────┘
```

#### Trace View
Shows the execution trace:

```
┌─────────────────────────────────────┐
│ Memory Calls (4)                    │
│ ┌─ project_docs (explicit)          │
│ ├─ error_logs (rule: debug_rule)    │
│ ├─ stack_traces (rule: debug_rule)  │
│ └─ recent_changes (rule: context)   │
├─────────────────────────────────────┤
│ Rules Applied (5/8 matched)         │
│ ┌─ ✓ debug_context_rule             │
│   ├─ ✓ addVar.phase = "debugging"   │
│   ├─ ✓ scope.agent.type contains "debug" │
│   └─ Added: error_logs, stack_traces│
│ ├─ ✓ project_context_rule           │
│   ├─ ✓ scope.project.id exists      │
│   └─ Added: project_docs            │
│ └─ ✗ error_recovery_rule            │
│     ├─ ✗ scope.task.type != "error" │
│     └─ Not matched                  │
├─────────────────────────────────────┤
│ Variables Used (12)                 │
│ swarm_id, project_path, agent_type, │
│ task_id, phase, ...                 │
├─────────────────────────────────────┤
│ Missing Variables (2)               │
│ user_id, org_id                     │
└─────────────────────────────────────┘
```

#### Raw View
Shows the complete JSON structure:

```json
{
  "context": {
    "state": [...],
    "knowledge": [...],
    "history": [...]
  },
  "trace": {
    "memory_calls": [...],
    "rules_applied": [...],
    "variables_used": [...],
    "missing_variables": [...]
  },
  "meta": {
    "token_estimate": 3500,
    "total_items": 42,
    "truncated": false,
    "duration_ms": 150
  }
}
```

### Real-Time Progress Updates

```
┌─────────────────────────────────────┐
│ Assembling Context...               │
│                                     │
│ Progress: 3/5 memories completed    │
│ ├─ ✓ project_docs                  │
│ ├─ ✓ error_logs                    │
│ ├─ ✓ stack_traces                  │
│ ├� → recent_changes (in progress)   │
│ └─ ○ architecture_docs             │
│                                     │
│ Rules evaluated: 5 matched          │
│ Time elapsed: 120ms                 │
└─────────────────────────────────────┘
```

## Use Cases

### Debugging Missing Context
When expected context is missing:

1. **Check Trace View**: See which rules were evaluated
2. **Verify Conditions**: Check if conditions matched
3. **Check Memory Calls**: See which memories were queried
4. **Identify Gaps**: Find missing variables
5. **Adjust Rules**: Update rules to match correctly

### Optimizing Context Quality
To improve context relevance:

1. **Review Item Scores**: Identify low-scoring items
2. **Check Rule Matches**: See which rules are firing
3. **Analyze Traces**: Find patterns in successful assemblies
4. **Adjust Priorities**: Reorder rules and items
5. **Tune Constraints**: Adjust token budgets

### Understanding System Behavior
To learn how context is assembled:

1. **Inspect Traces**: See decision-making process
2. **Review Rule Matches**: Understand rule logic
3. **Check Variables**: Verify what data is available
4. **View Memory Calls**: See what was queried
5. **Analyze Results**: Connect inputs to outputs

### Quality Assurance
To validate context assembly:

1. **Check Token Counts**: Verify budgets are respected
2. **Review Sections**: Ensure correct organization
3. **Verify Traces**: Confirm expected rules matched
4. **Check Completeness**: Ensure all required data present
5. **Validate Sources**: Confirm correct memories used

## Best Practices

### Using Context View
- Start with high-priority sections (state, warnings)
- Check item counts to understand context volume
- Review scores to assess relevance
- Drill down into specific sections for details
- Compare across multiple assemblies

### Using Trace View
- Check memory calls to understand data flow
- Review rule matches to verify logic
- Look for missing variables
- Identify false positives/negatives in rules
- Track variables to ensure proper data flow

### Real-Time Monitoring
- Watch progress during long assemblies
- Monitor WebSocket connections
- Check for errors during pipeline execution
- Verify all expected memories complete
- Track assembly performance

### Debugging Workflow
1. Start with Context View to see what was assembled
2. Move to Trace View to understand why
3. Check Raw View for complete details
4. Adjust rules or variables based on findings
5. Re-run assembly to verify fixes

## Visualization Features

### Section Color Coding
Each section has a distinct color:
- **State**: Red/Pink (critical)
- **Warnings**: Orange (attention)
- **Constraints**: Yellow (limitations)
- **Knowledge**: Blue (information)
- **History**: Green (past)
- **Suggestions**: Purple (recommendations)
- **Working Memory**: Gray (current)

### Item Display
Each context item shows:
- **Content**: The actual retrieved content
- **Score**: Relevance score (0-1)
- **Source**: Which memory provided it
- **Format**: How content is structured

### Rule Evaluation Display
Each rule shows:
- **Rule Name**: Human-readable identifier
- **Match Status**: ✓ matched or ✗ not matched
- **Condition Results**: Individual condition matches
- **Added Memories**: Which memories were included

### Progress Indicators
Real-time progress shows:
- **Total Memories**: How many memories will be queried
- **Completed**: How many have finished
- **Current**: Which memory is currently being processed
- **Time Elapsed**: How long assembly has taken

## Performance Considerations

### Large Contexts
- Sections are collapsible to manage display
- Items are lazy-loaded if very large
- Raw view may be truncated for huge responses
- Consider filtering for focused inspection

### Real-Time Updates
- WebSocket connection for live updates
- Progress updates throttle to avoid UI lag
- Errors are reported immediately
- Connection status is visible

### Caching
- View state is maintained during navigation
- Large traces may be cached for performance
- History is limited to recent assemblies
- Raw responses are not cached by default

## Related Concepts

- **[Context Assembly](./context-assembly.md)**: Assembly process
- **[Rule Engine](./rule-engine.md)**: Rule-based selection
- **[Context Strategies](./context-strategies.md)**: Assembly approaches
- **[Infinite Context](../memory-systems/infinite-context.md)**: Context management

## Technical Implementation

**Component:** `AssembledContextViewer.tsx`
**Data Source:** `contextAssemblyStore.ts`
**WebSocket:** `contextAssemblySocket.ts`
**Type Definitions:** `contextAssembly.ts`

**Key Features:**
- Tab-based view switching
- Expandable section sections
- Real-time WebSocket updates
- Color-coded display
- Performance-optimized rendering
