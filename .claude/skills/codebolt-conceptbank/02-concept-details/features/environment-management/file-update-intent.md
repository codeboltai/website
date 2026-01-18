---
title: File Update Intent
category: environment-management
tags: [coordination, conflict-prevention, multi-agent]
---

# File Update Intent

File Update Intent is CodeBolt's sophisticated conflict prevention system that enables multiple agents to work across environments without overwriting each other's work through declarative intent registration and intelligent overlap detection.

## Executive Summary

File Update Intent allows agents to declare which files they intend to modify before starting work, enabling the system to detect potential conflicts, enforce coordination policies, and prevent data loss when multiple agents operate across environments simultaneously.

## What It Is

File Update Intent is a **declarative coordination mechanism** where:
- Agents register intent to modify specific files before making changes
- The system detects overlapping intents across agents and environments
- Four intent levels provide different coordination behaviors
- Conflicts are prevented before they occur rather than detected after
- Auto-expiration prevents stale intents from blocking progress

## Why It Matters

In multi-agent, multi-environment workflows, conflicts are inevitable:
- Two agents modifying the same file simultaneously
- One agent overwriting another's uncommitted changes
- Conflicting edits to shared configuration files
- Race conditions in file operations

File Update Intent solves these problems by:
- **Preventing conflicts** before they occur
- **Enabling coordination** through intent visibility
- **Supporting automation** with flexible policies
- **Maintaining progress** without manual locking

## Key Capabilities

### Intent Levels

Four levels provide different enforcement behaviors:

#### Level 1: Advisory/Notification
**"I'm working on these files, FYI"**

- **Behavior**: Informs others; no enforcement
- **On Overlap**: Agents proceed with logged warning
- **Use Case**: Low-risk, exploratory tasks
- **Color**: Blue

```
Example: Documentation updates, comments, formatting
```

#### Level 2: Soft Reservation
**"I'd prefer to work on these files alone"**

- **Behavior**: Prefers avoidance; suggests negotiation
- **On Overlap**: Proceeds with warning; agents should coordinate
- **Use Case**: Default for most coding swarms
- **Color**: Amber

```
Example: Feature development, refactoring
```

#### Level 3: Priority-Based
**"Higher priority wins"**

- **Behavior**: Higher-priority intent wins; lower backs off
- **On Overlap**: Compares priorities; lower priority blocked
- **Use Case**: Urgent fixes vs. features
- **Color**: Purple

```
Example: Hotfix (priority 9) vs. Feature (priority 5)
```

#### Level 4: Hard Lock
**"No one else can touch these files"**

- **Behavior**: Blocks all others entirely
- **On Overlap**: Completely blocked; traditional locking
- **Use Case**: Critical/shared resources
- **Color**: Red

```
Example: Database migrations, API contracts
```

### Intent Registration

Agents register intent before making changes:

```typescript
const intent = {
  environmentId: 'env-123',
  files: [
    {
      filePath: '/src/components/Button.tsx',
      intentLevel: 2,  // Soft reservation
      targetSections: ['render()', 'onClick()']
    },
    {
      filePath: '/src/styles/button.css',
      intentLevel: 1   // Advisory
    }
  ],
  description: 'Update button styling and interaction',
  estimatedDuration: 15,  // minutes
  priority: 7,
  autoExpire: true,
  maxAutoExpireMinutes: 30
};

// Register intent
const result = await createIntent(intent, 'agent-456');
```

### Overlap Detection

The system automatically detects conflicts:

```typescript
// Check for overlaps before creating intent
const overlapResult = await checkOverlap(
  environmentId,
  filePaths,
  priority,
  fileIntents
);

// Result indicates:
{
  hasOverlap: true,
  overlappingIntents: [
    {
      intentId: 'intent-789',
      claimedBy: 'agent-abc',
      files: ['/src/components/Button.tsx'],
      intentLevels: [3],
      priority: 8
    }
  ],
  blockedFiles: [],  // Level 4 locks
  canProceed: false, // Based on levels and priorities
  message: 'Higher priority intent exists'
}
```

### Intent Lifecycle

Intents progress through states:

1. **Active**: Intent is registered and enforcing
2. **Completed**: Agent finished work successfully
3. **Expired**: Auto-expired based on duration
4. **Cancelled**: Agent cancelled before completion

```typescript
// Complete intent
await completeIntent(intentId, 'agent-456');

// Cancel intent
await cancelIntent(intentId, 'agent-456');

// Auto-expire (lazy check)
// Checked on access; marked expired if past expiration
```

## How It Works Conceptually

### Intent Storage

Intents are stored per environment in `.codebolt/fileupdateintent/intents.json`:

