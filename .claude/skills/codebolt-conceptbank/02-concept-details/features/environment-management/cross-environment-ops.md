---
title: Cross-Environment Operations
category: environment-management
tags: [coordination, synchronization, multi-environment]
---

# Cross-Environment Operations

Cross-Environment Operations enable coordinated workflows across multiple environments, allowing file transfers, change synchronization, task delegation, and state management between isolated execution contexts.

## Executive Summary

Cross-environment operations provide the orchestration layer for multi-environment workflows, enabling file sharing, change synchronization, and coordinated task execution across local and remote environments while maintaining isolation and preventing conflicts.

## What It Is

Cross-environment operations are **coordinated actions** that:
- Transfer files between environments
- Synchronize changes across environments
- Compare environment states
- Delegate tasks between environments
- Merge changes from one environment to another
- Coordinate multi-agent workflows across environments

## Why It Matters

In multi-environment workflows, environments must collaborate:
- **File Sharing**: Reference implementations need to be shared
- **Change Propagation**: Successful changes should spread to other environments
- **Task Distribution**: Work should be distributed across environments
- **State Comparison**: Verify consistency across environments
- **Selective Merging**: Choose which changes to adopt

Cross-environment operations enable this collaboration while maintaining isolation.

## Key Capabilities

### File Operations

#### Read File from Environment

```typescript
// Read file from specific environment
const result = await readFile(
  environmentId,
  '/src/config/settings.ts'
);

// Returns file content from that environment
```

**Use Cases:**
- Reference implementation sharing
- Configuration copying
- Code review across environments
- Template extraction

#### Write File to Environment

```typescript
// Write file to specific environment
await writeFile(
  environmentId,
  '/src/config/settings.ts',
  fileContent
);
```

**Use Cases:**
- Propagate approved changes
- Update configurations across environments
- Deploy shared utilities
- Synchronize test fixtures

### Change Synchronization

#### Get Diff Files

```typescript
// Get changed files from environment
const diffResult = await getDiffFiles(environmentId);

// Returns:
{
  files: [
    {
      path: '/src/app.ts',
      status: 'modified',
      changes: { additions: 10, deletions: 5 },
      diff: '...'
    }
  ],
  summary: {
    totalFiles: 3,
    totalAdditions: 25,
    totalDeletions: 10
  }
}
```

**Use Cases:**
- Review changes before sync
- Selective change adoption
- Change documentation
- Impact analysis

#### Merge as Patch

```typescript
// Merge changes as patch to local project
await mergeAsPatch(environmentId);

// 1. Generates patch from environment
// 2. Applies to local project using git apply
// 3. Handles conflicts with --reject flag
```

**Use Cases:**
- Merge successful experiments to main
- Apply remote changes locally
- Selective change adoption
- Patch-based workflow

### Full Project Operations

#### Get Full Project

```typescript
// Retrieve entire project from environment
const project = await getFullProject(environmentId);

// Returns complete project structure
// Useful for backup, analysis, or migration
```

**Use Cases:**
- Project backup
- Environment migration
- Complete analysis
- Bulk operations

### Task Coordination

#### Environment-Aware Task Delegation

```typescript
// Delegate task to specific environment
const task = {
  title: 'Implement feature X',
  environmentId: 'env-remote-1',
  agentId: 'agent-ui',
  context: {
    referenceEnv: 'env-local',
    filesToModify: ['/src/components/*']
  }
};

// Task executes in specified environment
// Agent has access to environment context
```

**Use Cases:**
- Specialized environment execution
- Agent specialization per environment
- Isolated task execution
- Parallel processing

## How It Works Conceptually

### Environment Communication

Environments communicate through WebSocket connections:

```
┌─────────────┐         WebSocket         ┌─────────────┐
│ Environment │ ←─────────────────────→  │   CodeBolt  │
│    Provider │   (bidirectional)        │    Main     │
└─────────────┘                          └─────────────┘
                                               │
                                               ↓
                                        Message Routing
                                               │
         ┌─────────────────────────────────────────┐
         │                                         │
    ┌────▼────┐                            ┌────▼────┐
    │  Env A  │                            │  Env B  │
    └─────────┘                            └─────────┘
```

### File Transfer Protocol

```typescript
// Client requests file from environment
{
  type: 'read_file',
  environmentId: 'env-123',
  data: { path: '/src/app.ts' }
}

// Environment provider responds
{
  type: 'file_content',
  environmentId: 'env-123',
  data: {
    path: '/src/app.ts',
    content: '...',
    encoding: 'utf8'
  }
}
```

### Diff Generation

```typescript
// Environment generates diff
// Comparing current state to baseline
const diff = await environment.generateDiff();

// Diff sent to CodeBolt main
// Processed and displayed to user
```

### Patch Application

```typescript
// 1. Generate patch from environment
const patch = await environment.generatePatch();

// 2. Apply to local project
await execAsync(`git apply --reject --whitespace=fix`, {
  cwd: projectPath,
  input: patch
});

// 3. Handle conflicts if any
// 4. Verify application succeeded
```

