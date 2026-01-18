---
title: Context Memory
category: Memory Systems
status: Active
tags: [context, working-memory, conversations, stateful]
---

# Context Memory

## Executive Summary
Context Memory provides working memory for active agent conversations, maintaining message history and state for ongoing interactions. It serves as the short-term memory that keeps agents grounded in current context.

## What It Is and Why It Matters

Context Memory is the "working memory" of CodeBolt's memory system - analogous to human working memory that holds information actively being processed. It maintains:
- Conversation message history
- Current interaction state
- Context from related conversations
- Metadata about the conversation

**Why this matters:**
- **Conversation Continuity**: Maintain coherent multi-turn conversations
- **State Management**: Track progress through workflows
- **Context Switching**: Preserve state when jumping between tasks
- **Reference Material**: Access related historical context
- **Agent Grounding**: Keep agents focused on current context

## Key Capabilities

### Thread-Based Conversations
- **Unique Thread IDs**: Each conversation is a separate thread
- **Message History**: Chronological message sequence
- **Source Thread Links**: Connect to original conversations
- **Summary Generation**: Condensed context overviews
- **Metadata Tracking**: Message counts, timestamps, authors

### Message Management
- **Append-Only**: New messages added to history
- **Rich Messages**: Support various message types
- **Message Attribution**: Track sender information
- **Timestamp Tracking**: Precise timing information
- **State Events**: Track conversation state changes

### Context Features
- **Source Thread Linking**: Reference original conversations
- **Summary Extraction**: Generate conversation summaries
- **Message Filtering**: Query by type, sender, time
- **Context Assembly**: Combine with other memory types
- **Snapshot Export**: Save conversation state

### Operations
- **Create Thread**: Start new context memory
- **Append Messages**: Add to conversation
- **Retrieve History**: Get message sequence
- **Generate Summary**: Create condensed overview
- **Link Context**: Connect to source threads

## How It Works Conceptually

### Storage Model

```typescript
ContextMemoryThread {
  id: "thread_ctx123"
  type: "context"
  sourceThreadId?: "thread_original456"
  summary?: "Discussion about implementing authentication"
  messages: [
    {
      role: "user",
      content: "How should we implement auth?",
      timestamp: "2024-01-15T10:00:00Z"
    },
    {
      role: "assistant",
      content: "I recommend JWT tokens...",
      timestamp: "2024-01-15T10:00:05Z"
    }
  ]
  createdAt: "2024-01-15T10:00:00Z"
  updatedAt: "2024-01-15T10:05:00Z"
  metadata: {
    messageCount: 42,
    savedBy: "agent_1",
    tags: ["authentication", "security"]
  }
}
```

### File Organization

```
.codebolt/memory/context/
├── thread_ctx123.json
├── thread_ctx456.json
└── thread_ctx789.json
```

### Message Flow

```
User Message
     ↓
Append to Context Memory
     ↓
Update Timestamps
     ↓
Generate Summary (periodically)
     ↓
Available for Retrieval
     ↓
Agent Uses for Context
```

## Use Cases

### Multi-Turn Conversations
Maintain coherent conversations:

```typescript
// Turn 1
User: "How do I implement user authentication?"
Assistant: "You can use JWT tokens..."

// Turn 2 (with context)
User: "What about refresh tokens?"
Assistant: "Building on our JWT discussion, refresh tokens..."
```

### Workflow State Tracking
Track progress through multi-step processes:

```typescript
// Step 1
messages: [{
  role: "system",
  content: "Starting code review workflow",
  state: "initiated"
}]

// Step 5
messages: [{
  role: "system",
  content: "Review complete, 3 issues found",
  state: "completed"
}]
```

### Context Switching
Preserve state when switching tasks:

```typescript
// Task A context
Thread A: {
  messages: [...], // 20 messages
  summary: "Working on authentication feature"
}

// Switch to Task B
Thread B: {
  messages: [...], // New context
  summary: "Now addressing database optimization"
}

// Later return to Task A
// Full context preserved
```