```json
{
  "intents": [
    {
      "id": "uuid-123",
      "environmentId": "env-abc",
      "files": [
        {
          "filePath": "/src/app.ts",
          "intentLevel": 2,
          "targetSections": ["main()"]
        }
      ],
      "description": "Add error handling",
      "priority": 7,
      "claimedBy": "agent-1",
      "status": "active",
      "createdAt": "2024-01-18T10:00:00Z",
      "expiresAt": "2024-01-18T10:30:00Z"
    }
  ],
  "version": "1.0.0"
}
```

### Overlap Detection Algorithm

```typescript
function detectOverlap(newIntent, existingIntents) {
  const overlaps = [];

  for (const existing of existingIntents) {
    // Check for file path overlap
    const commonFiles = newIntent.files
      .map(f => f.filePath)
      .filter(path => existing.files.some(f => f.filePath === path));

    if (commonFiles.length > 0) {
      // Determine behavior based on intent levels
      const conflictLevel = calculateConflict(newIntent, existing);
      overlaps.push({
        intent: existing,
        files: commonFiles,
        canProceed: conflictLevel === 'advisory',
        blocked: conflictLevel === 'hard-lock'
      });
    }
  }

  return overlaps;
}
```

### Conflict Resolution

Different levels trigger different resolutions:

**Level 1 + Any**: Warning only, both proceed
```
Agent A: "I'm editing config.yaml (level 1)"
Agent B: "I'm editing config.yaml (level 2)"
Result: Both proceed with warning
```

**Level 2 + Level 2**: Warning, coordination suggested
```
Agent A: "I'm refactoring auth.ts (level 2)"
Agent B: "I'm refactoring auth.ts (level 2)"
Result: Both proceed, strong warning to coordinate
```

**Level 3 + Level 3**: Priority wins
```
Agent A: "Bug fix (priority 8, level 3)"
Agent B: "Feature (priority 5, level 3)"
Result: Agent A proceeds, Agent B blocked
```

**Level 4 + Any**: Complete block
```
Agent A: "Database migration (level 4)"
Agent B: "Feature update (any level)"
Result: Agent A proceeds, Agent B blocked
```

### Auto-Expiration

Prevents stale intents from blocking progress:

```typescript
// Intent with auto-expire
{
  autoExpire: true,
  maxAutoExpireMinutes: 30,
  expiresAt: "2024-01-18T10:30:00Z"
}

// Lazy expiration check
// Only checked when intent is accessed
// Prevents continuous background processing
```

## Use Cases

### Multi-Agent Feature Development
```
Agent 1: Intent on /src/components/* (level 2)
Agent 2: Intent on /src/utils/* (level 2)
Result: Both proceed independently
```

### Critical Section Protection
```
Agent 1: Intent on /db/schema.sql (level 4)
Agent 2: Intent on /db/schema.sql (any level)
Result: Agent 1 proceeds, Agent 2 blocked
```

### Urgent Fix Priority
```
Agent 1: Hotfix on /api/auth.ts (priority 9, level 3)
Agent 2: Feature on /api/auth.ts (priority 5, level 3)
Result: Agent 1 proceeds, Agent 2 backs off
```

### Exploratory Development
```
Agent 1: Experiments on /src/experimental/* (level 1)
Agent 2: Main work on /src/main/* (level 2)
Result: Both proceed, Agent 2 warned about overlap
```

### Documentation Updates
```
Agent 1: README.md updates (level 1)
Agent 2: API.md updates (level 1)
Result: Both proceed with notifications
```

## Benefits

- **Conflict Prevention**: Stops conflicts before they happen
- **Coordination**: Makes agent intentions visible
- **Flexibility**: Four levels for different scenarios
- **Automation**: No manual coordination required
- **Safety**: Prevents data loss from conflicts
- **Efficiency**: No need for traditional locking

## Best Practices

### Choosing Intent Levels
- Use **Level 1** for documentation, comments, formatting
- Use **Level 2** for most feature development (default)
- Use **Level 3** for urgent fixes and prioritized work
- Use **Level 4** for critical shared resources only

### Duration Management
- Set reasonable `estimatedDuration` for auto-expiration
- Use `autoExpire: true` for most intents
- Override expiration for long-running tasks
- Clean up completed intents promptly

### Target Sections
- Specify `targetSections` when possible
- Reduces false positive conflicts
- Enables parallel work on same file
- Improves coordination granularity

### Priority Setting
- Use 1-10 scale appropriately
- Higher numbers = higher priority
- Consider impact and urgency
- Document priority rationale

## Related Concepts

- **Multi-Environment Management**: Coordination across environments
- **Environment Types**: Different execution contexts
- **Shadow Git**: Safe experimentation with git
- **Environment Diffs**: Track file changes
- **Cross-Environment Operations**: Coordinate across environments