### Cross-Environment Task Flow

```
1. Task created with environment context
   ↓
2. Task dispatched to specific environment
   ↓
3. Environment provider executes task
   ↓
4. Results and changes tracked
   ↓
5. Completion notification sent
   ↓
6. Changes synced if needed
   ↓
7. Task marked complete
```

## Use Cases

### Reference Implementation Sharing
```
Environment A: Working implementation
Environment B: Needs to implement same feature

Operation:
1. Read file from Environment A
2. Write to Environment B
3. Customize for Environment B
```

### Experiment to Production
```
Environment A: Experimental feature
Environment B: Production (local)

Operation:
1. Get diff files from Environment A
2. Review changes
3. Merge as patch to Environment B
4. Test and verify
```

### Parallel Development
```
Environment A: Frontend development
Environment B: Backend development
Environment C: Integration testing

Operation:
1. Deploy changes to respective environments
2. Run tests in Environment C
3. Share fixes across environments
```

### Configuration Synchronization
```
Environment A: Updated config
Environments B, C, D: Need same config

Operation:
1. Read config from Environment A
2. Write to Environments B, C, D
3. Verify consistency
```

### Code Review Across Environments
```
Environment A: Developer's changes
Environment B: Reviewer's environment

Operation:
1. Get diff from Environment A
2. Review in Environment B
3. Request changes or approve
4. Sync back to Environment A
```

### Multi-Agent Coordination
```
Agent 1 in Environment A: UI development
Agent 2 in Environment B: API development
Agent 3 in Environment C: Testing

Operation:
1. Agents work independently
2. Share completed changes
3. Agent 3 tests integration
4. Fixes propagated back to A and B
```

## Operation Patterns

### Pull Pattern
```
Environment B pulls changes from Environment A
1. Request diff from Environment A
2. Review and select changes
3. Apply to Environment B
```

### Push Pattern
```
Environment A pushes changes to Environment B
1. Generate diff in Environment A
2. Send to Environment B
3. Apply in Environment B
```

### Bidirectional Sync
```
Environments A and B synchronize
1. Get diffs from both
2. Resolve conflicts
3. Apply selected changes to both
```

### Selective Merge
```
Environment A → Environment B
1. Get diff from Environment A
2. Choose specific files to merge
3. Apply only selected files
```

## Coordination with File Update Intent

Cross-environment operations respect file update intents:

```typescript
// Before writing to Environment B
// Check for active intents on target files
const overlapCheck = await checkOverlap(
  environmentB,
  targetFiles
);

if (overlapCheck.hasOverlap) {
  // Resolve conflicts before proceeding
  // Coordinate with agents holding intents
  // Apply changes safely
}
```

## Integration with Shadow Git

Shadow Git facilitates safe cross-environment operations:

```typescript
// Create checkpoint before cross-env operation
await shadowGit.createCheckpoint(
  'Before cross-env sync from env-A'
);

// Perform operation
await syncFromEnvironment('env-A');

// If issues arise, restore checkpoint
await shadowGit.restoreCheckpoint(checkpointHash);
```

## Best Practices

### Operation Safety
- Create checkpoints before operations
- Verify environment states
- Test in safe environment first
- Rollback if issues occur

### Conflict Resolution
- Check for file update intents
- Communicate with affected agents
- Resolve conflicts before applying
- Document resolution decisions

### Change Selection
- Review all changes before sync
- Select only needed changes
- Test after application
- Document sync operations

### Environment Health
- Verify environment is running
- Check health status
- Ensure sufficient resources
- Monitor for errors

## Error Handling

### Environment Unavailable
```typescript
try {
  await readFile(environmentId, path);
} catch (error) {
  if (error.message.includes('not running')) {
    // Start environment or notify user
    await startEnvironment(environmentId);
  }
}
```

### File Not Found
```typescript
// Verify file exists before operation
const fileExists = await checkFileExists(
  environmentId,
  path
);

if (!fileExists) {
  // Handle missing file
  // Notify user
  // Skip or use default
}
```

### Patch Application Failure
```typescript
try {
  await mergeAsPatch(environmentId);
} catch (error) {
  if (error.message.includes('reject')) {
    // Handle rejected patches
    // Review conflicts
    // Resolve manually or retry
  }
}
```

## Benefits

- **Collaboration**: Share work across environments
- **Efficiency**: Reuse successful changes
- **Flexibility**: Choose what to sync
- **Safety**: Isolated operations with rollback
- **Coordination**: Multi-agent workflows
- **Scalability**: Distribute work effectively

## Related Concepts

- **Multi-Environment Management**: Running multiple environments
- **File Update Intent**: Conflict prevention during operations
- **Environment Diffs**: Track changes for synchronization
- **Shadow Git**: Safe rollback capability
- **Environment Types**: Different execution contexts