### Conversation Summarization
Generate condensed context:

```typescript
// Full conversation: 50 messages
summary: "Discussion about implementing OAuth2.0 with 
refresh tokens. Decided to use Redis for token storage. 
Pending: Implement token rotation logic."
```

### Context Reuse
Reference previous conversations:

```typescript
{
  sourceThreadId: "original_discussion",
  messages: [{
    role: "system",
    content: "Continuing from previous design discussion..."
  }]
}
```

## Best Practices

### Thread Organization
- Create threads for distinct conversations
- Use descriptive titles/metadata
- Link to source threads when relevant
- Archive old threads periodically

### Message Management
- Append messages in chronological order
- Include clear role indicators
- Add timestamps for all messages
- Preserve message formatting

### Summary Generation
- Generate summaries periodically
- Focus on key decisions and outcomes
- Include pending items
- Update as conversation evolves

### Context Optimization
- Limit message history for efficiency
- Use summaries to compress history
- Filter irrelevant messages
- Prioritize recent context

### State Management
- Track workflow state explicitly
- Mark conversation milestones
- Use state events for transitions
- Maintain state machine consistency

## Integration Patterns

### With Episodic Memory
- Extract events from conversations
- Build decision logs from discussions
- Track conversation patterns

### With JSON Memory
- Store structured context data
- Maintain configuration in context
- Reference JSON schemas in conversations

### With Vector Database
- Semantic search through conversation history
- Find similar past conversations
- Retrieve relevant context by meaning

### With Markdown Memory
- Generate documentation from conversations
- Export discussions as markdown
- Reference docs in context

## Common Patterns

### Conversation Thread
```typescript
{
  messages: [
    { role: "user", content: "Question" },
    { role: "assistant", content: "Answer" },
    { role: "user", content: "Follow-up" },
    { role: "assistant", content: "Clarification" }
  ]
}
```

### Workflow Context
```typescript
{
  messages: [
    { role: "system", content: "Workflow started", state: "initiated" },
    { role: "user", content: "Input data" },
    { role: "assistant", content: "Processing", state: "in_progress" },
    { role: "system", content: "Complete", state: "done" }
  ]
}
```

### Learning Conversation
```typescript
{
  messages: [
    { role: "user", content: "How does X work?" },
    { role: "assistant", content: "Explanation..." },
    { role: "user", content: "Can you show me an example?" },
    { role: "assistant", content: "Example..." }
  ],
  summary: "Learned about X mechanism with examples"
}
```

## Performance Considerations

### Message Limits
- Recommended: < 100 messages per thread
- Use summaries to compress history
- Archive old messages periodically
- Consider pagination for long threads

### Retrieval Optimization
- Cache recent messages
- Use time-based filtering
- Limit message history in queries
- Implement lazy loading for UI

### Storage Efficiency
- Compress large message content
- Store attachments separately
- Use references for repeated content
- Clean up old threads

## Related Concepts

- **[Episodic Memory](./episodic-memory.md)**: Event logs from conversations
- **[JSON Memory](./json-memory.md)**: Structured context data
- **[Markdown Memory](./markdown-memory.md)**: Documentation
- **[Memory Integration](./memory-integration.md)**: Combining context sources
- **[Infinite Context](./infinite-context.md)**: Context window management

## Technical Details

**Storage:** `.codebolt/memory/context/{threadId}.json`
**Service:** `contextMemoryService.ts`
**Types:** `src/types/chatTypes.ts` (ContextMemoryThread)
**UI:** `ContextThreadDetail.tsx`, `MessageContextMemoryPanel.tsx`

**Key Operations:**
- `createThread()`: Start new context
- `appendMessages()`: Add to conversation
- `getThread()`: Retrieve full context
- `generateSummary()`: Create overview
- `linkSourceThread()`: Connect to origin
